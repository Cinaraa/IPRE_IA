"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, ImageIcon, Upload } from "lucide-react"

export default function StorypointEditor() {
  const router = useRouter()
  const [title, setTitle] = useState("Escena de apertura")
  const [description, setDescription] = useState(
    "El héroe despierta en su aldea natal, sin saber que su destino está a punto de cambiar para siempre.",
  )
  const [style, setStyle] = useState("Estilo cinematográfico épico")
  const [hasImage, setHasImage] = useState(true)

  const handleBack = () => {
    router.back()
  }

  const handleGenerateImage = () => {
    setHasImage(true)
  }

  const handleUseMyImage = () => {
    // Handle custom image upload
  }

  const handleDeleteStorypoint = () => {
    router.push("/storyboard")
  }

  const handleSaveStorypoint = () => {
    // Handle saving storypoint changes
    console.log("Saving storypoint:", { title, description, style })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Storyboarder IA - Editor de Storypoint</h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">Mis Storyboards</span>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-base font-medium text-foreground mb-2 block">
                Título Storypoint
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-input border-border text-foreground"
                placeholder="Título del storypoint"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-medium text-foreground mb-2 block">
                Descripción del storypoint
              </Label>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] bg-input border-border text-foreground resize-none"
                    placeholder="Describe detalladamente esta escena..."
                  />
                </CardContent>
              </Card>
            </div>

            {/* Style */}
            <div>
              <Label htmlFor="style" className="text-base font-medium text-foreground mb-2 block">
                Estilo
              </Label>
              <Input
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="bg-input border-border text-foreground"
                placeholder="Estilo visual deseado"
              />
            </div>

            {/* Reference Image */}
            <div>
              <Label className="text-base font-medium text-foreground mb-2 block">Imagen de referencia</Label>
              <Button variant="outline" className="w-full bg-transparent border-border">
                <Upload className="h-4 w-4 mr-2" />
                Subir
              </Button>
            </div>
          </div>

          {/* Right Panel - Image */}
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-foreground mb-2 block">Imagen Generada</Label>
              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {hasImage ? (
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-lg">Imagen Generada</p>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p className="text-lg">Sin imagen generada</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={handleDeleteStorypoint}
                className="flex-1 min-w-[140px] text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent border-border"
              >
                Eliminar Storypoint
              </Button>
              <Button
                variant="outline"
                onClick={handleUseMyImage}
                className="flex-1 min-w-[140px] bg-transparent border-border"
              >
                Usar Mi imagen
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveStorypoint}
                className="flex-1 min-w-[140px] bg-transparent border-border"
              >
                Guardar Storypoint
              </Button>
              <Button
                onClick={handleGenerateImage}
                className="flex-1 min-w-[140px] bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Generar Imagen
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
