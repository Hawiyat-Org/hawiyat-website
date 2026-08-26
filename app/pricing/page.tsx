import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import Pricing from "@/components/pricing"
import { createMetadata } from "@/lib/seo"
import { getServiceBySlug } from "@/lib/data/services"

export const metadata: Metadata = createMetadata({
  title: "Pricing | AI Composer & Services in Algeria",
  description:
    "Hawiyat pricing in Algerian dinars (DZD): AI Composer Pro 6,000 DA/month, MAX 5X 15,000, MAX 20X 30,000, Enterprise custom. n8n hosting, Evolution API, and Hawiyat Cloud. Pay with CCP, Baridi Mob, or USD.",
  path: "/pricing",
  modifiedTime: "2026-08-26",
})

const COMPOSER_TOOLS = [
  {
    name: "Cursor",
    logo: "/Compatible/cursor.webp",
    tagline: "The AI-first code editor, powered by the Composer execution layer.",
  },
  {
    name: "Claude Code",
    logo: "/Compatible/claude-code.webp",
    tagline: "Agentic coding in your terminal, without a foreign card.",
  },
  {
    name: "Codex",
    logo: "/Compatible/codex.webp",
    tagline: "OpenAI's coding agent, routed through Composer in DZD.",
  },
  {
    name: "Antigravity",
    logo: "/Compatible/antigravity.webp",
    tagline: "Google's agentic coding workspace, billed in dinars.",
  },
  {
    name: "GitHub Copilot",
    logo: "/Compatible/github-copilot.svg",
    tagline: "Your pair programmer, with every task evaluated by Composer.",
  },
]

const TOOL_OFFERS = [
  { label: "Pro", price: "6,000", per: "DA/month" },
  { label: "MAX 5X", price: "15,000", per: "DA/month" },
  { label: "MAX 20X", price: "30,000", per: "DA/month" },
]

const n8nService = getServiceBySlug("n8n-hosting")
const evolutionService = getServiceBySlug("evolution-api")

const MANAGED_SERVICES = [
  n8nService && {
    name: n8nService.name,
    logo: n8nService.image ?? "/logos/n8n_n8n.png",
    description: n8nService.description,
    offers: (n8nService.plans ?? [])
      .filter((p) => !p.custom)
      .map((p) => ({ label: p.name, price: p.price, per: p.priceLabel })),
    href: "/services/n8n-hosting",
  },
  evolutionService && {
    name: evolutionService.name,
    logo: evolutionService.image ?? "/logos/evolutionapi_evolutionapi.png",
    description: evolutionService.description,
    offers: [{ label: "Start", price: evolutionService.price, per: evolutionService.priceLabel }],
    href: "/services/evolution-api",
  },
].filter(Boolean) as Array<{
  name: string
  logo: string
  description: string
  offers: Array<{ label: string; price: string; per: string }>
  href: string
}>

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-80">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-lg bg-gradient-to-b from-foreground/[0.03] to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl text-ink">Pricing in DZD</h1>
          <p className="mt-5 text-lg text-muted-ink">
            AI Composer plans, n8n hosting, Evolution API, and Hawiyat Cloud, all billed in
            Algerian dinars. Pay with CCP, Baridi Mob, or USD. Machine-readable copy is always
            available at /pricing.md for AI agents.
          </p>
        </header>
        <Pricing />

        {/* Managed services — n8n Hosting & Evolution API */}
        <section className="mx-auto mt-24 max-w-6xl" id="managed-services">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
              Managed services
            </p>
            <h2 className="text-4xl font-semibold text-ink lg:text-5xl">
              n8n, WhatsApp, and hosting — billed in DZD
            </h2>
            <p className="text-base text-muted-ink">
              Managed automation and messaging infrastructure, operated by the Hawiyat team and
              priced in dinars.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {MANAGED_SERVICES.map((service) => (
              <div
                key={service.name}
                className="flex flex-col justify-between rounded-lg border border-border bg-surface p-6 transition-colors hover:border-signal"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src={service.logo}
                      alt={`${service.name} logo`}
                      className="h-10 w-10 rounded-md border border-border bg-surface-dim object-contain p-1"
                    />
                    <h3 className="text-lg font-semibold text-ink">{service.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">{service.description}</p>
                  <ul className="mt-5 space-y-3">
                    {service.offers.map((offer) => (
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
                          {offer.price} <span className="text-xs text-muted-ink">{offer.per}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={service.href}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                >
                  Order {service.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                  No card needed. CCP or Baridi Mob.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Composer for your tools — one API key for all your tools */}
        <section className="mx-auto mt-24 max-w-6xl" id="composer-tools">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
              One API key for all your tools
            </p>
            <h2 className="text-4xl font-semibold text-ink lg:text-5xl">
              Composer with the tools you already use
            </h2>
            <p className="text-base text-muted-ink">
              The same Composer plans, wired for your tool. One API key, activated once, works
              with every one of them — and the quota is what the plan really gives you, with no
              5-hour cap and no weekly cap.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMPOSER_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col justify-between rounded-lg border border-border bg-surface p-6 transition-colors hover:border-signal"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.svg"
                      alt="Hawiyat Composer logo"
                      className="h-10 w-10 rounded-md border border-border bg-surface-dim object-contain p-1"
                    />
                    <img
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="h-10 w-10 rounded-md border border-border bg-surface-dim object-contain p-1"
                    />
                  </div>
                  <span className="mt-4 inline-block rounded-md border border-border bg-surface-dim px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-ink">
                    Composer with {tool.name}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">{tool.tagline}</p>
                  <ul className="mt-5 space-y-3">
                    {TOOL_OFFERS.map((offer) => (
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
                          {offer.price} <span className="text-xs text-muted-ink">{offer.per}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/services/composer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
                >
                  Order Composer
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
