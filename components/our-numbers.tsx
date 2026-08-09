"use client"

import { useEffect, useRef, useState } from 'react'
import { Users, Handshake, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ANIMATION_DURATION = 800

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState(value)
  const rootRef = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const match = /^(\d+)(.*)$/.exec(value)
  const target = match ? parseInt(match[1], 10) : NaN
  const suffix = match ? match[2] : ''

  useEffect(() => {
    const node = rootRef.current
    if (!node || Number.isNaN(target)) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let rafId = 0

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || startedRef.current) return
        startedRef.current = true
        observer.disconnect()

        const startTime = performance.now()

        const tick = (now: number) => {
          const progress = Math.min(Math.max((now - startTime) / ANIMATION_DURATION, 0), 1)
          const eased = easeOutCubic(progress)
          const current = Math.round(target * eased)
          setDisplay(`${current}${suffix}`)
          if (progress < 1) {
            rafId = requestAnimationFrame(tick)
          } else {
            setDisplay(value)
          }
        }

        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [target, suffix, value])

  return <span ref={rootRef}>{display}</span>
}

function StatCard({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-8 text-center">
      <Icon className="mx-auto mb-4 h-8 w-8 text-muted-ink" strokeWidth={1.5} />
      <p className="font-mono text-4xl font-bold text-ink md:text-5xl">
        <AnimatedNumber value={value} />
      </p>
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
          Straight from our own operations, we only print what&rsquo;s real.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
        <StatCard icon={Users} value="100+" label="businesses paying in DZD" />
        <StatCard icon={Handshake} value="10+" label="resellers" />
        <StatCard icon={Zap} value="100B+" label="tokens executed through Composer" />
      </div>
    </div>
  </section>
)

export default OurNumbers
