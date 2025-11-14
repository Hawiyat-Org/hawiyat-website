"use client"

import { useState, useEffect } from "react"
import AIPlayground from "./ai-playground"
import VideoModal from "./video-modal"
const appUrl = process.env.NEXT_PUBLIC_APP_URL

const HeroSection = () => {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const strings = [
    "How to solve a rubik's cube? Step by step guide",
    "What's Hawiyat playground?",
    "How to build an AI SaaS App?",
    "How to integrate Hawiyat API?",
  ]

  useEffect(() => {
    const typeSpeed = 80
    const backDelay = 2000
    const backSpeed = 40

    const timeout = setTimeout(
      () => {
        const currentString = strings[currentStringIndex]

        if (!isDeleting) {
          if (currentCharIndex < currentString.length) {
            setTypedText(currentString.substring(0, currentCharIndex + 1))
            setCurrentCharIndex((prev) => prev + 1)
          } else {
            setTimeout(() => setIsDeleting(true), backDelay)
          }
        } else {
          if (currentCharIndex > 0) {
            setTypedText(currentString.substring(0, currentCharIndex - 1))
            setCurrentCharIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentStringIndex((prev) => (prev + 1) % strings.length)
          }
        }
      },
      isDeleting ? backSpeed : typeSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentCharIndex, currentStringIndex, isDeleting, strings])

  const openVideo = () => {
    setShowVideoModal(true)
    document.body.classList.add("modal-open")
  }

  const closeVideo = () => {
    setShowVideoModal(false)
    document.body.classList.remove("modal-open")
  }

  return (
    <section
      className="hero-section mt-[70px] md:mt-[100px]   relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden"
      id="hero-section"
    >
      <VideoModal isOpen={showVideoModal} onClose={closeVideo} />

      <div className="hero-bg-gradient relative flex h-full min-h-[100vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-6 max-md:p-4 max-md:gap-8">
        <div className="purple-bg-grad reveal-up absolute left-1/2 -translate-x-1/2 top-[10%] h-[120px] w-[120px] max-md:h-[80px] max-md:w-[80px] max-md:top-[5%]"></div>

        <div className="flex flex-col mt-12 md:mt-0 min-h-[60vh] max-md:min-h-[50vh] place-content-center items-center max-md:gap-6">
          <h2 className="reveal-up text-center text-7xl font-medium uppercase leading-[90px] max-lg:text-4xl max-md:text-3xl max-md:leading-tight max-md:px-2">
            All of your <span className="text-4xl md:text-7xl"> InfraStructer</span> 
            <br />
            <span className="font-thin font-serif max-md:text-2xl">
              in one place
            </span>
          </h2>

          <div className="reveal-up mt-8 max-md:mt-4 max-w-[450px] text-lg max-lg:text-base max-md:text-[15px] p-2 max-md:px-4 text-center text-gray-800 dark:text-white max-lg:max-w-full max-md:leading-relaxed">
            Your all in one devops companion. pipe lines, observability, codes, cluster, debug your web apps all with hawiyat
            interface.
          </div>

          <div className="reveal-up mt-10 max-md:mt-6 flex flex-col md:flex-row max-md:w-full max-md:px-4 place-items-center gap-4 max-md:gap-3">
            <button
              onClick={openVideo}
              className="btn !w-[170px] max-lg:!w-[160px] max-md:!w-full !rounded-lg max-md:!rounded-lg !py-4 max-lg:!py-2 max-md:!py-3.5 flex gap-2 place-content-center group !bg-transparent !text-black dark:!text-white transition-all duration-[0.3s] border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95"
            >
              <div className="relative flex place-items-center place-content-center w-6 h-6 max-md:w-5 max-md:h-5">
                <div className="absolute inset-0 top-0 left-0 scale-0 duration-300 group-hover:scale-100 border-2 border-gray-600 dark:border-gray-200 rounded-full w-full h-full"></div>
                <span className="bi bi-play-circle-fill max-md:text-lg"></span>
              </div>
              <span className="max-md:text-[15px] max-md:font-medium">Watch video</span>
            </button>

            <a
              className="btn group max-lg:!w-[160px] max-md:!w-full flex gap-2 place-content-center shadow-lg !w-[170px] !rounded-lg max-md:!rounded-lg !py-4 max-lg:!py-2 max-md:!py-3.5 transition-all duration-[0.3s] hover:scale-x-[1.03] active:scale-95"
              href={appUrl || "https://app.hawiyat.org/"}
            >
              <span className="max-md:text-[15px] max-md:font-medium">Get started</span>
              <i className="bi bi-arrow-right group-hover:translate-x-1 duration-300 max-md:text-lg"></i>
            </a>
          </div>
        </div>

        {/* AI Playground Dashboard */}
        <div
          className="reveal-up mb-12 relative mt-8 max-md:mt-4 flex w-full place-content-center place-items-center max-md:px-0"
          id="dashboard-container"
        >
          <div className="purple-bg-grad reveal-up absolute left-1/2 -translate-x-1/2 top-[5%] h-[200px] w-[200px] max-md:h-[120px] max-md:w-[120px]"></div>

          <div
            className="relative max-w-[80%] bg-white dark:bg-black border-[1px] dark:border-[#36393c] lg:w-[1024px] lg:h-[650px] flex shadow-xl max-lg:h-[450px] max-lg:w-full max-md:h-[400px] max-md:max-w-[95%] overflow-hidden min-w-[320px] md:w-full min-h-[450px] max-md:min-h-[400px] rounded-lg max-md:rounded-3xl bg-transparent transform transition-transform duration-500 hover:scale-[1.01] max-md:hover:scale-100 max-md:shadow-2xl"
            id="dashboard"
          >
            <div className="purple-bg-grad max-w-[80%] reveal-up absolute left-1/2 -translate-x-1/2 top-[0%] lg:max-w-[1000px] h-full w-full"></div>

            <div className="animated-border w-full h-full p-[2px] max-md:p-[1.5px]">
              <div className="w-full h-full rounded-lg max-md:rounded-3xl overflow-hidden flex">
                <AIPlayground typedText={typedText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection