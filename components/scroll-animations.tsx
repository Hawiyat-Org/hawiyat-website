"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const ScrollAnimations = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // Respect prefers-reduced-motion: leave reveal-up elements fully visible
      // (never set opacity:0) and skip the dashboard scrub so no scroll-linked
      // transform runs.
      gsap.set(".reveal-up", { opacity: 1, y: 0 })
      gsap.set("#dashboard", { scale: 1, translateY: 0, rotateX: "0deg" })
      return
    }

    // Initial state for reveal-up elements
    gsap.set(".reveal-up", {
      opacity: 0,
      y: "100%",
    })

    // Trace-line draw-on-scroll reveal
    gsap.utils.toArray<HTMLElement>(".trace-line").forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 30%",
            scrub: 1,
          },
        }
      )
    })

    // Dashboard animation
    const dashboardElement = document.getElementById("dashboard")
    if (dashboardElement) {
      gsap.to("#dashboard", {
        scale: 1,
        translateY: 0,
        rotateX: "0deg",
        scrollTrigger: {
          trigger: "#hero-section",
          start: window.innerWidth > 1024 ? "top 95%" : "top 70%",
          end: "bottom bottom",
          scrub: 1,
        },
      })
    }

    // Reveal animations for sections
    const sections = gsap.utils.toArray<Element>("section")
    sections.forEach((sec: Element) => {
      const revealElements = sec.querySelectorAll(".reveal-up")
      if (revealElements.length > 0) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sec,
              start: "10% 80%",
              end: "20% 90%",
            },
          })
          .to(revealElements, {
            opacity: 1,
            duration: 0.8,
            y: "0%",
            stagger: 0.2,
          })
      }
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}

export default ScrollAnimations
