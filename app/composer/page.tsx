import Link from "next/link"
import ScrollAnimations from "@/components/scroll-animations"
import { RunConsole } from "@/components/run-console"
import {
  ArrowRight,
  Boxes,
  Braces,
  BrainCircuit,
  Database,
  FileText,
  GitMerge,
  Mail,
  MessageCircle,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  TrendingDown,
  Users,
  Workflow,
} from "lucide-react"

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
  { name: "WhatsApp", icon: MessageCircle, note: "support, sales, back-office" },
  { name: "CRM", icon: Users, note: "records in, answers out" },
  { name: "ERP", icon: Boxes, note: "orders, stock, invoicing" },
  { name: "Email", icon: Mail, note: "sequences and triage" },
  { name: "Databases", icon: Database, note: "grounded, queried, updated" },
  { name: "n8n", icon: Workflow, note: "existing workflows, routed" },
  { name: "Docs & Sheets", icon: FileText, note: "reports, briefs, shared tables" },
  { name: "API endpoints", icon: Braces, note: "your other tools, called on demand" },
]

const CAPABILITIES = [
  {
    title: "Picks the best brain per task",
    icon: BrainCircuit,
    body: "GPT for structure, Claude for nuance, Gemini for speed, open models when you want them at cost. You hand over the task, never the model pick.",
    telemetry: "route: auto",
  },
  {
    title: "Grounds every answer in your business",
    icon: Database,
    body: "Composer pulls the record, the order, the policy from your systems before it writes a word. Answers come from your data, not a model's memory.",
    telemetry: "ctx: grounded",
  },
  {
    title: "Calls tools only when a task needs them",
    icon: Workflow,
    body: "WhatsApp, CRM, ERP, databases, n8n, and anything else you already run. Each run gets the tools it needs and nothing stuck on. The wiring is Composer's job, not yours.",
    telemetry: "tools: on-demand",
  },
  {
    title: "Keeps runs alive when a model doesn't",
    icon: RefreshCw,
    body: "A route slows down or goes dark, Composer cascades to the next best one. No dead runs, no stuck queues, no 3am rebuilds.",
    telemetry: "fallback: cascades",
  },
  {
    title: "Grades every single run",
    icon: ShieldCheck,
    body: "Quality, latency, and cost are checked before anything ships. If a result isn't good enough, it doesn't reach your customer.",
    telemetry: "quality: checked",
  },
  {
    title: "Learns so the next run costs less",
    icon: TrendingDown,
    body: "Cache hits, tighter context, smarter routes. Repeated work drops in cost over time, and every dinar shows on the receipt.",
    telemetry: "cost: trending down",
  },
]

const FULLSTACK = [
  { name: "Composer", icon: GitMerge, note: "execution engine: routes, runs, and evaluates every task" },
  { name: "n8n", icon: Workflow, note: "workflow runtime: your flows, hosted and supervised" },
  { name: "Evolution API", icon: MessageCircle, note: "WhatsApp infrastructure: the channel to your customers" },
  { name: "Platform", icon: ServerCog, note: "cloud runtime: servers, storage, and databases under one roof" },
]

const COMPARISON = [
  {
    label: "Routing",
    composer: "One layer picks the best model per task",
    diy: "You wire each model into each flow by hand",
  },
  {
    label: "Reliability",
    composer: "Automatic fallbacks between models and tools",
    diy: "One dead key takes down the flow",
  },
  {
    label: "Evaluation",
    composer: "Every run graded, logged, and auditable",
    diy: "You learn from tickets, not telemetry",
  },
  {
    label: "Billing",
    composer: "One contract, one invoice, in DZD",
    diy: "Five vendors, USD cards, forex drift",
  },
  {
    label: "Support",
    composer: "Local team in your timezone",
    diy: "You are the support",
  },
]

const DIY_FRAGMENTS = [
  { tool: "openai key", friction: "USD card, per-token" },
  { tool: "claude key", friction: "a second USD card" },
  { tool: "n8n flow", friction: "your glue code" },
  { tool: "whatsapp api", friction: "your uptime" },
  { tool: "db creds", friction: "your backups" },
]

const COMPOSER_RUN = {
  task: '"Quote 150 SIM activations"',
  path: "route → context → tools → evaluate → result",
  result: "3-line quote, PDF, sent at 9pm",
  cost: "1.1 DZD",
}

const FULLSTACK_WHATSAPP_URL =
  "https://wa.me/213559555951?text=Hello%2C%20we%20need%20the%20full%20stack%20%2C%20Composer%20%2B%20n8n%20%2B%20Evolution%20%2B%20Platform"

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">{children}</p>
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
            ],
          }),
        }}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink reveal-up">
              THE ENGINE BEHIND HAWIYAT
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-7xl reveal-up">
              Hawiyat AI Composer
            </h1>
            <p className="text-2xl font-semibold text-ink md:text-3xl reveal-up">
              The engine that figures out the best way to do each task.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-muted-ink md:text-lg reveal-up">
              Give Composer a task. It picks the best AI, pulls in the context from your systems,
              and hands you back a result it has already checked. No model juggling, no glue code.
            </p>
            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row reveal-up">
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors duration-300 hover:bg-signal-hover"
              >
                See Composer plans
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#trace"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
              >
                Watch a run
                <ArrowRight className="h-4 w-4 rotate-90" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Execution loop ─── */}
      <section id="trace" className="scroll-mt-32 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="trace-line h-px w-12 bg-signal" />
              <SectionEyebrow>EXECUTION LOOP</SectionEyebrow>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
              Every task becomes a run.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              Think of Composer as a careful coworker. You hand it a task like &ldquo;resolve the
              refund for order 3051 on WhatsApp in Algerian Arabic&rdquo;, or a report, an invoice,
              a research brief, a code change. It pulls the order and the policy, picks the right
              model, and checks the answer before it reaches your customer. Done in seconds, for a
              fraction of a dinar.
            </p>
          </div>

          <RunConsole />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-muted-ink">Your task can be the next run.</p>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
            >
              Try it for your business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((stage, i) => (
              <div
                key={stage.name}
                className="rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-signal/50"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-mono text-sm font-semibold text-signal-contrast">
                  {stage.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{stage.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Any Model. Any System. ─── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <div className="flex items-center gap-3">
                  <div className="trace-line h-px w-12 bg-signal" />
                  <SectionEyebrow>ANY MODEL · ANY SYSTEM</SectionEyebrow>
                </div>
                <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
                  One layer. Every model. Every system.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-ink">
                  Your stack is already wired in: WhatsApp, CRM, ERP, email, databases, n8n,
                  and anything else you already run, each as a route the layer can reach.
                  Models are routes too. Here is the guest list.
                </p>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="mb-3 flex items-center gap-3">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                  THINK · ROUTES IN
                </p>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-wrap gap-3">
                {MODEL_CHIPS.map((chip) => (
                  <span
                    key={chip.name}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-ink transition-colors duration-300 hover:border-signal/50"
                  >
                    <span className={`h-2 w-2 rounded-full ${chip.dot}`} />
                    {chip.name}
                    <span className="text-[10px] uppercase tracking-widest text-muted-ink">
                      · {chip.why}
                    </span>
                  </span>
                ))}
              </div>

              <div className="composer-route-line my-8" />

              <div className="mb-3 flex items-center gap-3">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                  ACT · ROUTES OUT
                </p>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SYSTEMS.map((system) => (
                  <div
                    key={system.name}
                    className="rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-signal/50"
                  >
                    <system.icon className="h-8 w-8 text-signal" />
                    <h3 className="mt-4 text-lg font-semibold text-ink">{system.name}</h3>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                        role ▸ {system.note}
                      </p>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-dim px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                        <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                        ACTIVE
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Engine capabilities ─── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="trace-line h-px w-12 bg-signal" />
              <SectionEyebrow>HABITS</SectionEyebrow>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
              What Composer does with every run.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              Six habits, one engine. You bring the business problem, Composer handles the how.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-signal/50 md:p-8"
              >
                <cap.icon className="h-7 w-7 text-signal" />
                <h3 className="mt-5 text-xl font-semibold text-ink">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">{cap.body}</p>
                <p className="mt-5 border-t border-border pt-3 font-mono text-[11px] text-muted-ink">
                  {cap.telemetry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Telemetry / metrics band ─── */}
      <section className="bg-surface-dim py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <SectionEyebrow>TELEMETRY</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              What&rsquo;s live on the layer.
            </h2>
            <p className="mt-3 text-sm text-muted-ink">
              Verified figures from the Hawiyat operations dashboard. Nothing else gets printed.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            <div className="rounded-md border border-border bg-surface p-8 text-center">
              <p className="font-mono text-5xl font-bold text-ink md:text-6xl">100+</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
                clients on the platform
              </p>
            </div>
            <div className="rounded-md border border-border bg-surface p-8 text-center">
              <p className="font-mono text-5xl font-bold text-ink md:text-6xl">100B+</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
                tokens executed through Composer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Enterprise full-stack ─── */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-lg border border-border bg-surface p-6 md:p-12">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <div className="trace-line h-px w-12 bg-signal" />
                  <SectionEyebrow>ONE CONTRACT</SectionEyebrow>
                </div>
                <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
                  The whole stack. One contract.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-ink">
                  Composer runs the layer; the rest of the stack runs Composer. Deployment,
                  support, telemetry, and billing: one team, one invoice, in DZD.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
                  >
                    See services in DZD
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {FULLSTACK.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-lg border border-border bg-surface-dim p-6"
                  >
                    <item.icon className="h-7 w-7 text-signal" />
                    <h3 className="mt-4 font-mono text-sm font-semibold text-ink">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-ink">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why not DIY ─── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="trace-line h-px w-12 bg-signal" />
              <SectionEyebrow>WHY NOT DIY</SectionEyebrow>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
              Five tools, one you.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              OpenAI + Claude + n8n + WhatsApp + a database can all work, if you&rsquo;re happy
              being the layer. Composer runs the layer; you run the business.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                DIY · FIVE TOOLS, HAND-GLUED
              </p>
              <ul className="mt-6">
                {DIY_FRAGMENTS.map((fragment) => (
                  <li
                    key={fragment.tool}
                    className="flex items-baseline justify-between gap-3 border-b border-border py-3 last:border-0"
                  >
                    <span className="font-mono text-sm text-muted-ink">{fragment.tool}</span>
                    <span className="font-mono text-[11px] text-muted-ink">{fragment.friction}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-ink">you are the layer</p>
            </div>

            <div className="rounded-lg border-2 border-signal bg-surface p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-signal-contrast">
                COMPOSER · ONE RUN
              </p>
              <div className="mt-6 space-y-3 font-mono text-sm">
                <p className="text-ink">task ▸ {COMPOSER_RUN.task}</p>
                <p className="text-ink">run ▸ {COMPOSER_RUN.path}</p>
                <p className="text-ink">result ▸ {COMPOSER_RUN.result}</p>
                <p className="text-ink">cost ▸ {COMPOSER_RUN.cost}</p>
              </div>
              <p className="mt-6 text-sm font-semibold text-ink">you run the business</p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-lg border border-border">
            {COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className={`grid gap-0 md:grid-cols-3 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="p-5 md:p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                    {row.label}
                  </p>
                </div>
                <div className="flex items-start gap-2.5 border-t border-border p-5 md:border-l md:border-t-0 md:p-6">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ok" />
                  <p className="text-sm leading-relaxed text-ink">{row.composer}</p>
                </div>
                <div className="flex items-start gap-2.5 border-t border-border p-5 md:border-l md:border-t-0 md:p-6">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-muted-ink" />
                  <p className="text-sm leading-relaxed text-muted-ink">{row.diy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionEyebrow>START</SectionEyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
            Start your first run today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-ink">
            Pick a Composer plan in DZD, or bring the whole stack. Composer handles the
            models. You focus on your business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors duration-300 hover:bg-signal-hover"
            >
              See plans in DZD
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://wa.me/213559555951"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-signal hover:bg-signal-bg"
            >
              Chat on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
