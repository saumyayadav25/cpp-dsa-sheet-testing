"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const themes = ["light", "dark"]

  function toggleTheme() {
    const current = theme === "system" ? systemTheme : theme
    const currentThemeIdx = themes.indexOf(current ?? "light")
    const nextIndex = (currentThemeIdx + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const effectiveTheme = theme === "system" ? systemTheme : theme

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {effectiveTheme === "light" && <Sun className="h-[1.2rem] w-[1.2rem] text-black" />}
      {effectiveTheme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem] text-white" />}
    </Button>
  )
}
