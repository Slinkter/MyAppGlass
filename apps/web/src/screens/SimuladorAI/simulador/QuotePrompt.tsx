"use client";

import React from "react";
import { Box, Heading, Text, HStack, Badge } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
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
          p="6"
          borderRadius="2xl"
          border="2px solid"
          borderColor="purple.400"
          boxShadow="0 10px 30px rgba(168, 85, 247, 0.2)"
        >
          <HStack justify="space-between" mb="3">
            <Heading size="md" color="purple.300" display="flex" alignItems="center" gap="2">
              <Eye size={20} /> Simulación Compuesta Lista
            </Heading>
            <Badge colorPalette="green">Listo para Cotizar</Badge>
          </HStack>
          <Text fontSize="sm" color="text.muted" mb="4">
            ¿Te gusta cómo encaja {selectedProduct.name} en tu habitación? Puedes generar la cotización oficial ahora mismo.
          </Text>
          <Button asChild colorPalette="blue" w="full" size="lg">
            <Link href="/presupuesto">
              Cotizar este Sistema Exacto en PDF <ArrowRight size={18} />
            </Link>
          </Button>
        </Box>
  );
};
