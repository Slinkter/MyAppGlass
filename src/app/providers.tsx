"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/shared/providers/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Global, css } from "@emotion/react";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider defaultTheme="light" enableSystem={false}>
      <ChakraProvider value={system}>
        <Global styles={css`
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes scaleIn {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `} />
        {children}
      </ChakraProvider>
    </ColorModeProvider>
  );
}
