"use client"

import dynamic from "next/dynamic"

// Below-fold / non-critical home sections. Deferred with ssr:false so their
// JS does not block initial render; the marquee's ItemList schema is rendered
// server-side in app/page.tsx so SEO is preserved.
const PartnersMarquee = dynamic(() => import("@/components/partners-marquee"), {
  ssr: false,
  loading: () => null,
})

// Floating widget renders null until 1s after mount, so its SSR output is
// identical to the deferred render.
const WhatsAppWidget = dynamic(() => import("@/components/whatsapp-widget"), {
  ssr: false,
  loading: () => null,
})

export function BelowFold() {
  return (
    <>
      <PartnersMarquee />
      <WhatsAppWidget />
    </>
  )
}