"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, ChevronUp, ChevronDown, Trash2, Edit3, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface StoryPoint {
  id: string
  title: string
  description: string
}

export function StoryEditor() {
  const router = useRouter()
  const [storyPoints, setStoryPoints] = useState<StoryPoint[]>([
    {
      id: "1",
      title: "Escena de apertura",
      description:
        "El héroe despierta en su aldea natal, sin saber que su destino está a punto de cambiar para siempre.",
    },
    {
      id: "2",
      title: "El llamado a la aventura",
      description:
        "Un misterioso mensajero llega con noticias urgentes sobre una antigua amenaza que se cierne sobre el reino.",
    },
    {
      id: "3",
      title: "Preparación para el viaje",
      description:
        "El héroe reúne sus pertenencias y se despide de sus seres queridos antes de emprender la peligrosa misión.",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    setEditingId(editingId === id ? null : id)
  }

  const handleDelete = (id: string) => {
    setStoryPoints(storyPoints.filter((point) => point.id !== id))
  }

  const handleSave = (id: string, title: string, description: string) => {
    setStoryPoints(storyPoints.map((point) => (point.id === id ? { ...point, title, description } : point)))
    setEditingId(null)
  }

  const moveStoryPoint = (fromIndex: number, toIndex: number) => {
    const newStoryPoints = [...storyPoints]
    const [movedItem] = newStoryPoints.splice(fromIndex, 1)
    newStoryPoints.splice(toIndex, 0, movedItem)
    setStoryPoints(newStoryPoints)
  }

  const addStoryPoint = (afterIndex: number) => {
    const newId = Date.now().toString()
    const newStoryPoint: StoryPoint = {
      id: newId,
      title: "",
      description: "",
    }
    const newStoryPoints = [...storyPoints]
    newStoryPoints.splice(afterIndex + 1, 0, newStoryPoint)
    setStoryPoints(newStoryPoints)
    setEditingId(newId) // Automatically start editing the new storypoint
  }

  const handleGenerateImages = () => {
    router.push("/storyboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Storyboarder IA - Editor de Historia</h1>
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
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {storyPoints.map((point, index) => (
            <div key={point.id}>
              <StoryPointCard
                point={point}
                index={index}
                isEditing={editingId === point.id}
                onEdit={() => handleEdit(point.id)}
                onDelete={() => handleDelete(point.id)}
                onSave={(title, description) => handleSave(point.id, title, description)}
                onMove={moveStoryPoint}
                canMoveUp={index > 0}
                canMoveDown={index < storyPoints.length - 1}
              />

              <div className="flex justify-center py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addStoryPoint(index)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Guardar borrador
          </Button>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            onClick={handleGenerateImages}
          >
            Generar Imágenes
          </Button>
        </div>
      </main>
    </div>
  )
}

interface StoryPointCardProps {
  point: StoryPoint
  index: number
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
  onSave: (title: string, description: string) => void
  onMove: (fromIndex: number, toIndex: number) => void
  canMoveUp: boolean
  canMoveDown: boolean
}

function StoryPointCard({
  point,
  index,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onMove,
  canMoveUp,
  canMoveDown,
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
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => onMove(index, index - 1)}
              disabled={!canMoveUp}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => onMove(index, index + 1)}
              disabled={!canMoveDown}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-4">
            {isEditing ? (
              <div className="space-y-4">
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
                  <Label htmlFor={`desc-${point.id}`} className="text-sm font-medium text-foreground">
                    Descripción
                  </Label>
                  <Textarea
                    id={`desc-${point.id}`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 min-h-20 bg-input border-border text-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    Guardar
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Título</Label>
                  <p className="text-foreground font-medium">{point.title || "Sin título"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Descripción</Label>
                  <p className="text-foreground text-sm leading-relaxed">{point.description || "Sin descripción"}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Borrar
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit} className="text-foreground bg-transparent">
              <Edit3 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
