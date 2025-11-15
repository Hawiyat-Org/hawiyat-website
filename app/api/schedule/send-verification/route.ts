import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';
import { createTransport } from 'nodemailer';

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

    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the code with an expiration time (10 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    // Store in database (upsert to handle duplicate emails)
    await prisma.verificationCode.upsert({
      where: { email },
      update: { 
        code, 
        expiresAt,
        createdAt: new Date() // Update timestamp on resend
      },
      create: { 
        email, 
        code, 
        expiresAt 
      }
    });

    console.log('Stored verification code for:', email);

    // Create transporter (using environment variables for configuration)
    const transporter = createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Verification email sent successfully to:', email);

    return NextResponse.json({ 
      message: 'Verification code sent successfully' 
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}