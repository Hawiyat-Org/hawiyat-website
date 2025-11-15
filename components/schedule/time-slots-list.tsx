'use client'

import { useState, useEffect } from 'react'

interface TimeSlot {
  time: string;
  time24h: string;
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
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isSendingVerification, setIsSendingVerification] = useState(false);

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

  const fetchTimeSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      const response = await fetch(`/api/schedule/availability?date=${formattedDate}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch time slots: ${response.status}`);
      }

      const data = await response.json();
      const slots = data.timeSlots || [];
      
      setTimeSlots(slots);

      if (slots.length === 0) {
        setError('No time slots available for this date. Business hours may not be configured for this day.');
      } else {
        setError(null);
      }

      if (!selectedTime) {
        const firstAvailable = slots.find((slot: TimeSlot) =>
          slot.status === 'available' && !isPastTime(slot.time)
        );
        if (firstAvailable) {
          setSelectedTime(firstAvailable.time);
        }
      }
    } catch (err) {
      console.error('Error fetching time slots:', err);
      setError('Failed to load available time slots. Please try again later.');
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, [selectedDate]);

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
    let hours: number;
    let minutes: number;

    if (timeComponents.length === 2) {
      const [timePart, period] = timeComponents;
      const [hoursStr, minutesStr] = timePart.split(':');
      hours = parseInt(hoursStr);
      minutes = parseInt(minutesStr);

      if (period === 'pm' && hours !== 12) {
        hours += 12;
      } else if (period === 'am' && hours === 12) {
        hours = 0;
      }
    } else {
      const [hoursStr, minutesStr] = timeStr.split(':');
      hours = parseInt(hoursStr);
      minutes = parseInt(minutesStr);
    }

    const selectedDateTime = new Date();
    selectedDateTime.setHours(hours, minutes, 0, 0);

    return selectedDateTime < new Date();
  };

  const formatTime = (slot: TimeSlot, format: '12h' | '24h'): string => {
    return format === '24h' ? slot.time24h : slot.time;
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

  const handleSendVerification = async () => {
    if (!bookingData.company || !bookingData.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSendingVerification(true);
    setVerificationError('');

    try {
      const response = await fetch('/api/schedule/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: bookingData.email,
          customerName: bookingData.company,
        }),
      });

      if (response.ok) {
        setShowVerificationInput(true);
      } else {
        const errorData = await response.json();
        setVerificationError(errorData.error || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setVerificationError('An error occurred while sending the verification email. Please try again.');
    } finally {
      setIsSendingVerification(false);
    }
  };

  const handleConfirmBooking = async () => {
    setSubmitting(true);
    setVerificationError('');

    try {
      // Verify the code
      const response = await fetch('/api/schedule/verify-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: bookingData.email,
          verificationCode: verificationCode,
        }),
      });

      if (response.ok) {
        const selectedSlot = timeSlots.find(slot => slot.time === selectedTime);
        if (!selectedSlot) {
          throw new Error('Selected time slot not found');
        }

        const [hours, minutes] = selectedSlot.time24h.split(':').map(Number);
        const startTime = new Date(selectedDate);
        startTime.setHours(hours, minutes, 0, 0);

        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 30);

        // Create the booking
        const bookingResponse = await fetch('/api/schedule/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            customerName: bookingData.company,
            customerEmail: bookingData.email,
            notes: `Platform preference: ${bookingData.platform}`,
          }),
        });

        if (bookingResponse.ok) {
          const result = await bookingResponse.json();
          console.log('Booking created:', result);

          setBookingSuccess(true);
          setShowBookingForm(false);

          setTimeSlots(prevSlots =>
            prevSlots.map(slot =>
              slot.time === selectedTime ? { ...slot, status: 'unavailable' as const } : slot
            )
          );

          setTimeout(() => {
            setBookingSuccess(false);
            setBookingData({ company: '', email: '', platform: 'Zoom' });
            setSelectedTime(null);
            setShowVerificationInput(false);
            setVerificationCode('');
            fetchTimeSlots();
          }, 3000);
        } else {
          const errorData = await bookingResponse.json();
          setVerificationError(`Booking failed: ${errorData.error || 'Unknown error'}`);
        }
      } else {
        const errorData = await response.json();
        setVerificationError(errorData.error || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setVerificationError('An error occurred during verification. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowBookingForm(false);
    setBookingSuccess(false);
    setBookingData({ company: '', email: '', platform: 'Zoom' });
    setShowVerificationInput(false);
    setVerificationCode('');
    setVerificationError('');
  };

  const handleResendCode = async () => {
    setIsSendingVerification(true);
    setVerificationError('');
    
    try {
      const response = await fetch('/api/schedule/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: bookingData.email,
          customerName: bookingData.company,
        }),
      });

      if (response.ok) {
        alert('New verification code sent!');
      } else {
        const errorData = await response.json();
        setVerificationError(errorData.error || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Error resending verification:', error);
      setVerificationError('Error resending verification code');
    } finally {
      setIsSendingVerification(false);
    }
  };

  const groupedTimeSlots = [];
  for (let i = 0; i < timeSlots.length; i += 2) {
    groupedTimeSlots.push(timeSlots.slice(i, i + 2));
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[selectedDate.getDay()];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {dayName}, {selectedDate.toLocaleDateString()}
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
            {Array.from({ length: 8 }).map((_, pairIndex) => (
              <div key={pairIndex} className="grid grid-cols-2 gap-3">
                {Array.from({ length: 2 }).map((_, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="flex items-center justify-center py-3 rounded-lg bg-gray-100 dark:bg-[#17181b] animate-pulse"
                  >
                    <span className="text-transparent bg-gray-300 dark:bg-gray-600 rounded w-1/3">00:00</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : error ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-8 text-center">
            <div className="text-red-500 dark:text-red-400 mb-4">
              {error}
            </div>
            <button
              onClick={fetchTimeSlots}
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Retry
            </button>
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
                    {formatTime(slot, timeFormat)}
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

      {/* Unified Booking Modal */}
      {showBookingForm && !bookingSuccess && (
        <div className="absolute  inset-0 backdrop-blur-[2px] scale-110 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d0e11] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {showVerificationInput ? 'Verify Your Email' : 'Complete Your Booking'}
            </h3>

            {!showVerificationInput ? (
              <>
                {/* Booking Form */}
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
                      disabled={isSendingVerification}
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
                      disabled={isSendingVerification}
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
                      disabled={isSendingVerification}
                    >
                      <option value="Microsoft Teams">Microsoft Teams</option>
                      <option value="Google Meet">Google Meet</option>
                      <option value="Zoom">Zoom</option>
                    </select>
                  </div>

                  {verificationError && (
                    <p className="text-sm text-red-600 dark:text-red-400">{verificationError}</p>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCancel}
                    disabled={isSendingVerification}
                    className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendVerification}
                    disabled={isSendingVerification}
                    className="flex-1 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingVerification ? 'Verifying...' : 'Complete Booking'}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Verification Input */}
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  A verification code has been sent to <strong>{bookingData.email}</strong>. Please enter it below.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-gray-900 dark:text-white text-center text-2xl tracking-widest font-mono"
                      placeholder="000000"
                      maxLength={6}
                      disabled={submitting}
                    />
                    {verificationError && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{verificationError}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCancel}
                    disabled={submitting}
                    className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={submitting || verificationCode.length !== 6}
                    className="flex-1 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={handleResendCode}
                    disabled={isSendingVerification}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                  >
                    {isSendingVerification ? 'Sending...' : 'Resend verification code'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {bookingSuccess && (
        <div className="absolute  inset-0 backdrop-blur-[2px] scale-110 flex items-center justify-center z-50 p-4">
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
              Your meeting has been scheduled for {selectedTime} on {selectedDate.toLocaleDateString()}.
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