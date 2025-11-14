import { NextRequest, NextResponse } from 'next/server';

// Mock schedule availability data
let scheduleAvailability: Array<{
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM format
  availableSlots: number;
  maxSlots: number;
  isAvailable: boolean;
}> = [
  {
    id: 'avail_1',
    date: '2025-06-24',
    time: '09:00',
    availableSlots: 5,
    maxSlots: 5,
    isAvailable: true
  },
  {
    id: 'avail_2',
    date: '2025-06-24',
    time: '10:00',
    availableSlots: 2,
    maxSlots: 5,
    isAvailable: true
  },
  {
    id: 'avail_3',
    date: '2025-06-24',
    time: '11:00',
    availableSlots: 0,
    maxSlots: 5,
    isAvailable: false
  },
  {
    id: 'avail_4',
    date: '2025-06-25',
    time: '14:00',
    availableSlots: 3,
    maxSlots: 5,
    isAvailable: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    
    // Filter availability based on query parameters
    let filteredAvailability = [...scheduleAvailability];
    
    if (date) {
      filteredAvailability = filteredAvailability.filter(avail => avail.date === date);
    }
    
    if (time) {
      filteredAvailability = filteredAvailability.filter(avail => avail.time === time);
    }
    
    // Convert to a format that matches the time-slots API
    const formattedAvailability = filteredAvailability.map(avail => {
      let status: 'available' | 'limited' | 'unavailable';
      if (!avail.isAvailable || avail.availableSlots === 0) {
        status = 'unavailable';
      } else if (avail.availableSlots < 3) {
        status = 'limited';
      } else {
        status = 'available';
      }
      
      // Convert time format for display
      let displayTime = avail.time;
      if (avail.time) {
        const [hours, minutes] = avail.time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour % 12 || 12;
        displayTime = `${displayHour}:${minutes} ${ampm}`;
      }
      
      return {
        time: displayTime,
        available: avail.availableSlots,
        status
      };
    });
    
    return NextResponse.json({
      date: date || new Date().toISOString().split('T')[0],
      availability: formattedAvailability
    });
  } catch (error) {
    console.error('Error fetching schedule availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedule availability' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, maxSlots = 5, isAvailable = true } = body;
    
    // Validate required fields
    if (!date || !time) {
      return NextResponse.json(
        { error: 'Date and time are required' },
        { status: 400 }
      );
    }
    
    // Check if availability already exists for this date and time
    const existingAvailability = scheduleAvailability.find(
      avail => avail.date === date && avail.time === time
    );
    
    if (existingAvailability) {
      return NextResponse.json(
        { error: 'Availability already exists for this date and time' },
        { status: 409 }
      );
    }
    
    // Create new availability record
    const newAvailability = {
      id: `avail_${Date.now()}`,
      date,
      time,
      availableSlots: maxSlots,
      maxSlots,
      isAvailable
    };
    
    scheduleAvailability.push(newAvailability);
    
    return NextResponse.json(
      { 
        message: 'Schedule availability created successfully',
        availability: newAvailability 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating schedule availability:', error);
    return NextResponse.json(
      { error: 'Failed to create schedule availability' },
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
        { error: 'Availability ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { availableSlots, isAvailable } = body;
    
    // Find the availability to update
    const availabilityIndex = scheduleAvailability.findIndex(avail => avail.id === id);
    
    if (availabilityIndex === -1) {
      return NextResponse.json(
        { error: 'Availability not found' },
        { status: 404 }
      );
    }
    
    // Update the availability
    scheduleAvailability[availabilityIndex] = {
      ...scheduleAvailability[availabilityIndex],
      availableSlots: availableSlots !== undefined ? availableSlots : scheduleAvailability[availabilityIndex].availableSlots,
      isAvailable: isAvailable !== undefined ? isAvailable : scheduleAvailability[availabilityIndex].isAvailable
    };
    
    return NextResponse.json({
      message: 'Schedule availability updated successfully',
      availability: scheduleAvailability[availabilityIndex]
    });
  } catch (error) {
    console.error('Error updating schedule availability:', error);
    return NextResponse.json(
      { error: 'Failed to update schedule availability' },
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
        { error: 'Availability ID is required' },
        { status: 400 }
      );
    }
    
    const availabilityIndex = scheduleAvailability.findIndex(avail => avail.id === id);
    
    if (availabilityIndex === -1) {
      return NextResponse.json(
        { error: 'Availability not found' },
        { status: 404 }
      );
    }
    
    const deletedAvailability = scheduleAvailability.splice(availabilityIndex, 1)[0];
    
    return NextResponse.json({
      message: 'Schedule availability removed successfully',
      availability: deletedAvailability
    });
  } catch (error) {
    console.error('Error deleting schedule availability:', error);
    return NextResponse.json(
      { error: 'Failed to delete schedule availability' },
      { status: 500 }
    );
  }
}