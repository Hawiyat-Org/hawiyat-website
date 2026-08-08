import HeroSection from "@/components/hero-section"
import Pricing from "@/components/pricing"
import TrustedBrands from "@/components/trusted-brands"
import AlgeriaBand from "@/components/algeria-band"
import FAQ from "@/components/faq"
import CallToAction from "@/components/call-to-action"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import ScrollAnimations from "@/components/scroll-animations"
import WhatsAppWidget from "@/components/whatsapp-widget"

export default function Home() {
  return (
    <>
      <WhatsAppWidget />

      <ScrollAnimations />

      <main>
        <HeroSection />
        <Pricing />
        <TrustedBrands />
        <AlgeriaBand />
        <FAQ />
        <CallToAction />
        <Newsletter />
      </main>

      <Footer />
    </>
  )
}
