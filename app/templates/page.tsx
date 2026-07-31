"use client"

import type React from "react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

interface Template {
  id: string
  name: string
  version: string
  description: string
  links: {
    github: string
    website: string
    docs: string
  }
  logo: string
  tags: string[]
}

export default function TemplatesShowcase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch templates")
        return res.json()
      })
      .then((data) => {
        setTemplates(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [])

  const filteredTemplates = useMemo(() => {
    if (!templates) return []

    return templates.filter((template) => {
      const matchesSearch =
        searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesSearch
    })
  }, [templates, searchQuery])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <p>Failed to load templates.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-semibold md:text-5xl">AI Automation and Deployment Templates</h1>
          <p className="mt-4 text-muted-foreground">
            Browse tools and templates for AI workflows, n8n automation, application deployment, and managed infrastructure. Hawiyat helps teams in Algeria configure, host, and operate these technologies.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Need implementation help? Explore our <Link href="/services" className="underline">managed services</Link> or <Link href="/schedule" className="underline">book a consultation</Link>.
          </p>
        </header>
        <div className="mb-12 max-w-2xl mx-auto">
        <Input
  type="search"
  placeholder="Search templates..."
  value={searchQuery}
  onChange={handleSearchChange}
  className="h-14 text-lg focus:outline-none focus:ring-0 focus:border-foreground/30"
/>

          <p className="text-sm text-muted-foreground mt-3 text-center">
            {isLoading ? "Loading..." : `${filteredTemplates.length} templates`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-muted rounded mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No templates found.</p>
            <button onClick={() => setSearchQuery("")} className="underline hover:no-underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <a
                key={template.id}
                href={template.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="mb-4 aspect-video bg-white dark:bg-black/90 border border-border rounded-lg flex items-center justify-center p-8 group-hover:border-foreground transition-colors">
                  <Image
                    src={`/logos/${template.logo}`}
                    alt={`${template.name} logo`}
                    width={200}
                    height={100}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:underline">{template.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
