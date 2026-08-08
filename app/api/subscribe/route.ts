import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prismaClient"
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    // Per-IP rate limit for the email-capture surface (list-pumping / spam abuse).
    const ip = getClientIP(request)
    const limit = checkRateLimit(`subscribe:${ip}`, 5, 60 * 60 * 1000)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later.", retryAfter: limit.retryAfter },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    const existing = await prisma.emailSubscription.findUnique({
      where: { email },
    })

    let subscribedAt: Date

    if (existing) {
      // Idempotent path: same status + response shape as a fresh subscribe so
      // a probing client cannot distinguish "already subscribed" from a new
      // signup.
      subscribedAt = existing.createdAt
    } else {
      const subscription = await prisma.emailSubscription.create({
        data: { email },
      })
      subscribedAt = subscription.createdAt
    }

    return NextResponse.json(
      { success: true, subscribedAt },
      { status: 201 }
    )
  } catch (error) {
    console.error("Email subscription error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    )
  }
}
