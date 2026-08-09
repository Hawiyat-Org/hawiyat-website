import Link from "next/link"
import Image from "next/image"
import { Check, ArrowRight, ExternalLink } from "lucide-react"
import { getComposerService } from "@/lib/data/services"

const proService = getComposerService("composer-pro")

const TIERS = [
  {
    id: "composer-pro",
    label: "PRO",
    capacity: "For solo builders. Give it a task, get a checked result.",
  },
  {
    id: "composer-max5x",
    label: "MAX 5X",
    capacity: "5× more tasks at the same time, for startups and teams shipping daily.",
  },
  {
    id: "composer-max20x",
    label: "MAX 20X",
    capacity: "20× more tasks at the same time, for agencies running AI at scale.",
  },
]

const FEATURES = [
  "Model-agnostic routing per task",
  "Context-aware execution against your systems",
  "Automatic model fallbacks on failure",
  "Evaluation and quality score for every run",
  "Billed in DZD with a transparent per-task cost",
]

const ComposerCard = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            The execution engine
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Composer runs the layer.
          </h2>
          <p className="mt-3 text-sm text-muted-ink">
            Every task routed, executed, and checked. Priced in dinars.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-border bg-surface shadow-md">
          <div className="grid md:grid-cols-[260px_1fr]">
            <div className="relative flex items-center justify-center bg-gradient-to-br from-surface-dim/40 to-surface-dim/10 p-8 md:p-10">
              <div className="relative h-24 w-24 md:h-32 md:w-32">
                <Image
                  src={proService.image ?? "/logo.svg"}
                  alt="Hawiyat AI Composer"
                  fill
                  className="object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 p-6 md:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center self-start rounded-md border border-signal/20 bg-signal px-2 py-0.5 text-xs font-medium text-signal-text">
                  AI Execution
                </span>
                <span className="inline-flex items-center rounded-md bg-signal px-2.5 py-0.5 text-xs font-bold text-signal-text">
                  The engine
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-ink md:text-3xl">
                Hawiyat AI Composer
              </h3>
              <p className="text-sm leading-relaxed text-muted-ink">
                Composer is the execution layer between frontier models and your business
                systems. It decides the best way to do each task, routes it, carries your
                context, and evaluates every result.
              </p>

              <div className="mt-1 space-y-2">
                {TIERS.map((tier) => {
                  const service = getComposerService(tier.id)
                  return (
                    <div
                      key={tier.id}
                      className="flex items-baseline justify-between gap-4 rounded-lg border border-border bg-surface-dim px-4 py-3"
                    >
                      <div>
                        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink">
                          {tier.label}
                        </p>
                        <p className="text-xs text-muted-ink">{tier.capacity}</p>
                      </div>
                      <p className="shrink-0 font-mono text-lg font-bold text-ink">
                        {Number(service.price).toLocaleString("en-US")}
                        <span className="text-xs font-normal text-muted-ink"> {service.priceLabel}</span>
                      </p>
                    </div>
                  )
                })}
              </div>

              <ul className="grid gap-2 sm:grid-cols-2">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
                >
                  See plans in DZD
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://usage.ai.hawiyat.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                >
                  Open your usage dashboard
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComposerCard
