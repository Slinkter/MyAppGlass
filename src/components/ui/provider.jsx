"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"

export function Provider({ value, children }) {
  return (
    <ChakraProvider value={value || defaultSystem}>
      <ColorModeProvider defaultTheme="dark" enableSystem={false}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
