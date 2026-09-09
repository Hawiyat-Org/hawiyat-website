import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import PartnersMarquee from "@/components/partners-marquee"
import Pricing from "@/components/pricing"
import OurNumbers from "@/components/our-numbers"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CallToAction from "@/components/call-to-action"
import WhatsAppWidget from "@/components/whatsapp-widget"
import { createMetadata } from "@/lib/seo"

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
      <WhatsAppWidget />
      <div>
        <HeroSection />
        <PartnersMarquee />
        <OurNumbers />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </div>
    </>
  )
}
