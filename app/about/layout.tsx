import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "About Hawiyat - AI Infrastructure in Algeria",
  description: "Meet Hawiyat, an Algeria-based team building AI infrastructure, Composer, cloud hosting, automation, and local technical services.",
  path: "/about",
  modifiedTime: "2026-08-01",
})

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
