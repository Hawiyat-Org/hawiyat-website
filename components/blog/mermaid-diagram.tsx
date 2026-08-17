"use client"

import { useEffect, useRef, useState } from "react"

/**
 * MermaidDiagram — renders a mermaid diagram from a fenced code block tagged
 * `mermaid` in blog posts. Client-side render (mermaid needs a DOM + theme).
 *
 * ```mermaid
 * flowchart LR
 *   A[Pick a plan] --> B[Pay in DZD] --> C[Get your key] --> D[Ship]
 * ```
 */
export function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            fontFamily:
              "'Space Grotesk', 'JetBrains Mono', ui-monospace, monospace",
            fontSize: "14px",
            primaryColor: "#f5f5f4",
            primaryTextColor: "#1c1917",
            primaryBorderColor: "#d6d3d1",
            lineColor: "#a8a29e",
            secondaryColor: "#e7e5e4",
            tertiaryColor: "#fafaf9",
            clusterBkg: "#fafaf9",
            edgeLabelBackground: "#fafaf9",
          },
          securityLevel: "loose",
        })
        const renderId = `mermaid-${Math.random().toString(36).slice(2)}`
        // mermaid v11 returns { svg, bindFunctions }, not a string
        const { svg } = await mermaid.render(renderId, code)
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Diagram failed to render")
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [code])

  if (error) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 p-4 font-mono text-xs text-muted-ink">
        {code}
      </pre>
    )
  }

  return <div ref={ref} className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 px-4 py-5 [&_svg]:mx-auto [&_svg]:max-w-full" />
}
