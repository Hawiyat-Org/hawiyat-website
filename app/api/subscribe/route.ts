import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prismaClient"

export async function POST(request: NextRequest) {
  try {
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

    if (existing) {
      return NextResponse.json(
        { error: "You are already subscribed" },
        { status: 409 }
      )
    }

    const subscription = await prisma.emailSubscription.create({
      data: { email },
    })

    return NextResponse.json(
      { success: true, subscribedAt: subscription.createdAt },
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
