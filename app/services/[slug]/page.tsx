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

  return createMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${params.slug}` as `/${string}`,
  })
}

export default function ServicePage({ params, searchParams }: { params: { slug: string }, searchParams?: { plan?: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  // When arriving from a plan card on /services (e.g. ?plan=Freelance), show only that plan
  const activePlan = searchParams?.plan
  const plans = service.plans && activePlan
    ? service.plans.filter((p) => p.name === activePlan)
    : service.plans

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Hawiyat",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Algeria",
    },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "DZD",
      availability: "https://schema.org/InStock",
    },
  }

  const serviceData = {
    id: service.id,
    name: service.name,
    price: service.price,
    priceLabel: service.priceLabel,
    image: service.image,
    images: service.images
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main className="min-h-screen bg-background">
        {/* Back Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
                  <div className="relative aspect-video rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 to-muted/20 p-8 flex items-center justify-center overflow-hidden">
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
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    {service.name}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Ideal For */}
              <div className="pt-8 border-t border-border/40">
                <h2 className="text-sm font-semibold text-foreground mb-3">Ideal For</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.details.idealFor}
                </p>
              </div>
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
                />
              ) : (
                /* Single Price Card */
                <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
                  {/* Pricing Header */}
                  <div className="border-b border-border/60 bg-muted/30 p-6">
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight text-foreground">
                          {service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-2xl text-muted-foreground line-through">
                            {service.originalPrice}
                          </span>
                        )}
                        <span className="text-lg text-muted-foreground font-medium">
                          {service.priceLabel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        All-inclusive pricing • No hidden fees
                      </p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {service.details.whatYouGet.slice(0, 6).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                            <span className="text-muted-foreground mt-0.5">•</span>
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
      </main>
    </>
  )
}
