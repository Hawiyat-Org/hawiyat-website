import { capture } from "@/lib/posthog"

/**
 * Fire a PostHog event without ever blocking the UI or the critical bundle:
 * the SDK loads lazily on first use (see lib/posthog.ts), so statically
 * importing this helper keeps posthog-js out of initial render. Best-effort
 * and synchronous at the call site; failures stay silent.
 */
export function track(event: string, props?: Record<string, unknown>): void {
  void capture(event, props)
}