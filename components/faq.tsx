"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is the Hawiyat execution layer?",
      answer:
        "Hawiyat is the execution layer between frontier AI models (GPT, Claude, Gemini, open models) and the systems your business actually runs — WhatsApp, CRM, ERP, email, databases, workflows. It decides the best way to accomplish each task: which model to route to, what context to carry, when to fall back, and whether the result is good enough. Whatever AI exists tomorrow, businesses will need a layer that decides how to use it — that layer is Hawiyat.",
    },
    {
      question: "Is Hawiyat tied to one AI model?",
      answer:
        "No. Models are routes, chosen per task by quality, latency, and cost. GPT, Claude, Gemini, and open models all sit behind the same layer, so a provider change never breaks your pipeline. The layer outlives any single model.",
    },
    {
      question: "How do costs work?",
      answer:
        "Everything is billed in Algerian dinars. Composer caches repeated work, routes each task to the most efficient model, and logs a transparent per-task cost — roughly a fraction of a DZD per task. You always see what you paid and what you got, measured, not guessed.",
    },
    {
      question: "Is my data used to train models?",
      answer:
        "No. Your data is never used to train models. Runs carry your context to complete the task, and the evaluation logs are yours to audit. Data stays between your systems and the layer.",
    },
    {
      question: "How do I start?",
      answer:
        "Pick a plan on the services page — Composer Pro for solo builders or a MAX tier for teams — or order Enterprise for the full stack. We activate your workspace within 24 hours, you connect your tools, and run your first task. A WhatsApp workflow can be executing the same day.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className="relative flex w-full flex-col place-content-center place-items-center py-16 px-6 md:py-24"
      id="faq"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink reveal-up">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-ink md:text-5xl reveal-up">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 flex w-full flex-col gap-4 reveal-up">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full rounded-2xl border border-border bg-surface">
              <button
                className="flex w-full items-center justify-between gap-4 select-none text-left py-5 px-6 cursor-pointer rounded-2xl focus-visible:ring-2 focus-visible:ring-signal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
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
