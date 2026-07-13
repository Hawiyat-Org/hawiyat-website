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

export default function GuideIndexPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">Guides</h1>
          <p className="text-muted-foreground">
            Getting started with Claude Code, Hawiyat Composer, integrations, and more.
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
                  <Image src={g.image} alt="" width={82} height={82} className="rounded" />
             
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                    {g.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
