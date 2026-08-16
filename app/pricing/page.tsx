import type { Metadata } from "next"
import Pricing from "@/components/pricing"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Pricing | Hawiyat AI Composer & Services in Algeria",
  description:
    "Hawiyat pricing in Algerian dinars (DZD): AI Composer Pro 6,000 DA/month, MAX 5X 15,000, MAX 20X 30,000, Enterprise custom. n8n hosting, Evolution API, and Hawiyat Cloud. Pay with CCP, Baridi Mob, or USD.",
  path: "/pricing",
  modifiedTime: "2026-08-16",
})

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-80">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-lg bg-gradient-to-b from-foreground/[0.03] to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl text-ink">Pricing in DZD</h1>
          <p className="mt-5 text-lg text-muted-ink">
            AI Composer plans, n8n hosting, Evolution API, and Hawiyat Cloud, all billed in
            Algerian dinars. Pay with CCP, Baridi Mob, or USD. Machine-readable copy is always
            available at /pricing.md for AI agents.
          </p>
        </header>
        <Pricing />
      </div>
    </div>
  )
}
