"use client"

import { BarChart3, CheckCircle2, Clock, AlertTriangle, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskStatsProps {
  stats: {
    total: number
    completed: number
    pending: number
    highPriority: number
  }
}

export function TaskStats({ stats }: TaskStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  const statItems = [
    {
      title: "Total de Tarefas",
      value: stats.total,
      icon: BarChart3,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Concluídas",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Pendentes",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
    {
      title: "Alta Prioridade",
      value: stats.highPriority,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      borderColor: "border-red-200 dark:border-red-800",
    },
  ]

  const getMotivationalMessage = () => {
    if (stats.total === 0) return null
    if (completionRate === 100) return "🎉 Parabéns! Todas as tarefas concluídas!"
    if (completionRate >= 80) return "🔥 Quase lá! Você está arrasando!"
    if (completionRate >= 50) return "💪 Bom progresso! Continue assim!"
    if (completionRate >= 25) return "🚀 Você está no caminho certo!"
    return "⭐ Todo grande progresso começa com o primeiro passo!"
  }

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <Card key={item.title} className={`relative overflow-hidden border ${item.borderColor} ${item.bgColor} transition-all hover:shadow-md hover:scale-105`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold">
                    {item.value}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
              {/* Decoração */}
              <div className={`absolute -bottom-1 -right-1 w-16 h-16 ${item.color} opacity-5 rounded-full`} />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Progresso geral - design especial */}
      {stats.total > 0 && (
        <Card className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xl">Progresso Geral</span>
                  <p className="text-sm text-muted-foreground font-normal">
                    {getMotivationalMessage()}
                  </p>
                </div>
              </CardTitle>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {completionRate}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.completed} de {stats.total} tarefas
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-4">
              {/* Barra de progresso principal */}
              <div className="relative">
                <div className="w-full bg-secondary/60 rounded-full h-4 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                    style={{ width: `${completionRate}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                    {completionRate > 15 && (
                      <div className="absolute inset-0 flex items-center justify-end pr-2">
                        <span className="text-xs font-medium text-white drop-shadow-sm">
                          {completionRate}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Pontos de progresso */}
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* Detalhes do progresso */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {stats.completed}
                  </div>
                  <div className="text-xs text-muted-foreground">Finalizadas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                    {stats.pending}
                  </div>
                  <div className="text-xs text-muted-foreground">Pendentes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {stats.highPriority}
                  </div>
                  <div className="text-xs text-muted-foreground">Urgentes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}