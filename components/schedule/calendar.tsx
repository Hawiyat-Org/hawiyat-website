'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function getFirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5)) // June 2025
  const [selectedDate, setSelectedDate] = useState(24)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  )

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <Card className="border-slate-800 dark:border-gray-700 bg-slate-900/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        {/* Month/Year Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-semibold text-white dark:text-white">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="rounded-lg p-2 hover:bg-slate-800 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-slate-400 dark:text-gray-400" />
            </button>
            <button
              onClick={handleNextMonth}
              className="rounded-lg p-2 hover:bg-slate-800 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center">
              <p className="text-xs font-semibold text-slate-500 dark:text-gray-500 py-2">{day}</p>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => day && setSelectedDate(day)}
              className={`
                aspect-square rounded-lg p-2 text-sm font-medium transition-all
                ${!day ? 'bg-transparent' : ''}
                ${day && day === selectedDate
                  ? 'bg-blue-500 dark:bg-white text-white dark:text-black shadow-lg'
                  : day && (day === 15 || day === 20 || day === 21 || day === 22 || day === 23)
                  ? 'bg-slate-800 dark:bg-black text-slate-400 dark:text-gray-500 cursor-not-allowed'
                  : day
                  ? 'bg-slate-800 dark:bg-[#17181b] text-slate-300 dark:text-gray-300 hover:bg-slate-700 dark:hover:bg-gray-700'
                  : ''
                }
              `}
              disabled={!day}
            >
              {day}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
