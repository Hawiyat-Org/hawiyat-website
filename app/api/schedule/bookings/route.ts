// app/api/schedule/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prismaClient';
import { BookingStatus } from '@prisma/client';
import { sendBookingConfirmationEmail } from '@/lib/email-utils';

// Escape special characters for Telegram Markdown
const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
};

// Telegram notification function
async function sendTelegramNotification(booking: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured');
    return false;
  }

  try {
    const startTimeFormatted = new Date(booking.startTime).toLocaleString('en-US', { 
      dateStyle: 'full', 
      timeStyle: 'short',
      timeZone: booking.timezone 
    });
    
    const endTimeFormatted = new Date(booking.endTime).toLocaleString('en-US', { 
      timeStyle: 'short',
      timeZone: booking.timezone 
    });

    const message = `
🔔 *New Booking Received*

👤 *Customer:* ${escapeMarkdown(booking.customerName)}
📧 *Email:* ${escapeMarkdown(booking.customerEmail)}
📱 *Phone:* ${booking.customerPhone ? escapeMarkdown(booking.customerPhone) : 'N/A'}

📅 *Start:* ${escapeMarkdown(startTimeFormatted)}
📅 *End:* ${escapeMarkdown(endTimeFormatted)}

${booking.service ? `🎯 *Service:* ${escapeMarkdown(booking.service.name)}\n` : ''}${booking.notes ? `📝 *Notes:* ${escapeMarkdown(booking.notes)}\n` : ''}
✅ *Status:* ${escapeMarkdown(booking.status)}
🆔 *Booking ID:* ${escapeMarkdown(booking.id)}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const data = await response.json();
    
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      startTime,
      endTime,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      timezone = 'UTC',
      serviceId
    } = body;

    // Validation
    if (!startTime || !endTime || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: startTime, endTime, customerName, customerEmail' },
        { status: 400 }
      );
    }

    // Parse dates
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (start >= end) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      );
    }

    // Check if time slot is in the past
    const now = new Date();
    if (start < now) {
      return NextResponse.json(
        { error: 'Cannot book time slots in the past' },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        status: {
          in: [BookingStatus.CONFIRMED, BookingStatus.PENDING]
        },
        OR: [
          {
            AND: [
              { startTime: { lte: start } },
              { endTime: { gt: start } }
            ]
          },
          {
            AND: [
              { startTime: { lt: end } },
              { endTime: { gte: end } }
            ]
          },
          {
            AND: [
              { startTime: { gte: start } },
              { endTime: { lte: end } }
            ]
          }
        ]
      }
    });

    if (overlappingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Check if date is blocked
    const dateStr = start.toISOString().split('T')[0];
    const blockedDate = await prisma.blockedDate.findFirst({
      where: {
        date: new Date(dateStr)
      }
    });

    if (blockedDate) {
      // If specific time range is blocked
      if (blockedDate.startTime && blockedDate.endTime) {
        const [blockStartHour, blockStartMin] = blockedDate.startTime.split(':').map(Number);
        const [blockEndHour, blockEndMin] = blockedDate.endTime.split(':').map(Number);
        
        const blockStart = new Date(start);
        blockStart.setHours(blockStartHour, blockStartMin, 0, 0);
        
        const blockEnd = new Date(start);
        blockEnd.setHours(blockEndHour, blockEndMin, 0, 0);

        // Check if booking falls within blocked time range
        if (
          (start >= blockStart && start < blockEnd) ||
          (end > blockStart && end <= blockEnd) ||
          (start <= blockStart && end >= blockEnd)
        ) {
          return NextResponse.json(
            { error: `This date is blocked: ${blockedDate.reason || 'Unavailable'}` },
            { status: 400 }
          );
        }
      } else {
        // Entire day is blocked
        return NextResponse.json(
          { error: `This date is blocked: ${blockedDate.reason || 'Unavailable'}` },
          { status: 400 }
        );
      }
    }

    // Check business hours
    const dayOfWeek = start.getDay();
    const businessHour = await prisma.businessHours.findUnique({
      where: { dayOfWeek }
    });

    if (!businessHour || !businessHour.isOpen) {
      return NextResponse.json(
        { error: 'Business is closed on this day' },
        { status: 400 }
      );
    }

    // Verify booking is within business hours
    const [bhStartHour, bhStartMin] = businessHour.startTime.split(':').map(Number);
    const [bhEndHour, bhEndMin] = businessHour.endTime.split(':').map(Number);
    
    const bhStart = new Date(start);
    bhStart.setHours(bhStartHour, bhStartMin, 0, 0);
    
    const bhEnd = new Date(start);
    bhEnd.setHours(bhEndHour, bhEndMin, 0, 0);

    if (start < bhStart || end > bhEnd) {
      return NextResponse.json(
        { error: 'Booking time is outside business hours' },
        { status: 400 }
      );
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        startTime: start,
        endTime: end,
        customerName,
        customerEmail,
        customerPhone,
        notes,
        timezone,
        status: BookingStatus.CONFIRMED,
        serviceId
      },
      include: {
        service: true
      }
    });

    // Send confirmation email to the customer
    try {
      const emailSent = await sendBookingConfirmationEmail({
        to: customerEmail,
        bookingDetails: {
          customerName,
          startTime: start,
          endTime: end,
          timezone,
          service: booking.service || undefined,
          notes
        }
      });

      if (!emailSent) {
        console.warn('Failed to send booking confirmation email to:', customerEmail);
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the booking if email fails
    }

    // Send Telegram notification
    try {
      const telegramSent = await sendTelegramNotification(booking);
      
      if (!telegramSent) {
        console.warn('Failed to send Telegram notification');
      }
    } catch (telegramError) {
      console.error('Error sending Telegram notification:', telegramError);
      // Don't fail the booking if Telegram notification fails
    }

    return NextResponse.json({
      booking,
      message: 'Booking confirmed successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}