import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import Pricing from "@/components/pricing"
import OurNumbers from "@/components/our-numbers"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CallToAction from "@/components/call-to-action"
import { createMetadata } from "@/lib/seo"
import { BelowFold } from "@/components/home/below-fold"
import { partners } from "@/lib/data/partners"

export const metadata: Metadata = createMetadata({
  title: "AI Infrastructure in Algeria | Composer & LLM API",
  description:
    "Hawiyat is the AI infrastructure platform in Algeria: one API key to GPT, Claude, Gemini, and open models through Composer. Build AI agents, billed in DZD.",
  path: "/",
  modifiedTime: "2026-09-09",
})

export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
        <BelowFold />
        <OurNumbers />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </div>

      {/* Structured data: search engines & AI crawlers read the references as entities.
          Rendered server-side because the marquee itself is deferred (ssr:false). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Hawiyat partners and early customers",
            description:
              "Partners and early customers working with the Hawiyat execution layer.",
            numberOfItems: partners.length,
            itemListElement: partners.map((partner, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Organization",
                name: partner.name,
                url: partner.url,
                description: partner.desc,
              },
            })),
          }),
        }}
      />
    </>
  )
}
