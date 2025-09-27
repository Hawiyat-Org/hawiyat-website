import Link from "next/link"

const BuildAIApps = () => {
  return (
    <section className="relative flex w-full min-h-[100vh] max-lg:min-h-[80vh] flex-col place-content-center place-items-center overflow-hidden">
      <div className="w-full place-content-center items-center flex flex-col max-w-[900px] gap-4 p-4">
        <div className="purple-bg-grad reveal-up absolute right-[20%] top-[20%] h-[200px] w-[200px]"></div>

        <h2 className="reveal-up text-6xl max-lg:text-4xl text-center leading-normal uppercase">
          <span className="font-semibold">Build your own AI Apps</span>
          <br />
          <span className="font-serif">on top of Pixa APIs</span>
        </h2>

        <p className="reveal-up mt-8 max-w-[650px] text-gray-900 dark:text-gray-200 text-center max-md:text-sm">
          Pixa's Playground is powered by Pixa's cutting-edge LLM API endpoints. Our powerful models simplify task
          automation, offering advanced capabilities in summarization, text generation, and Q&A handling.
        </p>

        <div className="reveal-up flex mt-8">
          <Link
            href="#"
            target="_blank"
            rel="noopener"
            className="shadow-md hover:shadow-xl dark:shadow-gray-800 transition-all duration-300 border-[1px] p-3 px-4 border-black dark:border-white rounded-md"
          >
            Check Pixa APIs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BuildAIApps
