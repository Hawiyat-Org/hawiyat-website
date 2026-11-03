'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { X } from 'lucide-react'

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
 *
 * Mobile: NO popup. The notice never opens on its own, so it cannot cover the
 * content or the WhatsApp button. It appears only when the visitor asks for it
 * through the footer "Cookie settings" link, as a bottom card. Desktop keeps
 * the bar open on first visit. Nothing is stored before a choice, so the
 * absence of a mobile banner changes no data practice.
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
    "rounded-md bg-signal px-3 py-2.5 text-sm font-medium text-signal-text transition-colors hover:bg-signal-hover md:py-1.5",
  secondary:
    "rounded-md border border-border px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-dim md:py-1.5",
  ghost:
    "rounded-md px-2 py-2.5 text-sm font-medium text-muted-ink transition-colors hover:text-ink md:py-1.5",
}

const META_PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1043227882071238');fbq('track', 'PageView');`

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

import { setConsent } from "@/lib/posthog"

/** Keep PostHog's own consent state in sync. silent restores a stored choice
 *  without emitting an $opt_in event on every page load. Delegates to the
 *  lazy loader so init always runs before opt_in/opt_out (see lib/posthog.ts)
 *  and posthog-js stays out of the critical bundle. */
const syncPostHog = (choice: ConsentChoice, silent: boolean) => {
  void setConsent(choice === "granted", silent)
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
  const [expanded, setExpanded] = useState(false)
  const panelRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setConsent(initialStoredConsent)
    const desktop = window.matchMedia("(min-width: 768px)")

    // Desktop: show the notice once on first visit. Mobile: no popup at all,
    // the notice opens only from the footer "Cookie settings" link.
    if (initialStoredConsent === null && desktop.matches) {
      setIsOpen(true)
    }
    setExpanded(desktop.matches)
    const onViewportChange = (event: MediaQueryListEvent) => setExpanded(event.matches)
    desktop.addEventListener("change", onViewportChange)

    // Re-open from the footer "Cookie settings" link, always expanded.
    const openFromFooter = () => {
      setIsOpen(true)
      setExpanded(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, openFromFooter)
    return () => {
      desktop.removeEventListener("change", onViewportChange)
      window.removeEventListener(OPEN_CONSENT_EVENT, openFromFooter)
    }
  }, [])

  // Publish the height of the OPEN notice so the WhatsApp button can float above
  // it instead of being covered by it. The collapsed pill clears the button by
  // width (right-24), so it publishes 0 and the button returns to bottom-6.
  useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const panel = panelRef.current
      // The panel is only mounted while the notice is shown, so a present ref
      // plus a non-hidden computed display means it is on screen.
      const visible = panel !== null && window.getComputedStyle(panel).display !== "none"
      root.style.setProperty("--hw-consent-offset", visible ? `${panel.offsetHeight}px` : "0px")
    }
    apply()
    const observer = new ResizeObserver(apply)
    if (panelRef.current) observer.observe(panelRef.current)
    window.addEventListener("resize", apply)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", apply)
      root.style.removeProperty("--hw-consent-offset")
    }
  }, [consent, isOpen, expanded])

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
        <>
          <aside
            id="consent-panel"
            ref={panelRef}
            role="region"
            aria-label="Cookie and analytics consent"
            className={`${expanded ? "block" : "hidden md:block"} fixed inset-x-0 bottom-0 z-40 md:border-t md:border-border md:bg-surface/95 md:backdrop-blur-sm`}
          >
            <div className="mx-3 mb-3 rounded-xl border border-border bg-surface/95 shadow-lg backdrop-blur-sm md:mx-0 md:mb-0 md:rounded-none md:border-0 md:shadow-none">
              <div className="mx-auto w-full max-w-6xl px-4 py-3.5 md:flex md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2 md:px-6 md:py-3">
                <p className="text-sm leading-snug text-muted-ink md:min-w-0 md:flex-1">
                  {bar.message}
                </p>
                <div className="mt-3 flex items-center gap-2 md:mt-0 md:flex-wrap">
                  {bar.buttons.map((button) => (
                    <button
                      key={button.label}
                      type="button"
                      onClick={button.onClick}
                      className={`${BUTTON_CLASSES[button.variant]} flex-1 md:flex-none`}
                    >
                      {button.label}
                    </button>
                  ))}
                  {pending && (
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      aria-label="Collapse cookie notice"
                      aria-controls="consent-panel"
                      className="rounded-md p-2 text-muted-ink transition-colors hover:text-ink md:hidden"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                  <Link
                    href="/privacy#cookies"
                    className="w-full px-1 py-1 font-mono text-xs text-muted-ink underline underline-offset-4 transition-colors hover:text-ink md:w-auto md:px-2 md:py-1.5"
                  >
                    Privacy policy
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  )
}