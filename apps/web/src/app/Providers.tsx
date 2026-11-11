"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/shared/providers/theme";
import { ColorModeProvider } from "@/shared/ui/color-mode";
import { Toaster } from "@/shared/ui/toaster";
import * as React from "react";

import { AuthProvider } from "@/features/auth/context/AuthContext";
import { OrderDraftProvider } from "@/features/products/context/OrderDraftContext";

// Providers root (Chakra UI v3 + Aura Design System v2)
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider defaultTheme="light" enableSystem={false}>
      <ChakraProvider value={system}>
        <AuthProvider>
          <OrderDraftProvider>
            {children}
          </OrderDraftProvider>
        </AuthProvider>
        <Toaster />
      </ChakraProvider>
    </ColorModeProvider>
  );
}
