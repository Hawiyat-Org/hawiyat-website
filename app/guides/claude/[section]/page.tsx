import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SECTIONS } from "../_data"
import { SectionContent } from "../_content"

function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full max-w-full aspect-video rounded-xl overflow-hidden border border-border bg-black mb-6 sm:mb-8">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }))
}

export default function SectionPage({ params }: { params: { section: string } }) {
  const section = SECTIONS.find((s) => s.id === params.section)
  if (!section) notFound()

  const idx = SECTIONS.indexOf(section)
  const prev = idx > 0 ? SECTIONS[idx - 1] : null
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 pt-4 lg:pt-8 flex-wrap">
        <Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link>
        <span>/</span>
        <Link href="/guides/claude" className="hover:text-foreground transition-colors">Claude Code</Link>
        <span>/</span>
        <span className="text-foreground truncate">{section.label}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-3 mb-6">
        <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded overflow-hidden">
          <Image src="/services/claude-code.png" alt="" width={96} height={96} className="w-full h-full object-contain" />
        </div>
        <div className="my-auto">
          <h1 className="text-xl sm:text-2xl font-bold">{section.title}</h1>
          <p className="text-sm text-muted-foreground">{section.desc}</p>
        </div>
      </div>

      {/* Video */}
      <VideoEmbed videoId={section.videoId} title={section.title} />

      {/* Content */}
      <div className="mb-8">
        <SectionContent sectionId={section.id} />
      </div>

      {/* Prev / Next navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-border pt-6 gap-3">
        {prev ? (
          <Link href={`/guides/claude/${prev.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            ← {prev.label}
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/guides/claude/${next.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            {next.label} →
          </Link>
        ) : <div />}
      </div>
    </>
  )
}
