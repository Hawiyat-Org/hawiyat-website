'use client'

export function ScheduleHeader() {
  return (
    <header className="border-b border-slate-800 dark:border-gray-700 bg-slate-950/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-white dark:text-white">Schedule a Meeting</h1>
          <p className="mt-2 text-slate-400 dark:text-gray-400">Choose a time that works best for you</p>
        </div>
      </div>
    </header>
  )
}
