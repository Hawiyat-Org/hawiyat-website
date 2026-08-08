"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

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

  return (
    <section className="relative w-full overflow-hidden px-6 max-md:px-4 py-20 md:py-32 max-md:py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 max-md:mb-8 text-center"
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
