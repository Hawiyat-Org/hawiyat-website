import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
import { getServiceBySlug } from "@/lib/data/services"
import { PricingCatalog, type PricingSection } from "@/components/pricing-catalog"
import { Building2, Clock, ShieldCheck, Wallet } from "lucide-react"

export const metadata: Metadata = createMetadata({
  title: "AI Pricing in Algeria | Composer from 6,000 DA",
  description:
    "AI Composer from 6,000 DA/month, MAX 5X 15,000, MAX 20X 30,000. LLM credits, n8n, WhatsApp API, and cloud in DZD. Pay with CCP or Baridi Mob, no foreign card.",
  path: "/pricing",
  modifiedTime: "2026-09-09",
})

const COMPOSER_OFFERS = [
  { label: "Pro", price: "6,000", per: "DA/month" },
  { label: "MAX 5X", price: "15,000", per: "DA/month" },
  { label: "MAX 20X", price: "30,000", per: "DA/month" },
]

const TOOL_LOGO = "/logo.svg"

const TRUST_BAND = [
  { icon: Wallet, text: "Pay with CCP, Baridi Mob, or USD" },
  { icon: Building2, text: "No foreign card needed" },
  { icon: Clock, text: "Activated within 24 hours" },
  { icon: ShieldCheck, text: "Support in Arabic, French, English" },
]

const toolCard = (
  name: string,
  label: string,
  logo: string,
  tagline: string,
  href: string
) => ({
  name,
  label,
  logos: [TOOL_LOGO, logo],
  tagline,
  offers: COMPOSER_OFFERS,
  href,
  cta: "Order now",
})

function buildSections(): PricingSection[] {
  const n8nService = getServiceBySlug("n8n-hosting")
  const evolutionService = getServiceBySlug("evolution-api")
  const cloudService = getServiceBySlug("hawiyat-cloud")

  const composerCards: PricingSection["cards"] = [
    {
      name: "Composer",
      label: "Composer",
      logos: [TOOL_LOGO],
      tagline: "The execution layer for all your AI tasks. Enter, see the info, and choose your plan.",
      offers: COMPOSER_OFFERS,
      href: "/services/composer",
      cta: "See plans and choose",
      badge: "Most popular",
    },
    toolCard("Composer with Cursor", "Composer with Cursor", "/Compatible/cursor.webp",
      "The AI-first code editor, powered by the Composer execution layer.", "/services/composer-cursor"),
    toolCard("Composer with Claude Code", "Composer with Claude Code", "/Compatible/claude-code.webp",
      "Agentic coding in your terminal, without a foreign card.", "/services/composer-claude-code"),
    toolCard("Composer with Codex", "Composer with Codex", "/Compatible/codex.webp",
      "OpenAI's coding agent, routed through Composer in DZD.", "/services/composer-codex"),
    toolCard("Composer with Antigravity", "Composer with Antigravity", "/Compatible/antigravity.webp",
      "Google's agentic coding workspace, billed in dinars.", "/services/composer-antigravity"),
    toolCard("Composer with GitHub Copilot", "Composer with GitHub Copilot", "/Compatible/github-copilot.svg",
      "Your pair programmer, with every task evaluated by Composer.", "/services/composer-copilot"),
  ]

  const managedCards: PricingSection["cards"] = []
  if (n8nService) {
    managedCards.push({
      name: n8nService.name,
      label: n8nService.name,
      logos: [n8nService.image ?? "/logos/n8n_n8n.png"],
      tagline: n8nService.description,
      offers: (n8nService.plans ?? [])
        .filter((p) => !p.custom)
        .map((p) => ({ label: p.name, price: p.price, per: p.priceLabel })),
      href: "/services/n8n-hosting",
      cta: "Order now",
    })
  }
  if (evolutionService) {
    managedCards.push({
      name: evolutionService.name,
      label: evolutionService.name,
      logos: [evolutionService.image ?? "/logos/evolutionapi_evolutionapi.png"],
      tagline: evolutionService.description,
      offers: [{ label: "Start", price: evolutionService.price, per: evolutionService.priceLabel }],
      href: "/services/evolution-api",
      cta: "Order now",
    })
  }

  const cloudCards: PricingSection["cards"] = []
  if (cloudService) {
    cloudCards.push({
      name: cloudService.name,
      label: cloudService.name,
      logos: [cloudService.image ?? "/logo.svg"],
      tagline: cloudService.description,
      offers: [{ label: "By order", price: "Quote", per: "in DZD" }],
      href: "/services/hawiyat-cloud",
      cta: "Plan your deployment",
    })
  }

  return [
    {
      id: "composer",
      title: "AI Composer",
      subtitle: "One API key to GPT, Claude, Gemini, and open models - with the execution layer on top.",
      cards: composerCards,
    },
    {
      id: "credits",
      title: "LLM Credits",
      subtitle: "Prepaid balance on your API key - any amount from 2,000 DA, no subscription.",
      cards: [
        {
          name: "LLM Credits",
          label: "LLM Credits",
          logos: [TOOL_LOGO],
          tagline: "Buy dinars, spend on GPT, Claude, Gemini, and more. Pick your models or let Composer route.",
          offers: [
            { label: "Starter", price: "2,000", per: "DA" },
            { label: "Builder", price: "5,000", per: "DA" },
            { label: "Any amount", price: "2,000+", per: "DA" },
          ],
          href: "/credits",
          cta: "Buy credits",
          badge: "New",
        },
      ],
    },
    {
      id: "managed",
      title: "Managed Systems",
      subtitle: "Automation infrastructure, hosted and maintained for you.",
      cards: managedCards,
    },
    {
      id: "cloud",
      title: "Cloud Runtime",
      subtitle: "Your workloads on our infrastructure, planned around your needs.",
      cards: cloudCards,
    },
  ]
}

const SECTIONS = buildSections()

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-80">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-lg bg-gradient-to-b from-foreground/[0.03] to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl text-ink">AI pricing in DZD</h1>
          <p className="mt-5 text-lg text-muted-ink">
            AI Composer, LLM credits, n8n hosting, and Hawiyat Cloud - all billed in Algerian
            dinars. Pay with CCP, Baridi Mob, or USD.
          </p>
        </header>

        {/* Trust band */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
          {TRUST_BAND.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.text}
                className="flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-surface px-3 py-2.5 text-center"
              >
                <Icon className="h-4 w-4 shrink-0 text-signal-contrast" />
                <span className="text-xs font-medium text-muted-ink">{item.text}</span>
              </div>
            )
          })}
        </div>

        <PricingCatalog sections={SECTIONS} />
      </div>
    </div>
  )
}
