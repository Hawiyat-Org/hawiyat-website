"use client"

import { useState } from "react"
import { Check, Mail, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ServiceOrderForm } from "./service-order-form"

export interface ServicePlan {
  name: string
  price: string
  priceLabel: string
  tagline?: string
  originalPrice?: string
  launchNote?: string
  custom?: boolean
  features: string[]
}

interface ServicePlansProps {
  plans: ServicePlan[]
  fairUse?: string
  disclaimer?: string
  serviceId: string
  serviceName: string
  serviceImage?: string | null
  serviceImages?: string[] | null
  defaultPlan?: string
  contactOnly?: boolean
}

export function ServicePlans({
  plans,
  fairUse,
  disclaimer,
  serviceId,
  serviceName,
  serviceImage,
  serviceImages,
  defaultPlan,
  contactOnly = false,
}: ServicePlansProps) {
  const [activeIdx, setActiveIdx] = useState(() => {
    const match = plans.findIndex((p) => p.name === defaultPlan)
    return match >= 0 ? match : 0
  })

  const plan = plans[activeIdx]

  const contactWhatsappUrl = `https://wa.me/213559555951?text=${encodeURIComponent(
    `Hello Hawiyat! I would like a custom plan for ${serviceName}.`
  )}`

  const contactOrderUrl = `https://wa.me/213559555951?text=${encodeURIComponent(
    `Hello Hawiyat! I would like to order Cloud ${plan.name}.`
  )}`

  const serviceData = {
    id: serviceId,
    // Clean display name; the form appends " {tag}" to the order record
    // so orders/emails show e.g. "n8n Hosting  Enterprise"
    name: serviceName,
    tag: plan.name,
    price: plan.price,
    priceLabel: plan.priceLabel,
    image: serviceImage ?? undefined,
    images: serviceImages ?? undefined,
  }

  return (
    <div className="space-y-4">
      {/* Tier selector */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a plan">
        {plans.map((p, idx) => {
          const active = idx === activeIdx
          return (
            <button
              key={p.name}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "flex-1 min-w-[8rem] flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-md text-center transition-colors",
                active
                  ? "bg-signal text-signal-text"
                  : "border border-border text-muted-ink hover:text-ink"
              )}
            >
              <span className="text-sm font-semibold">{p.name}</span>
              <span className={cn("text-xs", active ? "text-signal-text/90" : "text-muted-ink")}>
                {p.custom ? "Custom" : `${p.price} ${p.priceLabel}`}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active plan card */}
      <div
        key={plan.name}
        className="rounded-md border border-border/60 bg-surface shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-surface-dim/50 to-surface-dim/20 border-b border-border/60 p-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
          </div>
          {plan.tagline && (
            <p className="text-sm text-muted-ink mb-3">{plan.tagline}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            {plan.custom ? (
              <span className="text-3xl font-bold text-ink">Custom</span>
            ) : (
              <>
                <span className="text-3xl font-bold text-ink">{plan.price}</span>
                {plan.originalPrice && (
                  <span className="text-lg text-muted-ink line-through">{plan.originalPrice}</span>
                )}
                <span className="text-sm text-muted-ink">{plan.priceLabel}</span>
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Features */}
          <div className="space-y-3">
            {plan.features.map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-signal mt-0.5 flex-shrink-0" />
                <span className="text-sm text-ink/90 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          {/* Launch Note */}
          {plan.launchNote && (
            <div className="p-3 rounded-md bg-signal-bg border border-signal/20">
              <p className="text-xs text-ink/80 leading-relaxed">{plan.launchNote}</p>
            </div>
          )}

          {/* CTA */}
          {contactOnly ? (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-ink">Order by contacting the team</h4>
              <p className="text-sm text-muted-ink leading-relaxed">
                Tell us which plan you need and we will set it up and confirm payment on WhatsApp.
              </p>
              <a
                href={contactOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
              >
                Order on WhatsApp
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@hawiyat.org"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
              >
                Email us
                <Mail className="h-4 w-4" />
              </a>
            </div>
          ) : plan.custom ? (
            <div className="space-y-3">
              <a
                href={contactWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
              >
                Contact us on WhatsApp
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
          ) : (
            <ServiceOrderForm service={serviceData} />
          )}
        </div>
      </div>

      {/* Fine Print */}
      {(fairUse || disclaimer) && (
        <div className="space-y-2 pt-2">
          {fairUse && (
            <p className="text-xs text-muted-ink leading-relaxed text-center">
              <span className="font-medium text-ink/70">Fair Use:</span> {fairUse}
            </p>
          )}
          {disclaimer && (
            <p className="text-xs text-muted-ink leading-relaxed text-center">
              {disclaimer}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
