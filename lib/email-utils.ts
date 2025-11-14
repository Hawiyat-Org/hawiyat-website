import { createTransport } from 'nodemailer';

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
            
            <p style="color: #475569; line-height: 1.6;">Thank you for choosing our service. If you have any questions or need to reschedule, please contact us at <a href="mailto:hawiyat0@gmail.com" style="color: #3b82f6;">hawiyat0@gmail.com</a>.</p>
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
      
      Thank you for choosing our service. If you have any questions or need to reschedule, please contact us at hawiyat0@gmail.com.
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