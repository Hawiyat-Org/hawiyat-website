"use client"

import dynamic from "next/dynamic"

// Below-fold client islands live in this client wrapper because ssr:false
// dynamic() is not allowed in Server Components. Both mounts are deferred so
// their JS never blocks initial render; the marquee's ItemList schema is
// rendered server-side in app/page.tsx so SEO is preserved.
const PartnersMarquee = dynamic(() => import("@/components/partners-marquee"), {
  ssr: false,
  loading: () => null,
})

// Fixed-position: renders null until 1s after mount, no layout impact.
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
