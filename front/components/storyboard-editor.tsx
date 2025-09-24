"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Plus, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"


interface StoryPoint {
  id: string
  title: string
  description: string
  imageGenerated: boolean
}

export function StoryboardEditor() {
  const [storyPoints, setStoryPoints] = useState<StoryPoint[]>([
    {
      id: "1",
      title: "Escena de apertura",
      description:
        "El héroe despierta en su aldea natal, sin saber que su destino está a punto de cambiar para siempre.",
      imageGenerated: true,
    },
    {
      id: "2",
      title: "El llamado a la aventura",
      description:
        "Un misterioso mensajero llega con noticias urgentes sobre una antigua amenaza que se cierne sobre el reino.",
      imageGenerated: false,
    },
    {
      id: "3",
      title: "Preparación para el viaje",
      description:
        "El héroe reúne sus pertenencias y se despide de sus seres queridos antes de emprender la peligrosa misión.",
      imageGenerated: false,
    },
    {
      id: "4",
      title: "El encuentro",
      description: "En el bosque oscuro, el héroe se encuentra con su primer desafío.",
      imageGenerated: false,
    },
    {
      id: "5",
      title: "La revelación",
      description: "Una verdad oculta sale a la luz que cambia todo.",
      imageGenerated: false,
    },
    {
      id: "6",
      title: "El clímax final",
      description: "La batalla decisiva que determinará el destino del reino.",
      imageGenerated: false,
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const router = useRouter()

  const handleEdit = (id: string) => {
    router.push(`/storypoint/${id}`)
  }

  const handleDelete = (id: string) => {
    setStoryPoints(storyPoints.filter((point) => point.id !== id))
  }

  const handleSave = (id: string, title: string, description: string) => {
    setStoryPoints(storyPoints.map((point) => (point.id === id ? { ...point, title, description } : point)))
    setEditingId(null)
  }

  const generateImage = (id: string) => {
    setStoryPoints(storyPoints.map((point) => (point.id === id ? { ...point, imageGenerated: true } : point)))
  }

  const addStoryPoint = () => {
    const newId = Date.now().toString()
    const newStoryPoint: StoryPoint = {
      id: newId,
      title: "",
      description: "",
      imageGenerated: false,
    }
    setStoryPoints([...storyPoints, newStoryPoint])
    setEditingId(newId)
  }

  const moveStoryPoint = (id: string, direction: "left" | "right") => {
    const currentIndex = storyPoints.findIndex((point) => point.id === id)
    if (
      (direction === "left" && currentIndex === 0) ||
      (direction === "right" && currentIndex === storyPoints.length - 1)
    ) {
      return
    }

    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1
    const newStoryPoints = [...storyPoints]
    const [movedPoint] = newStoryPoints.splice(currentIndex, 1)
    newStoryPoints.splice(newIndex, 0, movedPoint)
    setStoryPoints(newStoryPoints)
  }

  const addStoryPointAt = (index: number) => {
    const newId = Date.now().toString()
    const newStoryPoint: StoryPoint = {
      id: newId,
      title: "",
      description: "",
      imageGenerated: false,
    }
    const newStoryPoints = [...storyPoints]
    newStoryPoints.splice(index, 0, newStoryPoint)
    setStoryPoints(newStoryPoints)
    setEditingId(newId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Storyboarder IA - Editor de imágenes</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyPoints.map((point, index) => (
            <div key={point.id} className="relative flex items-center gap-4">
              <div className="flex flex-col justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addStoryPointAt(index)}
                  className="h-8 w-8 p-0 rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <StoryPointCard
                  point={point}
                  index={index}
                  totalCount={storyPoints.length}
                  isEditing={editingId === point.id}
                  isHovered={hoveredId === point.id}
                  onEdit={() => handleEdit(point.id)}
                  onDelete={() => handleDelete(point.id)}
                  onSave={(title, description) => handleSave(point.id, title, description)}
                  onGenerateImage={() => generateImage(point.id)}
                  onHover={() => setHoveredId(point.id)}
                  onLeave={() => setHoveredId(null)}
                  onMove={(direction) => moveStoryPoint(point.id, direction)}
                />
              </div>

              {index === storyPoints.length - 1 && (
                <div className="flex flex-col justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addStoryPointAt(index + 1)}
                    className="h-8 w-8 p-0 rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Guardar borrador
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            Exportar Storyboard
          </Button>
        </div>
      </main>
    </div>
  )
}

interface StoryPointCardProps {
  point: StoryPoint
  index: number
  totalCount: number
  isEditing: boolean
  isHovered: boolean
  onEdit: () => void
  onDelete: () => void
  onSave: (title: string, description: string) => void
  onGenerateImage: () => void
  onHover: () => void
  onLeave: () => void
  onMove: (direction: "left" | "right") => void
}

function StoryPointCard({
  point,
  index,
  totalCount,
  isEditing,
  isHovered,
  onEdit,
  onDelete,
  onSave,
  onGenerateImage,
  onHover,
  onLeave,
  onMove,
}: StoryPointCardProps) {
  const [title, setTitle] = useState(point.title)
  const [description, setDescription] = useState(point.description)

  const handleSave = () => {
    onSave(title, description)
  }

  const handleCancel = () => {
    setTitle(point.title)
    setDescription(point.description)
    onEdit()
  }

  return (
    <Card
      className="bg-card border-border shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <CardContent className="p-0">
        {/* Image Area */}
        <div className="relative aspect-video bg-muted border-b border-border flex items-center justify-center">
          {point.imageGenerated ? (
            <div className="text-center text-muted-foreground">
              <ImageIcon className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Imagen generada</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              {isHovered ? (
                <p className="text-sm px-4">{`Descripción de ${point.title || "storypoint"}`}</p>
              ) : (
                <p className="text-sm">Descripción</p>
              )}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 space-y-3">
          {/* Title */}
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <Label htmlFor={`title-${point.id}`} className="text-sm font-medium text-foreground">
                  Título
                </Label>
                <Input
                  id={`title-${point.id}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 bg-input border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor={`description-${point.id}`} className="text-sm font-medium text-foreground">
                  Descripción
                </Label>
                <Textarea
                  id={`description-${point.id}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 bg-input border-border text-foreground resize-none"
                  rows={3}
                />
              </div>
            </div>
          ) : (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Título</Label>
              <p className="text-foreground font-medium text-sm">{point.title || "Sin título"}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm" className="flex-1">
                  Guardar
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1 bg-transparent">
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDelete}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                >
                  Borrar
                </Button>
                {point.imageGenerated ? (
                  <Button variant="outline" size="sm" onClick={onEdit} className="text-foreground bg-transparent">
                    Editar
                  </Button>
                ) : (
                  <Button size="sm" onClick={onGenerateImage} className="bg-orange-500 hover:bg-orange-600 text-white">
                    Generar imagen
                  </Button>
                )}
              </>
            )}
          </div>

          {!isEditing && (
            <div className="flex justify-center gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove("left")}
                disabled={index === 0}
                className="h-8 w-8 p-0 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove("right")}
                disabled={index === totalCount - 1}
                className="h-8 w-8 p-0 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
