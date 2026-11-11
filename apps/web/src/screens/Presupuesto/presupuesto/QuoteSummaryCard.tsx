"use client";

import React from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Receipt } from "lucide-react";
import type { QuoteSummary } from "@/entities/quote/lib/quoteSummary";

const money = (n: number) => `S/ ${n.toFixed(2)}`;

export const QuoteSummaryCard: React.FC<{ summary: QuoteSummary }> = ({ summary }) => (
  <Box bg="surface.card" p={{ base: "4", md: "6" }} borderRadius="2xl" border="1px solid" borderColor="border.default">
    <Heading size="md" mb="4" display="flex" alignItems="center" gap="2">
      <Receipt size={20} style={{ flexShrink: 0 }} /> Resumen estimado
    </Heading>
    <VStack gap="2" align="stretch" fontSize="sm" aria-live="polite">
      <HStack justify="space-between">
        <Text>Partidas</Text>
        <Text fontWeight="medium">{summary.lines.length}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Subtotal</Text>
        <Text fontWeight="medium">{money(summary.subtotal)}</Text>
      </HStack>
      {summary.installationCost > 0 && (
        <HStack justify="space-between">
          <Text>Instalación</Text>
          <Text fontWeight="medium">{money(summary.installationCost)}</Text>
        </HStack>
      )}
      <HStack justify="space-between">
        <Text>I.G.V. (18%, incluido)</Text>
        <Text fontWeight="medium">{money(summary.igv)}</Text>
      </HStack>
      <HStack justify="space-between" pt="2" borderTop="1px solid" borderColor="border.default" fontSize="lg" fontWeight="bold">
        <Text>Total estimado</Text>
        <Text>{money(summary.total)}</Text>
      </HStack>
    </VStack>
    <Text fontSize="xs" color="text.muted" mt="3">
      {summary.pricePending
        ? "Incluye sistemas con precio por definir: el total es solo referencial y lo confirmamos contigo."
        : "Precios incluyen IGV. El precio se confirma tras la visita técnica sin costo."}
    </Text>
  </Box>
);
