"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

interface ServiceViewTrackerProps {
  serviceId: string
  slug: string
  plan?: string
}

/**
 * Analytics must never block the UI: if PostHog is uninitialized (no
 * NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, blocked by an ad blocker, or init fails)
 * the SDK can throw synchronously. Wrap every capture.
 */
function track(event: string, props?: Record<string, unknown>) {
  try {
    posthog.capture(event, props)
  } catch {
    /* analytics is best-effort; never break the page render */
  }
}

export function ServiceViewTracker({ serviceId, slug, plan }: ServiceViewTrackerProps) {
  useEffect(() => {
    track("service_page_viewed", {
      service_id: serviceId,
      slug,
      ...(plan ? { plan } : {}),
    })
    // serviceId and slug change only on a real navigation to another service,
    // so a same-page re-render never re-fires the event.
  }, [serviceId, slug, plan])

  return null
}
