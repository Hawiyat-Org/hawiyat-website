import { createTransport } from 'nodemailer';
import juice from 'juice';

async function sendWhatsAppNotification(message: string): Promise<boolean> {
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