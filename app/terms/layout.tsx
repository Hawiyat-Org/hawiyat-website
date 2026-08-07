import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms of Use for the Hawiyat Composer platform: API keys, subscription plans, monthly quotas, DZD billing, acceptable use, security, liability, and dispute resolution.",
  path: "/terms",
})

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children
}
