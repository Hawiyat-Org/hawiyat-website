import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for verification codes (in production, use Redis or database)
// This is the same map used in the send-verification route
// In a real application, this would be shared across the application
const verificationCodes = new Map<string, { code: string; expiresAt: Date }>();

export async function POST(req: NextRequest) {
  try {
    const { email, verificationCode } = await req.json();

    if (!email || !verificationCode) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Check if the verification code exists and is valid
    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return NextResponse.json(
        { error: 'No verification code found for this email' },
        { status: 400 }
      );
    }

    // Check if the code has expired
    const now = new Date();
    if (storedData.expiresAt < now) {
      // Remove the expired code
      verificationCodes.delete(email);
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Check if the code matches
    if (storedData.code !== verificationCode) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Verification successful - remove the code so it can't be used again
    verificationCodes.delete(email);

    return NextResponse.json({ 
      message: 'Verification successful' 
    });
  } catch (error) {
    console.error('Error verifying booking:', error);
    return NextResponse.json(
      { error: 'Failed to verify booking' },
      { status: 500 }
    );
  }
}