import Link from "next/link"
import { MessageCircle } from "lucide-react"

const HeroSection = () => {
  return (
    <section
      className="hero-section relative flex min-h-[80vh] w-full max-w-[100vw] flex-col overflow-hidden"
      id="hero-section"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 pb-16 pt-32 text-center md:pt-40">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
          AI that works for your business
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl xl:text-7xl">
          Your AI just works.
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted-ink md:text-lg">
          Hawiyat picks the best AI for the job, connects your systems, and checks the result — billed in DZD, supported from Algeria.
        </p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
          >
            Get Started
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </Link>
          <Link
            href="/composer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink"
          >
            How it works
          </Link>
        </div>

        <p className="font-mono text-xs text-muted-ink">
          100+ paying clients · 100B+ tokens executed · ≈2.6M DZD ARR
        </p>

        <a
          href="https://wa.me/213559555951?text=Hello%20Hawiyat!%20I%20have%20a%20question%20about%20Composer."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-ink transition-colors hover:text-ink"
        >
          <MessageCircle className="h-4 w-4" />
          Questions? Chat with the team on WhatsApp
        </a>
      </div>

      {/* Machine-readable entity aliases for AI search / structured data. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: "https://www.hawiyat.org/",
            name: "Hawiyat — AI infrastructure platform",
            headline: "Your AI just works.",
            about: {
              "@type": "Organization",
              name: "Hawiyat",
              description:
                "The AI infrastructure platform between frontier AI models and the systems your business runs — WhatsApp, CRM, ERP, email, databases, workflows. Model-independent, every run evaluated, priced in DZD.",
            },
          }),
        }}
      />
    </section>
  )
}

export default HeroSection
