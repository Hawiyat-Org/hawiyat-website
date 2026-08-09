"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { faqs } from "@/lib/data/faqs"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className="relative flex w-full flex-col place-content-center place-items-center py-16 px-6 md:py-24"
      id="faq"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto w-full max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-ink md:text-5xl">
            Questions, answered straight
          </h2>
        </div>

        <div className="mt-10 flex w-full flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full rounded-lg border border-border bg-surface">
              <button
                className="flex w-full items-center justify-between gap-4 select-none text-left py-5 px-6 cursor-pointer rounded-lg focus-visible:ring-2 focus-visible:ring-signal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
              >
                <span className="text-lg font-medium text-ink">{faq.question}</span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-signal transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                />
              </button>

              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-ink">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
