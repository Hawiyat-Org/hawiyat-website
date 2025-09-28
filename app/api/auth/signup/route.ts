// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma/prismaClient';
import { sendVerificationEmail } from '@/lib/third_partty/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Check if user already exists in DB
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Create the user in DB (emailVerified will be null until verified)
    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: `${firstName} ${lastName}`,
        password: hashedPassword,
        emailVerified: null // Important: email is not verified yet
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    // Create verification token in DB
    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: verificationToken,
        expires: tokenExpires
      }
    });

    // Send verification email
    try {
      await sendVerificationEmail(normalizedEmail, verificationToken, `${firstName} ${lastName}`);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      
      // Clean up created user and token if email fails
      await prisma.verificationToken.delete({
        where: { token: verificationToken }
      });
      await prisma.user.delete({
        where: { id: newUser.id }
      });

      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Account created successfully! Please check your email to verify your account before signing in.',
        user: newUser,
        requiresVerification: true
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}