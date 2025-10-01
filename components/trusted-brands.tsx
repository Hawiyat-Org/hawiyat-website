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
    <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-8">
      <h2 className="reveal-up text-3xl max-md:text-xl">Trusted by  </h2>

      <div className="reveal-up carousel-container overflow-hidden">
        {/* <div className="carousel lg:place-content-center mt-10 flex w-full gap-5 max-md:gap-2"> */}
         <div className="carousel grid grid-cols-4 gap-5 max-md:grid-cols-2 mt-10">
          {brands.map((brand, index) => (
            <div key={index} className="carousel-img h-[30px] w-[150px]">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={150}
                height={30}
                className="h-full w-full object-contain transition-colors hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBrands
