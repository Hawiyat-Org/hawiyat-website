"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { ArrowRight, Search, Zap, Clock, Shield, Server, Globe, MessageSquare, Bot, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.hawiyat.org"

const services = [
  {
    id: "n8n-hosting",
    name: "n8n Hosting",
    shortDesc: "Managed workflow automation platform",
    description: "A fully managed instance of n8n, the open-source workflow automation platform. Connect apps, automate tasks, and build AI-powered workflows without writing code. Hawiyat hosts it, keeps it running, and handles all updates and maintenance.",
    image: "/logos/n8n_n8n.png",
    price: "8,000",
    priceLabel: "DA/year",
    cta: "Get Started",
    link: `${appUrl}/services/n8n`,
    category: "Managed Services",
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
    id: "evolution-api",
    name: "Evolution API",
    shortDesc: "WhatsApp Business API solution",
    description: "A fully managed WhatsApp Business API instance. Enables businesses to send and receive WhatsApp messages programmatically — for customer support bots, notifications, order confirmations, and sales automation.",
    image: "/logos/evolutionapi_evolutionapi.png",
    price: "7,000",
    priceLabel: "DA/year",
    cta: "Get Started",
    link: `${appUrl}/services/evolution`,
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
    description: "Official WhatsApp Business API. Send notifications, build chatbots, engage customers at scale with Hawiyat's managed infrastructure. Hawiyat manages the infrastructure so you only integrate your system.",
    image: "/services/whatsapp-api.svg",
    price: "4,000",
    priceLabel: "DA/year",
    cta: "Get Started",
    link: `${appUrl}/services/whatsapp`,
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
    description: "A fully managed infrastructure monitoring service. Hawiyat watches your servers and websites 24/7 and sends instant alerts when something fails. Includes server health monitoring, website uptime checks, SSL expiry alerts, public status page, and monthly reliability reports.",
    image: "/services/monitoring.svg",
    price: "4,900",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: `${appUrl}/services/monitoring`,
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
      { name: "Starter", price: "4,900", servers: "1 VPS", websites: "3 sites", frequency: "Every 15 min" },
      { name: "Pro", price: "9,900", servers: "3 VPS", websites: "5 sites", frequency: "Every 5 min" },
      { name: "Premium", price: "17,900", servers: "5 VPS", websites: "10 sites", frequency: "Every 1 min" },
      { name: "Guardian", price: "25,900", servers: "5 VPS", websites: "10 sites", frequency: "Every 30 sec" },
    ],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    shortDesc: "AI-powered coding assistant",
    description: "AI-powered coding assistant integration. Get Claude's intelligence in your development workflow with context-aware suggestions and automated code reviews.",
    image: "/assets/images/brand-logos/claude.svg",
    price: "2,000",
    priceLabel: "DA/month",
    cta: "Get Started",
    link: `${appUrl}/services/claude`,
    category: "Managed Services",
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
]

function FlipCard({ service, index, isMobile, isVisible }: { service: typeof services[0]; index: number; isMobile: boolean; isVisible: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleInteraction = useCallback(() => {
    if (isMobile) {
      setIsFlipped(prev => !prev)
    }
  }, [isMobile])

  return (
    <div
      className={`group h-[420px] [perspective:1000px] ${isMobile ? "cursor-pointer" : ""} ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={handleInteraction}
    >
      <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${!isMobile ? "group-hover:[transform:rotateY(180deg)]" : ""} ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative h-full rounded-2xl border border-border/40 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative h-48 w-full bg-gradient-to-br from-muted/30 to-muted/10 dark:from-muted/10 dark:to-muted/5 flex items-center justify-center p-6">
              <div className="relative w-32 h-32">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />
            </div>

            <div className="relative p-5 space-y-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {service.category}
              </span>

              <h3 className="text-xl font-semibold">{service.name}</h3>

              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-2xl font-bold">{service.price}</span>
                <span className="text-xs text-muted-foreground">{service.priceLabel}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <span className="text-xs text-muted-foreground">{isMobile ? "Tap for details" : "Hover for details"}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="relative h-full rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/95 to-primary dark:from-primary/90 dark:to-primary/80 backdrop-blur-xl overflow-hidden shadow-lg shadow-primary/20">
            <div className="absolute inset-0 bg-white/10 dark:bg-white/5" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
            
            <div className="relative h-full p-6 flex flex-col text-white">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                <p className="text-sm text-white/80 line-clamp-2">{service.description}</p>
              </div>

              <div className="space-y-3 mb-4 flex-1">
                {service.bulletPoints.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <bullet.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{bullet.text}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <p className="text-xs text-white/90 font-medium mb-1">Use Cases:</p>
                <p className="text-xs text-white/80 leading-relaxed">{service.useCases}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{service.price}</span>
                  <span className="text-xs text-white/80">{service.priceLabel}</span>
                </div>
                <Link
                  href={service.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-white text-primary font-medium text-sm hover:bg-white/90 transition-colors duration-200"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

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
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-foreground/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Fully managed tools and APIs to accelerate your development, automate workflows, and scale your business.
          </p>
        </div>

        <div className={`max-w-md mx-auto mb-16 transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 text-sm bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border-border/60 focus:border-primary/50 rounded-xl"
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-3">No services found.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-sm underline hover:no-underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredServices.map((service, i) => (
              <FlipCard key={service.id} service={service} index={i} isMobile={isMobile} isVisible={isVisible} />
            ))}
          </div>
        )}

        <div className={`mt-20 max-w-4xl mx-auto transition-all duration-500 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-2xl font-semibold text-center mb-10">Why Choose Hawiyat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="p-6 rounded-xl border border-border/40 bg-white/30 dark:bg-white/[0.02] backdrop-blur-xl hover:bg-white/50 dark:hover:bg-white/[0.05] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
