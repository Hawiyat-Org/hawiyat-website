"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Coins,
  Infinity as InfinityIcon,
  Loader2,
  Plus,
  Search,
  Sparkles,
  Wallet,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { waLink } from "@/lib/contact"
import { USAGE_DASHBOARD_URL } from "@/lib/seo"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import posthog from "posthog-js"
import {
  CREDITS_MAX_DA,
  CREDITS_MIN_DA,
  CREDIT_PACKS,
  MODEL_GROUPS,
  CREDITS_SERVICE_ID,
  formatDA,
  normalizeCreditAmount,
  type ModelGroup,
  type ModelNode,
} from "@/lib/data/llm-credits"

/* --------------------------- safe analytics ------------------------------ */
/**
 * Analytics must never block the UI: if PostHog is not initialized (no
 * NEXT_PUBLIC_POSTHOG_KEY, blocked by an ad blocker, or init fails), the
 * uninitialized SDK can throw synchronously - and any capture() called before
 * setState would prevent the dialog from opening. Wrap every capture.
 */
function track(event: string, props?: Record<string, unknown>) {
  try {
    posthog.capture(event, props)
  } catch {
    /* analytics is best-effort; never break the purchase flow */
  }
}

/* ---------------------------------- types --------------------------------- */

type Selection = {
  any: boolean
  groups: Record<string, Set<string>> // groupId -> selected model ids
  customModels: string[]
}

const emptySelection = (): Selection => ({
  any: false,
  groups: {},
  customModels: [],
})

/* ------------------------------- helpers ---------------------------------- */

function groupFromId(id: string): ModelGroup | undefined {
  return MODEL_GROUPS.find((g) => g.id === id)
}

/** Human-readable summary of the model selection for the order notes. */
function selectionSummary(sel: Selection): string {
  if (sel.any) return "Any model (Composer routes to the best available)"
  const parts: string[] = []
  for (const [gid, ids] of Object.entries(sel.groups)) {
    if (ids.size === 0) continue
    const group = groupFromId(gid)
    if (!group) continue
    if (ids.size === group.models.length) {
      parts.push(`All ${group.vendor} models`)
    } else {
      const names = group.models.filter((m) => ids.has(m.id)).map((m) => m.name)
      parts.push(`${group.vendor}: ${names.join(", ")}`)
    }
  }
  if (sel.customModels.length > 0) {
    parts.push(`Add for me: ${sel.customModels.join(", ")}`)
  }
  return parts.length > 0 ? parts.join(" · ") : "Not specified (team will confirm)"
}

function toggleInSet(set: Set<string>, id: string): Set<string> {
  const next = new Set(set)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  return next
}

/* ------------------------------- component -------------------------------- */

export function CreditsCalculator() {
  const [amount, setAmount] = useState<number>(5000)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [selection, setSelection] = useState<Selection>(emptySelection())
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(MODEL_GROUPS.map((g) => g.id)))
  const [customModelInput, setCustomModelInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "BARIDI_MOB",
    acceptTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const normalized = normalizeCreditAmount(amount)

  /* filter groups by search query */
  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MODEL_GROUPS
    return MODEL_GROUPS.map((g) => ({
      ...g,
      models: g.models.filter(
        (m) => m.name.toLowerCase().includes(q) || m.note?.toLowerCase().includes(q)
      ),
    })).filter((g) => g.models.length > 0)
  }, [query])

  const toggleAny = () => {
    track("credits_models_any_selected")
    setSelection((prev) => {
      const next = emptySelection()
      next.any = !prev.any
      return next
    })
  }

  const toggleGroupWildcard = (group: ModelGroup) => {
    track("credits_models_group_wildcard", { vendor: group.vendor })
    setSelection((prev) => {
      const next: Selection = { ...prev, any: false, groups: { ...prev.groups } }
      const current = next.groups[group.id] ?? new Set<string>()
      const nextSet = current.size === group.models.length ? new Set<string>() : new Set(group.models.map((m) => m.id))
      next.groups[group.id] = nextSet
      return next
    })
  }

  const toggleModel = (group: ModelGroup, model: ModelNode) => {
    track("credits_models_toggled", { vendor: group.vendor, model: model.id })
    setSelection((prev) => {
      const next: Selection = { ...prev, any: false, groups: { ...prev.groups } }
      next.groups[group.id] = toggleInSet(prev.groups[group.id] ?? new Set<string>(), model.id)
      return next
    })
  }

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const addCustomModel = () => {
    const name = customModelInput.trim()
    if (!name) return
    track("credits_models_custom_added")
    setSelection((prev) => {
      const next: Selection = { ...prev, any: false }
      if (!next.customModels.includes(name)) {
        next.customModels = [...next.customModels, name]
      }
      return next
    })
    setCustomModelInput("")
  }

  const removeCustomModel = (name: string) => {
    setSelection((prev) => ({
      ...prev,
      customModels: prev.customModels.filter((c) => c !== name),
    }))
  }

  const selectionCount =
    (selection.any ? 1 : 0) +
    Object.values(selection.groups).reduce((acc, ids) => acc + ids.size, 0) +
    selection.customModels.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions")
      return
    }
    if (selectionCount === 0) {
      setError("Select at least one model, or choose \u201CAny model\u201D")
      return
    }
    setIsSubmitting(true)
    setError(null)

    const modelsSummary = selectionSummary(selection)
    const notes = [
      `LLM Credits order - ${formatDA(normalized)} DA`,
      `Models: ${modelsSummary}`,
      formData.paymentMethod === "USD" ? "" : "",
    ]
      .filter(Boolean)
      .join("\n")

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: CREDITS_SERVICE_ID,
          serviceName: `Hawiyat LLM Credits ${formatDA(normalized)} DA`,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          preferredPayment: formData.paymentMethod,
          notes,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order")
      }

      const firePixel = () => {
        if (typeof window !== "undefined") {
          const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
          if (fbq) {
            fbq("track", "Purchase", {
              value: normalized / 250,
              currency: "USD",
              content_type: "product",
              content_ids: [CREDITS_SERVICE_ID],
            })
          }
        }
      }
      firePixel()
      track("credits_order_submitted", {
        amount_da: normalized,
        model_count: selectionCount,
        any_model: selection.any,
      })
      setOrderId(data.order.id)
      setIsSuccess(true)
      setTimeout(() => successHeadingRef.current?.focus(), 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value
    setFormData((prev) => ({ ...prev, [target.name]: value }))
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          track("credits_calculator_opened")
          setIsOpen(true)
        }}
        className="hidden lg:flex w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-signal text-signal-text font-semibold text-base transition-colors duration-200 shadow-lg hover:bg-signal-hover"
      >
        Buy credits
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Mobile: floating bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-paper/95 backdrop-blur-xl px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => {
            track("credits_calculator_opened")
            setIsOpen(true)
          }}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-signal text-signal-text font-semibold text-base shadow-lg"
        >
          Buy credits
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="z-[60] max-h-[90vh] w-full max-w-[calc(100vw-2rem)] sm:max-w-lg gap-0 overflow-hidden rounded-lg border-border/60 bg-surface p-0 shadow-2xl sm:rounded-lg">
          <div className="max-h-[90vh] w-full overflow-y-auto scrollbar-hide p-6">
            <DialogTitle className="sr-only">
              {isSuccess ? "Order Submitted" : "Buy LLM Credits"}
            </DialogTitle>

            {isSuccess ? (
              <div role="status" aria-live="polite" className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-ok mx-auto mb-4" />
                <h3 ref={successHeadingRef} tabIndex={-1} className="text-xl font-semibold mb-2 text-ink">
                  Credits order submitted!
                </h3>
                <p className="text-muted-ink text-sm mb-1">
                  Thank you, {formData.customerName}. We&apos;ll confirm payment at{" "}
                  {formData.customerEmail} and activate your key.
                </p>
                <p className="text-xs text-muted-ink mb-1">
                  Amount: {formatDA(normalized)} DA
                </p>
                {orderId && <p className="text-xs text-muted-ink mb-3">Order ID: {orderId}</p>}
                <a
                  href={waLink("Hello Hawiyat! I just placed an LLM credits order, please confirm payment.")}
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
                <div className="mb-6 p-4 rounded-lg bg-surface-dim/50 border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-14 h-14 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden">
                      <Coins className="w-7 h-7 text-ink" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-ink">Hawiyat LLM Credits</h3>
                      <p className="text-sm text-muted-ink">
                        Prepaid balance on your API key - no subscription, no tier.
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div role="alert" className="mb-4 p-3 rounded-lg bg-danger/10 text-danger text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1 - amount */}
                  <fieldset>
                    <legend className="block text-sm font-medium text-ink mb-3">
                      1. Choose your amount <span className="text-danger">*</span>
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {CREDIT_PACKS.map((pack) => {
                        const isSelected = normalized === pack.amount
                        return (
                          <button
                            key={pack.amount}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => {
                              setAmount(pack.amount)
                              setCustomAmount("")
                            }}
                            className={cn(
                              "relative flex flex-col items-start gap-1 p-3 rounded-lg border-2 text-left transition-all min-h-[64px]",
                              isSelected
                                ? "border-signal bg-signal-bg text-signal-contrast"
                                : "border-border/40 bg-surface-dim/30 text-ink hover:border-border hover:bg-surface-dim/50"
                            )}
                          >
                            {pack.popular && (
                              <span className="absolute -top-2.5 right-2 inline-flex items-center gap-1 rounded-md bg-signal px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-signal-text">
                                <Sparkles className="w-2.5 h-2.5" /> Popular
                              </span>
                            )}
                            <span className="font-semibold text-base">{formatDA(pack.amount)} DA</span>
                            <span className="text-xs text-muted-ink">{pack.note}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="mt-3">
                      <label htmlFor="customAmount" className="block text-xs font-medium text-muted-ink mb-1">
                        Or type your own amount (min {formatDA(CREDITS_MIN_DA)} DA)
                      </label>
                      <div className="relative">
                        <input
                          id="customAmount"
                          type="number"
                          min={CREDITS_MIN_DA}
                          max={CREDITS_MAX_DA}
                          inputMode="numeric"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            const raw = Number(e.target.value)
                            if (Number.isFinite(raw) && raw > 0) setAmount(raw)
                          }}
                          placeholder={`e.g. ${formatDA(3500)}`}
                          className="w-full h-11 px-3 pr-14 rounded-lg border border-border bg-surface text-ink text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-ink">
                          DA
                        </span>
                      </div>
                    </div>
                  </fieldset>

                  {/* Step 2 - models (tree) */}
                  <fieldset>
                    <legend className="block text-sm font-medium text-ink mb-1">
                      2. Which models? <span className="text-danger">*</span>
                    </legend>
                    <p className="text-xs text-muted-ink mb-3">
                      Pick what you need. Anything not listed, we add for you.
                    </p>

                    {/* Any model wildcard */}
                    <button
                      type="button"
                      onClick={toggleAny}
                      aria-pressed={selection.any}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all mb-3",
                        selection.any
                          ? "border-signal bg-signal-bg text-signal-contrast"
                          : "border-border/40 bg-surface-dim/30 hover:border-border"
                      )}
                    >
                      <InfinityIcon className="w-5 h-5 shrink-0" />
                      <span className="flex-1">
                        <span className="block font-semibold text-sm">Any model</span>
                        <span className="block text-xs text-muted-ink">
                          Composer routes each task to the best available model
                        </span>
                      </span>
                      {selection.any && <Check className="w-5 h-5" />}
                    </button>

                    {/* Search */}
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-ink pointer-events-none" />
                      <input
                        type="search"
                        aria-label="Search models"
                        placeholder="Search models..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-surface text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
                      />
                    </div>

                    {/* Vendor tree */}
                    <div className="space-y-2">
                      {visibleGroups.map((group) => {
                        const selectedIds = selection.groups[group.id] ?? new Set<string>()
                        const allSelected = selectedIds.size === group.models.length
                        const isOpen = expanded.has(group.id)
                        return (
                          <div key={group.id} className="rounded-lg border border-border/40 bg-surface-dim/20 overflow-hidden">
                            <div className="flex items-center gap-2 px-3 py-2.5">
                              <button
                                type="button"
                                aria-label={`Toggle ${group.vendor} section`}
                                aria-expanded={isOpen}
                                onClick={() => toggleExpanded(group.id)}
                                className="p-0.5 rounded hover:bg-surface-dim"
                              >
                                <ChevronDown
                                  className={cn("w-4 h-4 text-muted-ink transition-transform", isOpen ? "" : "-rotate-90")}
                                />
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleGroupWildcard(group)}
                                aria-pressed={allSelected}
                                className={cn(
                                  "flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium transition-colors",
                                  allSelected ? "bg-signal-bg text-signal-contrast" : "text-ink hover:bg-surface-dim"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "flex h-4 w-4 items-center justify-center rounded border-2 transition-colors",
                                    allSelected ? "bg-signal border-signal" : "border-border bg-surface"
                                  )}
                                >
                                  {allSelected && <Check strokeWidth={3} className="w-2.5 h-2.5 text-signal-text" />}
                                </span>
                                {group.vendor}
                                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-ink">
                                  {allSelected ? "All" : `${selectedIds.size}/${group.models.length}`}
                                </span>
                              </button>
                            </div>
                            {isOpen && (
                              <ul className="px-3 pb-2 space-y-1 border-t border-border/20 pt-2">
                                {group.models.map((model) => {
                                  const checked = selectedIds.has(model.id)
                                  return (
                                    <li key={model.id}>
                                      <button
                                        type="button"
                                        onClick={() => toggleModel(group, model)}
                                        aria-pressed={checked}
                                        className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-left hover:bg-surface-dim transition-colors"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className={cn(
                                            "flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                            checked ? "bg-signal border-signal" : "border-border bg-surface"
                                          )}
                                        >
                                          {checked && <Check strokeWidth={3} className="w-2.5 h-2.5 text-signal-text" />}
                                        </span>
                                        <span className="text-sm text-ink">{model.name}</span>
                                        {model.note && (
                                          <span className="ml-auto text-xs text-muted-ink">{model.note}</span>
                                        )}
                                      </button>
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                          </div>
                        )
                      })}
                      {visibleGroups.length === 0 && (
                        <p className="text-sm text-muted-ink py-3 text-center">
                          No models match “{query}” - add it below and we&apos;ll enable it.
                        </p>
                      )}
                    </div>

                    {/* Add another model */}
                    <div className="mt-3 p-3 rounded-lg border border-dashed border-border/60">
                      <label htmlFor="customModelInput" className="block text-xs font-medium text-muted-ink mb-1.5">
                        Need a model not listed here?
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="customModelInput"
                          type="text"
                          value={customModelInput}
                          onChange={(e) => setCustomModelInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addCustomModel()
                            }
                          }}
                          placeholder="e.g. a specific model name"
                          className="w-full h-10 px-3 rounded-lg border border-border bg-surface text-sm focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
                        />
                        <button
                          type="button"
                          onClick={addCustomModel}
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 h-10 rounded-lg border border-border text-sm font-medium text-ink hover:bg-surface-dim transition-colors"
                        >
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      </div>
                      {selection.customModels.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {selection.customModels.map((name) => (
                            <li key={name}>
                              <button
                                type="button"
                                onClick={() => removeCustomModel(name)}
                                className="inline-flex items-center gap-1 rounded-md bg-surface-dim border border-border px-2 py-1 text-xs text-ink hover:border-danger/50"
                              >
                                {name}
                                <X className="w-3 h-3 text-muted-ink" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {selectionCount > 0 && (
                      <p className="mt-2 text-xs text-muted-ink">
                        Selected: {selectionSummary(selection)}
                      </p>
                    )}
                  </fieldset>

                  {/* Step 3 - contact */}
                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-ink">3. Your details</legend>
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
                      <span className="block text-sm font-medium text-ink mb-1">
                        Payment method <span className="text-danger">*</span>
                      </span>
                      <div role="radiogroup" aria-label="Payment method" className="grid grid-cols-3 gap-2">
                        {[
                          { value: "CCP", label: "CCP", icon: Wallet },
                          { value: "BARIDI_MOB", label: "Baridi Mob", icon: Wallet },
                          { value: "USD", label: "USD", icon: Wallet },
                        ].map((opt) => {
                          const isSelected = formData.paymentMethod === opt.value
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: opt.value }))}
                              className={cn(
                                "flex flex-col items-center gap-1 p-2.5 rounded-lg border-2 text-sm font-medium transition-all min-h-[44px]",
                                isSelected
                                  ? "border-signal bg-signal-bg text-signal-contrast"
                                  : "border-border/40 bg-surface-dim/30 text-muted-ink hover:border-border"
                              )}
                            >
                              <span>{opt.label}</span>
                            </button>
                          )
                        })}
                      </div>
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
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex-shrink-0 w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-signal",
                            formData.acceptTerms ? "bg-signal border-signal" : "border-border bg-surface"
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
                  </fieldset>

                  {/* Summary */}
                  <div className="p-4 rounded-lg bg-surface-dim/50 border border-border/40">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-ink">Credits amount</span>
                      <span className="font-mono font-semibold text-ink">{formatDA(normalized)} DA</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-sm">
                      <span className="text-muted-ink">Models</span>
                      <span className="max-w-[60%] truncate text-right text-xs text-muted-ink" title={selectionSummary(selection)}>
                        {selectionCount === 0 ? "Select below" : `${selectionCount} selected`}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-ink">Balance</span>
                      <span className="text-muted-ink">No expiry · top up anytime</span>
                    </div>
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
                      `Order ${formatDA(normalized)} DA credits`
                    )}
                  </button>

                  <p className="text-xs text-muted-ink">
                    No card needed. We&apos;ll confirm payment with you on WhatsApp, then activate your
                    key - including any model you asked us to add.
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
