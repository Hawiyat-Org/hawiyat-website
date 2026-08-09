import HeroSection from "@/components/hero-section"
import PartnersMarquee from "@/components/partners-marquee"
import Pricing from "@/components/pricing"
import OurNumbers from "@/components/our-numbers"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CallToAction from "@/components/call-to-action"
import WhatsAppWidget from "@/components/whatsapp-widget"

export default function Home() {
  return (
    <>
      <WhatsAppWidget />
      <main>
        <HeroSection />
        <PartnersMarquee />
        <OurNumbers />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
    </>
  )
}
