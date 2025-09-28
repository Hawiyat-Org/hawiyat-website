import Image from "next/image"

const Testimonials = () => {
  const testimonials = [
    {
      name: "Amine K.",
      company: "DevOps Lead, Algotech",
      avatar: "/placeholder.svg?height=50&width=50&text=A",
      content:
        "With Hawiyat’s one-click deployment, we cut release times from hours to minutes. Our team can now ship updates daily without worrying about downtime.",
    },
    {
      name: "Sarah M.",
      company: "CTO, Innovexa",
      avatar: "/placeholder.svg?height=50&width=50&text=S",
      content:
        "GitHub integration works like magic—push your code and Hawiyat takes care of testing and deployment automatically. It just feels seamless.",
    },
    {
      name: "Yacine L.",
      company: "Founder, CloudNest",
      avatar: "/placeholder.svg?height=50&width=50&text=Y",
      content:
        "Automated backups saved us more than once. Knowing our data is secure and recoverable with Hawiyat gives us complete peace of mind.",
    },
    {
      name: "Rania B.",
      company: "Product Manager, NextWave",
      avatar: "/placeholder.svg?height=50&width=50&text=R",
      content:
        "The unified dashboard is a game-changer. From deployment to monitoring, everything is in one place—easy to track and easy to manage.",
    },
    {
      name: "Houssem T.",
      company: "CEO, BrightApps",
      avatar: "/placeholder.svg?height=50&width=50&text=H",
      content:
        "We scaled from a few users to thousands without touching infrastructure. Hawiyat handled everything in the background, flawlessly.",
    },
    {
      name: "Nadia F.",
      company: "Data Engineer, Flowlytics",
      avatar: "/placeholder.svg?height=50&width=50&text=N",
      content:
        "The analytics and monitoring tools are super insightful. We now spot issues before they impact users—something we never had before Hawiyat.",
    },
  ]

  return (
    <section className="flex min-h-[100vh] w-full flex-col place-content-center place-items-center p-[2%]">
      <h3 className="reveal-up text-4xl font-medium text-center max-md:text-2xl">
        Trusted by professionals building on Hawiyat
      </h3>

      <div className="mt-20 gap-10 space-y-8 max-md:columns-1 lg:columns-2 xl:columns-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="reveal-up flex h-fit w-[350px] break-inside-avoid flex-col gap-4 rounded-lg border-[1px] bg-[#f6f7fb] dark:bg-[#080808] dark:border-[#1f2123] p-4 max-lg:w-[320px]"
          >
            <div className="flex place-items-center gap-3">
              <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  className="h-full w-full object-cover"
                  alt={testimonial.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-gray-700 dark:text-gray-300">{testimonial.company}</div>
              </div>
            </div>

            <p className="mt-4 text-gray-800 dark:text-gray-200">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
