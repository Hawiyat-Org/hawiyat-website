"use client"

import { useState } from "react"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Hawiyat Composer?",
      answer:
        "Hawiyat Composer is a gateway that sits between your coding tools like Claude Code, CLIs, and agents and the AI models they talk to. It caches repeat requests so you don't pay for the same tokens twice, and routes simple tasks to cheaper models automatically. We blend multiple models together so you get flagship-level results. You plug it in through the same API endpoints you already use. No code changes required.",
    },
    {
      question: "How does the caching work?",
      answer:
        "Two layers. Exact-match caching normalizes repeat requests like boilerplate or common scaffolding and serves them from memory in 2 to 5ms at zero cost. Semantic caching uses vector search so if you ask the same thing a different way, Hawiyat Composer still recognizes it and serves the cached result. Same answer, no extra spend.",
    },
    {
      question: "What models can I use with Hawiyat Composer?",
      answer:
        "Hawiyat Composer blends multiple AI models behind the scenes to get flagship-level results. Simple tasks go to lightweight, cheaper models. Complex reasoning goes to frontier models. You don't switch anything manually. You just get the best output at the lowest cost.",
    },
    {
      question: "Is my data safe when using Composer?",
      answer:
        "Hawiyat Composer offers cost-aware routing and caching on every request. Sensitive workloads stay efficient and affordable. We also support ephemeral logging so nothing is persisted unless you need it to be.",
    },
    {
      question: "How do I get started?",
      answer:
        "Point your existing tools at Hawiyat Composer's endpoints instead of the provider directly. That's it. If you're using Claude Code, Cursor, or any OpenAI/Anthropic compatible tool, it works out of the box. Sign up through our services page and we'll get you set up in minutes.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className="relative flex w-full flex-col place-content-center place-items-center gap-[10%] p-[5%] px-[10%]"
      id="faq"
    >
      <h2 className="text-4xl font-medium max-md:text-2xl">Frequently Asked Questions</h2>

      <div className="mt-5 flex min-h-[300px] w-full max-w-[850px] flex-col gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="faq w-full border-b border-gray-200 ">
            <button
              className="faq-accordion flex w-full items-center justify-between select-none text-left text-xl max-md:text-lg cursor-pointer focus:outline-none py-4  transition-colors duration-200"
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-medium ">{faq.question}</span>
              <i
                className={`bi bi-plus text-xl origin-center duration-300 transition-transform font-semibold flex-shrink-0 ml-4 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
              ></i>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index 
                  ? "max-h-96 opacity-100 pb-4" 
                  : "max-h-0 opacity-0 pb-0"
              }`}
            >
              <div className="px-4">
                <p className="whitespace-pre-line text-gray-700 dark:text-white/60 max-lg:text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="purple-bg-grad max-md:hidden reveal-up absolute bottom-14 right-[20%] h-[150px] w-[150px] rounded-full"></div>
    </section>
  )
}

export default FAQ
