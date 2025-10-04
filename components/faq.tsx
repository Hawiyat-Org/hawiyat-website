"use client"

import { useState } from "react"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Hawiyat?",
      answer:
        "Hawiyat is a VPS hosting provider offering affordable, fast, and reliable cloud servers with one-click deployment, GitHub integration, backups, and CI/CD support.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes! You can easily upgrade or downgrade your VPS plan at any time with minimal downtime.",
    },
    {
      question: "Do you provide backups?",
      answer:
        "Absolutely. Hawiyat provides automated backups to keep your data safe, with options for manual snapshots as well.",
    },
    {
      question: "Is there CI/CD and GitHub integration?",
      answer:
        "Yes. You can deploy your apps with one click, integrate with GitHub for automatic deployments, and set up full CI/CD pipelines.",
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
      <h3 className="text-4xl font-medium max-md:text-2xl">Frequently Asked Questions</h3>

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
