"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HealthCheck } from '@/components/health-check'




export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div>
          {/* Add this anywhere to test */}
          <HealthCheck />
          
          {/* ...existing code... */}
        </div>
      
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Storyboarder IA</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/crear")}
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              Crear Storyboard
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/mis-storyboards")}
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              Mis Storyboards
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Crea historias visuales increíbles</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforma tus ideas en storyboards profesionales con la ayuda de inteligencia artificial
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/mis-storyboards")}
              className="h-32 text-xl border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <div>Mis Storyboards</div>
              </div>
            </Button>

            <Button
              size="lg"
              onClick={() => router.push("/crear")}
              className="h-32 text-xl bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">✨</div>
                <div>Crear un Storyboard</div>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
