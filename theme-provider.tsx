"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = "yyc3-theme"
const DEFAULT_THEME: Theme = "light"

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(STORAGE_KEY) as Theme | null
  } catch {
    return null
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // 静默失败
  }
}

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback(
    (newTheme: ResolvedTheme) => {
      if (typeof document === "undefined") return

      const root = document.documentElement

      if (disableTransitionOnChange) {
        root.style.setProperty("transition", "none")
        root.offsetHeight
      }

      root.setAttribute(attribute, newTheme)

      if (disableTransitionOnChange) {
        requestAnimationFrame(() => {
          root.style.removeProperty("transition")
        })
      }
    },
    [attribute, disableTransitionOnChange]
  )

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)
      storeTheme(newTheme)

      let resolved: ResolvedTheme
      if (newTheme === "system") {
        resolved = getSystemTheme()
      } else {
        resolved = newTheme
      }

      setResolvedTheme(resolved)
      applyTheme(resolved)
    },
    [applyTheme]
  )

  useEffect(() => {
    setMounted(true)

    const stored = getStoredTheme()
    const initial = stored || defaultTheme

    let resolved: ResolvedTheme
    if (initial === "system" && enableSystem) {
      resolved = getSystemTheme()
    } else if (initial === "system") {
      resolved = "light"
    } else {
      resolved = initial as ResolvedTheme
    }

    setThemeState(initial)
    setResolvedTheme(resolved)
    applyTheme(resolved)
  }, [])

  useEffect(() => {
    if (!enableSystem || theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved: ResolvedTheme = e.matches ? "dark" : "light"
      setResolvedTheme(newResolved)
      applyTheme(newResolved)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, enableSystem, applyTheme])

  const value = {
    theme,
    resolvedTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export { type Theme, type ResolvedTheme }
