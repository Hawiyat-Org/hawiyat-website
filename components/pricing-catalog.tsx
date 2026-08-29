"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface PricingCard {
  name: string
  label: string
  logos: string[]
  tagline: string
  offers: Array<{ label: string; price: string; per: string }>
  href: string
  cta?: string
  badge?: string
}

export interface PricingSection {
  id: string
  title: string
  subtitle?: string
  cards: PricingCard[]
}

export interface PricingCatalogProps {
  sections: PricingSection[]
}

/** Thousands separator for prices that arrive raw (e.g. "7000" → "7,000"). */
function formatPrice(p: string): string {
  if (!p) return p
  if (p.includes(",")) return p
  const n = Number(p.replace(/[^\d.]/g, ""))
  if (!Number.isFinite(n)) return p
  return n.toLocaleString("en-US")
}

export function PricingCatalog({ sections }: PricingCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections
    const q = searchQuery.toLowerCase()
    return sections
      .map((s) => ({
        ...s,
        cards: s.cards.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.label.toLowerCase().includes(q) ||
            c.tagline.toLowerCase().includes(q) ||
            c.offers.some((o) => o.label.toLowerCase().includes(q) || o.price.toLowerCase().includes(q))
        ),
      }))
      .filter((s) => s.cards.length > 0)
  }, [sections, searchQuery])

  return (
    <section className="mx-auto max-w-6xl" id="pricing-catalog">
      {/* Search */}
      <div className="mx-auto mb-12 max-w-lg">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-ink z-10 pointer-events-none" />
          <Input
            type="search"
            aria-label="Search services"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 text-base bg-surface dark:bg-surface-dim backdrop-blur-xl border-2 border-border focus:border-signal rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          />
        </div>
      </div>

      {/* Sections */}
      {filteredSections.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-ink mb-3">No services found.</p>
          <button
            onClick={() => setSearchQuery("")}
            className="inline-flex min-h-[44px] items-center text-sm underline hover:no-underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-14">
          {filteredSections.map((section) => (
            <div key={section.id}>
              <div className="mb-5 text-center">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="mt-2 text-sm text-muted-ink">{section.subtitle}</p>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.cards.map((card) => (
                  <div
                    key={card.name}
                    className="flex flex-col justify-between rounded-lg border border-border bg-surface p-6 transition-colors hover:border-signal"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        {card.logos.map((logo) => (
                          <img
                            key={logo}
                            src={logo}
                            alt={`${card.name} logo`}
                            className="h-10 w-10 rounded-md border border-border bg-surface-dim object-contain p-1"
                          />
                        ))}
                      </div>
                      <span className="mt-4 inline-block rounded-md border border-border bg-surface-dim px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-ink">
                        {card.label}
                      </span>
                      {card.badge && (
                        <span
                          className={cn(
                            "ml-2 inline-flex items-center gap-1 rounded-md bg-signal px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-signal-text",
                            card.badge === "New" && "bg-signal"
                          )}
                        >
                          {card.badge === "New" && <Sparkles className="h-2.5 w-2.5" />}
                          {card.badge}
                        </span>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-muted-ink">{card.tagline}</p>
                      <ul className="mt-5 space-y-3">
                        {card.offers.map((offer) => (
                          <li
                            key={offer.label}
                            className="flex items-center justify-between gap-2 text-sm text-muted-ink"
                          >
                            <span className="flex items-center gap-2.5">
                              <Check className="h-4 w-4 shrink-0 text-ink" />
                              <span className="font-mono text-[11px] uppercase tracking-wider">
                                {offer.label}
                              </span>
                            </span>
                            <span className="font-mono font-semibold text-ink">
                              {formatPrice(offer.price)}{" "}
                              <span className="text-xs text-muted-ink">{offer.per}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <Link
                        href={card.href}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                      >
                        {card.cta ?? (card.name === "Composer" ? "See plans and choose" : `Order ${card.name}`)}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
