import type { Metadata } from "next"
import Link from "next/link"
import { SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  title: "AI Provider and AI Subscriptions in Algeria",
  description: "Hawiyat provides AI subscriptions in DZD, Composer model access, automation, hosting, and local support for people and teams in Algeria.",
  alternates: { canonical: "/ai-algeria" },
  openGraph: {
    title: "AI Provider and AI Subscriptions in Algeria",
    description: "Local AI access, automation, hosting, and technical support from Hawiyat.",
    url: `${SITE_URL}/ai-algeria`,
    type: "website",
  },
}

const faqs = [
  ["What AI services does Hawiyat provide in Algeria?", "Hawiyat offers Composer plans for supported AI models, managed automation, application hosting, WhatsApp integrations, cybersecurity services, implementation guidance, and local support."],
  ["Can I pay for AI services in Algerian dinars?", "Selected Hawiyat plans are priced in Algerian dinars. Current prices and included capacity are listed on the services page; contact the team before ordering if you need a business invoice or custom plan. Every order is facturated  officially invoiced in line with Algerian government requirements."],
  ["Does Hawiyat own the third-party AI models it supports?", "No. Third-party model and product names belong to their respective owners. Hawiyat Composer provides a gateway and optimization layer for supported tools and model providers; availability depends on the selected plan."],
  ["Can Hawiyat help a business automate work with AI?", "Yes. Hawiyat can help assess a workflow, connect tools such as n8n and messaging services, deploy the solution, and operate the underlying infrastructure."],
]

export default function AIAlgeriaPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <article className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Built and supported in Algeria</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">AI Provider and AI Subscriptions in Algeria</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Hawiyat is an Algeria-based AI infrastructure provider for developers, freelancers, startups, and businesses. We provide locally supported AI plans, Hawiyat Composer, automation, hosting, and implementation services, with selected subscriptions priced in DZD.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Hawiyat is a registered Algerian société (company), operating locally in Algeria. Every order is facturated, meaning officially invoiced in line with Algerian government requirements, so you always receive a formal invoice for your purchase.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="btn">Compare AI services</Link>
            <a
              href="https://wa.me/213559555951"
              target="_blank"
              rel="noopener noreferrer"
              className="btn !bg-transparent !text-foreground border border-border"
            >
              Talk to the Hawiyat team
            </a>
          </div>
        </header>

        <section className="mt-12 grid gap-4 sm:grid-cols-2" aria-label="Company and invoicing">
          <div className="rounded-2xl border bg-card/50 p-6">
            <h2 className="text-lg font-semibold">Registered Algerian société</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Hawiyat is a registered Algerian company (société). We operate locally in Algeria and support Algerian developers, freelancers, startups, and businesses directly.
            </p>
          </div>
          <div className="rounded-2xl border bg-card/50 p-6">
            <h2 className="text-lg font-semibold">Official invoicing (facturation)</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Everything is facturated by the government: every order is invoiced officially and compliantly with Algerian tax and government requirements. You get a formal invoice for each purchase, whether you are an individual or a business.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-semibold">AI access through Hawiyat Composer</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Hawiyat Composer connects compatible coding tools and applications to supported AI providers through one gateway. It can cache repeated work and route requests according to configured policies. It is especially useful for software development, code assistance, content workflows, internal tools, and multi-step automation.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Composer is not a third-party model owner and Hawiyat does not claim an official partnership unless explicitly stated. Model availability, capacity, and features vary by plan. Review the current <Link href="/services" className="underline">service catalog</Link> before purchasing.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold">AI solutions for Algerian teams</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["AI subscriptions in DZD", "Plans for supported AI tools and models, local assistance, and clear service descriptions for Algerian users."],
              ["Business automation", "Connect forms, CRMs, messaging, databases, and AI steps with managed n8n workflows."],
              ["AI application hosting", "Deploy web apps, APIs, agents, and databases on managed infrastructure with monitoring and support."],
              ["Implementation and security", "Plan integrations, review architecture, improve operational security, and maintain production systems."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border bg-card/50 p-6">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold">Start with the right resource</h2>
          <nav className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="AI resources">
            <Link href="/hawiyat-composer" className="rounded-xl border p-5 hover:bg-card">Hawiyat Composer</Link>
            <Link href="/services" className="rounded-xl border p-5 hover:bg-card">Plans and services</Link>
            <Link href="/guides/claude" className="rounded-xl border p-5 hover:bg-card">Claude Code guides</Link>
            <Link href="/cyber-security" className="rounded-xl border p-5 hover:bg-card">AI cybersecurity</Link>
          </nav>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold">Questions about AI services in Algeria</h2>
          <div className="mt-6 space-y-6">
            {faqs.map(([question, answer]) => (
              <div key={question} className="border-b pb-6">
                <h3 className="text-xl font-semibold">{question}</h3>
                <p className="mt-2 text-muted-foreground">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
