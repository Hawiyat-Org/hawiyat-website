import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "AI and Claude Code Guides for Algeria",
  description: "Practical Hawiyat guides for Claude Code, Composer, MCP servers, n8n, integrations, and AI development workflows in Algeria.",
  path: "/guides",
})

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return children
}
