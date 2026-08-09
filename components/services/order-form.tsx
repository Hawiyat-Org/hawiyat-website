"use client"

import { useState } from "react"
import { X, Loader2, CheckCircle2, Building2, Wallet, DollarSign } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OrderFormProps {
  service: {
    id: string
    name: string
    price: string
    priceLabel: string
    image: string
  }
  onClose: () => void
}

export function OrderForm({ service, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "BARIDI_MOB",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.paymentMethod) {
      setError("Please select a payment method")
      return
    }
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          preferredPayment: formData.paymentMethod,
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order")
      }

      const price = Number(service.price) || 0
      const usdValue = price / 250

      const firePixel = () => {
        if (typeof window !== 'undefined' && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
          (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Purchase', {
            value: usdValue,
            currency: 'USD',
            content_type: 'product',
            content_ids: [service.id],
          })
          console.log('Meta Pixel Purchase fired:', { value: usdValue, currency: 'USD', service: service.name })
        } else {
          console.warn('Meta Pixel fbq not available')
        }
      }

      firePixel()
      setOrderId(data.order.id)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-border/60 bg-surface p-6 shadow-2xl scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface-dim transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-ok mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-ink">Order Submitted!</h3>
            <p className="text-muted-ink text-sm mb-1">
              Thank you, {formData.customerName}. We&apos;ll contact you at {formData.customerEmail} shortly.
            </p>
            <p className="text-xs text-muted-ink mb-1">
              Payment method: {formData.paymentMethod === "CCP" ? "CCP" : formData.paymentMethod === "BARIDI_MOB" ? "Baridi Mob" : "USD"}
            </p>
            {orderId && (
              <p className="text-xs text-muted-ink mb-4">Order ID: {orderId}</p>
            )}
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/213559555951?text=Hello%20Hawiyat!%20My%20order%20${orderId}%20is%20submitted.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-signal text-signal-text font-medium text-sm hover:scale-[1.02] transition-colors"
              >
                Chat on WhatsApp to confirm payment
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg border border-border text-ink font-medium text-sm hover:bg-surface-dim transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 rounded-lg bg-surface-dim/50 border border-border/40">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-14 h-14 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={48}
                    height={48}
                    className="object-contain w-10 h-10"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-ink">{service.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold text-ink">{Number(String(service.price).replace(/,/g, "")).toLocaleString("en-US")}</span>
                    <span className="text-sm text-muted-ink">{service.priceLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-danger/10 text-danger text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-ink mb-1">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-ink mb-1">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-ink mb-1">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
                  placeholder="+213 ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Payment Method <span className="text-danger">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "CCP", label: "CCP", icon: Building2 },
                      { value: "BARIDI_MOB", label: "Baridi Mob", icon: Wallet },
                      { value: "USD", label: "USD", icon: DollarSign },
                    ].map((option) => {
                    const Icon = option.icon
                    const isSelected = formData.paymentMethod === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: option.value }))}
                        className={cn(
                          "flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 text-sm font-medium transition-all",
                          isSelected
                            ? "border-signal bg-signal-bg text-signal-contrast"
                            : "border-border/40 bg-surface-dim/30 text-muted-ink hover:border-border hover:bg-surface-dim/50"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-ink mb-1">
                  Notes <span className="text-muted-ink">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal resize-none"
                  placeholder="Any additional details..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-lg bg-signal text-signal-text font-medium text-sm hover:scale-[1.01] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Order now, activate in 24h"
                )}
              </button>

              <p className="text-xs text-muted-ink">
                No card needed. We&apos;ll confirm payment with you on WhatsApp, then activate your
                workspace within 24 hours.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
