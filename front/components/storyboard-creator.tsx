"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowLeft, User } from "lucide-react"

export function StoryboardCreator() {
  const router = useRouter()
  const [story, setStory] = useState("")
  const [style, setStyle] = useState("")
  const [length, setLength] = useState("")
  const [referenceImage, setReferenceImage] = useState<File | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setReferenceImage(file)
    }
  }

  const handleGenerate = () => {
    console.log("Generating story with:", { story, style, length, referenceImage })
    router.push("/editor")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Storyboarder IA</h1>
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
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Crear Storyboard</h2>
          <p className="text-muted-foreground text-lg">Cuéntanos la historia que quieres crear:</p>
        </div>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-8 space-y-8">
            {/* Story Description */}
            <div className="space-y-3">
              <Textarea
                placeholder="Describe tu historia aquí... Por ejemplo: 'Una aventura épica sobre un joven héroe que debe salvar su reino de una antigua maldición...'"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="min-h-32 resize-none bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {/* Style */}
              <div className="space-y-2">
                <Label htmlFor="style" className="text-sm font-medium text-foreground">
                  ¿Qué estilo quieres que sea tu historia?
                </Label>
                <Input
                  id="style"
                  placeholder="Ej: Realista, Animado, Cómic..."
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Reference Image */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">¿Tienes una imagen de referencia?</Label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 h-10 px-4 py-2 bg-input border border-border rounded-md cursor-pointer hover:bg-muted transition-colors text-foreground"
                  >
                    <Upload className="h-4 w-4" />
                    {referenceImage ? referenceImage.name : "Upload"}
                  </Label>
                </div>
              </div>

              {/* Story Length */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">¿Tu historia será larga, mediana o corta?</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecciona duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corta">Corta (1-3 escenas)</SelectItem>
                    <SelectItem value="mediana">Mediana (4-8 escenas)</SelectItem>
                    <SelectItem value="larga">Larga (9+ escenas)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGenerate}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium"
                disabled={!story.trim()}
              >
                Genera mi historia
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Tu storyboard se generará en unos segundos. Podrás editarlo y personalizarlo después.
          </p>
        </div>
      </main>
    </div>
  )
}
