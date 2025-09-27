"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Sun, Moon } from "lucide-react"

const Header = () => {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false)
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsHeaderCollapsed(false)
      } else {
        setIsHeaderCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleHeader = () => {
    setIsHeaderCollapsed(!isHeaderCollapsed)
    if (!isHeaderCollapsed) {
      document.body.classList.add("modal-open")
    } else {
      document.body.classList.remove("modal-open")
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleNavDropdown = () => {
    setIsNavDropdownOpen(!isNavDropdownOpen)
  }

  const closeNavDropdown = () => {
    setIsNavDropdownOpen(false)
  }

  if (!mounted) return null

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg border border-gray-200/20 dark:border-gray-700/20">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-sm">P</span>
          </div>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">PIXA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            API
          </Link>
          <Link
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Solutions
          </Link>

          {/* Features Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={toggleNavDropdown}
              onMouseEnter={() => setIsNavDropdownOpen(true)}
              onMouseLeave={() => setTimeout(() => setIsNavDropdownOpen(false), 100)}
            >
              Features
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isNavDropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 grid grid-cols-2 gap-4"
                onMouseEnter={() => setIsNavDropdownOpen(true)}
                onMouseLeave={() => setIsNavDropdownOpen(false)}
              >
                <Link href="#" className="header-links flex text-left gap-4 !p-4">
                  <div className="font-semibold text-3xl">
                    <i className="bi bi-list-columns-reverse"></i>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg text-black dark:text-white font-medium">Prompt library</div>
                    <p>Comes packed with pre-made prompt templates</p>
                  </div>
                </Link>

                <Link href="#" className="header-links flex text-left gap-4 !p-4">
                  <div className="font-semibold text-3xl">
                    <i className="bi bi-grid-1x2-fill"></i>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg text-black dark:text-white font-medium">Unified Interface</div>
                    <p>Test multiple AI models in one interface</p>
                  </div>
                </Link>

                <Link href="#" className="header-links flex text-left gap-4 !p-4">
                  <div className="font-semibold text-3xl">
                    <i className="bi bi-globe"></i>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg text-black dark:text-white font-medium">Realtime web search</div>
                    <p>Search the internet in realtime</p>
                  </div>
                </Link>

                <Link href="#" className="header-links flex text-left gap-4 !p-4">
                  <div className="font-semibold text-3xl">
                    <i className="bi bi-image-fill"></i>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg text-black dark:text-white font-medium">Image generation</div>
                    <p>Generate images from prompts</p>
                  </div>
                </Link>

                <Link href="#" className="header-links flex text-left gap-4 !p-4">
                  <div className="font-semibold text-3xl">
                    <i className="bi bi-calendar-range"></i>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg text-black dark:text-white font-medium">History</div>
                    <p>Continue from where you left off</p>
                  </div>
                </Link>

                <Link href="#" className="header-links flex text-left gap-4 !p-4">
                  <div className="font-semibold text-3xl">
                    <i className="bi bi-translate"></i>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg text-black dark:text-white font-medium">Multilingual</div>
                    <p>Converse in multiple languages</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="#pricing"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Try Playground Button */}
          <Link
            href="#"
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            Try playground
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={toggleHeader}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isHeaderCollapsed && (
        <div className="lg:hidden mt-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <nav className="relative flex h-full max-lg:h-max w-max gap-5 text-base max-lg:mt-[30px] max-lg:flex-col max-lg:gap-5 lg:mx-auto place-items-center">
            <Link href="#" className="header-links">
              API
            </Link>
            <Link href="#" className="header-links">
              Blog
            </Link>
            <Link href="#" className="header-links">
              Solutions
            </Link>

            <div className="relative flex flex-col place-items-center">
              <div
                className="max-lg:max-w-fit flex header-links gap-1 place-items-center cursor-pointer"
                onClick={toggleNavDropdown}
                onMouseEnter={() => window.innerWidth > 1024 && setIsNavDropdownOpen(true)}
                onMouseLeave={() => window.innerWidth > 1024 && setTimeout(closeNavDropdown, 100)}
              >
                <span>Features</span>
                <i className="text-sm bi bi-chevron-down"></i>
              </div>

              <nav
                className={`${isNavDropdownOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} lg:fixed flex lg:top-[80px] lg:left-1/2 lg:-translate-x-1/2 w-[90%] rounded-lg max-lg:h-0 max-lg:w-0 ${isNavDropdownOpen ? "max-lg:min-h-[450px] max-lg:!h-fit min-w-[320px]" : ""} lg:h-[450px] overflow-hidden bg-white dark:bg-[#17181B] duration-300 transition-opacity shadow-lg p-4`}
                onMouseLeave={() => window.innerWidth > 1024 && closeNavDropdown()}
              >
                <div className="grid max-xl:flex max-xl:flex-col justify-around grid-cols-2 w-full">
                  <Link href="#" className="header-links flex text-left gap-4 !p-4">
                    <div className="font-semibold text-3xl">
                      <i className="bi bi-list-columns-reverse"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg text-black dark:text-white font-medium">Prompt library</div>
                      <p>Comes packed with pre-made prompt templates</p>
                    </div>
                  </Link>

                  <Link href="#" className="header-links flex text-left gap-4 !p-4">
                    <div className="font-semibold text-3xl">
                      <i className="bi bi-grid-1x2-fill"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg text-black dark:text-white font-medium">Unified Interface</div>
                      <p>Test multiple AI models in one interface</p>
                    </div>
                  </Link>

                  <Link href="#" className="header-links flex text-left gap-4 !p-4">
                    <div className="font-semibold text-3xl">
                      <i className="bi bi-globe"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg text-black dark:text-white font-medium">Realtime web search</div>
                      <p>Search the internet in realtime</p>
                    </div>
                  </Link>

                  <Link href="#" className="header-links flex text-left gap-4 !p-4">
                    <div className="font-semibold text-3xl">
                      <i className="bi bi-image-fill"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg text-black dark:text-white font-medium">Image generation</div>
                      <p>Generate images from prompts</p>
                    </div>
                  </Link>

                  <Link href="#" className="header-links flex text-left gap-4 !p-4">
                    <div className="font-semibold text-3xl">
                      <i className="bi bi-calendar-range"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg text-black dark:text-white font-medium">History</div>
                      <p>Continue from where you left off</p>
                    </div>
                  </Link>

                  <Link href="#" className="header-links flex text-left gap-4 !p-4">
                    <div className="font-semibold text-3xl">
                      <i className="bi bi-translate"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg text-black dark:text-white font-medium">Multilingual</div>
                      <p>Converse in multiple languages</p>
                    </div>
                  </Link>
                </div>
              </nav>
            </div>

            <Link href="#pricing" className="header-links">
              Pricing
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
