"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Input, Badge, NativeSelectRoot, NativeSelectField } from "@chakra-ui/react";
import { ShoppingCart, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import type { OrderItem } from "@/shared/schemas/ecommerce-schemas";
import type { PaymentMethod } from "@/features/products/context/OrderDraftContext";

interface OrderSummaryCardProps {
  items: OrderItem[];
  totalUnits: number;
  subtotal: number;
  igv: number;
  total: number;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  errorMessage: string | null;
  isSubmitting: boolean;
  onRemoveItem: (productId: string) => void;
  onSubmit: () => void;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  items,
  totalUnits,
  subtotal,
  igv,
  total,
  paymentMethod,
  onPaymentMethodChange,
  notes,
  onNotesChange,
  errorMessage,
  isSubmitting,
  onRemoveItem,
  onSubmit,
}) => {
  return (
    <Box
      p="6"
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(24px)"
      boxShadow="0 10px 40px rgba(0, 0, 0, 0.06)"
    >
      <HStack justify="space-between" mb="4">
        <HStack gap="2.5">
          <Box p="2" borderRadius="lg" bg="rgba(56, 189, 248, 0.1)" color="#38bdf8">
            <ShoppingCart size={18} />
          </Box>
          <Heading size="md" color="text.heading">
            Orden de Despacho
          </Heading>
        </HStack>
        <Badge colorPalette="cyan" variant="solid" size="sm" borderRadius="full">
          {totalUnits} unidades
        </Badge>
      </HStack>

      {/* Lista de Ítems en la Orden */}
      {items.length === 0 ? (
        <Box p="8" textAlign="center" borderRadius="xl" bg="bg.subtle" border="1px dashed" borderColor="border.default">
          <Text color="text.muted" fontSize="xs">
            Selecciona productos del catálogo izquierdo para agregarlos a la orden de despacho.
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="2" mb="4" maxH="260px" overflowY="auto" pr="1">
          {items.map((item) => (
            <HStack
              key={item.productId}
              p="3"
              borderRadius="xl"
              bg="bg.subtle"
              justify="space-between"
              border="1px solid"
              borderColor="border.default"
            >
              <VStack align="start" gap="0" flex="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  {item.name}
                </Text>
                <Text fontSize="2xs" color="text.muted">
                  {item.quantity} {item.unit} x S/. {item.unitPrice.toFixed(2)}
                </Text>
              </VStack>

              <HStack gap="2">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  S/. {item.totalPrice.toFixed(2)}
                </Text>
                <Button
                  size="2xs"
                  variant="ghost"
                  colorPalette="red"
                  onClick={() => onRemoveItem(item.productId)}
                >
                  <Trash2 size={12} />
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}

      {/* Totales y Cálculo Financiero */}
      <VStack align="stretch" gap="2" py="3" borderTop="1px solid" borderBottom="1px solid" borderColor="border.default" my="3">
        <HStack justify="space-between">
          <Text fontSize="xs" color="text.muted">
            Subtotal:
          </Text>
          <Text fontSize="xs" fontWeight="medium">
            S/. {subtotal.toFixed(2)}
          </Text>
        </HStack>
        <HStack justify="space-between">
          <Text fontSize="xs" color="text.muted">
            IGV (18%):
          </Text>
          <Text fontSize="xs" fontWeight="medium">
            S/. {igv.toFixed(2)}
          </Text>
        </HStack>
        <HStack justify="space-between" pt="1">
          <Text fontSize="sm" fontWeight="bold" color="text.heading">
            Total a Pagar:
          </Text>
          <Heading size="md" color="#34d399">
            S/. {total.toFixed(2)}
          </Heading>
        </HStack>
      </VStack>

      {/* Opciones de Pago y Notas */}
      <VStack align="stretch" gap="3" mb="4">
        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            Método de Pago:
          </Text>
          <NativeSelectRoot size="sm" w="full">
            <NativeSelectField
              value={paymentMethod}
              onChange={(e) => onPaymentMethodChange(e.target.value as PaymentMethod)}
            >
              <option value="TRANSFERENCIA_BCP">Transferencia BCP (Cta Cte)</option>
              <option value="TRANSFERENCIA_INTERBANK">Transferencia Interbank</option>
              <option value="YAPE_PLIN">Yape / Plin Corporativo</option>
              <option value="EFECTIVO">Efectivo en Taller</option>
              <option value="TARJETA">Tarjeta Débito / Crédito</option>
              <option value="CREDITO">Línea de Crédito Instalador</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </VStack>

        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            Notas de Despacho (Opcional):
          </Text>
          <Input
            size="sm"
            borderRadius="xl"
            placeholder="ej. Entregar en obra con factura..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
          />
        </VStack>
      </VStack>

      {/* Alerta de Error */}
      {errorMessage && (
        <Box p="3" mb="3" borderRadius="xl" bg="rgba(239, 68, 68, 0.1)" color="#f87171" border="1px solid rgba(239, 68, 68, 0.25)" fontSize="xs">
          <HStack gap="2">
            <AlertCircle size={14} />
            <Text>{errorMessage}</Text>
          </HStack>
        </Box>
      )}

      {/* Botón de Emisión Atómica */}
      <Button
        colorPalette="cyan"
        size="lg"
        borderRadius="xl"
        w="full"
        loading={isSubmitting}
        disabled={items.length === 0 || isSubmitting}
        onClick={onSubmit}
      >
        <CheckCircle2 size={18} style={{ marginRight: 8 }} />
        Emitir Orden y Despachar Stock
      </Button>
    </Box>
  );
};
