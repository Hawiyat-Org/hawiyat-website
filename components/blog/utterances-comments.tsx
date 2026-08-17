"use client"

import { useEffect, useRef } from "react"

/**
 * UtterancesComments — GitHub-Issues-based comments for blog posts.
 * Needs the repo to have Issues enabled (Hawiyat-Org/hawiyat-website does).
 * Zero backend: each post maps to a GitHub issue.
 */
export function UtterancesComments({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reset so re-mounts don't stack scripts
    el.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", "Hawiyat-Org/hawiyat-website")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("theme", "preferred-color-scheme")
    script.setAttribute("label", "blog-comment")
    script.setAttribute("crossorigin", "anonymous")
    el.appendChild(script)
  }, [slug])

  return (
    <section className="mt-14 border-t border-border pt-8" aria-label="Comments">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-ink">
        Comments
      </h2>
      <div ref={ref} className="mt-4 min-h-[120px]" />
    </section>
  )
}
