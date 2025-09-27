import Image from "next/image"
import Link from "next/link"

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Unified interface",
      description:
        "Our's is the only unified AI Interface tool brings together all your favorite chat models into one seamless platform. No more juggling between different AI systems—easily manage and interact with multiple chatbots from a single interface.",
      image: "/placeholder.svg?height=180&width=350&text=Unified+Interface",
    },
    {
      title: "API Access",
      description:
        "Pixa's LLM API offers advanced summarization, text generation, and question-answering. Easily integrate with support for JSON, HTML, Markdown, and plain text, enhancing your applications with powerful language tools.",
      image: "/placeholder.svg?height=180&width=350&text=API+Access",
    },
    {
      title: "Pre-built Tools",
      description:
        "Pixa offers pre-built AI integrations for diverse creative tasks including image, video, music, and PDF generation, simplifying advanced feature integration into your apps.",
      image: "/placeholder.svg?height=180&width=350&text=Pre-built+Tools",
    },
  ]

  return (
    <section className="relative flex max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden">
      <div className="mt-8 flex flex-col w-full h-full place-items-center gap-5">
        <div className="reveal-up mt-5 flex flex-col gap-3 text-center">
          <h2 className="text-6xl font-medium max-md:text-3xl p-2">Experience all the benefits of AI</h2>
        </div>

        <div className="mt-6 flex flex-col max-w-[1150px] max-lg:max-w-full h-full p-4 max-lg:place-content-center gap-8">
          <div className="max-xl:flex max-xl:flex-col place-items-center grid grid-cols-3 gap-8 place-content-center auto-rows-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="reveal-up w-[350px] h-[540px] flex max-md:w-full">
                <Link
                  href="#"
                  className="relative p-10 transition-all duration-300 group/card gap-5 flex flex-col w-full h-full bg-[#f6f7fb] dark:bg-[#171717] rounded-3xl hover:scale-[1.02]"
                >
                  <div className="overflow-hidden w-full min-h-[180px] h-[180px]">
                    <Image
                      src={benefit.image || "/placeholder.svg"}
                      width={350}
                      height={180}
                      className="w-full object-contain h-auto"
                      alt={benefit.title}
                    />
                  </div>
                  <h2 className="text-3xl max-md:text-2xl font-medium">{benefit.title}</h2>
                  <p className="text-base leading-normal text-gray-800 dark:text-gray-200">{benefit.description}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span>Learn more</span>
                    <i className="bi bi-arrow-right transform transition-transform duration-300 group-hover/card:translate-x-2"></i>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal-up w-full md:h-[350px] max-md:min-h-[350px] flex">
            <Link
              href="#"
              className="relative p-10 transition-all duration-300 group/card gap-5 flex max-md:flex-col w-full h-full bg-[#f6f7fb] dark:bg-[#171717] rounded-3xl hover:scale-[1.02]"
            >
              <div className="text-6xl overflow-hidden rounded-xl w-full h-full max-md:h-[180px]">
                <Image
                  src="/placeholder.svg?height=350&width=500&text=Multiple+AI+Models"
                  width={500}
                  height={350}
                  className="w-full object-contain h-full"
                  alt="AI models"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl max-md:text-2xl font-medium">Multiple AI models</h2>
                <p className="leading-normal text-gray-800 dark:text-gray-200">
                  Pixa supports various AI models, including ChatGPT, Gemini, Claude, Mistral and more, providing a
                  range of advanced capabilities for various language and creative tasks.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span>Learn more</span>
                  <i className="bi bi-arrow-right transform transition-transform duration-300 group-hover/card:translate-x-2"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
