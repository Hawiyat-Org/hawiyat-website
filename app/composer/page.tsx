import type { Metadata } from "next"
import Link from "next/link"
import ScrollAnimations from "@/components/scroll-animations"
import { RunConsole } from "@/components/run-console"
import { AnimatedNumber } from "@/components/animated-number"
import { createMetadata, USAGE_DASHBOARD_URL } from "@/lib/seo"
import { waLink } from "@/lib/contact"
import { ArrowRight, ExternalLink, MessageCircle } from "lucide-react"

const STAGES = [
  {
    name: "UNDERSTAND",
    body: "Classifies the task and pulls the business context it needs: CRM records, docs, order history.",
  },
  {
    name: "PLAN",
    body: "Chooses the model, context window, tools, and workflow for this specific task.",
  },
  {
    name: "ROUTE",
    body: "Sends the run to the right model and tools. Models are routes, never locks.",
  },
  {
    name: "EXECUTE",
    body: "Runs across models and systems with automatic fallbacks when a route fails.",
  },
  {
    name: "EVALUATE",
    body: "Grades every outcome on quality, latency, and cost. Nothing ships ungraded.",
  },
  {
    name: "RESULT",
    body: "Returns the answer to your system and keeps the learning for the next run.",
  },
]

const MODEL_CHIPS = [
  { name: "GPT", dot: "bg-ink", why: "structure" },
  { name: "Claude", dot: "bg-ember", why: "nuance" },
  { name: "Gemini", dot: "bg-signal", why: "speed" },
  { name: "Llama", dot: "bg-muted-ink", why: "open, at cost" },
  { name: "Open models", dot: "bg-signal-contrast", why: "self-host" },
]

const SYSTEMS = [
  { name: "WhatsApp", note: "support, sales, back-office" },
  { name: "CRM", note: "records in, answers out" },
  { name: "ERP", note: "orders, stock, invoicing" },
  { name: "Email", note: "sequences and triage" },
  { name: "Databases", note: "grounded, queried, updated" },
  { name: "n8n", note: "existing workflows, routed" },
  { name: "Docs & Sheets", note: "reports, briefs, shared tables" },
  { name: "API endpoints", note: "your other tools, called on demand" },
]

const CAPABILITIES = [
  {
    title: "Picks the best brain per task",
    body: "GPT for structure, Claude for nuance, Gemini for speed, open models when you want them at cost. You hand over the task, never the model pick.",
    telemetry: "route: auto",
  },
  {
    title: "Grounds every answer in your business",
    body: "Composer pulls the record, the order, the policy from your systems before it writes a word. Answers come from your data, not a model's memory.",
    telemetry: "ctx: grounded",
  },
  {
    title: "Calls tools only when a task needs them",
    body: "WhatsApp, CRM, ERP, databases, n8n, and anything else you already run. Each run gets the tools it needs and nothing stuck on. The wiring is Composer's job, not yours.",
    telemetry: "tools: on-demand",
  },
  {
    title: "Keeps runs alive when a model doesn't",
    body: "A route slows down or goes dark, Composer cascades to the next best one. No dead runs, no stuck queues, no 3am rebuilds.",
    telemetry: "fallback: cascades",
  },
  {
    title: "Grades every single run",
    body: "Quality, latency, and cost are checked before anything ships. If a result isn't good enough, it doesn't reach your customer.",
    telemetry: "quality: checked",
  },
  {
    title: "Learns so the next run costs less",
    body: "Cache hits, tighter context, smarter routes. Repeated work drops in cost over time, and every dinar shows on the receipt.",
    telemetry: "cost: trending down",
  },
]

const FULLSTACK = [
  { name: "Composer", note: "execution engine: routes, runs, and evaluates every task" },
  { name: "n8n", note: "workflow runtime: your flows, hosted and supervised" },
  { name: "Evolution API", note: "WhatsApp infrastructure: the channel to your customers" },
  { name: "Platform", note: "cloud runtime: servers, storage, and databases under one roof" },
]

const COMPARISON = [
  {
    label: "Execution loop",
    composer: "Runs, evaluates, learns",
    chatgpt: "Chat replies",
    n8n: "Workflow triggers",
    openrouter: "API gateway",
  },
  {
    label: "Model routing",
    composer: "Per task, per cost",
    chatgpt: "Fixed model",
    n8n: "Fixed",
    openrouter: "You choose",
  },
  {
    label: "Business context",
    composer: "Your WhatsApp, CRM, ERP wired in",
    chatgpt: "Prompt-only",
    n8n: "Workflow data",
    openrouter: "None",
  },
  {
    label: "Evaluation",
    composer: "Graded result, telemetry",
    chatgpt: "None",
    n8n: "None",
    openrouter: "None",
  },
  {
    label: "Billing",
    composer: "DZD, per run",
    chatgpt: "USD",
    n8n: "USD",
    openrouter: "USD",
  },
  {
    label: "Support",
    composer: "Local AR, FR, EN",
    chatgpt: "None",
    n8n: "None",
    openrouter: "None",
  },
]

const FULLSTACK_WHATSAPP_URL = waLink("Hello Hawiyat, we need the full stack for our operation.")

export const metadata: Metadata = createMetadata({
  title: "AI Composer | LLM Routing & AI Agents in Algeria",
  description:
    "Routes each task to the best model, carries your context, and evaluates every result. Build AI agents on GPT, Claude, Gemini, and open models, billed in DZD.",
  path: "/composer",
  modifiedTime: "2026-10-15",
})

/* ── Layout primitives ─────────────────────────────────────────────────────
 * The page reads as a spec sheet, not a card wall. Structure comes from one
 * bordered container per band, hairline dividers between cells, mono labels
 * and scale contrast. No per-item icon, no per-item border, no colour.
 * ------------------------------------------------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string
  title: string
  lede?: string
  align?: "left" | "center"
}) {
  const centered = align === "center"
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="trace-line h-px w-12 bg-signal" />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">{eyebrow}</p>
      </div>
      <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-[2.6rem]">
        {title}
      </h2>
      {lede && <p className="mt-4 text-base leading-relaxed text-muted-ink">{lede}</p>}
    </div>
  )
}

/** One bordered container, hairline-separated cells, any column count. */
function Band({
  cols = 3,
  children,
}: {
  cols?: 1 | 2 | 3
  children: React.ReactNode
}) {
  const colClass =
    cols === 1 ? "" : cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-border">
      <div className={`grid gap-px ${colClass}`}>{children}</div>
    </div>
  )
}

function Cell({
  label,
  title,
  body,
  meta,
}: {
  label: string
  title: string
  body: string
  meta?: string
}) {
  return (
    <div className="flex min-w-0 flex-col bg-surface p-6 transition-colors duration-300 hover:bg-surface-dim/50">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">{label}</p>
      <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-ink">{body}</p>
      {meta && (
        <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] text-muted-ink">{meta}</p>
      )}
    </div>
  )
}

export default function ComposerPage() {
  return (
    <>
      <ScrollAnimations />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Hawiyat AI Composer",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: "https://www.hawiyat.org/composer",
            description:
              "The AI execution engine. Every task runs UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT, model-agnostic, evaluated, and priced in DZD.",
            offers: [
              {
                "@type": "Offer",
                name: "Pro",
                price: "6000",
                priceCurrency: "DZD",
              },
              {
                "@type": "Offer",
                name: "MAX 5X",
                price: "15000",
                priceCurrency: "DZD",
              },
              {
                "@type": "Offer",
                name: "MAX 20X",
                price: "30000",
                priceCurrency: "DZD",
              },
              {
                "@type": "Offer",
                name: "Enterprise",
                description: "Custom, billed in DZD. Contact us for a quote.",
              },
            ],
          }),
        }}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="reveal-up flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
              <span className="h-px w-12 bg-signal" />
              The engine behind Hawiyat
            </p>
            <h1 className="reveal-up mt-6 text-5xl font-bold leading-[1.02] tracking-tight text-ink md:text-6xl xl:text-7xl">
              Hawiyat AI Composer
            </h1>
            <p className="reveal-up mt-6 text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
              The engine that figures out the best way to do each task.
            </p>
            <p className="reveal-up mt-5 max-w-2xl text-base leading-relaxed text-muted-ink md:text-lg">
              Give Composer a task. It picks the best AI, pulls in the context from your systems, and
              hands you back a result it has already checked. No model juggling, no glue code.
            </p>

            <div className="reveal-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors duration-300 hover:bg-signal-hover"
              >
                See Composer plans
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#trace"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
              >
                Watch a run
                <ArrowRight className="h-4 w-4 rotate-90" />
              </Link>
              <a
                href={USAGE_DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 px-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink transition-colors duration-300 hover:text-ink sm:ml-1"
              >
                Usage dashboard
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="reveal-up mt-12 border-t border-border pt-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
              One API key for all your tools
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {["Cursor", "Claude Code", "Codex", "Antigravity", "GitHub Copilot"].map((tool) => (
                <li key={tool} className="font-mono text-sm text-ink">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Execution loop ─── */}
      <section id="trace" className="scroll-mt-32 border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Execution loop"
            title="Every task becomes a run."
            lede="Think of Composer as a careful coworker. You hand it a task like “resolve the refund for order 3051 on WhatsApp in Algerian Arabic”, or a report, an invoice, a research brief, a code change. It pulls the order and the policy, picks the right model, and checks the answer before it reaches your customer. Done in seconds, for a fraction of a dinar."
          />

          <div className="mt-10">
            <RunConsole />
          </div>

          <div className="mt-10">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
              The six stages, in order
            </p>
            <Band cols={3}>
              {STAGES.map((stage, i) => (
                <Cell
                  key={stage.name}
                  label={String(i + 1).padStart(2, "0")}
                  title={stage.name}
                  body={stage.body}
                />
              ))}
            </Band>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-ink">Your task can be the next run.</p>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
            >
              Try it for your business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Any Model. Any System. ─── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <SectionHeader
                  eyebrow="Any model · any system"
                  title="One layer. Every model. Every system."
                  lede="Your stack is already wired in: WhatsApp, CRM, ERP, email, databases, n8n, and anything else you already run, each as a route the layer can reach. Models are routes too. Here is the guest list."
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="mb-4 flex items-center gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
                  Think · routes in
                </p>
                <span className="h-px flex-1 bg-border" />
              </div>
              <ul className="flex flex-wrap gap-2">
                {MODEL_CHIPS.map((chip) => (
                  <li
                    key={chip.name}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-sm text-ink"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} />
                    {chip.name}
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-ink">
                      {chip.why}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="composer-route-line my-8" />

              <div className="mb-4 flex items-center gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
                  Act · routes out
                </p>
                <span className="h-px flex-1 bg-border" />
              </div>
              <Band cols={2}>
                {SYSTEMS.map((system) => (
                  <Cell
                    key={system.name}
                    label="connected"
                    title={system.name}
                    body={system.note}
                  />
                ))}
              </Band>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Comparison table ─── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Compare"
            title="The layer vs the alternatives."
            lede="The execution layer vs chat, workflow triggers, and a plain gateway. Facts only."
          />

          <div className="mt-10 overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="sticky left-0 z-10 w-40 bg-surface px-5 py-4">
                    <span className="sr-only">Criteria</span>
                  </th>
                  <th
                    scope="col"
                    className="bg-signal-bg/40 px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink"
                  >
                    Hawiyat AI Composer
                  </th>
                  {["ChatGPT", "n8n Cloud", "OpenRouter"].map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-b-0">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-surface px-5 py-4 align-top font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink"
                    >
                      {row.label}
                    </th>
                    <td className="bg-signal-bg/40 px-5 py-4 align-top text-sm font-medium text-ink">
                      {row.composer}
                    </td>
                    <td className="px-5 py-4 align-top text-sm text-muted-ink">{row.chatgpt}</td>
                    <td className="px-5 py-4 align-top text-sm text-muted-ink">{row.n8n}</td>
                    <td className="px-5 py-4 align-top text-sm text-muted-ink">{row.openrouter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Engine capabilities ─── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Habits"
            title="What Composer does with every run."
            lede="Six habits, one engine. You bring the business problem, Composer handles the how."
          />

          <div className="mt-10">
            <Band cols={3}>
              {CAPABILITIES.map((cap, i) => (
                <Cell
                  key={cap.title}
                  label={String(i + 1).padStart(2, "0")}
                  title={cap.title}
                  body={cap.body}
                  meta={cap.telemetry}
                />
              ))}
            </Band>
          </div>
        </div>
      </section>

      {/* ─── Telemetry / metrics band ─── */}
      <section className="border-t border-border bg-surface-dim py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Telemetry"
            title="What's live on the layer."
            lede="Verified figures from the Hawiyat operations dashboard as of August 9, 2026. Nothing else gets printed."
          />

          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-border">
            <div className="grid gap-px sm:grid-cols-2">
              <div className="bg-surface p-8">
                <AnimatedNumber
                  value="200+"
                  className="font-mono text-4xl font-semibold tracking-tight text-ink md:text-5xl"
                />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
                  clients on the platform
                </p>
              </div>
              <div className="bg-surface p-8">
                <AnimatedNumber
                  value="100B+"
                  className="font-mono text-4xl font-semibold tracking-tight text-ink md:text-5xl"
                />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
                  tokens executed through Composer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Enterprise full-stack ─── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="One contract"
                title="The layer. One contract."
                lede="The execution layer runs every model, channel, and workflow you depend on. Deployment, support, telemetry, and billing: one team, one invoice, in DZD."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={FULLSTACK_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors duration-300 hover:bg-signal-hover"
                >
                  Book the full stack
                  <MessageCircle className="h-4 w-4" />
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
                >
                  See pricing in DZD
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Band cols={2}>
                {FULLSTACK.map((item) => (
                  <Cell
                    key={item.name}
                    label="included"
                    title={item.name}
                    body={item.note}
                  />
                ))}
              </Band>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Start"
                title="Start your first run today."
                lede="Pick a Composer plan in DZD, or bring the whole layer. Composer handles the models. You focus on your business."
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors duration-300 hover:bg-signal-hover"
              >
                See plans in DZD
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
              >
                Chat on WhatsApp
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
