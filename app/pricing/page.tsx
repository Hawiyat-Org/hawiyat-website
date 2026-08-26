import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
import { getServiceBySlug } from "@/lib/data/services"
import { PricingCatalog, type PricingCard } from "@/components/pricing-catalog"

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
    href: "/services/composer-cursor",
  },
  {
    name: "Composer with Claude Code",
    label: "Composer with Claude Code",
    logos: [TOOL_LOGO, "/Compatible/claude-code.webp"],
    tagline: "Agentic coding in your terminal, without a foreign card.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer-claude-code",
  },
  {
    name: "Composer with Codex",
    label: "Composer with Codex",
    logos: [TOOL_LOGO, "/Compatible/codex.webp"],
    tagline: "OpenAI's coding agent, routed through Composer in DZD.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer-codex",
  },
  {
    name: "Composer with Antigravity",
    label: "Composer with Antigravity",
    logos: [TOOL_LOGO, "/Compatible/antigravity.webp"],
    tagline: "Google's agentic coding workspace, billed in dinars.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer-antigravity",
  },
  {
    name: "Composer with GitHub Copilot",
    label: "Composer with GitHub Copilot",
    logos: [TOOL_LOGO, "/Compatible/github-copilot.svg"],
    tagline: "Your pair programmer, with every task evaluated by Composer.",
    offers: COMPOSER_OFFERS,
    href: "/services/composer-copilot",
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
    offers: [{ label: "Start", price: evolutionService.price, per: evolutionService.priceLabel }],
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

        <PricingCatalog cards={CARDS} />
      </div>
    </div>
  )
}
