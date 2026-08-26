"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export interface PricingCard {
  name: string
  label: string
  logos: string[]
  tagline: string
  offers: Array<{ label: string; price: string; per: string }>
  href: string
}

export function PricingCatalog({ cards }: { cards: PricingCard[] }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCards = useMemo(() => {
    if (!searchQuery) return cards
    const q = searchQuery.toLowerCase()
    return cards.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.label.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.offers.some((o) => o.label.toLowerCase().includes(q) || o.price.toLowerCase().includes(q))
    )
  }, [cards, searchQuery])

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

      {/* Grid */}
      {filteredCards.length === 0 ? (
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card) => (
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
                        {offer.price} <span className="text-xs text-muted-ink">{offer.per}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={card.href}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
              >
                {card.name === "Composer" ? "See plans and choose" : `Order ${card.name}`}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                No card needed. CCP or Baridi Mob.
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
