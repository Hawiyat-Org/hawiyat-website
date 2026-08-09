"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Users, DollarSign, Bot, CheckCircle, PhoneCall, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { services, EXCLUDED_SERVICE_IDS, type Service } from "@/lib/data/services"
import { cn } from "@/lib/utils"

interface CatalogCard {
  key: string
  slug: string
  plan?: string
  name: string
  description: string
  image?: string
  images?: string[]
  price: string
  originalPrice?: string
  priceLabel: string
  category: string
  tag?: string
  features: string[]
  useCases: string
}

/* Lowest plan price (as a display string) for "from X DA" cards. */
function lowestPlanPrice(plans?: Service["plans"]): string | undefined {
  if (!plans || plans.length === 0) return undefined
  let lowest: string | undefined
  let lowestValue = Number.POSITIVE_INFINITY
  for (const plan of plans) {
    const value = Number.parseInt(plan.price.replace(/[^\d]/g, ""), 10)
    if (!Number.isNaN(value) && value < lowestValue) {
      lowestValue = value
      lowest = plan.price
    }
  }
  return lowest
}

/* Tier services become ONE card each (plan choice happens on the detail page).
   hosting-basic + hosting-vip fold into a single "Hosting" card. */
function buildCatalogCards(): CatalogCard[] {
  const cards: CatalogCard[] = []

  for (const service of services) {
    if (EXCLUDED_SERVICE_IDS.includes(service.id)) continue
    if (service.id === "hosting-vip") continue // folded into the Hosting card below

    // hosting-basic + hosting-vip → one "Hosting" card (Basic or VIP chosen on the detail page)
    if (service.id === "hosting-basic") {
      cards.push({
        key: "hosting",
        slug: "hosting-basic",
        name: "Hosting",
        description:
          "Managed app hosting for one or two applications, with SSL, automatic Git deploys, and an optional managed database. Choose Basic or VIP on the page.",
        image: service.image,
        images: service.images,
        price: "from 1,000",
        priceLabel: "DA/month",
        category: service.category,
        tag: "Basic / VIP",
        features: [
          "1 or 2 applications",
          "Managed database (PostgreSQL or MySQL)",
          "Free SSL certificate",
          "Automatic deployments from Git",
          "Priority support",
        ],
        useCases:
          "Personal portfolios, small websites, full-stack apps, SaaS projects, and apps that need a database.",
      })
      continue
    }

    if (service.plans && service.plans.length > 0) {
      const fromPrice = lowestPlanPrice(service.plans)
      cards.push({
        key: service.id,
        slug: service.slug,
        name: service.name,
        description: service.description,
        image: service.image,
        images: service.images,
        price: fromPrice ? `from ${fromPrice}` : service.price,
        priceLabel: service.priceLabel,
        category: service.category,
        tag: service.tag,
        features: service.features,
        useCases: service.useCases,
      })
      continue
    }

    cards.push({
      key: service.id,
      slug: service.slug,
      name: service.name,
      description: service.description,
      image: service.image,
      images: service.images,
      price: service.price,
      originalPrice: service.originalPrice,
      priceLabel: service.priceLabel,
      category: service.category,
      tag: service.tag,
      features: service.features,
      useCases: service.useCases,
    })
  }

  return cards
}

/* Display order: the systems you connect (n8n, Evolution), then the cloud runtime (hosting). */
const CARD_ORDER: Record<string, number> = {
  "n8n-hosting": 1,
  "evolution-api": 2,
  "hosting": 3,
}

const categoryStyles: Record<string, string> = {
  "AI Execution": "bg-signal-bg text-signal-contrast border border-signal/20",
  "Managed Systems": "bg-surface-dim text-muted-ink border border-border",
  "Cloud Runtime": "bg-surface-dim text-muted-ink border border-border",
}

const catalogCards = buildCatalogCards().sort(
  (a, b) => (CARD_ORDER[a.key] ?? 99) - (CARD_ORDER[b.key] ?? 99)
)

export default function ServicesCatalog({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const filteredCards = useMemo(() => {
    if (!searchQuery) return catalogCards
    const q = searchQuery.toLowerCase()
    return catalogCards.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.features.some((f) => f.toLowerCase().includes(q)) ||
        s.useCases.toLowerCase().includes(q)
    )
  }, [searchQuery])

  return (
    <div>
      {/* Search */}
      <div
        className={`max-w-lg mx-auto mb-16 transition-all duration-500 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-ink z-10 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value
              setSearchQuery(value)
              const encoded = encodeURIComponent(value)
              router.replace(value ? `/services?q=${encoded}` : "/services", { scroll: false })
            }}
            className="h-14 pl-12 text-base bg-surface dark:bg-surface-dim backdrop-blur-xl border-2 border-border focus:border-signal rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-ink mb-3">No services found.</p>
          <button onClick={() => { setSearchQuery(""); router.replace("/services", { scroll: false }) }} className="text-sm underline hover:no-underline">
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredCards.map((service, i) => (
            <Link
              key={service.key}
              href={`/services/${service.slug}${service.plan ? `?plan=${encodeURIComponent(service.plan)}` : ""}`}
              className={`group relative rounded-lg border border-border bg-surface overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-signal-bg/30 via-transparent to-surface-dim/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {service.tag && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-signal text-signal-text">
                    {service.tag}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-36 w-full shrink-0 bg-gradient-to-br from-surface-dim/40 to-surface-dim/10 dark:from-surface-dim/20 dark:to-surface-dim/10 flex items-center justify-center p-4">
                {service.images ? (
                  <div className="flex items-center justify-center gap-3">
                    {service.images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20">
                        <Image src={img} alt={service.name} fill className="object-contain drop-shadow-md" loading="lazy" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative w-24 h-24">
                    <Image src={service.image || "/logo.svg"} alt={service.name} fill className="object-contain drop-shadow-lg" loading="lazy" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative p-4 flex flex-col gap-2">
                <span className={cn(
                  "inline-flex items-center self-start px-2 py-0.5 rounded-md text-xs font-medium",
                  categoryStyles[service.category] ?? "bg-surface-dim text-muted-ink border border-border"
                )}>
                  {service.category}
                </span>

                <h2 className="text-base font-semibold text-ink group-hover:text-ink transition-colors line-clamp-1">{service.name}</h2>

                <p className="text-xs text-muted-ink leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-2 pt-3 border-t border-border/30">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-2xl font-bold text-ink">{service.price}</span>
                    {service.originalPrice && (
                      <span className="text-sm text-muted-ink line-through">{service.originalPrice}</span>
                    )}
                    <span className="text-xs text-muted-ink">{service.priceLabel}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Why Choose Hawiyat */}
      <div className="mt-24 mb-10 w-full flex flex-col items-center">
        <h2 className="text-5xl font-medium max-md:text-3xl text-center leading-normal mb-10">Why Choose Hawiyat</h2>
        <p className="text-muted-ink mt-[-24px] mb-10 text-center text-sm max-w-lg">The execution layer, locally supported and billed in DZD.</p>
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch p-4">
          {[
            { icon: Users, title: "Local Team", desc: "Based in Algiers. Same timezone, support in Arabic, French, and English." },
            { icon: DollarSign, title: "Billed in DZD", desc: "Pay in dinars with CCP or Baridi Mob. No foreign cards, no forex drift." },
            { icon: Bot, title: "Model-Agnostic", desc: "Models are routes, not SKUs. Composer picks the right one for each task." },
            { icon: Activity, title: "Telemetry & Evaluation", desc: "Every run is logged and evaluated, quality, latency, and cost in DZD." },
            { icon: PhoneCall, title: "Reachable", desc: "Support via WhatsApp, not a foreign ticket system." },
            { icon: CheckCircle, title: "Production-Tested", desc: "The same execution layer that ships 100+ client deployments." },
          ].map((item, i) => (
            <div key={i} className="w-full max-w-[420px] mx-auto rounded-lg p-6 bg-surface border border-border flex flex-col gap-4 box-border">
              <item.icon className="w-16 h-16 text-signal mx-auto" />
              <h3 className="text-2xl text-ink text-center">{item.title}</h3>
              <p className="text-muted-ink px-2 text-center text-sm break-words">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
