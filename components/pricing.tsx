"use client"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, MessageSquare } from "lucide-react"
import { OrderForm } from "@/components/services/order-form"

export default function Pricing() {
  const [selectedService, setSelectedService] = useState<{
    id: string
    name: string
    price: string
    priceLabel: string
    image: string
  } | null>(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '213559555951'
  const customPlanMessage = encodeURIComponent('Hello! I need a custom hosting plan.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${customPlanMessage}`

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  }

  return (
    <section id="pricing" ref={sectionRef} className="py-16 md:py-32">
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
            Hawiyat Composer for AI costs, Cloud Hosting for everything else. Or both.
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
          {/* MAX 5X */}
          <div className="dark:bg-muted rounded-lg border p-6 shadow-lg shadow-gray-950/5 md:col-span-1 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
            <div className="space-y-4">
              <div><h2 className="font-medium">Hawiyat Composer MAX 5X</h2>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white mt-1">Max 5X</div>
              <p className="text-muted-foreground text-sm mt-2">5x Claude capacity with semantic caching and smart routing. For daily shippers.</p></div>
              <div className="mt-4"><div className="flex items-baseline gap-1"><span className="text-3xl font-bold">15,000</span><span className="text-sm text-muted-foreground">DA/month</span></div></div>
              <button onClick={() => setSelectedService({ id: "composer-max5x", name: "Composer MAX 5X", price: "15000", priceLabel: "DA/month", image: "/services/hawiyat%20composer.png" })} className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Get Started</button>
              <hr className="border-dashed mt-6" />
              <ul className="list-outside space-y-3 text-sm mt-4">
                {['5x Claude Pro credit quota', 'No daily or weekly limits', 'Semantic caching (vector-based)', 'Smart provider routing', 'Context-aware suggestions', 'Automated code reviews'].map((item, index) => (<li key={index} className="flex items-center gap-2"><Check className="size-3" />{item}</li>))}
              </ul>
            </div>
          </div>
          {/* MAX 20X */}
          <div className="rounded-lg flex flex-col bg-[#f2f3f4] dark:bg-transparent justify-between space-y-8 border p-6 md:col-span-1 md:my-2 md:rounded-l-none md:border-l-0 lg:p-10">
            <div className="space-y-4">
              <div><h2 className="font-medium">Hawiyat Composer MAX 20X</h2>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black shadow-amber-500/30 mt-1">Max 20X</div>
              <p className="text-muted-foreground text-sm mt-2">20x Claude capacity with Fable & Opus models, GDPR compliance. For teams and agencies.</p></div>
              <div className="mt-4"><div className="flex items-baseline gap-1"><span className="text-3xl font-bold">30,000</span><span className="text-sm text-muted-foreground">DA/month</span></div></div>
              <button onClick={() => setSelectedService({ id: "composer-max20x", name: "Composer MAX 20X", price: "30000", priceLabel: "DA/month", image: "/services/hawiyat%20composer.png" })} className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Get Started</button>
              <hr className="border-dashed mt-6" />
              <ul className="list-outside space-y-3 text-sm mt-4">
                {['20x Claude Pro credit quota', 'No daily or weekly limits', 'Exact-match + semantic caching', 'Smart provider routing', 'Hybrid data compliance', 'Multi-agent traffic resolution', 'Priority support'].map((item, index) => (<li key={index} className="flex items-center gap-2"><Check className="size-3" />{item}</li>))}
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
