'use client'

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, getDaysInMonth, getFirstDayOfMonth, addMonths } from '@/lib/date-utils';

interface CalendarDay {
  day: number;
  date: string; // YYYY-MM-DD format
  isAvailable: boolean;
  hasEvent?: boolean;
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
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentMonth.getMonth()]
  const year = currentMonth.getFullYear();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Format the month as YYYY-MM for the API
        const monthParam = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;

        const response = await fetch(`/api/schedule?month=${monthParam}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch calendar data: ${response.status}`);
        }

        const data = await response.json();

        // Create an array of days with nulls for empty slots at the beginning of the month
        const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay();
        const daysWithEmptySlots = Array(firstDayOfMonth).fill(null);

        // Add the actual days from the API response
        const days = daysWithEmptySlots.concat(
          data.days.filter((day: CalendarDay | null) => day !== null)
        );

        setCalendarDays(days);
      } catch (err) {
        console.error('Error fetching calendar data:', err);
        setError('Failed to load calendar data. Please try again later.');

        // Fallback to client-side calculation if API fails
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);

        const days = Array.from({ length: firstDay }, () => null).concat(
          Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            return {
              day,
              date: dateStr,
              isAvailable: ![5, 12, 15, 19, 26, 27].includes(day)
            };
          })
        );

        setCalendarDays(days);
      } finally {
        setLoading(false);
      }
    };

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

    const [year, month, dayNum] = day.date.split('-').map(Number);
    const dayDate = new Date(year, month - 1, dayNum);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of today to compare dates only

    return dayDate < today;
  };

  const handleDateSelect = (day: CalendarDay | null) => {
    if (!day || !day.isAvailable || isDateInPast(day)) return;

    const [year, month, dayNum] = day.date.split('-').map(Number);
    const selectedDateObj = new Date(year, month - 1, dayNum);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of today to compare dates only

    // Check if the selected date is in the past
    if (selectedDateObj < today) return;

    onDateSelect(selectedDateObj);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {monthName} <span className="text-gray-500 dark:text-gray-400">{year}</span>
        </h3>
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
      <div className="grid grid-cols-7 gap-2 flex-grow overflow-y-auto ">
        {loading ? (
          <div className="col-span-7 text-center py-4">Loading calendar...</div>
        ) : error ? (
          <div className="col-span-7 text-center py-4 text-red-500 dark:text-red-400">{error}</div>
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
                  <span>{day.day}</span>
                  {day.hasEvent && (
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