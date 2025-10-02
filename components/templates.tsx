"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useAnimationFrame, useInView } from "framer-motion"

export default function Templates() {
  const [isPaused, setIsPaused] = useState(false)
  const x = useMotionValue(0)
  const scrollSpeed = -0.4

  const carouselRef = useRef(null)
  const headerRef = useRef(null)
  const isInView = useInView(carouselRef, { once: true, amount: 0.2 })
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })

  const templates = [
    {
      name: "Oracle",
      image: "/templates/oracle.png?height=400&width=600&text=Oracle",
      category: "Database",
    },
    {
      name: "Odoo",
      image: "/templates/odoo.png?height=400&width=600&text=Odoo",
      category: "ERP",
    },
    {
      name: "ERPNext",
      image: "/templates/erpnext.png?height=400&width=600&text=ERPNext",
      category: "ERP",
    },
    {
      name: "Supabase",
      image: "/templates/supabase.png?height=400&width=600&text=Supabase",
      category: "Backend",
    },
    {
      name: "n8n",
      image: "/templates/n8n.png?height=400&width=600&text=n8n",
      category: "Automation",
    },
    {
      name: "WordPress",
      image: "/templates/wordpress.png?height=400&width=600&text=WordPress",
      category: "CMS",
    },
  ]

  const duplicatedTemplates = [...templates, ...templates, ...templates]
  const loopWidth = 360 * 6 + 24 * 6

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      const currentX = x.get()
      const newX = currentX + scrollSpeed * (delta / 16)

      if (newX <= -loopWidth) {
        x.set(newX + loopWidth)
      } else {
        x.set(newX)
      }
    }
  })

  return (
    <section className="relative flex w-full min-h-screen flex-col place-content-center place-items-center overflow-hidden">
      {/* Header Section */}
      <div ref={headerRef} className="relative z-10 w-full place-content-center items-center flex flex-col max-w-5xl gap-6 px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <h2 className="text-7xl max-lg:text-5xl max-md:text-4xl font-bold text-black dark:text-white leading-tight">
            Hawiyat Templates
          </h2>

          <p className="text-2xl max-lg:text-xl max-md:text-lg font-light text-gray-600 dark:text-gray-400">
            Deploy in <span className="font-semibold text-black dark:text-white">Seconds</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 text-center leading-relaxed"
        >
          Production-ready templates with one click for your next project.
          <br />
          <span className="font-semibold text-black dark:text-white">Click, Ship, and Scale</span> with
          enterprise level infrastructure.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex gap-8 mt-8 max-md:gap-4"
        >
          {[
            { value: "300+", label: "Templates" },
            { value: "<30s", label: "Deploy Time" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="text-center relative">
              <div className="text-3xl font-bold text-black dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-500">{stat.label}</div>
              {index < 2 && (
                <div className="absolute right-[-16px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800"></div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Templates Carousel */}
      <div ref={carouselRef} className="relative w-full overflow-hidden py-8">
        <motion.div
          className="flex gap-6"
          style={{ x, width: "fit-content" }}
        >
          {duplicatedTemplates.map((template, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 transition-all duration-500"
              style={{
                width: "500px",
                height: "380px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: (index % 6) * 0.1,
                ease: "easeOut"
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Template Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
                    {template.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{template.name}</h3>
                </div>
              </div>

              {/* Deploy Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                <button className="px-10 py-4 rounded-xl font-bold text-black bg-white transform scale-75 group-hover:scale-100 transition-all duration-500 hover:scale-105 hover:shadow-xl flex items-center gap-3">
                  <span className="text-lg">Deploy Now</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-black dark:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="relative z-10 mt-16 text-center"
      >
        <p className="text-gray-500 dark:text-gray-500 mb-4">
          Hover over any template to deploy instantly
        </p>
        <button className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold transition-all duration-300 hover:scale-105">
          Browse All Templates
        </button>
      </motion.div>
    </section>
  )
}