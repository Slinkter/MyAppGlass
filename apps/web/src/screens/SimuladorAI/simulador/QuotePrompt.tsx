"use client";

import React from "react";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import type { AISimulatorProduct } from "@/features/ai-simulator/data/aiProducts";

interface QuotePromptProps {
  selectedProduct: AISimulatorProduct;
}

export const QuotePrompt: React.FC<QuotePromptProps> = ({ selectedProduct }) => {
  return (
    <Box
          bg="surface.card"
          p={{ base: "4", md: "6" }}
          borderRadius="2xl"
          border="2px solid"
          borderColor="purple.400"
          boxShadow="md"
        >
          <HStack justify="space-between" mb="3">
            <Heading size="md" color="purple.300" display="flex" alignItems="center" gap="2">
              <Eye size={20} style={{ flexShrink: 0 }} /> Simulación Compuesta Lista
            </Heading>
            <Badge variant="success">Listo para Cotizar</Badge>
          </HStack>
          <Text fontSize="sm" color="text.muted" mb="4">
            ¿Te gusta cómo encaja {selectedProduct.name} en tu habitación? Puedes generar la cotización oficial ahora mismo.
          </Text>
          <Button asChild variant="primary" w="full" size="lg">
            <Link href={`/presupuesto?sistema=${selectedProduct.quoteSystemType}`}>
              Cotizar este sistema <ArrowRight size={18} style={{ flexShrink: 0 }} />
            </Link>
          </Button>
        </Box>
  );
};
