import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = createMetadata({
  title: "Blog | AI in Algeria, Guides & Product Notes",
  description:
    "Practical guides on AI in Algeria: AI APIs, Claude Code, n8n hosting, WhatsApp automation, DZD pricing, and building AI pipelines without a foreign card.",
  path: "/blog",
  modifiedTime: "2026-08-17",
})

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <section className="relative flex w-full flex-col place-content-center place-items-center px-6 pb-16 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Blog</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            AI in Algeria, explained
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-ink md:text-lg">
            Practical guides on AI APIs, Claude Code, n8n automation, WhatsApp, and building
            production AI pipelines — priced in DZD, written for Algeria.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-lg border border-border bg-surface px-6 py-6 transition-colors hover:border-signal/40"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-ink transition-colors group-hover:text-signal md:text-2xl">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-ink md:text-base">
                  {post.description}
                </p>
                <span className="mt-1 inline-flex items-center gap-2 font-mono text-sm text-signal">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
