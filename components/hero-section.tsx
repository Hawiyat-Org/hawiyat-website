"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, MessageCircle, Play } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { SITE_URL, USAGE_DASHBOARD_URL } from "@/lib/seo"
import { waLink } from "@/lib/contact"

const HeroSection = () => {
  const [introOpen, setIntroOpen] = useState(false)

  return (
    <section
      className="hero-section relative flex min-h-[80vh] w-full max-w-[100vw] flex-col overflow-hidden"
      id="hero-section"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 pb-16 pt-32 text-center md:pt-40">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
          The AI that does the work for you
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl xl:text-7xl">
          Hawiyat AI Composer
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted-ink md:text-lg">
          Hawiyat is the AI provider in Algeria: one API key for GPT, Claude, Gemini, and open
          LLMs through the Composer execution layer. Draft the weekly report, reconcile an
          invoice, or turn a spec into code. It picks the best model, connects your systems,
          and ships a result it already checked. Billed in DZD, supported from Algeria.
        </p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
          >
            See Composer plans
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </Link>
          <Dialog open={introOpen} onOpenChange={setIntroOpen}>
            <DialogTrigger
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink"
              aria-label="Watch the Hawiyat AI Composer intro video"
            >
              <Play className="h-4 w-4" />
              Watch the intro
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogTitle className="sr-only">
                Hawiyat AI Composer intro video
              </DialogTitle>
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  src={
                    introOpen
                      ? "https://www.youtube-nocookie.com/embed/V2N9RvzCdnM?autoplay=1&mute=1&playsinline=1"
                      : ""
                  }
                  title="Hawiyat AI Composer intro"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="aspect-video h-full w-full rounded-md border-0"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-2 w-full max-w-xl border-t border-border text-left">
          <a
            href={USAGE_DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1 border-b border-border py-3 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-ink">
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Already a Composer client?
            </span>
            <span className="text-sm font-medium text-ink underline decoration-border underline-offset-4 group-hover:decoration-ink">
              Open your usage dashboard
            </span>
          </a>

          <a
            href={waLink("Hello Hawiyat! I have a question about Composer.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-ink">
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Questions?
            </span>
            <span className="text-sm font-medium text-ink underline decoration-border underline-offset-4 group-hover:decoration-ink">
              Chat on WhatsApp
            </span>
          </a>

          <p className="pb-1 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-ink">
            Replies in Arabic, French or English
          </p>
        </div>
      </div>

      {/* Machine-readable entity aliases for AI search / structured data. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: SITE_URL,
            name: "Hawiyat, AI provider in Algeria",
            headline: "Hawiyat AI Composer",
            about: {
              "@type": "Organization",
              name: "Hawiyat",
              description:
                "Hawiyat is the AI provider in Algeria: LLM API access to GPT, Claude, Gemini, and open models through the Composer execution layer. The AI infrastructure platform between frontier AI models and the systems your business runs: WhatsApp, CRM, ERP, email, databases, workflows. Model-independent, every run evaluated, priced in DZD.",
            },
          }),
        }}
      />
    </section>
  )
}

export default HeroSection
