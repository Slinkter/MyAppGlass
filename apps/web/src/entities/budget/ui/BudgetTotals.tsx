"use client";

import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { formatSoles } from "@/entities/quote";
import { IGV_RATE } from "../model";

interface BudgetTotalsProps {
  subtotal: number;
  igv: number;
  total: number;
  igvRate?: number;
  /** true mientras se edita: los importes son una vista previa; el servidor fija los definitivos. */
  preview?: boolean;
}

/** Subtotal, IGV y total del presupuesto formal, con cifras tabulares. */
export const BudgetTotals: React.FC<BudgetTotalsProps> = ({ subtotal, igv, total, igvRate = IGV_RATE, preview = false }) => (
  <VStack align="stretch" gap="2" css={{ fontVariantNumeric: "tabular-nums" }}>
    <HStack justify="space-between">
      <Text fontSize="sm" color="text.muted">
        Subtotal
      </Text>
      <Text fontSize="sm" color="text.heading">
        {formatSoles(subtotal)}
      </Text>
    </HStack>
    <HStack justify="space-between">
      <Text fontSize="sm" color="text.muted">
        IGV ({Math.round(igvRate * 100)} %)
      </Text>
      <Text fontSize="sm" color="text.heading">
        {formatSoles(igv)}
      </Text>
    </HStack>
    <Box borderTop="1px solid" borderColor="border.default" pt="2">
      <HStack justify="space-between" align="baseline">
        <Text fontWeight="bold" color="text.heading">
          Total
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="text.heading">
          {formatSoles(total)}
        </Text>
      </HStack>
    </Box>
    {preview && (
      <Text fontSize="xs" color="text.muted">
        Vista previa. El total definitivo se calcula al guardar.
      </Text>
    )}
  </VStack>
);
