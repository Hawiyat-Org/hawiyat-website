// app/api/waitlist/route.ts
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';

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

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const userAgent = req.headers.get('user-agent') || 'unknown';

    const existingUser = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingUser) {
      const position = await prisma.waitlist.count({
        where: {
          createdAt: {
            lte: existingUser.createdAt,
          },
        },
      });

      return NextResponse.json(
        { error: 'Email already exists in waitlist', position },
        { status: 409 }
      );
    }

    const signup = await prisma.waitlist.create({
      data: {
        email,
        ipAddress,
        userAgent,
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