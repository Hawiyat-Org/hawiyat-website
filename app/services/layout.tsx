import type { ReactNode } from "react"
import { createMetadata, SITE_URL } from "@/lib/seo"

export const metadata = createMetadata({
  title: "AI Execution Services in Algeria | Hawiyat AI Composer, n8n, Hosting",
  description:
    "Run your stack on the Hawiyat execution layer: Hawiyat AI Composer, n8n automation, Evolution API WhatsApp, and app hosting, priced in DZD with local support for Algeria.",
  path: "/services",
})

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hawiyat AI execution and managed services in Algeria",
  url: `${SITE_URL}/services`,
  itemListElement: [
    "Hawiyat AI Composer",
    "AI Composer access",
    "n8n Hosting",
    "Evolution API",
    "Application Hosting",
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
