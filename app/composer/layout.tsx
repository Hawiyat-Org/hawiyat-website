import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = {
  ...createMetadata({
    title: "Hawiyat AI Composer | The AI Execution Engine",
    description:
      "How Hawiyat AI Composer picks the best model for each task, connects your systems, and checks the result, billed in DZD.",
    path: "/composer",
  }),
  title: { absolute: "Hawiyat AI Composer | The AI Execution Engine" },
}

export default function ComposerLayout({ children }: { children: ReactNode }) {
  return children
}
