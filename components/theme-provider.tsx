"use client"

import * as React from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Sempre aplicar tema escuro
    document.documentElement.classList.add("dark")
  }, [])

  return <>{children}</>
}