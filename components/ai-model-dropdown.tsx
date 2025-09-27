"use client"

import { useState } from "react"
import Image from "next/image"

interface AIModelDropdownProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

const models = [
  { name: "GPT 4o", icon: "/placeholder.svg?height=20&width=20&text=GPT" },
  { name: "Gemini", icon: "/placeholder.svg?height=20&width=20&text=G" },
  { name: "Llama 3", icon: "/placeholder.svg?height=20&width=20&text=L" },
  { name: "Claude", icon: "/placeholder.svg?height=20&width=20&text=C" },
]

const AIModelDropdown = ({ selectedModel, onModelChange }: AIModelDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedModelData = models.find((model) => model.name === selectedModel) || models[0]

  const handleSelect = (model: (typeof models)[0]) => {
    onModelChange(model.name)
    setIsOpen(false)
  }

  return (
    <div className="dropdown p-2 rounded-md bg-[#f3f4f6] dark:bg-[#171717]">
      <button type="button" className="dropdown-toggle flex gap-5 w-full" onClick={() => setIsOpen(!isOpen)}>
        <span className="flex w-fit gap-2 place-items-center">
          <div className="w-[20px] h-[20px]">
            <Image
              src={selectedModelData.icon || "/placeholder.svg"}
              alt={selectedModel}
              width={20}
              height={20}
              className="dark:invert"
            />
          </div>
          <span>{selectedModel}</span>
        </span>
        <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"} ml-auto lg:hidden`}></i>
        <i className={`bi ${isOpen ? "bi-chevron-down" : "bi-chevron-up"} ml-auto lg:block hidden`}></i>
      </button>

      <ul
        className={`dropdown-menu shadow-md bottom-[50px] max-lg:top-[105%] max-lg:bottom-[unset] ${isOpen ? "block" : "hidden"}`}
      >
        {models.map((model) => (
          <li
            key={model.name}
            className="flex gap-2 place-items-center cursor-pointer"
            onClick={() => handleSelect(model)}
          >
            <div className="w-[20px] h-[20px]">
              <Image
                src={model.icon || "/placeholder.svg"}
                alt={model.name}
                width={20}
                height={20}
                className="dark:invert"
              />
            </div>
            <span>{model.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AIModelDropdown
