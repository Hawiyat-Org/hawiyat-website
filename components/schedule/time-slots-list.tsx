'use client'

import { useState, useEffect } from 'react'

interface TimeSlot {
  time: string;
  status: 'available' | 'unavailable';
}

interface BookingFormData {
  company: string;
  email: string;
  platform: 'Microsoft Teams' | 'Google Meet' | 'Zoom';
}

interface TimeSlotsListProps {
  selectedDate: Date
}

export function TimeSlotsList({ selectedDate }: TimeSlotsListProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    company: '',
    email: '',
    platform: 'Zoom'
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Effect to handle body overflow when modal is open
  useEffect(() => {
    if (showBookingForm || bookingSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showBookingForm, bookingSuccess]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        setLoading(true);
        setError(null);

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`/api/schedule/time-slots?date=${formattedDate}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch time slots: ${response.status}`);
        }

        const data = await response.json();
        const simplifiedSlots = data.timeSlots?.map((slot: any) => ({
          time: slot.time,
          status: slot.status === 'unavailable' ? 'unavailable' : 'available'
        })) || [];

        setTimeSlots(simplifiedSlots);

        if (!selectedTime) {
          const firstAvailable = simplifiedSlots.find((slot: TimeSlot) =>
            slot.status !== 'unavailable' && !isPastTime(slot.time)
          );
          if (firstAvailable) {
            setSelectedTime(firstAvailable.time);
          }
        }
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError('Failed to load available time slots. Please try again later.');

        const defaultTimeSlots: TimeSlot[] = [
          { time: '9:30 am', status: 'available' },
          { time: '10:00 am', status: 'available' },
          { time: '10:30 am', status: 'available' },
          { time: '11:00 am', status: 'available' },
          { time: '11:30 am', status: 'unavailable' },
          { time: '12:00 pm', status: 'available' },
          { time: '12:30 pm', status: 'available' },
          { time: '1:00 pm', status: 'available' },
        ];
        setTimeSlots(defaultTimeSlots);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate, timeFormat]);

  const isPastTime = (timeStr: string) => {
    const today = new Date();
    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);
    const todayDateOnly = new Date(today);
    todayDateOnly.setHours(0, 0, 0, 0);

    if (selectedDateOnly.getTime() !== todayDateOnly.getTime()) {
      return false;
    }

    const timeComponents = timeStr.toLowerCase().split(' ');
    if (timeComponents.length !== 2) return false;

    let [timePart, period] = timeComponents;
    const [hoursStr, minutesStr] = timePart.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (period === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }

    const selectedDateTime = new Date();
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes());

    return selectedDateTime < currentDateTime;
  };

  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);

    if (modifier.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (modifier.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  };

  const convertTo12Hour = (time24h: string): string => {
    const [hours, minutes] = time24h.split(':');
    let hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'pm' : 'am';

    if (hour === 0) hour = 12;
    if (hour > 12) hour -= 12;

    return `${hour}:${minutes} ${suffix}`;
  };

  const formatTime = (time: string, format: '12h' | '24h'): string => {
    if (format === '24h') {
      if (!time.includes('am') && !time.includes('pm')) {
        return time;
      }
      return convertTo24Hour(time);
    } else {
      if (time.includes('am') || time.includes('pm')) {
        return time;
      }
      return convertTo12Hour(time);
    }
  };

  const handleBooking = () => {
    if (!selectedTime) {
      alert('Please select a time slot first');
      return;
    }

    if (isPastTime(selectedTime)) {
      alert('Cannot book time slots in the past');
      return;
    }

    setShowBookingForm(true);
  };

  const handleBookingSubmit = () => {
    if (!verificationSent) {
      if (!bookingData.company || !bookingData.email) {
        alert('Please fill in all required fields');
        return;
      }

      console.log('Sending verification to:', bookingData.email);
      setVerificationSent(true);
    } else {
      if (verificationCode.length === 6) {
        setBookingSuccess(true);
        setTimeout(() => {
          setShowBookingForm(false);
          setBookingSuccess(false);
          setVerificationSent(false);
          setVerificationCode('');
          setBookingData({ company: '', email: '', platform: 'Zoom' });
        }, 3000);
      } else {
        alert('Invalid verification code. Please enter a 6-digit code.');
      }
    }
  };

  const handleCancel = () => {
    setShowBookingForm(false);
    setBookingSuccess(false);
    setVerificationSent(false);
    setVerificationCode('');
    setBookingData({ company: '', email: '', platform: 'Zoom' });
  };

  const groupedTimeSlots = [];
  for (let i = 0; i < timeSlots.length; i += 2) {
    groupedTimeSlots.push(timeSlots.slice(i, i + 2));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Friday, {selectedDate.toLocaleDateString()}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available times</p>
        </div>
        <div className="flex gap-2 bg-gray-100 dark:bg-[#17181b] rounded-lg p-1">
          <button
            onClick={() => setTimeFormat('12h')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              timeFormat === '12h'
                ? 'bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            12h
          </button>
          <button
            onClick={() => setTimeFormat('24h')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              timeFormat === '24h'
                ? 'bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            24h
          </button>
        </div>
      </div>

      {/* Time Slots */}
      <div className="space-y-3">
        {loading ? (
          <>
            {[
              ['9:00 am', '9:30 am'],
              ['10:00 am', '10:30 am'],
              ['11:00 am', '11:30 am'],
              ['12:00 pm', '12:30 pm'],
              ['1:00 pm', '1:30 pm'],
              ['2:00 pm', '2:30 pm'],
              ['3:00 pm', '3:30 pm'],
              ['4:00 pm', '4:30 pm'],
              ['5:00 pm']
            ].map((pair, pairIndex) => (
              <div key={pairIndex} className="grid grid-cols-2 gap-3">
                {Array.isArray(pair) ? (
                  pair.map((time, slotIndex) => (
                    <div
                      key={slotIndex}
                      className="flex items-center justify-center py-3 rounded-lg bg-gray-100 dark:bg-[#17181b] animate-pulse"
                    >
                      <span className="text-gray-400 dark:text-gray-600">{time}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-3 rounded-lg bg-gray-100 dark:bg-[#17181b] animate-pulse">
                    <span className="text-gray-400 dark:text-gray-600">{pair}</span>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : error ? (
          <div className="col-span-2 text-center py-8 text-red-500 dark:text-red-400">
            {error}
          </div>
        ) : groupedTimeSlots.length > 0 ? (
          groupedTimeSlots.map((pair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-2 gap-3">
              {pair.map((slot) => {
                const isSlotInPast = isPastTime(slot.time);
                const isDisabled = slot.status === 'unavailable' || isSlotInPast;
                return (
                  <button
                    key={slot.time}
                    onClick={() => !isDisabled && setSelectedTime(slot.time)}
                    disabled={isDisabled}
                    className={`
                      flex items-center justify-center py-3 rounded-lg transition-all text-center
                      ${selectedTime === slot.time && !isDisabled
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                        : isDisabled
                        ? 'bg-white dark:bg-black text-gray-300 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-[#17181b] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                      }
                    `}
                  >
                    {formatTime(slot.time, timeFormat)}
                  </button>
                );
              })}
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
            No time slots available for this date
          </div>
        )}
      </div>

      {/* Complete Booking Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedTime || (selectedTime && isPastTime(selectedTime))}
        className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Complete Booking
      </button>

      {/* Booking Form Modal - Single Popup */}
      {showBookingForm && !bookingSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d0e11] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Your Booking
            </h3>

            {verificationSent && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✓ Verification code sent to {bookingData.email}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={bookingData.company}
                  onChange={(e) => setBookingData({...bookingData, company: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-gray-900 dark:text-white"
                  placeholder="Enter your company name"
                  disabled={verificationSent}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  disabled={verificationSent}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Meeting Platform
                </label>
                <select
                  value={bookingData.platform}
                  onChange={(e) => setBookingData({...bookingData, platform: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-gray-900 dark:text-white"
                  disabled={verificationSent}
                >
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom</option>
                </select>
              </div>

              {verificationSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-center text-2xl tracking-widest bg-white dark:bg-black text-gray-900 dark:text-white"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingSubmit}
                className="flex-1 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                {verificationSent ? 'Confirm Booking' : 'Complete Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d0e11] rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your meeting has been scheduled for {formatTime(selectedTime || '', timeFormat)} on {selectedDate.toLocaleDateString()}.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              A confirmation email with meeting details has been sent to {bookingData.email}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <div className="min-h-screen bg-white dark:bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <TimeSlotsList selectedDate={selectedDate} />
      </div>
    </div>
  );
}