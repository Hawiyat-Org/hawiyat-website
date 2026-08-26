import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { getServiceBySlug } from "@/lib/data/services"

export const metadata: Metadata = createMetadata({
  title: "Pricing | AI Composer & Services in Algeria",
  description:
    "Hawiyat pricing in Algerian dinars (DZD): AI Composer Pro 6,000 DA/month, MAX 5X 15,000, MAX 20X 30,000, Enterprise custom. n8n hosting, Evolution API, and Hawiyat Cloud. Pay with CCP, Baridi Mob, or USD.",
  path: "/pricing",
  modifiedTime: "2026-08-26",
})

const COMPOSER_OFFERS = [
  { label: "Pro", price: "6,000", per: "DA/month" },
  { label: "MAX 5X", price: "15,000", per: "DA/month" },
  { label: "MAX 20X", price: "30,000", per: "DA/month" },
]

interface PricingCard {
  name: string
  label: string
  logos: string[]
  tagline: string
  offers: Array<{ label: string; price: string; per: string }>
  href: string
}

const TOOL_LOGO = "/logo.svg"

const CARDS: PricingCard[] = [
  {
    name: "Composer",
    label: "Composer",
    logos: [TOOL_LOGO],
    tagline: "The execution layer for all your AI tasks. Enter, see the info, and choose your plan.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer",
  },
  {
    name: "Composer with Cursor",
    label: "Composer with Cursor",
    logos: [TOOL_LOGO, "/Compatible/cursor.webp"],
    tagline: "The AI-first code editor, powered by the Composer execution layer.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer",
  },
  {
    name: "Composer with Claude Code",
    label: "Composer with Claude Code",
    logos: [TOOL_LOGO, "/Compatible/claude-code.webp"],
    tagline: "Agentic coding in your terminal, without a foreign card.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer",
  },
  {
    name: "Composer with Codex",
    label: "Composer with Codex",
    logos: [TOOL_LOGO, "/Compatible/codex.webp"],
    tagline: "OpenAI's coding agent, routed through Composer in DZD.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer",
  },
  {
    name: "Composer with Antigravity",
    label: "Composer with Antigravity",
    logos: [TOOL_LOGO, "/Compatible/antigravity.webp"],
    tagline: "Google's agentic coding workspace, billed in dinars.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer",
  },
  {
    name: "Composer with GitHub Copilot",
    label: "Composer with GitHub Copilot",
    logos: [TOOL_LOGO, "/Compatible/github-copilot.svg"],
    tagline: "Your pair programmer, with every task evaluated by Composer.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer",
  },
]

// n8n Hosting & Evolution API — same card style as the Composer cards
const n8nService = getServiceBySlug("n8n-hosting")
const evolutionService = getServiceBySlug("evolution-api")

if (n8nService) {
  CARDS.push({
    name: n8nService.name,
    label: n8nService.name,
    logos: [n8nService.image ?? "/logos/n8n_n8n.png"],
    tagline: n8nService.description,
    offers: (n8nService.plans ?? [])
      .filter((p) => !p.custom)
      .map((p) => ({ label: p.name, price: p.price, per: p.priceLabel })),
    href: "/services/n8n-hosting",
  })
}

if (evolutionService) {
  CARDS.push({
    name: evolutionService.name,
    label: evolutionService.name,
    logos: [evolutionService.image ?? "/logos/evolutionapi_evolutionapi.png"],
    tagline: evolutionService.description,
    offers: [
      { label: "Start", price: evolutionService.price, per: evolutionService.priceLabel },
    ],
    href: "/services/evolution-api",
  })
}

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-80">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-lg bg-gradient-to-b from-foreground/[0.03] to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl text-ink">Pricing in DZD</h1>
          <p className="mt-5 text-lg text-muted-ink">
            AI Composer, n8n hosting, and Evolution API — all billed in Algerian dinars. Pay with
            CCP, Baridi Mob, or USD. Machine-readable copy is always available at /pricing.md for
            AI agents.
          </p>
        </header>

        {/* One grid — every product at the same level */}
        <section className="mx-auto max-w-6xl" id="pricing-catalog">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
              One API key for all your tools
            </p>
            <h2 className="text-4xl font-semibold text-ink lg:text-5xl">
              Everything, in one place
            </h2>
            <p className="text-base text-muted-ink">
              One API key, activated once, works with every tool — and the quota is what the plan
              really gives you, with no 5-hour cap and no weekly cap. Pick a product, see the info,
              and choose your plan.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <div
                key={card.name}
                className="flex flex-col justify-between rounded-lg border border-border bg-surface p-6 transition-colors hover:border-signal"
              >
                <div>
                  <div className="flex items-center gap-3">
                    {card.logos.map((logo) => (
                      <img
                        key={logo}
                        src={logo}
                        alt={`${card.name} logo`}
                        className="h-10 w-10 rounded-md border border-border bg-surface-dim object-contain p-1"
                      />
                    ))}
                  </div>
                  <span className="mt-4 inline-block rounded-md border border-border bg-surface-dim px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-ink">
                    {card.label}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">{card.tagline}</p>
                  <ul className="mt-5 space-y-3">
                    {card.offers.map((offer) => (
                      <li
                        key={offer.label}
                        className="flex items-center justify-between gap-2 text-sm text-muted-ink"
                      >
                        <span className="flex items-center gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-ink" />
                          <span className="font-mono text-[11px] uppercase tracking-wider">
                            {offer.label}
                          </span>
                        </span>
                        <span className="font-mono font-semibold text-ink">
                          {offer.price}{" "}
                          <span className="text-xs text-muted-ink">{offer.per}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                >
                  {card.name === "Composer" ? "See plans and choose" : `Order ${card.name}`}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                  No card needed. CCP or Baridi Mob.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
