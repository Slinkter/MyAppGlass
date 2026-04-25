"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/shared/providers/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { LazyMotion, domAnimation } from "framer-motion";
import * as React from "react";

// Suppress the React 19 script tag warning from next-themes in development
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag while rendering React component")) {
      return;
    }
    originalError(...args);
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider defaultTheme="light" enableSystem={false}>
      <ChakraProvider value={system}>
        <LazyMotion features={domAnimation}>
          {children}
        </LazyMotion>
      </ChakraProvider>
    </ColorModeProvider>
  );
}
