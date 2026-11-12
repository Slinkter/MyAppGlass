"use client";

/**
 * @file QuoteTotalsPanel.tsx
 * @description Totales del carrito. Jerarquía: desglose (subtotal, flete, IGV) en tono suave;
 * debajo, dos precios: el de lista (tarjeta) y el total en efectivo o QR, que va destacado.
 */

import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { formatSoles, type QuoteTotals } from "@/entities/quote";
import { DefinitionRow } from "./DefinitionRow";
import { QUOTE_TEXTS } from "./quoteTexts";

const cartText = QUOTE_TEXTS.cart;

export const QuoteTotalsPanel: React.FC<{ totals: QuoteTotals }> = ({ totals }) => (
  <VStack align="stretch" gap="4">
    <VStack as="dl" align="stretch" gap="1" m="0">
      <DefinitionRow amount label={cartText.subtotal}>{formatSoles(totals.subtotal)}</DefinitionRow>
      {totals.freight > 0 && (
        <DefinitionRow amount label={cartText.freight}>{formatSoles(totals.freight)}</DefinitionRow>
      )}
      <DefinitionRow amount label={cartText.igv}>{formatSoles(totals.igv)}</DefinitionRow>
    </VStack>

    <Box
      bg="surface.card"
      p={{ base: "4", md: "6" }}
      borderRadius="card"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.default"
    >
      <VStack align="stretch" gap="2">
        <Text fontVariantNumeric="tabular-nums" color="text.muted" fontSize="sm">
          {cartText.listPrice(formatSoles(totals.listPrice))}
        </Text>
        <VStack as="dl" align="stretch" gap="0" m="0">
          <DefinitionRow amount strong label={cartText.cashTotal}>{formatSoles(totals.total)}</DefinitionRow>
        </VStack>
        <Text fontSize="md" fontVariantNumeric="tabular-nums">
          {cartText.cashBenefit(formatSoles(totals.total), formatSoles(totals.listPrice))}
        </Text>
        <Text fontSize="md" fontWeight="semibold" fontVariantNumeric="tabular-nums">
          {cartText.cashSaving(formatSoles(totals.cashSaving))}
        </Text>
      </VStack>
    </Box>
  </VStack>
);
