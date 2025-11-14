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
          setBookingData({
            company: '',
            email: '',
            platform: 'Zoom'
          });
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
    setBookingData({
      company: '',
      email: '',
      platform: 'Zoom'
    });
  };

  const groupedTimeSlots = [];
  for (let i = 0; i < timeSlots.length; i += 2) {
    groupedTimeSlots.push(timeSlots.slice(i, i + 2));
  }

  return (
    <div className="rounded-2xl bg-transparent p-8 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Friday, {selectedDate.toLocaleDateString()}</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Available times</h3>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeFormat === '12h'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-[#17181b] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeFormat('12h')}
          >
            12h
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeFormat === '24h'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-[#17181b] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeFormat('24h')}
          >
            24h
          </button>
        </div>
      </div>

      {/* Time Slots */}
      <div className="flex-grow overflow-y-auto max-h-[400px] pr-2">
        {loading ? (
          <div className="text-center py-4">Loading time slots...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500 dark:text-red-400">{error}</div>
        ) : groupedTimeSlots.length > 0 ? (
          groupedTimeSlots.map((pair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-2 gap-3 mb-3">
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
                    <span className={`font-medium ${
                      isDisabled
                        ? 'text-gray-300 dark:text-gray-500'
                        : selectedTime === slot.time
                          ? 'text-white dark:text-black'
                          : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {formatTime(slot.time, timeFormat)}
                    </span>
                  </button>
                )
              })}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-700 dark:text-gray-300">No time slots available for this date</div>
        )}
      </div>

      {/* Complete Booking Button */}
      <button
        className="w-full mt-6 bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800  text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleBooking}
        disabled={!selectedTime || loading}
      >
        Complete Booking
      </button>

      {/* Booking Form Modal - Single Popup */}
      {showBookingForm && !bookingSuccess && (
        <div className="  absolute  inset-0 backdrop-blur-[2px] backdrop-saturate-150 dark:bg-black/70 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white dark:bg-[#17181b] rounded-2xl p-8 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Complete Your Booking</h3>

            {verificationSent && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-300">
                  ✓ Verification code sent to <span className="font-semibold">{bookingData.email}</span>
                </p>
              </div>
            )}

            <div>
              <div className="mb-4">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={bookingData.company}
                  onChange={(e) => setBookingData({...bookingData, company: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-gray-900 dark:text-white"
                  placeholder="Enter your company name"
                  disabled={verificationSent}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  disabled={verificationSent}
                />
              </div>

              <div className={`mb-${verificationSent ? '4' : '6'}`}>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Meeting Platform
                </label>
                <select
                  id="platform"
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
                <div className="mb-6">
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-center text-2xl tracking-widest bg-white dark:bg-black text-gray-900 dark:text-white"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  className="flex-[2] px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold"
                >
                  {verificationSent ? 'Confirm Booking' : 'Complete Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white dark:bg-[#17181b] rounded-2xl p-8 max-w-md w-full shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your meeting has been scheduled for {formatTime(selectedTime || '', timeFormat)} on {selectedDate.toLocaleDateString()}.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              A confirmation email with meeting details has been sent to {bookingData.email}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}