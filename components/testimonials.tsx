import Image from "next/image"

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mante",
      company: "Glu, cto",
      avatar: "/placeholder.svg?height=50&width=50&text=M",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolore deleniti iusto Numquam!",
    },
    {
      name: "Trich B",
      company: "AMI, ceo",
      avatar: "/placeholder.svg?height=50&width=50&text=T",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, vero. Lorem ipsum dolor sit amet.",
    },
    {
      name: "John B",
      company: "Benz, ceo",
      avatar: "/placeholder.svg?height=50&width=50&text=J",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, expedita nihil repellendus accusamus itaque facere labore, suscipit tempore in harum repellat. Doloribus, dolor facere dolorem impedit facilis rerum beatae exercitationem aliquid porro ea architecto similique illo omnis odio consequatur modi.",
    },
    {
      name: "Ben Alfert B",
      company: "XZ tech, cto",
      avatar: "/placeholder.svg?height=50&width=50&text=B",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, vero.",
    },
    {
      name: "Rachel",
      company: "Gem, cto",
      avatar: "/placeholder.svg?height=50&width=50&text=R",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, vero. Lorem, ipsum dolor.",
    },
    {
      name: "Jamie",
      company: "SnapFist.ai, ceo",
      avatar: "/placeholder.svg?height=50&width=50&text=J2",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, nihil vitae fuga ab reiciendis optio et corporis dolorem alias deserunt, molestias in iusto! Ratione, quisquam incidunt. Reprehenderit ipsam officiis enim.",
    },
  ]

  return (
    <section className="flex min-h-[100vh] w-full flex-col place-content-center place-items-center p-[2%]">
      <h3 className="reveal-up text-4xl font-medium text-center max-md:text-2xl">Join the professionals using Pixa</h3>

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
