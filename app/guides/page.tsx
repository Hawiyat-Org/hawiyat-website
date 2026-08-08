import Link from "next/link"
import Image from "next/image"

const guides = [
  {
    title: "Claude Code + Hawiyat Composer",
    desc: "Install Claude Code, activate Hawiyat, configure VS Code, build with n8n, web dev, skills, MCP servers, and integrations.",
    href: "/guides/claude",
    image: "/services/claude-code.png",
  },
]

const related = [
  { title: "Hawiyat Composer", desc: "The AI gateway, caching, and routing layer behind Hawiyat subscriptions.", href: "/hawiyat-composer" },
  { title: "AI services in Algeria", desc: "Compare plans for AI access, automation, hosting, and WhatsApp integrations.", href: "/services" },
  { title: "AI cybersecurity", desc: "How Hawiyat protects codebases with AI-assisted security checks.", href: "/cyber-security" },
]

export default function GuideIndexPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">AI and Claude Code Guides for Algeria</h1>
          <p className="text-muted-foreground">
            Step-by-step tutorials for installing and using Claude Code with Hawiyat Composer: setup, skills, MCP servers, n8n, and Google Sheets integrations. Built for developers and teams in Algeria who want practical, working AI workflows.
          </p>
        </div>

        {/* Guide Cards */}
        <div className="mt-12 grid gap-4">
          {guides.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="group rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                  <Image src={g.image} alt="Claude Code guide" width={82} height={82} className="rounded" />
             
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                    {g.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Related Resources */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold">More Hawiyat resources</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.title} href={r.href} className="group rounded-xl border border-border bg-card/50 p-5 hover:border-primary/30">
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
