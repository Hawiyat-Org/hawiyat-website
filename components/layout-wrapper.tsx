"use client"

import type React from "react"

import { useEffect } from "react"

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Load external scripts
    const loadScript = (src: string, id: string) => {
      if (document.getElementById(id)) return

      const script = document.createElement("script")
      script.src = src
      script.id = id
      script.async = true
      document.head.appendChild(script)
    }

    // Load GSAP
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/gsap.min.js", "gsap")
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/ScrollTrigger.min.js", "gsap-scrolltrigger")

    // Load Typed.js for typing animation
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.10/typed.min.js", "typed-js")

    return () => {
      // Cleanup scripts if needed
      const scripts = ["gsap", "gsap-scrolltrigger", "typed-js"]
      scripts.forEach((id) => {
        const script = document.getElementById(id)
        if (script) {
          script.remove()
        }
      })
    }
  }, [])

  return <>{children}</>
}

export default LayoutWrapper
