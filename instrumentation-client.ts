import posthog from "posthog-js"

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

if (!projectToken) {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
    )
  }
} else {
  posthog.init(projectToken, {
    // Same-origin proxy: next.config.mjs rewrites /ingest/* to the US PostHog
    // cluster (https://us.i.posthog.com, the recorded founder decision). A
    // relative api_host keeps every request on this domain, so tracking
    // survives ad blockers that blacklist *.posthog.com.
    api_host: "/ingest",
    defaults: "2026-01-30",
    // Automatic pageview capture is off (initial load plus the history API
    // monitor that posthog-js would otherwise enable). components/posthog-pageview.tsx
    // fires $pageview on every route change instead, so soft navigations are
    // counted exactly once and never double counted against automatic capture.
    capture_pageview: false,
    capture_exceptions: true,
    cookieless_mode: "on_reject",
    person_profiles: "identified_only",
    debug: process.env.NODE_ENV === "development",
  })
}
