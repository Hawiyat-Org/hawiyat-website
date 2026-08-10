import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col place-content-center place-items-center overflow-hidden px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
          Run failed to resolve
        </p>
        <h1 className="text-6xl font-bold leading-[1.05] tracking-tight text-ink md:text-8xl">
          404
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-ink md:text-lg">
          That page does not exist on the layer. The route was not found, so nothing ran and nothing
          shipped. Let&apos;s get you back to work.
        </p>
        <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/composer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
          >
            See Composer in action
          </Link>
          <a
            href="https://wa.me/213559555951"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
          >
            Chat on WhatsApp
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
