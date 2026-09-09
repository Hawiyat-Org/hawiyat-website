'use client'

import { useCallback, useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import posthog from 'posthog-js'

/*
 * First-party analytics consent (Task B4).
 *
 * One source of truth: a "granted" / "denied" choice persisted in
 * localStorage under HAWIYAT_CONSENT_KEY. Everything else derives from it:
 *
 *  - Meta Pixel: the inline lazyOnload <Script> (kept from the previous
 *    layout block, same bootstrap and hardcoded ID) renders ONLY while the
 *    choice is "granted", so no fbevents.js network call happens first.
 *  - PostHog: paired with cookieless_mode: "on_reject" in
 *    instrumentation-client.ts. Until opt_in_capturing() runs, PostHog
 *    stores nothing and captures nothing. opt_out_capturing() (deny or
 *    withdrawal) keeps only the cookieless privacy-preserving hash count.
 *
 * The stored choice is re-applied to PostHog at module scope, before any
 * hydration effect captures, so a returning "granted" visitor is never left
 * in the pending (non-capturing) window.
 *
 * Mount-guard: consent starts as "loading" and nothing renders until the
 * stored value has been read, so returning visitors never see a banner
 * flash (same pattern as the header theme toggle).
 *
 * UX: a slim one-line bottom bar. It appears on first visit (no stored
 * choice) and re-opens when the footer "Cookie settings" link dispatches the
 * "hawiyat:open-consent" window event. There is no floating re-open chip.
 */

const HAWIYAT_CONSENT_KEY = "hawiyat-consent"
const OPEN_CONSENT_EVENT = "hawiyat:open-consent"

type ConsentChoice = "granted" | "denied"
type ConsentState = ConsentChoice | "loading" | null

type BarStatus = "pending" | "granted" | "denied"

type BarButton = {
  label: string
  variant: "primary" | "secondary" | "ghost"
  onClick: () => void
}

type BarContent = {
  message: string
  buttons: BarButton[]
}

const BUTTON_CLASSES: Record<BarButton["variant"], string> = {
  primary:
    "rounded-md bg-signal px-3 py-1.5 text-sm font-medium text-signal-text transition-colors hover:bg-signal-hover",
  secondary:
    "rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-dim",
  ghost:
    "rounded-md px-2 py-1.5 text-sm font-medium text-muted-ink transition-colors hover:text-ink",
}

const META_PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1489709689056564');fbq('track', 'PageView');`

const readStoredConsent = (): ConsentChoice | null => {
  if (typeof window === "undefined") return null
  try {
    const stored = window.localStorage.getItem(HAWIYAT_CONSENT_KEY)
    return stored === "granted" || stored === "denied" ? stored : null
  } catch {
    // Storage unavailable (private mode or blocked storage). Treat as new.
    return null
  }
}

const persistConsent = (choice: ConsentChoice) => {
  try {
    window.localStorage.setItem(HAWIYAT_CONSENT_KEY, choice)
  } catch {
    // Non-fatal: the choice still applies for the rest of this session.
  }
}

/** Keep PostHog's own consent state in sync. silent restores a stored choice
 *  without emitting an $opt_in event on every page load. */
const syncPostHog = (choice: ConsentChoice, silent: boolean) => {
  try {
    if (choice === "granted") {
      posthog.opt_in_capturing(silent ? { captureEventName: false } : undefined)
    } else {
      posthog.opt_out_capturing()
    }
  } catch {
    // Analytics must never break the banner.
  }
}

// Restore a stored choice at module evaluation (pre-hydration) so PostHog is
// opted in/out before mount effects such as posthog-pageview.tsx capture. The
// window guard makes this a no-op during SSR.
const initialStoredConsent =
  typeof window === "undefined" ? null : readStoredConsent()

if (initialStoredConsent !== null) {
  syncPostHog(initialStoredConsent, true)
}

export default function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentState>("loading")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setConsent(initialStoredConsent)
    if (initialStoredConsent === null) {
      // First visit (or no stored choice): show the banner once.
      setIsOpen(true)
    }

    // Re-open from the footer "Cookie settings" link.
    const openFromFooter = () => setIsOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, openFromFooter)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openFromFooter)
  }, [])

  const decide = useCallback(
    (choice: ConsentChoice) => {
      if (consent !== choice) {
        persistConsent(choice)
        syncPostHog(choice, false)
        setConsent(choice)
      }
      setIsOpen(false)
    },
    [consent],
  )

  const loading = consent === "loading"
  const pending = consent === null
  const showBar = !loading && (pending || isOpen)

  const barStatus: BarStatus | null =
    pending
      ? "pending"
      : consent === "granted" || consent === "denied"
        ? consent
        : null

  const statusBars: Record<BarStatus, BarContent> = {
    pending: {
      message: "We use privacy-friendly analytics. Accept to enable tracking.",
      buttons: [
        {
          label: "Accept",
          variant: "primary",
          onClick: () => decide("granted"),
        },
        {
          label: "Decline",
          variant: "secondary",
          onClick: () => decide("denied"),
        },
      ],
    },
    granted: {
      message: "Analytics are on. You can withdraw consent at any time.",
      buttons: [
        {
          label: "Turn off",
          variant: "secondary",
          onClick: () => decide("denied"),
        },
        {
          label: "Close",
          variant: "ghost",
          onClick: () => setIsOpen(false),
        },
      ],
    },
    denied: {
      message: "Analytics are off. No tracking runs on this device.",
      buttons: [
        {
          label: "Turn on",
          variant: "primary",
          onClick: () => decide("granted"),
        },
        {
          label: "Close",
          variant: "ghost",
          onClick: () => setIsOpen(false),
        },
      ],
    },
  }

  const bar = barStatus ? statusBars[barStatus] : null

  return (
    <>
      {/* Meta Pixel: mounted (hence lazy-loaded) only after opt-in. */}
      {consent === "granted" && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {META_PIXEL_SNIPPET}
        </Script>
      )}

      {showBar && bar && (
        <aside
          role="region"
          aria-label="Cookie and analytics consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-6">
            <p className="min-w-0 flex-1 text-sm leading-snug text-muted-ink">
              {bar.message}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {bar.buttons.map((button) => (
                <button
                  key={button.label}
                  type="button"
                  onClick={button.onClick}
                  className={BUTTON_CLASSES[button.variant]}
                >
                  {button.label}
                </button>
              ))}
              <Link
                href="/privacy#cookies"
                className="px-2 py-1.5 font-mono text-xs text-muted-ink underline underline-offset-4 transition-colors hover:text-ink"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}