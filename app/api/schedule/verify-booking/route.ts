import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';

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

    console.log('Attempting verification for:', email, 'with code:', verificationCode);

    // Find the verification code in the database
    const storedData = await prisma.verificationCode.findUnique({
      where: { email }
    });

    if (!storedData) {
      console.log('No verification code found for:', email);
      return NextResponse.json(
        { error: 'No verification code found for this email' },
        { status: 400 }
      );
    }

    console.log('Found stored code:', storedData.code, 'expires at:', storedData.expiresAt);

    // Check if the code has expired
    const now = new Date();
    if (storedData.expiresAt < now) {
      console.log('Code expired for:', email);
      // Remove the expired code
      await prisma.verificationCode.delete({ where: { email } });
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Check if the code matches (trim whitespace for safety)
    if (storedData.code.trim() !== verificationCode.trim()) {
      console.log('Code mismatch. Expected:', storedData.code, 'Got:', verificationCode);
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Verification successful - remove the code so it can't be used again
    await prisma.verificationCode.delete({ where: { email } });

    console.log('Verification successful for:', email);

    return NextResponse.json({ 
      message: 'Verification successful',
      verified: true
    });
  } catch (error) {
    console.error('Error verifying booking:', error);
    return NextResponse.json(
      { error: 'Failed to verify booking' },
      { status: 500 }
    );
  }
}