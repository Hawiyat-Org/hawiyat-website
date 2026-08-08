"use client"

import { useState } from "react"
import Link from "next/link"

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section
      className="hero-section mt-[70px] md:mt-[100px]   relative flex min-h-[75vh] w-full max-w-[100vw] flex-col overflow-hidden"
      id="hero-section"
    >
      <div className="hero-bg-gradient relative flex h-full min-h-[75vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-6 max-md:p-4 max-md:gap-8">
        <div className="purple-bg-grad absolute left-1/2 -translate-x-1/2 top-[10%] h-[120px] w-[120px] max-md:h-[80px] max-md:w-[80px] max-md:top-[5%]"></div>

        <div className="flex flex-col mt-12 md:mt-0 min-h-[45vh] max-md:min-h-[40vh] place-content-center items-center max-md:gap-6">
          <h1 className="text-center text-7xl font-medium uppercase leading-[90px] max-lg:text-4xl max-md:text-3xl max-md:leading-tight max-md:px-2">
            Algeria's AI{" "}
            <span className="text-4xl md:text-7xl">Provider</span>
            <br />
            <span className="font-thin font-serif max-md:text-2xl">
              Built to Ship
            </span>
          </h1>

          {/*
            Machine-readable entity aliases for this hero section.
            AI search & search engines read these phrasings; they are never
            rendered to humans. This is the legitimate channel for
            "invisible" keyword coverage (structured data), unlike CSS-hidden
            text which Google treats as spam.
          */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                url: "https://www.hawiyat.org/",
                name: "Algeria's AI Provider — AI in Algeria",
                headline: "Algeria's AI Provider | Algeria AI Provider | AI in Algeria | B2B AI Algeria | AI Provider in Algeria | ai provider in algeria | b2b ai in algeria | b2b ai provider in algeria",
                about: {
                  "@type": "Organization",
                  name: "Hawiyat",
                  alternateName: [
                    "Algeria's AI Provider",
                    "Algeria AI Provider",
                    "AI in Algeria",
                    "B2B AI Algeria",
                    "AI Provider in Algeria",
                    "ai provider in algeria",
                    "b2b ai in algeria",
                    "b2b ai provider in algeria",
                    "AI provider algerie",
                    "Fournisseur IA en Algérie",
                    "مزود الذكاء الاصطناعي في الجزائر",
                  ],
                },
              }),
            }}
          />

          <div className="mt-8 max-md:mt-4 max-w-[600px] text-lg max-lg:text-base max-md:text-[15px] p-2 max-md:px-4 text-center text-gray-800 dark:text-white max-lg:max-w-full max-md:leading-relaxed">
            Hawiyat Composer routes and caches every request between your coding tools and the AI models you use. Same endpoints. Priced in DZD, backed by our own cloud.
          </div>

          <div className="mt-10 max-md:mt-6 flex flex-col md:flex-row max-md:w-full max-md:px-4 place-items-center gap-4 max-md:gap-3">
            <Link
              href="/services"
              className="btn group max-lg:!w-[160px] max-md:!w-full flex gap-2 place-content-center shadow-lg !w-[170px] !rounded-lg max-md:!rounded-lg !py-4 max-lg:!py-2 max-md:!py-3.5 transition-all duration-[0.3s] hover:scale-x-[1.03] active:scale-95"
            >
              <span className="max-md:text-[15px] max-md:font-medium">Get Started</span>
              <i className="bi bi-arrow-right group-hover:translate-x-1 duration-300 max-md:text-lg"></i>
            </Link>

            <button
              onClick={() => setShowVideo(true)}
              className="btn !w-[170px] max-lg:!w-[160px] max-md:!w-full !rounded-lg max-md:!rounded-lg !py-4 max-lg:!py-2 max-md:!py-3.5 flex gap-2 place-content-center group !bg-transparent !text-black dark:!text-white transition-all duration-[0.3s] border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95"
            >
              <span className="max-md:text-[15px] max-md:font-medium">Watch video</span>
              <i className="bi bi-play-circle-fill max-md:text-lg"></i>
            </button>
          </div>

        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <i className="bi bi-x text-lg"></i>
            </button>
            <iframe
              src="https://www.youtube.com/embed/V2N9RvzCdnM?autoplay=1"
              title="Hawiyat Composer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection