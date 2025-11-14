import { NextRequest, NextResponse } from 'next/server';

// Mock bookings data
let mockBookings: Array<{
  id: string;
  date: string;
  time: string;
  user: string;
  createdAt: string;
  status: string;
}> = [
  {
    id: 'booking_1',
    date: '2025-06-24',
    time: '10:00 am',
    user: 'John Doe',
    createdAt: '2025-06-01T10:30:00.000Z',
    status: 'confirmed'
  },
  {
    id: 'booking_2',
    date: '2025-06-25',
    time: '2:30 pm',
    user: 'Jane Smith',
    createdAt: '2025-06-02T14:15:00.000Z',
    status: 'confirmed'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const date = searchParams.get('date');
    
    // Filter bookings based on query parameters
    let filteredBookings = [...mockBookings];
    
    if (user) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.user.toLowerCase().includes(user.toLowerCase())
      );
    }
    
    if (date) {
      filteredBookings = filteredBookings.filter(booking => booking.date === date);
    }
    
    return NextResponse.json({
      bookings: filteredBookings,
      total: filteredBookings.length
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, user, email } = body;
    
    // Validate required fields
    if (!date || !time || (!user && !email)) {
      return NextResponse.json(
        { error: 'Date, time, and either user or email are required' },
        { status: 400 }
      );
    }
    
    // Check for existing booking at the same date and time for the same user
    const existingBooking = mockBookings.find(booking => 
      booking.date === date && booking.time === time
    );
    
    if (existingBooking) {
      return NextResponse.json(
        { error: 'Time slot already booked for this date' },
        { status: 409 }
      );
    }
    
    // Create new booking
    const newBooking = {
      id: `booking_${Date.now()}`,
      date,
      time,
      user: user || email,
      email: email || null,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    mockBookings.push(newBooking);
    
    return NextResponse.json(
      { 
        message: 'Booking created successfully',
        booking: newBooking 
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

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { status } = body;
    
    // Find the booking to update
    const bookingIndex = mockBookings.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Update the booking status
    mockBookings[bookingIndex] = {
      ...mockBookings[bookingIndex],
      status
    };
    
    return NextResponse.json({
      message: 'Booking updated successfully',
      booking: mockBookings[bookingIndex]
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    const bookingIndex = mockBookings.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    const deletedBooking = mockBookings.splice(bookingIndex, 1)[0];
    
    return NextResponse.json({
      message: 'Booking cancelled successfully',
      booking: deletedBooking
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}