import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';
import { createTransport } from 'nodemailer';

// Remove or update this config - use new syntax for Next.js 14.2+
export const maxDuration = 10; // 10 seconds timeout
export const dynamic = 'force-dynamic'; // Ensure it's treated as dynamic route

// Create transporter outside handler for connection reuse
let transporter: ReturnType<typeof createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      pool: false,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });
  }
  return transporter;
}

export async function POST(req: NextRequest) {
  try {
    const { email, customerName } = await req.json();

    if (!email || !customerName) {
      return NextResponse.json(
        { error: 'Email and customer name are required' },
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

    // Validate SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the code with an expiration time (10 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    // Store in database first (faster operation)
    await prisma.verificationCode.upsert({
      where: { email },
      update: { 
        code, 
        expiresAt,
        createdAt: new Date()
      },
      create: { 
        email, 
        code, 
        expiresAt 
      }
    });

    console.log('Stored verification code for:', email);

    // Get transporter
    const transport = getTransporter();

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Booking Verification Code - Hawiyat',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827;">Booking Verification</h2>
          <p>Hello ${customerName},</p>
          <p>Your verification code for your booking on Hawiyat is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; background: #f3f4f6; padding: 10px 20px; border-radius: 4px;">
              ${code}
            </span>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">This is an automated message from Hawiyat. Please do not reply to this email.</p>
        </div>
      `,
      text: `Hello ${customerName},\n\nYour verification code for your booking on Hawiyat is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this verification, please ignore this email.`,
    };

    // Send email with timeout protection
    await Promise.race([
      transport.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 8000)
      )
    ]);

    console.log('Verification email sent successfully to:', email);

    return NextResponse.json({ 
      message: 'Verification code sent successfully' 
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('timeout')) {
      return NextResponse.json(
        { error: 'Email service timeout. Please try again.' },
        { status: 504 }
      );
    }
    
    if (errorMessage.includes('auth') || errorMessage.includes('authentication')) {
      return NextResponse.json(
        { error: 'Email service authentication failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}