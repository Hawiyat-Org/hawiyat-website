import { existsSync } from "node:fs"
import path from "node:path"
import Link from "next/link"
import { ArrowRight, Check, MessageCircle } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { getServiceBySlug } from "@/lib/data/services"
import { ServiceOrderForm } from "@/components/services/service-order-form"
import { WhatsAppCta } from "@/components/start/wa-cta"
import { landingFaqs } from "@/lib/data/landing-faqs"

/**
 * Ad landing page (/start).
 *
 * A single focused page for paid traffic: what you get, what it costs, how to
 * pay, and the ten questions that fill the inbox — then either order or hand
 * off to WhatsApp. Built at the request of Chams (2026-10-05) to cut the manual
 * "explain everything again" load in the DMs.
 *
 * noindex: this page duplicates the home page's job for paid traffic. Indexing
 * it would compete with / for the same queries, so it is deliberately excluded
 * from search while staying fully crawlable.
 */
export const metadata = {
  ...createMetadata({
    title: "Hawiyat Composer — one API key, billed in dinars",
    description:
      "GPT, Claude, Gemini and open models on one API key, paid with CCP or Baridi Mob. Plans from 6,000 DA/month. Activated within 24 hours.",
    path: "/start",
    modifiedTime: "2026-10-05",
  }),
  robots: { index: false, follow: true },
}

const EXPLAINER_SRC = "/media/hawiyat-composer-explainer.mp4"
const hasExplainer = existsSync(path.join(process.cwd(), "public", EXPLAINER_SRC))

const WA_INTRO =
  "Salam, I came from the ad. I want the Composer key — here is what I want to use it for:"

const whatYouGet = [
  {
    title: "One key, every model",
    body: "GPT, Claude, Gemini and open models behind the same key. Composer picks the model that fits each task, so a provider change never breaks your work.",
  },
  {
    title: "Works with your tools",
    body: "Claude Code, Codex, Cursor, Antigravity or GitHub Copilot. You keep the tool you know; we provide the access.",
  },
  {
    title: "A key, not a login",
    body: "You own the key and can see every request. No shared account, no email subscription you cannot audit.",
  },
  {
    title: "Your usage, in the open",
    body: "A dashboard shows requests, tokens and the percentage of your monthly cap used — amber past 70%, red past 90%.",
  },
]

const plans = [
  {
    name: "Pro",
    price: "6,000",
    tagline: "For solo builders. One key, the whole catalogue.",
    features: [
      "One API key for Claude Code, Codex, Cursor, Antigravity, Copilot",
      "Model routing per task",
      "Monthly cap with a live usage dashboard",
      "Activated within 24 hours",
    ],
    highlight: true,
  },
  {
    name: "MAX 5X",
    price: "15,000",
    tagline: "For startups shipping every day.",
    features: [
      "5x the parallel capacity of Pro",
      "Everything in Pro",
      "Priority support on WhatsApp",
      "One invoice in dinars",
    ],
    highlight: false,
  },
  {
    name: "MAX 20X",
    price: "30,000",
    tagline: "For teams running production work.",
    features: [
      "20x the parallel capacity of Pro",
      "Everything in MAX 5X",
      "Built for production workloads",
      "One invoice in dinars",
    ],
    highlight: false,
  },
]

export default function StartPage() {
  const composer = getServiceBySlug("composer")

  // Only the fields ServiceOrderForm needs. The full service object carries
  // lucide icon components in `bulletPoints`, which cannot cross into a client
  // component boundary (prerender error: "Functions cannot be passed directly
  // to Client Components").
  const orderableComposer =
    composer &&
    ({
      id: composer.id,
      name: composer.name,
      tag: composer.tag,
      price: composer.price,
      priceLabel: composer.priceLabel,
      image: composer.image,
      images: composer.images,
    } as const)

  return (
    <>
      {/* Hero */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 pt-16 pb-12 md:pt-24">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            Algeria · billed in dinars
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-ink md:text-6xl">
            GPT, Claude and Gemini on one API key.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-ink md:text-lg">
            One key you use in Claude Code, Codex or Cursor. Paid with CCP or Baridi Mob, no
            foreign card, activated within 24 hours.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppCta message={WA_INTRO} label="Ask on WhatsApp" />
            <Link
              href="#plans"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-surface-dim"
            >
              See the plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-muted-ink sm:flex-row sm:gap-6">
            {["No foreign card needed", "Activated within 24 hours", "Support in Arabic, French, English"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-signal" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* Explainer video — only rendered once the asset exists, so a missing
          file can never ship a broken player into a live ad campaign. */}
      {hasExplainer && (
        <section className="relative flex w-full flex-col place-content-center place-items-center px-6 pb-12">
          <div className="mx-auto w-full max-w-3xl">
            <video
              className="w-full rounded-lg border border-border bg-surface-dim"
              src={EXPLAINER_SRC}
              controls
              preload="metadata"
              playsInline
            />
          </div>
        </section>
      )}

      {/* What you get */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-12">
        <div className="mx-auto w-full max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            What you get
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">
            You order a key, not an account
          </h2>
          <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {whatYouGet.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-surface px-6 py-5">
                <h3 className="text-base font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section
        id="plans"
        className="relative flex w-full flex-col place-content-center place-items-center px-6 py-12"
      >
        <div className="mx-auto w-full max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Plans</p>
          <h2 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">Monthly, in dinars</h2>
          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-lg border bg-surface px-6 py-6 ${
                  plan.highlight ? "border-signal" : "border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                    {plan.name}
                  </h3>
                  {plan.highlight && (
                    <span className="rounded bg-signal-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-4">
                  <span className="text-3xl font-semibold text-ink">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-ink">DA / month</span>
                </p>
                <p className="mt-2 text-sm text-muted-ink">{plan.tagline}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-muted-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {plan.name === "Pro" && orderableComposer ? (
                    <ServiceOrderForm service={orderableComposer} />
                  ) : (
                    <WhatsAppCta
                      message={`Salam, I want the Composer ${plan.name} plan (${plan.price} DA/month).`}
                      label={`Order ${plan.name}`}
                      variant="quiet"
                      className="w-full"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-surface-dim px-6 py-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
              Payment methods
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-ink">
              CCP · Baridi Mob · USD (USDT). No foreign card required. Plans are monthly with no
              lock-in; fees are not refundable for partly used periods.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — the ten questions that fill the inbox */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-12">
        <div className="mx-auto w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Questions</p>
          <h2 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">
            The ten we get every day
          </h2>
          <div className="mt-8 flex w-full flex-col gap-4">
            {landingFaqs.map((faq) => (
              <div key={faq.question} className="w-full rounded-lg border border-border bg-surface px-6 py-5">
                <h3 className="text-lg font-medium text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16">
        <div className="mx-auto w-full max-w-2xl text-center">
          <MessageCircle className="mx-auto h-6 w-6 text-signal" />
          <h2 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">
            Still not sure which plan?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-ink">
            Tell us what you want to run and we will tell you which plan fits. If a cheaper one is
            enough, we will say so.
          </p>
          <div className="mt-6">
            <WhatsAppCta message={WA_INTRO} label="Ask on WhatsApp" />
          </div>
        </div>
      </section>
    </>
  )
}
