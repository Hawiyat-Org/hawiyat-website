"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.hawiyat.org'
  const enterpriseScheduleUrl = process.env.NEXT_PUBLIC_ENTERPRISE_SCHEDULE_URL || 'https://hawiyat.org/schedule'

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
            Flexible Hosting Plans That Scale With You
          </h1>
          <p className="text-muted-foreground">
            Whether you're an individual creator or a large enterprise, Hawiyat provides reliable hosting, AI tools, and seamless scalability.
          </p>
        </motion.div>

        <div ref={cardsRef} className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
          {/* Individuals */}
       {/* Individuals */}
       <motion.div 
            initial={{ opacity: 1, scale: 0 }}
            animate={cardsInView ? { 
              x: 0,
              y: 0, 
              scale: 1,
              transition: {
                x: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
               
                scale: { duration: 0.6, delay: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
              }
            } : { opacity: 1, scale: 0 }}
            className="rounded-lg flex flex-col bg-[#f2f3f4] dark:bg-transparent justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              transition={{ delay: 1.1 }}
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <h2 className="font-medium">Individual Hosting</h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Start immediately with a platform for creators and small teams. Deploy apps, manage projects, and scale up to 500 clients effortlessly.
                </p>
              </motion.div>

              <motion.button 
                variants={itemVariants}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <Link href={appUrl} target="_blank" rel="noreferrer">Get Started</Link>
              </motion.button>

              <motion.hr variants={itemVariants} className="border-dashed mt-6" />

              <motion.ul 
                variants={containerVariants}
                className="list-outside space-y-3 text-sm mt-4"
              >
                {['Single-click Deployment', '300+ Ready-to-use Templates', 'AI Assistance', 'Automatic Domain Setup', 'Free SSL included', 'Scales up to 500 clients simultaneously'].map((item, index) => (
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

          {/* Enterprises */}
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
            className="dark:bg-muted rounded-lg border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              transition={{ delay: 1.1 }}
              className="grid gap-6 sm:grid-cols-2"
            >
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <h2 className="font-medium">Enterprise Hosting</h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    Custom hosting with SLA, priority support, free migration assistance, and capable of handling up to 10,000 clients simultaneously.
                  </p>
                </motion.div>

                <motion.button 
                  variants={itemVariants}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  <Link href={enterpriseScheduleUrl} target="_blank" rel="noreferrer">Schedule a Meeting</Link>
                </motion.button>
              </div>

              <div>
                <motion.div variants={itemVariants} className="text-sm font-medium">
                  Enterprise Benefits:
                </motion.div>
                <motion.ul 
                  variants={containerVariants}
                  className="mt-4 list-outside space-y-3 text-sm"
                >
                  {['Custom sizing & capacity planning', 'SLA & support guarantees', 'Dedicated onboarding', 'Free migration assistance', 'Scales up to 10,000 clients simultaneously', 'Priority support & monitoring'].map((item, index) => (
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}