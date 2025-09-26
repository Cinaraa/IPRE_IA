"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"

interface Storyboard {
  id: string
  title: string
  status: string
  createdAt: Date
}

export function StoryboardsDashboard() {
  const router = useRouter()
  const [storyboards, setStoryboards] = useState<Storyboard[]>([
    {
      id: "1",
      title: "Storyboard 1",
      status: "Story editor",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Storyboard 2",
      status: "Storyboard editor",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Storyboard 3",
      status: "Storyboard editor",
      createdAt: new Date(),
    },
  ])

  const handleEdit = (storyboard: Storyboard) => {
    if (storyboard.status === "Story editor") {
      router.push("/editor")
    } else {
      router.push("/storyboard")
    }
  }

  const handleDelete = (id: string) => {
    setStoryboards(storyboards.filter((sb) => sb.id !== id))
  }

  const handleCreateNew = () => {
    router.push("/crear")
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-orange-600" onClick={handleBackToHome}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-orange-900">Storyboarder IA</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/mis-storyboards")}
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              Mis Storyboards
            </Button>
            <Button onClick={handleCreateNew} className="bg-orange-500 hover:bg-orange-600 text-white">
              Crear Storyboard
            </Button>
            <Button variant="ghost" size="sm" className="text-orange-600">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-900 mb-4">Mis Storyboards</h2>
        </div>

        {/* Storyboards Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-orange-100 px-6 py-4 border-b border-orange-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="font-semibold text-orange-900">Título</div>
              <div className="font-semibold text-orange-900">Estado</div>
              <div className="font-semibold text-orange-900 text-right">Acciones</div>
            </div>
          </div>

          {/* Storyboard Rows */}
          <div className="divide-y divide-orange-100">
            {storyboards.map((storyboard) => (
              <div key={storyboard.id} className="px-6 py-4 hover:bg-orange-50 transition-colors">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="font-medium text-gray-900">{storyboard.title}</div>
                  <div className="text-gray-600">{storyboard.status}</div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(storyboard.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEdit(storyboard)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* New Storyboard Row */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-gray-500 italic">Nuevo Storyboard</div>
                <div></div>
                <div className="flex justify-end">
                  <Button onClick={handleCreateNew} className="bg-orange-500 hover:bg-orange-600 text-white">
                    Crear Storyboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
