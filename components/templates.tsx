"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useAnimationFrame, useInView } from "framer-motion"
import Link from "next/link"


export default function Templates() {
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const x = useMotionValue(0)
  const scrollSpeed = -0.4

  const carouselRef = useRef(null)
  const headerRef = useRef(null)
  const isInView = useInView(carouselRef, { once: true, amount: 0.2 })
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const templates = [
    {
      name: "Oracle",
      image: "/templates/oracle.webp?height=400&width=600&text=Oracle",
      category: "Database",
    },
    {
      name: "Odoo",
      image: "/templates/odoo.webp?height=400&width=600&text=Odoo",
      category: "ERP",
    },
    {
      name: "ERPNext",
      image: "/templates/erpnext.webp?height=400&width=600&text=ERPNext",
      category: "ERP",
    },
    {
      name: "Supabase",
      image: "/templates/supabase.webp?height=400&width=600&text=Supabase",
      category: "Backend",
    },
    {
      name: "n8n",
      image: "/templates/n8n.webp?height=400&width=600&text=n8n",
      category: "Automation",
    },
    {
      name: "WordPress",
      image: "/templates/wordpress.webp?height=400&width=600&text=WordPress",
      category: "CMS",
    },
  ]

  const duplicatedTemplates = [...templates, ...templates, ...templates]
  const cardWidth = isMobile ? 280 : 500
  const cardGap = isMobile ? 16 : 24
  const loopWidth = (cardWidth + cardGap) * 6

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      const currentX = x.get()
      const newX = currentX + scrollSpeed * (delta / 16) * (isMobile ? 0.7 : 1)

      if (newX <= -loopWidth) {
        x.set(newX + loopWidth)
      } else {
        x.set(newX)
      }
    }
  })

  return (
    <section className="relative flex w-full min-h-screen flex-col place-content-center place-items-center overflow-hidden py-12 md:py-0">
      {/* Header Section */}
      <div ref={headerRef} className="relative z-10 w-full place-content-center items-center flex flex-col max-w-5xl gap-4 md:gap-6 px-4 sm:px-6 mb-8 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-2 md:space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight px-4">
            Hawiyat Templates
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400">
            Deploy in <span className="font-semibold text-black dark:text-white">Seconds</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-2 md:mt-4 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center leading-relaxed px-4"
        >
          Production-ready templates with one click for your next project.
          <br className="hidden sm:block" />
          <span className="font-semibold text-black dark:text-white"> Click, Ship, and Scale</span> with
          enterprise level infrastructure.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex gap-6 sm:gap-8 mt-4 md:mt-8 flex-wrap justify-center"
        >
          {[
            { value: "300+", label: "Templates" },
            { value: "<30s", label: "Deploy Time" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="text-center relative px-4 sm:px-6">
              <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1">{stat.label}</div>
              {index < 2 && (
                <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800"></div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Templates Carousel */}
      <div ref={carouselRef} className="relative w-full overflow-hidden py-6 md:py-8">
        <motion.div
          className="flex"
          style={{ 
            x, 
            width: "fit-content",
            gap: `${cardGap}px`
          }}
        >
          {duplicatedTemplates.map((template, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900 transition-all duration-500 flex-shrink-0"
              style={{
                width: `${cardWidth}px`,
                height: isMobile ? "320px" : "380px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: (index % 6) * 0.1,
                ease: "easeOut"
              }}
              onMouseEnter={() => !isMobile && setIsPaused(true)}
              onMouseLeave={() => !isMobile && setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              whileHover={!isMobile ? { y: -8 } : {}}
              whileTap={isMobile ? { scale: 0.98 } : {}}
            >
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
                />

                {/* Gradient Overlay - Always visible on mobile */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
              </div>

              {/* Template Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-2.5 py-1 md:px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
                    {template.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{template.name}</h3>
                </div>
              </div>

              {/* Deploy Button - Smaller on mobile, always visible */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'}`}>
                <button className={`px-6 py-3 md:px-10 md:py-4 rounded-lg md:rounded-xl font-bold text-black bg-white transform transition-all duration-500 hover:scale-105 active:scale-95 hover:shadow-xl flex items-center gap-2 md:gap-3 ${isMobile ? 'scale-90' : 'scale-75 group-hover:scale-100'}`}>
                  <span className="text-sm md:text-lg">Deploy Now</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Hover border */}
              <div className={`absolute inset-0 rounded-2xl md:rounded-3xl shadow dark:shadow-white transition-opacity duration-500 pointer-events-none ${isMobile ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade edges - Adjusted for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="relative z-10 mt-8 md:mt-16 text-center px-4"
      >
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-500 mb-4">
          {isMobile ? 'Tap any template to deploy' : 'Hover over any template to deploy instantly'}
        </p>
        <Link href="/templates">
        <button className="px-6 py-2.5 md:px-8 md:py-3 rounded-lg md:rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95">
          Browse All Templates
        </button>
        </Link>
   
      </motion.div>
    </section>
  )
}