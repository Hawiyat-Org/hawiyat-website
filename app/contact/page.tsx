import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MessageCircle, MapPin, Languages, Clock, ArrowRight } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { CONTACT_EMAIL, WHATSAPP_NUMBER, waLink } from "@/lib/contact"

export const metadata: Metadata = createMetadata({
  title: "Contact Hawiyat | Email, WhatsApp, Algiers Office",
  description:
    "Email, WhatsApp, and office details for Hawiyat in Algiers, Algeria. Support in Arabic, French, and English with clear response-time expectations.",
  path: "/contact",
  modifiedTime: "2026-09-01",
})

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Hawiyat",
  url: "https://www.hawiyat.org/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Hawiyat",
    email: CONTACT_EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Algiers",
      addressCountry: "DZ",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        telephone: `+${WHATSAPP_NUMBER}`,
        availableLanguage: ["Arabic", "French", "English"],
      },
    ],
  },
}

const channels = [
  {
    icon: Mail,
    title: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    cta: CONTACT_EMAIL,
    body: "For orders, invoices, technical questions, and partnership requests. Every message lands in a real inbox, read by the team that operates the layer.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    href: waLink(),
    external: true,
    cta: "+213 559 555 951",
    body: "The fastest channel for account and technical questions. Message us directly and we will reply in Arabic, French, or English during business hours.",
  },
  {
    icon: MapPin,
    title: "Office",
    href: "/about",
    cta: "Algiers, Algeria",
    body: "Hawiyat is headquartered in Algiers and operates from Itihad Campus, Boumerdes. On-site meetings are by appointment; everything else starts on WhatsApp or email.",
  },
]

const languages = ["Arabic", "French", "English"]

const responseTimes = [
  {
    channel: "WhatsApp",
    time: "A few hours",
    note: "During business hours, Sunday to Thursday, 9:00 to 17:00 Algiers time (UTC+1).",
  },
  {
    channel: "Email",
    time: "One business day",
    note: "Usually faster. Include your workspace name in the subject line so we can pull up your account immediately.",
  },
  {
    channel: "Urgent / incidents",
    time: "Same day",
    note: "For active subscribers with an outage or blocked run, mark the message as urgent and we will prioritise it.",
  },
]

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold text-ink md:text-5xl">
              Talk to the team that runs the layer
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              Real questions get real answers from the people who operate Composer and the managed
              services. Whether you are evaluating Hawiyat, running an existing plan, or chasing an
              invoice, your message reaches a human in Algeria who can act on it.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {channels.map((channel) => {
              const inner = (
                <>
                  <channel.icon className="h-6 w-6 text-ink" />
                  <h2 className="mt-4 text-lg font-semibold text-ink">{channel.title}</h2>
                  <p className="mt-2 font-mono text-sm text-signal">{channel.cta}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">{channel.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-ink">
                    {channel.title === "Office" ? "See about us" : `Write via ${channel.title}`}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </>
              )
              return channel.external ? (
                <a
                  key={channel.title}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-surface-dim"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={channel.title}
                  href={channel.href}
                  className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-surface-dim"
                >
                  {inner}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-5 lg:grid-cols-5">
            <div className="rounded-lg border border-border bg-surface p-6 lg:col-span-2">
              <Languages className="h-6 w-6 text-ink" />
              <h2 className="mt-4 text-lg font-semibold text-ink">Support in three languages</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                Our support team works from Algeria, in the same timezone (UTC+1) as your business.
                No ticket queue routed through another continent.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded border border-border bg-surface-dim px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6 lg:col-span-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-ink" />
                <h2 className="text-lg font-semibold text-ink">When you will hear back</h2>
              </div>
              <div className="mt-4 flex flex-col divide-y divide-border">
                {responseTimes.map((row) => (
                  <div
                    key={row.channel}
                    className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-widest text-muted-ink">
                      {row.channel}
                    </span>
                    <span className="w-40 shrink-0 text-sm font-semibold text-ink">{row.time}</span>
                    <span className="text-sm leading-relaxed text-muted-ink">{row.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
