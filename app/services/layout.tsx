import type { ReactNode } from "react"
import { createMetadata, SITE_URL } from "@/lib/seo"
import { services, type Service, type ServicePlan } from "@/lib/data/services"

export const metadata = createMetadata({
  title: "AI Services in Algeria | Composer, n8n, WhatsApp API",
  description:
    "Services in Algeria: n8n automation, WhatsApp API, and app hosting, priced in DZD with local support.",
  path: "/services",
})

/* The four cards rendered by the catalog: Composer, n8n, Evolution, Hawiyat Cloud.
   Prices/plans are read from lib/data/services.ts, never hardcoded here. */
function getService(id: string): Service {
  const service = services.find((s) => s.id === id)
  if (!service) throw new Error(`Unknown service id: ${id}`)
  return service
}

function offerFromPlan(plan: ServicePlan) {
  return {
    "@type": "Offer",
    name: plan.name,
    price: plan.price.replace(/,/g, ""),
    priceCurrency: "DZD",
    description: plan.tagline,
    availability: "https://schema.org/InStock",
  }
}

function offerCatalogFor(service: Service) {
  return {
    "@type": "OfferCatalog",
    name: service.name,
    itemListElement: (service.plans ?? [])
      .filter((plan) => !plan.custom)
      .map(offerFromPlan),
  }
}

const composer = getService("composer-pro")
const n8n = getService("n8n-hosting")
const evolution = getService("evolution-api")
const cloud = getService("hawiyat-cloud")

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hawiyat services in Algeria",
  description:
    "AI infrastructure services in Algeria: the Hawiyat AI Composer execution layer, managed n8n hosting, WhatsApp API via Evolution, and Hawiyat Cloud, billed in DZD.",
  url: `${SITE_URL}/services`,
  image: `${SITE_URL}/hawiyat.png`,
  provider: {
    "@type": "Organization",
    name: "Hawiyat",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    telephone: "+213-55-955-5951",
  },
  areaServed: {
    "@type": "Country",
    name: "Algeria",
  },
  serviceType: "Software-as-a-Service",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Hawiyat services in Algeria",
    itemListElement: [
      offerCatalogFor(composer),
      offerCatalogFor(n8n),
      offerCatalogFor(evolution),
      {
        "@type": "OfferCatalog",
        name: cloud.name,
        itemListElement: [
          {
            "@type": "Offer",
            name: `${cloud.name} by order`,
            priceCurrency: "DZD",
            description: cloud.description,
            availability: "https://schema.org/PreOrder",
          },
        ],
      },
    ],
  },
  dateModified: new Date().toISOString().split("T")[0],
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  )
}
