import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "AI Automation and Deployment Templates",
  description: "Explore templates for AI automation, n8n workflows, application deployment, and managed infrastructure from Hawiyat in Algeria.",
  path: "/templates",
})

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return children
}
