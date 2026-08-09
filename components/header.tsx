"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
const Header = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  // Lock body scroll while the mobile menu is open so long pages don't scroll
  // behind the fixed panel (DESIGN §Interactive Behaviors).
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const themeIcon = !mounted ? (
    <span className="block h-5 w-5" aria-hidden="true" />
  ) : theme === "dark" ? (
    <Sun className="w-5 h-5" />
  ) : (
    <Moon className="w-5 h-5" />
  )

  if (pathname?.startsWith("/services/") && pathname !== "/services") return null

  return (
    <header className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4 transition-all duration-300 ease-out ${
      isMobileMenuOpen ? 'max-h-[90vh]' : 'max-h-20'
    }`}>
      <div className={`bg-paper/70 dark:bg-surface-dim/50 backdrop-blur-xl rounded-lg sm:rounded-lg border border-border shadow-md dark:shadow-lg dark:shadow-black/20 transition-all duration-300 ease-out overflow-hidden ${
        isMobileMenuOpen ? 'max-h-[90vh]' : 'max-h-20'
      }`}>

        {/* Main Header Row */}
        <div className="flex items-center justify-between px-3 sm:px-6 min-h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-10" onClick={closeMobileMenu}>
            <Image
              src="/logo.svg"
              alt="Hawiyat Logo"
              width={60}
              height={40}
              className="w-10 h-8 sm:w-12 sm:h-10"
            />
            <span className="text-lg sm:text-xl font-semibold text-ink">
              Hawiyat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/composer"
              className="text-muted-ink hover:text-ink transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-surface-dim"
            >
              Composer
            </Link>
            <Link
              href="/services"
              className="text-muted-ink hover:text-ink transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-surface-dim"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-muted-ink hover:text-ink transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-surface-dim"
            >
              About
            </Link>
          </nav>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border text-muted-ink hover:text-ink hover:bg-surface-dim transition-all duration-200"
              aria-label="Toggle theme"
            >
              {themeIcon}
            </button>

            <Link
              href="/#pricing"
              className="bg-signal text-signal-text px-6 py-2.5 rounded-lg font-medium transition-colors hover:bg-signal-hover flex items-center gap-2 whitespace-nowrap"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg border border-border text-muted-ink hover:text-ink hover:bg-surface-dim transition-all duration-200 touch-manipulation"
              aria-label="Toggle theme"
            >
              {themeIcon}
            </button>

            <button
              className="p-3 touch-manipulation rounded-lg text-muted-ink hover:text-ink hover:bg-surface-dim transition-all duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          } overflow-y-auto`}
        >
          <div className="border-t border-border">
            <nav className="p-4 space-y-1">
              <Link
                href="/composer"
                className="flex items-center justify-between w-full p-4 text-muted-ink hover:text-ink rounded-lg hover:bg-surface-dim transition-all duration-200 touch-manipulation active:scale-[0.98]"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Composer</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>

              <Link
                href="/services"
                className="flex items-center justify-between w-full p-4 text-muted-ink hover:text-ink rounded-lg hover:bg-surface-dim transition-all duration-200 touch-manipulation active:scale-[0.98]"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Services</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>

              <Link
                href="/about"
                className="flex items-center justify-between w-full p-4 text-muted-ink hover:text-ink rounded-lg hover:bg-surface-dim transition-all duration-200 touch-manipulation active:scale-[0.98]"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">About</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>
            </nav>

            {/* Mobile CTA Section */}
            <div className="p-4 border-t border-border bg-surface-dim/40">
              <Link
                href="/#pricing"
                className="flex items-center justify-center w-full bg-signal text-signal-text px-6 py-4 rounded-lg font-medium transition-colors hover:bg-signal-hover touch-manipulation gap-2 shadow-lg"
                onClick={closeMobileMenu}
              >
                <span>Start Building</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
