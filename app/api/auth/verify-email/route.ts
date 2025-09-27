// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/third_partty/email';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    console.log('Verification attempt:', { token: token?.substring(0, 8) + '...', email });

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Missing verification token or email' },
        { status: 400 }
      );
    }

    // Find verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!verificationToken) {
      console.log('Token not found in database');
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (new Date() > verificationToken.expires) {
      console.log('Token expired:', verificationToken.expires);
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { token }
      });
      
      return NextResponse.json(
        { error: 'Verification token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Check if the email matches the token identifier
    if (verificationToken.identifier !== email.toLowerCase()) {
      console.log('Email mismatch:', { tokenEmail: verificationToken.identifier, providedEmail: email.toLowerCase() });
      return NextResponse.json(
        { error: 'Token does not match email address' },
        { status: 400 }
      );
    }

    // Update user's emailVerified field
    const updatedUser = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { emailVerified: new Date() },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true
      }
    });

    console.log('User verified successfully:', updatedUser.email);

    // Delete the used verification token
    await prisma.verificationToken.delete({
      where: { token }
    });

    // Redirect to verification success page
    return NextResponse.redirect(new URL('/auth/verification-success?verified=true', request.url));

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error during verification' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST route for resending verification email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log('Resend verification request for:', email);

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log('Normalized email:', normalizedEmail);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true
      }
    });

    if (!user) {
      console.log('User not found for email:', normalizedEmail);
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with this email exists and is unverified, a new verification email has been sent.' },
        { status: 200 }
      );
    }

    console.log('User found:', { id: user.id, email: user.email, verified: !!user.emailVerified });

    // Check if already verified
    if (user.emailVerified) {
      console.log('User already verified');
      return NextResponse.json(
        { error: 'This email address is already verified' },
        { status: 400 }
      );
    }

    // Delete any existing verification tokens for this email
    const deletedTokens = await prisma.verificationToken.deleteMany({
      where: { identifier: normalizedEmail }
    });
    console.log('Deleted existing tokens:', deletedTokens.count);

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    console.log('Generated new token:', verificationToken.substring(0, 8) + '...', 'expires:', tokenExpires);

    // Create new verification token
    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: verificationToken,
        expires: tokenExpires
      }
    });

    console.log('Created new verification token in database');

    // Send verification email
    try {
      await sendVerificationEmail(normalizedEmail, verificationToken, user.name || 'User');
      console.log('Verification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't expose email sending errors to client for security
      // But clean up the token since we couldn't send the email
      await prisma.verificationToken.delete({
        where: { token: verificationToken }
      });
      
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'A new verification email has been sent to your inbox.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}