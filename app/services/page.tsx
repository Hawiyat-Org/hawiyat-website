import type { Metadata } from "next"
import ServicesCatalog from "@/components/services/services-catalog"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "AI Services in Algeria | n8n, Claude Code, WhatsApp API, Hosting | Hawiyat",
  description:
    "Browse all Hawiyat services: n8n workflow automation (8,000 DA/year), Hawiyat Composer Claude subscriptions (6,000-30,000 DA/month), Evolution API WhatsApp hosting (7,000 DA/year), OpenAI credits, and web hosting. Priced in Algerian dinars, local support in Arabic, French, and English.",
  path: "/services",
})

export default function ServicesPage({ searchParams }: { searchParams: { q?: string | string[] } }) {
  return (
    <main className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-80">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/[0.03] to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-semibold md:text-6xl">AI Subscriptions and Managed Services in Algeria</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Hawiyat provides locally supported AI access, Hawiyat Composer plans, workflow automation, WhatsApp integrations, and application hosting with prices in Algerian dinars.
          </p>
       
        </header>
        <ServicesCatalog initialQuery={typeof searchParams.q === "string" ? searchParams.q : ""} />
      </div>
    </main>
  )
}
