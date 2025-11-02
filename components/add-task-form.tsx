"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Task, type TaskPriority } from "@/hooks/use-tasks"

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<TaskPriority>("media")
  const [dueDate, setDueDate] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status: "pendente",
      dueDate: dueDate ? new Date(dueDate) : undefined,
    })

    setTitle("")
    setDescription("")
    setPriority("media")
    setDueDate("")
    setIsExpanded(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Nova Tarefa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Título da tarefa..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>
          
          {isExpanded && (
            <>
              <div>
                <textarea
                  placeholder="Descrição (opcional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Prioridade</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="baixa">🟢 Baixa</option>
                    <option value="media">🟡 Média</option>
                    <option value="alta">🔴 Alta</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Data limite (opcional)</label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Adicionar Tarefa
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Menos" : "Mais opções"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}