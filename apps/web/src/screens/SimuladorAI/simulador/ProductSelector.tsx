"use client";

import React from "react";
import { Box, Heading, Text, SimpleGrid, chakra } from "@chakra-ui/react";
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
        <CheckCircle2 size={20} color="var(--chakra-colors-status-info)" style={{ flexShrink: 0 }} /> 1. Selecciona el Producto a Proyectar
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
        {AI_SIMULATOR_PRODUCTS.map((prod) => {
          const isSelected = selectedProduct.id === prod.id;
          return (
            <chakra.button
              type="button"
              aria-pressed={isSelected}
              key={prod.id}
              w="full"
              textAlign="left"
              p="4"
              borderRadius="xl"
              border="2px solid"
              borderColor={isSelected ? "brand.primary" : "border.default"}
              bg={isSelected ? "bg.subtle" : "surface.card"}
              cursor="pointer"
              onClick={() => {
                onSelect(prod);
              }}
              transition="border-color 0.2s ease, transform 0.2s ease"
              _hover={{ borderColor: "border.strong", transform: "translateY(-2px)" }}
              _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
            >
              <Text fontWeight="bold" fontSize="sm" color="text.heading">
                {prod.name}
              </Text>
              <Text fontSize="xs" color="text.muted" mt="1">
                {prod.recommendedSpace}
              </Text>
            </chakra.button>
          );
        })}
      </SimpleGrid>
    </Box>

  );
};
