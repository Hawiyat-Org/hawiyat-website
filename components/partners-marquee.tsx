"use client"
import { SkeletonImage } from "@/components/image-with-skeleton"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { partners } from "@/lib/data/partners"

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
              <SkeletonImage
                src={isDark ? "/trust/itsol-dark.svg" : "/trust/itsol.svg"}
                alt={partner.alt}
                fill
                sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 128px"
                imgClassName="object-contain" />
            </div>
          ) : partner.logo === "green-duty" ? (
            <div className="relative h-12 w-32 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48">
              <SkeletonImage
                src={isDark ? "/trust/green-duty-dark.webp" : "/trust/green-duty-light.webp"}
                alt={partner.alt}
                fill
                sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 128px"
                imgClassName="object-contain" />
            </div>
          ) : partner.logo === "mercus" ? (
            <div className="relative h-12 w-32 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48">
              <SkeletonImage
                src={isDark ? "/trust/mercus-academy-dark.webp" : "/trust/mercus-academy-light.webp"}
                alt={partner.alt}
                fill
                sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 128px"
                imgClassName="object-contain" />
            </div>
          ) : (
            <div className="relative h-12 w-32 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-20 lg:w-48">
              <SkeletonImage
                src={partner.logo}
                alt={partner.alt}
                fill
                sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 128px"
                imgClassName="object-contain" />
            </div>
          )

        // The row repeats partners so the -50% loop stays seamless; the second
        // copy is only there for visual continuity, so keep it out of the tab
        // order and the accessibility tree.
        const isDuplicate = index >= partners.length

        return (
          <div
            key={index}
            aria-hidden={(hidden || isDuplicate) || undefined}
            className="group relative flex shrink-0 items-center justify-center"
          >
            {partner.url ? (
              <Link
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={hidden || isDuplicate ? -1 : undefined}
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
    </section>
  )
}

export default PartnersMarquee
