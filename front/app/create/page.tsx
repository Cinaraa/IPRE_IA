import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Play, Upload } from "lucide-react"
import Link from "next/link"

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
              </div>
              <span className="font-semibold text-white">FilmForge</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-white font-medium border-b-2 border-white pb-1">Create Short Film</button>
            <button className="text-gray-400 font-medium hover:text-white transition-colors">Preview</button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar */}
        <aside className="w-80 bg-gray-900/30 border-r border-gray-800 p-6 overflow-y-auto">
          {/* Images Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-2">Images</h2>
            <p className="text-sm text-gray-400 mb-4">
              Drag and drop images to reorder them. Each image represents a scene in your short film.
            </p>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400 font-medium mb-1">Drag and drop images here</p>
              <p className="text-sm text-gray-500">Or click to upload</p>
            </div>
          </section>

          {/* Prompts Section */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Prompts</h2>
            <p className="text-sm text-gray-400 mb-4">
              Add prompts for each scene to guide the narrative. Prompts should be concise and descriptive.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Scene 1 prompt</label>
                <Textarea
                  placeholder="Describe the first scene..."
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 resize-none h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Scene 2 prompt</label>
                <Textarea
                  placeholder="Describe the second scene..."
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 resize-none h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Scene 3 prompt</label>
                <Textarea
                  placeholder="Describe the third scene..."
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 resize-none h-20"
                />
              </div>
            </div>
          </section>

          {/* Publish Button */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">Publish</Button>
          </div>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="relative max-w-4xl w-full">
            <div className="relative aspect-video bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 rounded-lg overflow-hidden">
              <img src="/mountain-lake-sunset.png" alt="Preview scene" className="w-full h-full object-cover" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm">00:00</span>
                  <div className="flex-1 h-1 bg-white/30 rounded-full">
                    <div className="w-1/3 h-full bg-white rounded-full"></div>
                  </div>
                  <span className="text-white text-sm">01:30</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
