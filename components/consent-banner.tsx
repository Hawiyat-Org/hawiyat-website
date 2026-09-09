'use client'

import { useCallback, useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
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
 */

const HAWIYAT_CONSENT_KEY = "hawiyat-consent"

type ConsentChoice = "granted" | "denied"
type ConsentState = ConsentChoice | "loading" | null

type PanelStatus = "pending" | "granted" | "denied"

type PanelButton = {
  label: string
  variant: "primary" | "secondary" | "ghost"
  onClick: () => void
}

type PanelContent = {
  eyebrow: string
  title: string
  body: string
  buttons: PanelButton[]
}

const BUTTON_CLASSES: Record<PanelButton["variant"], string> = {
  primary:
    "rounded-lg bg-signal px-5 py-2.5 text-sm font-medium text-signal-text transition-colors hover:bg-signal-hover",
  secondary:
    "rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-dim",
  ghost:
    "rounded-lg px-4 py-2.5 text-sm font-medium text-muted-ink transition-colors hover:text-ink",
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
  const showPanel = !loading && (isOpen || pending)
  const showChip = !loading && !pending && !isOpen

  const panelStatus: PanelStatus | null =
    pending
      ? "pending"
      : consent === "granted" || consent === "denied"
        ? consent
        : null

  const statusPanels: Record<PanelStatus, PanelContent> = {
    pending: {
      eyebrow: "Privacy",
      title: "Analytics run only after you accept",
      body: "We use privacy-focused analytics to understand how this site is used. Accepting enables PostHog tracking and loads the Meta Pixel. Declining keeps PostHog cookieless and never loads the pixel. You can change your choice at any time.",
      buttons: [
        {
          label: "Accept analytics",
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
      eyebrow: "Consent granted",
      title: "Analytics are enabled",
      body: "PostHog stores cookies on this device and the Meta Pixel is active. Withdrawing consent stops both. You can re-enable them later from the cookie settings button.",
      buttons: [
        {
          label: "Withdraw consent",
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
      eyebrow: "Consent declined",
      title: "Analytics stay off",
      body: "PostHog runs in cookieless mode and the Meta Pixel is not loaded. Enabling analytics turns both back on.",
      buttons: [
        {
          label: "Enable analytics",
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

  const panel = panelStatus ? statusPanels[panelStatus] : null

  return (
    <>
      {/* Meta Pixel: mounted (hence lazy-loaded) only after opt-in. */}
      {consent === "granted" && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {META_PIXEL_SNIPPET}
        </Script>
      )}

      {showPanel && (
        <aside
          role="region"
          aria-label="Cookie and analytics consent"
          className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-border bg-surface p-6 shadow-lg sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-lg"
        >
          {panel && (
            <>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                {panel.eyebrow}
              </p>
              <h2 className="mt-2 text-base font-medium text-ink">
                {panel.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                {panel.body}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {panel.buttons.map((button) => (
                  <button
                    key={button.label}
                    type="button"
                    onClick={button.onClick}
                    className={BUTTON_CLASSES[button.variant]}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <Link
            href="/privacy#cookies"
            className="mt-4 inline-block font-mono text-xs text-ink underline underline-offset-4 transition-colors hover:text-muted-ink"
          >
            Privacy policy, Section 12
          </Link>
        </aside>
      )}

      {showChip && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Cookie settings"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 shadow-md transition-colors hover:bg-surface-dim"
        >
          <Cookie className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink">
            {consent === "denied" ? "Tracking off" : "Cookie settings"}
          </span>
        </button>
      )}
    </>
  )
}
