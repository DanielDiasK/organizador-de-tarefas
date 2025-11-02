"use client"

import { useState, useEffect } from "react"

export type TaskPriority = "baixa" | "media" | "alta"
export type TaskStatus = "pendente" | "concluida"

export interface Task {
  id: string
  title: string
  description?: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
}

const STORAGE_KEY = "org-tar-tasks"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar tarefas do localStorage na inicialização
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY)
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }))
        setTasks(parsedTasks)
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Salvar tarefas no localStorage sempre que mudarem
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks(prev => [...prev, newTask])
    return newTask
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pendente" ? "concluida" : "pendente",
              updatedAt: new Date(),
            }
          : task
      )
    )
  }

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(task => task.status !== "concluida"))
  }

  const clearAllTasks = () => {
    setTasks([])
  }

  // Estatísticas
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === "concluida").length,
    pending: tasks.filter(task => task.status === "pendente").length,
    highPriority: tasks.filter(task => task.priority === "alta" && task.status === "pendente").length,
  }

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    clearCompletedTasks,
    clearAllTasks,
    stats,
  }
}