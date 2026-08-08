"use client"
import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Handshake, Cpu } from "lucide-react"

function useCounter(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!start) return

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration, start])

  return count
}

function StatCard({ value, label, description, icon: Icon, delay, prefix = "+", suffix = "" }: { value: number; label: string; description: string; icon: React.ElementType; delay: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const count = useCounter(value, 2000, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-[420px] mx-auto rounded-md p-6 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-4 box-border"
    >
      <Icon className="w-16 h-16 text-black dark:text-white mx-auto" />
      <div className="text-center">
        <div className="text-4xl tracking-tight">
          {prefix}{count}{suffix}
        </div>
        <h3 className="text-2xl mt-2">{label}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 px-2 text-center text-sm break-words">
        {description}
      </p>
    </motion.div>
  )
}

const OurNumbers = () => {
  const stats = [
    {
      value: 100,
      label: "Clients",
      description: "Trusted by businesses, developers, and teams across Algeria and beyond.",
      icon: Users,
    },
    {
      value: 10,
      label: "Resellers",
      description: "Growing partner network delivering Hawiyat solutions to local markets.",
      icon: Handshake,
    },
    {
      value: 100,
      label: "Tokens Served",
      description: "Tokens processed through Hawiyat Composer's caching and routing.",
      icon: Cpu,
      prefix: "+",
      suffix: "B",
    },
  ]

  return (
    <section className="relative w-full overflow-hidden px-6 max-md:px-4 py-20 md:py-32 max-md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="w-full max-w-[1200px] flex flex-col items-center gap-4 p-4 mx-auto">
          <h2 className="text-5xl font-medium max-md:text-3xl text-center leading-normal">
            Our Numbers
          </h2>
          <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch p-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                icon={stat.icon}
                delay={index * 0.15}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurNumbers
