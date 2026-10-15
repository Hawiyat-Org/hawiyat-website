"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface ExecutionTraceProps {
  stages?: string[]
  active?: number
  telemetry?: string[]
  className?: string
  onStageClick?: (index: number) => void
}

export const DEFAULT_STAGES = ["UNDERSTAND", "PLAN", "ROUTE", "EXECUTE", "EVALUATE", "RESULT"]

type Box = { x: number; y: number; w: number; h: number }

/**
 * The execution trace.
 *
 * Progress is shown by ONE bracket that travels from stage to stage, not by
 * filling each stage with a solid block as it completes. Solid fills made the
 * row read as six heavy rectangles swapping colour on a timer; a moving bracket
 * gives the eye something to follow and keeps the row quiet at rest.
 */
export function ExecutionTrace({
  stages = DEFAULT_STAGES,
  active = 0,
  telemetry = [],
  className,
  onStageClick,
}: ExecutionTraceProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const userInteractedRef = useRef(false)
  const [box, setBox] = useState<Box | null>(null)

  // Keep the active stage in view on narrow screens.
  useEffect(() => {
    const container = rowRef.current
    if (!container) return
    const target = container.querySelector<HTMLElement>(`[data-stage="${active}"]`)
    if (!target) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    container.scrollTo({
      left: target.offsetLeft - (container.clientWidth - target.offsetWidth) / 2,
      behavior: userInteractedRef.current && !reduceMotion ? "smooth" : "auto",
    })
    userInteractedRef.current = false
  }, [active])

  // Measure the active stage so the bracket can travel to it.
  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    const measure = () => {
      const target = row.querySelector<HTMLElement>(`[data-stage="${active}"]`)
      if (!target) return
      setBox({
        x: target.offsetLeft,
        y: target.offsetTop,
        w: target.offsetWidth,
        h: target.offsetHeight,
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    window.addEventListener("resize", measure)
    // Fonts land after first paint and shift the labels; re-measure once they do.
    if (document.fonts?.ready) void document.fonts.ready.then(measure)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [active, stages])

  return (
    <div className={cn("rounded-lg border border-border bg-surface p-4 md:p-6 font-mono text-xs", className)}>
      <div
        ref={rowRef}
        className="relative flex snap-x snap-mandatory items-center justify-between gap-2 overflow-x-auto"
      >
        {box && (
          <span
            aria-hidden="true"
            className="composer-bracket"
            style={{
              transform: `translate(${box.x}px, ${box.y}px)`,
              width: box.w,
              height: box.h,
            }}
          />
        )}

        {stages.map((stage, i) => {
          const label = cn(
            "flex min-h-[44px] items-center whitespace-nowrap rounded-md px-2 py-2 transition-colors duration-300",
            i === active ? "text-ink" : i < active ? "text-muted-ink" : "text-muted-ink/60"
          )
          return (
            <div key={stage} data-stage={i} className="flex snap-center flex-1 items-center gap-2 last:flex-none">
              {onStageClick ? (
                <button
                  type="button"
                  onClick={() => {
                    userInteractedRef.current = true
                    onStageClick(i)
                  }}
                  aria-pressed={i === active}
                  className={cn(label, "hover:text-ink")}
                >
                  {stage}
                </button>
              ) : (
                <span className={label} aria-current={i === active ? "step" : undefined}>
                  {stage}
                </span>
              )}
              {i < stages.length - 1 && <span className="composer-rail" aria-hidden="true" />}
            </div>
          )
        })}
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
