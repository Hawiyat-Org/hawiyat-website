"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ExecutionTrace } from "@/components/execution-trace"
import { cn } from "@/lib/utils"

const STAGES = ["UNDERSTAND", "PLAN", "ROUTE", "EXECUTE", "EVALUATE", "RESULT"]

const TASK = "Reply to order 1024 on WhatsApp in Arabic"

const MODEL_CHIPS = [
  { name: "Hawiyat auto", dot: "bg-signal" },
  { name: "Claude", dot: "bg-ember" },
  { name: "GPT", dot: "bg-ink" },
  { name: "Gemini", dot: "bg-signal-contrast" },
  { name: "Llama", dot: "bg-muted-ink" },
]

const TELEMETRY_LINES = [
  "route: auto",
  "model: gpt-4o → claude-sonnet",
  "ctx: docs/FAQ · 12k",
  "tools: [whatsapp, crm]",
  "cost: ~0.4 DZD",
  "latency: 210ms",
  "quality: 0.98",
]

const CHAR_MS = 45
const STAGE_MS = 700
const HOLD_MS = 2600

export default function AIPlayground({ typedText }: { typedText?: string }) {
  const [typed, setTyped] = useState(typedText ?? "")
  const [active, setActive] = useState(-1)
  const [telemetry, setTelemetry] = useState<string[]>([])
  const [showSignup, setShowSignup] = useState(false)
  const startRef = useRef<number>(Date.now())
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(TASK)
      setActive(STAGES.length - 1)
      setTelemetry(TELEMETRY_LINES)
      setShowSignup(true)
      return
    }

    const loop = () => {
      const elapsed = Date.now() - startRef.current
      const typingDone = TASK.length * CHAR_MS
      const stageStart = typingDone

      if (elapsed < typingDone) {
        setTyped(TASK.slice(0, Math.floor(elapsed / CHAR_MS)))
        setActive(-1)
        setTelemetry([])
        setShowSignup(false)
      } else {
        const idx = Math.floor((elapsed - stageStart) / STAGE_MS)
        if (idx < STAGES.length) {
          setTyped(TASK)
          setActive(idx)
          const progress = (elapsed - stageStart) / (STAGE_MS * STAGES.length)
          const reveal = Math.min(TELEMETRY_LINES.length, Math.floor(progress * TELEMETRY_LINES.length) + 1)
          setTelemetry(TELEMETRY_LINES.slice(0, reveal))
          setShowSignup(false)
        } else {
          setActive(STAGES.length - 1)
          setTelemetry(TELEMETRY_LINES)
          setShowSignup(true)
          if (elapsed - stageStart - STAGE_MS * STAGES.length > HOLD_MS) {
            startRef.current = Date.now()
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      {/* Console header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-ink">
          HAWIYAT EXECUTION CONSOLE
        </p>
        <p className="font-mono text-[11px] text-muted-ink">RUN 01</p>
      </div>

      <div className="flex flex-col gap-4 p-4 md:p-5">
        {/* Model chips */}
        <div className="flex flex-wrap items-center gap-2">
          {MODEL_CHIPS.map((chip) => (
            <span
              key={chip.name}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px]",
                chip.name === "Hawiyat auto"
                  ? "border-signal/60 bg-signal-bg text-ink"
                  : "border-border bg-surface-dim text-muted-ink"
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", chip.dot)} />
              {chip.name}
            </span>
          ))}
        </div>

        {/* Task chip */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-dim px-4 py-3">
          <span className="font-mono text-xs text-signal-contrast">task ▸</span>
          <span className="truncate font-mono text-xs text-ink">
            &ldquo;{typed}
            {active < 0 && !showSignup && <span className="animate-pulse">|</span>}
            &rdquo;
          </span>
        </div>

        {/* Execution trace */}
        <ExecutionTrace active={active} telemetry={telemetry} className="p-3 md:p-4" />

        {/* Signup overlay (shown at run completion) */}
        <div
          className={cn(
            "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-surface/95 p-6 text-center backdrop-blur-sm transition-opacity duration-300",
            showSignup ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal-contrast">
            RUN COMPLETE
          </p>
          <h3 className="text-2xl font-semibold text-ink">Run your business on Hawiyat</h3>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-transform duration-300 hover:scale-[1.03]"
          >
            Start running
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
