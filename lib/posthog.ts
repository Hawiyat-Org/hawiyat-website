"use client"

/**
 * Lazy PostHog client.
 *
 * posthog-js is ~234 KB raw and was previously statically imported by several
 * components, which put it on the critical path of every page. Here the SDK
 * is dynamically imported on first use and preloaded after the main thread
 * goes idle, so it never blocks initial render. Event names and properties
 * are unchanged; only the loading strategy differs.
 */

type PosthogModule = typeof import("posthog-js")

let posthogPromise: Promise<PosthogModule> | null = null

function loadPosthog(): Promise<PosthogModule> {
  if (!posthogPromise) {
    posthogPromise = import("posthog-js").then((mod) => {
      const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

      if (projectToken) {
        mod.default.init(projectToken, {
          // Same-origin proxy (next.config.mjs rewrites /ingest/* to the US
          // PostHog cluster): every request stays on this domain, so tracking
          // survives ad blockers that blacklist *.posthog.com.
          api_host: "/ingest",
          defaults: "2026-01-30",
          // No automatic pageview capture: components/posthog-pageview.tsx
          // fires $pageview on every route change instead, so soft
          // navigations are counted exactly once.
          capture_pageview: false,
          capture_exceptions: true,
          cookieless_mode: "on_reject",
          person_profiles: "identified_only",
          debug: process.env.NODE_ENV === "development",
        })
      }

      return mod
    })
  }
  return posthogPromise
}

/**
 * Fire a PostHog event. Safe to call before init: the SDK is loaded and
 * initialized on first use. Best-effort, never throws.
 */
export async function capture(event: string, props?: Record<string, unknown>): Promise<void> {
  try {
    const mod = await loadPosthog()
    mod.default.capture(event, props)
  } catch {
    // Analytics is best-effort; never let it break the UI.
  }
}

/**
 * Apply a consent choice. Awaiting loadPosthog first guarantees init runs
 * before opt_in/opt_out: calling those on an uninitialized SDK would persist
 * consent under the wrong storage key and silently drop the choice.
 * Best-effort, never throws.
 */
export async function setConsent(granted: boolean, silent: boolean): Promise<void> {
  try {
    const mod = await loadPosthog()
    if (granted) {
      mod.default.opt_in_capturing(silent ? { captureEventName: false } : undefined)
    } else {
      mod.default.opt_out_capturing()
    }
  } catch {
    // Analytics is best-effort; never let it break the UI.
  }
}

/** Kick off the SDK load after the main thread is idle. */
export function deferPosthogLoad(): void {
  if (typeof window === "undefined") return
  const preload = () => {
    void loadPosthog()
  }
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload, { timeout: 2000 })
  } else {
    globalThis.setTimeout(preload, 2000)
  }
}