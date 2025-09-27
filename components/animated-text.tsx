"use client"

import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  delay?: number
  className?: string
}

const AnimatedText = ({ text, delay = 0, className = "" }: AnimatedTextProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        },
        delay + Math.random() * 50,
      ) // Add slight randomness for more natural feel

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}

export default AnimatedText
