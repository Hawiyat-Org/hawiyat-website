"use client"

import { useState, useEffect } from "react"
import AIPlayground from "./ai-playground"
import VideoModal from "./video-modal"

const HeroSection = () => {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const strings = [
    "How to solve a rubik's cube? Step by step guide",
    "What's Pixa playground?",
    "How to build an AI SaaS App?",
    "How to integrate Pixa API?",
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
      className="hero-section relative mt-20 flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-lg:mt-[100px]"
      id="hero-section"
    >
      <VideoModal isOpen={showVideoModal} onClose={closeVideo} />

      <div className="hero-bg-gradient relative flex h-full min-h-[100vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-4">
        <div className="purple-bg-grad reveal-up absolute left-1/2 -translate-x-1/2 top-[10%] h-[120px] w-[120px]"></div>

        <div className="flex flex-col min-h-[60vh] place-content-center items-center">
          <h2 className="reveal-up text-center text-7xl font-semibold uppercase leading-[90px] max-lg:text-4xl max-md:leading-snug">
            All your Infra Structer
            <br />
            <span className="font-thin font-serif">
              in one place
            </span>
          </h2>

          <div className="reveal-up mt-8 max-w-[450px] text-lg max-lg:text-base p-2 text-center text-gray-800 dark:text-white max-lg:max-w-full">
            Your all in one devops companion. pipe lines, observability, codes, cluster, debug your web apps all with hawiyat
            interface.
          </div>

          <div className="reveal-up mt-10 max-md:flex-col flex place-items-center gap-4">
            <button
              onClick={openVideo}
              className="btn !w-[170px] max-lg:!w-[160px] !rounded-xl !py-4 max-lg:!py-2 flex gap-2 group !bg-transparent !text-black dark:!text-white transition-colors duration-[0.3s] border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <div className="relative flex place-items-center place-content-center w-6 h-6">
                <div className="absolute inset-0 top-0 left-0 scale-0 duration-300 group-hover:scale-100 border-2 border-gray-600 dark:border-gray-200 rounded-full w-full h-full"></div>
                <span className="bi bi-play-circle-fill"></span>
              </div>
              <span>Watch video</span>
            </button>

            <a
              className="btn group max-lg:!w-[160px] flex gap-2 shadow-lg !w-[170px] !rounded-xl !py-4 max-lg:!py-2 transition-transform duration-[0.3s] hover:scale-x-[1.03]"
              href="#"
            >
              <span>Get started</span>
              <i className="bi bi-arrow-right group-hover:translate-x-1 duration-300"></i>
            </a>
          </div>
        </div>

        {/* AI Playground Dashboard */}
        <div
          className="reveal-up relative mt-8 flex w-full place-content-center place-items-center"
          id="dashboard-container"
        >
          <div className="purple-bg-grad reveal-up absolute left-1/2 -translate-x-1/2 top-[5%] h-[200px] w-[200px]"></div>

          <div
            className="relative max-w-[80%] bg-white dark:bg-black border-[1px] dark:border-[#36393c] lg:w-[1024px] lg:h-[650px] flex shadow-xl max-lg:h-[450px] max-lg:w-full overflow-hidden min-w-[320px] md:w-full min-h-[450px] rounded-xl bg-transparent max-md:max-w-full transform transition-transform duration-500 hover:scale-[1.01]"
            id="dashboard"
          >
            <div className="purple-bg-grad max-w-[80%] reveal-up absolute left-1/2 -translate-x-1/2 top-[0%] lg:max-w-[1000px] h-full w-full"></div>

            <div className="animated-border w-full h-full p-[2px]">
              <div className="w-full h-full rounded-xl overflow-hidden flex">
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