"use client"

import { useState } from "react"
import { X, Loader2, CheckCircle2, CreditCard, Building2, Wallet, DollarSign } from "lucide-react"
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
    paymentMethod: "",
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
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order")
      }

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
        className="relative w-full max-w-md rounded-2xl border border-border/60 bg-background shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
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
              Thank you, {formData.customerName}. We&apos;ll contact you at {formData.customerEmail} shortly.
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              Payment method: {formData.paymentMethod === "ccp" ? "CCP" : formData.paymentMethod === "baridi-mob" ? "Baridi Mob" : "USD"}
            </p>
            {orderId && (
              <p className="text-xs text-muted-foreground mb-4">Order ID: {orderId}</p>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border/40">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-14 h-14 rounded-lg bg-white dark:bg-muted flex items-center justify-center overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={48}
                    height={48}
                    className="object-contain w-10 h-10"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{service.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold">{service.price}</span>
                    <span className="text-sm text-muted-foreground">{service.priceLabel}</span>
                  </div>
                </div>
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
                <label className="block text-sm font-medium mb-2">
                  Payment Method <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "ccp", label: "CCP", icon: Building2 },
                    { value: "baridi-mob", label: "Baridi Mob", icon: Wallet },
                    { value: "usd", label: "USD", icon: DollarSign },
                  ].map((option) => {
                    const Icon = option.icon
                    const isSelected = formData.paymentMethod === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: option.value }))}
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
    </div>
  )
}
