"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/shared/providers/theme"
import { ColorModeProvider } from "./color-mode"
import * as React from "react"

export interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <ColorModeProvider defaultTheme="light" enableSystem={false}>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </ColorModeProvider>
  )
}