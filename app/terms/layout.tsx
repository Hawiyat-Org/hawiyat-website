import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms governing Hawiyat websites, AI services, subscriptions, cloud hosting, billing, acceptable use, and customer responsibilities.",
  path: "/terms",
})

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children
}
