"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import AIModelDropdown from "./ai-model-dropdown"

interface AIPlaygroundProps {
  typedText: string
}

const AIPlayground = ({ typedText }: AIPlaygroundProps) => {
  const [prompts, setPrompts] = useState<string[]>([])
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("GPT 4o")
  const [showSignup, setShowSignup] = useState(false)
  const MAX_PROMPTS = 3

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (prompts.length >= MAX_PROMPTS || !currentPrompt.trim()) return

    const newPrompts = [...prompts, currentPrompt]
    setPrompts(newPrompts)
    setCurrentPrompt("")

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "gpt 4o": "Hello from GPT 4o, add 3 prompts",
        gemini: "Hello from Gemini, add 3 prompts",
        "llama 3": "Hello from Meta Llama 3, add 3 prompts",
        claude: "Hello from Claude, add 3 prompts",
      }

      const response = responses[selectedModel.toLowerCase() as keyof typeof responses] || responses["gpt 4o"]
      setPrompts((prev) => [...prev, response])
    }, 500)

    if (newPrompts.length >= MAX_PROMPTS) {
      setShowSignup(true)
    }
  }

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
  }

  return (
    <>
      {/* Sign-up popup */}
      <div
        className={`absolute rounded-xl text-center transition-transform duration-300 ${showSignup ? "scale-100" : "scale-0"} backdrop-blur-lg flex flex-col p-10 place-items-center gap-4 w-full h-full dark:bg-[#000000b4] bg-[#ffffff6a] top-0 left-0 z-20`}
      >
        <h4 className="mt-6 text-3xl max-md:text-xl">Signup to continue your conversation</h4>

        <div className="flex gap-1 place-items-center">
          <div className="flex -space-x-4">
            <Image
              className="z-10 w-10 h-10 object-cover rounded-full border-2 border-white"
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              alt="Avatar 1"
            />
            <Image
              className="z-[4] w-10 h-10 object-cover rounded-full border-2 border-white"
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              alt="Avatar 2"
            />
            <Image
              className="z-[3] w-10 h-10 object-cover rounded-full border-2 border-white"
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              alt="Avatar 3"
            />
            <Image
              className="z-[2] w-10 h-10 object-cover rounded-full border-2 border-white"
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              alt="Avatar 4"
            />
            <Image
              className="z-[1] w-10 h-10 object-cover rounded-full border-2 border-white"
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              alt="Avatar 5"
            />
          </div>
          <p>+20,000</p>
        </div>

        <div className="mt-3 text-lg">Join Ben and 20,000+ users using Pixa</div>

        <a href="#" className="btn">
          Sign up
        </a>
      </div>

      {/* Sidebar */}
      <div className="min-w-[250px] max-lg:hidden p-2 gap-2 flex flex-col bg-gray-100 dark:bg-[#171717] h-full">
        <div className="h-[30px] w-fit max-w-[100px]">
          <Image
            src="/pixa-logo.jpg"
            alt="logo"
            width={100}
            height={30}
            className="object-contain opacity-80 h-full w-full dark:invert"
          />
        </div>

        <div className="flex mt-2 gap-2 flex-col">
          <a href="#" className="flex rounded-sm gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <i className="bi bi-image"></i>
            <span>Image generator</span>
          </a>
          <a href="#" className="flex rounded-sm gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <i className="bi bi-file-pdf"></i>
            <span>Pdf generator</span>
          </a>
          <a href="#" className="flex rounded-sm gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <i className="bi bi-code-square"></i>
            <span>Code generator</span>
          </a>
          <a href="#" className="flex rounded-sm group gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <span>Show all</span>
            <i className="bi bi-arrow-right transform transition-transform duration-300 group-hover:translate-x-1"></i>
          </a>
        </div>

        <div className="mt-auto w-full flex px-6 place-content-center">
          <a
            href="#"
            className="btn !w-full !bg-transparent duration-[0.3s] hover:!bg-black hover:!text-white dark:hover:!bg-white dark:hover:!text-black !border-[1px] !border-black !text-black dark:!border-white dark:!text-white"
          >
            Signup
          </a>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex w-full p-4 bg-white dark:bg-black h-full flex-col">
        <div className="relative w-full flex place-content-center h-full">
          <div className="absolute top-[20%] max-lg:top-[30%] left-1/2 -translate-x-1/2 w-[150px] h-[150px]">
            <Image
              src="/pixa-logo.jpg"
              width={150}
              height={150}
              className="w-full h-full dark:invert object-contain opacity-20"
              alt="Pixa logo"
            />
          </div>

          <div className="overflow-y-auto px-[5%] max-lg:px-2 scrollbar max-lg:max-h-[80%] max-h-[550px] max-lg:mt-12 w-full h-full z-10 flex flex-col">
            {prompts.length === 0 ? (
              <div className="w-full flex text-center flex-col place-content-center">
                <h2 className="text-4xl max-md:text-2xl max-md:mt-3 opacity-80">Try Prompts</h2>
                <div className="inline mt-6 max-md:mt-3">
                  <span>{typedText}</span>
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {prompts.map((prompt, index) => (
                  <div key={index} className="w-full flex p-2">
                    <div
                      className={`w-fit p-2 rounded-xl ${index % 2 === 0 ? "ml-auto bg-gray-100 dark:bg-[#171717]" : "mr-auto"}`}
                    >
                      {prompt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="place-content-center mt-auto h-[50px] p-1 place-items-center justify-around flex gap-1 bottom-2 w-full rounded-md bg-[#f3f4f6] dark:bg-[#171717]"
        >
          <div className="min-w-[140px] min-h-[80px] max-lg:absolute z-10 top-1 left-1/2 max-lg:-translate-x-1/2 flex flex-col text-sm gap-1 place-content-center">
            <AIModelDropdown selectedModel={selectedModel} onModelChange={handleModelChange} />
          </div>

          <input
            placeholder="How to develop a saas app?"
            type="text"
            className="p-2 !outline-none bg-transparent border-none w-full placeholder-gray-500 dark:placeholder-opacity-60 dark:placeholder-gray-300 max-w-[80%] h-full"
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            disabled={prompts.length >= MAX_PROMPTS}
          />

          <button
            type="submit"
            className="btn !bg-[#6366f1] !p-2 !px-3 !text-white"
            title="submit"
            disabled={prompts.length >= MAX_PROMPTS}
          >
            <i className="bi bi-arrow-up"></i>
          </button>
        </form>
      </div>
    </>
  )
}

export default AIPlayground
