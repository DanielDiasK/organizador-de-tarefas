"use client"

import { useState } from "react"
import { Filter, CheckCircle2, Circle, AlertCircle, Trash2, RotateCcw, Search, SortAsc, SortDesc, Target, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskItem } from "./task-item"
import { AddTaskModal } from "./add-task-modal"
import { type Task, type TaskStatus, type TaskPriority } from "@/hooks/use-tasks"

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  onClearCompleted: () => void
  onClearAll: () => void
  stats: {
    total: number
    completed: number
    pending: number
    highPriority: number
  }
}

type FilterType = "todas" | "pendentes" | "concluidas"
type SortType = "data" | "prioridade" | "titulo"

export function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTask, onAddTask, onClearCompleted, onClearAll, stats }: TaskListProps) {
  const [filter, setFilter] = useState<FilterType>("todas")
  const [sort, setSort] = useState<SortType>("data")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    
    const matchesFilter = filter === "todas" || 
                         (filter === "pendentes" && task.status === "pendente") ||
                         (filter === "concluidas" && task.status === "concluida")
    
    return matchesSearch && matchesFilter
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0
    
    switch (sort) {
      case "prioridade":
        const priorityOrder = { alta: 3, media: 2, baixa: 1 }
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
      case "titulo":
        comparison = a.title.localeCompare(b.title, "pt-BR")
        break
      case "data":
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
    }
    
    return sortDirection === "desc" ? -comparison : comparison
  })

  const toggleSort = (newSort: SortType) => {
    if (sort === newSort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSort(newSort)
      setSortDirection("desc")
    }
  }

  const getFilterIcon = (filterType: FilterType) => {
    switch (filterType) {
      case "pendentes":
        return <Circle className="h-4 w-4" />
      case "concluidas":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <Filter className="h-4 w-4" />
    }
  }

  if (tasks.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <Target className="relative h-16 w-16 mx-auto text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Nenhuma tarefa ainda</h3>
              <p className="text-muted-foreground max-w-md">
                Comece criando sua primeira tarefa e organize seu dia de forma eficiente!
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Tarefa
            </Button>
          </div>
        </CardContent>
        
        {/* Modal de adicionar tarefa */}
        <AddTaskModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onAddTask={onAddTask}
        />
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-background to-secondary/20 border-b">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Filter className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="text-xl">Minhas Tarefas</span>
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({sortedTasks.length} de {tasks.length})
              </span>
            </div>
          </CardTitle>
          
          {/* Ações rápidas */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4" />
              Adicionar Tarefa
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearCompleted}
              disabled={stats.completed === 0}
              className="flex items-center gap-2 hover:bg-green-950/20 hover:border-green-800"
            >
              <CheckCircle2 className="h-4 w-4" />
              Limpar Concluídas
              {stats.completed > 0 && (
                <span className="bg-green-900 text-green-300 text-xs px-1.5 py-0.5 rounded-full">
                  {stats.completed}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir todas as tarefas? Esta ação não pode ser desfeita.")) {
                  onClearAll()
                }
              }}
              className="flex items-center gap-2 hover:bg-red-950/20 hover:border-red-800"
            >
              <Trash2 className="h-4 w-4" />
              Limpar Todas
            </Button>
          </div>
        </div>
        
        {/* Busca */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar nas suas tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
        
        {/* Filtros e ordenação */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Filtros */}
          <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-xl">
            {(["todas", "pendentes", "concluidas"] as FilterType[]).map((filterType) => {
              const isActive = filter === filterType
              const getFilterData = (type: FilterType) => {
                switch (type) {
                  case "todas":
                    return {
                      count: stats.total,
                      color: "blue",
                      gradient: "from-blue-600 to-indigo-600"
                    }
                  case "pendentes":
                    return {
                      count: stats.pending,
                      color: "amber",
                      gradient: "from-amber-600 to-orange-600"
                    }
                  case "concluidas":
                    return {
                      count: stats.completed,
                      color: "green",
                      gradient: "from-green-600 to-emerald-600"
                    }
                }
              }
              
              const data = getFilterData(filterType)
              
              return (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 transform
                    ${isActive 
                      ? `bg-gradient-to-r ${data.gradient} text-white shadow-lg scale-105 ring-2 ring-white/20` 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:scale-[1.02]'
                    }
                  `}
                >
                  {/* Indicador de ativo */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg pointer-events-none" />
                  )}
                  
                  <div className="relative flex items-center gap-2">
                    {getFilterIcon(filterType)}
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    
                    {/* Badge com contador */}
                    <span className={`
                      inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-secondary text-muted-foreground'
                      }
                    `}>
                      {data.count}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
          
          <div className="h-8 w-px bg-border/50" />
          
          {/* Ordenação */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ordenar por:
            </span>
            <div className="flex gap-1">
              {(["data", "prioridade", "titulo"] as SortType[]).map((sortType) => {
                const isActive = sort === sortType
                return (
                  <button
                    key={sortType}
                    onClick={() => toggleSort(sortType)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }
                    `}
                  >
                    {sortType === "data" && <RotateCcw className="h-3 w-3" />}
                    {sortType === "prioridade" && <AlertCircle className="h-3 w-3" />}
                    {sortType === "titulo" && <Filter className="h-3 w-3" />}
                    
                    {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
                    
                    {isActive && (
                      <div className="flex items-center ml-1">
                        {sortDirection === "desc" ? 
                          <SortDesc className="h-3 w-3 text-primary" /> : 
                          <SortAsc className="h-3 w-3 text-primary" />
                        }
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Resultado da busca */}
        {searchTerm && (
          <div className="text-sm text-muted-foreground bg-secondary/30 px-3 py-2 rounded-lg">
            <Search className="inline h-3 w-3 mr-1" />
            {filteredTasks.length} resultado(s) para "<span className="font-medium">{searchTerm}</span>"
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-2xl rounded-full"></div>
                <Filter className="relative h-12 w-12 mx-auto text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-1">
                  Nenhuma tarefa encontrada
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar os filtros ou termos de busca.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-3">
            {sortedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onUpdate={onUpdateTask}
                onEdit={(task) => setEditingTask(task)}
              />
            ))}
          </div>
        )}
      </CardContent>
      
      {/* Modal de adicionar/editar tarefa */}
      <AddTaskModal
        open={showAddModal || !!editingTask}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddModal(false)
            setEditingTask(null)
          }
        }}
        onAddTask={onAddTask}
        editTask={editingTask}
        onUpdateTask={onUpdateTask}
      />
    </Card>
  )
}