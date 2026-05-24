"use client"

import { useState, useMemo, useEffect, useCallback, Suspense } from "react"
import { ArrowRight, Search, Zap, Clock, Shield,Calendar, Users  , Server, Globe, MessageSquare, Bot, BarChart3 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { OrderForm } from "@/components/services/order-form"

const services = [
  {
    id: "claude-code",
    name: "Claude Code",
    shortDesc: "AI-powered coding assistant",
    description: "AI-powered coding assistant integration. Get Claude's intelligence in your development workflow with context-aware suggestions and automated code reviews.",
    image: "services/claude-code.png",
    originalPrice: "20000 DA",
    price: "15000",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: "/services/claude",
    category: "Managed Services",
    tag: "Best Value",
    useCases: "Context-aware suggestions, automated code reviews, documentation generation, bug detection & fixes.",
    features: [
      "Context-aware suggestions",
      "Automated code reviews",
      "Documentation generation",
      "Bug detection & fixes",
      "Multi-language support",
    ],
    bulletPoints: [
      { icon: Zap, text: "AI-Powered" },
      { icon: Shield, text: "Code Reviews" },
      { icon: Clock, text: "Multi-Language" },
    ],
  },
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
    id: "evolution-api",
    name: "Evolution API",
    shortDesc: "WhatsApp Business API solution",
    description: "WhatsApp Business API instance. Enables businesses to send and receive WhatsApp messages programmatically — for customer support bots, notifications, and sales automation.",
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
    id: "whatsapp-api",
    name: "Hawiyat WhatsApp API",
    shortDesc: "Official WhatsApp Business API",
    description: "Official WhatsApp Business API. Send notifications, build chatbots, engage customers at scale with Hawiyat's managed infrastructure.",
    image: "/services/whatsapp-api.png",
    price: "7000",
    priceLabel: "DA/year",
    cta: "Get Started",
    link: "/services/whatsapp",
    category: "Managed Services",
    useCases: "Bulk messaging, chatbot builder, message templates, analytics & reporting.",
    features: [
      "Official Business API",
      "Bulk messaging support",
      "Chatbot builder included",
      "Message templates library",
      "Analytics & reporting",
    ],
    bulletPoints: [
      { icon: MessageSquare, text: "Official API" },
      { icon: Bot, text: "Chatbot Builder" },
      { icon: BarChart3, text: "Analytics" },
    ],
  },
  {
    id: "monitoring",
    name: "Hawiyat Monitoring",
    shortDesc: "Managed reliability service",
    description: "A fully managed infrastructure monitoring service. Hawiyat watches your servers and websites 24/7 and sends instant alerts when something fails.",
    image: "/services/monitoring.png",
    price: "4900",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: "/services/monitoring",
    category: "Managed Services",
    useCases: "Server health monitoring (CPU, RAM, disk, network), website and API uptime checks, SSL expiry alerts, public status page, monthly reliability reports.",
    features: [
      "Real-time performance metrics",
      "Custom alert thresholds",
      "Error tracking & logging",
      "Uptime monitoring",
      "Team collaboration tools",
    ],
    bulletPoints: [
      { icon: Server, text: "Server Health" },
      { icon: Globe, text: "Uptime Checks" },
      { icon: Shield, text: "24/7 Alerts" },
    ],
    tiers: [
      { name: "Starter", price: "4900", servers: "1 VPS", websites: "3 sites", frequency: "Every 15 min" },
      { name: "Pro", price: "9900", servers: "3 VPS", websites: "5 sites", frequency: "Every 5 min" },
      { name: "Premium", price: "17900", servers: "5 VPS", websites: "10 sites", frequency: "Every 1 min" },
      { name: "Guardian", price: "25900", servers: "5 VPS", websites: "10 sites", frequency: "Every 30 sec" },
    ],
  },
  {
  id: "cal-com",
  name: "Cal.com",
  shortDesc: "Open-source Calendly alternative for scheduling",
  description: "Cal.com is scheduling platform that lets users create custom booking pages,  Perfect for businesses and individuals looking for a flexible scheduling solution without vendor lock-in.",
  image: "/services/cal.png",
  price: "10000",
  priceLabel: "DA/Month",
  cta: "Get Started",
  link: "https://github.com/calcom/cal.com",
  category: "Open Source SaaS",
  tag: "Starter",
  useCases: "Booking pages, SaaS appointment systems, team scheduling, coaching sessions, interview scheduling, client meetings automation.",
  features: [
    "Open-source and self-hostable",
    "Multi-user team scheduling",
    "Google Calendar / Outlook sync",
    "Zoom / Google Meet integrations",
    "Custom booking pages",
    "Availability & timezone management",
    "API for automation & integrations"
  ],
  bulletPoints: [
    { icon: Calendar, text: "Smart Scheduling" },
    { icon: Users, text: "Team Support" },
    { icon: Globe, text: "Multi-Calendar Sync" }
  ],
}
 
]

const tagStyleMap: Record<string, string> = {
  Popular: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  "Best Value": "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
  VIP: "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black shadow-amber-500/30",
  Starter: "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
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
  onOrderClick: (service: { id: string; name: string; price: string; priceLabel: string; image: string }) => void
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleInteraction = useCallback(() => {
    if (isMobile) setIsFlipped((prev) => !prev)
  }, [isMobile])

  return (
    <div
      // No fixed height — let the card define its own size via min-h
      // perspective is set for the 3D flip effect
      className={`group [perspective:1000px] ${isMobile ? "cursor-pointer" : ""} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={handleInteraction}
    >
      {/* Inner wrapper — must have a defined height for backface to work */}
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

            {/* Image area */}
            <div className="relative h-48 w-full shrink-0 bg-gradient-to-br from-muted/30 to-muted/10 dark:from-muted/20 dark:to-muted/10 flex items-center justify-center p-6">
              {service.tag && (
                <div className="absolute top-3 right-3 z-10">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${tagStyleMap[service.tag] || "bg-primary text-white"}`}>
                    {service.tag}
                  </span>
                </div>
              )}

              <div className="relative w-32 h-32">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative p-5  flex flex-col flex-1">
              <span className="inline-flex mb-1 items-center self-start px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {service.category}
              </span>

              <h3 className="text-xl font-semibold">{service.name}</h3>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {service.shortDesc}
              </p>
            
            <div className="mt-auto">
                {service.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground line-through">{service.originalPrice}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">Save</span>
                  </div>
                )}
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

            {/* Scrollable content area so nothing overflows */}
            <div className="relative flex flex-col flex-1 p-6 text-foreground">
              {/* Header */}
              <div className="mb-4 shrink-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  {service.tag && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${tagStyleMap[service.tag]?.replace("shadow-lg", "") || "bg-primary/10 text-primary"}`}>
                      {service.tag}
                    </span>
                  )}
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

              {/* Price + CTA — always at bottom, never clipped */}
              <div className="mt-auto shrink-0 space-y-3">
                <div>
                  {service.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground line-through">{service.originalPrice}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">Save</span>
                    </div>
                  )}
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
                      image: service.image,
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
          // gap-y-8 instead of gap-y-24 — cards now naturally size themselves
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {filteredServices.map((service, i) => (
              <FlipCard
                key={service.id}
                service={service}
                index={i}
                isMobile={isMobile}
                isVisible={isVisible}
                onOrderClick={(svc) => setSelectedService(svc)}
              />
            ))}
          </div>
        )}

        {selectedService && (
          <OrderForm service={selectedService} onClose={() => setSelectedService(null)} />
        )}

        {/* Why Choose Hawiyat */}
        <div
          className={`mt-20 max-w-6xl mx-auto transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl font-medium text-center mb-12 max-md:text-3xl">Why Choose Hawiyat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {[
              { icon: Globe, title: "Local Team", desc: "Based in Algeria, same timezone, support in Arabic and French" },
              { icon: Shield, title: "Flat Pricing", desc: "Fixed monthly price, no usage surprises or hidden fees" },
              { icon: Zap, title: "Fully Managed", desc: "You use the service, we run the infrastructure" },
              { icon: Server, title: "Production-Tested", desc: "Same infrastructure powers 60+ live clients" },
              { icon: MessageSquare, title: "Reachable", desc: "Support via WhatsApp, not a foreign ticket system" },
              { icon: Clock, title: "24/7 Monitoring", desc: "Round-the-clock reliability and instant alerts" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-md p-6 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-4 box-border"
              >
                <item.icon className="w-16 h-16 text-black dark:text-white mx-auto" />
                <h3 className="text-2xl text-center">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 px-2 text-center text-sm break-words">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}