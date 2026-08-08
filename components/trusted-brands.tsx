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
    alt: "Itihad Group logo — accelerator partner",
    desc: "Itihad Group — acceleration partner at Itihad Campus, Boumerdes.",
  },
  {
    name: "ESTIN",
    logo: "/trust/estin-logo.svg",
    url: "https://estin.dz/",
    alt: "ESTIN logo — partner institution",
    desc: "ESTIN (École Supérieure en Informatique) — partner institution.",
  },
  {
    name: "IT Solutions",
    logo: "itsol",
    url: "https://itsolutions.dz/",
    alt: "IT Solutions — partner company",
    desc: "IT Solutions — partner company.",
  },
  {
    name: "RMASC",
    logo: "/trust/rmasc-logo.webp",
    url: "https://www.sarlrmasc.com/",
    alt: "RMASC logo — SARL RMASC, an Algerian elevator design, installation, and repair company",
    desc: "RMASC — Algerian elevator company trusting Hawiyat.",
  },
  {
    name: "Green Duty",
    logo: "green-duty",
    url: "",
    alt: "Green Duty logo — a company that trusts Hawiyat",
    desc: "Green Duty — a company that trusts Hawiyat.",
  },
  {
    name: "Mercus Academy",
    logo: "mercus",
    url: "https://www.mercus-academy.com/",
    alt: "Mercus Academy logo — a training institution that trusts Hawiyat",
    desc: "Mercus Academy — training institution.",
  },
]

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 text-center">
      <p className="font-mono text-4xl font-bold text-signal md:text-5xl">{value}</p>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-ink">{label}</p>
    </div>
  )
}

const TrustedBrands = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark")

  return (
    <section className="w-full bg-surface-dim py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Proof
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            The execution layer, in production.
          </h2>
          <p className="mt-3 text-sm text-muted-ink">
            Verified figures from the Hawiyat operations dashboard. Nothing else gets printed.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value="100+" label="clients" />
          <StatCard value="10+" label="resellers" />
          <StatCard value="100B+" label="tokens served" />
          <StatCard value="≈2.6M DZD" label="annual recurring revenue" />
        </div>

        {/* Partners & early customers */}
        <div className="mt-14">
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-ink">
            Partners &amp; early customers
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {partners.map((partner) => {
              const logoEl = partner.logo === "itsol" ? (
                <div className="relative h-12 w-36 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                  <Image
                    src={isDark ? "/trust/itsol-dark.svg" : "/trust/itsol.svg"}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : partner.logo === "green-duty" ? (
                <div className="relative h-12 w-36 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                  <Image
                    src={isDark ? "/trust/green-duty-dark.webp" : "/trust/green-duty-light.webp"}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : partner.logo === "mercus" ? (
                <div className="relative h-12 w-36 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                  <Image
                    src={isDark ? "/trust/mercus-academy-dark.webp" : "/trust/mercus-academy-light.webp"}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : partner.logo ? (
                <div className="relative h-12 w-36 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                  <Image src={partner.logo} alt={partner.alt} fill className="object-contain" />
                </div>
              ) : null

              const content = (
                <span className="group flex flex-col items-center gap-2">
                  {logoEl}
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-ink">
                    {partner.name}
                  </span>
                </span>
              )

              return partner.url ? (
                <Link
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={partner.alt}
                  title={partner.desc}
                >
                  {content}
                </Link>
              ) : (
                <span key={partner.name} aria-label={partner.alt} title={partner.desc}>
                  {content}
                </span>
              )
            })}
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

export default TrustedBrands
