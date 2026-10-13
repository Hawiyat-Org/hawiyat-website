import type { Metadata } from "next"
import { ArrowRight, ChevronDown } from "lucide-react"
import { createMetadata, SITE_URL, USAGE_DASHBOARD_URL } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Hawiyat API - Self-Hosted Models, Pay Per Token",
  description:
    "GLM 5.2, GLM 5.3 Flash and DeepSeek V4.1 Flash on the Hawiyat API. Self-hosted GPU capacity, priced per million tokens, topped up from the dashboard.",
  path: "/api",
  modifiedTime: "2026-10-12",
})

const DASHBOARD = USAGE_DASHBOARD_URL

type PricedModel = {
  id: string
  name: string
  context: string
  tagline: string
  badge?: string
  rows: { label: string; value: string }[]
}

const MODELS: PricedModel[] = [
  {
    id: "glm-5-3-flash",
    name: "GLM 5.3 Flash",
    context: "1M ctx",
    tagline: "The workhorse. Cheapest line we run, built for volume.",
    badge: "HALF PRICE",
    rows: [
      { label: "Input", value: "$0.03" },
      { label: "Output", value: "$0.105" },
      { label: "Cache read", value: "$0.0085" },
    ],
  },
  {
    id: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    context: "1M ctx",
    tagline: "High-throughput line for agents and long pipelines.",
    rows: [
      { label: "Input", value: "$0.15" },
      { label: "Output", value: "$0.60" },
      { label: "Cache hit", value: "$0.003" },
    ],
  },
  {
    id: "glm-5-2",
    name: "GLM 5.2",
    context: "1M ctx",
    tagline: "Flagship line for long-horizon, project-scale work.",
    rows: [
      { label: "Input", value: "$0.60" },
      { label: "Output", value: "$2.10" },
      { label: "Cache read", value: "$0.15" },
    ],
  },
]

const METRICS = [
  { label: "Uptime", value: "99.9%", note: "confirmed on every line" },
  { label: "Cache hit", value: "98.7%", note: "on repeated context" },
  { label: "Latency", value: "Low", note: "served from local GPU" },
  { label: "Pricing", value: "Half", note: "of official rates" },
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
      "GLM 5.3 Flash, DeepSeek V4.1 Flash and GLM 5.2 run on our own GPU capacity. GLM 5.3 Flash is priced at half the standard rate for high-volume calls. All three carry a 1M-token context window and are served from the same endpoint with the same API key.",
  },
  {
    question: "How do you keep uptime at 99.9%?",
    answer:
      "The models already run on our own rented GPU capacity, and that capacity is one line in a fallback chain that also includes the official providers. If a line degrades, the request is carried by another one, so the service stays up without us charging platform-level prices.",
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
    "Pay-per-token access to GLM 5.3 Flash, DeepSeek V4.1 Flash and GLM 5.2, self-hosted on Hawiyat GPU capacity and topped up from the usage dashboard.",
  url: `${SITE_URL}/api`,
  provider: {
    "@type": "Organization",
    name: "Hawiyat",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
  },
  areaServed: { "@type": "Country", name: "Algeria" },
}

const LINES = [
  { name: "OUR GPU", role: "primary" },
  { name: "OFFICIAL", role: "fallback 1" },
  { name: "OFFICIAL", role: "fallback 2" },
]

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
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 pb-14 pt-32 md:pt-40">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Hawiyat API
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Self-hosted models,
            <br />
            priced per token
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-ink md:text-lg">
            GLM 5.3 Flash, DeepSeek V4.1 Flash and GLM 5.2 on one key. Balance topped up from the
            dashboard, spent per request.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={DASHBOARD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
            >
              Top up and start
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-6 font-mono text-xs text-muted-ink">
            3 models · 1M context · pay per 1M tokens
          </p>
        </div>
      </section>

      {/* Telemetry band */}
      <section className="px-6 pb-16">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-lg border border-border">
          <div className="grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-surface px-6 py-6 md:px-8">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                  {m.label}
                </p>
                <p className="mt-3 font-mono text-3xl font-semibold text-ink">{m.value}</p>
                <p className="mt-2 font-mono text-xs text-muted-ink">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="scroll-mt-28 px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Three models, one key
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-ink">
            Prices per 1M tokens, in dollars. Cache rows are billed separately from fresh input.
          </p>

          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {MODELS.map((model) => (
              <div key={model.id} className="flex flex-col bg-surface p-7 md:p-9">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold tracking-tight text-ink">{model.name}</h3>
                  {model.badge ? (
                    <span className="rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-signal-text">
                      {model.badge}
                    </span>
                  ) : (
                    <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-ink">
                      {model.context}
                    </span>
                  )}
                </div>
                <p className="mt-4 min-h-12 text-sm leading-relaxed text-muted-ink">
                  {model.tagline}
                </p>

                <dl className="mt-7 grow">
                  {model.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-3 border-t border-border py-4"
                    >
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                        {row.label}
                      </dt>
                      <dd className="font-mono text-sm font-semibold text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={DASHBOARD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                >
                  Use {model.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-xs text-muted-ink">
            DeepSeek V4.1 Flash shown at peak rates.
          </p>
        </div>
      </section>

      {/* Fallback lines */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-5xl rounded-lg border border-border bg-surface-dim p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            How a request is carried
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            One key, several lines
          </h2>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-stretch">
            {LINES.map((line, i) => (
              <div key={line.role} className="flex flex-1 items-center gap-4">
                <div className="flex-1 rounded-lg border border-border bg-surface px-6 py-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink">
                    {line.name}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-muted-ink">{line.role}</p>
                </div>
                {i < LINES.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-ink md:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-ink md:text-base">
            These models already run on rented GPU capacity that we operate ourselves. That
            capacity is one line in a fallback chain that also includes the official providers, so
            a request is always carried by a line that is up. Confirming uptime on several lines at
            once is what lets us hold availability at 99.9% instead of betting the service on a
            single endpoint. It is also why you keep our prices: you are not paying the expensive
            platform rates on top.
          </p>
        </div>
      </section>

      {/* Top up */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Top up from the dashboard
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-ink md:text-base">
            No subscription and no monthly cap to fit inside. You add balance to your key, and
            every request draws from it at the rates above. Usage, spend and cache savings sit in
            the same place.
          </p>
          <div className="mt-8 flex">
            <a
              href={DASHBOARD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
            >
              Add balance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">Questions</h2>
          <div className="mt-6 border-t border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-muted-ink transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-6 text-sm leading-relaxed text-muted-ink">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
