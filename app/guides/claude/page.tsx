import Link from "next/link"
import Image from "next/image"
import { SECTIONS } from "./_data"

export default function ClaudeGuideOverview() {
  return (
    <>
      <div className="text-center mb-12 pt-8">
          <Image src="/services/claude-code.png" alt="" width={128} height={128} className="my-4 rounded mx-auto" />
   
    
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Claude Code + Hawiyat Composer Guide</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to install, configure, and master Claude Code  from VS Code extensions to n8n integration and web development.
        </p>
      </div>
      <div className="grid gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.id}
            href={`/guides/claude/${s.id}`}
            className="group rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5 hover:border-primary/30 hover:bg-card/80 transition-all duration-200 flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
              {s.label[0]}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
