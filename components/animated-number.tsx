"use client"

import { useEffect, useRef, useState } from 'react'

const ANIMATION_DURATION = 800

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

interface AnimatedNumberProps {
  value: string
  className?: string
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
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

  return (
    <span ref={rootRef} className={className}>
      {display}
    </span>
  )
}
