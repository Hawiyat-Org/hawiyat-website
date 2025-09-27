// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json();

    // Validate required fields
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Reset token and new password are required' },
        { status: 400 }
      );
    }

    // Validate password strength (matching frontend requirements)
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    if (!/(?=.*[a-z])/.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain at least one lowercase letter' },
        { status: 400 }
      );
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain at least one uppercase letter' },
        { status: 400 }
      );
    }

    if (!/(?=.*\d)/.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain at least one number' },
        { status: 400 }
      );
    }

    // Find and validate the reset token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid reset link. Please request a new password reset.' },
        { status: 400 }
      );
    }

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

    // Find the user by email (stored in identifier)
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

    // Check if the new password is different from the current one
    if (user.password) {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return NextResponse.json(
          { error: 'New password must be different from your current password' },
          { status: 400 }
        );
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password in a transaction
    await prisma.$transaction([
      // Update the user's password
      prisma.user.update({
        where: { id: user.id },
        data: { 
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }),
      // Delete the used token
      prisma.verificationToken.delete({
        where: { token },
      }),
      // Optional: Delete all other reset tokens for this user for security
      prisma.verificationToken.deleteMany({
        where: { identifier: verificationToken.identifier },
      }),
    ]);

    return NextResponse.json({ 
      message: 'Password reset successfully. You can now sign in with your new password.',
      success: true
    });

  } catch (error) {
    console.error('Reset password error:', error);
    
    // Handle specific database errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Reset link is no longer valid. Please request a new password reset.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Optional: Keep GET method for direct token validation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Reset token is required', valid: false },
        { status: 400 }
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid reset token', valid: false },
        { status: 400 }
      );
    }

    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      
      return NextResponse.json(
        { error: 'Reset token has expired', valid: false },
        { status: 400 }
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
      { error: 'Something went wrong', valid: false },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}