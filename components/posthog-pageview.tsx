"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { capture } from "@/lib/posthog"

/**
 * Fires a $pageview on every route change so soft navigations in the App
 * Router are counted, not just full page loads. PostHog's automatic pageview
 * capture is disabled in instrumentation-client.ts (capture_pageview: false)
 * so this component is the single source of pageviews and nothing is double
 * counted.
 *
 * PostHog derives $current_url and $pathname from window.location when the
 * event is captured, and Next.js updates the URL before this effect runs, so
 * no properties need to be passed.
 *
 * Analytics is best-effort: when the SDK was never initialized (no
 * NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN configured) capture() can throw, so the
 * call is wrapped and never allowed to break navigation or rendering.
 */
function trackPageview() {
  void capture("$pageview")
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // usePathname returns null during prerendering; only fire once we have a
    // real pathname on the client.
    if (!pathname) return
    trackPageview()
  }, [pathname, searchParams])

  return null
}

/**
 * Suspense keeps statically prerendered pages from bailing out to full client
 * rendering, which useSearchParams below the boundary would otherwise trigger.
 */
export default function PostHogPageViewWithSuspense() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
