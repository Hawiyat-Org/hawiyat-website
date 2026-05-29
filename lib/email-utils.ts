import { createTransport } from 'nodemailer';
import juice from 'juice';

export async function sendWhatsAppNotification(message: string): Promise<boolean> {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const basicAuth = process.env.WHATSAPP_BASIC_AUTH;

  if (!apiUrl || !basicAuth) {
    console.error('WhatsApp API credentials not configured');
    return false;
  }

  try {
    const response = await fetch(`${apiUrl}/send/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
      },
      body: JSON.stringify({
        phone: '120363427220233404@g.us',
        message: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WhatsApp API error:', response.status, errorText);
      return false;
    }

    console.log('WhatsApp notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return false;
  }
}

interface SendBookingConfirmationEmailProps {
  to: string;
  bookingDetails: {
    customerName: string;
    startTime: Date;
    endTime: Date;
    timezone: string;
    service?: {
      name: string;
    };
    notes?: string;
  };
}

/**
 * Sends a booking confirmation email using SMTP configuration from environment variables
 */
export async function sendBookingConfirmationEmail({
  to,
  bookingDetails
}: SendBookingConfirmationEmailProps): Promise<boolean> {
  try {
    // Get SMTP configuration from environment variables
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM
    } = process.env;

    // Validate SMTP configuration
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('Missing SMTP configuration in environment variables');
      return false;
    }

    // Create transporter
    const transporter = createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true', // Convert string to boolean
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    // Parse platform from notes if available
    let platform = 'Zoom'; // Default
    if (bookingDetails.notes) {
      const platformMatch = bookingDetails.notes.match(/Platform preference: (Microsoft Teams|Google Meet|Zoom)/);
      if (platformMatch) {
        platform = platformMatch[1];
      }
    }

    // Format the date and time for the email
    const formatDateTime = (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: bookingDetails.timezone,
        timeZoneName: 'short'
      }).format(date);
    };

    // Create email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h1 style="color: #1e293b; text-align: center;">Booking Confirmation</h1>
          
          <div style="background-color: white; padding: 25px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="color: #334155; margin-top: 0;">Hello ${bookingDetails.customerName},</h2>
            
            <p style="color: #475569; line-height: 1.6;">Your booking has been confirmed successfully!</p>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Booking Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Meeting:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${bookingDetails.service?.name || 'Consultation Meeting'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Date & Time:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${formatDateTime(bookingDetails.startTime)} - ${formatDateTime(bookingDetails.endTime)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Timezone:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${bookingDetails.timezone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Platform:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${platform}</td>
                </tr>
                ${bookingDetails.notes ? `<tr>
                  <td style="padding: 8px 0; color: #64748b;">Notes:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${bookingDetails.notes}</td>
                </tr>` : ''}
              </table>
            </div>
            
            <div style="background-color: #fffbeb; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-weight: 500;">Important:</p>
              <p style="color: #92400e; margin: 10px 0 0 0; line-height: 1.6;">Please join the meeting 5 minutes before the scheduled time. Meeting links will be sent closer to the meeting time.</p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">Thank you for choosing our service. If you have any questions or need to reschedule, please contact us at <a href="mailto:contact@hawiyat.org" style="color: #3b82f6;">contact@hawiyat.org</a>.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 14px;">
            <p>&copy; ${new Date().getFullYear()} Hawiyat. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    const textContent = `
      Booking Confirmation
      
      Hello ${bookingDetails.customerName},
      
      Your booking has been confirmed successfully!
      
      Booking Details:
      Meeting: ${bookingDetails.service?.name || 'Consultation Meeting'}
      Date & Time: ${formatDateTime(bookingDetails.startTime)} - ${formatDateTime(bookingDetails.endTime)}
      Timezone: ${bookingDetails.timezone}
      Platform: ${platform}
      ${bookingDetails.notes ? `Notes: ${bookingDetails.notes}` : ''}
      
      Important:
      Please join the meeting 5 minutes before the scheduled time. Meeting links will be sent closer to the meeting time.
      
      Thank you for choosing our service. If you have any questions or need to reschedule, please contact us at contact@hawiyat.org.
    `;

    // Send email
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject: `Booking Confirmation - ${formatDateTime(bookingDetails.startTime)}`,
      text: textContent,
      html: htmlContent
    });

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return false;
  }
}

interface SendOrderNotificationProps {
  order: {
    id: string;
    serviceId: string;
    serviceName: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string | null;
    preferredPayment?: string | null;
    notes?: string | null;
    status: string;
    createdAt: Date;
  };
}

const ADMIN_EMAILS = ['a_kadache@estin.dz', 'b_bouabca@estin.dz'];

export async function sendOrderNotification({
  order
}: SendOrderNotificationProps): Promise<boolean> {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('Missing SMTP configuration in environment variables');
      return false;
    }

    const transporter = createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const htmlTemplate = `
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background-color: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0; }
        h1 { color: #1e293b; text-align: center; }
        .card { background-color: white; padding: 25px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        h2 { color: #334155; margin-top: 0; }
        .details { background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0; }
        h3 { color: #1e293b; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px 0; }
        .label { color: #64748b; }
        .value { color: #1e293b; font-weight: 500; }
        .footer { text-align: center; margin-top: 30px; color: #94a3b8; font-size: 14px; }
      </style>
      <div class="container">
        <h1>New Order Received</h1>
        <div class="card">
          <h2>Hello Admin,</h2>
          <p style="color: #475569; line-height: 1.6;">A new order has been placed.</p>
          <div class="details">
            <h3>Order Details</h3>
            <table>
              <tr><td class="label">Order ID:</td><td class="value">${order.id}</td></tr>
              <tr><td class="label">Service:</td><td class="value">${order.serviceName}</td></tr>
              <tr><td class="label">Customer:</td><td class="value">${order.customerName}</td></tr>
              <tr><td class="label">Email:</td><td class="value"><a href="mailto:${order.customerEmail}">${order.customerEmail}</a></td></tr>
              ${order.customerPhone ? `<tr><td class="label">Phone:</td><td class="value">${order.customerPhone}</td></tr>` : ''}
              <tr><td class="label">Preferred Payment:</td><td class="value">${order.preferredPayment ? order.preferredPayment.toUpperCase() : 'Not specified'}</td></tr>
              <tr><td class="label">Status:</td><td class="value">${order.status}</td></tr>
              <tr><td class="label">Date:</td><td class="value">${new Date(order.createdAt).toLocaleString()}</td></tr>
              ${order.notes ? `<tr><td class="label">Notes:</td><td class="value">${order.notes}</td></tr>` : ''}
            </table>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Hawiyat. All rights reserved.</p>
        </div>
      </div>
    `;

    const inlinedHtml = juice(htmlTemplate);

    const textContent = `
New Order Received

Order ID: ${order.id}
Service: ${order.serviceName}
Customer: ${order.customerName}
Email: ${order.customerEmail}
${order.customerPhone ? `Phone: ${order.customerPhone}\n` : ''}Status: ${order.status}
Date: ${new Date(order.createdAt).toLocaleString()}
${order.notes ? `Notes: ${order.notes}\n` : ''}
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: ADMIN_EMAILS.join(', '),
      subject: `New Order: ${order.serviceName} from ${order.customerName}`,
      text: textContent,
      html: inlinedHtml
    });

    console.log('Admin notification sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
}

interface SendOrderConfirmationProps {
  to: string;
  order: {
    id: string;
    serviceName: string;
    customerName: string;
    notes?: string | null;
    createdAt: Date;
  };
}

export async function sendOrderConfirmation({
  to,
  order
}: SendOrderConfirmationProps): Promise<boolean> {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('Missing SMTP configuration in environment variables');
      return false;
    }

    const transporter = createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Received — Hawiyat</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #141414; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.4);">
                <!-- Top Accent Line -->
                <tr>
                  <td style="height: 3px; background: linear-gradient(90deg, #ffffff, #a3a3a3, #ffffff);"></td>
                </tr>
                <!-- Header -->
                <tr>
                  <td style="padding: 48px 40px 32px; text-align: center;">
                    <img src="https://hawiyat.org/logo.svg" alt="Hawiyat" width="56" height="56" style="display: block; margin: 0 auto 24px;" />
                    <p style="margin: 0 0 8px; color: #737373; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Hawiyat</p>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Order Received</h1>
                  </td>
                </tr>
                <!-- Confirmation Badge -->
                <tr>
                  <td style="padding: 0 40px 32px; text-align: center;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="display: inline-block; background-color: #22c55e; border-radius: 100px;">
                      <tr>
                        <td style="padding: 8px 20px;">
                          <p style="margin: 0; color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">✓ Order Confirmed</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 22px; font-weight: 600;">Hello ${order.customerName},</h2>
                    <p style="margin: 0 0 32px; color: #a3a3a3; font-size: 15px; line-height: 1.7;">
                      Thank you for your order! We've received it and our team will get back to you shortly with the next steps.
                    </p>
                    <!-- Order Details Card -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 16px; color: #737373; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">Order Summary</p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px; width: 100px;">Order ID</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right; font-family: monospace;">${order.id}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px;">Service</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right;">${order.serviceName}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px;">Date</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right;">${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            ${order.notes ? `<tr>
                              <td style="padding: 10px 0;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px; vertical-align: top;">Notes</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right; max-width: 300px;">${order.notes}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>` : ''}
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- Next Steps -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 12px; color: #ffffff; font-size: 14px; font-weight: 600;">What's next?</p>
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-right: 12px; vertical-align: top;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="background-color: #22c55e; border-radius: 50%; width: 24px; height: 24px;">
                                  <tr>
                                    <td align="center" style="color: #ffffff; font-size: 14px; font-weight: 700; line-height: 24px;">1</td>
                                  </tr>
                                </table>
                              </td>
                              <td style="color: #a3a3a3; font-size: 13px; line-height: 1.6; padding-bottom: 8px;">
                                Our team will review your order and contact you at <strong style="color: #ffffff;">${to}</strong>.
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-right: 12px; vertical-align: top;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="background-color: #22c55e; border-radius: 50%; width: 24px; height: 24px;">
                                  <tr>
                                    <td align="center" style="color: #ffffff; font-size: 14px; font-weight: 700; line-height: 24px;">2</td>
                                  </tr>
                                </table>
                              </td>
                              <td style="color: #a3a3a3; font-size: 13px; line-height: 1.6; padding-bottom: 8px;">
                                We'll confirm the details and set up your service.
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-right: 12px; vertical-align: top;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="background-color: #22c55e; border-radius: 50%; width: 24px; height: 24px;">
                                  <tr>
                                    <td align="center" style="color: #ffffff; font-size: 14px; font-weight: 700; line-height: 24px;">3</td>
                                  </tr>
                                </table>
                              </td>
                              <td style="color: #a3a3a3; font-size: 13px; line-height: 1.6;">
                                Sit back — we'll handle the rest.
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- Contact -->
                    <p style="margin: 0; color: #737373; font-size: 14px; line-height: 1.6; text-align: center;">
                      Questions? Reach us at <a href="mailto:contact@hawiyat.org" style="color: #ffffff; text-decoration: none; border-bottom: 1px solid #404040;">contact@hawiyat.org</a>
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #0f0f0f; padding: 24px 40px; text-align: center; border-top: 1px solid #1a1a1a;">
                    <p style="margin: 0 0 4px; color: #525252; font-size: 12px;">
                      &copy; ${new Date().getFullYear()} Hawiyat. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #404040; font-size: 11px;">
                      Build. Deploy. Scale.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const inlinedHtml = juice(htmlTemplate);

    const textContent = `
══════════════════════════════════════════╗
║            HAWIYAT                       ║
║         Order Received                   ║
══════════════════════════════════════════╝

Hello ${order.customerName},

Thank you for your order! We've received it and our team will get back to you shortly.

──────────────────────────────────────────
  ORDER SUMMARY
──────────────────────────────────────────
  Order ID :  ${order.id}
  Service  :  ${order.serviceName}
  Date     :  ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
${order.notes ? `  Notes    :  ${order.notes}` : ''}

──────────────────────────────────────────
  WHAT'S NEXT?
──────────────────────────────────────────
  1. Our team will review your order
  2. We'll contact you at ${to}
  3. Sit back — we'll handle the rest

Questions? contact@hawiyat.org

© ${new Date().getFullYear()} Hawiyat — Build. Deploy. Scale.
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject: `Order Received — ${order.serviceName} | Hawiyat`,
      text: textContent,
      html: inlinedHtml
    });

    console.log('Customer confirmation sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending customer confirmation:', error);
    return false;
  }
}

interface SendBootcampConfirmationProps {
  to: string;
  registration: {
    fullName: string;
    email: string;
    phone: string;
    university: string;
    major: string;
    graduationYear: string;
    topic?: string | null;
    deadline?: Date | null;
  };
}

export async function sendBootcampConfirmation({
  to,
  registration
}: SendBootcampConfirmationProps): Promise<boolean> {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('Missing SMTP configuration in environment variables');
      return false;
    }

    const transporter = createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const deadlineStr = registration.deadline
      ? new Date(registration.deadline).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
      : 'Non spécifiée';

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue au Hawiyat AI Bootcamp</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #141414; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.4);">
                <!-- Top Accent Line -->
                <tr>
                  <td style="height: 3px; background: linear-gradient(90deg, #ffffff, #a3a3a3, #ffffff);"></td>
                </tr>
                <!-- Header -->
                <tr>
                  <td style="padding: 48px 40px 32px; text-align: center;">
                    <img src="https://hawiyat.org/logo.svg" alt="Hawiyat" width="56" height="56" style="display: block; margin: 0 auto 24px;" />
                    <p style="margin: 0 0 8px; color: #737373; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Hawiyat</p>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">AI Bootcamp</h1>
                  </td>
                </tr>
                <!-- Confirmation Badge -->
                <tr>
                  <td style="padding: 0 40px 32px; text-align: center;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="display: inline-block; background-color: #22c55e; border-radius: 100px;">
                      <tr>
                        <td style="padding: 8px 20px;">
                          <p style="margin: 0; color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">✓ Inscription Confirmée</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 22px; font-weight: 600;">Bonjour ${registration.fullName},</h2>
                    <p style="margin: 0 0 32px; color: #a3a3a3; font-size: 15px; line-height: 1.7;">
                      Ton inscription au <strong style="color: #ffffff;">Hawiyat AI Bootcamp</strong> a été enregistrée avec succès. Prépare-toi à transformer ton mémoire en un vrai produit et à acquérir des compétences qui valent de l'argent.
                    </p>
                    <!-- Details Card -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 16px; color: #737373; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">Ton profil</p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px; width: 100px;">Université</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right;">${registration.university}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px;">Filière</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right;">${registration.major}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px;">Graduation</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right;">${registration.graduationYear}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px;">Deadline</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right;">${deadlineStr}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            ${registration.topic ? `<tr>
                              <td style="padding: 10px 0;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="color: #737373; font-size: 13px; vertical-align: top;">Sujet PFE</td>
                                    <td style="color: #ffffff; font-size: 13px; font-weight: 500; text-align: right; max-width: 300px;">${registration.topic}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>` : ''}
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- Next Steps -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 12px; color: #ffffff; font-size: 14px; font-weight: 600;">Prochaines étapes</p>
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-right: 12px; vertical-align: top;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="background-color: #22c55e; border-radius: 50%; width: 24px; height: 24px;">
                                  <tr>
                                    <td align="center" style="color: #ffffff; font-size: 14px; font-weight: 700; line-height: 24px;">1</td>
                                  </tr>
                                </table>
                              </td>
                              <td style="color: #a3a3a3; font-size: 13px; line-height: 1.6; padding-bottom: 8px;">
                                On te contactera sur WhatsApp au <strong style="color: #ffffff;">${registration.phone}</strong> dans les prochaines 48h.
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-right: 12px; vertical-align: top;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="background-color: #22c55e; border-radius: 50%; width: 24px; height: 24px;">
                                  <tr>
                                    <td align="center" style="color: #ffffff; font-size: 14px; font-weight: 700; line-height: 24px;">2</td>
                                  </tr>
                                </table>
                              </td>
                              <td style="color: #a3a3a3; font-size: 13px; line-height: 1.6; padding-bottom: 8px;">
                                Session de kickoff gratuite pour clarifier ton projet et définir ton MVP.
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-right: 12px; vertical-align: top;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="background-color: #22c55e; border-radius: 50%; width: 24px; height: 24px;">
                                  <tr>
                                    <td align="center" style="color: #ffffff; font-size: 14px; font-weight: 700; line-height: 24px;">3</td>
                                  </tr>
                                </table>
                              </td>
                              <td style="color: #a3a3a3; font-size: 13px; line-height: 1.6;">
                                Début des sessions — mémoire, MVP, déploiement, et module freelance.
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- Contact -->
                    <p style="margin: 0; color: #737373; font-size: 14px; line-height: 1.6; text-align: center;">
                      Des questions ? Écris-nous à <a href="mailto:contact@hawiyat.org" style="color: #ffffff; text-decoration: none; border-bottom: 1px solid #404040;">contact@hawiyat.org</a>
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #0f0f0f; padding: 24px 40px; text-align: center; border-top: 1px solid #1a1a1a;">
                    <p style="margin: 0 0 4px; color: #525252; font-size: 12px;">
                      &copy; ${new Date().getFullYear()} Hawiyat. Tous droits réservés.
                    </p>
                    <p style="margin: 0; color: #404040; font-size: 11px;">
                      Construis. Déploie. Scale.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const inlinedHtml = juice(htmlTemplate);

    const textContent = `
══════════════════════════════════════════╗
║         HAWIYAT AI BOOTCAMP              ║
║       Inscription Confirmée              ║
╚══════════════════════════════════════════╝

Bonjour ${registration.fullName},

Ton inscription au Hawiyat AI Bootcamp a été enregistrée avec succès.
Prépare-toi à transformer ton mémoire en un vrai produit.

──────────────────────────────────────────
  TON PROFIL
──────────────────────────────────────────
  Université :  ${registration.university}
  Filière    :  ${registration.major}
  Graduation :  ${registration.graduationYear}
  Deadline   :  ${deadlineStr}
${registration.topic ? `  Sujet PFE  :  ${registration.topic}` : ''}

──────────────────────────────────────────
  PROCHAINES ÉTAPES
──────────────────────────────────────────
  1. Contact WhatsApp au ${registration.phone} (sous 48h)
  2. Session de kickoff gratuite
  3. Début des sessions — mémoire, MVP, déploiement

Des questions ? contact@hawiyat.org

© ${new Date().getFullYear()} Hawiyat — Construis. Déploie. Scale.
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject: 'Bienvenue au Hawiyat AI Bootcamp',
      text: textContent,
      html: inlinedHtml
    });

    console.log('Bootcamp confirmation sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending bootcamp confirmation:', error);
    return false;
  }
}