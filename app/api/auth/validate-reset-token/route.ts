// app/api/auth/validate-reset-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Reset token is required' },
        { status: 400 }
      );
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid reset link. Please request a new password reset.' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      
      return NextResponse.json(
        { error: 'Reset link has expired. Please request a new password reset.' },
        { status: 400 }
      );
    }

    // Optional: Verify email matches if provided
    if (email && verificationToken.identifier !== email.toLowerCase().trim()) {
      return NextResponse.json(
        { error: 'Invalid reset link. Email does not match.' },
        { status: 400 }
      );
    }

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      // Clean up invalid token
      await prisma.verificationToken.delete({
        where: { token },
      });
      
      return NextResponse.json(
        { error: 'User account not found. Please contact support.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Reset token is valid',
      valid: true,
      email: verificationToken.identifier
    });

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { error: 'Something went wrong validating the reset link' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}