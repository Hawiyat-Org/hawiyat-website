import { ArrowRight } from "lucide-react"

/**
 * FlowDiagram — renders a simple horizontal pipeline from a markdown fenced block
 * tagged `flow`. Each non-empty line is one stage (optionally "Label: detail").
 *
 * ```flow
 * UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT
 * ```
 *
 * Also supports per-line labels:
 * ```flow
 * Order placed
 * Payment (CCP / Baridi Mob)
 * API key issued
 * First task routed
 * ```
 */
export function FlowDiagram({ lines }: { lines: string[] }) {
  const stages = lines
    .flatMap((line) => line.split("→"))
    .map((s) => s.trim())
    .filter(Boolean)

  if (stages.length === 0) return null

  return (
    <div
      className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 px-4 py-5"
      role="img"
      aria-label={`Flow: ${stages.join(", then ")}`}
    >
      <div className="flex min-w-max items-center gap-3">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-xs font-medium text-ink">
              {stage}
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Parses a fenced code block body into lines (ignoring empty trailing lines). */
export function parseFlowLines(body: string): string[] {
  return body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
}
