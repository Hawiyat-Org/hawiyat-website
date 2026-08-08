'use client'

import { useState } from 'react'
import { SchedulingPanel } from '@/components/schedule/scheduling-panel'
import Link from 'next/link'

export default function SchedulePage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-32">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold md:text-5xl">Book an AI Consultation in Algeria</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Meet the Hawiyat team to discuss AI subscriptions, Hawiyat Composer, workflow automation, hosting, or cybersecurity for your project.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Choose an available time below. You can also review our <Link href="/services" className="underline">AI services</Link> or read the <Link href="/guides" className="underline">technical guides</Link> before the meeting.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold">1. Pick a slot</h2>
            <p className="mt-1 text-sm text-muted-foreground">Select an available day and time that works for you.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold">2. Share details</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tell us your company name, email, and preferred platform (Meet, Teams, or Zoom).</p>
          </div>
          <div>
            <h2 className="text-base font-semibold">3. Confirm</h2>
            <p className="mt-1 text-sm text-muted-foreground">Verify with the code we email you, and you are booked with a Hawiyat specialist.</p>
          </div>
        </div>
      </header>
      <div className="mx-auto mt-8 max-w-6xl">
        <SchedulingPanel />
      </div>
    </main>
  )
}
