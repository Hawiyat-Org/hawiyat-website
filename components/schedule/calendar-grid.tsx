'use client'

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarDay {
  date: string; // YYYY-MM-DD format
  isAvailable: boolean;
  hasBookings?: boolean;
  reason?: string;
}

interface CalendarGridProps {
  selectedDate: Date
  currentMonth: Date
  onDateSelect: (date: Date) => void
  onMonthChange: (date: Date) => void
}

export function CalendarGrid({
  selectedDate,
  currentMonth,
  onDateSelect,
  onMonthChange,
}: CalendarGridProps) {
  const [calendarDays, setCalendarDays] = useState<(CalendarDay | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevCalendarDays, setPrevCalendarDays] = useState<(CalendarDay | null)[]>([]);
  const [error, setError] = useState<string | null>(null);

  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentMonth.getMonth()]
  const year = currentMonth.getFullYear();

  const fetchCalendarData = async () => {
    try {
      // Set previous days before loading new data
      if (calendarDays.length > 0) {
        setPrevCalendarDays(calendarDays);
      }

      setLoading(true);
      setError(null);

      // Format the month as YYYY-MM for the API
      const monthParam = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;

      const response = await fetch(`/api/schedule/availability?month=${monthParam}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar data: ${response.status}`);
      }

      const data = await response.json();

      // Get the first day of the month to calculate padding
      const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay();

      // Create padding for empty slots at the beginning
      const paddingDays = Array(firstDayOfMonth).fill(null);

      // Combine padding with actual calendar days
      const days = paddingDays.concat(data.calendarDays || []);

      setCalendarDays(days);

      // After setting calendar days, check if we need to select the closest available day
      // Only if no date is currently selected or the current selection is unavailable
      setTimeout(() => {
        if (!selectedDate || !isDateAvailableInCalendar(selectedDate)) {
          selectClosestAvailableDay(days);
        }
      }, 0);
    } catch (err) {
      console.error('Error fetching calendar data:', err);
      setError('Failed to load calendar data. Please try again later.');

      // Fallback to client-side calculation if API fails
      const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
      const firstDay = new Date(year, currentMonth.getMonth(), 1).getDay();

      const days = Array.from({ length: firstDay }, () => null).concat(
        Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dateObj = new Date(dateStr);

          // Check if the date is in the past
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPast = dateObj < today;

          return {
            date: dateStr,
            isAvailable: !isPast
          };
        })
      );

      setCalendarDays(days);

      // After setting calendar days, check if we need to select the closest available day
      setTimeout(() => {
        if (!selectedDate || !isDateAvailableInCalendar(selectedDate)) {
          selectClosestAvailableDay(days);
        }
      }, 0);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if a date is available in the current calendar
  const isDateAvailableInCalendar = (date: Date): boolean => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return calendarDays.some(day => day && day.date === dateStr && day.isAvailable);
  };

  // Helper function to select the closest available day
  const selectClosestAvailableDay = (days: (CalendarDay | null)[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find all available days in the current month
    const availableDays = days
      .filter((day): day is CalendarDay => day !== null && day.isAvailable)
      .filter(day => {
        const dayDate = new Date(day.date);
        return dayDate >= today; // Only future dates
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort chronologically

    if (availableDays.length > 0) {
      // Select the first available day (closest in the future)
      const closestDay = availableDays[0];
      onDateSelect(new Date(closestDay.date));
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, [currentMonth]);

  const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const isDateSelected = (day: CalendarDay | null) => {
    if (!day) return false;

    const [year, month, dayNum] = day.date.split('-').map(Number);
    return dayNum === selectedDate.getDate() &&
           month - 1 === selectedDate.getMonth() &&
           year === selectedDate.getFullYear();
  };

  const isDateInPast = (day: CalendarDay | null) => {
    if (!day) return false;

    const dayDate = new Date(day.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return dayDate < today;
  };

  const getDayNumber = (day: CalendarDay | null) => {
    if (!day) return null;
    return parseInt(day.date.split('-')[2], 10);
  };

  const handleDateSelect = (day: CalendarDay | null) => {
    if (!day || !day.isAvailable || isDateInPast(day)) return;

    const selectedDateObj = new Date(day.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the selected date is in the past
    if (selectedDateObj < today) return;

    onDateSelect(selectedDateObj);
  };

  const addMonths = (date: Date, months: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {monthName} <span className="text-gray-500 dark:text-gray-400">{year}</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onMonthChange(addMonths(currentMonth, -1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center py-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{day}</p>
          </div>
        ))}
      </div>

      {/* Calendar Grid - Scrollable Section with Fixed Height */}
      <div className="grid grid-cols-7 gap-2 flex-grow overflow-y-auto relative">
        {loading ? (
          <>
            {/* Show previous calendar days with reduced opacity during loading */}
            {prevCalendarDays.length > 0 ? (
              prevCalendarDays.map((day, index) => (
                <button
                  key={`prev-${index}`}
                  className={`
                    aspect-square rounded-lg p-2 text-sm font-medium transition-all flex items-center justify-center relative opacity-60
                    ${!day ? 'bg-transparent' : ''}
                    ${day
                      ? 'bg-gray-100 dark:bg-[#17181b] text-gray-700 dark:text-gray-100'
                      : ''
                    }
                  `}
                  disabled
                >
                  {day && <span>{getDayNumber(day)}</span>}
                </button>
              ))
            ) : (
              // Skeleton UI for calendar grid when no previous data exists
              Array.from({ length: 42 }).map((_, index) => ( // 6 weeks * 7 days
                <div
                  key={index}
                  className="aspect-square rounded-lg p-2 bg-gray-100 dark:bg-[#17181b] animate-pulse"
                />
              ))
            )}
            {/* Overlay with skeleton UI */}
            <div className="absolute inset-0 grid grid-cols-7 gap-2 p-2 pointer-events-none">
              {Array.from({ length: 42 }).map((_, index) => ( // 6 weeks * 7 days
                <div
                  key={`overlay-${index}`}
                  className="aspect-square rounded-lg bg-gray-100 dark:bg-[#17181b] animate-pulse"
                />
              ))}
            </div>
          </>
        ) : error ? (
          <div className="col-span-7 flex flex-col items-center justify-center py-8 text-center">
            <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>
            <button
              onClick={fetchCalendarData}
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              disabled={!day || !day.isAvailable || isDateInPast(day)}
              className={`
                aspect-square rounded-lg p-2 text-sm font-medium transition-all flex items-center justify-center relative
                ${!day ? 'bg-transparent' : ''}
                ${day && isDateSelected(day)
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                  : day && (!day.isAvailable || isDateInPast(day))
                  ? 'bg-white dark:bg-black text-gray-300 dark:text-gray-500 cursor-not-allowed'
                  : day
                  ? 'bg-gray-100 dark:bg-[#17181b] text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                  : ''
                }
              `}
            >
              {day && (
                <>
                  <span>{getDayNumber(day)}</span>
                  {day.hasBookings && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500" />
                  )}
                </>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  )
}