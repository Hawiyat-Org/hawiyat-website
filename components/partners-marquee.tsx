"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const partners = [
  {
    name: "Itihad",
    logo: "/trust/itihad-logo.svg",
    url: "https://itihad.group",
    alt: "Itihad Group logo, accelerator partner",
    desc: "Itihad Group, acceleration partner at Itihad Campus, Boumerdes.",
  },
  {
    name: "ESTIN",
    logo: "/trust/estin-logo.svg",
    url: "https://estin.dz/",
    alt: "ESTIN logo, partner institution",
    desc: "ESTIN (École Supérieure en Informatique), partner institution.",
  },
  {
    name: "IT Solutions",
    logo: "itsol",
    url: "https://itsolutions.dz/",
    alt: "IT Solutions, partner company",
    desc: "IT Solutions, partner company.",
  },
  {
    name: "RMASC",
    logo: "/trust/rmasc-logo.webp",
    url: "https://www.sarlrmasc.com/",
    alt: "RMASC logo, SARL RMASC, an Algerian elevator design, installation, and repair company",
    desc: "RMASC, Algerian elevator company trusting Hawiyat.",
  },
  {
    name: "Green Duty",
    logo: "green-duty",
    url: "",
    alt: "Green Duty logo, a company that trusts Hawiyat",
    desc: "Green Duty, a company that trusts Hawiyat.",
  },
  {
    name: "Mercus Academy",
    logo: "mercus",
    url: "https://www.mercus-academy.com/",
    alt: "Mercus Academy logo, a training institution that trusts Hawiyat",
    desc: "Mercus Academy, training institution.",
  },
]

const PartnersMarquee = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark")

  // Each half repeats the partners so the -50% loop wraps seamlessly.
  // Trailing padding matches the item gap so spacing stays uniform.
  const renderRow = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
    >
      {[...partners, ...partners].map((partner, index) => {
        const logo =
          partner.logo === "itsol" ? (
            <div className="relative h-12 w-32 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48">
              <Image
                src={isDark ? "/trust/itsol-dark.svg" : "/trust/itsol.svg"}
                alt={partner.alt}
                fill
                className="object-contain"
              />
            </div>
          ) : partner.logo === "green-duty" ? (
            <div className="relative h-12 w-32 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48">
              <Image
                src={isDark ? "/trust/green-duty-dark.webp" : "/trust/green-duty-light.webp"}
                alt={partner.alt}
                fill
                className="object-contain"
              />
            </div>
          ) : partner.logo === "mercus" ? (
            <div className="relative h-12 w-32 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48">
              <Image
                src={isDark ? "/trust/mercus-academy-dark.webp" : "/trust/mercus-academy-light.webp"}
                alt={partner.alt}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="relative h-12 w-32 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48">
              <Image src={partner.logo} alt={partner.alt} fill className="object-contain" />
            </div>
          )

        return (
          <div key={index} className="group relative flex shrink-0 items-center justify-center">
            {partner.url ? (
              <Link
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={hidden ? -1 : undefined}
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
    <section className="relative w-full overflow-hidden py-10 md:py-14">
      <div className="flex flex-col items-center gap-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
          Partners &amp; early customers
        </p>
        <div className="marquee relative w-full overflow-hidden">
          <div className="marquee-track flex w-max">
            {renderRow(false)}
            {renderRow(true)}
          </div>
        </div>
      </div>

      {/* Structured data: search engines & AI crawlers read the references as entities */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Hawiyat partners and early customers",
            description:
              "Partners and early customers working with the Hawiyat execution layer.",
            numberOfItems: partners.length,
            itemListElement: partners.map((partner, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Organization",
                name: partner.name,
                url: partner.url,
                description: partner.desc,
              },
            })),
          }),
        }}
      />
    </section>
  )
}

export default PartnersMarquee
