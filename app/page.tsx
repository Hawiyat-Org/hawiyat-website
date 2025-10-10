import HeroSection from "@/components/hero-section"
import TrustedBrands from "@/components/trusted-brands"
import BuildAIApps from "@/components/build-ai-apps"
import BenefitsSection from "@/components/benefits-section"
import PrebuiltTools from "@/components/prebuilt-tools"
import AdditionalFeatures from "@/components/additional-features"
import OneSubscription from "@/components/one-subscription"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Resources from "@/components/resources"
import FAQ from "@/components/faq"
import CallToAction from "@/components/call-to-action"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import ScrollAnimations from "@/components/scroll-animations"
import ChatwootWidget from "@/components/chatwoot-widget"

export default function Home() {
  return (
    <>
      {/* Chatwoot Widget - Replace with your actual website token */}
      <ChatwootWidget 
        websiteToken={process.env.NEXT_PUBLIC_CHATWOOT_TOKEN || ''}
        baseUrl="https://app.chatwoot.com"
      />
      
      <ScrollAnimations />
     
      <main className="hero-bg-gradient"> 
        <HeroSection />
        <TrustedBrands />
        <BenefitsSection />
        <BuildAIApps />
        <PrebuiltTools />
        <AdditionalFeatures />
        <OneSubscription />
        <Testimonials />
        <Pricing />
        <Resources />
        <FAQ />
        <CallToAction />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}