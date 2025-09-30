"use client"

import { useState, useEffect } from "react"
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ResetPasswordClientProps {
  token: string | null
}

const ResetPasswordClient = ({ token }: ResetPasswordClientProps) => {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
  })

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. No token provided.")
      setIsValidating(false)
      setIsTokenValid(false)
      return
    }
    validateToken()
  }, [token])

  useEffect(() => {
    setPasswordStrength({
      length: password.length >= 8,
      lowercase: /(?=.*[a-z])/.test(password),
      uppercase: /(?=.*[A-Z])/.test(password),
      number: /(?=.*\d)/.test(password),
    })
  }, [password])

  const validateToken = async () => {
    setIsValidating(true)
    setError("")

    try {
      const response = await fetch("/api/auth/validate-reset-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Invalid or expired reset link")
        setIsTokenValid(false)
        setIsValidating(false)
        return
      }

      if (data.valid) {
        setIsTokenValid(true)
        setEmail(data.email || "")
      } else {
        setError("Invalid reset link")
        setIsTokenValid(false)
      }
    } catch (err) {
      console.error("Token validation error:", err)
      setError("Failed to validate reset link. Please try again.")
      setIsTokenValid(false)
    } finally {
      setIsValidating(false)
    }
  }

  const validateForm = () => {
    if (!password || !confirmPassword) {
      setError("Both password fields are required")
      return false
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setError("Password must contain at least one lowercase letter")
      return false
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one uppercase letter")
      return false
    }
    if (!/(?=.*\d)/.test(password)) {
      setError("Password must contain at least one number")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    if (!validateForm()) return
    if (!token) {
      setError("Invalid reset link")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to reset password")
        setIsLoading(false)
        return
      }

      setSuccess(data.message || "Password reset successfully! Redirecting to sign in...")

      setTimeout(() => {
        router.push("/auth")
      }, 3000)
    } catch (err) {
      console.error("Reset password error:", err)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && password && confirmPassword) {
      handleSubmit()
    }
  }

  const getStrengthColor = (isValid: boolean) => {
    return isValid
      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
      : "text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800"
  }

  // === UI rendering ===
  if (isValidating) {
    return <div>Loading...</div>
  }

  if (!isTokenValid) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#17181b] p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
        <p className="text-sm text-gray-500 mb-6">Create a new password for {email}</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 border rounded-lg"
              disabled={isLoading}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 border rounded-lg"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordClient
