"use client";

import React from "react";
import { Box, VStack, HStack, Text, Button, Input, chakra } from "@chakra-ui/react";
import { PlusCircle } from "lucide-react";
import type { Product } from "@/shared/schemas/ecommerce-schemas";
import { AdminDialog } from "@/features/admin/components/form/AdminDialog";
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
    <AdminDialog eyebrow="Inventario" title="Entrada rápida de stock" maxW="440px" onClose={onClose}>
      <VStack align="stretch" gap="4">
        <Box p="3.5" borderRadius="xl" bg="bg.subtle" border="1px solid" borderColor="border.default">
          <Text fontSize="sm" fontWeight="bold" color="text.heading">
            {product.name}
          </Text>
          <Text fontSize="xs" color="text.muted" mt="0.5">
            SKU: <Text as="span" fontFamily="mono">{product.sku}</Text> · Stock actual: <strong>{product.stock} {product.unit}</strong>
          </Text>
        </Box>

        <VStack align="start" gap="1.5">
          <chakra.label htmlFor="replenish-qty" fontSize="sm" fontWeight="semibold" color="text.heading">
            Cantidad a ingresar ({product.unit})
          </chakra.label>
          <Input
            id="replenish-qty"
            type="number"
            inputMode="numeric"
            min="1"
            minH="11"
            borderRadius="xl"
            value={replenishQty}
            onChange={(e) => onQtyChange(Number(e.target.value))}
          />
        </VStack>

        {statusMessage && (
          <Box
            role="status"
            p="3"
            borderRadius="xl"
            bg={statusMessage.type === "success" ? "status.successSoft" : "status.dangerSoft"}
            color={statusMessage.type === "success" ? "status.successText" : "status.dangerText"}
            border="1px solid"
            borderColor={statusMessage.type === "success" ? "status.successBorder" : "status.dangerBorder"}
            fontSize="sm"
          >
            {statusMessage.text}
          </Box>
        )}

        <HStack justify="end" gap="2" pt="2" wrap="wrap">
          <Button variant="outline" borderRadius="xl" flex={{ base: "1 1 100%", sm: "0 0 auto" }} onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button borderRadius="xl" flex={{ base: "1 1 100%", sm: "0 0 auto" }} loading={actionLoading} onClick={onConfirm}>
            <PlusCircle size={16} aria-hidden="true" style={{ flexShrink: 0, marginRight: 6 }} />
            Confirmar ingreso
          </Button>
        </HStack>
      </VStack>
    </AdminDialog>
  );
};
