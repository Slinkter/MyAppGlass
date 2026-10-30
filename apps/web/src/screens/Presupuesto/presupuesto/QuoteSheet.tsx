"use client";

import React from "react";
import { Box, Heading, Text, HStack, SimpleGrid } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import type { quoteCalculator } from "@/features/presupuesto/utils/quoteCalculator";
import type { QuoteCustomer } from "./types";

interface QuoteSheetProps {
  customer: QuoteCustomer;
  quote: ReturnType<typeof quoteCalculator.calculateQuote>;
  formattedDate: string;
}

export const QuoteSheet: React.FC<QuoteSheetProps> = ({ customer, quote, formattedDate }) => {
  return (
    <Box
      p={{ base: "6", md: "10" }}
      bg="white"
      color="gray.900"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.300"
      boxShadow="xl"
    >
      {/* CABECERA MEMBRETADA */}
      <HStack justify="space-between" align="start" borderBottom="2px solid #0f172a" pb="6" mb="6">
        <Box>
          <Heading size="lg" color="blue.900">
            GLASS & ALUMINUM COMPANY S.A.C.
          </Heading>
          <Text fontSize="xs" fontWeight="bold" color="gray.600">
            RUC: 20601542407 | VIDRIERÍA Y CARPINTERÍA DE ALUMINIO
          </Text>
          <Text fontSize="xs" color="gray.600">
            {`Av. Los Fresnos 1250, La Molina, Lima — Tel: (01) ${companyData.whatsappDisplay} / ${companyData.contactPhone.replace(/-/g, " ")}`}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {`Web: www.gyacompany.com | Email: ${companyData.salesEmail}`}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontSize="sm" fontWeight="bold" color="red.600">
            PRESUPUESTO FORMAL
          </Text>
          <Text fontSize="xs" color="gray.500">
            N° GYA-{new Date().getFullYear()}-0842
          </Text>
          <Text fontSize="xs" color="gray.500">
            Fecha: {formattedDate}
          </Text>
        </Box>
      </HStack>

      {/* DATOS DEL CLIENTE */}
      <SimpleGrid columns={2} gap="4" mb="6" fontSize="sm" bg="gray.50" p="4" borderRadius="md">
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
      <Box overflowX="auto" mb="6">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ backgroundColor: "#0f172a", color: "white", textAlign: "left" }}>
              <th style={{ padding: "8px" }}>Ítem</th>
              <th style={{ padding: "8px" }}>Descripción Técnica</th>
              <th style={{ padding: "8px", textAlign: "center" }}>Cant.</th>
              <th style={{ padding: "8px", textAlign: "center" }}>Unid.</th>
              <th style={{ padding: "8px", textAlign: "right" }}>P. Unit (S/)</th>
              <th style={{ padding: "8px", textAlign: "right" }}>Total (S/)</th>
            </tr>
          </thead>
          <tbody>
            {quote.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "8px" }}>0{idx + 1}</td>
                <td style={{ padding: "8px" }}>{item.description}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{item.quantity}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{item.unit}</td>
                <td style={{ padding: "8px", textAlign: "right" }}>S/ {item.unitPrice.toFixed(2)}</td>
                <td style={{ padding: "8px", textAlign: "right", fontWeight: "bold" }}>
                  S/ {item.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* RESUMEN DE TOTALES */}
      <HStack justify="space-between" align="start" pt="4" borderTop="2px solid #0f172a">
        <Box maxW="50%" fontSize="xs" color="gray.600">
          <Text fontWeight="bold" mb="1" display="flex" alignItems="center" gap="1">
            <ShieldCheck size={14} /> Condiciones Comerciales:
          </Text>
          <Text>• Validez del presupuesto: 15 días hábiles a partir de la fecha de emisión.</Text>
          <Text>• Garantía estructural: 2 años en perfiles y 1 año en accesorios y hermeticidad.</Text>
          <Text>• Tiempo de fabricación e instalación: 5 a 7 días hábiles tras confirmación.</Text>
        </Box>
        <Box textAlign="right" minW="220px" fontSize="sm">
          <HStack justify="space-between" mb="1">
            <Text>Subtotal:</Text>
            <Text fontWeight="medium">S/ {quote.subtotal.toFixed(2)}</Text>
          </HStack>
          {quote.installationCost > 0 && (
            <HStack justify="space-between" mb="1">
              <Text>Instalación / Montaje:</Text>
              <Text fontWeight="medium">S/ {quote.installationCost.toFixed(2)}</Text>
            </HStack>
          )}
          <HStack justify="space-between" mb="1">
            <Text>I.G.V. (18%):</Text>
            <Text fontWeight="medium">S/ {quote.igv.toFixed(2)}</Text>
          </HStack>
          <HStack justify="space-between" pt="2" borderTop="1px solid #cbd5e1" fontSize="md" fontWeight="bold" color="blue.900">
            <Text>TOTAL:</Text>
            <Text>S/ {quote.total.toFixed(2)}</Text>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};
