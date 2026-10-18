"use client"

/**
 * Blog showcase widgets for the Algeria AI-provider comparison.
 *
 * Every figure is driven by data read from the providers' own pages on
 * 15 October 2026. Nothing here is illustrative: if a number could not be
 * read, the figure says so instead of estimating.
 *
 * Motion is a sequence (CSS `transition` driven by state), not a keyframe
 * loop, so the same code degrades cleanly under prefers-reduced-motion: the
 * finished state is simply the first frame.
 */

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/* ─────────────────────────── shared atoms ─────────────────────────── */

function Figure({
  title,
  note,
  children,
  className,
}: {
  title: string
  note?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <figure
      className={cn(
        "my-7 overflow-hidden rounded-lg border border-border bg-surface",
        className
      )}
    >
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border bg-surface-dim/60 px-4 py-3 md:px-5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink">{title}</span>
        {note && <span className="font-mono text-[10px] text-muted-ink">{note}</span>}
      </figcaption>
      <div className="px-4 py-5 md:px-5">{children}</div>
    </figure>
  )
}

/**
 * Steps a counter from step 0 to `count`, one step per `ms`.
 *
 * `loop` restarts after a pause, for figures whose caption promises a loop.
 * Reduced motion (and the server render) starts at the finished state, so the
 * figure is complete without JavaScript and never flashes empty.
 */
function useSteps(count: number, ms: number, enabled = true, loop = false) {
  const [step, setStep] = useState(enabled ? 0 : count)
  useEffect(() => {
    if (!enabled) {
      setStep(count)
      return
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      if (i > count) {
        if (!loop) return
        i = 0
      }
      setStep(i)
    }, ms)
    return () => window.clearInterval(id)
  }, [count, ms, enabled, loop])
  return step
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return true
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function useMotionEnabled() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => setEnabled(!prefersReducedMotion()), [])
  return enabled
}

/* ─────────────── 1. entry ladder: what it costs to start ─────────────── */

const NO_COMMITMENT = [
  { name: "OpenDunes", value: "50 DA deposit", detail: "prepaid balance, per token in DA" },
  { name: "DEVUP AI", value: "per token", detail: "no plan, no minimum published" },
  { name: "DZRouter", value: "free tier", detail: "waitlisted on 15 Oct 2026" },
  { name: "Direct vendors", value: "USD per token", detail: "foreign card required" },
]

const MONTHLY = [
  { name: "Hawiyat", value: 6000, label: "6,000 DA / month" },
  { name: "AIGrid", value: 20000, label: "20,000 DA / month" },
]

export function EntryLadder() {
  const motion = useMotionEnabled()
  const step = useSteps(MONTHLY.length, 320, motion)
  const max = Math.max(...MONTHLY.map((m) => m.value))

  return (
    <Figure title="Cost to start" note="as published, 15 Oct 2026">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-ink">
        No monthly commitment
      </p>
      <div className="mb-6 divide-y divide-border border-y border-border">
        {NO_COMMITMENT.map((r, i) => (
          <div
            key={r.name}
            className="sw-rise flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="text-sm font-medium text-ink">{r.name}</span>
            <span className="font-mono text-xs text-ink">{r.value}</span>
            <span className="w-full font-mono text-[10px] text-muted-ink sm:w-auto">{r.detail}</span>
          </div>
        ))}
      </div>

      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-ink">
        Monthly plan
      </p>
      <div className="space-y-3">
        {MONTHLY.map((m, i) => {
          const on = i < step
          return (
            <div key={m.name}>
              <div className="mb-1 flex items-baseline justify-between font-mono text-xs">
                <span className={cn("text-ink", m.name === "Hawiyat" && "font-semibold")}>{m.name}</span>
                <span className="text-muted-ink">{m.label}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-sm bg-surface-dim">
                <div
                  className={cn(
                    "sw-bar h-full rounded-sm",
                    m.name === "Hawiyat" ? "bg-hw-cool" : "bg-ink/35"
                  )}
                  style={{
                    width: `${(m.value / max) * 100}%`,
                    animationDelay: `${i * 160}ms`,
                    opacity: on || !motion ? 1 : 0.25,
                    transition: "opacity .4s ease",
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-ink">
        A monthly plan and a prepaid balance are not the same purchase. The plan buys a cap you can
        forecast; the balance buys tokens you have to watch.
      </p>
    </Figure>
  )
}

/* ────────── 2. what a frontier token actually costs, in dinars ────────── */

const TOKENS = [
  { name: "AIGrid", model: "gemma-4-31B (open, 31B)", per1m: 148, kind: "open" },
  { name: "OpenDunes", model: "Claude Sonnet 5.5", per1m: 3120, kind: "frontier" },
  { name: "DEVUP AI", model: "claude-opus-5", per1m: 8750, kind: "frontier" },
] as const

export function FrontierCost() {
  const motion = useMotionEnabled()
  const step = useSteps(TOKENS.length, 400, motion)
  const max = Math.max(...TOKENS.map((t) => t.per1m))

  return (
    <Figure title="Output price per 1M tokens" note="published rate cards, 15 Oct 2026">
      <div className="space-y-4">
        {TOKENS.map((t, i) => {
          const on = i < step
          return (
            <div key={t.name + t.model}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-sm font-medium text-ink">
                  {t.name} <span className="font-normal text-muted-ink">· {t.model}</span>
                </span>
                <span className="font-mono text-xs tabular-nums text-ink">
                  {t.per1m.toLocaleString("en-US")} DA
                </span>
              </div>
              <div className="h-3.5 overflow-hidden rounded-sm bg-surface-dim">
                <div
                  className={cn(
                    "sw-bar h-full rounded-sm",
                    t.kind === "open" ? "bg-hw-cool" : "bg-hw-hot"
                  )}
                  style={{
                    width: `${Math.max(2, (t.per1m / max) * 100)}%`,
                    animationDelay: `${i * 180}ms`,
                    opacity: on || !motion ? 1 : 0.2,
                    transition: "opacity .4s ease",
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3 font-mono text-[10px] text-muted-ink">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-hw-cool" /> open-weight model
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-hw-hot" /> frontier model
        </span>
        <span>Hawiyat sells a monthly cap, so it publishes no per-token rate to compare here.</span>
      </div>
      <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-ink">
        One frontier answer can cost 20 to 60 times an open-model answer for the same tokens. That gap
        is the whole argument for routing per task instead of picking one model for everything.
      </p>
    </Figure>
  )
}

/* ─────────── 3. wrapper versus execution layer, as a live flow ─────────── */

const WRAPPER = ["your prompt", "gateway proxy", "upstream model", "you get text back"]
const ENGINE = ["your task", "Composer picks the model", "context + tools attached", "result evaluated", "you get a checked result"]

export function WrapperVsEngine() {
  const motion = useMotionEnabled()
  const steps = Math.max(WRAPPER.length, ENGINE.length)
  const step = useSteps(steps, 1100, motion, true)

  const lane = (
    title: string,
    nodes: string[],
    tone: "dim" | "cool",
    sub: string
  ) => {
    const pct = (i: number) => (nodes.length === 1 ? 0 : (i / (nodes.length - 1)) * 100)
    const activeLeft = pct(Math.min(step, nodes.length - 1))
    return (
      <div className={cn("rounded-lg border p-4", tone === "cool" ? "border-hw-cool/40" : "border-border")}>
        <p
          className={cn(
            "mb-3 font-mono text-[11px] uppercase tracking-widest",
            tone === "cool" ? "text-hw-cool" : "text-muted-ink"
          )}
        >
          {title}
        </p>
        <div className="relative mb-6 h-1.5 rounded-full bg-surface-dim">
          <div
            className={cn("absolute top-0 h-1.5 rounded-full", tone === "cool" ? "bg-hw-cool/35" : "bg-ink/20")}
            style={{ width: `${activeLeft}%`, transition: "width .8s cubic-bezier(.22,.61,.36,1)" }}
          />
          <div
            className={cn(
              "absolute -top-1 h-3.5 w-3.5 rounded-full border-2 border-surface",
              tone === "cool" ? "bg-hw-cool" : "bg-muted-ink"
            )}
            style={{ left: `calc(${activeLeft}% - 7px)`, transition: "left .8s cubic-bezier(.22,.61,.36,1)" }}
          />
        </div>
        <ol className="flex flex-wrap gap-x-4 gap-y-2">
          {nodes.map((n, i) => {
            const on = i <= step
            return (
              <li
                key={n}
                className={cn(
                  "font-mono text-[11px] transition-colors duration-500",
                  on ? (tone === "cool" ? "text-ink" : "text-ink") : "text-muted-ink/50"
                )}
              >
                <span className="text-muted-ink">{i + 1}·</span> {n}
              </li>
            )
          })}
        </ol>
        <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-ink">{sub}</p>
      </div>
    )
  }

  return (
    <Figure title="Same request, two shapes" note="a loop, replaying">
      <div className="space-y-3">
        {lane(
          "A gateway (wrapper)",
          WRAPPER,
          "dim",
          "Four steps: the model you named answers, and the judgement stays with your team."
        )}
        {lane(
          "Hawiyat (execution layer)",
          ENGINE,
          "cool",
          "Five steps, and the decision is made for you: which model, what context, was the result good enough."
        )}
      </div>
    </Figure>
  )
}

/* ───────── 4. how long each has been running, and how much traffic ───────── */

const REACH = [
  { name: "AIGrid", reg: "20 Feb 2025", months: 20, traffic: "no estimate published", self: "~7 models, telco checkout" },
  { name: "Hawiyat", reg: "11 Jun 2025", months: 16, traffic: "~214 visitors/day (estimate)", self: "API plans + managed subscriptions" },
  { name: "Thirra", reg: "30 Aug 2025", months: 14, traffic: "no estimate published", self: "domain in redemption period" },
  { name: "ClickDz", reg: "5 Feb 2026", months: 8, traffic: "no estimate published", self: "digital-goods storefront" },
  { name: "DZRouter", reg: "5 Mar 2026", months: 7, traffic: "no estimate published", self: "early access" },
  { name: "DEVUP AI", reg: "6 May 2026", months: 5, traffic: "~6 visitors/day (estimate)", self: "published DZD rate card" },
  { name: "OpenDunes", reg: "22 Jun 2026", months: 4, traffic: "no estimate published", self: "most complete public product" },
] as const

export function ReachChart() {
  const motion = useMotionEnabled()
  const step = useSteps(REACH.length, 260, motion)
  const max = Math.max(...REACH.map((r) => r.months))

  return (
    <Figure title="How long each has been running" note="registry data, 15 Oct 2026">
      <div className="space-y-3">
        {REACH.map((r, i) => {
          const on = i < step || !motion
          return (
            <div key={r.name}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className={cn("text-sm font-medium text-ink", r.name === "Hawiyat" && "font-semibold")}>
                  {r.name}
                  <span className="ml-2 font-normal text-muted-ink">{r.self}</span>
                </span>
                <span className="font-mono text-[11px] tabular-nums text-muted-ink">
                  {r.reg} · {r.months} mo
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-sm bg-surface-dim">
                  <div
                    className={cn("sw-bar h-full rounded-sm", r.name === "Hawiyat" ? "bg-hw-cool" : "bg-ink/35")}
                    style={{
                      width: `${(r.months / max) * 100}%`,
                      animationDelay: `${i * 120}ms`,
                      opacity: on ? 1 : 0.2,
                      transition: "opacity .35s ease",
                    }}
                  />
                </div>
                <span className="w-[13.5rem] shrink-0 font-mono text-[10px] text-muted-ink">{r.traffic}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 border-t border-border pt-3 font-mono text-[10px] leading-relaxed text-muted-ink">
        <p>
          Domain age comes from registry RDAP records, which are authoritative. The two traffic figures are
          third-party estimates (Hypestat, 15 Oct 2026), not measurements, and they are only published for the
          two domains large enough to model. The other five have no estimate published, so this page prints none.
        </p>
        <p className="mt-2">
          None of the seven domains, Hawiyat included, appears in Tranco&apos;s top 1 million. Nobody in this
          market is big yet, which makes age and shipping history a better question than size: what matters is
          whether the provider is still there in twelve months.
        </p>
      </div>
    </Figure>
  )
}

/* ─────────────── 5. Hawiyat sells two things ─────────────── */

export function PlanSplit() {
  const motion = useMotionEnabled()
  const step = useSteps(2, 500, motion)

  const col = (
    heading: string,
    sub: string,
    items: { name: string; price: string }[],
    active: boolean
  ) => (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all duration-500",
        active ? "border-hw-cool/50 bg-hw-cool/[0.04]" : "border-border"
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink">{heading}</p>
      <p className="mt-1 mb-3 text-xs leading-relaxed text-muted-ink">{sub}</p>
      <div className="divide-y divide-border border-t border-border">
        {items.map((it) => (
          <div key={it.name} className="flex items-baseline justify-between gap-3 py-2">
            <span className="text-sm text-ink">{it.name}</span>
            <span className="font-mono text-xs tabular-nums text-ink">{it.price}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Figure title="Two ways to buy Hawiyat" note="hawiyat.org pricing and services, 15 Oct 2026">
      <div className="grid gap-3 sm:grid-cols-2">
        {col(
          "API plans",
          "One key to the execution layer. A monthly cap in dinars, no per-token bill in USD.",
          [
            { name: "Pro", price: "6,000 DA / mo" },
            { name: "MAX 5X", price: "15,000 DA / mo" },
            { name: "MAX 20X", price: "30,000 DA / mo" },
          ],
          step >= 0 || !motion
        )}
        {col(
          "Managed subscriptions",
          "You do not run the metal. Hosting, WhatsApp line and workflow tool, supported from Algeria.",
          [
            { name: "n8n hosting", price: "from 8,000 DA / mo" },
            { name: "Hawiyat Cloud", price: "from 7,000 DA / mo" },
            { name: "WhatsApp API (Evolution)", price: "on request" },
          ],
          step >= 1 || !motion
        )}
      </div>
      <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-ink">
        The right column covers what a per-token gateway does not: the server, the WhatsApp connection and the 10am phone call stay covered.
      </p>
    </Figure>
  )
}

/* ─────────────── 6. who actually accepts what ─────────────── */

const RAILS = ["CCP", "Baridi Mob / Edahabia", "CIB", "Bank transfer", "Chargily / Wimpay", "USD"]

const ACCEPTS: Record<string, boolean[]> = {
  Hawiyat: [true, true, true, true, false, true],
  DZRouter: [true, true, true, true, true, false],
  DEVUP: [false, true, true, false, false, false],
  OpenDunes: [false, true, true, false, false, false],
  AIGrid: [false, false, false, false, false, true],
  Direct: [false, false, false, false, false, true],
}

export function RailsMatrix() {
  const motion = useMotionEnabled()
  const step = useSteps(RAILS.length, 220, motion)

  return (
    <Figure title="Payment rails accepted" note="as each provider publishes, 15 Oct 2026">
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <table className="w-full min-w-[520px] border-collapse font-mono text-[11px]">
          <thead>
            <tr>
              <th className="border-b border-border pb-2 text-left font-normal text-muted-ink">
                Provider
              </th>
              {RAILS.map((r, i) => (
                <th
                  key={r}
                  className="border-b border-border pb-2 text-center align-bottom font-normal leading-tight text-muted-ink"
                  style={{ opacity: i < step || !motion ? 1 : 0.25, transition: "opacity .35s ease" }}
                >
                  {r.replace(" / ", " / ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(ACCEPTS).map(([name, row]) => (
              <tr key={name} className="border-b border-border last:border-0">
                <td className="py-2 text-left font-sans text-sm text-ink">{name}</td>
                {row.map((ok, i) => (
                  <td key={i} className="py-2 text-center">
                    <span
                      className={cn(
                        "inline-block h-2.5 w-2.5 rounded-sm",
                        ok ? "bg-hw-cool" : "bg-border"
                      )}
                      aria-label={ok ? "accepted" : "not accepted"}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-ink">
        AIGrid settles through Djezzy Cloud, a telco channel, so paying by CCP is not an option there. Local pricing and local payment are not always the same thing.
      </p>
    </Figure>
  )
}
