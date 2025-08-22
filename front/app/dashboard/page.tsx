import { Button } from "@/components/ui/button"
import { Home, Plus, FileText, Eye, Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/50 border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <Link href="/home" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
              </div>
              <span className="font-semibold text-white">FilmForge</span>
            </Link>
          </div>

          <nav className="space-y-2">
            <Link
              href="/home"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/30"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>

            <Link
              href="/create"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Create</span>
            </Link>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Drafts</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Published</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </a>
          </nav>
        </div>

        <div className="absolute bottom-6 left-10">
          <Link href="/create">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">New Project</Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

          {/* Quick Actions */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <Link href="/create">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3">New Project</Button>
              </Link>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 bg-transparent"
              >
                Import Project
              </Button>
            </div>
          </section>

          {/* Recent Projects */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">Recent Projects</h2>
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 overflow-hidden">
              <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-gray-800 bg-gray-900/50">
                <div className="text-sm font-medium text-gray-300">Project Name</div>
                <div className="text-sm font-medium text-gray-300">Status</div>
                <div className="text-sm font-medium text-gray-300">Last Modified</div>
              </div>

              <div className="divide-y divide-gray-800">
                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-800/30 transition-colors">
                  <div className="text-white font-medium">Project Alpha</div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                      Draft
                    </span>
                  </div>
                  <div className="text-gray-400">2024-01-15</div>
                </div>

                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-800/30 transition-colors">
                  <div className="text-white font-medium">Project Beta</div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-700 text-green-300">
                      Published
                    </span>
                  </div>
                  <div className="text-gray-400">2023-12-20</div>
                </div>

                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-800/30 transition-colors">
                  <div className="text-white font-medium">Project Gamma</div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                      Draft
                    </span>
                  </div>
                  <div className="text-gray-400">2023-11-05</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
