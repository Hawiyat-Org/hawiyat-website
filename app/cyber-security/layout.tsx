import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "AI Cybersecurity Services in Algeria",
  description: "AI-assisted code security, dependency scanning, monitoring, and deployment protection for developers and businesses in Algeria.",
  path: "/cyber-security",
})

export default function CyberSecurityLayout({ children }: { children: ReactNode }) {
  return children
}
