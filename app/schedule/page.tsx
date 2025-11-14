'use client'

import { useState } from 'react'
import { SchedulingPanel } from '@/components/schedule/scheduling-panel'

export default function SchedulePage() {
  return (
    <main className="min-h-screen p-2   ">
      <div className="mx-auto scale-95 max-w-6xl">
        <SchedulingPanel />
      </div>
    </main>
  )
}
