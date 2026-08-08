"use client"

import { Check } from "lucide-react"
import { ServiceOrderForm } from "./service-order-form"

interface ServicePlan {
  name: string
  price: string
  priceLabel: string
  tagline?: string
  originalPrice?: string
  launchNote?: string
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
}

export function ServicePlans({ plans, fairUse, disclaimer, serviceId, serviceName, serviceImage, serviceImages }: ServicePlansProps) {
  return (
    <div className="space-y-8">
      {plans.map((plan, idx) => {
        const serviceData = {
          id: serviceId,
          name: serviceName,
          price: plan.price,
          priceLabel: plan.priceLabel,
          image: serviceImage ?? undefined,
          images: serviceImages ?? undefined,
        }

        return (
          <div
            key={plan.name}
            className={`rounded-2xl border bg-card shadow-sm overflow-hidden ${
              idx === 1 ? "border-primary/40 ring-1 ring-primary/10" : "border-border/60"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-muted/50 to-muted/20 border-b border-border/60 p-5">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                {idx === 1 && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    Most Popular
                  </span>
                )}
              </div>
              {plan.tagline && (
                <p className="text-sm text-muted-foreground mb-3">{plan.tagline}</p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                )}
                <span className="text-sm text-muted-foreground">{plan.priceLabel}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-5">
              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/90 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Launch Note */}
              {plan.launchNote && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-foreground/80 leading-relaxed">{plan.launchNote}</p>
                </div>
              )}

              {/* CTA */}
              <ServiceOrderForm service={serviceData} />
            </div>
          </div>
        )
      })}

      {/* Fine Print */}
      {(fairUse || disclaimer) && (
        <div className="space-y-2 pt-2">
          {fairUse && (
            <p className="text-xs text-muted-foreground leading-relaxed text-center">
              <span className="font-medium text-foreground/70">Fair Use:</span> {fairUse}
            </p>
          )}
          {disclaimer && (
            <p className="text-xs text-muted-foreground leading-relaxed text-center">
              {disclaimer}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
