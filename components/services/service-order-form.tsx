"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, Loader2, CheckCircle2, Building2, Wallet, DollarSign, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"

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

// Tag badge gradient, matching the catalog cards and slug pages
const tagStyles: Record<string, string> = {
  "Popular": "bg-gradient-to-r from-violet-500 to-purple-600",
  "Pro": "bg-gradient-to-r from-purple-500 to-violet-600",
  "Starter": "bg-gradient-to-r from-emerald-500 to-green-600",
  "Max 5X": "bg-gradient-to-r from-orange-500 to-red-600",
  "Max 20X": "bg-gradient-to-r from-yellow-500 to-amber-600",
  "VIP": "bg-gradient-to-r from-amber-500 to-yellow-600",
  "Freelance": "bg-gradient-to-r from-teal-500 to-emerald-600",
  "WhatsApp": "bg-gradient-to-r from-green-500 to-emerald-600",
  "Startup": "bg-gradient-to-r from-blue-500 to-indigo-600",
  "Enterprise": "bg-gradient-to-r from-yellow-500 to-amber-600",
}

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
          // Keep the tier in the order record/emails (e.g. "Hawiyat Composer + Claude Code  Pro")
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

      const price = Number(service.price) || 0
      const usdValue = price / 250

      const firePixel = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            value: usdValue,
            currency: 'USD',
            content_type: 'product',
            content_ids: [service.id],
          })
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
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    setFormData((prev) => ({ ...prev, [target.name]: value }))
  }

  const serviceImage = service.images ? service.images[0] : (service.image || "/logo.svg")

  return (
    <div className="space-y-4">
      {/* Desktop: Payment Method Selector */}
      <div className="hidden lg:block space-y-2">
        <label className="block text-sm font-medium">
          Payment Method <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {paymentOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedPayment === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedPayment(option.value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-sm font-medium transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/50"
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
        className="hidden lg:flex w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
      >
        Order Now
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Mobile: Floating Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2 mb-2.5">
          {paymentOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedPayment === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedPayment(option.value)}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 bg-muted/30 text-muted-foreground"
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
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-lg"
        >
          Order Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 bg-background shadow-2xl p-6 scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Order Submitted!</h3>
                <p className="text-muted-foreground text-sm mb-1">
                  Thank you, {formData.customerName}. We'll contact you at {formData.customerEmail} shortly.
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  Payment method: {formData.paymentMethod === "CCP" ? "CCP" : formData.paymentMethod === "BARIDI_MOB" ? "Baridi Mob" : "USD"}
                </p>
                {orderId && (
                  <p className="text-xs text-muted-foreground mb-4">Order ID: {orderId}</p>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-14 h-14 rounded-lg bg-white dark:bg-muted flex items-center justify-center overflow-hidden">
                      <Image
                        src={serviceImage}
                        alt={service.name}
                        width={48}
                        height={48}
                        className="object-contain w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate">{service.name}</h3>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-bold">{service.price}</span>
                        <span className="text-sm text-muted-foreground">{service.priceLabel}</span>
                      </div>
                    </div>
                    {service.tag && (
                      <span className={cn(
                        "shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white",
                        tagStyles[service.tag] ?? "bg-primary"
                      )}>
                        {service.tag}
                      </span>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium mb-1">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium mb-1">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+213 ..."
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">
                      Notes <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      placeholder="Any additional details..."
                    />
                  </div>

                  <label
                    htmlFor="acceptTerms"
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30 border border-border/20 cursor-pointer select-none"
                  >
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
                        "flex-shrink-0 w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors",
                        formData.acceptTerms
                          ? "bg-primary border-primary"
                          : "border-border bg-background"
                      )}
                    >
                      <Check
                        strokeWidth={3}
                        className={cn(
                          "w-3 h-3 text-primary-foreground transition-opacity",
                          formData.acceptTerms ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="font-medium text-primary underline hover:no-underline" target="_blank">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="font-medium text-primary underline hover:no-underline" target="_blank">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Order"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
