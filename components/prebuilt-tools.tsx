import Link from "next/link"

const PrebuiltTools = () => {
  const tools = [
    {
      icon: "bi-code-square",
      title: "AI code generator",
      description:
        "AI code generation tools to create code from natural language or patterns, streamlining development and improving efficiency.",
    },
    {
      icon: "bi-file-pdf-fill",
      title: "PDF generator",
      description:
        "Use AI tools to automate PDF creation and content extraction, improving document management and data processing.",
    },
    {
      icon: "bi-image-fill",
      title: "Image generation",
      description:
        "Prebuilt AI tools for image generation create visuals from text or patterns, enhancing design and creative projects.",
    },
    {
      icon: "bi-bar-chart-line-fill",
      title: "AI Analytics",
      description:
        "Our AI analytics tools analyze data patterns and trends, providing actionable insights and enhancing decision-making.",
    },
    {
      icon: "bi-music-note-beamed",
      title: "Music generator",
      description:
        "Access our AI music generation tools create original compositions from input parameters, enabling effortless music creation for various needs.",
    },
    {
      icon: "bi-camera-video-fill",
      title: "Video generator",
      description:
        "Use our AI video generation tools create videos from text or templates, streamlining content creation and production.",
    },
  ]

  return (
    <section className="relative mt-10 flex min-h-[100vh] w-full max-w-[100vw] flex-col place-items-center lg:p-6">
      <div className="reveal-up mt-[5%] flex h-full w-full place-content-center gap-2 p-4 max-lg:max-w-full max-lg:flex-col">
        <div className="relative flex max-w-[30%] max-lg:max-w-full flex-col place-items-start gap-4 p-2 max-lg:place-items-center max-lg:place-content-center max-lg:w-full">
          <div className="top-40 flex flex-col lg:sticky place-items-center max-h-fit max-w-[850px] max-lg:max-h-fit max-lg:max-w-[320px] overflow-hidden">
            <h2 className="text-5xl font-serif text-center font-medium max-md:text-3xl">Pre-built AI Tools</h2>

            <Link
              href="#"
              className="btn !mt-8 !bg-transparent !text-black !border-[1px] !border-black dark:!border-white dark:!text-white"
            >
              Start Chat
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-10 h-full max-w-1/2 max-lg:max-w-full px-[10%] max-lg:px-4 max-lg:gap-3 max-lg:w-full lg:top-[20%] place-items-center">
          {tools.map((tool, index) => (
            <div key={index} className="reveal-up h-[240px] w-[450px] max-md:w-full">
              <Link
                href="#"
                className="flex w-full h-full gap-8 rounded-xl hover:shadow-lg dark:shadow-[#171717] duration-300 transition-all p-8 group/card"
              >
                <div className="text-4xl max-md:text-2xl">
                  <i className={`bi ${tool.icon}`}></i>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl max-md:text-xl">{tool.title}</h3>
                  <p className="text-gray-800 dark:text-gray-100 max-md:text-sm">{tool.description}</p>

                  <div className="mt-auto flex gap-2 underline underline-offset-4">
                    <span>Learn more</span>
                    <i className="bi bi-arrow-up-right group-hover/card:-translate-y-1 group-hover/card:translate-x-1 duration-300 transition-transform"></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PrebuiltTools
