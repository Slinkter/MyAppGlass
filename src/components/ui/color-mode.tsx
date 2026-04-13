"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (_mode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const mode = (forcedTheme || resolvedTheme) as ColorMode
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: mode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode: mode } = useColorMode()
  return mode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode: mode } = useColorMode()
  return mode === "dark" ? <LuMoon /> : <LuSun />
}
