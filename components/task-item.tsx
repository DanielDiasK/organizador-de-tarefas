"use client"

import { useState } from "react"
import { Trash2, Edit3, Calendar, Clock, Flag, AlertCircle, CheckCircle2, Circle, CalendarDays, Timer, ArrowUp, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { type Task } from "@/hooks/use-tasks"
import { cn } from "@/lib/utils"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
  onEdit: (task: Task) => void
}

export function TaskItem({ task, onToggle, onDelete, onUpdate, onEdit }: TaskItemProps) {

  const getPriorityData = (priority: Task["priority"]) => {
    switch (priority) {
      case "alta":
        return {
          border: "border-l-red-500",
          bg: "bg-red-950/20",
          badge: "bg-red-950/50 text-red-300 border-red-800/50",
          icon: AlertCircle,
          label: "Alta"
        }
      case "media":
        return {
          border: "border-l-yellow-500",
          bg: "bg-yellow-950/20", 
          badge: "bg-yellow-950/50 text-yellow-300 border-yellow-800/50",
          icon: Flag,
          label: "Média"
        }
      case "baixa":
        return {
          border: "border-l-green-500",
          bg: "bg-green-950/20",
          badge: "bg-green-950/50 text-green-300 border-green-800/50",
          icon: Circle,
          label: "Baixa"
        }
    }
  }

  const isOverdue = task.dueDate && new Date() > task.dueDate && task.status === "pendente"
  const isDueSoon = task.dueDate && task.status === "pendente" && 
    new Date(task.dueDate.getTime() - 24 * 60 * 60 * 1000) <= new Date()

  const priorityData = getPriorityData(task.priority)
  const PriorityIcon = priorityData.icon

  return (
    <Card className={cn(
      "border-l-4 transition-all duration-200 group hover:shadow-lg hover:shadow-primary/5 overflow-hidden",
      priorityData.border,
      priorityData.bg,
      task.status === "concluida" && "opacity-70",
      isOverdue && "ring-2 ring-red-500/50"
    )}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4 min-w-0">
          {/* Checkbox customizado */}
          <div className="flex items-start justify-center pt-1 flex-shrink-0">
            <button
              onClick={() => onToggle(task.id)}
              className={cn(
                "flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 hover:scale-110",
                task.status === "concluida" 
                  ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/25"
                  : "border-muted-foreground hover:border-green-500 hover:bg-green-500/10"
              )}
              title={task.status === "concluida" ? "Marcar como pendente" : "Marcar como concluída"}
            >
              {task.status === "concluida" && <CheckCircle2 className="h-3 w-3" />}
            </button>
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header da tarefa */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className={cn(
                  "font-semibold text-lg leading-tight mb-2 break-words",
                  task.status === "concluida" && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={cn(
                    "text-sm text-muted-foreground leading-relaxed break-words",
                    task.status === "concluida" && "line-through"
                  )}>
                    {task.description}
                  </p>
                )}
              </div>
              
              {/* Ações */}
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(task)}
                  className="h-7 w-7 hover:bg-blue-950/30 hover:text-blue-400 rounded-md"
                  title="Editar tarefa"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(task.id)}
                  className="h-7 w-7 hover:bg-red-950/30 hover:text-red-400 rounded-md"
                  title="Excluir tarefa"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            {/* Badges e informações */}
            <div className="space-y-3 pt-3 border-t border-border/30">
              {/* Primeira linha - Badges principais */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Badge de prioridade */}
                <div className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-0 shadow-sm",
                  priorityData.badge
                )}>
                  <PriorityIcon className="h-3 w-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{priorityData.label}</span>
                </div>
                
                {/* Badge de status */}
                <div className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-0 shadow-sm",
                  task.status === "concluida" 
                    ? "bg-green-950/50 text-green-300"
                    : "bg-blue-950/50 text-blue-300"
                )}>
                  {task.status === "concluida" ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">Concluída</span>
                    </>
                  ) : (
                    <>
                      <Timer className="h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">Pendente</span>
                    </>
                  )}
                </div>
                
                {/* Badge de data limite */}
                {task.dueDate && (
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-0 shadow-sm",
                    isOverdue 
                      ? "bg-red-950/50 text-red-300"
                      : isDueSoon
                      ? "bg-amber-950/50 text-amber-300"
                      : "bg-slate-950/50 text-slate-300"
                  )}>
                    <CalendarDays className="h-3 w-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {isOverdue ? "Atrasada" : isDueSoon ? "Urgente" : task.dueDate.toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                )}
                
                {/* Badge de data de criação */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-0 shadow-sm bg-gradient-to-r from-purple-950/50 to-indigo-950/50 text-purple-300 ring-1 ring-purple-800/30">
                  <Clock className="h-3 w-3 flex-shrink-0 text-purple-400" />
                  <span className="whitespace-nowrap">
                    Criada em {task.createdAt.toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}