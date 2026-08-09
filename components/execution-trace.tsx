"use client"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface ExecutionTraceProps {
  stages?: string[]
  active?: number
  telemetry?: string[]
  className?: string
  onStageClick?: (index: number) => void
}

export const DEFAULT_STAGES = ["UNDERSTAND", "PLAN", "ROUTE", "EXECUTE", "EVALUATE", "RESULT"]

export function ExecutionTrace({ stages = DEFAULT_STAGES, active = 0, telemetry = [], className, onStageClick }: ExecutionTraceProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = rowRef.current
    if (!container) return
    const target = container.querySelector<HTMLElement>(`[data-stage="${active}"]`)
    if (!target) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [active])

  return (
    <div className={cn("rounded-lg border border-border bg-surface p-4 md:p-6 font-mono text-xs", className)}>
      <div ref={rowRef} className="flex snap-x snap-mandatory items-center justify-between gap-2 overflow-x-auto">
        {stages.map((stage, i) => (
          <div key={stage} data-stage={i} className="flex snap-center flex-1 items-center gap-2 last:flex-none">
            {onStageClick ? (
              <button
                type="button"
                onClick={() => onStageClick(i)}
                aria-pressed={i === active}
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-2 transition-colors min-h-[44px]",
                  i <= active ? "bg-signal text-signal-text" : "bg-surface-dim text-muted-ink"
                )}
              >
                {stage}
              </button>
            ) : (
              <span
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-2 transition-colors min-h-[44px]",
                  i <= active ? "bg-signal text-signal-text" : "bg-surface-dim text-muted-ink"
                )}
              >
                {stage}
              </span>
            )}
            {i < stages.length - 1 && <span className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>
      {telemetry.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-[11px] text-muted-ink">
          {telemetry.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
