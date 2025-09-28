// lib/email-templates.ts
import nodemailer from 'nodemailer';
import juice from 'juice';
import path from 'path';
import fs from 'fs';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper function to get logo attachment
const getLogoAttachment = () => {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    
    // Check if logo exists
    if (fs.existsSync(logoPath)) {
      return {
        filename: 'logo.png',
        path: logoPath,
        cid: 'logo' // Content-ID for referencing in HTML
      };
    }
    
    console.warn('Logo file not found at public/logo.png, falling back to text logo');
    return null;
  } catch (error) {
    console.warn('Error reading logo file:', error);
    return null;
  }
};

// Base email template with Vercel-inspired styling
const createEmailTemplate = (content: string, title: string = '', hasLogo: boolean = true) => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #000000;
          background-color: #ffffff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Container */
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        
        /* Header */
        .email-header {
          padding: 48px 24px 32px 24px;
          text-align: center;
          border-bottom: 1px solid #eaeaea;
        }
        
        .logo {
          display: inline-block;
          margin-bottom: 8px;
        }
        
        .logo-img {
          height: 128px;
          width: auto;
          display: block;
          margin: 0 auto;
        }
        
        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          text-decoration: none;
          margin-bottom: 8px;
          display: inline-block;
        }
        
        .logo-subtitle {
          font-size: 14px;
          color: #666666;
          font-weight: 400;
        }
        
        /* Main content */
        .email-content {
          padding: 32px 24px;
        }
        
        .content-title {
          font-size: 24px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        .content-subtitle {
          font-size: 16px;
          color: #666666;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        
        .content-text {
          font-size: 14px;
          color: #000000;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        
        .content-text-secondary {
          font-size: 14px;
          color: #666666;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        
        /* Buttons */
        .button-container {
          margin: 32px 0;
          text-align: center;
        }
        
        .button-primary {
          display: inline-block;
          background-color: #000000;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #000000;
          transition: all 0.2s ease;
        }
        
        .button-primary:hover {
          background-color: #333333;
          border-color: #333333;
        }
        
        .button-secondary {
          display: inline-block;
          background-color: transparent;
          color: #000000;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #eaeaea;
          transition: all 0.2s ease;
        }
        
        .button-secondary:hover {
          border-color: #000000;
        }
        
        /* Code/Link styling */
        .code-block {
          background-color: #f6f8fa;
          border: 1px solid #eaeaea;
          border-radius: 6px;
          padding: 16px;
          margin: 16px 0;
          font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 14px;
          color: #000000;
          word-break: break-all;
          overflow-wrap: break-word;
        }
        
        .inline-code {
          background-color: #f6f8fa;
          border: 1px solid #eaeaea;
          border-radius: 3px;
          padding: 2px 6px;
          font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 13px;
          color: #000000;
        }
        
        /* Dividers */
        .divider {
          border: 0;
          border-top: 1px solid #eaeaea;
          margin: 32px 0;
        }
        
        /* Lists */
        .list {
          margin: 16px 0;
          padding-left: 0;
        }
        
        .list-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          font-size: 14px;
          color: #000000;
          line-height: 1.6;
        }
        
        .list-item-bullet {
          width: 4px;
          height: 4px;
          background-color: #666666;
          border-radius: 50%;
          margin-right: 12px;
          margin-top: 10px;
          flex-shrink: 0;
        }
        
        /* Footer */
        .email-footer {
          padding: 32px 24px;
          border-top: 1px solid #eaeaea;
          text-align: center;
        }
        
        .footer-text {
          font-size: 12px;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        
        .footer-links {
          margin-top: 16px;
        }
        
        .footer-link {
          color: #666666;
          text-decoration: none;
          font-size: 12px;
          margin: 0 8px;
        }
        
        .footer-link:hover {
          color: #000000;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
          }
          
          .email-header,
          .email-content,
          .email-footer {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          
          .content-title {
            font-size: 20px !important;
          }
          
          .logo-img {
            height: 28px !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #000000 !important;
            color: #ffffff !important;
          }
          
          .email-container {
            background-color: #000000 !important;
          }
          
          .email-header {
            border-bottom-color: #333333 !important;
          }
          
          .logo-text {
            color: #ffffff !important;
          }
          
          .content-title {
            color: #ffffff !important;
          }
          
          .content-text {
            color: #ffffff !important;
          }
          
          .button-primary {
            background-color: #ffffff !important;
            color: #000000 !important;
            border-color: #ffffff !important;
          }
          
          .button-secondary {
            color: #ffffff !important;
            border-color: #333333 !important;
          }
          
          .code-block {
            background-color: #111111 !important;
            border-color: #333333 !important;
            color: #ffffff !important;
          }
          
          .inline-code {
            background-color: #111111 !important;
            border-color: #333333 !important;
            color: #ffffff !important;
          }
          
          .divider {
            border-top-color: #333333 !important;
          }
          
          .email-footer {
            border-top-color: #333333 !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        ${content.replace('{{LOGO_ELEMENT}}', hasLogo 
          ? '<img src="cid:logo" alt="Logo" class="logo-img" />'
          : `<div class="logo-text">${process.env.APP_NAME || "Hawiyat"}</div>`
        )}
      </div>
    </body>
    </html>
  `;
  
  // Inline CSS using Juice
  return juice(template, {
    removeStyleTags: false,
    preserveMediaQueries: true,
    preserveFontFaces: true,
  });
};

// Email verification template
export async function sendVerificationEmail(
    email: string,
    token: string,
    userName: string
  ) {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    const appName = process.env.APP_NAME || 'Hawiyat';
    
    const logoAttachment = getLogoAttachment();
    const hasLogo = logoAttachment !== null;
  
    const content = `
      <div class="email-header">
        <div class="logo">{{LOGO_ELEMENT}}</div>
        <div class="logo-subtitle">Verify your email address</div>
      </div>
      
      <div class="email-content">
        <h1 class="content-title">Verify your email address</h1>
        <p class="content-subtitle">Hi ${userName}, welcome to ${appName}!</p>
        
        <p class="content-text">
          To complete your account setup and ensure the security of your account, 
          please verify your email address by clicking the button below.
        </p>
        
        <div class="button-container">
          <a href="${verificationUrl}" class="button-primary">Verify Email Address</a>
        </div>
        
        <p class="content-text-secondary">
          Or copy and paste this URL into your browser:
        </p>
        
        <div class="code-block">${verificationUrl}</div>
        
        <hr class="divider">
        
        <p class="content-text-secondary">
          This verification link will expire in 24 hours. If you didn't create an account 
          with ${appName}, you can safely ignore this email.
        </p>
      </div>
      
      <div class="email-footer">
        <p class="footer-text">
          This email was sent to <span class="inline-code">${email}</span>
        </p>
        <p class="footer-text">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </p>
      </div>
    `;
  
    const htmlContent = createEmailTemplate(content, `Verify your email - ${appName}`, hasLogo);
    
    const textContent = `
  ${appName} - Verify your email address
  
  Hi ${userName},
  
  Welcome to ${appName}! To complete your account setup, please verify your email address by visiting:
  
  ${verificationUrl}
  
  This verification link will expire in 24 hours.
  
  If you didn't create an account with ${appName}, you can safely ignore this email.
  
  © ${new Date().getFullYear()} ${appName}
    `.trim();
  
    interface MailOptions {
      from: string;
      to: string;
      subject: string;
      html: string;
      text: string;
      attachments?: Array<{
        filename: string;
        content?: Buffer;
        path?: string;
        cid?: string;
      }>;
    }
  
    const mailOptions: MailOptions = {
      from: `"${appName}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: `Verify your email address - ${appName}`,
      html: htmlContent,
      text: textContent,
    };
    
    // Add logo attachment if available
    if (logoAttachment) {
      mailOptions.attachments = [logoAttachment];
    }
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Verification email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  }
  
  // Welcome email template
  export async function sendWelcomeEmail(email: string, userName: string) {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const appName = process.env.APP_NAME || 'Hawiyat';
    
    const logoAttachment = getLogoAttachment();
    const hasLogo = logoAttachment !== null;
  
    const content = `
      <div class="email-header">
        <div class="logo">{{LOGO_ELEMENT}}</div>
        <div class="logo-subtitle">Welcome aboard!</div>
      </div>
      
      <div class="email-content">
        <h1 class="content-title">You're all set, ${userName}!</h1>
        <p class="content-subtitle">Your account has been successfully verified.</p>
        
        <p class="content-text">
          Welcome to ${appName}! We're excited to have you on board. 
          Your account is now active and ready to use.
        </p>
        
        <div class="button-container">
          <a href="${baseUrl}/dashboard" class="button-primary">Get Started</a>
          <a href="${baseUrl}/auth/signin" class="button-secondary">Sign In</a>
        </div>
        
        <hr class="divider">
        
        <p class="content-text">Here's what you can do now:</p>
        
        <div class="list">
          <div class="list-item">
            <div class="list-item-bullet"></div>
            <span>Access your personalized dashboard</span>
          </div>
          <div class="list-item">
            <div class="list-item-bullet"></div>
            <span>Explore all available features</span>
          </div>
          <div class="list-item">
            <div class="list-item-bullet"></div>
            <span>Customize your account settings</span>
          </div>
          <div class="list-item">
            <div class="list-item-bullet"></div>
            <span>Connect with our community</span>
          </div>
        </div>
        
        <hr class="divider">
        
        <p class="content-text-secondary">
          Need help getting started? Check out our documentation or reach out to our support team.
        </p>
      </div>
      
      <div class="email-footer">
        <p class="footer-text">
          This email was sent to <span class="inline-code">${email}</span>
        </p>
        <div class="footer-links">
          <a href="${baseUrl}/help" class="footer-link">Help Center</a>
          <a href="${baseUrl}/contact" class="footer-link">Contact Support</a>
          <a href="${baseUrl}/unsubscribe" class="footer-link">Unsubscribe</a>
        </div>
        <p class="footer-text">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </p>
      </div>
    `;
  
    const htmlContent = createEmailTemplate(content, `Welcome to ${appName}!`, hasLogo);
    
    const textContent = `
  ${appName} - Welcome aboard!
  
  Hi ${userName},
  
  You're all set! Your account has been successfully verified and you're now ready to use ${appName}.
  
  Get started: ${baseUrl}/dashboard
  Sign in: ${baseUrl}/auth/signin
  
  Here's what you can do now:
  • Access your personalized dashboard
  • Explore all available features  
  • Customize your account settings
  • Connect with our community
  
  Need help? Visit ${baseUrl}/help or contact our support team.
  
  © ${new Date().getFullYear()} ${appName}
    `.trim();
  
    interface MailOptions {
      from: string;
      to: string;
      subject: string;
      html: string;
      text: string;
      attachments?: Array<{
        filename: string;
        content?: Buffer;
        path?: string;
        cid?: string;
      }>;
    }
  
    const mailOptions: MailOptions = {
      from: `"${appName}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: `Welcome to ${appName}!`,
      html: htmlContent,
      text: textContent,
    };
    
    // Add logo attachment if available
    if (logoAttachment) {
      mailOptions.attachments = [logoAttachment];
    }
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Welcome email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
  
  // Password reset template
  export async function sendPasswordResetEmail(
    email: string,
    token: string,
    userName: string
  ) {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    const appName = process.env.APP_NAME || 'Hawiyat';
    
    const logoAttachment = getLogoAttachment();
    const hasLogo = logoAttachment !== null;
  
    const content = `
      <div class="email-header">
        <div class="logo">{{LOGO_ELEMENT}}</div>
        <div class="logo-subtitle">Reset your password</div>
      </div>
      
      <div class="email-content">
        <h1 class="content-title">Reset your password</h1>
        <p class="content-subtitle">Hi ${userName},</p>
        
        <p class="content-text">
          We received a request to reset your password for your ${appName} account. 
          Click the button below to create a new password.
        </p>
        
        <div class="button-container">
          <a href="${resetUrl}" class="button-primary">Reset Password</a>
        </div>
        
        <p class="content-text-secondary">
          Or copy and paste this URL into your browser:
        </p>
        
        <div class="code-block">${resetUrl}</div>
        
        <hr class="divider">
        
        <p class="content-text-secondary">
          This password reset link will expire in 1 hour. If you didn't request a password reset, 
          you can safely ignore this email - your password won't be changed.
        </p>
        
        <p class="content-text-secondary">
          For security reasons, if you continue to receive these emails, 
          please contact our support team immediately.
        </p>
      </div>
      
      <div class="email-footer">
        <p class="footer-text">
          This email was sent to <span class="inline-code">${email}</span>
        </p>
        <div class="footer-links">
          <a href="${baseUrl}/help" class="footer-link">Help Center</a>
          <a href="${baseUrl}/contact" class="footer-link">Contact Support</a>
        </div>
        <p class="footer-text">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </p>
      </div>
    `;
  
    const htmlContent = createEmailTemplate(content, `Reset your password - ${appName}`, hasLogo);
    
    const textContent = `
  ${appName} - Reset your password
  
  Hi ${userName},
  
  We received a request to reset your password for your ${appName} account.
  
  Reset your password: ${resetUrl}
  
  This password reset link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
  
  © ${new Date().getFullYear()} ${appName}
    `.trim();
  
    interface MailOptions {
      from: string;
      to: string;
      subject: string;
      html: string;
      text: string;
      attachments?: Array<{
        filename: string;
        content?: Buffer;
        path?: string;
        cid?: string;
      }>;
    }
  
    const mailOptions: MailOptions = {
      from: `"${appName}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: `Reset your password - ${appName}`,
      html: htmlContent,
      text: textContent,
    };
    
    // Add logo attachment if available
    if (logoAttachment) {
      mailOptions.attachments = [logoAttachment];
    }
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Password reset email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }