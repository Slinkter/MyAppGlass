"use client";

import React from "react";
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { AI_SIMULATOR_PRODUCTS, AISimulatorProduct } from "@/features/ai-simulator/data/aiProducts";

interface ProductSelectorProps {
  selectedProduct: AISimulatorProduct;
  onSelect: (product: AISimulatorProduct) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, onSelect }) => {
  return (
    <Box
      bg="surface.card"
      p="6"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
    >
      <Heading size="md" mb="4" display="flex" alignItems="center" gap="2">
        <CheckCircle2 size={20} color="var(--chakra-colors-status-info)" /> 1. Selecciona el Producto a Proyectar
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
        {AI_SIMULATOR_PRODUCTS.map((prod) => {
          const isSelected = selectedProduct.id === prod.id;
          return (
            <Box
              key={prod.id}
              p="4"
              borderRadius="xl"
              border="2px solid"
              borderColor={isSelected ? "blue.400" : "whiteAlpha.100"}
              bg={isSelected ? "blue.500/10" : "surface.card"}
              cursor="pointer"
              onClick={() => {
                onSelect(prod);
              }}
              transition="all 0.2s ease"
              _hover={{ borderColor: "blue.300", transform: "translateY(-2px)" }}
            >
              <Text fontWeight="bold" fontSize="sm" color={isSelected ? "blue.300" : "white"}>
                {prod.name}
              </Text>
              <Text fontSize="xs" color="text.muted" mt="1">
                {prod.recommendedSpace}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>

  );
};
