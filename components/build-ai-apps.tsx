import Link from "next/link"

const BuildAIApps = () => {
  return (
    <section className="relative flex w-full min-h-[100vh] max-lg:min-h-[80vh] flex-col place-content-center place-items-center overflow-hidden ">
      <div className="w-full place-content-center items-center flex flex-col max-w-[900px] gap-4 p-4">
        <div className="purple-bg-grad reveal-up absolute right-[20%] top-[20%] h-[200px] w-[200px]"></div>

        <h2 className="reveal-up text-6xl max-lg:text-4xl text-center leading-normal uppercase text-gray-900 dark:text-white">
          <span className="font-semibold">From Prototype to Production,</span>
          <br />
          <span className="font-serif">in Algeria</span>
        </h2>

        <p className="reveal-up mt-8 max-w-[650px] text-gray-700 dark:text-gray-200 text-center max-md:text-sm">
          We blend multiple AI models together to get flagship-level results at a fraction of the cost. Hawiyat Composer handles the AI layer: smart routing, caching, and cost optimization on every request. Hawiyat Cloud handles hosting, databases, and deployment underneath. Priced in DZD, built for Algeria.
        </p>

        <div className="reveal-up flex mt-8">
          <Link
            href="/services"
            className="shadow-md hover:shadow-xl dark:shadow-gray-800 transition-all duration-300 border-[1px] p-3 px-4 border-black dark:border-white rounded-md"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BuildAIApps
