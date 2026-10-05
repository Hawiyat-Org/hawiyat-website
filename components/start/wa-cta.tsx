"use client"

import { waLink } from "@/lib/contact"

/**
 * WhatsApp CTA that also reports the click to the Meta pixel.
 *
 * Why: the site's only conversion signal today is the Purchase event on the
 * order form. If an ad is pointed at this page and the visitor's action is
 * "open WhatsApp", Meta sees nothing and the campaign optimizes blind. This
 * fires a standard `Contact` event so the click is measurable and attributable.
 *
 * The click is never blocked by analytics — the anchor navigates regardless.
 */
export function WhatsAppCta({
  message,
  label = "Talk to us on WhatsApp",
  variant = "primary",
  className = "",
}: {
  message: string
  label?: string
  variant?: "primary" | "quiet"
  className?: string
}) {
  const styles =
    variant === "primary"
      ? "bg-signal text-signal-text hover:bg-signal-hover"
      : "border border-border bg-surface text-ink hover:bg-surface-dim"

  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        try {
          const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
          if (fbq) {
            fbq("track", "Contact", {
              content_name: "whatsapp_cta",
              content_category: "landing",
            })
          }
        } catch {
          /* analytics is best-effort — never block the handoff */
        }
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${styles} ${className}`}
    >
      {label}
    </a>
  )
}
