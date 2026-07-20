"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X } from "lucide-react"

const composerFeatures = [
  {
    category: "AI Gateway",
    rows: [
      { label: "DZD Pricing", composer: true, litellm: false, zai: false },
      { label: "Algerian Support", composer: true, litellm: false, zai: false },
      { label: "Exact-Match Caching", composer: true, litellm: false, zai: false },
      { label: "Semantic Caching", composer: true, litellm: false, zai: false },
      { label: "Smart Model Routing", composer: true, litellm: true, zai: true },
      { label: "Model Blending / Smart Routing", composer: true, litellm: false, zai: false },
      { label: "Drop-in Compatible (No Code Changes)", composer: true, litellm: true, zai: "n/a" },
      { label: "No Daily or Weekly Limits", composer: true, litellm: false, zai: false },
    ],
  },
]

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto" />
    ) : (
      <X className="w-4 h-4 text-red-400 dark:text-red-500 mx-auto" />
    )
  }
  return <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{value}</span>
}

export default function ComparisonTable() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const composerPlatforms = [
    { name: "Hawiyat Composer", key: "composer" as const, highlight: true },
    { name: "Claude Subscription", key: "litellm" as const, highlight: false },
    { name: "z.ai Subscription", key: "zai" as const, highlight: false },
  ]

  return (
    <section id="comparison" ref={sectionRef} className="py-16 md:py-32 px-[5%] max-md:px-4">
      <div className="mx-auto max-w-6xl">

        {/* Composer Gateway Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white">
            Hawiyat Composer vs The Alternatives
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            An AI gateway priced in DZD with local support for Algerian developers.
          </p>
        </motion.div>

        <div className="overflow-x-auto mb-24">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left py-4 pr-4 text-sm font-semibold text-gray-700 dark:text-gray-300 w-[200px] md:w-[240px]">
                  Feature
                </th>
                {composerPlatforms.map((p) => (
                  <th
                    key={p.key}
                    className={`py-4 px-3 text-center text-sm font-semibold ${
                      p.highlight
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <span className={`inline-block px-3 py-1.5 rounded-lg ${
                      p.highlight
                        ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                        : ""
                    }`}>
                      {p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {composerFeatures.map((category) => (
                <>
                  <tr key={category.category}>
                    <td
                      colSpan={4}
                      className="pt-8 pb-3 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                    >
                      {category.category}
                    </td>
                  </tr>
                  {category.rows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 pr-4 text-sm text-gray-700 dark:text-gray-300">
                        {row.label}
                      </td>
                      {composerPlatforms.map((p) => (
                        <td
                          key={p.key}
                          className={`py-3.5 px-3 text-center ${
                            p.highlight ? "bg-gray-50 dark:bg-white/[0.04]" : ""
                          }`}
                        >
                          <CellValue value={row[p.key as keyof typeof row]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}
