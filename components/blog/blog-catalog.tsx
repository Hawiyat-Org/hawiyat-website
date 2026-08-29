"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BlogCardData {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
}

/**
 * Cloudflare-style blog grid: tag filter chips + responsive card grid.
 * Client component so filtering is instant; server passes the serialized posts.
 */
export function BlogCatalog({ posts }: { posts: BlogCardData[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const p of posts) for (const t of p.tags) set.add(t)
    return [...set].sort()
  }, [posts])

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag]
  )

  return (
    <div>
      {/* Tag filter */}
      {allTags.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter posts by topic">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={cn(
              "min-h-[36px] rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
              activeTag === null
                ? "border-signal bg-signal text-signal-text"
                : "border-border bg-surface text-muted-ink hover:border-signal/50 hover:text-ink"
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={cn(
                "min-h-[36px] rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                activeTag === tag
                  ? "border-signal bg-signal text-signal-text"
                  : "border-border bg-surface text-muted-ink hover:border-signal/50 hover:text-ink"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-ink">
          No posts in this topic yet.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-signal/50"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-signal md:text-xl">
                  {post.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-ink">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal">
                  Read
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              {post.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-4">
                  {post.tags.slice(0, 4).map((tag) => (
                    <li key={tag}>
                      <button
                        type="button"
                        onClick={() => setActiveTag(tag)}
                        className="rounded border border-border/60 bg-surface-dim/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-ink transition-colors hover:border-signal/50 hover:text-ink"
                      >
                        {tag}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
