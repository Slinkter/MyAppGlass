"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/shared/providers/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";
import * as React from "react";

import { AuthProvider } from "@/features/auth/context/AuthContext";
import { OrderDraftProvider } from "@/features/products/context/OrderDraftContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider defaultTheme="light" enableSystem={false}>
      <ChakraProvider value={system}>
        <AuthProvider>
          <OrderDraftProvider>
            {children}
          </OrderDraftProvider>
        </AuthProvider>
      </ChakraProvider>
    </ColorModeProvider>
  );
}
