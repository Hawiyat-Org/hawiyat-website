import { NextRequest, NextResponse } from 'next/server';

// Function to generate unavailable dates for a given month
function generateUnavailableDates(year: number, month: number): string[] {
  const unavailableDates: string[] = [];
  
  // Generate random unavailable dates for the month (about 30% of days will be unavailable)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    // Randomly make about 30% of days unavailable
    if (Math.random() < 0.3) {
      unavailableDates.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    }
  }
  
  return unavailableDates;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month'); // Format: YYYY-MM
    const year = searchParams.get('year');
    
    let date: Date;
    
    if (month) {
      const [yearStr, monthStr] = month.split('-');
      date = new Date(parseInt(yearStr), parseInt(monthStr) - 1, 1);
    } else if (year) {
      date = new Date(parseInt(year), 0, 1); // January of the specified year
    } else {
      date = new Date();
    }

    // Generate mock calendar data for the requested month
    const calendarData = generateCalendarData(date);
    
    return NextResponse.json(calendarData);
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar data' },
      { status: 500 }
    );
  }
}

function generateCalendarData(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Generate unavailable dates for this month
  const unavailableDates = generateUnavailableDates(year, month);
  
  const days = [];
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Check if this date is in the past
    const dayDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = dayDate < today;
    
    days.push({
      day,
      date: dateStr,
      isAvailable: !unavailableDates.includes(dateStr) && !isPast, // Mark as unavailable if in past
      hasEvent: Math.random() > 0.8, // About 20% of days will have events
      isPast // Add this property to help the frontend visualize past dates
    });
  }
  
  return {
    month: month + 1,
    year,
    days
  };
}