"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener("change", listener)
    
    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isWideScreen: boolean
  breakpoint: Breakpoint
  windowWidth: number
  windowHeight: number
}

export function useResponsive(): ResponsiveState {
  const isXs = useMediaQuery("(max-width: 639px)")
  const isSm = useMediaQuery("(min-width: 640px) and (max-width: 767px)")
  const isMd = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const isLg = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)")
  const isXl = useMediaQuery("(min-width: 1280px) and (max-width: 1535px)")
  const is2xl = useMediaQuery("(min-width: 1536px)")

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  let breakpoint: Breakpoint = "xs"
  if (is2xl) breakpoint = "2xl"
  else if (isXl) breakpoint = "xl"
  else if (isLg) breakpoint = "lg"
  else if (isMd) breakpoint = "md"
  else if (isSm) breakpoint = "sm"
  else breakpoint = "xs"

  return {
    isMobile: isXs || isSm,
    isTablet: isMd,
    isDesktop: isLg || isXl || is2xl,
    isWideScreen: is2xl,
    breakpoint,
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
  }
}
