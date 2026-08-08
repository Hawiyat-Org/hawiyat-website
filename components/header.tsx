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
  const { theme, setTheme } = useTheme()

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (pathname?.startsWith("/guides/claude")) return null
  if (pathname?.startsWith("/services/") && pathname !== "/services") return null

  return (
    <>
      
       <header className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4 transition-all duration-500 ease-out ${
      isMobileMenuOpen ? 'max-h-[90vh]' : 'max-h-20'
    }`}>
      <div className={`bg-white/60 dark:bg-[#3A3A40]/50 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-md dark:shadow-lg dark:shadow-black/20 border border-gray-200/50 dark:border-white/10 transition-all duration-500 ease-out overflow-hidden ${
        isMobileMenuOpen ? 'max-h-[90vh]' : 'max-h-20'
      }`}>
        
        {/* Main Header Row */}
        <div className="flex  items-center justify-between px-3 sm:px-6   min-h-[64px] ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-10" onClick={closeMobileMenu}>
            <Image 
              src="/logo.svg" 
              alt="Hawiyat Logo" 
              width={60} 
              height={40} 
              className="w-10 h-8 sm:w-12 sm:h-10 transition-transform duration-200 hover:scale-105" 
            />
            <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Hawiyat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/hawiyat-composer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-transparent"
            >
              AI in Algeria
            </Link>
            <Link
              href="/cyber-security"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-transparent"
            >
              Cyber Security
            </Link>
            <Link
              href="/services"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-transparent"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-transparent"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg  border-gray-200 dark:border-gray-700   hover:bg-gray-50 dark:hover:bg-black/30 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <Link
              href="/hawiyat-composer"
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-700   hover:bg-gray-50 dark:hover:bg-black/30 transition-all duration-200 touch-manipulation"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
              
            </button>

            <button 
              className="p-3 touch-manipulation rounded-lg hover:bg-gray-100 dark:hover:bg-transparent transition-all duration-200" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced UX */}
        <div className={`lg:hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        } overflow-y-auto`}>
          <div className="border-t border-gray-200 dark:border-white/10">
            
            {/* Mobile Navigation Links */}
            <nav className="p-4 space-y-1">
              <Link
                href="/hawiyat-composer"
                className="flex items-center justify-between w-full p-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-transparent transition-all duration-200 touch-manipulation active:scale-[0.98]"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">AI in Algeria</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>

              <Link
                href="/cyber-security"
                className="flex items-center justify-between w-full p-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-transparent transition-all duration-200 touch-manipulation active:scale-[0.98]"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Cyber Security</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>

              <Link
                href="/services"
                className="flex items-center justify-between w-full p-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-transparent transition-all duration-200 touch-manipulation active:scale-[0.98]"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Services</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>

              <Link
                href="/about"
                className="flex items-center justify-between w-full p-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-transparent transition-all duration-200 touch-manipulation active:scale-[0.98]"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">About Us</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>
            </nav>

            {/* Mobile CTA Section - Enhanced */}
            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
              <Link
                href="/hawiyat-composer"
                className="flex items-center justify-center w-full bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 touch-manipulation active:scale-[0.98] gap-2 shadow-lg"
                onClick={closeMobileMenu}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
    
  )
}

export default Header