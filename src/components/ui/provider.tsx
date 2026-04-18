"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import * as React from "react"

export interface ProviderProps {
  value?: any
  children: React.ReactNode
}

export function Provider({ value, children }: ProviderProps) {
  return (
    <ColorModeProvider defaultTheme="light" enableSystem={false}>
      <ChakraProvider value={value || defaultSystem}>
        {children}
      </ChakraProvider>
    </ColorModeProvider>
  )
}
