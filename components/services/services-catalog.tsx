"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Users, DollarSign, Bot, CheckCircle, PhoneCall, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { services } from "@/lib/data/services"
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

/* Expand services: services with plans become one card per plan (Freelance / Startup / Enterprise) */
function buildCatalogCards(): CatalogCard[] {
  const cards: CatalogCard[] = []

  for (const service of services) {
    if (service.plans && service.plans.length > 0) {
      for (const plan of service.plans) {
        cards.push({
          key: `${service.id}--${plan.name.toLowerCase().replace(/\s+/g, "-")}`,
          slug: service.slug,
          plan: plan.name,
          name: `${service.name} - ${plan.name}`,
          description: plan.tagline || service.description,
          image: service.image,
          images: service.images,
          price: plan.price,
          originalPrice: plan.originalPrice,
          priceLabel: plan.priceLabel,
          category: service.category,
          tag: plan.name,
          features: plan.features,
          useCases: service.useCases,
        })
      }
    } else {
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
  }

  return cards
}

/* Display order: the execution layer sorts first (Composer tiers + AI Composer access),
   then the systems you connect (n8n, Evolution), then the cloud runtime (hosting). */
const CARD_ORDER: Record<string, number> = {
  "composer-pro": 1,
  "composer-max5x": 2,
  "composer-max20x": 3,
  "llm-credit": 4,
  "n8n-hosting--freelance": 5,
  "n8n-hosting--startup": 6,
  "n8n-hosting--enterprise": 7,
  "evolution-api--whatsapp": 8,
  "evolution-api--startup": 9,
  "evolution-api--enterprise": 10,
  "hosting-basic": 11,
  "hosting-vip": 12,
}

const categoryStyles: Record<string, string> = {
  "AI Execution": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "Managed Systems": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "Cloud Runtime": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/60 z-10 pointer-events-none" />
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
            className="h-14 pl-12 text-base bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border-2 border-border/60 focus:border-primary rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-3">No services found.</p>
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
              className={`group relative rounded-xl border border-border/40 bg-white/40 dark:bg-secondary dark:border-border/60 backdrop-blur-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {service.tag && (
                <div className="absolute top-3 right-3 z-10">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg text-white",
                    service.tag === "Popular" && "bg-gradient-to-r from-violet-500 to-purple-600",
                    service.tag === "Pro" && "bg-gradient-to-r from-purple-500 to-violet-600",
                    service.tag === "Starter" && "bg-gradient-to-r from-emerald-500 to-green-600",
                    service.tag === "Max 5X" && "bg-gradient-to-r from-orange-500 to-red-600",
                    service.tag === "Max 20X" && "bg-gradient-to-r from-yellow-500 to-amber-600",
                    service.tag === "VIP" && "bg-gradient-to-r from-amber-500 to-yellow-600",
                    service.tag === "Freelance" && "bg-gradient-to-r from-teal-500 to-emerald-600",
                    service.tag === "WhatsApp" && "bg-gradient-to-r from-green-500 to-emerald-600",
                    service.tag === "Startup" && "bg-gradient-to-r from-blue-500 to-indigo-600",
                    service.tag === "Enterprise" && "bg-gradient-to-r from-yellow-500 to-amber-600",
                  )}>
                    {service.tag}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-36 w-full shrink-0 bg-gradient-to-br from-surface-dim/30 to-surface-dim/10 dark:from-surface-dim/20 dark:to-surface-dim/10 flex items-center justify-center p-4">
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
                  "inline-flex items-center self-start px-2 py-0.5 rounded-full text-xs font-medium",
                  categoryStyles[service.category] ?? "bg-primary/10 text-primary"
                )}>
                  {service.category}
                </span>

                <h2 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-1">{service.name}</h2>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-2 pt-3 border-t border-border/30">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-2xl font-bold">{service.price}</span>
                    {service.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{service.originalPrice}</span>
                    )}
                    <span className="text-xs text-muted-foreground">{service.priceLabel}</span>
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
            <div key={i} className="w-full max-w-[420px] mx-auto rounded-md p-6 bg-surface-dim dark:border-border flex flex-col gap-4 box-border">
              <item.icon className="w-16 h-16 text-black dark:text-white mx-auto" />
              <h3 className="text-2xl text-center">{item.title}</h3>
              <p className="text-muted-ink px-2 text-center text-sm break-words">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
