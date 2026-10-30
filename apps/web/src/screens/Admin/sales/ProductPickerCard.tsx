"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Input, Badge, Spinner } from "@chakra-ui/react";
import { Package, Plus, Minus, Search } from "lucide-react";
import type { Product } from "@/shared/schemas/ecommerce-schemas";

interface ProductPickerCardProps {
  products: Product[];
  loading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  getQty: (id?: string) => number;
  onQtyChange: (id: string, delta: number, maxStock: number) => void;
  onAddItem: (product: Product) => void;
}

export const ProductPickerCard: React.FC<ProductPickerCardProps> = ({
  products,
  loading,
  search: productSearch,
  onSearchChange,
  selectedCategory: selectedCat,
  onCategoryChange,
  getQty,
  onQtyChange,
  onAddItem,
}) => {
  return (
    <Box
      p="6"
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(16px)"
      boxShadow="0 4px 20px var(--chakra-colors-overlay-subtle)"
    >
      <VStack align="stretch" gap="4" mb="4">
        <HStack justify="space-between" wrap="wrap" gap="2">
          <HStack gap="2.5">
            <Box p="2" borderRadius="lg" bg="status.infoSoft" color="var(--chakra-colors-status-info)">
              <Package size={18} />
            </Box>
            <Heading size="md" color="text.heading">
              2. Catálogo & Existencias
            </Heading>
          </HStack>

          <HStack gap="2">
            <Box color="text.muted">
              <Search size={16} />
            </Box>
            <Input
              placeholder="Filtrar catálogo..."
              w={{ base: "140px", sm: "180px" }}
              size="xs"
              borderRadius="lg"
              value={productSearch}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </HStack>
        </HStack>

        <HStack gap="1" wrap="wrap">
          {["todos", "vidrio", "aluminio", "accesorio", "consumible", "servicio"].map((cat) => {
            const isSel = selectedCat === cat;
            return (
              <Button
                key={cat}
                size="2xs"
                borderRadius="md"
                variant={isSel ? "solid" : "ghost"}
                colorPalette={isSel ? "cyan" : "gray"}
                onClick={() => onCategoryChange(cat)}
                textTransform="capitalize"
              >
                {cat}
              </Button>
            );
          })}
        </HStack>
      </VStack>

      {loading ? (
        <Box p="8" textAlign="center">
          <Spinner size="md" color="brand.primary" />
          <Text fontSize="xs" color="text.muted" mt="2">
            Cargando inventario disponible...
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="2.5" maxH="400px" overflowY="auto" pr="1">
          {products.map((prod) => {
            const isOutOfStock = prod.stock <= 0;
            const currentQty = getQty(prod.id);

            return (
              <HStack
                key={prod.id || prod.sku}
                p="3.5"
                borderRadius="xl"
                bg="bg.subtle"
                justify="space-between"
                border="1px solid"
                borderColor="border.default"
                transition="all 0.2s ease"
                _hover={{ borderColor: "rgba(56, 189, 248, 0.4)", bg: "surface.card" }}
              >
                <VStack align="start" gap="0.5" flex="1">
                  <Text fontSize="sm" fontWeight="600" color="text.heading">
                    {prod.name}
                  </Text>
                  <HStack gap="2">
                    <Text fontSize="2xs" color="text.muted" fontFamily="mono">
                      {prod.sku}
                    </Text>
                    <Badge size="xs" variant="subtle" fontSize="2xs" px="1.5">
                      {prod.category}
                    </Badge>
                    <Text fontSize="2xs" fontWeight="bold" color={isOutOfStock ? "var(--chakra-colors-status-danger)" : "var(--chakra-colors-status-success)"}>
                      Stock: {prod.stock} {prod.unit}
                    </Text>
                  </HStack>
                </VStack>

                <HStack gap="3">
                  <Text fontWeight="bold" fontSize="sm" color="text.heading">
                    S/. {prod.unitPrice.toFixed(2)}
                  </Text>

                  {/* Stepper interactivo de cantidad */}
                  {!isOutOfStock && prod.id && (
                    <HStack gap="1" bg="bg.page" p="0.5" borderRadius="lg" border="1px solid" borderColor="border.default">
                      <Button
                        size="2xs"
                        variant="ghost"
                        p="1"
                        h="24px"
                        minW="24px"
                        onClick={() => onQtyChange(prod.id!, -1, prod.stock)}
                      >
                        <Minus size={12} />
                      </Button>
                      <Text fontSize="xs" fontWeight="bold" px="1" minW="18px" textAlign="center">
                        {currentQty}
                      </Text>
                      <Button
                        size="2xs"
                        variant="ghost"
                        p="1"
                        h="24px"
                        minW="24px"
                        onClick={() => onQtyChange(prod.id!, 1, prod.stock)}
                      >
                        <Plus size={12} />
                      </Button>
                    </HStack>
                  )}

                  <Button
                    size="xs"
                    borderRadius="lg"
                    colorPalette="cyan"
                    disabled={isOutOfStock}
                    onClick={() => onAddItem(prod)}
                  >
                    <Plus size={14} style={{ marginRight: 4 }} />
                    Agregar
                  </Button>
                </HStack>
              </HStack>
            );
          })}
        </VStack>
      )}
    </Box>
  );
};
