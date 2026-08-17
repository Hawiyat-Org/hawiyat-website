import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { createMetadata, SITE_URL } from "@/lib/seo"
import { waLink } from "@/lib/contact"

export const metadata: Metadata = createMetadata({
  title: "AI API in Algeria | LLM API Provider",
  description:
    "Get an AI API in Algeria: one key to GPT, Claude, Gemini, and open LLMs through the Hawiyat Composer execution layer. Billed in DZD, pay with CCP or Baridi Mob, no foreign card needed.",
  path: "/ai-api-algeria",
  modifiedTime: "2026-08-17",
})

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI API in Algeria — Hawiyat Composer",
  description:
    "LLM API access in Algeria through the Hawiyat Composer execution layer: one API key routes tasks to GPT, Claude, Gemini, and open models, billed in Algerian dinars (DZD) with CCP and Baridi Mob payment.",
  url: `${SITE_URL}/ai-api-algeria`,
  provider: {
    "@type": "Organization",
    name: "Hawiyat",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
  },
  areaServed: { "@type": "Country", name: "Algeria" },
  offers: {
    "@type": "Offer",
    price: "6000",
    priceCurrency: "DZD",
    description: "AI Composer Pro — LLM API access, 6,000 DA/month",
  },
}

const faqs = [
  {
    question: "What is an AI API provider in Algeria?",
    answer:
      "An AI API provider in Algeria gives you programmatic access to large language models (LLMs) without a foreign credit card. Hawiyat is a local AI provider: one API key connects you to GPT, Claude, Gemini, and open models through the Composer execution layer. Everything is billed in Algerian dinars (DZD) and payable with CCP or Baridi Mob.",
  },
  {
    question: "How much does an AI API cost in DZD?",
    answer:
      "Hawiyat AI Composer starts at 6,000 DA/month for Pro, 15,000 DA/month for MAX 5X, and 30,000 DA/month for MAX 20X. There are no surprise per-token bills in foreign currency: you pay a monthly cap in dinars and the Composer routes each task to the best model within it.",
  },
  {
    question: "Can I use the API without a foreign credit card?",
    answer:
      "Yes. Hawiyat accepts CCP, Baridi Mob, and USD. You never need a foreign card to use AI APIs through Hawiyat — billing is local, in DZD, with receipts and local support in Arabic, French, and English.",
  },
  {
    question: "Which LLMs can I access through the Hawiyat API?",
    answer:
      "One key gives you GPT, Claude, Gemini, and open models. The Composer execution layer routes each task to the best model for quality, latency, and cost — and switches automatically when a model fails. Models are routes on the execution layer, not separate subscriptions.",
  },
  {
    question: "Is Hawiyat a ChatGPT or Claude subscription reseller?",
    answer:
      "No. Hawiyat does not sell ChatGPT Plus or Claude subscriptions. Hawiyat is an AI infrastructure platform: you buy an API key to the execution layer, and that key accesses GPT, Claude, Gemini, and open models. It is a developer-grade AI API for your own apps, workflows, and agents.",
  },
  {
    question: "What can I build with an AI API in Algeria?",
    answer:
      "Chatbots on WhatsApp, document summarization, code generation, CRM automation, content pipelines, and AI agents. Hawiyat Composer evaluates every result and carries your business context, so your automations ship real output — not raw model text.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

export default function AiApiAlgeriaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 pb-16 pt-32 md:pt-40">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            AI provider in Algeria · LLM API · DZD billing
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            The AI API in Algeria
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-ink md:text-lg">
            One key to GPT, Claude, Gemini, and open LLMs — through the Hawiyat Composer
            execution layer. No foreign card, no USD bills, no model lock-in. Billed in
            Algerian dinars, supported from Algiers.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
            >
              See pricing in DZD
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={waLink("Hello Hawiyat! I want to use the AI API in Algeria.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink"
            >
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Why Algeria */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Why local</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">
            Frontier LLMs, without the payment wall
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Pay in DZD",
                body: "CCP or Baridi Mob. No foreign credit card, no USD pricing, no blocked transactions.",
              },
              {
                title: "Local support",
                body: "Arabic, French, and English support from a team based in Algeria, in your timezone.",
              },
              {
                title: "No lock-in",
                body: "Models are routes, not subscriptions. GPT, Claude, Gemini, and open models behind one key.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-surface px-6 py-5">
                <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">How it works</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">
            From key to result in three steps
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                step: "01",
                title: "Pick a Composer plan",
                body: "Pro 6,000 DA/month, MAX 5X 15,000 DA/month, or MAX 20X 30,000 DA/month. Order on the pricing page, pay with CCP, Baridi Mob, or USD.",
              },
              {
                step: "02",
                title: "Get your API key",
                body: "Your key is issued after payment confirmation and connects you to the execution layer — not to one vendor.",
              },
              {
                step: "03",
                title: "Route tasks, ship results",
                body: "Composer picks the best model per task, carries your context, retries on failure, and evaluates each result. You get output you can trust, capped monthly in DZD.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 rounded-lg border border-border bg-surface px-6 py-5">
                <span className="font-mono text-sm text-signal">{item.step}</span>
                <div>
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-ink">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-ink">
            Deep dive on the engine:{" "}
            <Link href="/composer" className="text-signal underline underline-offset-4">
              how the Composer execution layer routes and evaluates
            </Link>
            . Full catalog:{" "}
            <Link href="/services" className="text-signal underline underline-offset-4">
              services in Algeria
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">
            AI API questions, answered straight
          </h2>
          <div className="mt-8 flex w-full flex-col gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full rounded-lg border border-border bg-surface px-6 py-5">
                <h3 className="text-lg font-medium text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">
            Start using AI APIs in Algeria today
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-ink">
            Order a Composer plan, get your key, and route your first task — all in DZD.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
          >
            See plans and pricing
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
