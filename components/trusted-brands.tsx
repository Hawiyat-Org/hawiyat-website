import Image from "next/image"

const TrustedBrands = () => {
  const brands = [
    { name: "Google", logo: "/placeholder.svg?height=30&width=150&text=Google" },
    { name: "Microsoft", logo: "/placeholder.svg?height=30&width=150&text=Microsoft" },
    { name: "Adobe", logo: "/placeholder.svg?height=30&width=150&text=Adobe" },
    { name: "Airbnb", logo: "/placeholder.svg?height=30&width=150&text=Airbnb" },
    { name: "Stripe", logo: "/placeholder.svg?height=30&width=150&text=Stripe" },
    { name: "Reddit", logo: "/placeholder.svg?height=30&width=150&text=Reddit" },
  ]

  return (
    <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-8">
      <h2 className="reveal-up text-3xl max-md:text-xl">Trusted by brands you love</h2>

      <div className="reveal-up carousel-container">
        <div className="carousel lg:place-content-center mt-10 flex w-full gap-5 max-md:gap-2">
          {brands.map((brand, index) => (
            <div key={index} className="carousel-img h-[30px] w-[150px]">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={150}
                height={30}
                className="h-full w-full object-contain grayscale transition-colors hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBrands
