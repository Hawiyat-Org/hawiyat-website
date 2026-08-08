import HeroSection from "@/components/hero-section"
import TrustedBrands from "@/components/trusted-brands"
import BuildAIApps from "@/components/build-ai-apps"
import BenefitsSection from "@/components/benefits-section"
import PrebuiltTools from "@/components/prebuilt-tools"
import AdditionalFeatures from "@/components/additional-features"
import OneSubscription from "@/components/one-subscription"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import AiPlaygroundDashboard from "@/components/ai-playground-dashboard"
import Resources from "@/components/resources"
import FAQ from "@/components/faq"
import CallToAction from "@/components/call-to-action"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import ScrollAnimations from "@/components/scroll-animations"
import WhatsAppWidget from "@/components/whatsapp-widget"
import Link from "next/link"

export default function Home() {
  return (
    <>
      {/* WhatsApp Widget */}
      <WhatsAppWidget />
      
      <ScrollAnimations />
     
      <main className="hero-bg-gradient">
        <HeroSection />
        <TrustedBrands />
        <Pricing />
        <AiPlaygroundDashboard />
        <section className="mx-auto max-w-6xl px-6 py-20 text-center" aria-labelledby="ai-algeria-heading">
          <h2 id="ai-algeria-heading" className="text-4xl font-semibold md:text-5xl">An AI provider built for Algeria</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-muted-foreground">
            Hawiyat gives developers and businesses local access to AI subscriptions, Composer, automation, hosting, and implementation support. Selected plans are priced in DZD, with assistance in Arabic, French, and English.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/ai-algeria" className="btn">Explore AI in Algeria</Link>
            <Link href="/services" className="btn !bg-transparent !text-foreground border border-border">Compare services</Link>
          </div>
        </section>
        <BenefitsSection />
        <BuildAIApps />
        <PrebuiltTools />

        <AdditionalFeatures />
        <OneSubscription />
        {/* <Testimonials /> */}
        <Resources />
        <FAQ />
        <CallToAction />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}