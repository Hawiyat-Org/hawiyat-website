import Link from "next/link"
import AIPlayground from "@/components/ai-playground"

const HeroSection = () => {
  return (
    <section
      className="hero-section relative flex min-h-[85vh] w-full max-w-[100vw] flex-col overflow-hidden"
      id="hero-section"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-32 md:pt-40 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-20">
        {/* Ambient glow (token-based, replaces legacy purple blob) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-signal/20 blur-3xl"
        />

        {/* Left: copy */}
        <div className="flex flex-col items-center gap-6 text-center lg:col-span-6 lg:items-start lg:text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Hawiyat AI Composer · Execution Layer
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl xl:text-7xl">
            The layer that decides how your business uses AI.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-ink md:text-lg">
            Hawiyat is the AI infrastructure platform between frontier AI models and the systems
            you run — WhatsApp, CRM, ERP, email, databases, workflows. It plans, routes, and
            executes every task: the best model, the right context, automatic fallbacks, and an
            evaluated result. Every run in DZD.
          </p>

          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/composer"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-transform duration-300 hover:scale-[1.03]"
            >
              Start building
              <span aria-hidden="true" className="text-base leading-none">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              See services
            </Link>
          </div>
        </div>

        {/* Right: Execution Console (keeps #dashboard for the GSAP 3D wrapper) */}
        <div className="relative w-full lg:col-span-6">
          <div id="dashboard" className="relative">
            <AIPlayground />
          </div>
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
