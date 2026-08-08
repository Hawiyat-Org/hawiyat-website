import Link from "next/link"

const HeroSection = () => {
  return (
    <section
      className="hero-section relative flex min-h-[80vh] w-full max-w-[100vw] flex-col overflow-hidden"
      id="hero-section"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 pb-16 pt-32 text-center md:pt-40">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
          Hawiyat AI Composer · Execution Layer
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl xl:text-7xl">
          The layer that decides how your business uses AI.
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted-ink md:text-lg">
          The right model for every task, your systems connected, results you can verify — billed in DZD, supported from Algeria.
        </p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/services"
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
            headline: "The layer that decides how your business uses AI.",
            about: {
              "@type": "Organization",
              name: "Hawiyat",
              description:
                "The AI infrastructure platform between frontier AI models and business systems — WhatsApp, CRM, ERP, email, databases, workflows. Model-independent, evaluated on every run, priced in DZD.",
            },
          }),
        }}
      />
    </section>
  )
}

export default HeroSection
