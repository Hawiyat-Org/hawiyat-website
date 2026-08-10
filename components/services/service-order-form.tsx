"use client"

import { useRef, useState, useEffect } from "react"
import { Loader2, CheckCircle2, Building2, Wallet, DollarSign, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { USAGE_DASHBOARD_URL } from "@/lib/seo"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface ServiceOrderFormProps {
  service: {
    id: string
    name: string
    tag?: string
    price: string
    priceLabel: string
    image?: string
    images?: string[]
  }
  paymentMethod?: string
}

// Tag badge, single token style (execution-layer accent), matching the catalog
// and slug pages. No per-tier rainbow/purple "AI wrapper" gradients.
const tagStyle = "bg-signal text-signal-text"

export function ServiceOrderForm({ service, paymentMethod = "BARIDI_MOB" }: ServiceOrderFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(paymentMethod)
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "BARIDI_MOB",
    notes: "",
    acceptTerms: false,
  })

  useEffect(() => {
    setFormData(prev => ({ ...prev, paymentMethod: selectedPayment }))
  }, [selectedPayment])

  const paymentOptions = [
    { value: "CCP", label: "CCP", icon: Building2 },
    { value: "BARIDI_MOB", label: "Baridi Mob", icon: Wallet },
    { value: "USD", label: "USD", icon: DollarSign },
  ]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPayment) {
      setError("Please select a payment method")
      return
    }
    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions")
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
          // Keep the tier in the order record/emails (e.g. "Hawiyat AI Composer Pro  Pro")
          serviceName: service.tag ? `${service.name}  ${service.tag}` : service.name,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          preferredPayment: selectedPayment,
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order")
      }

      const price = Number(String(service.price).replace(/,/g, "")) || 0
      const usdValue = price / 250

      const firePixel = () => {
        if (typeof window !== 'undefined') {
          const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
          if (fbq) {
            fbq('track', 'Purchase', {
              value: usdValue,
              currency: 'USD',
              content_type: 'product',
              content_ids: [service.id],
            })
          }
        }
      }

      firePixel()
      setOrderId(data.order.id)
      setIsSuccess(true)
      setTimeout(() => successHeadingRef.current?.focus(), 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    setFormData((prev) => ({ ...prev, [target.name]: value }))
  }

  const serviceImage = service.images ? service.images[0] : (service.image || "/logo.svg")

  return (
    <div className="space-y-4">
      {/* Desktop: Payment Method Selector */}
      <div className="hidden lg:block space-y-2">
        <label id="payment-method-label" className="block text-sm font-medium text-ink">
          Payment Method <span className="text-danger">*</span>
        </label>
        <div role="radiogroup" aria-labelledby="payment-method-label" className="grid grid-cols-3 gap-2">
          {paymentOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedPayment === option.value
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedPayment(option.value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 text-sm font-medium transition-all min-h-[44px]",
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

      {/* Desktop: Order Now button */}
            <button
              onClick={() => setIsOpen(true)}
              className="hidden lg:flex w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-signal text-signal-text font-semibold text-base transition-colors duration-200 shadow-lg hover:bg-signal-hover"
            >
              Order Now
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Mobile: Floating Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-paper/95 backdrop-blur-xl px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              <div role="radiogroup" aria-label="Payment Method" className="grid grid-cols-3 gap-2 mb-2.5">
                {paymentOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = selectedPayment === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedPayment(option.value)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-all min-h-[44px]",
                        isSelected
                          ? "border-signal bg-signal-bg text-signal-contrast"
                          : "border-border/40 bg-surface-dim/30 text-muted-ink"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-signal text-signal-text font-semibold text-base shadow-lg"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="z-[60] max-h-[90vh] w-full max-w-[calc(100vw-2rem)] sm:max-w-md gap-0 overflow-hidden rounded-lg border-border/60 bg-surface p-0 shadow-2xl sm:rounded-lg">
          <div className="max-h-[90vh] w-full overflow-y-auto scrollbar-hide p-6">
            <DialogTitle className="sr-only">{isSuccess ? "Order Submitted" : service.name}</DialogTitle>

            {isSuccess ? (
              <div role="status" aria-live="polite" className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-ok mx-auto mb-4" />
                <h3 ref={successHeadingRef} tabIndex={-1} className="text-xl font-semibold mb-2 text-ink">Order Submitted!</h3>
                <p className="text-muted-ink text-sm mb-1">
                  Thank you, {formData.customerName}. We&apos;ll contact you at {formData.customerEmail} shortly.
                </p>
                <p className="text-xs text-muted-ink mb-1">
                  Payment method: {formData.paymentMethod === "CCP" ? "CCP" : formData.paymentMethod === "BARIDI_MOB" ? "Baridi Mob" : "USD"}
                </p>
                {orderId && (
                  <p className="text-xs text-muted-ink mb-3">Order ID: {orderId}</p>
                )}
                <a
                  href="https://wa.me/213559555951?text=Hello%20Hawiyat!%20I%20just%20placed%20an%20order%2C%20please%20confirm%20payment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-border rounded-lg px-6 py-2 min-h-[44px] text-sm font-medium text-ink hover:bg-surface-dim transition-colors mb-4"
                >
                  Chat on WhatsApp to confirm payment
                </a>
                <a
                  href={USAGE_DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2 rounded-lg border border-border text-ink font-medium text-sm hover:bg-surface-dim transition-colors mb-4"
                >
                  Open your usage dashboard
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] px-6 py-2 rounded-lg bg-signal text-signal-text font-medium text-sm transition-colors hover:bg-signal-hover"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 pr-12 rounded-lg bg-surface-dim/50 border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-14 h-14 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden">
                      <Image
                        src={serviceImage}
                        alt={service.name}
                        width={48}
                        height={48}
                        className="object-contain w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-ink truncate">{service.name}</h3>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-bold text-ink">{service.price}</span>
                        <span className="text-sm text-muted-ink">{service.priceLabel}</span>
                      </div>
                    </div>
                    {service.tag && (
                      <span className={cn(
                        "shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold",
                        tagStyle
                      )}>
                        {service.tag}
                      </span>
                    )}
                  </div>
                </div>

                {error && (
                  <div role="alert" className="mb-4 p-3 rounded-lg bg-danger/10 text-danger text-sm">
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
                      className="w-full h-11 px-3 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
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
                      className="w-full h-11 px-3 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
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
                      className="w-full h-11 px-3 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
                      placeholder="+213 ..."
                    />
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

                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/30 border border-border/20">
                    <label htmlFor="acceptTerms" className="cursor-pointer select-none shrink-0">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="sr-only peer"
                        required
                      />
                      {/* Custom checkbox */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex-shrink-0 w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-signal peer-focus-visible:ring-offset-2",
                          formData.acceptTerms
                            ? "bg-signal border-signal"
                            : "border-border bg-surface"
                        )}
                      >
                        <Check
                          strokeWidth={3}
                          className={cn(
                            "w-3 h-3 text-signal-text transition-opacity",
                            formData.acceptTerms ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </span>
                    </label>
                    <span className="text-xs text-muted-ink leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="font-medium text-signal-contrast underline hover:no-underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="font-medium text-signal-contrast underline hover:no-underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-lg bg-signal text-signal-text font-medium text-sm transition-colors hover:bg-signal-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    No card needed. We&apos;ll confirm payment with you on WhatsApp, then activate
                    your workspace within 24 hours.
                  </p>
                </form>
              </>
            )}
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}
