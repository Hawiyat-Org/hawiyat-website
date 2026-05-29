'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`
            el.style.opacity = '1'
            el.style.transform = 'translate(0, 0)'
          }, delay * 1000)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, duration])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(100%)'
      case 'down':
        return 'translateY(-100%)'
      case 'left':
        return 'translateX(100%)'
      case 'right':
        return 'translateX(-100%)'
      default:
        return 'translateY(100%)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: getInitialTransform(),
      }}
    >
      {children}
    </div>
  )
}
