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
        .info-box { background-color: #fffbeb; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .info-box p { color: #92400e; margin: 0; line-height: 1.6; }
        .footer { text-align: center; margin-top: 30px; color: #94a3b8; font-size: 14px; }
        a { color: #3b82f6; }
      </style>
      <div class="container">
        <h1>Order Received</h1>
        <div class="card">
          <h2>Hello ${order.customerName},</h2>
          <p style="color: #475569; line-height: 1.6;">Thank you for your order! We have received it and will contact you shortly.</p>
          <div class="details">
            <h3>Order Summary</h3>
            <table>
              <tr><td class="label">Order ID:</td><td class="value">${order.id}</td></tr>
              <tr><td class="label">Service:</td><td class="value">${order.serviceName}</td></tr>
              <tr><td class="label">Date:</td><td class="value">${new Date(order.createdAt).toLocaleString()}</td></tr>
            </table>
          </div>
          <div class="info-box">
            <p style="font-weight: 500;">What's next?</p>
            <p style="margin-top: 10px;">Our team will review your order and contact you at <a href="mailto:${to}">${to}</a> with the next steps.</p>
          </div>
          <p style="color: #475569; line-height: 1.6;">If you have any questions, please contact us at <a href="mailto:contact@hawiyat.org">contact@hawiyat.org</a>.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Hawiyat. All rights reserved.</p>
        </div>
      </div>
    `;

    const inlinedHtml = juice(htmlTemplate);

    const textContent = `
Order Received - ${order.serviceName}

Hello ${order.customerName},

Thank you for your order! We have received it and will contact you shortly.

Order Summary:
Order ID: ${order.id}
Service: ${order.serviceName}
Date: ${new Date(order.createdAt).toLocaleString()}

What's next?
Our team will review your order and contact you at ${to} with the next steps.

If you have any questions, please contact us at contact@hawiyat.org.
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject: `Order Received - ${order.serviceName} | Hawiyat`,
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
        <title>Confirmation d'inscription - Hawiyat AI Bootcamp</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #0a0a0a; padding: 40px 40px 30px; text-align: center;">
                    <img src="https://hawiyat.org/logo.svg" alt="Hawiyat" width="60" height="60" style="display: block; margin: 0 auto 20px;" />
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">Hawiyat AI Bootcamp</h1>
                    <p style="margin: 8px 0 0; color: #a3a3a3; font-size: 14px;">Inscription confirmée</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 16px; color: #171717; font-size: 20px; font-weight: 600;">Bonjour ${registration.fullName},</h2>
                    <p style="margin: 0 0 24px; color: #525252; font-size: 15px; line-height: 1.6;">
                      Ton inscription au <strong style="color: #171717;">Hawiyat AI Bootcamp</strong> a été reçue avec succès. On te contactera bientôt via WhatsApp pour planifier le kickoff.
                    </p>
                    <!-- Details Card -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 8px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <h3 style="margin: 0 0 16px; color: #171717; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Tes informations</h3>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 6px 0; color: #737373; font-size: 13px; width: 120px;">Université</td>
                              <td style="padding: 6px 0; color: #171717; font-size: 13px; font-weight: 500;">${registration.university}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; color: #737373; font-size: 13px;">Filière</td>
                              <td style="padding: 6px 0; color: #171717; font-size: 13px; font-weight: 500;">${registration.major}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; color: #737373; font-size: 13px;">Graduation</td>
                              <td style="padding: 6px 0; color: #171717; font-size: 13px; font-weight: 500;">${registration.graduationYear}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; color: #737373; font-size: 13px;">Deadline</td>
                              <td style="padding: 6px 0; color: #171717; font-size: 13px; font-weight: 500;">${deadlineStr}</td>
                            </tr>
                            ${registration.topic ? `<tr>
                              <td style="padding: 6px 0; color: #737373; font-size: 13px;">Sujet PFE</td>
                              <td style="padding: 6px 0; color: #171717; font-size: 13px; font-weight: 500;">${registration.topic}</td>
                            </tr>` : ''}
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- Next Steps -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border-left: 3px solid #171717; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="margin: 0 0 8px; color: #171717; font-size: 14px; font-weight: 600;">Prochaines étapes</p>
                          <p style="margin: 0; color: #525252; font-size: 13px; line-height: 1.6;">
                            Notre équipe te contactera sur WhatsApp au <strong style="color: #171717;">${registration.phone}</strong> dans les prochaines 48h pour organiser la session de kickoff gratuite.
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 0; color: #525252; font-size: 14px; line-height: 1.6;">
                      Si tu as des questions, n'hésite pas à nous écrire à <a href="mailto:contact@hawiyat.org" style="color: #171717; text-decoration: underline;">contact@hawiyat.org</a>.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #fafafa; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0; color: #a3a3a3; font-size: 12px;">
                      &copy; ${new Date().getFullYear()} Hawiyat. Tous droits réservés.
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
Hawiyat AI Bootcamp - Inscription confirmée

Bonjour ${registration.fullName},

Ton inscription au Hawiyat AI Bootcamp a été reçue avec succès. On te contactera bientôt via WhatsApp pour planifier le kickoff.

Tes informations:
Université: ${registration.university}
Filière: ${registration.major}
Graduation: ${registration.graduationYear}
Deadline: ${deadlineStr}
${registration.topic ? `Sujet PFE: ${registration.topic}` : ''}

Prochaines étapes:
Notre équipe te contactera sur WhatsApp au ${registration.phone} dans les prochaines 48h.

Si tu as des questions, écris-nous à contact@hawiyat.org.

© ${new Date().getFullYear()} Hawiyat. Tous droits réservés.
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject: 'Inscription confirmée - Hawiyat AI Bootcamp',
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