// app/api/waitlist/route.ts
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';
import { checkRateLimit, getClientIP } from '@/lib/rate-limiter';

const WaitlistSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long')
    .transform(email => email.toLowerCase().trim()),
});

export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit for the email-capture surface (list-pumping / spam abuse).
    const ip = getClientIP(req);
    const limit = checkRateLimit(`waitlist:${ip}`, 5, 60 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', retryAfter: limit.retryAfter },
        { status: 429 }
      );
    }

    const body = await req.json();

    const validationResult = WaitlistSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => err.message);
      return NextResponse.json(
        { error: errors[0] || 'Invalid email format' },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    const existingUser = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Idempotent success — no position returned, so an attacker cannot
      // enumerate list membership or learn the queue position of an email.
      return NextResponse.json(
        { success: true, message: 'Already on the waitlist' },
        { status: 200 }
      );
    }

    const signup = await prisma.waitlist.create({
      data: {
        email,
      },
    });

    const position = await prisma.waitlist.count({
      where: {
        createdAt: {
          lte: signup.createdAt,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined waitlist!',
        position,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
