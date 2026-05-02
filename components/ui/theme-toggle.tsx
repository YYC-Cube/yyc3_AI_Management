"use client"

import { useTheme } from "@/theme-provider"
import { Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse" />
    )
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setIsAnimating(true)
    setTheme(newTheme)
    
    setTimeout(() => setIsAnimating(false), 500)
  }

  const themes = [
    {
      id: "light",
      icon: Sun,
      label: "浅色模式",
      active: theme === "light",
    },
    {
      id: "dark",
      icon: Moon,
      label: "深色模式",
      active: theme === "dark",
    },
    {
      id: "system",
      icon: Monitor,
      label: "跟随系统",
      active: theme === "system",
    },
  ]

  return (
    <div className="flex items-center space-x-1 p-1 bg-slate-100/80 rounded-xl backdrop-blur-sm">
      {themes.map(({ id, icon: Icon, label, active }) => (
        <button
          key={id}
          onClick={() => handleThemeChange(id as "light" | "dark" | "system")}
          className={cn(
            "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 group",
            active
              ? "bg-white text-slate-900 shadow-md scale-110"
              : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
          )}
          title={label}
        >
          <Icon 
            className={cn(
              "w-4 h-4 transition-all duration-300",
              isAnimating && active && "animate-spin"
            )} 
          />
          
          {active && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </button>
      ))}
      
      <div className="ml-2 px-2 py-1 text-xs font-medium text-slate-500 bg-white/50 rounded-md">
        {resolvedTheme === "light" ? "☀️" : "🌙"}
      </div>
    </div>
  )
}
