"use client"

import { Users, Handshake, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { AnimatedNumber } from '@/components/animated-number'

function StatCard({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-8 text-center">
      <Icon className="mx-auto mb-4 h-8 w-8 text-muted-ink" strokeWidth={1.5} />
      <AnimatedNumber value={value} className="font-mono text-4xl font-bold text-ink md:text-5xl" />
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-ink">{label}</p>
    </div>
  )
}

const OurNumbers = () => (
  <section className="w-full py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Proof, not promises</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
          Proof it works.
        </h2>
        <p className="mt-3 text-sm text-muted-ink">
          Straight from our own operations, we only print what&rsquo;s real. Figures verified against
          the Hawiyat operations dashboard as of August 9, 2026.{" "}
          <Link href="/about" className="underline transition-colors hover:text-ink">
            See how we count.
          </Link>
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
        <StatCard icon={Users} value="200+" label="satisfied clients and businesses" />
        <StatCard icon={Handshake} value="10+" label="resellers" />
        <StatCard icon={Zap} value="100B+" label="tokens executed through Composer" />
      </div>
    </div>
  </section>
)

export default OurNumbers
