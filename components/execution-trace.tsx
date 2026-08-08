"use client"
import { cn } from "@/lib/utils"

export interface ExecutionTraceProps {
  stages?: string[]
  active?: number
  telemetry?: string[]
  className?: string
}

const DEFAULT_STAGES = ["UNDERSTAND", "PLAN", "ROUTE", "EXECUTE", "EVALUATE", "RESULT"]

export function ExecutionTrace({ stages = DEFAULT_STAGES, active = 0, telemetry = [], className }: ExecutionTraceProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-4 md:p-6 font-mono text-xs", className)}>
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={cn(
                "whitespace-nowrap rounded-md px-2 py-1 transition-colors",
                i <= active ? "bg-signal text-signal-text" : "bg-surface-dim text-muted-ink"
              )}
            >
              {stage}
            </span>
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
