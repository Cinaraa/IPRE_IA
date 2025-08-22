import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Play, Edit, Share, Twitter, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <Play className="w-3 h-3 text-black fill-black" />
            </div>
            <Link href="/" className="font-semibold hover:text-gray-300 transition-colors">
              ShortFilm Studio
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-white font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Create
            </Link>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Library
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Community
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search"
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 w-64"
            />
          </div>
          <Bell className="w-5 h-5 text-gray-300" />
          <Link href="/">
            <Avatar className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src="/user-profile-illustration.png" alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-r from-teal-800 to-teal-600 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <img
              src="/placeholder-0g1u2.png"
              alt="Film equipment"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
            <div className="relative z-10 px-8 py-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl">
                Create Your Next Short Film Masterpiece
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                Transform your ideas into captivating short films with our intuitive platform. From script to screen, we
                provide the tools and resources you need to succeed.
              </p>
              <Link href="/dashboard">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Short Films */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Popular Short Films</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img
                  src="/love-in-the-city-couple.png"
                  alt="Love in the City"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h3 className="font-semibold text-white mb-1">Love in the City</h3>
              <p className="text-sm text-gray-400">A chance encounter leads to an unexpected romance.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img
                  src="/placeholder-mzrra.png"
                  alt="The Boardroom Betrayal"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h3 className="font-semibold text-white mb-1">The Boardroom Betrayal</h3>
              <p className="text-sm text-gray-400">
                Power struggles and secrets unravel in a high-stakes corporate world.
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img
                  src="/mysterious-silhouette.png"
                  alt="Shadows of Doubt"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h3 className="font-semibold text-white mb-1">Shadows of Doubt</h3>
              <p className="text-sm text-gray-400">A detective races against time to solve a complex case.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img
                  src="/elegant-period-drama.png"
                  alt="Echoes of the Past"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h3 className="font-semibold text-white mb-1">Echoes of the Past</h3>
              <p className="text-sm text-gray-400">A journey through time reveals hidden family forgotten legacies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Start Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <Edit className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Write Your Script</h3>
              <p className="text-gray-400">Use our script editor to craft your story or upload an existing script.</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Shoot Your Film</h3>
              <p className="text-gray-400">Utilize our shooting guides and tips to capture high-quality footage.</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <Share className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Publish & Share</h3>
              <p className="text-gray-400">Share your short film with the world and connect with your audience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-3">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400">© 2024 ShortFilm Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
