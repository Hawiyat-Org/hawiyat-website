// app/api/schedule/availability/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './prismaClient';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get('month'); // YYYY-MM format
    const date = searchParams.get('date');   // YYYY-MM-DD format

    // If date is provided but month is not, extract month from date
    let yearValue: number;
    let monthValue: number;

    if (date && !month) {
      const [y, m] = date.split('-').map(Number);
      yearValue = y;
      monthValue = m;
    } else if (month) {
      const [y, m] = month.split('-').map(Number);
      yearValue = y;
      monthValue = m;
    } else {
      return NextResponse.json(
        { error: 'Either month or date parameter is required' },
        { status: 400 }
      );
    }

    // Parse month to get start and end dates
    const startOfMonth = new Date(yearValue, monthValue - 1, 1);
    const endOfMonth = new Date(yearValue, monthValue, 0, 23, 59, 59, 999);

    // Fetch business hours
    const businessHours = await prisma.businessHours.findMany({
      orderBy: { dayOfWeek: 'asc' }
    });

    // Log for debugging
    console.log('Business hours found:', businessHours.length);
    if (businessHours.length === 0) {
      console.warn('⚠️  No business hours configured! Run: npm run db:seed');
    }

    // Fetch blocked dates for the month
    const blockedDates = await prisma.blockedDate.findMany({
      where: {
        date: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      }
    });

    // Fetch all bookings for the month to determine availability
    const bookings = await prisma.booking.findMany({
      where: {
        startTime: {
          gte: startOfMonth,
          lte: endOfMonth
        },
        status: {
          in: ['CONFIRMED', 'PENDING']
        }
      },
      select: {
        startTime: true,
        endTime: true
      }
    });

    // Generate calendar days
    const daysInMonth = new Date(yearValue, monthValue, 0).getDate();
    const businessHoursMap = businessHours.reduce((acc: Record<number, any>, bh: any) => {
      acc[bh.dayOfWeek] = bh;
      return acc;
    }, {} as Record<number, any>);

    const blockedDatesSet = new Set(
      blockedDates.map((bd: any) => bd.date.toISOString().split('T')[0])
    );

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateStr = `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dateObj = new Date(dateStr);
      const dayOfWeek = dateObj.getDay();

      const isBlocked = blockedDatesSet.has(dateStr);
      const businessHour = businessHoursMap[dayOfWeek];
      const isOpen = businessHour?.isOpen ?? false;

      // Check if date is in the past (compare dates only, not time)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkDate = new Date(dateStr);
      checkDate.setHours(0, 0, 0, 0);
      const isPast = checkDate < today;

      const hasBookings = bookings.some((booking: any) => {
        const bookingDate = booking.startTime.toISOString().split('T')[0];
        return bookingDate === dateStr;
      });

      return {
        date: dateStr,
        isAvailable: isOpen && !isBlocked && !isPast,
        hasBookings,
        reason: isBlocked ? 'blocked' : !isOpen ? 'closed' : isPast ? 'past' : undefined
      };
    });

    // If specific date is requested, generate time slots
    let timeSlots = null;
    if (date) {
      console.log('Generating time slots for date:', date);
      const dateObj = new Date(date);
      const dayOfWeek = dateObj.getDay();
      const businessHour = businessHoursMap[dayOfWeek];

      console.log('Day of week:', dayOfWeek);
      console.log('Business hour:', businessHour);

      if (!businessHour || !businessHour.isOpen) {
        console.log('Business closed on this day');
        timeSlots = [];
      } else {
        // Check if date is blocked
        const isBlocked = blockedDatesSet.has(date);
        if (isBlocked) {
          timeSlots = [];
        } else {
          // Generate time slots based on business hours
          const [startHour, startMin] = businessHour.startTime.split(':').map(Number);
          const [endHour, endMin] = businessHour.endTime.split(':').map(Number);

          const slots = [];
          let currentHour = startHour;
          let currentMin = startMin;

          while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
            const slotTime = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
            const slotStart = new Date(date);
            slotStart.setHours(currentHour, currentMin, 0, 0);

            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotEnd.getMinutes() + 30); // 30-minute slots

            // Check if this slot is booked
            const isBooked = bookings.some((booking: any) => {
              return (
                (slotStart >= booking.startTime && slotStart < booking.endTime) ||
                (slotEnd > booking.startTime && slotEnd <= booking.endTime) ||
                (slotStart <= booking.startTime && slotEnd >= booking.endTime)
              );
            });

            // Check if slot is in the past
            const now = new Date();
            const isPast = slotStart < now;

            // Format time for display (12-hour format)
            const hour12 = currentHour % 12 || 12;
            const ampm = currentHour >= 12 ? 'pm' : 'am';
            const displayTime = `${hour12}:${String(currentMin).padStart(2, '0')} ${ampm}`;

            slots.push({
              time: displayTime,
              time24h: slotTime,
              status: isPast || isBooked ? 'unavailable' : 'available'
            });

            // Increment by 30 minutes
            currentMin += 30;
            if (currentMin >= 60) {
              currentMin = 0;
              currentHour++;
            }
          }

          timeSlots = slots;
        }
      }
    }

    return NextResponse.json({
      calendarDays,
      timeSlots,
      businessHours,
      blockedDates: blockedDates.map((bd: any) => ({
        date: bd.date.toISOString().split('T')[0],
        reason: bd.reason,
        startTime: bd.startTime,
        endTime: bd.endTime
      }))
    });

  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability data' },
      { status: 500 }
    );
  }
}