import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prismaClient"
import { PaymentMethod } from "@prisma/client"
import { sendOrderNotification, sendOrderConfirmation, sendWhatsAppNotification, escapeHtml } from "@/lib/email-utils"
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter"

const IP_RATE_LIMIT = { maxRequests: 5, windowMs: 60 * 60 * 1000 }
const EMAIL_RATE_LIMIT = { maxRequests: 4, windowMs: 60 * 60 * 1000 }

async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn("Telegram credentials not configured")
    return
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })
  } catch (error) {
    console.error("Telegram notification failed:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const body = await request.json()

    const { serviceId, serviceName, customerName, customerEmail, customerPhone, notes, preferredPayment } = body

    if (
      typeof serviceId !== "string" || !serviceId ||
      typeof serviceName !== "string" || !serviceName ||
      typeof customerName !== "string" || !customerName ||
      typeof customerEmail !== "string" || !customerEmail
    ) {
      return NextResponse.json(
        { error: "Missing required fields: serviceId, serviceName, customerName, customerEmail" },
        { status: 400 }
      )
    }

    if (
      customerName.length > 120 ||
      customerEmail.length > 254 ||
      (typeof customerPhone === "string" && customerPhone.length > 32)
    ) {
      return NextResponse.json(
        { error: "Field too long" },
        { status: 400 }
      )
    }

    if (typeof notes === "string" && notes.length > 2000) {
      return NextResponse.json(
        { error: "Notes too long" },
        { status: 400 }
      )
    }

    const ipLimit = checkRateLimit(`ip:${ip}`, IP_RATE_LIMIT.maxRequests, IP_RATE_LIMIT.windowMs)
    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many orders from your connection. Please try again in ${ipLimit.retryAfter} seconds.`,
          retryAfter: ipLimit.retryAfter,
        },
        { status: 429 }
      )
    }

    const emailLimit = checkRateLimit(`email:${customerEmail}`, EMAIL_RATE_LIMIT.maxRequests, EMAIL_RATE_LIMIT.windowMs)
    if (!emailLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many orders with this email. Please try again in ${emailLimit.retryAfter} seconds.`,
          retryAfter: emailLimit.retryAfter,
        },
        { status: 429 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Normalize phone to a string or null so a malformed type cannot reach Prisma.
    const normalizedPhone = typeof customerPhone === "string" && customerPhone.trim()
      ? customerPhone
      : null

    const normalizedPayment = typeof preferredPayment === "string" && preferredPayment
      ? preferredPayment.toUpperCase().replace(/\s+/g, "_")
      : null

    const validPaymentMethods: string[] = ["CCP", "BARIDI_MOB", "USD"]
    if (normalizedPayment && !validPaymentMethods.includes(normalizedPayment)) {
      return NextResponse.json(
        { error: "Invalid payment method. Must be one of: CCP, BARIDI_MOB, USD" },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        serviceId,
        serviceName,
        customerName,
        customerEmail,
        customerPhone: normalizedPhone,
        notes: typeof notes === "string" ? notes : null,
        preferredPayment: normalizedPayment ? normalizedPayment as PaymentMethod : null,
      },
    })

    const telegramMessage = `<b>New Order Received!</b>

<b>Service:</b> ${escapeHtml(serviceName)}
<b>Customer:</b> ${escapeHtml(customerName)}
<b>Email:</b> ${escapeHtml(customerEmail)}
${customerPhone ? `<b>Phone:</b> ${escapeHtml(customerPhone)}\n` : ""}${notes ? `<b>Notes:</b> ${escapeHtml(notes)}\n` : ""}
<b>Order ID:</b> ${order.id}
<b>Date:</b> ${new Date(order.createdAt).toLocaleString()}`

    const whatsappMessage = `🔔 *New Order Received!*

📦 *Service:* ${serviceName}
👤 *Customer:* ${customerName}
📧 *Email:* ${customerEmail}
${customerPhone ? `📱 *Phone:* ${customerPhone}\n` : ""}💳 *Payment:* ${normalizedPayment ?? 'Not specified'}
${notes ? `📝 *Notes:* ${notes}\n` : ""}
🆔 *Order ID:* ${order.id}
📅 *Date:* ${new Date(order.createdAt).toLocaleString()}`

    await sendTelegramNotification(telegramMessage)
    await sendWhatsAppNotification(whatsappMessage)

    const [emailNotificationResult, emailConfirmationResult] = await Promise.allSettled([
      sendOrderNotification({ order }),
      sendOrderConfirmation({
        to: customerEmail,
        order: {
          id: order.id,
          serviceName: order.serviceName,
          customerName: order.customerName,
          preferredPayment: order.preferredPayment,
          notes: order.notes,
          createdAt: order.createdAt,
        },
      }),
    ])

    if (emailNotificationResult.status === "rejected") {
      console.error("CRITICAL: Admin notification email failed:", emailNotificationResult.reason)
    } else if (!emailNotificationResult.value) {
      console.error("CRITICAL: Admin notification email returned false (SMTP config likely missing)")
    }

    if (emailConfirmationResult.status === "rejected") {
      console.error("CRITICAL: Customer confirmation email failed:", emailConfirmationResult.reason)
    } else if (!emailConfirmationResult.value) {
      console.error("CRITICAL: Customer confirmation email returned false (SMTP config likely missing)")
    }

    return NextResponse.json(
      { success: true, order: { id: order.id, status: order.status, createdAt: order.createdAt } },
      { status: 201 }
    )
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
