"use client"

import { ListTodo, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { TaskStats } from "@/components/task-stats"
import { useTasks } from "@/hooks/use-tasks"

export default function Home() {
  const {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    clearCompletedTasks,
    clearAllTasks,
    stats,
  } = useTasks()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ListTodo className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Carregando tarefas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ListTodo className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Organizador de Tarefas</h1>
                <p className="text-sm text-muted-foreground">
                  Gerencie suas tarefas de forma simples e eficiente
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <a
                  href="https://github.com/DanielDiasK"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver perfil no GitHub"
                  title="Ver perfil no GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Estatísticas */}
        <TaskStats stats={stats} />

        {/* Lista de tarefas */}
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTaskStatus}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
          onAddTask={addTask}
          onClearCompleted={clearCompletedTasks}
          onClearAll={clearAllTasks}
          stats={stats}
        />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-sm text-muted-foreground">
                <p className="flex items-center gap-2 justify-center">
                  Criado por{" "}
                  <span className="font-semibold text-foreground">Daniel Dias</span>
                  <span className="text-muted-foreground/60">-</span>
                  <a
                    href="https://github.com/DanielDiasK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors group"
                  >
                    <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    DanielDiasK
                  </a>
                </p>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground/80">
              <p>
                Desenvolvido com ❤️ usando{" "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-foreground transition-colors"
                >
                  Next.js
                </a>{" "}
                e{" "}
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-foreground transition-colors"
                >
                  shadcn/ui
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
