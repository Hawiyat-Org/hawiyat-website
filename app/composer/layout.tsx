import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata = {
  ...createMetadata({
    title: "Hawiyat AI Composer | The AI Execution Engine",
    description:
      "Hawiyat AI Composer is the AI execution engine — the layer that decides how every task runs across frontier models (GPT, Claude, Gemini, Llama, open) and your business systems (WhatsApp, CRM, ERP, email, databases, n8n). Model-independent, evaluated on every run, priced in DZD, supported in Algeria.",
    path: "/composer",
  }),
  title: { absolute: "Hawiyat AI Composer | The AI Execution Engine" },
}

export default function ComposerLayout({ children }: { children: ReactNode }) {
  return children
}
