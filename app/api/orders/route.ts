import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prismaClient"
import { sendOrderNotification, sendOrderConfirmation } from "@/lib/email-utils"

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
    const body = await request.json()

    const { serviceId, serviceName, customerName, customerEmail, customerPhone, notes } = body

    if (!serviceId || !serviceName || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: serviceId, serviceName, customerName, customerEmail" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        serviceId,
        serviceName,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        notes: notes || null,
      },
    })

    const telegramMessage = `<b>New Order Received!</b>

<b>Service:</b> ${serviceName}
<b>Customer:</b> ${customerName}
<b>Email:</b> ${customerEmail}
${customerPhone ? `<b>Phone:</b> ${customerPhone}\n` : ""}${notes ? `<b>Notes:</b> ${notes}\n` : ""}
<b>Order ID:</b> ${order.id}
<b>Date:</b> ${new Date(order.createdAt).toLocaleString()}`

    await sendTelegramNotification(telegramMessage)

    sendOrderNotification({ order }).catch(err =>
      console.error("Failed to send admin notification:", err)
    )
    sendOrderConfirmation({
      to: customerEmail,
      order: {
        id: order.id,
        serviceName: order.serviceName,
        customerName: order.customerName,
        notes: order.notes,
        createdAt: order.createdAt,
      },
    }).catch(err =>
      console.error("Failed to send customer confirmation:", err)
    )

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
