import Link from "next/link"
import { ArrowRight } from "lucide-react"

const CallToAction = () => {
  return (
    <section className="relative flex w-full flex-col place-content-center place-items-center px-4 py-16 md:py-24">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-surface-dim px-6 py-14 text-center md:py-20">
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Start
          </p>
          <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
            Your first task, executed in 5 minutes.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-ink">
            Pick a plan on the services page, connect your tools, and run your first task on the
            execution layer. Composer plans, routes, and evaluates — you run the business.
          </p>
          <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
            >
              Start building
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/composer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
            >
              Meet Composer
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
