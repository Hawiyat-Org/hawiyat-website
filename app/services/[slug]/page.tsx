import { notFound } from "next/navigation"
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/data/services"
import { createMetadata, SITE_URL } from "@/lib/seo"
import { SkeletonImage } from "@/components/image-with-skeleton"
import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { ServicePlans, type ServicePlan } from "@/components/services/service-plans"
import { ServiceOrderForm } from "@/components/services/service-order-form"

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

// Only the static slugs below exist (composer, n8n, evolution, hawiyat-cloud);
// anything else is a real 404, not a soft one.
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  // Use the service's own product image for social/WhatsApp previews
  const serviceImage = service.images?.[0] || service.image

  return createMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${slug}` as `/${string}`,
    image: serviceImage,
    modifiedTime: "2026-08-09",
  })
}

// hawiyat-cloud is the single "Hawiyat Cloud" by-order offering (hosting-basic and
// hosting-vip 308-redirect here). There are no Basic/VIP tiers: the URL renders the
// contact card and the team plans the deployment.
export default async function ServicePage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams?: Promise<{ plan?: string }> }) {
  const { slug } = await params
  const { plan } = (await searchParams) ?? {}
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const relatedServices = getAllServiceSlugs()
    .filter((s) => s !== slug)
    .map((s) => getServiceBySlug(s)!)
    .filter(Boolean)
    .slice(0, 4)

  const isUnavailable = service.availability === "unavailable"
  const isContact = service.availability === "contact"

  const plans: ServicePlan[] | undefined = service.plans

  // Preselect a plan when arriving with ?plan= (matches a plan name)
  const defaultPlan =
    plans && plan && plans.some((p) => p.name === plan)
      ? plan
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
            itemListElement: plans.filter((plan) => !plan.custom).map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price.replace(/,/g, ""),
              priceCurrency: "DZD",
              description: plan.tagline,
              availability: isUnavailable
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            })),
          }
        : isContact
          ? undefined
          : {
              "@type": "Offer",
              price: service.price.replace(/,/g, ""),
              priceCurrency: "DZD",
              availability: isUnavailable
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
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
    // Clean display name; the form joins "name {tag}" into the order record
    // so orders/emails show e.g. "Hawiyat AI Composer Pro"
    name: service.name,
    tag: service.tag,
    price: service.price,
    priceLabel: service.priceLabel,
    image: service.image,
    images: service.images
  }

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
                  <div className="relative aspect-video rounded-lg border border-border/60 bg-gradient-to-br from-surface-dim/40 to-surface-dim/20 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                    {service.tag && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-signal text-signal-text">
                          {service.tag}
                        </span>
                      </div>
                    )}
                    {service.images ? (
                      <div className="flex items-center justify-center gap-4 sm:gap-8">
                        {service.images.map((img, idx) => (
                          <div key={idx} className="relative w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
                            <SkeletonImage
                              src={img}
                              alt={`${service.name} ${idx + 1}`}
                              fill
                              imgClassName="object-contain drop-shadow-lg"
                              priority
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-64 lg:h-64">
                        <SkeletonImage
                          src={service.image!}
                          alt={service.name}
                          fill
                          imgClassName="object-contain drop-shadow-lg"
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
                  {service.details.idealFor && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-xs font-mono uppercase tracking-widest text-muted-ink">
                        Ideal For
                      </p>
                      <p className="text-sm text-muted-ink leading-relaxed">
                        {service.details.idealFor}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Content Blocks for AI Search - collapsed behind a disclosure */}
              {service.seoContent && (
                <details className="group rounded-lg border border-border bg-surface open:shadow-sm">
                  <summary className="flex cursor-pointer select-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden list-none">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-ink">
                      More about {service.name}
                    </span>
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-ink transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="space-y-8 px-5 pb-5">
                    <div>
                      <h2 className="text-xl font-semibold text-ink mb-3">What is {service.name}?</h2>
                      <p className="text-sm text-muted-ink leading-relaxed">
                        {service.seoContent.whatIs}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-ink mb-3">Why {service.name}?</h2>
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
                </details>
              )}

              {/* FAQ Section - collapsed behind a disclosure */}
              {service.faq && service.faq.length > 0 && (
                <details className="group rounded-lg border border-border bg-surface open:shadow-sm">
                  <summary className="flex cursor-pointer select-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden list-none">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-ink">
                      Questions &amp; answers
                    </span>
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-ink transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="space-y-4 px-5 pb-5">
                    {service.faq.map((item, idx) => (
                      <div key={idx}>
                        <h3 className="text-base font-medium text-ink mb-2">{item.question}</h3>
                        <p className="text-sm text-muted-ink leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>

            {/* Right Column - Pricing & CTA */}
            <div className="lg:sticky lg:top-8">
              {isUnavailable ? (
                /* Availability Notice. Copy is hardcoded for hosting (the only gated service).
                   When a second service is gated, derive heading/body from `service` + the
                   still-open services instead of hardcoding. */
                <div className="rounded-lg border border-border/60 bg-surface shadow-sm overflow-hidden">
                  <div className="border-b border-border/60 bg-surface-dim/30 p-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                      Availability
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                      Hosting is temporarily unavailable
                    </h2>
                  </div>
                  <div className="p-6 space-y-5">
                    <p className="text-sm text-muted-ink leading-relaxed">
                      We are not taking new hosting orders right now. The rest of the stack is open:
                      Composer plans, n8n, and WhatsApp infrastructure are available.
                    </p>
                    <div className="space-y-3">
                      <Link
                        href="/#pricing"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
                      >
                        See Composer plans in DZD
                      </Link>
                      <a
                        href={`https://wa.me/213559555951?text=${encodeURIComponent(
                          "Hello Hawiyat! I have a question about Hosting availability."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ) : isContact ? (
                /* By Order Cloud Card (Hawiyat Cloud). No tiers, no fixed price: the
                   team plans the deployment and quotes in DZD. */
                <div className="rounded-lg border border-border/60 bg-surface shadow-sm overflow-hidden">
                  <div className="border-b border-border/60 bg-surface-dim/30 p-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                      Cloud
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                      By order
                    </h2>
                    <p className="mt-3 text-sm text-muted-ink leading-relaxed">
                      Tell us what you need to run, and we will plan the deployment on our cloud, containers, VPS, or Kubernetes, and quote you in DZD.
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-ink">
                        What&apos;s included
                      </h3>
                      <ul className="space-y-2">
                        {[...service.features, "Support in Arabic, French, and English"].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-ink/80">
                            <span className="text-muted-ink mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3 pt-2">
                      <a
                        href={`https://wa.me/213559555951?text=${encodeURIComponent(
                          "Hello Hawiyat! I would like to plan a Cloud deployment."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
                      >
                        Plan a Cloud deployment
                      </a>
                      <a
                        href="mailto:contact@hawiyat.org"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                      >
                        Email the team
                      </a>
                    </div>
                  </div>
                </div>
              ) : plans && plans.length > 0 ? (
                <ServicePlans
                  plans={plans}
                  serviceId={service.id}
                  serviceName={service.name}
                  serviceImage={service.image}
                  serviceImages={service.images}
                  fairUse={service.fairUse}
                  disclaimer={service.disclaimer}
                  defaultPlan={defaultPlan}
                  contactOnly={isContact}
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

        <div className="mx-auto mt-20 max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Keep building the stack
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Related services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-lg border border-border bg-surface p-5 transition-colors hover:border-signal/50"
              >
                <h3 className="font-mono text-sm font-semibold text-ink">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink line-clamp-2">
                  {s.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
