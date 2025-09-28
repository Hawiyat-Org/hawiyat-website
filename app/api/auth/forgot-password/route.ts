// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '@/lib/third_partty/email';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Always return success for security (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({ 
        message: 'If an account with that email exists, we\'ve sent you reset instructions' 
      });
    }

    // Generate secure reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Delete any existing reset tokens for this user
    await prisma.verificationToken.deleteMany({
      where: { identifier: normalizedEmail },
    });

    // Create new reset token
    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: resetToken,
        expires: resetTokenExpiry,
      },
    });

    // Send reset email using the new email system
    try {
      await sendPasswordResetEmail(
        normalizedEmail,
        resetToken,
        user.name || user.email.split('@')[0] // Use name if available, otherwise use email prefix
      );
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Password reset link sent to your email' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}