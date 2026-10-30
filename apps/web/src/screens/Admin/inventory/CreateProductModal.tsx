"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  NativeSelectRoot,
  NativeSelectField,
  SimpleGrid,
} from "@chakra-ui/react";
import { CheckCircle2, X } from "lucide-react";
import type { Product } from "@/shared/schemas/ecommerce-schemas";
import type { InventoryStatusMessage, ProductFormData } from "./productForm";

interface CreateProductModalProps {
  formData: ProductFormData;
  onChange: (data: ProductFormData) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  actionLoading: boolean;
  statusMessage: InventoryStatusMessage;
}

export const CreateProductModal: React.FC<CreateProductModalProps> = ({
  formData,
  onChange,
  isEditing,
  onSubmit,
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
      overflowY="auto"
    >
      <Box
        as="form"
        onSubmit={onSubmit}
        bg="surface.card"
        p="7"
        borderRadius="2xl"
        maxW="580px"
        w="full"
        border="1px solid"
        borderColor="border.default"
        boxShadow="0 25px 50px -12px var(--chakra-colors-overlay-scrim)"
      >
        <HStack justify="space-between" mb="5">
          <Heading size="md" color="text.heading">
            {isEditing ? "Editar Producto" : "Nuevo Producto en Catálogo"}
          </Heading>
          <Button size="xs" variant="ghost" onClick={() => onClose()}>
            <X size={18} />
          </Button>
        </HStack>

        <VStack align="stretch" gap="3.5">
          <SimpleGrid columns={2} gap="3">
            <VStack align="start" gap="1">
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                SKU / Código: *
              </Text>
              <Input
                required
                borderRadius="xl"
                value={formData.sku}
                onChange={(e) => onChange({ ...formData, sku: e.target.value.toUpperCase() })}
              />
            </VStack>

            <VStack align="start" gap="1">
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                Categoría: *
              </Text>
              <NativeSelectRoot size="md" w="full">
                <NativeSelectField
                  value={formData.category}
                  onChange={(e) => onChange({ ...formData, category: e.target.value as Product["category"] })}
                >
                  <option value="vidrio">Vidrio</option>
                  <option value="aluminio">Aluminio</option>
                  <option value="accesorio">Accesorio</option>
                  <option value="consumible">Consumible</option>
                  <option value="servicio">Servicio</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </VStack>
          </SimpleGrid>

          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="bold" color="text.heading">
              Nombre del Producto: *
            </Text>
            <Input
              required
              borderRadius="xl"
              placeholder="ej. Vidrio Templado 8mm Incoloro"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
            />
          </VStack>

          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="bold" color="text.heading">
              Descripción o Detalle Técnico:
            </Text>
            <Input
              borderRadius="xl"
              placeholder="ej. Cristal de seguridad para mamparas y balcones..."
              value={formData.description}
              onChange={(e) => onChange({ ...formData, description: e.target.value })}
            />
          </VStack>

          <SimpleGrid columns={3} gap="3">
            <VStack align="start" gap="1">
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                Unidad:
              </Text>
              <NativeSelectRoot size="md" w="full">
                <NativeSelectField
                  value={formData.unit}
                  onChange={(e) => onChange({ ...formData, unit: e.target.value as Product["unit"] })}
                >
                  <option value="m2">m²</option>
                  <option value="barra">Barra (6m)</option>
                  <option value="unidad">Unidad</option>
                  <option value="kg">Kilogramo</option>
                  <option value="plancha">Plancha</option>
                  <option value="servicio">Servicio</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </VStack>

            <VStack align="start" gap="1">
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                Stock Inicial:
              </Text>
              <Input
                type="number"
                min="0"
                borderRadius="xl"
                value={formData.stock}
                onChange={(e) => onChange({ ...formData, stock: Number(e.target.value) })}
              />
            </VStack>

            <VStack align="start" gap="1">
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                Alerta Mínima:
              </Text>
              <Input
                type="number"
                min="1"
                borderRadius="xl"
                value={formData.minStockAlert}
                onChange={(e) => onChange({ ...formData, minStockAlert: Number(e.target.value) })}
              />
            </VStack>
          </SimpleGrid>

          <SimpleGrid columns={2} gap="3">
            <VStack align="start" gap="1">
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                Precio Venta (S/.): *
              </Text>
              <Input
                type="number"
                step="0.01"
                min="0"
                borderRadius="xl"
                value={formData.unitPrice}
                onChange={(e) => onChange({ ...formData, unitPrice: Number(e.target.value) })}
              />
            </VStack>

            <VStack align="start" gap="1">
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                Precio Costo (S/.):
              </Text>
              <Input
                type="number"
                step="0.01"
                min="0"
                borderRadius="xl"
                value={formData.costPrice}
                onChange={(e) => onChange({ ...formData, costPrice: Number(e.target.value) })}
              />
            </VStack>
          </SimpleGrid>

          {statusMessage && (
            <Box
              p="3"
              borderRadius="xl"
              bg={statusMessage.type === "success" ? "var(--chakra-colors-status-success-soft)" : "var(--chakra-colors-status-danger-soft)"}
              color={statusMessage.type === "success" ? "var(--chakra-colors-status-success)" : "var(--chakra-colors-status-danger)"}
              border={`1px solid ${statusMessage.type === "success" ? "rgba(52, 211, 153, 0.25)" : "rgba(239, 68, 68, 0.25)"}`}
              fontSize="xs"
            >
              {statusMessage.text}
            </Box>
          )}

          <HStack justify="end" gap="2" pt="3">
            <Button variant="outline" size="sm" borderRadius="xl" type="button" onClick={() => onClose()}>
              Cancelar
            </Button>
            <Button colorPalette="cyan" size="sm" borderRadius="xl" type="submit" loading={actionLoading}>
              <CheckCircle2 size={16} style={{ marginRight: 6 }} />
              {isEditing ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
