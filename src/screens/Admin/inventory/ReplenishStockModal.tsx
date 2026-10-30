"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Input } from "@chakra-ui/react";
import { PlusCircle, X } from "lucide-react";
import type { Product } from "@/shared/schemas/ecommerce-schemas";
import type { InventoryStatusMessage } from "./productForm";

interface ReplenishStockModalProps {
  product: Product;
  qty: number;
  onQtyChange: (qty: number) => void;
  onConfirm: () => void;
  onClose: () => void;
  actionLoading: boolean;
  statusMessage: InventoryStatusMessage;
}

export const ReplenishStockModal: React.FC<ReplenishStockModalProps> = ({
  product,
  qty: replenishQty,
  onQtyChange,
  onConfirm,
  onClose,
  actionLoading,
  statusMessage,
}) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.75)"
      backdropFilter="blur(12px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
      p="4"
    >
      <Box
        bg="surface.card"
        p="6"
        borderRadius="2xl"
        maxW="440px"
        w="full"
        border="1px solid"
        borderColor="border.default"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      >
        <HStack justify="space-between" mb="4">
          <Heading size="md" color="text.heading">
            Entrada Rápida de Stock
          </Heading>
          <Button size="xs" variant="ghost" onClick={() => onClose()}>
            <X size={18} />
          </Button>
        </HStack>

        <VStack align="stretch" gap="4">
          <Box p="3.5" borderRadius="xl" bg="bg.subtle" border="1px solid" borderColor="border.default">
            <Text fontSize="sm" fontWeight="bold" color="text.heading">
              {product.name}
            </Text>
            <Text fontSize="xs" color="text.muted" mt="0.5">
              SKU: <span style={{ fontFamily: "monospace" }}>{product.sku}</span> · Stock actual: <strong>{product.stock} {product.unit}</strong>
            </Text>
          </Box>

          <VStack align="start" gap="1.5">
            <Text fontSize="xs" fontWeight="bold" color="text.heading">
              Cantidad a Ingresar ({product.unit}):
            </Text>
            <Input
              type="number"
              min="1"
              borderRadius="xl"
              value={replenishQty}
              onChange={(e) => onQtyChange(Number(e.target.value))}
            />
          </VStack>

          {statusMessage && (
            <Box
              p="3"
              borderRadius="xl"
              bg={statusMessage.type === "success" ? "rgba(52, 211, 153, 0.1)" : "rgba(239, 68, 68, 0.1)"}
              color={statusMessage.type === "success" ? "#34d399" : "#f87171"}
              border={`1px solid ${statusMessage.type === "success" ? "rgba(52, 211, 153, 0.25)" : "rgba(239, 68, 68, 0.25)"}`}
              fontSize="xs"
            >
              {statusMessage.text}
            </Box>
          )}

          <HStack justify="end" gap="2" pt="2">
            <Button variant="outline" size="sm" borderRadius="xl" onClick={() => onClose()}>
              Cancelar
            </Button>
            <Button
              colorPalette="green"
              size="sm"
              borderRadius="xl"
              loading={actionLoading}
              onClick={onConfirm}
            >
              <PlusCircle size={16} style={{ marginRight: 6 }} />
              Confirmar Ingreso
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
