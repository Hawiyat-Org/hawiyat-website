"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
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
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Hosting Plans That Scale With You
          </h1>
          <p className="text-muted-foreground">
            Choose from our ready-to-deploy hosting plans or request a custom solution tailored to your needs.
          </p>
        </motion.div>

        <div ref={cardsRef} className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-0">
          {/* Basic Plan */}
          <motion.div 
            initial={{ opacity: 1, scale: 0 }}
            animate={cardsInView ? { 
              x: 0,
              y: 0, 
              scale: 1,
              transition: {
                x: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
                scale: { duration: 0.6, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }
              }
            } : { opacity: 1, scale: 0 }}
            className="rounded-lg flex flex-col bg-[#f2f3f4] dark:bg-transparent justify-between space-y-8 border p-6 md:col-span-1 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <h2 className="font-medium">Hosting Basic</h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Simple and affordable hosting for a single application. Perfect for personal projects, portfolios, or small websites.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">1000</span>
                  <span className="text-sm text-muted-foreground">DA/month</span>
                </div>
              </motion.div>

              <motion.button 
                variants={itemVariants}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <Link href="/services?q=hosting Basic">Get Started</Link>
              </motion.button>

              <motion.hr variants={itemVariants} className="border-dashed mt-6" />

              <motion.ul 
                variants={containerVariants}
                className="list-outside space-y-3 text-sm mt-4"
              >
                {['1 application', 'Free SSL certificate', 'Automatic deployments', 'Basic monitoring'].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-3" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* VIP Plan */}
          <motion.div 
            initial={{ opacity: 1, scale: 0 }}
            animate={cardsInView ? { 
              y: 0, 
              scale: 1,
              transition: {
                y: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
                scale: { duration: 0.6, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }
              }
            } : { opacity: 1, scale: 0 }}
            className="dark:bg-muted rounded-lg border p-6 shadow-lg shadow-gray-950/5 md:col-span-1 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <h2 className="font-medium">Hosting VIP</h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Premium hosting for up to 2 applications with a managed database. Ideal for growing projects that need more power.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">2000</span>
                  <span className="text-sm text-muted-foreground">DA/month</span>
                </div>
              </motion.div>

              <motion.button 
                variants={itemVariants}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                <Link href="/services?q=hosting vip">Get Started</Link>
              </motion.button>

              <motion.hr variants={itemVariants} className="border-dashed mt-6" />

              <motion.ul 
                variants={containerVariants}
                className="list-outside space-y-3 text-sm mt-4"
              >
                {['2 applications', 'Managed database included', 'Free SSL certificate', 'Automatic deployments', 'Priority support'].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-3" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* Custom Plan */}
          <motion.div 
            initial={{ opacity: 1, scale: 0 }}
            animate={cardsInView ? { 
              x: 0,
              y: 0, 
              scale: 1,
              transition: {
                x: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
                scale: { duration: 0.6, delay: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }
              }
            } : { opacity: 1, scale: 0 }}
            className="rounded-lg flex flex-col bg-[#f2f3f4] dark:bg-transparent justify-between space-y-8 border p-6 md:col-span-1 md:my-2 md:rounded-l-none md:border-l-0 lg:p-10"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <h2 className="font-medium">Custom Hosting</h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Need something tailored to your specific requirements? Let's build a custom hosting solution just for you.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Pricing based on your needs</p>
              </motion.div>

              <motion.a 
                variants={itemVariants}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2"
              >
                <MessageSquare className="size-4" />
                Contact on WhatsApp
              </motion.a>

              <motion.hr variants={itemVariants} className="border-dashed mt-6" />

              <motion.ul 
                variants={containerVariants}
                className="list-outside space-y-3 text-sm mt-4"
              >
                {['Custom resource allocation', 'Dedicated support', 'Scalable infrastructure', 'SLA options', 'Free migration assistance', 'Tailored to your needs'].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-3" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
