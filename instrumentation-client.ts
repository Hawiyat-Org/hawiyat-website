import { deferPosthogLoad } from "@/lib/posthog"

// Client instrumentation hook (auto-loaded by Next.js at app bootstrap).
// PostHog init is deferred off the critical path: the SDK is dynamically
// imported after the main thread goes idle, or on first event capture.
// Init config (same-origin /ingest host, no auto pageview, cookieless
// on_reject, identified_only) lives in lib/posthog.ts so lazy and idle
// paths share one source of truth.
deferPosthogLoad()
