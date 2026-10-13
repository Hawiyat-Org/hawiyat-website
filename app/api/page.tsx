import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircle, Cpu, Zap, Database, Layers } from "lucide-react"
import { createMetadata, SITE_URL, USAGE_DASHBOARD_URL } from "@/lib/seo"
import { waLink } from "@/lib/contact"

export const metadata: Metadata = createMetadata({
  title: "Hawiyat API - Self-Hosted Models, Pay Per Token",
  description:
    "GLM 5.2, GLM 5.3 Flash and DeepSeek V4.1 Flash on the Hawiyat API. Self-hosted on our own GPU capacity, priced per million tokens, topped up from the dashboard.",
  path: "/api",
  modifiedTime: "2026-10-12",
})

type PricedModel = {
  id: string
  name: string
  tagline: string
  note: string
  rows: { label: string; value: string }[]
}

const MODELS: PricedModel[] = [
  {
    id: "glm-5-2",
    name: "GLM 5.2",
    tagline: "Flagship open-weights model for long-horizon work.",
    note: "1M-token context",
    rows: [
      { label: "Input", value: "$0.60 / 1M tokens" },
      { label: "Output", value: "$2.10 / 1M tokens" },
      { label: "Cache read", value: "$0.15 / 1M tokens" },
    ],
  },
  {
    id: "glm-5-3-flash",
    name: "GLM 5.3 Flash",
    tagline: "The half-price workhorse for high-volume calls.",
    note: "1M-token context, half price",
    rows: [
      { label: "Input", value: "$0.03 / 1M tokens" },
      { label: "Output", value: "$0.105 / 1M tokens" },
      { label: "Cache read", value: "$0.0085 / 1M tokens" },
    ],
  },
  {
    id: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    tagline: "High-throughput model for agents and pipelines.",
    note: "1M-token context, peak pricing",
    rows: [
      { label: "Input", value: "$0.15 / 1M tokens" },
      { label: "Output", value: "$0.60 / 1M tokens" },
      { label: "Cache hit", value: "$0.003 / 1M tokens" },
    ],
  },
]

const METRICS = [
  { icon: Zap, label: "Uptime", value: "99.9%" },
  { icon: Database, label: "Cache hit rate", value: "98.7%" },
  { icon: Cpu, label: "Latency", value: "Low-latency local serving" },
  { icon: Layers, label: "Optimization", value: "Optimized to half" },
]

const faqs = [
  {
    question: "How is the Hawiyat API priced?",
    answer:
      "Per million tokens, in dollars, with no monthly minimum. You top up a balance in the dashboard and it is spent on the models you call. Nothing expires and there is no subscription to cancel.",
  },
  {
    question: "Which models are available?",
    answer:
      "GLM 5.2, GLM 5.3 Flash and DeepSeek V4.1 Flash run on our own GPU capacity. GLM 5.3 Flash is priced at half the standard rate for high-volume calls. All three carry a 1M-token context window and are served from the same endpoint with the same API key.",
  },
  {
    question: "What does 'optimized to half' mean?",
    answer:
      "Our caching and request-reuse layer cuts what you pay for the same work. Repeated context is served from cache at a fraction of the input price, so the effective cost of a running workload lands near half.",
  },
  {
    question: "How do I add balance?",
    answer:
      "Top up from the usage dashboard. Pick an amount, pay, and the balance is credited to your API key. Usage is metered per request and visible in the same dashboard.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hawiyat API - self-hosted AI models",
  description:
    "Pay-per-token access to GLM 5.2 and DeepSeek V4.1 Flash, self-hosted on Hawiyat GPU capacity and topped up from the usage dashboard.",
  url: `${SITE_URL}/api`,
  provider: {
    "@type": "Organization",
    name: "Hawiyat",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
  },
  areaServed: { "@type": "Country", name: "Algeria" },
}

export default function ApiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 pb-12 pt-32 md:pt-40">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Hawiyat API / self-hosted models / pay per token
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            The Hawiyat API
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-ink md:text-lg">
            GLM 5.2, GLM 5.3 Flash and DeepSeek V4.1 Flash, self-hosted on our own GPU capacity.
            One API key, per-token pricing, balance topped up from the dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/credits"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
            >
              Top up and start
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={waLink("Hello Hawiyat! I want to use the Hawiyat API.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <m.icon className="h-5 w-5 text-muted-ink" aria-hidden="true" />
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-ink">
                {m.label}
              </p>
              <p className="mt-2 font-mono text-lg font-semibold text-ink">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Models */}
      <section className="px-6 pb-16">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Models</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Three models, one key
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-ink">
            Prices per million tokens. Cache reads and cache hits are billed separately from
            fresh input.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {MODELS.map((model) => (
              <div
                key={model.id}
                className="flex flex-col rounded-lg border border-border bg-surface p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-ink">{model.name}</h3>
                  <span className="rounded-lg border border-border bg-surface-dim px-3 py-1 font-mono text-xs text-muted-ink">
                    {model.note}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">{model.tagline}</p>

                <dl className="mt-6 space-y-3 border-t border-border pt-6">
                  {model.rows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4">
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                        {row.label}
                      </dt>
                      <dd className="font-mono text-sm font-semibold text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href="/credits"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                >
                  Use {model.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-hosted */}
      <section className="px-6 pb-16">
        <div className="mx-auto w-full max-w-5xl rounded-lg border border-border bg-surface-dim p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Our own hosted models
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Served from our own GPU capacity
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-ink md:text-base">
            These models run on rented GPU capacity that we operate ourselves. Your requests go
            straight to our own endpoints, not through a foreign gateway. That is what lets us
            hold uptime at 99.9%, keep latency low, and land a 98.7% cache hit rate on repeated
            context. The same layer is what optimizes your bill to half.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                Infrastructure
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                Dedicated GPU capacity under our operation, provisioned for inference.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                Caching layer
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                98.7% cache hit rate on repeated context, billed at cache-read prices.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                Availability
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                99.9% uptime, monitored continuously from Algiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top up */}
      <section className="px-6 pb-20">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Balance and billing
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Top up from the dashboard
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-ink md:text-base">
            No subscription and no monthly cap to fit inside. You add balance to your key in the
            usage dashboard, and every request draws from it at the per-token rates above. Usage,
            spend, and cache savings are all visible in the same place.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/credits"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
            >
              Add balance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={USAGE_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink"
            >
              Open the dashboard
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="mx-auto w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">FAQ</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Questions
          </h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
