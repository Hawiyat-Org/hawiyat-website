import Image from "next/image"

const TrustedBrands = () => {
  const brands = [
    { name: "Itihad", logo: "/itihad-logo.jpg" },
    { name: "ESTIN", logo: "/estin-logo.png" },
    { name: "Adobe", logo: "/itihad-logo.jpg" },
    { name: "Airbnb", logo: "/itihad-logo.jpg" },
    { name: "Stripe", logo: "/itihad-logo.jpg" },
    { name: "Reddit", logo: "/itihad-logo.jpg" },
  ]

  return (
    <section className="relative w-full overflow-hidden px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="reveal-up mb-16 text-center md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">Trusted by</h2>
        </div>

        <div className="reveal-up relative">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16 lg:gap-20">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center"
              >
                <div className="relative h-24 w-full transition-transform duration-500 ease-out group-hover:scale-110 md:h-32 lg:h-40">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    className="object-contain grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBrands