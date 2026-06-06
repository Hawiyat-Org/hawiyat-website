"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SECTIONS } from "./_data"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Terminal, BookOpen, Database, Workflow, Moon, Sun, ChevronDown, Menu, X, Users } from "lucide-react"
import { useTheme } from "next-themes"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  BookOpen,
  Database,
  Workflow,
  Users,
}

export default function ClaudeGuideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [activeSub, setActiveSub] = useState<string>("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  // Track active sub-section via scroll
  useEffect(() => {
    const onScroll = () => {
      const subIds = SECTIONS.flatMap((s) => s.subSections.map((sub) => sub.id))
      for (const id of subIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top >= 0 && rect.top < 200) {
            setActiveSub(id)
            return
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Handle initial hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
          setActiveSub(hash)
        }
      }, 100)
    }
  }, [pathname])

  // Auto-expand current section on navigation
  useEffect(() => {
    const current = SECTIONS.find((s) => pathname === `/guides/claude/${s.id}`)
    if (current) {
      setExpandedSections(new Set([current.id]))
    }
  }, [pathname])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      if (prev.has(id)) {
        const next = new Set(prev)
        next.delete(id)
        return next
      }
      return new Set([id])
    })
  }

  const handleSubClick = (sectionId: string, subId: string) => {
    setActiveSub(subId)
    setMobileMenuOpen(false)
    const currentPath = `/guides/claude/${sectionId}`
    if (pathname !== currentPath) {
      window.location.href = `${currentPath}#${subId}`
      return
    }
    const el = document.getElementById(subId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    window.history.pushState(null, "", `#${subId}`)
  }

  const handleSectionClick = (sectionId: string) => {
    toggleSection(sectionId)
    setActiveSub("")
    setMobileMenuOpen(false)
  }

  // Sidebar content (shared between desktop and mobile)
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`px-5 mb-6 ${isMobile ? "pt-6" : ""}`}>
        <Link href="/guides/claude" className="flex items-center gap-2.5 group" onClick={() => isMobile && setMobileMenuOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 border border-border/50 overflow-hidden transition-all group-hover:border-border">
            <Image src="/services/claude-code.png" alt="Claude Code" width={20} height={20} className="rounded" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground leading-tight">Claude Code</h2>
            <p className="text-[11px] text-muted-foreground leading-tight">Guide</p>
          </div>
        </Link>
        {isMobile && (
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-5 right-4 p-2 rounded-lg hover:bg-foreground/5 transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1 flex-1 overflow-y-auto">
        {SECTIONS.map((section) => {
          const Icon = iconMap[section.icon]
          const isActive = pathname === `/guides/claude/${section.id}`
          const isExpanded = expandedSections.has(section.id)

          return (
            <div key={section.id} className="mb-1">
              <button
                onClick={() => isMobile ? handleSectionClick(section.id) : toggleSection(section.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  isActive && !activeSub
                    ? "bg-foreground/[0.06] text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 shrink-0 opacity-70" />}
                <span className="flex-1 text-left truncate">{section.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 opacity-40 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 pl-3 border-l border-border/60 space-y-0.5">
                  {section.subSections.map((sub) => {
                    const subActive = activeSub === sub.id
                    return (
                      <button
                        key={sub.id}
                        onClick={() => isMobile ? handleSubClick(section.id, sub.id) : handleSubClick(section.id, sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                          subActive
                            ? "bg-foreground/[0.08] text-foreground font-medium"
                            : "text-muted-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                        }`}
                      >
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 space-y-1 mt-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-all duration-200"
        >
          {mounted && theme === "dark" ? <Sun className="w-4 h-4 opacity-70" /> : <Moon className="w-4 h-4 opacity-70" />}
          <span>{mounted && theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>

        <Link
          href="/guides"
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-all duration-200"
        >
          <span className="text-sm">←</span>
          <span>Back to Guides</span>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen pt-4">
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 z-40 h-full w-64 border-r border-border/50 bg-background/80 backdrop-blur-xl overflow-y-auto pt-8 pb-6 hidden lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/guides/claude" className="flex items-center gap-2">
            <Image src="/services/claude-code.png" alt="Claude Code" width={24} height={24} className="rounded" />
            <span className="text-sm font-semibold">Claude Code Guide</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border/50 transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent isMobile />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 pt-16 lg:pt-12 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {children}
        </div>
      </div>
    </div>
  )
}
