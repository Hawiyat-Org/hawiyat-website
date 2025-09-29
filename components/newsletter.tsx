"use client"

import type React from "react"

import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="flex w-full flex-col place-content-center place-items-center gap-[10%] p-[5%] px-[10%] max-md:px-2">
      <div className="flex w-full max-w-6xl place-content-center place-items-center justify-between gap-3 rounded-lg bg-[#F6F7FB] dark:bg-[#171717] p-6 max-md:max-w-full max-md:flex-col">
        <div className="flex flex-col max-lg:text-center gap-1">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 max-md:text-xl">Join our newsletter</h2>
          <div className="text-gray-700 dark:text-gray-300">Get product insights and updates.</div>
        </div>

        <form onSubmit={handleSubmit} className="flex h-[60px] place-items-center gap-2 overflow-hidden p-2">
          <input
            type="email"
            className="input h-full w-full !border-gray-600 p-2 outline-none"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn !rounded-full !border-[1px] !text-black !border-solid !border-black dark:!text-white dark:!border-gray-300 !bg-transparent transition-colors duration-[0.3s]"
          >
            Signup
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
