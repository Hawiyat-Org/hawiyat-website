import type { ReactNode } from "react"
import { createMetadata, SITE_URL } from "@/lib/seo"

export const metadata = createMetadata({
  title: "AI Subscriptions and Managed Services in Algeria",
  description: "AI subscriptions in DZD, Hawiyat Composer, n8n automation, WhatsApp API, hosting, and local technical support for Algeria.",
  path: "/services",
})

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hawiyat AI and managed services in Algeria",
  url: `${SITE_URL}/services`,
  itemListElement: [
    "Hawiyat Composer and Claude Code",
    "n8n Hosting",
    "Evolution API",
    "Application Hosting",
    "LLM Credit",
  ].map((name, index) => ({ "@type": "ListItem", position: index + 1, name })),
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  )
}
