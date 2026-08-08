"use client"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"
import { OrderForm } from "@/components/services/order-form"

export default function Pricing() {
  const [selectedService, setSelectedService] = useState<{
    id: string
    name: string
    price: string
    priceLabel: string
    image: string
  } | null>(null)
  const [maxTier, setMaxTier] = useState<"5X" | "20X">("5X")
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '213559555951'
  const enterpriseMessage = encodeURIComponent('Hello! I want to discuss the Hawiyat Composer Enterprise plan.')
  const enterpriseWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${enterpriseMessage}`

  const maxPlans = {
    "5X": {
      name: "Hawiyat Composer MAX 5X",
      tag: "Max 5X",
      tagClass: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      price: "15,000",
      desc: "5x Claude capacity with semantic caching and smart routing. For daily shippers.",
      features: [
        '5x Claude Pro credit quota',
        'No daily or weekly limits',
        'Semantic caching (vector-based)',
        'Smart provider routing',
        'Context-aware suggestions',
        'Automated code reviews',
      ],
      order: { id: "composer-max5x", name: "Composer MAX 5X", price: "15000" },
    },
    "20X": {
      name: "Hawiyat Composer MAX 20X",
      tag: "Max 20X",
      tagClass: "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black shadow-amber-500/30",
      price: "30,000",
      desc: "20x Claude capacity with Fable & Opus models, GDPR compliance. For teams and agencies.",
      features: [
        '20x Claude Pro credit quota',
        'No daily or weekly limits',
        'Exact-match + semantic caching',
        'Smart provider routing',
        'Hybrid data compliance',
        'Multi-agent traffic resolution',
        'Priority support',
      ],
      order: { id: "composer-max20x", name: "Composer MAX 20X", price: "30000" },
    },
  } as const

  const maxPlan = maxPlans[maxTier]

  return (
    <section id="pricing" ref={sectionRef} className="pt-8 pb-10 md:pt-12 md:pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl space-y-6 text-center"
        >
          <h2 className="text-center text-4xl font-semibold lg:text-5xl">
            Plans That Scale With You
          </h2>
          <p className="text-muted-foreground">
            Hawiyat Composer for AI costs, AI Automation for everything else. Or both.
          </p>
        </motion.div>

        {/* Composer Plans */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-0">
          {/* PRO */}
          <div className="rounded-lg flex flex-col bg-[#f2f3f4] dark:bg-transparent justify-between space-y-8 border p-6 md:col-span-1 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
            <div className="space-y-4">
              <div><h2 className="font-medium">Hawiyat Composer PRO</h2>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet-500 to-purple-600 text-white mt-1">Pro</div>
              <p className="text-muted-foreground text-sm mt-2">2x Claude credits with Hawiyat Composer caching. For individual devs and freelancers.</p></div>
              <div className="mt-4"><div className="flex items-baseline gap-1"><span className="text-3xl font-bold">6,000</span><span className="text-sm text-muted-foreground">DA/month</span></div></div>
              <button onClick={() => setSelectedService({ id: "composer-pro", name: "Composer PRO", price: "6000", priceLabel: "DA/month", image: "/services/hawiyat%20composer.png" })} className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Get Started</button>
              <hr className="border-dashed mt-6" />
              <ul className="list-outside space-y-3 text-sm mt-4">
                {['2x Claude Pro credit quota', 'No daily or weekly limits', 'Hawiyat Composer caching layer', 'Context-aware suggestions', 'Automated code reviews', 'Multi-language support'].map((item, index) => (<li key={index} className="flex items-center gap-2"><Check className="size-3" />{item}</li>))}
              </ul>
            </div>
          </div>

          {/* MAX 5X / MAX 20X (toggle) — center */}
          <div className="dark:bg-muted rounded-lg border p-6 shadow-lg shadow-gray-950/5 md:col-span-1 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
            <div className="mb-6 flex w-full items-center justify-center">
              <div className="relative inline-flex rounded-full border border-border bg-background p-1">
                {(["5X", "20X"] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setMaxTier(tier)}
                    className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      maxTier === tier
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {maxTier === tier && (
                      <motion.span
                        layoutId="max-tier-pill"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                    <span className="relative z-10">Max {tier}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div><h2 className="font-medium">{maxPlan.name}</h2>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 ${maxPlan.tagClass}`}>{maxPlan.tag}</div>
              <p className="text-muted-foreground text-sm mt-2">{maxPlan.desc}</p></div>
              <div className="mt-4"><div className="flex items-baseline gap-1"><span className="text-3xl font-bold">{maxPlan.price}</span><span className="text-sm text-muted-foreground">DA/month</span></div></div>
              <button onClick={() => setSelectedService({ ...maxPlan.order, priceLabel: "DA/month", image: "/services/hawiyat%20composer.png" })} className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Get Started</button>
              <hr className="border-dashed mt-6" />
              <ul className="list-outside space-y-3 text-sm mt-4">
                {maxPlan.features.map((item, index) => (<li key={index} className="flex items-center gap-2"><Check className="size-3" />{item}</li>))}
              </ul>
            </div>
          </div>

          {/* ENTERPRISE */}
          <div className="rounded-lg flex flex-col bg-[#f2f3f4] dark:bg-transparent justify-between space-y-8 border p-6 md:col-span-1 md:my-2 md:rounded-l-none md:border-l-0 lg:p-10">
            <div className="space-y-4">
              <div><h2 className="font-medium">Hawiyat Composer Enterprise</h2>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black mt-1">Enterprise</div>
              <p className="text-muted-foreground text-sm mt-2">Dedicated capacity, SLAs, and onboarding for teams that outgrow MAX 20X.</p></div>
              <div className="mt-4"><div className="flex items-baseline gap-1"><span className="text-3xl font-bold">Custom</span><span className="text-sm text-muted-foreground">billed annually</span></div></div>
              <a href={enterpriseWhatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Contact us</a>
              <hr className="border-dashed mt-6" />
              <ul className="list-outside space-y-3 text-sm mt-4">
                {['Custom Claude capacity & dedicated quota', 'Priority SLAs & onboarding', 'Dedicated provider routing', 'Custom data residency (DZ/EU)', 'Dedicated account manager', 'Advanced security & compliance'].map((item, index) => (<li key={index} className="flex items-center gap-2"><Check className="size-3" />{item}</li>))}
              </ul>
            </div>
          </div>
        </div>

        {selectedService && (
          <OrderForm service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </div>
    </section>
  )
}
