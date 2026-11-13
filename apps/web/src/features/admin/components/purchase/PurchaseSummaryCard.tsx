"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Input, Textarea } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  groupBySupplier,
  purchaseTotal,
  SUPPLIER_LABELS,
  NO_PRICE_LABEL,
  SupplierProductImage,
} from "@/entities/supplier";
import type { PurchaseLine } from "@/entities/supplier";
import { formatSoles } from "@/entities/quote";

interface PurchaseSummaryCardProps {
  lines: PurchaseLine[];
  nota: string;
  saving: boolean;
  onChangeQty: (productId: string, cantidad: number) => void;
  onRemove: (productId: string) => void;
  onChangeNota: (nota: string) => void;
  onSaveDraft: () => void;
  onPreview: () => void;
  onSubmit: () => void;
}

export const PurchaseSummaryCard: React.FC<PurchaseSummaryCardProps> = ({
  lines,
  nota,
  saving,
  onChangeQty,
  onRemove,
  onChangeNota,
  onSaveDraft,
  onPreview,
  onSubmit,
}) => {
  const groups = groupBySupplier(lines);
  const total = purchaseTotal(lines);
  const isEmpty = lines.length === 0;

  return (
    <Box
      p={{ base: "4", md: "6" }}
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      boxShadow="lg"
    >
      <VStack align="start" gap="0" mb="4">
        <Heading size="md" color="text.heading">
          Resumen del pedido
        </Heading>
        <Text fontSize="xs" color="text.muted">
          {lines.length} productos de {groups.length} proveedores
        </Text>
      </VStack>

      {isEmpty ? (
        <Box p={{ base: "5", md: "8" }} textAlign="center" borderRadius="xl" bg="bg.subtle" border="1px dashed" borderColor="border.default" mb="4">
          <Text color="text.muted" fontSize="xs">
            Todavía no agregó productos. Búsquelos en el catálogo y pulse Agregar.
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="4" mb="4" maxH="96" overflowY="auto" pr="1">
          {groups.map((group) => (
            <Box key={group.proveedor} p="3" borderRadius="xl" bg="bg.subtle" border="1px solid" borderColor="border.default">
              <Heading size="sm" color="text.heading" mb="3">
                {SUPPLIER_LABELS[group.proveedor]}
              </Heading>

              <VStack align="stretch" gap="2">
                {group.lineas.map((line) => (
                  <HStack key={line.productId} gap="3" p="2" borderRadius="lg" bg="surface.card" border="1px solid" borderColor="border.default" align="center">
                    <Box w="10" h="10" flexShrink={0} borderRadius="md" overflow="hidden">
                      <SupplierProductImage path={line.imagenPath} alt={line.descripcion} size="10" />
                    </Box>

                    <VStack align="start" gap="0" flex="1" minW="0">
                      <Text fontSize="xs" fontWeight="bold" color="text.heading">
                        {line.cod}
                      </Text>
                      <Text fontSize="xs" color="text.muted" lineClamp={2}>
                        {line.descripcion}
                      </Text>
                    </VStack>

                    <Input
                      type="number"
                      min={1}
                      size="sm"
                      w="20"
                      minH="11"
                      borderRadius="xl"
                      aria-label={`Cantidad de ${line.cod}`}
                      value={line.cantidad}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isFinite(n) && n >= 1) {
                          onChangeQty(line.productId, Math.floor(n));
                        }
                      }}
                    />

                    <Button
                      variant="ghost"
                      minW="11"
                      minH="11"
                      color="status.danger"
                      aria-label={`Quitar ${line.cod}`}
                      onClick={() => onRemove(line.productId)}
                    >
                      <Trash2 size={16} style={{ flexShrink: 0 }} />
                    </Button>
                  </HStack>
                ))}
              </VStack>

              <HStack justify="space-between" pt="3" mt="3" borderTop="1px solid" borderColor="border.default">
                <Text fontSize="xs" color="text.muted">
                  Subtotal
                </Text>
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  {group.subtotal === null ? NO_PRICE_LABEL : formatSoles(group.subtotal)}
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}

      <VStack align="stretch" gap="1" py="3" borderTop="1px solid" borderBottom="1px solid" borderColor="border.default" mb="4">
        <HStack justify="space-between" pt="1">
          <Text fontSize="sm" fontWeight="bold" color="text.heading">
            Total general
          </Text>
          <Heading size="md" color="text.heading">
            {total === null ? NO_PRICE_LABEL : formatSoles(total)}
          </Heading>
        </HStack>
        {total === null && (
          <Text fontSize="xs" color="text.muted">
            El monto es aproximado: faltan precios de proveedor.
          </Text>
        )}
      </VStack>

      <VStack align="start" gap="1" mb="4">
        <Text fontSize="xs" fontWeight="bold" color="text.heading">
          Nota para el pedido
        </Text>
        <Textarea
          size="sm"
          borderRadius="xl"
          w="full"
          rows={3}
          placeholder="Opcional: indique condiciones o instrucciones para el proveedor."
          value={nota}
          onChange={(e) => onChangeNota(e.target.value)}
        />
      </VStack>

      <VStack align="stretch" gap="2">
        <Button variant="outline" minH="11" w="full" borderRadius="xl" disabled={isEmpty || saving} onClick={onSaveDraft}>
          Guardar borrador
        </Button>
        <Button variant="outline" minH="11" w="full" borderRadius="xl" disabled={isEmpty || saving} onClick={onPreview}>
          Vista previa A4
        </Button>
        <Button minH="11" w="full" borderRadius="xl" loading={saving} disabled={isEmpty || saving} onClick={onSubmit}>
          Enviar a aprobación
        </Button>
      </VStack>
    </Box>
  );
};
