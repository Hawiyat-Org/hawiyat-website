import { addMonths } from "date-fns";
import { prisma } from "@/lib/prisma/prismaClient";

// ===========================================
// Type Definitions
// ===========================================

interface PricingTier {
  price: number;
  currency: string;
  billingCycle: string;
}

interface Plan {
  name: string;
}

interface Subscription {
  id: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  pricingTier: PricingTier;
  plan: Plan;
}

interface User {
  id: string;
  email: string;
  name?: string | null;
}

interface Invoice {
  id: string;
  total: number;
  currency: string;
}

// ===========================================
// Helper Functions
// ===========================================

export function calculateEndDate(startDate: Date, billingCycle: string): Date {
  switch (billingCycle) {
    case "MONTHLY":
      return addMonths(startDate, 1)
    case "QUARTERLY":
      return addMonths(startDate, 3)
    case "SEMI_ANNUAL":
      return addMonths(startDate, 6)
    case "ANNUAL":
      return addMonths(startDate, 12)
    default:
      return addMonths(startDate, 1)
  }
}

export async function createInvoice(subscription: Subscription, user: User, isRenewal = false) {
  const periodStart = isRenewal 
    ? (subscription.currentPeriodEnd > new Date() 
        ? subscription.currentPeriodEnd 
        : new Date())
    : subscription.currentPeriodStart

  const periodEnd = calculateEndDate(periodStart, subscription.pricingTier.billingCycle)

  // Generate invoice number
  const invoiceCount = await prisma.invoice.count()
  const invoiceNumber = `INV-${Date.now()}-${invoiceCount + 1}`

  return await prisma.invoice.create({
    data: {
      subscriptionId: subscription.id,
      userId: user.id,
      invoiceNumber,
      subtotal: subscription.pricingTier.price,
      total: subscription.pricingTier.price, // Add tax calculation here if needed
      currency: subscription.pricingTier.currency,
      periodStart,
      periodEnd,
      dueDate: new Date(), // Immediate payment
      status: "OPEN",
    },
  })
}

export async function createPayment(subscription: Subscription, invoice: Invoice, user: User, isRenewal = false) {
  // Create payment record
  const payment = await prisma.payment.create({
    data: {
      userId: user.id,
      subscriptionId: subscription.id,
      invoiceId: invoice.id,
      amount: invoice.total,
      currency: invoice.currency,
      description: `VPS ${subscription.plan.name} - ${subscription.pricingTier.billingCycle}`,
    },
  })

  // Create Payoneer payment link
  const payoneerResponse = await fetch(`${process.env.PAYONEER_API_URL}/payments`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.PAYONEER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment_id: payment.id,
      amount: invoice.total,
      currency: invoice.currency,
      description: payment.description,
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
      webhook_url: `${process.env.NEXTAUTH_URL}/api/payoneer-webhook`,
      customer: {
        email: user.email,
        name: user.name || "VPS Customer",
      },
      metadata: {
        subscription_id: subscription.id,
        invoice_id: invoice.id,
        payment_id: payment.id,
        user_id: user.id,
        is_renewal: isRenewal.toString(),
        billing_cycle: subscription.pricingTier.billingCycle,
      },
    }),
  })

  if (!payoneerResponse.ok) {
    throw new Error("Failed to create Payoneer payment")
  }

  const payoneerData = await payoneerResponse.json()

  // Update payment with Payoneer ID and URL
  return await prisma.payment.update({
    where: { id: payment.id },
    data: { 
      payoneerPaymentId: payoneerData.payment_id,
      metadata: {
        paymentUrl: payoneerData.payment_url,
      }
    },
  })
}