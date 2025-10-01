import Link from "next/link"

const BuildAIApps = () => {
  return (
    <section className="relative flex w-full min-h-[100vh] max-lg:min-h-[80vh] flex-col place-content-center place-items-center overflow-hidden">
      <div className="w-full place-content-center items-center flex flex-col max-w-[900px] gap-4 p-4">
        <div className="purple-bg-grad reveal-up absolute right-[20%] top-[20%] h-[200px] w-[200px]"></div>

        <h2 className="reveal-up text-6xl max-lg:text-4xl text-center leading-normal uppercase">
          <span className="font-semibold">Launch Your SaaS</span>
          <br />
          <span className="font-serif">with Hawiyat Cloud</span>
        </h2>

        <p className="reveal-up mt-8 max-w-[650px] text-gray-900 dark:text-gray-200 text-center max-md:text-sm">
          Build, deploy, and scale your applications faster than ever.  
          <span className="font-semibold"> Hawiyat Cloud</span> provides an all-in-one playground for developers, combining  
          seamless app hosting, AI-powered integrations, and enterprise-grade scalability.  
          From idea to production, we’ve got you covered.
        </p>

        <div className="reveal-up flex mt-8">
          <Link
            href="#"
            target="_blank"
            rel="noopener"
            className="shadow-md hover:shadow-xl dark:shadow-gray-800 transition-all duration-300 border-[1px] p-3 px-4 border-black dark:border-white rounded-md"
          >
            Explore Hawiyat APIs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BuildAIApps
