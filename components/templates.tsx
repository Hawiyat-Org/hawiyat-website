"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const Templates = () => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const templates = [
    {
      name: "Oracle Database",
      description: "Enterprise-grade relational database management system with advanced security and performance optimization.",
      image: "/placeholder.svg?height=400&width=600&text=Oracle",
      category: "Database",
      color: "from-red-500 to-orange-500",
      logo: "🗄️"
    },
    {
      name: "Odoo",
      description: "Complete suite of business applications including CRM, e-commerce, accounting, inventory, and project management.",
      image: "/placeholder.svg?height=400&width=600&text=Odoo",
      category: "ERP",
      color: "from-purple-500 to-pink-500",
      logo: "📊"
    },
    {
      name: "ERPNext",
      description: "Open-source ERP solution for manufacturing, distribution, retail, and services with comprehensive modules.",
      image: "/placeholder.svg?height=400&width=600&text=ERPNext",
      category: "ERP",
      color: "from-blue-500 to-cyan-500",
      logo: "🏢"
    },
    {
      name: "Supabase",
      description: "Open-source Firebase alternative with PostgreSQL database, authentication, storage, and real-time subscriptions.",
      image: "/placeholder.svg?height=400&width=600&text=Supabase",
      category: "Backend",
      color: "from-green-500 to-emerald-500",
      logo: "⚡"
    },
    {
      name: "n8n",
      description: "Workflow automation tool for connecting apps and services with visual programming and custom integrations.",
      image: "/placeholder.svg?height=400&width=600&text=n8n",
      category: "Automation",
      color: "from-pink-500 to-rose-500",
      logo: "🔗"
    },
    {
      name: "WordPress",
      description: "World's most popular content management system for building websites, blogs, and e-commerce platforms.",
      image: "/placeholder.svg?height=400&width=600&text=WordPress",
      category: "CMS",
      color: "from-indigo-500 to-blue-500",
      logo: "📝"
    }
  ]

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const scrollerContent = Array.from(scroller.children)
    
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement
      scroller.appendChild(duplicatedItem)
    })
  }, [])

  return (
    <section className="flex min-h-screen w-full flex-col place-content-center place-items-center py-20 px-8 overflow-hidden">
      <div className="w-full max-w-7xl mb-16">
        <h2 className="text-5xl font-bold text-center mb-4 max-md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Deploy Any Template in Seconds
        </h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 max-md:text-lg">
          Pre-configured, production-ready templates for your next project
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={scrollerRef}
          className="flex gap-8 w-max"
          style={{
            animation: isPaused ? 'none' : 'scroll 40s linear infinite',
          }}
        >
          {templates.map((template, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:scale-105 w-[450px] flex-shrink-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}></div>
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Logo */}
                <div className="absolute top-4 left-4 z-20">
                  <div className={`text-5xl bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 group-hover:scale-110 transition-transform duration-300`}>
                    {template.logo}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${template.color} text-white shadow-lg backdrop-blur-sm`}>
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative p-8 z-10">
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300">
                  {template.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 min-h-[80px]">
                  {template.description}
                </p>

                {/* Deploy Button */}
                <button className={`w-full py-4 px-6 rounded-xl font-bold bg-gradient-to-r ${template.color} text-white hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg`}>
                  <span>Deploy Now</span>
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Decorative Elements */}
              <div className={`absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br ${template.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
              <div className={`absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br ${template.color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20 w-full max-w-2xl">
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
          Can't find what you're looking for?
        </p>
        <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg">
          Request Custom Template
        </button>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}

export default Templates