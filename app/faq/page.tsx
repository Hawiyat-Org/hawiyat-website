import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { faqs } from "@/lib/data/faqs"

export const metadata = createMetadata({
  title: "FAQ | Hawiyat AI Composer & Services in Algeria",
  description:
    "Questions and answers about Hawiyat: what the AI Composer does, how it routes tasks, DZD pricing and payment methods, data privacy, and getting started in Algeria.",
  path: "/faq",
})

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">FAQ</p>
            <h1 className="mt-4 text-4xl font-semibold text-ink md:text-5xl">
              Questions, answered straight
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              What Hawiyat does, how the AI Composer decides and evaluates every task, what
              it costs in dinars, how you pay, and where your data sits.
            </p>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full rounded-lg border border-border bg-surface px-6 py-5">
                <h2 className="text-lg font-medium text-ink">{faq.question}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex w-full flex-col place-content-center place-items-center px-6 py-16 md:py-24">
        <div className="relative w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-surface-dim px-6 py-14 text-center md:py-20">
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
              Still have a question?
            </p>
            <h2 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
              Pick a plan in dinars, or ask us on WhatsApp.
            </h2>
            <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-colors hover:bg-signal-hover"
              >
                See plans in DZD
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://wa.me/213559555951"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-dim"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
