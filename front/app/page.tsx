"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Coins } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate login process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any email/password combination
      console.log("[v0] Login attempt:", { email, password })

      // Navigate to home page on successful login
      router.push("/home")
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <ChevronDown className="w-4 h-4" />
            <span className="font-semibold">ShortFilm</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/series" className="text-gray-300 hover:text-white transition-colors">
              Series
            </Link>
            <Link href="/movies" className="text-gray-300 hover:text-white transition-colors">
              Movies
            </Link>
            <Link href="/new" className="text-gray-300 hover:text-white transition-colors">
              New
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-orange-400">
            <Coins className="w-4 h-4" />
            <span className="text-sm font-medium">Get Coins</span>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/user-profile-illustration.png" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-8">Welcome to ShortFilm</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0"
                disabled={isLoading}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0"
                disabled={isLoading}
              />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <div className="text-right">
              <Link href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">Or log in with</p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                disabled={isLoading}
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                disabled={isLoading}
              >
                Google
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
