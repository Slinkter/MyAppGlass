"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { LazyMotion, domAnimation } from "framer-motion";
import * as React from "react";

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
