'use client'

import { useState } from 'react'
import { CalendarGrid } from './calendar-grid'
import { TimeSlotsList } from './time-slots-list'

export function SchedulingPanel() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <CalendarGrid
        selectedDate={selectedDate}
        currentMonth={currentMonth}
        onDateSelect={setSelectedDate}
        onMonthChange={setCurrentMonth}
      />

      {/* Time Slots */}
      <TimeSlotsList selectedDate={selectedDate} />
    </div>
  )
}
