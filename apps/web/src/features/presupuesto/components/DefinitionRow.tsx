"use client";

/**
 * @file DefinitionRow.tsx
 * @description Fila etiqueta-valor de una lista de definición (`<dl>`). Con `amount` el valor es un
 * importe: no se parte, no se encoge y usa cifras tabulares. Sin `amount` el valor puede envolver.
 */

import React from "react";
import { HStack, Text } from "@chakra-ui/react";

export interface DefinitionRowProps {
  label: React.ReactNode;
  children: React.ReactNode;
  /** El valor es un importe en soles. */
  amount?: boolean;
  /** Fila destacada (total): etiqueta y valor más grandes. */
  strong?: boolean;
  align?: "flex-start" | "baseline";
}

export const DefinitionRow: React.FC<DefinitionRowProps> = ({
  label,
  children,
  amount = false,
  strong = false,
  align = "flex-start",
}) => (
  <HStack justify="space-between" align={align} gap="3">
    <Text
      as="dt"
      minW="0"
      fontSize={strong ? "md" : "sm"}
      color={strong ? "text.heading" : "text.muted"}
      fontWeight={strong ? "bold" : undefined}
    >
      {label}
    </Text>
    <Text
      as="dd"
      m="0"
      textAlign="right"
      fontSize={strong ? "xl" : "sm"}
      fontWeight={strong ? "bold" : amount ? "medium" : undefined}
      {...(amount
        ? { whiteSpace: "nowrap", flexShrink: 0, fontVariantNumeric: "tabular-nums" }
        : { minW: "0", overflowWrap: "anywhere" })}
    >
      {children}
    </Text>
  </HStack>
);
