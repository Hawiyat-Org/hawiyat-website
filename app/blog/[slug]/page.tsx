import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { createMetadata, SITE_URL } from "@/lib/seo"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { FlowDiagram, parseFlowLines } from "@/components/blog/flow-diagram"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    publishedTime: post.date,
    modifiedTime: post.date,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Hawiyat", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Hawiyat",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    inLanguage: "en",
  }

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="relative flex w-full flex-col place-content-center place-items-center px-6 pb-16 pt-32 md:pt-36">
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-ink transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All guides
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-ink">
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-ink md:text-lg">
              {post.description}
            </p>
          </header>

          <div className="prose-custom mt-10 flex flex-col gap-6 border-t border-border pt-8 text-ink [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-ink [&_li]:leading-relaxed [&_p]:leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-surface-dim [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_code]:rounded [&_code]:bg-surface-dim [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children }) {
                  const match = /language-(\w+)/.exec(className ?? "")
                  const body = String(children)
                  if (match && match[1] === "flow") {
                    return <FlowDiagram lines={parseFlowLines(body)} />
                  }
                  return <code className={className}>{children}</code>
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-ink"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <aside className="mt-10 rounded-lg border border-border bg-surface px-6 py-6">
            <h2 className="text-lg font-semibold text-ink">
              Build it with a local AI API
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-ink">
              One key to GPT, Claude, Gemini, and open models — billed in DZD, paid with CCP
              or Baridi Mob. See the{" "}
              <Link href="/ai-api-algeria" className="text-signal underline underline-offset-4">
                AI API in Algeria
              </Link>{" "}
              or{" "}
              <Link href="/pricing" className="text-signal underline underline-offset-4">
                pricing in DZD
              </Link>
              .
            </p>
          </aside>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-ink">
                Related guides
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-5 py-4 transition-colors hover:border-signal/40"
                  >
                    <span>
                      <span className="block text-base font-medium text-ink">{r.title}</span>
                      <span className="mt-1 block font-mono text-xs uppercase tracking-widest text-muted-ink">
                        {r.readingTime}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-ink transition-transform group-hover:translate-x-1 group-hover:text-signal"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
