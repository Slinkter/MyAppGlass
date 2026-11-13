"use client";

/**
 * @file PurchaseOrderSheet.tsx
 * @description Hoja A4 del pedido de compra a proveedores. Documento interno: siempre papel claro
 * (también en modo oscuro). Una sección por proveedor, con foto, código, cantidad y precios.
 * No incluye el botón de imprimir: la pantalla que lo contiene llama a `window.print()`.
 * En celular la tabla se desplaza dentro de su caja; cada sección evita partirse entre páginas.
 * @module entities/supplier/ui
 */

import React from "react";
import { Box, Flex, Heading, Text, chakra } from "@chakra-ui/react";
import { companyData } from "@/shared/config/company-data";
import { formatSoles } from "@/entities/quote/lib/formatSoles";
import { groupBySupplier } from "../lib/groupBySupplier";
import { SUPPLIER_LABELS } from "../model";
import { NO_PRICE_LABEL, PURCHASE_STATUS_LABELS, type PurchaseOrder } from "../model/purchaseOrder";
import { SupplierProductImage } from "./SupplierProductImage";

interface PurchaseOrderSheetProps {
  order: PurchaseOrder;
}

const Th = chakra("th", {
  base: {
    px: "3",
    py: "2.5",
    fontSize: "xs",
    fontWeight: "semibold",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "gray.600",
    textAlign: "left",
    borderBottom: "2px solid",
    borderColor: "gray.900",
    whiteSpace: "nowrap",
  },
});

const Td = chakra("td", {
  base: {
    px: "3",
    py: "2.5",
    fontSize: "sm",
    borderBottom: "1px solid",
    borderColor: "gray.200",
    verticalAlign: "middle",
    fontVariantNumeric: "tabular-nums",
  },
});

/** Fecha del pedido en es-PE y zona de Lima; si falta, la de hoy. */
function formatOrderDate(order: PurchaseOrder): string {
  const date = order.createdAt ? new Date(order.createdAt.seconds * 1000) : new Date();
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Lima",
  }).format(date);
}

/** Importe en soles, o "S/ --" cuando el precio no está confirmado. */
function priceOrDash(value: number | null): string {
  return value === null ? "S/ --" : formatSoles(value);
}

export const PurchaseOrderSheet: React.FC<PurchaseOrderSheetProps> = ({ order }) => {
  const groups = groupBySupplier(order.lineas);

  return (
    <Box
      maxW="210mm"
      mx="auto"
      p={{ base: "5", md: "10" }}
      bg="white"
      color="gray.900"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="cardLift"
      css={{
        "@media print": { maxWidth: "none", padding: 0, border: "none", boxShadow: "none", borderRadius: 0 },
      }}
    >
      {/* CABECERA */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align="flex-start"
        gap="4"
        borderBottom="2px solid"
        borderColor="gray.900"
        pb="5"
        mb="6"
      >
        <Box minW="0">
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="text.heading" lineHeight="1.15">
            {companyData.razonSocial}
          </Heading>
          <Text fontSize="xs" color="gray.600" mt="2">
            RUC: {companyData.ruc}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {companyData.direccion}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {`WhatsApp: ${companyData.whatsappDisplay} | Email: ${companyData.salesEmail}`}
          </Text>
        </Box>
        <Box textAlign={{ base: "left", sm: "right" }} flexShrink={0}>
          <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "xl", md: "2xl" }} letterSpacing="0.04em" color="text.heading" lineHeight="1.1">
            PEDIDO DE COMPRA
          </Text>
          <Text fontSize="xs" color="gray.600" mt="1">
            N.º {order.number}
          </Text>
          <Text fontSize="xs" color="gray.600">
            Fecha: {formatOrderDate(order)}
          </Text>
          <Text fontSize="xs" color="gray.600">
            Estado: {PURCHASE_STATUS_LABELS[order.estado]}
          </Text>
        </Box>
      </Flex>

      {/* SECCIONES POR PROVEEDOR */}
      {groups.map((group) => (
        <Box key={group.proveedor} mb="6" css={{ breakInside: "avoid" }}>
          <Text fontSize="sm" fontWeight="semibold" letterSpacing="0.08em" textTransform="uppercase" color="text.heading" mb="2">
            Proveedor: {SUPPLIER_LABELS[group.proveedor]}
          </Text>
          <Box overflowX="auto" role="region" aria-label={`Productos de ${SUPPLIER_LABELS[group.proveedor]}`} tabIndex={0}>
            <chakra.table w="full" minW="40rem" css={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th scope="col">N.º</Th>
                  <Th scope="col">Foto</Th>
                  <Th scope="col">Código</Th>
                  <Th scope="col">Descripción</Th>
                  <Th scope="col" textAlign="center">Cant.</Th>
                  <Th scope="col" textAlign="right">P. unit.</Th>
                  <Th scope="col" textAlign="right">Subtotal</Th>
                </tr>
              </thead>
              <tbody>
                {group.lineas.map((line, idx) => (
                  <tr key={`${line.productId}-${idx}`}>
                    <Td>{String(idx + 1).padStart(2, "0")}</Td>
                    <Td>
                      <SupplierProductImage path={line.imagenPath} alt={line.descripcion} size="10" />
                    </Td>
                    <Td whiteSpace="nowrap">{line.cod}</Td>
                    <Td>{line.descripcion}</Td>
                    <Td textAlign="center">{line.cantidad}</Td>
                    <Td textAlign="right" whiteSpace="nowrap">{priceOrDash(line.precio)}</Td>
                    <Td textAlign="right" fontWeight="semibold" whiteSpace="nowrap">
                      {priceOrDash(line.precio === null ? null : line.precio * line.cantidad)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </chakra.table>
          </Box>
          <Flex justify="flex-end" gap="2" pt="2" fontSize="sm" fontWeight="semibold" css={{ fontVariantNumeric: "tabular-nums" }}>
            <Text>Subtotal {SUPPLIER_LABELS[group.proveedor]}:</Text>
            <Text>{group.subtotal === null ? NO_PRICE_LABEL : formatSoles(group.subtotal)}</Text>
          </Flex>
        </Box>
      ))}

      {/* TOTAL GENERAL */}
      <Box pt="5" borderTop="2px solid" borderColor="gray.900" css={{ breakInside: "avoid" }}>
        <Flex justify="space-between" align="baseline" gap="4" wrap="wrap">
          <Text fontWeight="semibold">TOTAL GENERAL</Text>
          <Text fontFamily="heading" fontWeight="700" fontSize="xl" color="text.heading" css={{ fontVariantNumeric: "tabular-nums" }}>
            {order.total === null ? NO_PRICE_LABEL : formatSoles(order.total)}
          </Text>
        </Flex>
        {order.total === null && (
          <Text fontSize="xs" color="gray.700" mt="1">
            Monto aproximado: faltan precios de proveedor.
          </Text>
        )}

        {order.nota.trim() !== "" && (
          <Box mt="4" fontSize="sm">
            <Text fontWeight="semibold">Nota</Text>
            <Text color="gray.800" whiteSpace="pre-wrap">{order.nota}</Text>
          </Box>
        )}

        <Flex direction={{ base: "column", sm: "row" }} justify="space-between" gap="2" mt="6" fontSize="sm">
          <Text>Solicitado por: {order.createdByName}</Text>
          <Text>Aprobado por: {order.approvedByName ?? "Pendiente de aprobación"}</Text>
        </Flex>
        <Text fontSize="2xs" color="gray.600" mt="4">
          Documento interno de {companyData.razonSocial}
        </Text>
      </Box>
    </Box>
  );
};
