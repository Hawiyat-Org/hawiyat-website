"use client"

import { useState } from "react"

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      question: "What's Pixa playground?",
      answer:
        "Pixa's playground is an integrated webapp to seamlessly test different LLM models such as GPT4, Claude, Gemini, etc.",
    },
    {
      question: "What are LLM?",
      answer:
        'LLM stands for "Large Language Model." It\'s a type of artificial intelligence model trained on vast amounts of text data to understand and generate human-like text. These models, like GPT-4, can perform various tasks, such as answering questions, generating content, translating languages, and more, by leveraging patterns learned from the data they were trained on.',
    },
    {
      question: "Where can I test different AI models?",
      answer: "You can use Pixa's AI Playground to test different models, including GPT4, Claude, Perplexity and more.",
    },
    {
      question: "Is Pixa Free to use?",
      answer: "You can start using Pixa for free, and later upgrade your plan to access all its features.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="relative flex w-full flex-col place-content-center place-items-center gap-[10%] p-[5%] px-[10%]">
      <h3 className="text-4xl font-medium max-md:text-2xl">Faq</h3>

      <div className="mt-5 flex min-h-[300px] w-full max-w-[850px] flex-col gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="faq w-full">
            <h4
              className="faq-accordion flex w-full select-none text-xl max-md:text-lg cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              <span>{faq.question}</span>
              <i
                className={`bi bi-plus text-xl origin-center duration-300 transition-transform ml-auto font-semibold ${
                  openItems.includes(index) ? "rotate-45" : ""
                }`}
              ></i>
            </h4>
            <div
              className={`content max-lg:text-sm transition-all duration-400 overflow-hidden ${
                openItems.includes(index) ? "max-h-[240px] py-[20px] px-[18px]" : "max-h-0 py-0 px-[18px]"
              }`}
            >
              {faq.answer}
            </div>
            {index < faqs.length - 1 && <hr />}
          </div>
        ))}
      </div>

      <div className="purple-bg-grad max-md:hidden reveal-up absolute bottom-14 right-[20%] h-[150px] w-[150px] rounded-full"></div>
    </section>
  )
}

export default FAQ
