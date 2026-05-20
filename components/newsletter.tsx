"use client"

import type React from "react"
import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
      } else {
        setMessage("Successfully subscribed to our newsletter!")
        setEmail("")
      }
    } catch (err) {
      console.error("Subscription error:", err)
      setError("Failed to subscribe. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex w-full flex-col place-content-center place-items-center gap-[10%] p-[5%] px-[10%] max-md:px-2">
      <div className="flex w-full max-w-6xl place-content-center place-items-center justify-between gap-3 rounded-lg bg-[#F6F7FB] dark:bg-[#3A3A40] p-6 max-md:max-w-full max-md:flex-col">
        <div className="flex flex-col max-lg:text-center gap-1">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 max-md:text-xl">Join our newsletter</h2>
          <div className="text-gray-700 dark:text-gray-300">Get product insights and updates.</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex h-[60px] place-items-center gap-2 overflow-hidden p-2 max-md:w-full"
        >
            <input
            type="email"
            className="input h-full w-full !border-gray-600 p-2 outline-none"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn !rounded-lg !border-[1px] !text-black !border-solid !border-black dark:!text-white dark:!border-gray-300 !bg-transparent transition-all duration-[0.3s] disabled:opacity-60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black min-w-[100px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Joining...
              </span>
            ) : (
              "Join"
            )}
          </button>
        </form>
      </div>

      {message && (
        <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 text-green-700 dark:text-green-400 text-center animate-fadeIn">
          <div className="font-medium">{message}</div>
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-400 text-center animate-fadeIn">
          <div className="font-medium">{error}</div>
        </div>
      )}
    </section>
  )
}

export default Newsletter
