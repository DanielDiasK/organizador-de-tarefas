"use client"

import { useState, useEffect } from "react"
import { Plus, Calendar, Flag, Sparkles, Clock, AlertTriangle, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { type Task, type TaskPriority } from "@/hooks/use-tasks"

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  editTask?: Task | null
  onUpdateTask?: (id: string, updates: Partial<Task>) => void
}

export function AddTaskModal({ open, onOpenChange, onAddTask, editTask, onUpdateTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<TaskPriority>("media")
  const [dueDate, setDueDate] = useState("")

  const isEditing = !!editTask

  // Preencher campos quando estiver editando
  useEffect(() => {
    if (editTask && open) {
      setTitle(editTask.title)
      setDescription(editTask.description || "")
      setPriority(editTask.priority)
      setDueDate(editTask.dueDate ? editTask.dueDate.toISOString().split('T')[0] : "")
    } else if (!editTask && open) {
      // Reset form para nova tarefa
      setTitle("")
      setDescription("")
      setPriority("media")
      setDueDate("")
    }
  }, [editTask, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    if (isEditing && editTask && onUpdateTask) {
      // Atualizar tarefa existente
      onUpdateTask(editTask.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      })
    } else {
      // Criar nova tarefa
      onAddTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        status: "pendente",
        dueDate: dueDate ? new Date(dueDate) : undefined,
      })
    }

    // Reset form
    setTitle("")
    setDescription("")
    setPriority("media")
    setDueDate("")
    onOpenChange(false)
  }

  const priorityOptions = [
    {
      value: "baixa" as TaskPriority,
      label: "Baixa Prioridade",
      icon: "🟢",
      color: "border-green-500/50 bg-green-950/20 text-green-400",
      hoverColor: "hover:border-green-400 hover:bg-green-950/30"
    },
    {
      value: "media" as TaskPriority,
      label: "Prioridade Média",
      icon: "🟡",
      color: "border-yellow-500/50 bg-yellow-950/20 text-yellow-400",
      hoverColor: "hover:border-yellow-400 hover:bg-yellow-950/30"
    },
    {
      value: "alta" as TaskPriority,
      label: "Alta Prioridade",
      icon: "🔴",
      color: "border-red-500/50 bg-red-950/20 text-red-400",
      hoverColor: "hover:border-red-400 hover:bg-red-950/30"
    }
  ]

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getQuickDateOptions = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    return [
      { label: "Hoje", value: today.toISOString().split('T')[0], icon: <Clock className="h-4 w-4" /> },
      { label: "Amanhã", value: tomorrow.toISOString().split('T')[0], icon: <Calendar className="h-4 w-4" /> },
      { label: "Próxima Semana", value: nextWeek.toISOString().split('T')[0], icon: <AlertTriangle className="h-4 w-4" /> }
    ]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Header com gradiente - Espaçado */}
        <div className="relative overflow-hidden bg-card">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
          <DialogHeader className="relative p-8 pb-6">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                isEditing 
                  ? 'bg-gradient-to-br from-amber-600 to-orange-600' 
                  : 'bg-gradient-to-br from-blue-600 to-purple-600'
              }`}>
                {isEditing ? (
                  <Edit3 className="h-5 w-5 text-white" />
                ) : (
                  <Sparkles className="h-5 w-5 text-white" />
                )}
              </div>
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isEditing 
                  ? 'from-amber-400 to-orange-400' 
                  : 'from-blue-400 to-purple-400'
              }`}>
                {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
              </span>
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mt-3 ml-13 sm:ml-0">
              {isEditing 
                ? 'Modifique os detalhes da sua tarefa conforme necessário.'
                : 'Preencha os detalhes da sua nova tarefa e organize seu dia de forma eficiente.'
              }
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 p-8 pt-2 bg-card">
          {/* Grid responsivo para layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna esquerda */}
            <div className="space-y-6">
              {/* Título */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Título da tarefa
                  <span className="text-red-400 text-xs">*</span>
                </label>
                <Input
                  placeholder="Ex: Revisar apresentação do projeto..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-11 text-sm bg-secondary/30 border-secondary focus:border-blue-500/50 transition-all duration-200"
                  required
                />
              </div>
              
              {/* Descrição */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Descrição
                  <span className="text-xs text-muted-foreground">(opcional)</span>
                </label>
                <textarea
                  placeholder="Adicione detalhes, contexto ou instruções específicas para esta tarefa..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[120px] w-full rounded-lg border border-secondary bg-secondary/30 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200"
                  rows={4}
                />
              </div>
            </div>

            {/* Coluna direita */}
            <div className="space-y-6">
              {/* Prioridade */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  Nível de Prioridade
                </label>
                <div className="space-y-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPriority(option.value)}
                      className={`
                        relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group w-full
                        ${priority === option.value 
                          ? `${option.color} shadow-lg scale-[1.02] backdrop-blur-sm` 
                          : `bg-secondary/30 hover:bg-secondary/50 ${option.hoverColor} hover:scale-[1.01]`
                        }
                      `}
                    >
                      {/* Indicador de seleção */}
                      {priority === option.value && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                      )}
                      
                      {/* Ícone emoji grande */}
                      <div className="text-2xl flex-shrink-0 transform transition-transform group-hover:scale-110">
                        {option.icon}
                      </div>
                      
                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0 relative">
                        <div className={`font-semibold text-sm mb-1 ${
                          priority === option.value ? 'text-current' : 'text-foreground'
                        }`}>
                          {option.label}
                        </div>
                        <div className={`text-xs leading-relaxed ${
                          priority === option.value ? 'text-current/80' : 'text-muted-foreground'
                        }`}>
                          {option.value === "baixa" && "Para tarefas que podem aguardar"}
                          {option.value === "media" && "Para tarefas do dia a dia"}
                          {option.value === "alta" && "Para tarefas urgentes e importantes"}
                        </div>
                      </div>
                      
                      {/* Indicador visual de seleção */}
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                        ${priority === option.value 
                          ? 'border-current bg-current' 
                          : 'border-muted-foreground/30 group-hover:border-current/50'
                        }
                      `}>
                        {priority === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white/90" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Data limite */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Data Limite
                  <span className="text-xs text-muted-foreground">(opcional)</span>
                </label>
                
                {/* Opções rápidas - Responsivas */}
                <div className="grid grid-cols-3 gap-2">
                  {getQuickDateOptions().map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setDueDate(option.value)}
                      className={`
                        flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-200 text-sm
                        ${dueDate === option.value 
                          ? "border-blue-500 bg-blue-950/30 text-blue-400" 
                          : "border-secondary bg-secondary/20 hover:bg-secondary/30"
                        }
                      `}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
                
                {/* Input de data customizada - Oculto mas funcional */}
                <div className="relative">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={getTodayDate()}
                    className="h-11 w-full text-sm bg-secondary/30 border border-secondary rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200"
                    style={{ colorScheme: 'dark' }}
                  />
                  {dueDate && (
                    <button
                      type="button"
                      onClick={() => setDueDate("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Botões - Responsivos */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 text-sm hover:bg-secondary/50"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className={`flex-1 h-11 text-sm shadow-lg ${
                isEditing 
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
              disabled={!title.trim()}
            >
              {isEditing ? (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Tarefa
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}