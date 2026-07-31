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
      </header>
      <div className="mx-auto mt-8 max-w-6xl">
        <SchedulingPanel />
      </div>
    </main>
  )
}
