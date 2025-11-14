import { NextRequest, NextResponse } from 'next/server';

// Mock user bookings data
let userBookings: Array<{
  id: string;
  date: string;
  time: string;
  user: string;
  email: string;
  createdAt: string;
  status: string;
}> = [
  {
    id: 'user_booking_1',
    date: '2025-06-24',
    time: '10:00 am',
    user: 'Current User',
    email: 'user@example.com',
    createdAt: '2025-06-01T10:30:00.000Z',
    status: 'confirmed'
  },
  {
    id: 'user_booking_2',
    date: '2025-06-25',
    time: '2:30 pm',
    user: 'Current User',
    email: 'user@example.com',
    createdAt: '2025-06-02T14:15:00.000Z',
    status: 'confirmed'
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, we would get the user from authentication
    // For this demo, we'll simulate a user
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || 'user@example.com';
    
    // Filter bookings for the specific user
    const userBookingsForUser = userBookings.filter(booking => 
      booking.email === email || booking.user === 'Current User'
    );
    
    return NextResponse.json({
      bookings: userBookingsForUser,
      total: userBookingsForUser.length
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, user = 'Current User', email = 'user@example.com' } = body;
    
    // Validate required fields
    if (!date || !time) {
      return NextResponse.json(
        { error: 'Date and time are required' },
        { status: 400 }
      );
    }
    
    // Check for existing booking at the same date and time
    const existingBooking = userBookings.find(booking => 
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
      id: `user_booking_${Date.now()}`,
      date,
      time,
      user,
      email,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    userBookings.push(newBooking);
    
    return NextResponse.json(
      { 
        message: 'Booking created successfully',
        booking: newBooking 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user booking:', error);
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
    const bookingIndex = userBookings.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Make sure the booking belongs to the current user
    // In a real app, we would verify the user
    userBookings[bookingIndex] = {
      ...userBookings[bookingIndex],
      status
    };
    
    return NextResponse.json({
      message: 'Booking updated successfully',
      booking: userBookings[bookingIndex]
    });
  } catch (error) {
    console.error('Error updating user booking:', error);
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
    
    const bookingIndex = userBookings.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Make sure the booking belongs to the current user
    // In a real app, we would verify the user
    const deletedBooking = userBookings.splice(bookingIndex, 1)[0];
    
    return NextResponse.json({
      message: 'Booking cancelled successfully',
      booking: deletedBooking
    });
  } catch (error) {
    console.error('Error deleting user booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}