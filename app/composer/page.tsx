import Link from "next/link"
import ScrollAnimations from "@/components/scroll-animations"
import { ExecutionTrace } from "@/components/execution-trace"
import {
  ArrowRight,
  Boxes,
  Database,
  FileSearch,
  Gauge,
  GitMerge,
  Mail,
  MessageCircle,
  Network,
  RefreshCw,
  ServerCog,
  ShieldCheck,
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
  { name: "GPT", dot: "bg-ink" },
  { name: "Claude", dot: "bg-ember" },
  { name: "Gemini", dot: "bg-signal" },
  { name: "Llama", dot: "bg-muted-ink" },
  { name: "Open models", dot: "bg-signal-contrast" },
]

const SYSTEMS = [
  { name: "WhatsApp", icon: MessageCircle, note: "support, sales, back-office" },
  { name: "CRM", icon: Users, note: "records in, answers out" },
  { name: "ERP", icon: Boxes, note: "orders, stock, invoicing" },
  { name: "Email", icon: Mail, note: "sequences and triage" },
  { name: "Databases", icon: Database, note: "grounded, queried, updated" },
  { name: "n8n", icon: Workflow, note: "existing workflows, routed" },
]

const CAPABILITIES = [
  {
    title: "Model Gateway",
    icon: Network,
    body: "Routes every task to the best model for the job, by quality, latency, and cost. GPT, Claude, Gemini, and open models sit behind one route.",
  },
  {
    title: "Context Selector",
    icon: FileSearch,
    body: "Pulls the right context per task: CRM records, docs, order history, so answers are grounded in your business, not the model's memory.",
  },
  {
    title: "Tool Router",
    icon: Workflow,
    body: "Calls WhatsApp, CRM, ERP, databases, and n8n only when a task needs them. Tools stay connected; workflows stay clean.",
  },
  {
    title: "Reliability & Fallbacks",
    icon: RefreshCw,
    body: "When a route fails or a model degrades, Composer cascades to the next best route automatically. No dead runs.",
  },
  {
    title: "Guardrails & Evaluations",
    icon: ShieldCheck,
    body: "Every result is graded on quality, latency, and cost, with logs you can audit. Runs ship evaluated, or they don't ship.",
  },
  {
    title: "Cost Controls",
    icon: Gauge,
    body: "Caching, compression, and budgets, with per-task cost in DZD. Cost is measured and managed, never guessed.",
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

const FULLSTACK_WHATSAPP_URL =
  "https://wa.me/213559555951?text=Hello%2C%20we%20need%20the%20full%20stack%20%E2%80%94%20Composer%20%2B%20n8n%20%2B%20Evolution%20%2B%20Platform"

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">{children}</p>
  )
}

export default function ComposerPage() {
  return (
    <>
      <ScrollAnimations />

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
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-transform duration-300 hover:scale-[1.03]"
              >
                Start building
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#trace"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                See how it executes
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
              Think of Composer as a careful coworker. You hand it a task, &ldquo;reply to order
              1024 on WhatsApp in Arabic&rdquo;, and it figures out the rest: which AI is best,
              what it needs to know, and whether the answer is good enough before it reaches your
              customer.
            </p>
          </div>

          <div className="reveal-up">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-lg border border-border bg-surface px-4 py-2 font-mono text-xs text-ink">
                task ▸ &ldquo;Reply to order 1024 on WhatsApp in Arabic&rdquo;
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                RUN 02 · COMPLETED
              </span>
            </div>
            <ExecutionTrace
              active={5}
              telemetry={[
                "route: auto",
                "model: gpt-4o → claude-sonnet",
                "ctx: docs/FAQ · 12k",
                "tools: [whatsapp, crm]",
                "cost: ~0.4 DZD",
                "latency: 210ms",
                "quality: 0.98",
              ]}
              className="p-5 md:p-7"
            />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((stage, i) => (
              <div
                key={stage.name}
                className="rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:scale-[0.98]"
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
                  Your stack is already wired in: WhatsApp, CRM, ERP, email, databases, and
                  n8n, each as a route the layer can reach. Models are routes too. Here is
                  the guest list.
                </p>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-3">
                {MODEL_CHIPS.map((chip) => (
                  <span
                    key={chip.name}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-ink"
                  >
                    <span className={`h-2 w-2 rounded-full ${chip.dot}`} />
                    {chip.name}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SYSTEMS.map((system) => (
                  <div
                    key={system.name}
                    className="group rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:scale-[0.98]"
                  >
                    <system.icon className="h-8 w-8 text-signal" />
                    <h3 className="mt-4 text-lg font-semibold text-ink">{system.name}</h3>
                    <p className="mt-1 text-sm text-muted-ink">{system.note}</p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-ink group-hover:text-signal">
                      Route to →
                    </p>
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
              <SectionEyebrow>ENGINE</SectionEyebrow>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
              What Composer does with every run.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              Six capabilities working as one engine. You bring the business problem; Composer
              decides the how.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:scale-[0.98] md:p-8"
              >
                <cap.icon className="h-7 w-7 text-signal" />
                <h3 className="mt-5 text-xl font-semibold text-ink">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">{cap.body}</p>
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
            <div className="rounded-3xl border border-border bg-surface p-8 text-center">
              <p className="font-mono text-5xl font-bold text-signal md:text-6xl">100+</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
                clients on the platform
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-surface p-8 text-center">
              <p className="font-mono text-4xl font-bold text-signal md:text-5xl">≈2.6M DZD</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
                annual recurring revenue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Enterprise full-stack ─── */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-border bg-surface p-6 md:p-12">
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
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Book with the team
                    <MessageCircle className="h-4 w-4" />
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Browse services
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
              The fragments are the trap.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              OpenAI + Claude + n8n + WhatsApp + a database can all work, if you&rsquo;re happy
              being the layer. Composer runs the layer; you run the business.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border">
            <div className="hidden grid-cols-12 gap-0 bg-surface-dim md:grid">
              <div className="col-span-4 p-6 font-mono text-xs uppercase tracking-widest text-muted-ink">
                &nbsp;
              </div>
              <div className="col-span-4 border-l border-border bg-surface p-6 font-mono text-xs font-semibold uppercase tracking-widest text-signal-contrast">
                Composer: the layer
              </div>
              <div className="col-span-4 border-l border-border p-6 font-mono text-xs uppercase tracking-widest text-muted-ink">
                DIY: 5 tools, hand-glued
              </div>
            </div>

            {COMPARISON.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-12 gap-0 border-t border-border"
              >
                <div className="col-span-12 p-5 md:col-span-4 md:p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                    {row.label}
                  </p>
                </div>
                <div className="col-span-12 border-t border-border p-5 md:col-span-4 md:border-l md:border-t-0 md:p-6">
                  <p className="bg-surface rounded-lg px-4 py-3 text-sm text-ink">{row.composer}</p>
                </div>
                <div className="col-span-12 border-t border-border p-5 md:col-span-4 md:border-l md:border-t-0 md:p-6">
                  <p className="text-sm text-muted-ink">{row.diy}</p>
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
            Have your first task running today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-ink">
            Pick a plan on the services page, or bring the whole stack. Composer handles the
            models. You handle the business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-transform duration-300 hover:scale-[1.03]"
            >
              Browse services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://wa.me/213559555951"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Talk to the team
              <MessageCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
