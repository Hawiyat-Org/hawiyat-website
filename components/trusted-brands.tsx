"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

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
      title: "Itihad Group — a company that trusts Hawiyat",
      alt: "Itihad Group logo — an Algerian business group that trusts Hawiyat for AI, automation, and cloud services",
      desc: "Itihad Group is a company that trusts Hawiyat for AI, automation, and cloud services in Algeria.",
    },
    {
      name: "ESTIN",
      logo: "/trust/estin-logo.svg",
      url: "https://estin.dz/",
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
      title: "IT Solutions — an IT services company that trusts Hawiyat",
      alt: "IT Solutions logo — an Algerian IT services company that trusts Hawiyat for AI subscriptions, hosting, and automation",
      desc: "IT Solutions is an Algerian IT services company that trusts Hawiyat for AI subscriptions, hosting, and automation.",
    },
    {
      name: "RMASC",
      logo: "/trust/rmasc-logo.webp",
      url: "https://www.sarlrmasc.com/",
      title: "RMASC (SARL RMASC) — an Algerian elevator company that trusts Hawiyat",
      alt: "RMASC logo — SARL RMASC, an Algerian elevator design, installation, and repair company that trusts Hawiyat",
      desc: "SARL RMASC is an Algerian company specialised in elevator design, installation, and repair that trusts Hawiyat for AI and digital services.",
    },
    {
      name: "Green Duty",
      logo: "/trust/green-duty-logo.webp",
      url: "",
      title: "Green Duty — a company that trusts Hawiyat",
      alt: "Green Duty logo — a company that trusts Hawiyat for AI and digital services",
      desc: "Green Duty is a company that trusts Hawiyat for AI and digital services.",
    },
    {
      name: "Mercus Academy",
      logo: mounted && (resolvedTheme === "dark" || theme === "dark")
        ? "/trust/mercus-academy-dark.webp"
        : "/trust/mercus-academy-light.webp",
      url: "",
      square: true,
      title: "Mercus Academy — a training institution that trusts Hawiyat",
      alt: "Mercus Academy logo — a training and education institution that trusts Hawiyat for AI and digital services",
      desc: "Mercus Academy is a training and education institution that trusts Hawiyat for AI and digital services.",
    },
  ]

  // Each half repeats the brands so the -50% loop wraps seamlessly.
  // Trailing padding matches the item gap so spacing stays uniform.
  const renderRow = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
    >
      {[...brands, ...brands].map((brand, index) => {
        const logo = (
          <div
            className={
              brand.square
                ? "relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
                : "relative h-12 w-32 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48"
            }
          >
            <Image
              src={brand.logo}
              alt={brand.alt}
              title={brand.title}
              fill
              className="object-contain transition-all duration-500 drop-shadow-[0_0_8px_rgba(0,0,0,0.15)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            />
          </div>
        )
        return (
          <div key={index} className="group relative flex shrink-0 items-center justify-center">
            {brand.url ? (
              <Link
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full w-full"
              >
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <section className="relative w-full overflow-hidden pt-2 pb-8 md:pt-4 md:pb-12">
      <div className="flex flex-col items-center gap-5">
        {/* Logos stream left-to-right, on top */}
        <div className="marquee relative w-full overflow-hidden">
          <div className="marquee-track flex w-max">
            {renderRow(false)}
            {renderRow(true)}
          </div>
        </div>

        {/* Word below the logos */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-medium text-muted-foreground md:text-3xl"
        >
        
        </motion.h2>
      </div>

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
    </section>
  )
}

export default TrustedBrands
