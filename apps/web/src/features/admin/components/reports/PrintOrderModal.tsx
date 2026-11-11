"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Badge, SimpleGrid } from "@chakra-ui/react";
import { Printer } from "lucide-react";
import type { Order } from "@/shared/schemas/ecommerce-schemas";
import { AdminDialog } from "@/features/admin/components/form/AdminDialog";
import { companyData } from "@/shared/config/company-data";

interface PrintOrderModalProps {
  order: Order;
  onPrint: () => void;
  onClose: () => void;
}

export const PrintOrderModal: React.FC<PrintOrderModalProps> = ({ order, onPrint, onClose }) => {
  return (
    <AdminDialog title="Guía de salida del pedido" maxW="3xl" onClose={onClose} hideHeader>
      <Box bg="white" color="brand.ink" px={{ base: "4", md: "8" }} pb={{ base: "4", md: "8" }} pt="14" borderRadius="2xl" id="printable-order-guide">
        {/* Cabecera del Documento */}
        <HStack justify="space-between" align="start" borderBottom="2px solid" borderBottomColor="brand.ink" pb="4" mb="4">
          <VStack align="start" gap="0">
            <Heading size="lg" color="brand.ink">
              {companyData.companyName}
            </Heading>
            <Text fontSize="2xs" color="text.muted">
              {companyData.razonSocial} · RUC {companyData.ruc}
            </Text>
            <Text fontSize="2xs" color="text.muted">
              {companyData.direccion} · Tel: {companyData.contactPhone}
            </Text>
          </VStack>

          <VStack align="end" gap="1">
            <Badge bg="brand.ink" color="white" px="3" py="1" fontSize="xs">
              GUÍA DE SALIDA
            </Badge>
            <Text fontSize="sm" fontWeight="bold" fontFamily="mono">
              {order.orderNumber}
            </Text>
          </VStack>
        </HStack>

        {/* Datos del Cliente y Despacho */}
        <SimpleGrid columns={2} gap="3" bg="bg.subtle" p="3.5" borderRadius="lg" mb="4" fontSize="xs">
          <VStack align="start" gap="0.5">
            <Text><strong>Cliente / Razón Social:</strong> {order.clientName}</Text>
            <Text><strong>DNI / RUC:</strong> {order.clientDniRuc || "N/A"}</Text>
            <Text><strong>Teléfono:</strong> {order.clientPhone || "N/A"}</Text>
          </VStack>
          <VStack align="start" gap="0.5">
            <Text><strong>Dirección Entrega:</strong> {order.clientAddress || "Taller GYA"}</Text>
            <Text><strong>Distrito:</strong> {order.clientDistrict || "La Molina"}</Text>
            <Text><strong>Método de Pago:</strong> {order.paymentMethod.replace(/_/g, " ")}</Text>
          </VStack>
        </SimpleGrid>

        {/* Tabla de Partidas */}
        <Box as="table" w="full" mb="4" fontSize="xs" style={{ borderCollapse: "collapse" }}>
          <Box as="thead" bg="brand.ink" color="white">
            <Box as="tr">
              <Box as="th" p="2" textAlign="left">SKU</Box>
              <Box as="th" p="2" textAlign="left">Descripción del Material</Box>
              <Box as="th" p="2" textAlign="center">Cant.</Box>
              <Box as="th" p="2" textAlign="right">P. Unit</Box>
              <Box as="th" p="2" textAlign="right">Total</Box>
            </Box>
          </Box>
          <Box as="tbody">
            {order.items.map((item) => (
              <Box as="tr" key={item.productId || item.sku || item.name} borderBottom="1px solid" borderBottomColor="border.default">
                <Box as="td" p="2" fontFamily="mono">{item.sku}</Box>
                <Box as="td" p="2">{item.name}</Box>
                <Box as="td" p="2" textAlign="center">{item.quantity} {item.unit}</Box>
                <Box as="td" p="2" textAlign="right">S/. {item.unitPrice.toFixed(2)}</Box>
                <Box as="td" p="2" textAlign="right" fontWeight="bold">S/. {item.totalPrice.toFixed(2)}</Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Totales */}
        <HStack justify="end" mb="6">
          <VStack align="end" gap="1" w="56" fontSize="xs">
            <HStack justify="space-between" w="full">
              <Text>Subtotal:</Text>
              <Text>S/. {order.subtotal.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text>IGV (18%):</Text>
              <Text>S/. {order.igv.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between" w="full" pt="1" borderTop="1px solid" borderTopColor="brand.ink">
              <Text fontWeight="bold">TOTAL:</Text>
              <Text fontWeight="bold" fontSize="sm">S/. {order.total.toFixed(2)}</Text>
            </HStack>
          </VStack>
        </HStack>

        {/* Firmas de Conformidad */}
        <SimpleGrid columns={2} gap="8" pt="6" borderTop="1px dashed" borderTopColor="border.default" textAlign="center" fontSize="2xs">
          <VStack gap="1">
            <Box h="8" />
            <Box borderTop="1px solid" borderTopColor="brand.ink" w="80%" pt="1">
              <Text fontWeight="bold">Despachado por (Taller GYA)</Text>
              <Text color="text.muted">Firma y Sello Almacén</Text>
            </Box>
          </VStack>

          <VStack gap="1">
            <Box h="8" />
            <Box borderTop="1px solid" borderTopColor="brand.ink" w="80%" pt="1">
              <Text fontWeight="bold">Recibido Conforme (Cliente)</Text>
              <Text color="text.muted">Nombre, DNI y Firma</Text>
            </Box>
          </VStack>
        </SimpleGrid>

        {/* Botonera modal */}
        <HStack justify="end" gap="2" mt="6" pt="4" borderTop="1px solid" borderTopColor="border.default" className="no-print">
          <Button variant="outline" size="sm" onClick={() => onClose()}>
            Cerrar
          </Button>
          <Button size="sm" onClick={onPrint}>
            <Printer size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            Imprimir Documento
          </Button>
        </HStack>
      </Box>
    </AdminDialog>
  );
};
