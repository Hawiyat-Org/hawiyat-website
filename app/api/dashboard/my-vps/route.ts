// ===========================================
// 6. User Dashboard API
// ===========================================
// app/api/my-vps/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma/prismaClient"

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscriptions: {
          include: {
            plan: true,
            pricingTier: true,
            payments: {
              orderBy: { createdAt: "desc" },
              take: 5,
            },
            invoices: {
              orderBy: { createdAt: "desc" },
              take: 3,
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Transform subscriptions data for better frontend usage
    const transformedSubscriptions = user.subscriptions.map(subscription => ({
      id: subscription.id,
      serverName: subscription.serverName,
      serverIP: subscription.serverIP,
      status: subscription.status,
      
      // Plan details
      plan: {
        id: subscription.plan.id,
        name: subscription.plan.name,
        cpu: subscription.plan.cpu,
        ram: subscription.plan.ram,
        storage: subscription.plan.storage,
        bandwidth: subscription.plan.bandwidth,
      },
      
      // Billing details
      billing: {
        cycle: subscription.pricingTier.billingCycle,
        price: subscription.pricingTier.price,
        currency: subscription.pricingTier.currency,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        autoRenew: subscription.autoRenew,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
      
      // Dates
      createdAt: subscription.createdAt,
      activatedAt: subscription.activatedAt,
      suspendedAt: subscription.suspendedAt,
      canceledAt: subscription.canceledAt,
      
      // Recent payments
      recentPayments: subscription.payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        createdAt: payment.createdAt,
        paidAt: payment.paidAt,
      })),
      
      // Recent invoices
      recentInvoices: subscription.invoices.map(invoice => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        total: invoice.total,
        currency: invoice.currency,
        status: invoice.status,
        dueDate: invoice.dueDate,
        paidAt: invoice.paidAt,
        periodStart: invoice.periodStart,
        periodEnd: invoice.periodEnd,
      })),
    }))

    // Calculate summary stats
    const stats = {
      totalSubscriptions: user.subscriptions.length,
      activeSubscriptions: user.subscriptions.filter(s => s.status === 'ACTIVE').length,
      pendingSubscriptions: user.subscriptions.filter(s => s.status === 'PENDING').length,
      suspendedSubscriptions: user.subscriptions.filter(s => s.status === 'SUSPENDED').length,
      totalMonthlySpend: user.subscriptions
        .filter(s => s.status === 'ACTIVE')
        .reduce((total, s) => {
          // Convert all billing cycles to monthly equivalent for comparison
          const monthlyPrice = s.pricingTier.billingCycle === 'MONTHLY' ? s.pricingTier.price :
                              s.pricingTier.billingCycle === 'SEMI_ANNUAL' ? s.pricingTier.price / 6 :
                              s.pricingTier.price / 12; // ANNUAL
          return total + monthlyPrice;
        }, 0),
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      subscriptions: transformedSubscriptions,
      stats,
    })

  } catch (error) {
    console.error("Dashboard data error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}