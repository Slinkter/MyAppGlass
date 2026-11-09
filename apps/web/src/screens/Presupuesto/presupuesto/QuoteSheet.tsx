"use client";

/**
 * @file QuoteSheet.tsx
 * @description Hoja de presupuesto (concepto C1 renovado, docs/gya/conceptos-presupuesto.md).
 * Es un documento: siempre papel claro (también en modo oscuro) y legible en blanco y negro.
 * Membrete: VIDRIERÍA & ALUMINIO · nombre en navy serif · «PRESUPUESTO» en rojo serif.
 * Montos con cifras tabulares; en celular el bloque de totales se apila y la tabla se desplaza
 * dentro de su caja.
 */

import React from "react";
import { Box, Flex, Heading, Text, SimpleGrid, chakra } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { QUOTE_PRICING } from "@/features/presupuesto/config/pricing";
import type { QuoteSummary } from "@/features/presupuesto/utils/quoteSummary";
import type { QuoteCustomer } from "./types";

interface QuoteSheetProps {
  customer: QuoteCustomer;
  quote: QuoteSummary;
  formattedDate: string;
  quoteNumber?: string | null;
}

const money = (n: number) => `S/ ${n.toFixed(2)}`;

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
    verticalAlign: "top",
    fontVariantNumeric: "tabular-nums",
  },
});

export const QuoteSheet: React.FC<QuoteSheetProps> = ({ customer, quote, formattedDate, quoteNumber }) => {
  return (
    <Box
      p={{ base: "5", md: "10" }}
      bg="white"
      color="gray.900"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="cardLift"
    >
      {/* MEMBRETE */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "flex-start", sm: "flex-start" }}
        gap="4"
        borderBottom="2px solid"
        borderColor="gray.900"
        pb="5"
        mb="6"
      >
        <Box minW="0">
          <Text fontSize="xs" fontWeight="semibold" letterSpacing="0.16em" color="gray.600">
            VIDRIERÍA & ALUMINIO
          </Text>
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="brand.ink" lineHeight="1.15" mt="1">
            Glass & Aluminum Company S.A.C.
          </Heading>
          <Text fontSize="xs" color="gray.600" mt="2">
            RUC: {companyData.ruc}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {`${companyData.direccion} — Tel: (01) ${companyData.whatsappDisplay} / ${companyData.contactPhone.replace(/-/g, " ")}`}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {`Web: www.gyacompany.com | Email: ${companyData.salesEmail}`}
          </Text>
        </Box>
        <Box textAlign={{ base: "left", sm: "right" }} flexShrink={0}>
          <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "xl", md: "2xl" }} letterSpacing="0.04em" color="brand.quoteRed" lineHeight="1.1">
            PRESUPUESTO
          </Text>
          <Text fontSize="xs" color="gray.600" mt="1">
            N° {quoteNumber ?? "Se asigna al enviar la solicitud"}
          </Text>
          <Text fontSize="xs" color="gray.600">
            Fecha: {formattedDate}
          </Text>
        </Box>
      </Flex>

      {/* DATOS DEL CLIENTE */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="3" mb="6" fontSize="sm" bg="gray.50" p="4" borderRadius="lg">
        <Box>
          <Text><strong>Cliente:</strong> {customer.fullName || "Cliente Particular"}</Text>
          <Text><strong>DNI / RUC:</strong> {customer.dniRuc || "—"}</Text>
          <Text><strong>Dirección:</strong> {customer.address || "La Molina, Lima"}</Text>
        </Box>
        <Box>
          <Text><strong>Teléfono:</strong> {customer.phone || "—"}</Text>
          <Text><strong>Email:</strong> {customer.email || "—"}</Text>
          <Text><strong>Distrito:</strong> {customer.district || "La Molina"}</Text>
        </Box>
      </SimpleGrid>

      {/* TABLA DE PARTIDAS */}
      <Box overflowX="auto" mb="6" role="region" aria-label="Partidas del presupuesto" tabIndex={0}>
        <chakra.table w="full" minW="560px" css={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Th scope="col">Ítem</Th>
              <Th scope="col">Descripción técnica</Th>
              <Th scope="col" textAlign="center">Cant.</Th>
              <Th scope="col" textAlign="center">Unid.</Th>
              <Th scope="col" textAlign="right">P. unit.</Th>
              <Th scope="col" textAlign="right">Total</Th>
            </tr>
          </thead>
          <tbody>
            {quote.lines.map((result, lineIdx) => {
              const offset = quote.lines.slice(0, lineIdx).reduce((acc, r) => acc + r.items.length, 0);
              const title = [result.line.ambiente.trim(), QUOTE_PRICING.systems[result.line.systemType].label]
                .filter(Boolean)
                .join(" — ");
              return (
                <React.Fragment key={result.line.id}>
                  <tr>
                    <Td colSpan={6} bg="gray.50" fontWeight="semibold" color="brand.ink" borderColor="gray.200">
                      {lineIdx + 1}. {title} ({result.line.width} × {result.line.height} m)
                    </Td>
                  </tr>
                  {result.items.map((item, idx) => (
                    <tr key={idx}>
                      <Td>{String(offset + idx + 1).padStart(2, "0")}</Td>
                      <Td>{item.description}</Td>
                      <Td textAlign="center">{item.quantity}</Td>
                      <Td textAlign="center">{item.unit}</Td>
                      <Td textAlign="right">{money(item.unitPrice)}</Td>
                      <Td textAlign="right" fontWeight="semibold">
                        {money(item.totalPrice)}
                      </Td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </chakra.table>
      </Box>

      {/* CONDICIONES Y TOTALES */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "stretch", md: "flex-start" }}
        gap="6"
        pt="5"
        borderTop="2px solid"
        borderColor="gray.900"
      >
        <Box maxW={{ base: "full", md: "50%" }} fontSize="xs" color="gray.700" lineHeight="1.6">
          <Text fontWeight="semibold" mb="1" display="flex" alignItems="center" gap="1.5">
            <ShieldCheck size={16} aria-hidden="true" style={{ flexShrink: 0 }} /> Condiciones comerciales
          </Text>
          <Text>• Validez del presupuesto: 15 días hábiles a partir de la fecha de emisión.</Text>
          <Text>• Garantía estructural: 2 años en perfiles y 1 año en accesorios y hermeticidad.</Text>
          <Text>• Tiempo de fabricación e instalación: 5 a 7 días hábiles tras confirmación.</Text>
        </Box>
        <Box minW={{ base: "full", md: "260px" }} fontSize="sm" css={{ fontVariantNumeric: "tabular-nums" }}>
          <Flex justify="space-between" mb="1.5">
            <Text color="gray.700">Subtotal</Text>
            <Text fontWeight="medium">{money(quote.subtotal)}</Text>
          </Flex>
          {quote.installationCost > 0 && (
            <Flex justify="space-between" mb="1.5">
              <Text color="gray.700">Instalación / montaje</Text>
              <Text fontWeight="medium">{money(quote.installationCost)}</Text>
            </Flex>
          )}
          <Flex justify="space-between" mb="1.5">
            <Text color="gray.700">I.G.V. (18%)</Text>
            <Text fontWeight="medium">{money(quote.igv)}</Text>
          </Flex>
          <Flex justify="space-between" align="baseline" pt="3" mt="2" borderTop="2px solid" borderColor="gray.900">
            <Text fontWeight="semibold">TOTAL</Text>
            <Text fontFamily="heading" fontWeight="700" fontSize="2xl" color="brand.ink">
              {money(quote.total)}
            </Text>
          </Flex>
        </Box>
      </Flex>
      {quote.pricePending && (
        <Text fontSize="xs" color="gray.700" mt="4">
          * Incluye sistemas con precio por definir: el monto es referencial y será confirmado por nuestro equipo.
        </Text>
      )}
    </Box>
  );
};
