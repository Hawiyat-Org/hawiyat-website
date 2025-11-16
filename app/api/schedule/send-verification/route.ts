import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';
import { createTransport } from 'nodemailer';

// Remove or update this config - use new syntax for Next.js 14.2+
export const maxDuration = 10; // 10 seconds timeout
export const dynamic = 'force-dynamic'; // Ensure it's treated as dynamic route

// Create transporter outside handler for connection reuse
let transporter: ReturnType<typeof createTransport> | null = null;

function getTransporter() {
  console.log('[TRANSPORTER] Checking transporter instance...');
  
  if (!transporter) {
    console.log('[TRANSPORTER] Creating new transporter with config:', {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || '587',
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER ? '***configured***' : 'MISSING',
      pass: process.env.SMTP_PASS ? '***configured***' : 'MISSING',
    });
    
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
    
    console.log('[TRANSPORTER] New transporter created successfully');
  } else {
    console.log('[TRANSPORTER] Reusing existing transporter');
  }
  
  return transporter;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log('\n[REQUEST START] ==================================');
  console.log('[REQUEST] Timestamp:', new Date().toISOString());
  console.log('[REQUEST] URL:', req.url);
  console.log('[REQUEST] Method:', req.method);
  
  try {
    // Parse request body
    console.log('[STEP 1] Parsing request body...');
    const { email, customerName } = await req.json();
    console.log('[STEP 1] Request data:', { email, customerName });

    // Validation: Required fields
    console.log('[STEP 2] Validating required fields...');
    if (!email || !customerName) {
      console.log('[VALIDATION ERROR] Missing required fields');
      return NextResponse.json(
        { error: 'Email and customer name are required' },
        { status: 400 }
      );
    }
    console.log('[STEP 2] Required fields validated ✓');

    // Validation: Email format
    console.log('[STEP 3] Validating email format...');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[VALIDATION ERROR] Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    console.log('[STEP 3] Email format validated ✓');

    // Validation: SMTP configuration
    console.log('[STEP 4] Checking SMTP configuration...');
    console.log('[STEP 4] Environment variables check:', {
      SMTP_HOST: process.env.SMTP_HOST || 'default: smtp.gmail.com',
      SMTP_PORT: process.env.SMTP_PORT || 'default: 587',
      SMTP_SECURE: process.env.SMTP_SECURE || 'default: false',
      SMTP_USER: process.env.SMTP_USER ? '✓ configured' : '✗ MISSING',
      SMTP_PASS: process.env.SMTP_PASS ? '✓ configured' : '✗ MISSING',
      SMTP_FROM: process.env.SMTP_FROM || 'will use SMTP_USER',
    });
    
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('[CRITICAL ERROR] SMTP credentials not configured!');
      console.error('[CRITICAL ERROR] SMTP_USER:', process.env.SMTP_USER ? 'set' : 'NOT SET');
      console.error('[CRITICAL ERROR] SMTP_PASS:', process.env.SMTP_PASS ? 'set' : 'NOT SET');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }
    console.log('[STEP 4] SMTP configuration validated ✓');

    // Generate verification code
    console.log('[STEP 5] Generating verification code...');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('[STEP 5] Generated code:', code);
    
    // Calculate expiration
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    console.log('[STEP 5] Code expires at:', expiresAt.toISOString());
    
    // Store in database
    console.log('[STEP 6] Storing code in database...');
    console.log('[STEP 6] Database operation: upsert for email:', email);
    
    try {
      const dbResult = await prisma.verificationCode.upsert({
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
      console.log('[STEP 6] Database operation successful ✓');
      console.log('[STEP 6] DB Result:', JSON.stringify(dbResult, null, 2));
    } catch (dbError) {
      console.error('[DATABASE ERROR] Failed to store verification code:', dbError);
      console.error('[DATABASE ERROR] Error details:', {
        name: dbError instanceof Error ? dbError.name : 'Unknown',
        message: dbError instanceof Error ? dbError.message : String(dbError),
        stack: dbError instanceof Error ? dbError.stack : undefined,
      });
      throw dbError;
    }

    // Get transporter
    console.log('[STEP 7] Getting email transporter...');
    const transport = getTransporter();
    console.log('[STEP 7] Transporter ready ✓');

    // Prepare email
    console.log('[STEP 8] Preparing email content...');
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
    
    console.log('[STEP 8] Email details:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      hasHtml: !!mailOptions.html,
      hasText: !!mailOptions.text,
    });

    // Send email with timeout protection
    console.log('[STEP 9] Sending email (with 8s timeout)...');
    const emailStartTime = Date.now();
    
    try {
      await Promise.race([
        transport.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email send timeout')), 8000)
        )
      ]);
      
      const emailDuration = Date.now() - emailStartTime;
      console.log('[STEP 9] Email sent successfully ✓');
      console.log('[STEP 9] Email send duration:', emailDuration + 'ms');
    } catch (emailError) {
      console.error('[EMAIL ERROR] Failed to send email:', emailError);
      console.error('[EMAIL ERROR] Error details:', {
        name: emailError instanceof Error ? emailError.name : 'Unknown',
        message: emailError instanceof Error ? emailError.message : String(emailError),
        stack: emailError instanceof Error ? emailError.stack : undefined,
      });
      throw emailError;
    }

    const totalDuration = Date.now() - startTime;
    console.log('[SUCCESS] ✓ Verification email process completed');
    console.log('[SUCCESS] Total duration:', totalDuration + 'ms');
    console.log('[REQUEST END] ==================================\n');

    return NextResponse.json({ 
      message: 'Verification code sent successfully' 
    });
    
  } catch (error) {
    const totalDuration = Date.now() - startTime;
    console.error('\n[ERROR] ✗ Request failed');
    console.error('[ERROR] Total duration before failure:', totalDuration + 'ms');
    console.error('[ERROR] Error caught in main handler:', error);
    console.error('[ERROR] Error type:', error?.constructor?.name);
    
    if (error instanceof Error) {
      console.error('[ERROR] Error name:', error.name);
      console.error('[ERROR] Error message:', error.message);
      console.error('[ERROR] Error stack:', error.stack);
    } else {
      console.error('[ERROR] Non-Error object thrown:', String(error));
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('timeout')) {
      console.error('[ERROR TYPE] Timeout error detected');
      return NextResponse.json(
        { error: 'Email service timeout. Please try again.' },
        { status: 504 }
      );
    }
    
    if (errorMessage.includes('auth') || errorMessage.includes('authentication')) {
      console.error('[ERROR TYPE] Authentication error detected');
      return NextResponse.json(
        { error: 'Email service authentication failed' },
        { status: 500 }
      );
    }
    
    if (errorMessage.includes('ECONNECTION') || errorMessage.includes('ETIMEDOUT')) {
      console.error('[ERROR TYPE] Connection error detected');
      return NextResponse.json(
        { error: 'Could not connect to email service' },
        { status: 503 }
      );
    }

    console.error('[ERROR TYPE] Generic error - returning 500');
    console.error('[REQUEST END] ==================================\n');
    
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}