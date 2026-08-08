"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Handshake, LayoutGrid } from "lucide-react"

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

function StatCard({ value, label, description, icon: Icon, delay }: { value: number; label: string; description: string; icon: React.ElementType; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const count = useCounter(value, 2000, inView)
  const prefix = "+"

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
          {prefix}{count}
        </div>
        <h3 className="text-2xl mt-2">{label}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 px-2 text-center text-sm break-words">
        {description}
      </p>
    </motion.div>
  )
}

const TrustedBrands = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const brands = [
    {
      name: "Itihad",
      logo: "/trust/itihad-logo.svg",
      url: "https://itihad.group",
      large: true,
      title: "Itihad Group — a company that trusts Hawiyat",
      alt: "Itihad Group logo — an Algerian business group that trusts Hawiyat for AI, automation, and cloud services",
      desc: "Itihad Group is a company that trusts Hawiyat for AI, automation, and cloud services in Algeria.",
    },
    {
      name: "ESTIN",
      logo: "/trust/estin-logo.svg",
      url: "https://estin.dz/",
      large: true,
      title: "ESTIN — École Supérieure en Informatique, a trusted Hawiyat reference",
      alt: "ESTIN logo — the Algerian computer science school École Supérieure en Informatique, which trusts Hawiyat for AI access and developer services",
      desc: "ESTIN (École Supérieure en Informatique) is an Algerian higher education institution that trusts Hawiyat for AI access and developer services.",
    },
    {
      name: "IT Solutions",
      logo: mounted && (resolvedTheme === "dark" || theme === "dark")
        ? "/trust/itsol-dark.svg"
        : "/trust/itsol.svg",
      url: "https://itsolutions.dz/",
      large: true,
      title: "IT Solutions — an IT services company that trusts Hawiyat",
      alt: "IT Solutions logo — an Algerian IT services company that trusts Hawiyat for AI subscriptions, hosting, and automation",
      desc: "IT Solutions is an Algerian IT services company that trusts Hawiyat for AI subscriptions, hosting, and automation.",
    },
    {
      name: "RMASC",
      logo: "/trust/rmasc-logo.webp",
      url: "https://www.sarlrmasc.com/",
      large: true,
      title: "RMASC (SARL RMASC) — an Algerian elevator company that trusts Hawiyat",
      alt: "RMASC logo — SARL RMASC, an Algerian elevator design, installation, and repair company that trusts Hawiyat",
      desc: "SARL RMASC is an Algerian company specialised in elevator design, installation, and repair that trusts Hawiyat for AI and digital services.",
    },
  ]

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
      value: 300,
      label: "Templates",
      description: "Pre-configured stacks and services ready to deploy in seconds.",
      icon: LayoutGrid,
    },
  ]

  return (
    <section className="relative w-full overflow-hidden px-6 max-md:px-4 py-20 md:py-32 max-md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="w-full max-w-[1200px] flex flex-col items-center gap-4 p-4 mx-auto">
          <h2 className="reveal-up text-5xl font-medium max-md:text-3xl text-center leading-normal">
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-28 max-md:mt-12 mb-16 md:mb-24 max-md:mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl max-md:text-2xl">Trusted by</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-16 lg:gap-20 max-md:gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center"
              >
                <Link 
                  href={brand.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full h-full"
                >
                  <div
                    className={`relative w-full transition-transform duration-500 ease-out group-hover:scale-110 ${
                      brand.large
                        ? "h-32 md:h-40 lg:h-52 max-md:h-28"
                        : "h-24 md:h-32 lg:h-40 max-md:h-20"
                    }`}
                  >
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.alt || brand.name}
                      title={brand.title}
                      fill
                      className="object-contain transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Structured data: lets search engines & AI crawlers read the references as entities */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Companies that trust Hawiyat",
              description:
                "Algerian companies, institutions, and teams that trust Hawiyat for AI subscriptions, Hawiyat Composer, automation, hosting, and implementation services.",
              numberOfItems: brands.length,
              itemListElement: brands.map((brand, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Organization",
                  name: brand.name,
                  url: brand.url,
                  description: brand.desc,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}

export default TrustedBrands
