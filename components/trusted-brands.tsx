import Image from "next/image"
import Link from "next/link"

const TrustedBrands = () => {
  const brands = [
    { 
      name: "Itihad", 
      logo: "/brands/itihad-logo.svg", 
      url: "https://itihad.group", 
      large: true 
    },
    { 
      name: "ESTIN", 
      logo: "/brands/estin-logo.svg", 
      url: "https://estin.dz/" , large: true 
      
    },
    { 
      name: "IT Solutions", 
      logo: "/brands/itsol.svg", 
      url: "https://itsolutions.dz/", 
      large: true 
    },
  ]

  return (
    <section className="relative w-full overflow-hidden px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="reveal-up mb-16 text-center md:mb-24">
          <h2 className="text-3xl md:text-4xl font-semibold lg:text-5xl">Trusted by</h2>
        </div>

        <div className="reveal-up relative">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16 lg:gap-20">
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
                        ? "h-32 md:h-40 lg:h-52"
                        : "h-24 md:h-32 lg:h-40"
                    }`}
                  >
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
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
