import { NextRequest, NextResponse } from 'next/server';

// Mock time slots data
const mockTimeSlots = [
  { time: '9:00 am', available: 5, status: 'available' },
  { time: '9:30 am', available: 8, status: 'available' },
  { time: '10:00 am', available: 2, status: 'available' },
  { time: '10:30 am', available: 3, status: 'limited' },
  { time: '11:00 am', available: 0, status: 'unavailable' },
  { time: '11:30 am', available: 1, status: 'limited' },
  { time: '12:00 pm', available: 7, status: 'available' },
  { time: '12:30 pm', available: 5, status: 'available' },
  { time: '1:00 pm', available: 4, status: 'available' },
  { time: '1:30 pm', available: 0, status: 'unavailable' },
  { time: '2:00 pm', available: 6, status: 'available' },
  { time: '2:30 pm', available: 3, status: 'limited' },
  { time: '3:00 pm', available: 2, status: 'limited' },
  { time: '3:30 pm', available: 4, status: 'available' },
  { time: '4:00 pm', available: 5, status: 'available' },
  { time: '4:30 pm', available: 1, status: 'limited' },
  { time: '5:00 pm', available: 0, status: 'unavailable' },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // Format: YYYY-MM-DD
    
    // Filter time slots based on the requested date (in a real app, this would come from the database)
    const filteredTimeSlots = mockTimeSlots.map(slot => {
      // For demonstration purposes, we'll adjust availability based on date
      // In a real application, this would come from a database based on the specific date
      let available = slot.available;
      let status = slot.status as string;
      
      // Add some variance based on date (just for demo purposes)
      if (date) {
        const dateObj = new Date(date);
        const dayOfMonth = dateObj.getDate();
        
        // Make some time slots depend on the day of the month for demo purposes
        if (dayOfMonth % 2 === 0 && slot.time.includes('am')) {
          available = Math.max(0, available - 2);
        } else if (dayOfMonth % 3 === 0 && slot.time.includes('pm')) {
          available = Math.max(0, available - 1);
        }
      }
      
      if (available === 0) {
        status = 'unavailable';
      } else if (available < 3) {
        status = 'limited';
      }
      
      return {
        ...slot,
        available,
        status
      };
    });
    
    return NextResponse.json({
      date: date || new Date().toISOString().split('T')[0],
      timeSlots: filteredTimeSlots
    });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch time slots' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, user } = body;
    
    // Validate required fields
    if (!date || !time) {
      return NextResponse.json(
        { error: 'Date and time are required' },
        { status: 400 }
      );
    }
    
    // Mock booking logic
    // In a real application, this would check availability and create a booking record
    const timeSlot = mockTimeSlots.find(slot => slot.time === time);
    
    if (!timeSlot || timeSlot.status === 'unavailable') {
      return NextResponse.json(
        { error: 'Selected time slot is not available' },
        { status: 409 }
      );
    }
    
    // Simulate a booking creation
    const booking = {
      id: `booking_${Date.now()}`,
      date,
      time,
      user: user || 'Anonymous',
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    // In a real application, we would update the availability in the database
    // For now, we'll just return the booking info
    
    return NextResponse.json(
      { 
        message: 'Booking confirmed successfully',
        booking 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}