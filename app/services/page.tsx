"use client"

import { useState, useMemo, useEffect, useCallback, Suspense } from "react"
import { ArrowRight, Search, Zap, Clock, Shield, Server, MessageSquare, Bot } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { OrderForm } from "@/components/services/order-form"

const services = [
  {
    id: "n8n-hosting",
    name: "n8n Hosting",
    shortDesc: "Managed workflow automation platform",
    description: "A fully managed instance of n8n, the open-source workflow automation platform. Connect apps, automate tasks, and build AI-powered workflows without writing code.",
    image: "/services/n8n-hosting.png",
    price: "8000",
    priceLabel: "DA/year",
    cta: "Get Started",
    link: "/services/n8n",
    category: "Managed Services",
    tag: "Popular",
    useCases: "Automating WhatsApp replies, connecting CRMs, triggering actions from form submissions, AI pipelines, scheduled tasks.",
    features: [
      "Fully managed instances",
      "Auto-scaling infrastructure",
      "99.9% uptime guarantee",
      "One-click deployment",
      "24/7 monitoring",
    ],
    bulletPoints: [
      { icon: Zap, text: "Instant Deployment" },
      { icon: Clock, text: "24/7 Uptime" },
      { icon: Shield, text: "Fully Managed" },
    ],
  },
  {
    id: "composer-pro",
    name: "Hawiyat Composer + Claude Code",
    shortDesc: "2x credits|No daily or weekly limits, deliver projects in time",
    description: "2x Claude Pro credits with Hawiyat Composer caching. No daily or weekly limits ever.",
    images: ["/services/hawiyat%20composer.png", "/services/claude-code.png"],
    price: "6000",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: "/services/claude",
    category: "Managed Services",
    tag: "Pro",
    useCases: "Individual developers, freelancers, and small projects needing reliable AI coding assistance without usage anxiety.",
    features: [
      "2x Claude Pro credit quota",
      "No daily or weekly limits",
      "Hawiyat Composer caching layer",
      "Context-aware suggestions",
      "Automated code reviews",
      "Multi-language support",
    ],
    bulletPoints: [
      { icon: Zap, text: "2x Credits" },
      { icon: Shield, text: "No Daily/Weekly Caps" },
      { icon: Clock, text: "LLM Optimization" },
    ],
  },
  {
    id: "hosting-basic",
    name: "Hosting Basic",
    shortDesc: "Single app hosting with basic resources",
    description: "Simple and affordable hosting for a single application. Perfect for personal projects, portfolios, or small websites. Includes SSL, automatic deployments, and basic monitoring.",
    image: "/logo.svg",
    price: "1000",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: "/services",
    category: "Hosting",
    tag: "Starter",
    useCases: "Personal portfolios, small websites, demo projects, single-page applications.",
    features: [
      "1 application",
      "Free SSL certificate",
      "Automatic deployments",
      "Basic monitoring",
      "512MB RAM",
    ],
    bulletPoints: [
      { icon: Server, text: "1 App" },
      { icon: Shield, text: "Free SSL" },
      { icon: Zap, text: "Auto Deploy" },
    ],
  },
  {
    id: "evolution-api",
    name: "Evolution API",
    shortDesc: "WhatsApp Business API solution",
    description: "WhatsApp Business API instance. Enables businesses to send and receive WhatsApp messages programmatically for customer support bots, notifications, and sales automation.",
    image: "/logos/evolutionapi_evolutionapi.png",
    price: "7000",
    priceLabel: "DA/year",
    cta: "Get Started",
    link: "/services/evolution",
    category: "Managed Services",
    useCases: "WhatsApp chatbots, automated order notifications, customer support automation, bulk messaging.",
    features: [
      "Official Business API",
      "Multi-channel support",
      "Webhook integrations",
      "Message queuing system",
      "Rate limiting & throttling",
    ],
    bulletPoints: [
      { icon: MessageSquare, text: "Multi-Channel" },
      { icon: Bot, text: "Chatbot Ready" },
      { icon: Shield, text: "Fully Managed" },
    ],
  },
  {
    id: "composer-max5x",
    name: "Hawiyat Composer + Claude Code",
    shortDesc: "5x credits|No daily or weekly limits, deliver projects in time",
    description: "5x Claude capacity + semantic caching & smart routing. No daily or weekly limits ever.",
    images: ["/services/hawiyat%20composer.png", "/services/claude-code.png"],
    price: "15000",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: "/services/claude",
    category: "Managed Services",
    tag: "Max 5X",
    useCases: "Professional developers, startups, and small teams shipping daily and needing consistent high-volume AI access.",
    features: [
      "5x Claude Pro credit quota",
      "No daily or weekly limits",
      "Semantic caching (vector-based)",
      "Smart provider routing",
      "Context-aware suggestions",
      "Automated code reviews",
      "Multi-language support",
    ],
    bulletPoints: [
      { icon: Zap, text: "5x Credits" },
      { icon: Shield, text: "No Daily/Weekly Caps" },
      { icon: Clock, text: "LLM Optimization" },
    ],
  },
  {
    id: "composer-max20x",
    name: "Hawiyat Composer + Claude Code",
    shortDesc: "20x credits|No daily or weekly limits, deliver projects in time",
    description: "20x Claude capacity + Fable & Opus level models, GDPR compliance. No daily or weekly limits ever.",
    images: ["/services/hawiyat%20composer.png", "/services/claude-code.png"],
    price: "30000",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: "/services/claude",
    category: "Managed Services",
    tag: "Max 20X",
    useCases: "Agencies, engineering teams, and power users who need maximum AI throughput with enterprise-grade optimization.",
    features: [
      "20x Claude Pro credit quota",
      "No daily or weekly limits",
      "Exact-match + semantic caching",
      "Smart provider routing",
      "Hybrid data compliance",
      "Multi-agent traffic resolution",
      "Context-aware suggestions",
      "Automated code reviews",
      "Multi-language support",
      "Priority support",
    ],
    bulletPoints: [
      { icon: Zap, text: "20x Credits" },
      { icon: Clock, text: "No Daily/Weekly Caps" },
      { icon: Shield, text: "GDPR Compliance" },
    ],
  },
  {
    id: "hosting-vip",
    name: "Hosting VIP",
    shortDesc: "Premium hosting with 2 apps + database",
    description: "Premium hosting for up to 2 applications with a managed database. Ideal for growing projects that need more power, a database, and priority support.",
    image: "/logo.svg",
    price: "2000",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: "/services",
    category: "Hosting",
    tag: "VIP",
    useCases: "Full-stack apps, SaaS projects, apps with databases, e-commerce sites.",
    features: [
      "2 applications",
      "Managed database included",
      "Free SSL certificate",
      "Automatic deployments",
      "Priority support",
      "1GB RAM",
    ],
    bulletPoints: [
      { icon: Server, text: "2 Apps + DB" },
      { icon: Shield, text: "Free SSL" },
      { icon: Clock, text: "Priority Support" },
    ],
  },
  {
    id: "llm-credit",
    name: "LLM Credit",
    shortDesc: "OpenAI credits served through Hawiyat Composer",
    description: "LLM credits powered by Hawiyat Composer's optimization gateway. Access OpenAI models with built-in caching, smart routing, and reduced token waste.",
    image: "/services/openai.png",
    price: "2500",
    priceLabel: "DA for 10 USD credits",
    cta: "Get Started",
    link: "/services",
    category: "Managed Services",
    tag: "Starter",
    useCases: "Developers and teams who want OpenAI access with Hawiyat Composer's caching, routing, and cost optimization built in.",
    features: [
      "OpenAI model access",
      "Hawiyat Composer caching layer",
      "Smart request routing",
      "Token usage optimization",
      "No daily or weekly limits",
    ],
    bulletPoints: [
      { icon: Zap, text: "OpenAI Access" },
      { icon: Shield, text: "Composer Optimized" },
      { icon: Clock, text: "No Limits" },
    ],
  },
]

const tagStyleMap: Record<string, string> = {
  Popular: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  "Most Popular": "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
  Premium: "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black shadow-amber-500/30",
  "Best Value": "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
  VIP: "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
  Starter: "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
  Basic: "bg-gradient-to-r from-sky-500 to-blue-500 text-white",
  Pro: "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
  Team: "bg-gradient-to-r from-rose-500 to-pink-600 text-white",
  "Max 5X": "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  "Max 20X": "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black shadow-amber-500/30",
}

function FlipCard({
  service,
  index,
  isMobile,
  isVisible,
  onOrderClick,
}: {
  service: (typeof services)[0]
  index: number
  isMobile: boolean
  isVisible: boolean
  onOrderClick: (service: { id: string; name: string; price: string; priceLabel: string; image: string; images?: string[] }) => void
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleInteraction = useCallback(() => {
    if (isMobile) setIsFlipped((prev) => !prev)
  }, [isMobile])

  return (
    <div
      // No fixed height  let the card define its own size via min-h
      // perspective is set for the 3D flip effect
      className={`group [perspective:1000px] ${isMobile ? "cursor-pointer" : ""} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={handleInteraction}
    >
      {/* Inner wrapper  must have a defined height for backface to work */}
      {/* We use min-h + h-full trick: outer sets min-h, inner fills it */}
      <div
        className={`relative min-h-[480px] h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          !isMobile ? "group-hover:[transform:rotateY(180deg)]" : ""
        } ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
         {/* ── FRONT FACE ── */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative h-full rounded-2xl border border-border/40 bg-white/40 dark:bg-secondary dark:border-border/60 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {service.tag && (
              <div className="absolute top-3 right-3 z-10">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${tagStyleMap[service.tag] || "bg-primary text-white"}`}>
                  {service.tag}
                </span>
              </div>
            )}

            {/* Image area */}
            <div className="relative h-52 w-full shrink-0 bg-gradient-to-br from-muted/30 to-muted/10 dark:from-muted/20 dark:to-muted/10 flex items-center justify-center gap-2 p-4">

              {"images" in service && service.images ? (
                <div className="flex items-center justify-center gap-1">
                  <div className={`relative flex-shrink-0 ${service.images[1].includes("claude-code") ? "w-[110px] h-[110px]" : "w-[130px] h-[120px]"}`}>
                    <Image
                      src={service.images[0]}
                      alt={`${service.name}`}
                      fill
                      className="object-contain drop-shadow-md"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-2xl font-light text-foreground/30 mx-0.5 select-none">+</span>
                  <div className={`relative flex-shrink-0 ${service.images[1].includes("claude-code") ? "w-[125px] h-[120px]" : "w-[110px] h-[120px]"}`}>
                    <Image
                      src={service.images[1]}
                      alt={`${service.name}`}
                      fill
                      className="object-contain drop-shadow-md"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-36 h-32">
                  <Image
                    src={service.image || ""}
                    alt={service.name}
                    fill
                    className="object-contain drop-shadow-lg"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative p-5  flex flex-col flex-1">
              <span className="inline-flex mb-1 items-center self-start px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {service.category}
              </span>

              <h3 className="text-xl font-semibold">{service.name}</h3>

              <div className="text-sm text-muted-foreground leading-relaxed">
                {service.shortDesc.split("|").length > 1 ? (
                  <>
                    <span className="block font-semibold text-foreground">{service.shortDesc.split("|")[0]}</span>
                    <span className="block text-muted-foreground">{service.shortDesc.split("|")[1]}</span>
                  </>
                ) : (
                  <span>{service.shortDesc}</span>
                )}
              </div>
            
            <div className="mt-auto">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{service.price}</span>
                  <span className="text-xs text-muted-foreground">{service.priceLabel}</span>
                </div>
              </div>

              {/* Pushed to bottom */}
              <div className="flex items-center justify-between pt-3 border-t border-border/30 ">
                <span className="text-xs text-muted-foreground">
                  {isMobile ? "Tap for details" : "Hover for details"}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
              </div>
           
            </div>
            
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="relative h-full rounded-2xl border border-border/60 bg-card dark:bg-secondary backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

            {service.tag && (
              <div className="absolute top-3 right-3 z-10">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${tagStyleMap[service.tag] || "bg-primary text-white"}`}>
                  {service.tag}
                </span>
              </div>
            )}

            {/* Scrollable content area so nothing overflows */}
            <div className="relative flex flex-col flex-1 p-6 text-foreground">
              {/* Header */}
              <div className="mb-4 shrink-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>

              {/* Bullet points */}
              <div className="space-y-2.5 mb-4 shrink-0">
                {service.bulletPoints.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                      <bullet.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{bullet.text}</span>
                  </div>
                ))}
              </div>

              {/* Price + CTA  always at bottom, never clipped */}
              <div className="mt-auto shrink-0 space-y-3">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{service.price}</span>
                    <span className="text-xs text-muted-foreground">{service.priceLabel}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onOrderClick({
                      id: service.id,
                      name: service.name,
                      price: service.price,
                      priceLabel: service.priceLabel,
                      image: "images" in service && service.images ? service.images[0] : (service.image || "/logo.svg"),
                      images: "images" in service ? service.images : undefined,
                    })
                  }}
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex items-center justify-center">Loading...</div>}>
      {!mounted ? (
        <div className="min-h-screen pt-32 flex items-center justify-center">Loading...</div>
      ) : (
        <ServicesContent />
      )}
    </Suspense>
  )
}

function ServicesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState<{
    id: string
    name: string
    price: string
    priceLabel: string
    image: string
    images?: string[]
  } | null>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const filteredServices = useMemo(() => {
    if (!searchQuery) return services
    const q = searchQuery.toLowerCase()
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.features.some((f) => f.toLowerCase().includes(q)) ||
        s.useCases.toLowerCase().includes(q)
    )
  }, [searchQuery])

  return (
    <div className="  relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute  hero-section dark:opacity-80 opacity-10 inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-foreground/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      

      <div className="relative  mx-auto max-w-7xl px-6">
        {/* Heading */}
  

        {/* Search */}
        <div
          className={`max-w-lg  mx-auto mb-16 transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/60 z-10 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value
                setSearchQuery(value)
                const params = new URLSearchParams(searchParams.toString())
                if (value) {
                  params.set("q", value)
                } else {
                  params.delete("q")
                }
                router.replace(`/services?${params.toString()}`, { scroll: false })
              }}
              className="h-14 pl-12 text-base bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border-2 border-border/60 focus:border-primary rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        {/* Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-3">No services found.</p>
            <button onClick={() => setSearchQuery("")} className="text-sm underline hover:no-underline">
              Clear search
            </button>
          </div>
        ) : (
          // gap-y-8 instead of gap-y-24  cards now naturally size themselves
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {filteredServices.map((service, i) => (
              <FlipCard
                key={service.id}
                service={service}
                index={i}
                isMobile={isMobile}
                isVisible={isVisible}
                onOrderClick={(svc) => setSelectedService(svc as { id: string; name: string; price: string; priceLabel: string; image: string; images?: string[] })}
              />
            ))}
          </div>
        )}

        {selectedService && (
          <OrderForm service={selectedService} onClose={() => setSelectedService(null)} />
        )}

      </div>
    </div>
  )
}