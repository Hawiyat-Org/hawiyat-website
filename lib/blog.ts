import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  keywords: string[]
  readingTime: string
  content: string
  faqs: Array<{ question: string; answer: string }>
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, "")
}

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

/** Extracts "**Question?** Answer." pairs from the FAQ section for FAQPage schema. */
function extractFaqs(content: string): Array<{ question: string; answer: string }> {
  const faqSection = content.split(/^## .*[Ff]requently asked questions/m)[1] ?? ""
  const faqs: Array<{ question: string; answer: string }> = []
  const re = /\*\*(.+?)\*\*\s*([^\n]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(faqSection)) !== null) {
    const question = m[1].trim().replace(/\?+$/, "?").trim()
    const answer = m[2].trim()
    if (question && answer) faqs.push({ question, answer })
  }
  return faqs
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
    const { data, content } = matter(raw)
    return {
      slug: slugify(file),
      title: data.title ?? slugify(file),
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "Hawiyat Team",
      tags: data.tags ?? [],
      keywords: data.keywords ?? [],
      readingTime: readingTime(content),
      content,
      faqs: extractFaqs(content),
    }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const posts = getAllPosts().filter((p) => p.slug !== post.slug)
  const scored = posts
    .map((p) => {
      const overlap = p.tags.filter((t) => post.tags.includes(t)).length
      return { post: p, score: overlap }
    })
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, count).map((s) => s.post)
}
