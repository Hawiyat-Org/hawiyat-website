import type { Metadata } from "next"
import ServicesCatalog from "@/components/services/services-catalog"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "AI Execution Services in Algeria | n8n, WhatsApp API",
  description:
    "AI execution services in Algeria: Hawiyat AI Composer, n8n automation, WhatsApp API, and app hosting — priced in DZD with local support.",
  path: "/services",
})

export default function ServicesPage({ searchParams }: { searchParams: { q?: string | string[] } }) {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-80">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/[0.03] to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl text-ink">Run your stack on the Hawiyat execution layer — in DZD</h1>
          <p className="mt-5 text-lg text-muted-ink">
            Hawiyat AI Composer executes your AI between any model and your systems. Add n8n automation, WhatsApp infrastructure, and app hosting under one contract — billed in dinars, supported in Arabic, French, and English.
          </p>
        </header>
        <ServicesCatalog initialQuery={typeof searchParams.q === "string" ? searchParams.q : ""} />
      </div>
    </div>
  )
}
