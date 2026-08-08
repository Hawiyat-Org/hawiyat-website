import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Hawiyat Composer AI Gateway in Algeria",
  description: "Hawiyat Composer connects coding tools to supported AI models through caching and routing, with local plans and support in Algeria.",
  path: "/hawiyat-composer",
})

export default function ComposerLayout({ children }: { children: ReactNode }) {
  return children
}
