import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { getAllPosts } from "@/lib/blog"
import { BlogCatalog } from "@/components/blog/blog-catalog"

export const metadata: Metadata = createMetadata({
  title: "Blog | AI in Algeria, Guides & Product Notes",
  description:
    "Practical guides on AI in Algeria: AI APIs, Claude Code, n8n hosting, WhatsApp automation, DZD pricing, and building AI pipelines without a foreign card.",
  path: "/blog",
  modifiedTime: "2026-08-29",
})

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <section className="relative flex w-full flex-col place-content-center place-items-center px-6 pb-20 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Blog</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            AI in Algeria, explained
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-ink md:text-lg">
            Practical guides on AI APIs, Claude Code, n8n automation, WhatsApp, and building
            production AI pipelines - priced in DZD, written for Algeria.
          </p>
        </header>

        {featured && (
          <article className="group mt-12 overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-signal/50">
            <Link href={`/blog/${featured.slug}`} className="flex flex-col gap-6 p-8 md:flex-row md:items-start md:gap-10 md:p-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
                  <span className="rounded bg-signal px-2 py-0.5 font-bold text-signal-text">
                    Latest
                  </span>
                  <time dateTime={featured.date}>{featured.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-signal md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-ink md:text-lg">
                  {featured.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-signal">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              <div className="hidden shrink-0 md:block md:w-56">
                <div className="sticky top-24 rounded-lg border border-border/40 bg-surface-dim/40 p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                    In this post
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-ink">
                    {featured.toc.slice(0, 6).map((item) => (
                      <li key={item.id} className="truncate">
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  {featured.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
                      {featured.tags.slice(0, 4).map((tag) => (
                        <li
                          key={tag}
                          className="rounded border border-border/60 bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-ink"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Link>
          </article>
        )}

        <div className="mt-12">
          <h2 className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-muted-ink">
            All guides
          </h2>
          <BlogCatalog posts={rest} />
        </div>
      </div>
    </section>
  )
}
