import Image from "next/image"

const AdditionalFeatures = () => {
  const features = [
    {
      title: "Prompt Library",
      description: "Forget about writing your own prompt, use the prompt templates and supercharge your workflow.",
      image: "/placeholder.svg?height=250&width=350&text=Prompt+Library",
    },
    {
      title: "Real-time web search",
      description:
        "Our Real-time web search AI Bot provides instant, live search results directly within the AI chat playground.",
      image: "/placeholder.svg?height=250&width=350&text=Web+Search",
    },
    {
      title: "Image Generation",
      description: "Generate Image instantly from multiple models, create visuals from text descriptions or templates.",
      image: "/placeholder.svg?height=250&width=350&text=Image+Generation",
    },
    {
      title: "History",
      description:
        "All of the models can recall previous topic, so you can continue your conversation at any point of time.",
      image: "/placeholder.svg?height=250&width=350&text=History",
    },
    {
      title: "Import content",
      description:
        "Effortlessly import PDFs, images, and documents. Use AI to ask questions, extract information, and summarize documents.",
      image: "/placeholder.svg?height=250&width=350&text=Import+Content",
    },
    {
      title: "Multilingual support",
      description: "ChatGPT, and Gemini can understand and respond in over 100 languages.",
      image: "/placeholder.svg?height=250&width=350&text=Multilingual",
    },
  ]

  return (
    <section className="relative flex w-full min-h-[110vh] max-md:min-h-[80vh] flex-col place-content-center place-items-center overflow-hidden">
      <div className="w-full max-lg:max-w-full place-content-center items-center flex flex-col max-w-[80%] gap-4 p-4">
        <h3 className="reveal-up text-5xl font-medium max-md:text-3xl text-center leading-normal">
          Additional Features
        </h3>

        <div className="mt-8 relative gap-10 p-4 grid place-items-center grid-cols-3 max-lg:flex max-lg:flex-col">
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal-up w-[350px] border-[1px] h-[400px] rounded-md place-items-center p-4 bg-[#f2f3f4] max-md:w-[320px] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-3"
            >
              <div className="w-full h-[250px] p-4 rounded-xl backdrop-blur-2xl overflow-hidden flex place-content-center">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={350}
                  height={250}
                  className="w-auto h-full object-contain"
                />
              </div>
              <h3 className="text-2xl">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 px-4 text-center text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdditionalFeatures
