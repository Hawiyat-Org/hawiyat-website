"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const TrustedBrands = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const brands = [
    { 
      name: "Itihad", 
      logo: "/trust/itihad-logo.svg", 
      url: "https://itihad.group", 
      large: true 
    },
    { 
      name: "ESTIN", 
      logo: "/trust/estin-logo.svg", 
      url: "https://estin.dz/", 
      large: true 
    },
    { 
      name: "IT Solutions", 
      logo: mounted && (resolvedTheme === "dark" || theme === "dark") 
        ? "/trust/itsol-dark.svg" 
        : "/trust/itsol.svg", 
      url: "https://itsolutions.dz/", 
      large: true 
    },
  ]

  return (
    <section className="relative w-full overflow-hidden px-6 max-md:px-4 py-20 md:py-32 max-md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="reveal-up mb-16 md:mb-24 max-md:mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold lg:text-5xl max-md:text-2xl">Trusted by</h2>
        </div>

        <div className="reveal-up relative">
          <div className="grid grid-cols-3 gap-12 md:grid-cols-3 md:gap-16 lg:gap-20 max-md:gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center"
              >
                <Link 
                  href={brand.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full h-full"
                >
                  <div
                    className={`relative w-full transition-transform duration-500 ease-out group-hover:scale-110 ${
                      brand.large
                        ? "h-32 md:h-40 lg:h-52 max-md:h-28"
                        : "h-24 md:h-32 lg:h-40 max-md:h-20"
                    }`}
                  >
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBrands