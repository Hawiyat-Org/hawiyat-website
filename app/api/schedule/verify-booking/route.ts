import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';

// Configure for serverless
export const config = {
  maxDuration: 5, // 5 seconds timeout
};

export async function POST(req: NextRequest) {
  try {
    const { email, verificationCode } = await req.json();

    if (!email || !verificationCode) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate code format (6 digits)
    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(verificationCode.trim())) {
      return NextResponse.json(
        { error: 'Invalid verification code format' },
        { status: 400 }
      );
    }

    console.log('Attempting verification for:', email);

    // Find the verification code in the database
    const storedData = await prisma.verificationCode.findUnique({
      where: { email },
      select: {
        code: true,
        expiresAt: true,
      }
    });

    if (!storedData) {
      console.log('No verification code found for:', email);
      return NextResponse.json(
        { error: 'No verification code found. Please request a new code.' },
        { status: 404 }
      );
    }

    // Check if the code has expired
    const now = new Date();
    if (storedData.expiresAt < now) {
      console.log('Code expired for:', email);
      // Remove the expired code
      await prisma.verificationCode.delete({ 
        where: { email } 
      }).catch(err => console.error('Error deleting expired code:', err));
      
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new code.' },
        { status: 410 } // 410 Gone
      );
    }

    // Check if the code matches (trim whitespace for safety)
    if (storedData.code.trim() !== verificationCode.trim()) {
      console.log('Code mismatch for:', email);
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 401 }
      );
    }

    // Verification successful - remove the code so it can't be used again
    await prisma.verificationCode.delete({ 
      where: { email } 
    });

    console.log('Verification successful for:', email);

    return NextResponse.json({ 
      message: 'Verification successful',
      verified: true
    });
  } catch (error) {
    console.error('Error verifying booking:', error);
    
    // Handle specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      if (prismaError.code === 'P2025') {
        // Record not found during delete
        return NextResponse.json(
          { error: 'Verification code not found or already used' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}