"use client"
import { useState } from "react"
import { Check, MessageCircle, Mail, ArrowRight } from "lucide-react"
import { OrderForm } from "@/components/services/order-form"
import { services } from "@/lib/data/services"

interface OrderService {
  id: string
  name: string
  price: string
  priceLabel: string
  image: string
}

function getComposerService(id: string) {
  const service = services.find((s) => s.id === id)
  if (!service) {
    throw new Error(`Unknown service id: ${id}`)
  }
  return service
}

const proService = getComposerService("composer-pro")
const max5xService = getComposerService("composer-max5x")
const max20xService = getComposerService("composer-max20x")

const maxTiers: Array<{
  key: "composer-max5x" | "composer-max20x"
  label: string
  service: typeof max5xService
  capacity: string
  blurb: string
}> = [
  {
    key: "composer-max5x",
    label: "MAX 5X",
    service: max5xService,
    capacity: "5× more tasks at the same time.",
    blurb: "For startups and teams shipping every day.",
  },
  {
    key: "composer-max20x",
    label: "MAX 20X",
    service: max20xService,
    capacity: "20× more tasks at the same time, with GDPR-ready compliance.",
    blurb: "For agencies and teams running AI at scale.",
  },
]

const toOrderService = (s: typeof proService): OrderService => ({
  id: s.id,
  name: s.name,
  price: s.price,
  priceLabel: s.priceLabel,
  image: s.image ?? "/logo.svg",
})

export default function Pricing() {
  const [selectedService, setSelectedService] = useState<OrderService | null>(null)
  const [activeMax, setActiveMax] = useState<(typeof maxTiers)[number]["key"]>("composer-max5x")

  const activeTier = maxTiers.find((t) => t.key === activeMax)!

  const enterpriseWhatsappUrl =
    "https://wa.me/213559555951?text=Hello%2C%20we%20need%20the%20full%20stack%20%E2%80%94%20Composer%20%2B%20n8n%20%2B%20Evolution%20%2B%20Platform"

  const enterpriseFeatures = [
    "Full stack: Composer + n8n + Evolution + Platform",
    "Dedicated account manager",
    "Priority WhatsApp support",
    "Usage analytics and reporting in DZD",
    "Book with the team",
  ]

  return (
    <section id="pricing" className="pt-8 pb-10 md:pt-12 md:pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Pricing
          </p>
          <h2 className="text-4xl font-semibold text-ink lg:text-5xl">
            Plans for the execution layer
          </h2>
          <p className="text-base text-muted-ink">
            One layer, every model, and everything billed in dinars.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3">
          {/* PRO */}
          <div className="rounded-lg flex flex-col justify-between border border-border bg-surface p-6 max-md:rounded-b-none max-md:border-b-0 md:rounded-r-none md:border-r-0 lg:p-8">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">{proService.name}</h3>
                  <span className="rounded-md border border-border bg-surface-dim px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-ink">
                    Pro
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-ink">
                  For solo builders. Give it a task, get a checked result.
                </p>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-bold text-ink">
                  {Number(proService.price).toLocaleString("en-US")}
                </span>
                <span className="font-mono text-sm text-muted-ink">{proService.priceLabel}</span>
              </div>

              <ul className="space-y-3">
                {proService.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedService(toOrderService(proService))}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* MAX switchable */}
          <div className="relative flex flex-col justify-between rounded-lg border border-border bg-surface-dim p-6 shadow-lg shadow-ink/5 lg:p-8 max-md:rounded-none max-md:border-t-0 max-md:border-b-0">
            <div>
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink">Hawiyat AI Composer MAX</h3>
                <div className="flex items-center gap-1 rounded-md border border-border bg-surface-dim p-1">
                  {maxTiers.map((tier) => (
                    <button
                      key={tier.key}
                      onClick={() => setActiveMax(tier.key)}
                      className={`rounded-md px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                        activeMax === tier.key
                          ? "bg-signal text-signal-text"
                          : "text-muted-ink hover:text-ink"
                      }`}
                      aria-pressed={activeMax === tier.key}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-ink">{activeTier.capacity}</p>
              <p className="mt-1 text-sm text-muted-ink">{activeTier.blurb}</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-bold text-ink">
                  {Number(activeTier.service.price).toLocaleString("en-US")}
                </span>
                <span className="font-mono text-sm text-muted-ink">
                  {activeTier.service.priceLabel}
                </span>
              </div>

              <ul className="mt-5 space-y-3">
                {activeTier.service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedService(toOrderService(activeTier.service))}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="rounded-lg flex flex-col justify-between border-2 border-ink bg-surface p-6 max-md:rounded-t-none max-md:border-t-0 md:rounded-l-none md:border-l-0 lg:p-8">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Enterprise</h3>
                  <span className="rounded-md bg-signal px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-signal-text">
                    Custom pricing
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-ink">
                  The whole stack under one contract: Composer + n8n + Evolution API + Platform.
                </p>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-bold text-ink">Custom</span>
                <span className="font-mono text-sm text-muted-ink">pricing</span>
              </div>

              <ul className="space-y-3">
                {enterpriseFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={enterpriseWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
              >
                Book with the team
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@hawiyat.org"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
              >
                Email us instead
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {selectedService && (
        <OrderForm service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  )
}
