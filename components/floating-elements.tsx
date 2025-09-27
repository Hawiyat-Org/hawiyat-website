"use client"

import { useEffect, useRef } from "react"

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2

      const elements = container.querySelectorAll(".floating-element")
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.5
        const x = xPercent * speed * 10
        const y = yPercent * speed * 10
        ;(element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <div className="floating-element absolute top-[20%] left-[10%] w-2 h-2 bg-blue-500/20 rounded-full transition-transform duration-1000 ease-out" />
      <div className="floating-element absolute top-[60%] right-[15%] w-3 h-3 bg-purple-500/20 rounded-full transition-transform duration-1000 ease-out" />
      <div className="floating-element absolute bottom-[30%] left-[20%] w-1 h-1 bg-green-500/20 rounded-full transition-transform duration-1000 ease-out" />
      <div className="floating-element absolute top-[40%] right-[30%] w-2 h-2 bg-pink-500/20 rounded-full transition-transform duration-1000 ease-out" />
    </div>
  )
}

export default FloatingElements
