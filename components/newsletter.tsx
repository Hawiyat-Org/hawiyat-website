"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"

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
    <section className="flex w-full flex-col place-content-center place-items-center px-6 pb-24 max-md:px-4">
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-surface p-8 md:flex-row md:p-10">
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-signal" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-ink">
              Newsletter
            </h2>
          </div>
          <p className="text-2xl font-semibold text-ink">
            Execution insights. No pitch spam.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md items-center gap-2"
        >
          <input
            type="email"
            className="h-12 w-full rounded-full border border-border bg-surface-dim px-5 text-sm text-ink outline-none transition-colors placeholder:text-muted-ink focus:border-signal"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-signal px-6 text-sm font-semibold text-signal-text transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      </div>

      {message && (
        <div className="mt-6 flex items-center gap-2 rounded-full border border-ok/40 bg-ok/10 px-5 py-2 text-sm text-ok">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </div>
      )}
      {error && (
        <div className="mt-6 rounded-full border border-danger/40 bg-danger/10 px-5 py-2 text-sm text-danger">
          {error}
        </div>
      )}
    </section>
  )
}

export default Newsletter
