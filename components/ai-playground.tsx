"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface AIPlaygroundProps {
  typedText: string
}

interface ConversationMessage {
  role: "user" | "assistant"
  content: string
  title?: string
}

// AI Model Dropdown Component
const AIModelDropdown = ({ selectedModel, onModelChange }: { selectedModel: string, onModelChange: (model: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  const aiModels = [
    { name: "Hawiyat Composer", icon: "bi-cpu", color: "text-cyan-600" },
    { name: "Pablo", icon: "bi-robot", color: "text-orange-600"},
  ]

  const currentModel = aiModels.find(model => model.name === selectedModel) || aiModels[0]

  return (
    <div className="relative ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2  dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[140px]"
      >
        <i className={`${currentModel.icon} ${currentModel.color}`}></i>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium truncate">{currentModel.name}</span>
    
        </div>
        <i className={`bi bi-chevron-down ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-30 md:bottom-full mb-2 md:left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg  min-w-[200px]">
          {aiModels.map((model) => (
            <button
              key={model.name}
              type="button"
              onClick={() => {
                onModelChange(model.name)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left ${
                selectedModel === model.name ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <i className={`${model.icon} ${model.color}`}></i>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{model.name}</span>
               
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const AIPlayground = ({ typedText }: AIPlaygroundProps) => {
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("Hawiyat Composer")
  const [showSignup, setShowSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const MAX_PROMPTS = 3

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (conversation.length >= MAX_PROMPTS * 2 || !currentPrompt.trim() || isLoading) return

    const userMessage = currentPrompt.trim()
    setCurrentPrompt("")
    setIsLoading(true)

    // Add user message to conversation
    const updatedConversation: ConversationMessage[] = [
      ...conversation,
      { role: "user", content: userMessage }
    ]
    setConversation(updatedConversation)

    try {
      // Call the API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation: conversation
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from API')
      }

      const data = await response.json()
      
      // Update conversation with API response
      setConversation(data.conversation || [
        ...updatedConversation,
        { role: "assistant", content: data.text, title: data.title }
      ])

      // Show signup popup after reaching limit
      if (data.conversation.length >= MAX_PROMPTS * 2) {
        setShowSignup(true)
      }
    } catch (error) {
      console.error('Error calling chat API:', error)
      
      // Fallback response on error
      const errorResponse: ConversationMessage = {
        role: "assistant",
        content: "Please try again in a moment.",
        title: "Connection Error 🔄"
      }
      setConversation([...updatedConversation, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
  }

  return (
    <>
      {/* Sign-up popup */}
      <div
        className={`absolute rounded-xl text-center transition-transform duration-300
           ${showSignup ? "scale-100" : "scale-0"} backdrop-blur-lg flex flex-col p-10 place-items-center gap-4 w-full h-full dark:bg-[#000000b4] bg-[#ffffff6a] top-0 left-0 z-20`}
      >
        <h2 className="mt-6 text-3xl max-md:text-xl">Signup to continue using Hawiyat Composer</h2>

        <p className="text-lg">Join developers across Algeria using Hawiyat Composer to cut their AI costs</p>

        <a href="/services" className="btn">
          Sign up
        </a>
      </div>

      {/* Sidebar */}
      <div className="min-w-[250px] max-lg:hidden p-2 gap-2 flex flex-col bg-gray-100 dark:bg-[#171717] h-full">
        <div className="h-[30px] w-fit max-w-[100px]">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={30}
            className="object-contain opacity-80 h-full w-full "
          />
        </div>

        <div className="flex mt-2 gap-2 flex-col">
          <a href="/services" className="flex rounded-sm gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <i className="bi bi-cloud-upload"></i>
            <span>Deployments</span>
          </a>
          <a href="/services" className="flex rounded-sm gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <i className="bi bi-robot"></i>
            <span>Agents</span>
          </a>
          <a href="/services" className="flex rounded-sm gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <i className="bi bi-book"></i>
            <span>Docs & CLI</span>
          </a>
          <a href="/services" className="flex rounded-sm group gap-2 p-2 dark:hover:bg-[#2d2d2ddb] hover:bg-gray-200">
            <span>Explore More</span>
            <i className="bi bi-arrow-right transform transition-transform duration-300 group-hover:translate-x-1"></i>
          </a>
        </div>

        <div className="mt-auto w-full flex px-6 place-content-center">
          <a
            href="/services"
            className="btn !w-full py-2 !bg-transparent duration-[0.3s] hover:!bg-black hover:!text-white dark:hover:!bg-white dark:hover:!text-black !border-[1px] !border-black !text-black dark:!border-white dark:!text-white"
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
              src="/services/composer-light.svg"
              width={150}
              height={150}
              className="w-full h-full object-contain opacity-20 dark:invert"
              alt="Hawiyat Composer logo"
            />
          </div>

          <div className="overflow-y-auto px-[5%] max-lg:px-2 scrollbar max-lg:max-h-[80%] max-h-[550px] max-lg:mt-12 w-full h-full z-10 flex flex-col">
            {conversation.length === 0 ? (
              <div className="w-full flex text-center flex-col place-content-center">
                <h2 className="text-4xl max-md:text-2xl max-md:mt-3 opacity-80">Hawiyat Composer  interactive helper</h2>
                <div className="inline mt-6 max-md:mt-3">
                  <span>{typedText}</span>
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {conversation.map((msg, index) => (
                  <div key={index} className="w-full flex p-2">
                    <div
                      className={`w-fit max-w-[80%] p-4 rounded-xl ${
                        msg.role === "user" 
                          ? "ml-auto bg-gray-100 dark:bg-[#171717]" 
                          : "mr-auto bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-100 dark:border-cyan-800/30"
                      }`}
                    >
                      {msg.role === "assistant" && msg.title && (
                        <div className="text-xl font-bold mb-3 text-cyan-700 dark:text-cyan-400">
                          {msg.title}
                        </div>
                      )}
                      <div className={`whitespace-pre-wrap ${msg.role === "assistant" ? "text-sm leading-relaxed" : ""}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="w-full flex p-2">
                    <div className="w-fit p-4 rounded-xl mr-auto bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-100 dark:border-cyan-800/30">
                      <span className="animate-pulse text-cyan-700 dark:text-cyan-400">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="place-content-center mt-auto h-[50px] p-1 place-items-center justify-around flex gap-1 bottom-2 w-full rounded-md bg-[#f3f4f6] dark:bg-[#171717]"
        >
          <div className="min-w-[100px] max-lg:absolute z-10 top-1 left-1/2 max-lg:-translate-x-1/2 flex flex-col text-sm gap-1 place-content-center">
            <AIModelDropdown selectedModel={selectedModel} onModelChange={handleModelChange} />
          </div>


          <input
            placeholder="Ask the Hawiyat CLI (e.g. 'how do I deploy my app?')"
            type="text"
            className="p-2 !outline-none pl-16 bg-transparent border-none w-full
             placeholder-gray-500 dark:placeholder-opacity-60 dark:placeholder-gray-300 max-w-[95%] h-full"
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            disabled={conversation.length >= MAX_PROMPTS * 2 || isLoading}
          />

          <button
            type="submit"
            className="btn !bg-black !p-2 !px-3 !text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="submit"
            disabled={conversation.length >= MAX_PROMPTS * 2 || isLoading}
          >
            {isLoading ? (
              <i className="bi bi-hourglass-split animate-spin"></i>
            ) : (
              <i className="bi bi-arrow-up"></i>
            )}
          </button>
        </form>
      </div>
    </>
  )
}

export default AIPlayground