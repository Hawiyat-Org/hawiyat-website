import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Book an AI Consultation in Algeria",
  description: "Book a consultation with Hawiyat about AI subscriptions, automation, Composer, cloud hosting, or cybersecurity in Algeria.",
  path: "/schedule",
})

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return children
}
