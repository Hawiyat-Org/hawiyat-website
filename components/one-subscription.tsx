"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X } from "lucide-react"

const features = [
  {
    category: "Pricing & Location",
    rows: [
      { label: "Starting Price", hawiyat: "1,000 DA/month", hostinger: "~2,500 DA/month", railway: "$5/month", vercel: "$20/month" },
      { label: "Local Currency (DA)", hawiyat: true, hostinger: false, railway: false, vercel: false },
      { label: "Algerian Data Center", hawiyat: true, hostinger: false, railway: false, vercel: false },
      { label: "Local Support (Arabic/French)", hawiyat: true, hostinger: true, railway: false, vercel: false },
    ],
  },
  {
    category: "Deployment & CI/CD",
    rows: [
      { label: "Git Integration", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "CI/CD Pipeline", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "One-Click Deploy", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "Auto Deploy from Git", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "Preview Deployments", hawiyat: false, hostinger: false, railway: true, vercel: true },
    ],
  },
  {
    category: "Infrastructure",
    rows: [
      { label: "DDoS Protection", hawiyat: true, hostinger: true, railway: "Add-on", vercel: true },
      { label: "SSL Certificate", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "Domain Name", hawiyat: true, hostinger: true, railway: false, vercel: true },
      { label: "Load Balancer", hawiyat: true, hostinger: true, railway: false, vercel: true },
      { label: "Monitoring", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "Automated Backups", hawiyat: true, hostinger: true, railway: true, vercel: false },
    ],
  },
  {
    category: "Databases & Storage",
    rows: [
      { label: "Managed Database", hawiyat: true, hostinger: true, railway: true, vercel: false },
      { label: "Supabase Compatible", hawiyat: true, hostinger: false, railway: true, vercel: false },
      { label: "PostgreSQL", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "MySQL", hawiyat: true, hostinger: true, railway: false, vercel: false },
      { label: "Redis", hawiyat: true, hostinger: true, railway: true, vercel: true },
    ],
  },
  {
    category: "Apps & Scaling",
    rows: [
      { label: "Number of Apps", hawiyat: "Up to 3 (Pro)", hostinger: "Up to 100", railway: "Unlimited", vercel: "Unlimited" },
      { label: "Auto-scaling", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "Edge Network", hawiyat: false, hostinger: true, railway: false, vercel: true },
      { label: "Serverless Functions", hawiyat: true, hostinger: false, railway: true, vercel: true },
    ],
  },
  {
    category: "Support & Community",
    rows: [
      { label: "Premium Support", hawiyat: true, hostinger: true, railway: false, vercel: true },
      { label: "Community Access", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "Dedicated Onboarding", hawiyat: true, hostinger: false, railway: false, vercel: false },
      { label: "SLA Guarantee", hawiyat: true, hostinger: true, railway: false, vercel: false },
      { label: "Notifications", hawiyat: true, hostinger: true, railway: true, vercel: true },
    ],
  },
  {
    category: "Security",
    rows: [
      { label: "Security Scanning", hawiyat: true, hostinger: true, railway: false, vercel: true },
      { label: "DDoS Mitigation", hawiyat: true, hostinger: true, railway: "Add-on", vercel: true },
      { label: "Access Control", hawiyat: true, hostinger: true, railway: true, vercel: true },
      { label: "2FA Authentication", hawiyat: true, hostinger: true, railway: true, vercel: true },
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

  const platforms = [
    { name: "Hawiyat", key: "hawiyat" as const, highlight: true },
    { name: "Hostinger", key: "hostinger" as const, highlight: false },
    { name: "Railway", key: "railway" as const, highlight: false },
    { name: "Vercel", key: "vercel" as const, highlight: false },
  ]

  return (
    <section id="comparison" ref={sectionRef} className="py-16 md:py-32 px-[5%] max-md:px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white">
            Hawiyat vs The Competition
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            See why Hawiyat is the best choice for developers in Algeria and beyond.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left py-4 pr-4 text-sm font-semibold text-gray-700 dark:text-gray-300 w-[180px] md:w-[220px]">
                  Feature
                </th>
                {platforms.map((p) => (
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
              {features.map((category) => (
                <>
                  <tr key={category.category}>
                    <td
                      colSpan={5}
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
                      {platforms.map((p) => (
                        <td
                          key={p.key}
                          className={`py-3.5 px-3 text-center ${
                            p.highlight ? "bg-gray-50 dark:bg-white/[0.04]" : ""
                          }`}
                        >
                          <CellValue value={row[p.key]} />
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
