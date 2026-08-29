import type { Metadata } from "next"
import Link from "next/link"
import { createMetadata } from "@/lib/seo"
import { CreditsCalculator } from "@/components/credits/credits-calculator"
import { Coins, Infinity as InfinityIcon, Gauge, ShieldCheck } from "lucide-react"
import { CREDITS_FAQ, CREDITS_MIN_DA, formatDA } from "@/lib/data/llm-credits"

export const metadata: Metadata = createMetadata({
  title: "LLM Credits | Buy AI API Credits in DZD",
  description:
    "Buy Hawiyat LLM credits in Algerian dinars - any amount from 2,000 DA, for any model: GPT, Claude, Gemini, DeepSeek, Qwen, and more. Prepaid balance, no subscription, no expiry. Pay with CCP or Baridi Mob.",
  path: "/credits",
  modifiedTime: "2026-08-29",
})

const FEATURES = [
  { icon: Coins, title: "Any amount", text: `From ${formatDA(CREDITS_MIN_DA)} DA up. No tier, no plan, no subscription.` },
  { icon: InfinityIcon, title: "Any model", text: "GPT, Claude, Gemini, Grok, DeepSeek, Qwen, Llama, Kimi, Mistral - or ask us to add a model." },
  { icon: Gauge, title: "No expiry", text: "Your balance stays on your key until you spend it. Top up whenever." },
  { icon: ShieldCheck, title: "DZD + local payment", text: "Billed in dinars. Pay with CCP or Baridi Mob. No foreign card." },
]

export default function CreditsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-80">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-lg bg-gradient-to-b from-foreground/[0.03] to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Hero */}
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-signal-contrast">
            New · LLM Credits
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl text-ink">
            Buy AI credits in dinars, use them on any model
          </h1>
          <p className="mt-5 text-lg text-muted-ink">
            Prepaid balance on your Hawiyat API key - from {formatDA(CREDITS_MIN_DA)} DA. No
            subscription, no tier, no expiry. Pick your models, pay with CCP or Baridi Mob,
            and spend on GPT, Claude, Gemini, and more.
          </p>
        </header>

        {/* Feature strip */}
        <div className="mx-auto mb-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-lg border border-border bg-surface p-4">
                <Icon className="mb-3 h-6 w-6 text-ink" />
                <h2 className="text-sm font-semibold text-ink">{f.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-ink">{f.text}</p>
              </div>
            )
          })}
        </div>

        {/* Calculator / order */}
        <section className="mx-auto mb-16 max-w-2xl">
          <CreditsCalculator />
        </section>

        {/* How it works */}
        <section className="mx-auto mb-16 max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-ink">How it works</h2>
          <ol className="space-y-4">
            {[
              ["1", "Choose your amount", "Pick a preset or type any amount from 2,000 DA."],
              ["2", "Pick your models", "Open the tree, tick the models you want, or choose \u201CAny model\u201D. Not listed? Type it - we add it to your key."],
              ["3", "Pay with CCP or Baridi Mob", "No card needed. We confirm payment with you on WhatsApp."],
              ["4", "Activate and spend", "We activate your key, add your models, and every request draws from your balance - metered live on the usage dashboard."],
            ].map(([step, title, text]) => (
              <li key={step} className="flex gap-4 rounded-lg border border-border bg-surface p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal font-mono text-sm font-bold text-signal-text">
                  {step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm text-muted-ink">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Comparison vs monthly plans */}
        <section className="mx-auto mb-16 max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-ink">
            Credits or a Composer plan?
          </h2>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <div className="grid grid-cols-2 divide-x divide-border/40 border-b border-border/40">
              <div className="p-4 text-center">
                <h3 className="text-sm font-semibold text-ink">LLM Credits</h3>
                <p className="mt-1 text-xs text-muted-ink">Pay as you go</p>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm font-semibold text-ink">Composer plans</h3>
                <p className="mt-1 text-xs text-muted-ink">Fixed monthly quota</p>
              </div>
            </div>
            {[
              ["Any amount, no subscription", "6,000 / 15,000 / 30,000 DA per month"],
              ["Any model, or let Composer route", "Full execution layer with tools and workflows"],
              ["Balance never expires", "Monthly quota resets each month"],
              ["Best for: occasional or variable usage", "Best for: daily, predictable workload"],
            ].map(([a, b]) => (
              <div key={a} className="grid grid-cols-2 divide-x divide-border/40">
                <div className="p-4 text-sm text-ink">{a}</div>
                <div className="p-4 text-sm text-muted-ink">{b}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-muted-ink">
            Not sure?{" "}
            <Link href="/pricing" className="font-medium text-signal-contrast underline hover:no-underline">
              Compare all products on the pricing page
            </Link>
            .
          </p>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-ink">
            Credits - frequently asked
          </h2>
          <div className="space-y-3">
            {CREDITS_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-border bg-surface p-4 open:border-signal/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink">
                  {item.question}
                  <span className="text-muted-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-ink">
            Questions about activation or a specific model?{" "}
            <Link href="/about" className="font-medium text-signal-contrast underline hover:no-underline">
              Contact us
            </Link>{" "}
            - we answer in Arabic, French, and English.
          </p>
        </section>
      </div>
    </div>
  )
}
