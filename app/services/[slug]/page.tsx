import { notFound } from "next/navigation"
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/data/services"
import { createMetadata, SITE_URL } from "@/lib/seo"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ServicePlans } from "@/components/services/service-plans"
import { ServiceOrderForm } from "@/components/services/service-order-form"

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}

  // Use the service's own product image for social/WhatsApp previews
  const serviceImage = service.images?.[0] || service.image

  return createMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${params.slug}` as `/${string}`,
    image: serviceImage,
    modifiedTime: new Date().toISOString(),
  })
}

// hosting-basic and hosting-vip are separate single-price services. The detail page
// folds them into a synthetic Basic/VIP plan list so either URL renders the tier selector.
const HOSTING_SLUGS = ["hosting-basic", "hosting-vip"]

export default function ServicePage({ params, searchParams }: { params: { slug: string }, searchParams?: { plan?: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const isHosting = HOSTING_SLUGS.includes(params.slug)

  let plans = service.plans
  if (isHosting) {
    const hostingBasic = getServiceBySlug("hosting-basic")
    const hostingVip = getServiceBySlug("hosting-vip")
    if (hostingBasic && hostingVip) {
      plans = [
        {
          name: "Basic",
          price: "1,000",
          priceLabel: "DA/month",
          tagline: "One app in a managed container. SSL, auto-deploy, monitoring.",
          features: hostingBasic.features,
        },
        {
          name: "VIP",
          price: "2,000",
          priceLabel: "DA/month",
          tagline: "Two apps plus a managed database, with priority support.",
          features: hostingVip.features,
        },
      ]
    }
  }

  // Preselect a plan when arriving with ?plan= (matches a plan name)
  const defaultPlan =
    plans && searchParams?.plan && plans.some((p) => p.name === searchParams.plan)
      ? searchParams.plan
      : undefined

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    image: service.images?.[0] || service.image || `${SITE_URL}/hawiyat.png`,
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
    serviceType: service.category,
    hasOfferCatalog:
      plans && plans.length > 0
        ? {
            "@type": "OfferCatalog",
            name: `${service.name} Plans`,
            itemListElement: plans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price.replace(/,/g, ""),
              priceCurrency: "DZD",
              description: plan.tagline,
              availability: "https://schema.org/InStock",
            })),
          }
        : {
            "@type": "Offer",
            price: service.price.replace(/,/g, ""),
            priceCurrency: "DZD",
            availability: "https://schema.org/InStock",
          },
    dateModified: new Date().toISOString().split("T")[0],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  }

  const faqSchema =
    service.faq && service.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((qa) => ({
            "@type": "Question",
            name: qa.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: qa.answer,
            },
          })),
        }
      : null

  const serviceData = {
    id: service.id,
    // Clean display name; the form appends " {tag}" to the order record
    // so orders/emails show e.g. "Hawiyat AI Composer Pro  Pro"
    name: service.name,
    tag: service.tag,
    price: service.price,
    priceLabel: service.priceLabel,
    image: service.image,
    images: service.images
  }

  // Mobile quick price: shown under the title/description on small screens only
  // (desktop already shows it in the sticky pricing card on the right).
  // Single-price services, or a single plan filtered by ?plan=, get their price here.
  // Hosting renders the Basic/VIP selector, so pricing lives in the selector card.
  const singlePlan = plans && plans.length === 1 ? plans[0] : null
  const mobilePrice = isHosting
    ? null
    : singlePlan
      ? { price: singlePlan.price, priceLabel: singlePlan.priceLabel, originalPrice: singlePlan.originalPrice }
      : !service.plans || service.plans.length === 0
        ? { price: service.price, priceLabel: service.priceLabel, originalPrice: service.originalPrice }
        : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema].filter(Boolean)) }} />

      <div className="min-h-screen">
        {/* Back Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </Link>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4  pb-40 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Product Info */}
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="space-y-6">
                {/* Hero Image */}
                {(service.image || service.images) && (
                  <div className="relative aspect-video rounded-lg border border-border/60 bg-gradient-to-br from-surface-dim/40 to-surface-dim/20 p-8 flex items-center justify-center overflow-hidden">
                    {service.tag && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-signal text-signal-text">
                          {service.tag}
                        </span>
                      </div>
                    )}
                    {service.images ? (
                      <div className="flex items-center justify-center gap-8">
                        {service.images.map((img, idx) => (
                          <div key={idx} className="relative w-32 h-32 lg:w-40 lg:h-40">
                            <Image
                              src={img}
                              alt={`${service.name} ${idx + 1}`}
                              fill
                              className="object-contain drop-shadow-lg"
                              priority
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                        <Image
                          src={service.image!}
                          alt={service.name}
                          fill
                          className="object-contain drop-shadow-lg"
                          priority
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Title & Description */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
                    {service.name}
                  </h1>
                  <p className="text-lg text-muted-ink leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Mobile quick price (desktop shows it in the sticky pricing card) */}
                {mobilePrice && (
                  <div className="lg:hidden -mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight text-ink">{mobilePrice.price}</span>
                      {mobilePrice.originalPrice && (
                        <span className="text-2xl text-muted-ink line-through">{mobilePrice.originalPrice}</span>
                      )}
                      <span className="text-lg text-muted-ink font-medium">{mobilePrice.priceLabel}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Ideal For */}
              <div className="pt-8 border-t border-border/40">
                <h2 className="text-sm font-semibold text-ink mb-3">Ideal For</h2>
                <p className="text-sm text-muted-ink leading-relaxed">
                  {service.details.idealFor}
                </p>
              </div>

              {/* SEO Content Blocks for AI Search */}
              {service.seoContent && (
                <div className="space-y-8 pt-8 border-t border-border/40">
                  <div>
                    <h2 className="text-xl font-semibold text-ink mb-3">What is {service.name}?</h2>
                    <p className="text-sm text-muted-ink leading-relaxed">
                      {service.seoContent.whatIs}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-ink mb-3">Why Choose Hawiyat for {service.name}?</h2>
                    <p className="text-sm text-muted-ink leading-relaxed">
                      {service.seoContent.whyChoose}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-ink mb-3">How Does {service.name} Work?</h2>
                    <p className="text-sm text-muted-ink leading-relaxed">
                      {service.seoContent.howItWorks}
                    </p>
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {service.faq && service.faq.length > 0 && (
                <div className="space-y-4 pt-8 border-t border-border/40">
                  <h2 className="text-xl font-semibold text-ink">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faq.map((item, idx) => (
                      <div key={idx}>
                        <h3 className="text-base font-medium text-ink mb-2">{item.question}</h3>
                        <p className="text-sm text-muted-ink leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Pricing & CTA */}
            <div className="lg:sticky lg:top-8">
              {plans && plans.length > 0 ? (
                <ServicePlans
                  plans={plans}
                  serviceId={service.id}
                  serviceName={service.name}
                  serviceImage={service.image}
                  serviceImages={service.images}
                  fairUse={service.fairUse}
                  disclaimer={service.disclaimer}
                  defaultPlan={defaultPlan}
                />
              ) : (
                /* Single Price Card */
                <div className="rounded-lg border border-border/60 bg-surface shadow-sm overflow-hidden">
                  {/* Pricing Header */}
                  <div className="border-b border-border/60 bg-surface-dim/30 p-6">
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight text-ink">
                          {service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-2xl text-muted-ink line-through">
                            {service.originalPrice}
                          </span>
                        )}
                        <span className="text-lg text-muted-ink font-medium">
                          {service.priceLabel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-ink">
                        All-inclusive pricing • No hidden fees
                      </p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-ink">
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-2">
                        {service.details.whatYouGet.slice(0, 6).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-ink/80">
                            <span className="text-muted-ink mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-2">
                      <ServiceOrderForm service={serviceData} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
