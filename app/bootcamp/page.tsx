import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hawiyat AI Bootcamp in Algeria",
  description: "The Hawiyat AI Bootcamp is being prepared for students and builders in Algeria. Register interest or explore current AI guides and services.",
  alternates: { canonical: "/bootcamp" },
}

export default function BootcampPage() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium text-muted-foreground">Program announcement</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Hawiyat AI Bootcamp in Algeria</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          We are preparing a practical program for students and builders who want to use AI tools to plan, build, deploy, and present real projects. Dates and enrollment details will be published here when confirmed.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/schedule" className="btn">Register your interest</Link>
          <Link href="/guides" className="btn !bg-transparent !text-foreground border border-border">Explore free AI guides</Link>
        </div>
        <section className="mt-20 text-left">
          <h2 className="text-3xl font-semibold">What the program is planned to cover</h2>
          <ul className="mt-6 grid gap-4 text-muted-foreground sm:grid-cols-2">
            <li className="rounded-xl border p-5">Using coding assistants responsibly and verifying generated work.</li>
            <li className="rounded-xl border p-5">Building a working application from requirements to deployment.</li>
            <li className="rounded-xl border p-5">AI automation with tools such as n8n and connected services.</li>
            <li className="rounded-xl border p-5">Presenting a project, documenting decisions, and planning maintenance.</li>
          </ul>
        </section>
        <section className="mt-20 text-left">
          <h2 className="text-3xl font-semibold">Who this is for</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Students in Algeria working on graduation projects, early-career developers who want to build a portfolio piece with AI tools, and teams evaluating whether AI-assisted development fits their workflow. The program teaches process, verification, and deployment — not memorisation or theory.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Not sure if it is the right fit? <Link href="/schedule" className="underline">Book a short call</Link> with the Hawiyat team to discuss your project and timing.
          </p>
        </section>
      </div>
    </main>
  )
}
