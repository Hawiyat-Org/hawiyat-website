"use client"

import { useEffect, useRef, useState } from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { DEFAULT_STAGES, ExecutionTrace } from "@/components/execution-trace"

const STAGE_MS = 900
const FINISHED = DEFAULT_STAGES.length - 1

type RunTask = {
  id: string
  label: string
  chip: string
  run: string
  detail: string[]
  telemetry: string[]
  outcome: string
}

const TASKS: RunTask[] = [
  {
    id: "refund",
    label: "Refund",
    chip: '"Resolve refund request, order 3051, WhatsApp, Algerian Arabic"',
    run: "RUN 02",
    detail: [
      "UNDERSTAND ▸ intent: refund request · sentiment: urgent · language: ar-DZ · order 3051 pulled from ERP",
      "PLAN ▸ route: claude-sonnet (dialect) · fallback: gpt-4o · ctx: refund policy · 4k",
      "ROUTE ▸ primary claude-sonnet · fallback armed · tools: [whatsapp, crm, erp]",
      "EXECUTE ▸ reply drafted in Algerian Arabic · tone: apologetic, policy-safe · sent via WhatsApp",
      "EVALUATE ▸ quality 0.97 · policy 1.0 · latency 340ms · cost so far 0.6 DZD",
      "RESULT ▸ delivered in 11s · customer kept · cost 0.6 DZD",
    ],
    telemetry: [
      "route: auto",
      "model: claude-sonnet → gpt-4o (fallback armed)",
      "ctx: order 3051 + refund policy · 4k",
      "tools: [whatsapp, crm, erp]",
      "cost: 0.6 DZD",
      "latency: 340ms",
      "quality: 0.97",
      "policy: 1.0",
    ],
    outcome:
      "Reply delivered in 11 seconds. Customer kept, no chargeback, ticket closed. Total cost: 0.6 DZD.",
  },
  {
    id: "quote",
    label: "Friday quote",
    chip: '"Quote 150 SIM activations for reseller, WhatsApp"',
    run: "RUN 07",
    detail: [
      "UNDERSTAND ▸ intent: bulk quote · reseller tier check · language: fr · deal table pulled from ERP",
      "PLAN ▸ route: gpt-4o (math) · fallback: gemini-2.5 · ctx: ERP deal table · 6k",
      "ROUTE ▸ primary gpt-4o · fallback armed · tools: [whatsapp, erp, db]",
      "EXECUTE ▸ computed the 100+ unit tier · 3-line French quote drafted · PDF attached · sent 21:47",
      "EVALUATE ▸ quality 1.0 (math verified) · latency 480ms · cost so far 1.1 DZD",
      "RESULT ▸ quote out Friday night · sale moved to now · cost 1.1 DZD",
    ],
    telemetry: [
      "route: auto",
      "model: gpt-4o → gemini-2.5 (fallback armed)",
      "ctx: ERP deal table · 6k",
      "tools: [whatsapp, erp, db]",
      "cost: 1.1 DZD",
      "latency: 480ms",
      "quality: 1.0 (math verified)",
    ],
    outcome:
      "Quote out Friday night. That sale used to wait until Monday morning. Cost: 1.1 DZD.",
  },
  {
    id: "followup",
    label: "40-lead follow-up",
    chip: '"Follow up 40 cold leads, per-lead language, WhatsApp"',
    run: "RUN 12",
    detail: [
      "UNDERSTAND ▸ 40 silent leads · segmented by language and last touch · flag risk checked",
      "PLAN ▸ route: claude-sonnet (ar) + gpt-4o (fr) + gemini-2.5 (en), staggered · ctx: promo + policy · 9k",
      "ROUTE ▸ three models, staggered · tools: [whatsapp, crm]",
      "EXECUTE ▸ 40 personalized, policy-safe messages drafted · sent, none flagged",
      "EVALUATE ▸ delivered 36 · replies 9 · flagged 0 · quality 0.94 avg",
      "RESULT ▸ 9 replies from one run · cost 3.2 DZD · lines that worked remembered",
    ],
    telemetry: [
      "route: auto",
      "model: claude-sonnet (ar) + gpt-4o (fr) + gemini-2.5 (en), staggered",
      "tools: [whatsapp, crm]",
      "cost: 3.2 DZD total (~0.08 each)",
      "delivered: 36",
      "replies: 9",
      "flagged: 0",
    ],
    outcome:
      "9 replies from one run, less than the price of a phone credit top-up. Composer remembers which lines worked for the next batch.",
  },
]

export function RunConsole() {
  const [taskIndex, setTaskIndex] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)
  const playingRef = useRef(false)
  const wasPlayingRef = useRef(false)

  const task = TASKS[taskIndex]
  const finished = stageIndex >= FINISHED
  const status = playing ? "RUNNING" : finished ? "COMPLETED" : "READY"

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const reduceMotion = mediaQuery.matches
    setReducedMotion(reduceMotion)

    if (reduceMotion) {
      setStageIndex(FINISHED)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !startedRef.current) {
          startedRef.current = true
          setStageIndex(0)
          setPlaying(true)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        wasPlayingRef.current = playingRef.current
        setPlaying(false)
      } else if (wasPlayingRef.current) {
        wasPlayingRef.current = false
        setPlaying(true)
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  useEffect(() => {
    if (!playing || reducedMotion) return
    if (stageIndex >= FINISHED) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(() => setStageIndex((prev) => prev + 1), STAGE_MS)
    return () => clearTimeout(timer)
  }, [playing, reducedMotion, stageIndex])

  const selectTask = (index: number) => {
    setTaskIndex(index)
    setStageIndex(reducedMotion ? FINISHED : 0)
    if (!reducedMotion) {
      setPlaying(true)
      setUserInteracted(false)
    }
  }

  const handleStageClick = (index: number) => {
    setPlaying(false)
    setStageIndex(index)
    setUserInteracted(true)
  }

  const handleReplay = () => {
    setStageIndex(0)
    setPlaying(true)
  }

  return (
    <div ref={rootRef} className="rounded-lg border border-border bg-surface p-4 md:p-6">
      <div
        className="mb-4 flex flex-wrap gap-2"
        aria-label="Example tasks the Composer engine runs"
      >
        {TASKS.map((t, index) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={taskIndex === index}
            onClick={() => selectTask(index)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors",
              taskIndex === index
                ? "border-signal bg-signal text-signal-text"
                : "border-border text-muted-ink hover:border-signal/50 hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-lg border border-border bg-surface-dim px-4 py-2 font-mono text-xs text-ink">
          task ▸ {task.chip}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-ink">
          {task.run} · {status}
        </span>
      </div>

      <ExecutionTrace
        stages={DEFAULT_STAGES}
        active={stageIndex}
        telemetry={task.telemetry}
        onStageClick={handleStageClick}
        className="p-5 md:p-7"
      />

      <div className="mt-4 min-h-[2rem] border-t border-border pt-3">
        <p
          aria-live={userInteracted ? "polite" : "off"}
          className="font-mono text-[11px] leading-relaxed text-signal-contrast"
        >
          {task.detail[stageIndex]}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-ink">→ {task.outcome}</p>
        {!reducedMotion && (
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-border px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-signal hover:bg-signal-bg"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Replay run
          </button>
        )}
      </div>
    </div>
  )
}
