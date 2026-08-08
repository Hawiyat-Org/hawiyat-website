"use client"

import { useState, useEffect } from "react"
import AIPlayground from "./ai-playground"

const AiPlaygroundDashboard = () => {
  const [typedText, setTypedText] = useState("")
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const strings = [
    "How to use Hawiyat Composer caching?",
    "What models does Hawiyat Composer support?",
    "How to cut AI costs with Hawiyat Composer?",
    "How to route requests via Hawiyat Composer?",
  ]

  useEffect(() => {
    const typeSpeed = 80
    const backDelay = 2000
    const backSpeed = 40

    const timeout = setTimeout(
      () => {
        const currentString = strings[currentStringIndex]

        if (!isDeleting) {
          if (currentCharIndex < currentString.length) {
            setTypedText(currentString.substring(0, currentCharIndex + 1))
            setCurrentCharIndex((prev) => prev + 1)
          } else {
            setTimeout(() => setIsDeleting(true), backDelay)
          }
        } else {
          if (currentCharIndex > 0) {
            setTypedText(currentString.substring(0, currentCharIndex - 1))
            setCurrentCharIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentStringIndex((prev) => (prev + 1) % strings.length)
          }
        }
      },
      isDeleting ? backSpeed : typeSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentCharIndex, currentStringIndex, isDeleting, strings])

  return (
    <section
      className="relative flex w-full flex-col items-center gap-8 overflow-hidden px-4 py-16 md:py-24"
      id="interactive-helper"
      aria-label="Hawiyat Composer interactive helper"
    >
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2 className="text-center text-4xl font-semibold lg:text-5xl">
          Hawiyat Composer interactive helper
        </h2>
        <p className="text-muted-foreground">
          Ask it anything about routing, caching, and cutting AI costs. Try a few prompts below.
        </p>
      </div>

      <div className="relative flex w-full max-w-7xl place-content-center place-items-center">
        <div className="purple-bg-grad absolute left-1/2 top-[5%] h-[200px] w-[200px] -translate-x-1/2 max-md:h-[120px] max-md:w-[120px]"></div>

        <div className="relative min-h-[450px] min-w-[320px] w-full max-w-[80%] flex overflow-hidden rounded-lg bg-white shadow-xl transition-transform duration-500 hover:scale-[1.01] max-md:min-h-[400px] max-md:max-w-[95%] max-md:rounded-3xl max-md:shadow-2xl max-md:hover:scale-100 md:h-[650px] dark:border-[1px] dark:border-[#36393c] dark:bg-black">
          <div className="purple-bg-grad absolute left-1/2 top-0 h-full w-full max-w-[80%] -translate-x-1/2 lg:max-w-[1000px]"></div>

          <div className="animated-border h-full w-full p-[2px] max-md:p-[1.5px]">
            <div className="flex h-full w-full overflow-hidden rounded-lg max-md:rounded-3xl">
              <AIPlayground typedText={typedText} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiPlaygroundDashboard
