"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, Users, Building2, Headphones } from "lucide-react"

function useCounter(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!start) return

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration, start])

  return count
}

function AnimatedStatCard({ value, label, description, icon: Icon, delay, text }: { value: number; label: string; description: string; icon: React.ElementType; delay: number; text?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const count = useCounter(value, 2000, inView)
  const prefix = "+"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full mx-auto rounded-md p-6 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-4 box-border"
    >
      <Icon className="w-16 h-16 text-black dark:text-white mx-auto" />
      <div className="text-center">
        <div className="text-4xl tracking-tight">
          {text || (prefix + count)}
        </div>
        <h3 className="text-2xl mt-2">{label}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 px-2 text-center text-sm break-words">
        {description}
      </p>
    </motion.div>
  )
}

export default function ComposerPage() {
  return (
    <div className="relative min-h-screen hero-bg-gradient overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[85vh] w-full flex-col place-content-center overflow-hidden mt-[70px] md:mt-[100px]">
        <div className="purple-bg-grad absolute right-[15%] top-[15%] h-[180px] w-[180px] max-md:h-[100px] max-md:w-[100px]" />
        <div className="purple-bg-grad absolute left-[10%] bottom-[20%] h-[120px] w-[120px] max-md:hidden" />

        <div className="mx-auto w-full max-w-6xl px-6 flex max-lg:flex-col items-center justify-center gap-12 max-lg:gap-10 min-h-[85vh]">
          {/* Left - Content */}
          <div className="flex flex-col gap-6 flex-1 max-w-lg max-md:mt-8">
            <h1 className="text-5xl max-lg:text-4xl  font-medium uppercase whitespace-nowrap">
              Hawiyat{" "}
              <span className="font-thin font-serif">
                Composer
              </span>
            </h1>

            <p className="text-xl max-md:text-lg text-gray-800 dark:text-white">
              Your CLI tools, coding agents, and autocomplete plugins talk to LLM
              providers through one gateway. Same endpoints you already use. Way less
              waste.
            </p>

            <div className="flex gap-4 max-md:flex-col justify-start">
              <Link
                href="/services"
                className="btn max-md:!w-full flex gap-2 place-content-center shadow-lg !rounded-lg !py-4 max-md:!py-3.5 transition-all duration-[0.3s] hover:scale-x-[1.03] active:scale-95"
              >
                <span className="max-md:text-[15px] max-md:font-medium">Start Building</span>
                <i className="bi bi-arrow-right group-hover:translate-x-1 duration-300 max-md:text-lg" />
              </Link>
              <div className="relative inline-flex">
                <Link
                  href="#capabilities"
                  className="how-it-works-btn btn max-md:!w-full flex gap-2 place-content-center !rounded-lg !py-4 max-md:!py-3.5 !bg-transparent !text-black dark:!text-white border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-95"
                >
                  <span className="max-md:text-[15px] max-md:font-medium">How It Works</span>
                </Link>
                {/* Floating Claude Code image */}
                <div className="claude-bounce-logo absolute -top-8 left-0 right-0 mx-auto w-10 h-10 max-md:w-10 max-md:h-10">
                  <Image
                    src="/services/claude-code.png"
                    alt="Claude Code"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="flex-shrink-0 w-[400px] max-lg:w-[280px] max-md:w-[220px] dark:invert">
            <Image
              src="/services/composer-light.svg"
              alt="Hawiyat Composer"
              width={400}
              height={340}
              className="w-full h-auto animate-very-slow-spin"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Our Numbers ── */}
      <section className="relative w-full flex flex-col place-content-center min-h-[70vh] py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 flex flex-col items-center gap-6">
          <h3 className="text-5xl font-medium max-md:text-3xl text-center">Our Numbers</h3>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-stretch">
            <AnimatedStatCard icon={BarChart3} value={50} label="Tokens Served" description="Tokens processed through Hawiyat Composer's caching and routing." text="+50B" delay={0} />
            <AnimatedStatCard icon={Users} value={30} label="Satisfied Clients" description="Developers, startups, and agencies across Algeria using Hawiyat Composer to deliver projects." delay={0.15} />
            <AnimatedStatCard icon={Building2} value={3} label="Enterprise Partners" description="Enterprises that integrated Hawiyat Composer into their workflow with dedicated support." delay={0.3} />
            <AnimatedStatCard icon={Headphones} value={0} label="Customer Support" description="Round-the-clock support via WhatsApp, Email, and Telegram." text="24/7" delay={0.45} />
          </div>
        </div>
      </section>

      {/* ── What is Hawiyat Composer + Video ── */}
      <section id="capabilities" className="relative w-full flex flex-col place-content-center min-h-[70vh] py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex max-lg:flex-col items-center justify-center gap-10 max-lg:gap-8 w-full">
            <div className="flex-shrink-0 w-[560px] max-lg:w-[480px] max-md:w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/V2N9RvzCdnM"
                title="Hawiyat Composer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-6 flex-1 max-w-lg">
              <h2 className="text-5xl max-md:text-3xl font-medium">
                What is Hawiyat{" "}
                <span className="font-thin font-serif">Composer?</span>
              </h2>
              <p className="text-lg text-gray-800 dark:text-white leading-relaxed">
                An abstraction layer with standard OpenAI and Anthropic endpoints.
                Claude Code, Cursor, Copilot. You point them at Hawiyat instead of the
                provider directly. Zero code changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why We Built It ── */}
      <section className="relative w-full flex flex-col place-content-center min-h-[70vh] py-16 md:py-24">
        <div className="purple-bg-grad absolute left-1/2 -translate-x-1/2 top-[30%] h-[200px] w-[200px] max-md:hidden pointer-events-none" />
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-6xl font-medium max-md:text-3xl text-center mb-10">Why We Built It</h2>
          <div className="flex max-lg:flex-col items-center justify-center gap-6">
            {[
              {
                title: "API Costs Were Draining Us",
                desc: "We were paying full price for the same API data, over and over. Every microservice hitting the provider directly. It added up fast.",
              },
              {
                title: "Context Was Structurally Wasteful",
                desc: "Coding agents re-read your whole codebase on every turn. A hundred thousand tokens for a one-line fix. That math breaks at scale.",
              },
              {
                title: "No Optimization Layer Existed",
                desc: "No one had built client-side caching for this. No centralized way to handle repeated context. So the provider did the same expensive work twice, and we paid for it.",
              },
            ].map((item, i) => (
              <Link
                key={i}
                href="/services"
                className="group relative w-full p-10 transition-all duration-300 gap-5 flex flex-col bg-[#f6f7fb] dark:bg-[#141414] rounded-3xl hover:scale-[1.02] max-w-lg"
              >
                <span className="text-8xl max-md:text-4xl font-thin text-gray-300 dark:text-gray-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl max-md:text-xl font-medium">{item.title}</h3>
                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full flex flex-col place-content-center min-h-[70vh] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6 flex flex-col items-center gap-8 text-center">
          <h2 className="text-6xl font-medium max-md:text-3xl">
            Ready to Cut Your Token Bill?
          </h2>
          <p className="max-w-lg text-lg text-gray-800 dark:text-white">
            Point your tools at Hawiyat Composer and start caching, routing, and
            saving. You don't touch a line of source code.
          </p>

          {/* Compatible tools */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Compatible with
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 max-md:gap-6">
              <div className="h-16 w-32 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image src="/Compatible/claude-code.webp" alt="Claude Code" fill className="object-contain" />
              </div>
              <div className="h-14 w-28 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 dark:invert">
                <Image src="/Compatible/cursor.webp" alt="Cursor" fill className="object-contain" />
              </div>
              <div className="h-14 w-28 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image src="/Compatible/vscode.webp" alt="VS Code" fill className="object-contain" />
              </div>
              <div className="h-14 w-28 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image src="/Compatible/codex.webp" alt="Codex" fill className="object-contain" />
              </div>
              <div className="h-14 w-28 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image src="/Compatible/antigravity.webp" alt="Anti Gravity" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-md:flex-col justify-center mt-4">
            <Link
              href="/services?q=hawiyat+composer"
              className="btn max-md:!w-full flex gap-2 place-content-center shadow-lg !rounded-lg !py-4 max-md:!py-3.5 transition-all duration-[0.3s] hover:scale-x-[1.03] active:scale-95"
            >
              <span className="max-md:text-[15px] max-md:font-medium">Try It</span>
              <i className="bi bi-arrow-right group-hover:translate-x-1 duration-300 max-md:text-lg" />
            </Link>
            <Link
              href="https://wa.me/213559555951"
              target="_blank"
              className="btn max-md:!w-full flex gap-2 place-content-center !rounded-lg !py-4 max-md:!py-3.5 !bg-transparent !text-black dark:!text-white border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-95"
            >
              <span className="max-md:text-[15px] max-md:font-medium">Contact Us</span>
              <i className="bi bi-whatsapp"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
