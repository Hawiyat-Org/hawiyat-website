import posthog from "posthog-js"

/**
 * Analytics must never block the UI: if PostHog is not initialized (no
 * NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, blocked by an ad blocker, or init fails)
 * the uninitialized SDK can throw synchronously. Wrap every capture so a
 * tracking failure can never prevent an order, an outbound redirect, or a
 * page render.
 */
export function track(event: string, props?: Record<string, unknown>): void {
  try {
    posthog.capture(event, props)
  } catch {
    /* analytics is best-effort; never break the UI */
  }
}