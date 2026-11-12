"use client";

import React from "react";
import Image from "next/image";
import { Box, Flex, Heading, Text, SimpleGrid, chakra } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import yapeLogo from "@/assets/branding/B1-Yape.svg";
import plinLogo from "@/assets/branding/B2-plin.svg";
import bbvaLogo from "@/assets/bbva.svg";
import { computeSashes, priceWindow, quoteTotals, splitBodies } from "../lib/windowRules";
import { formatSoles } from "../lib/formatSoles";
import type { WindowQuoteItem } from "../model";
import { Window2DPreview } from "./Window2DPreview";

export interface NovaQuoteSheetProps {
  customer: {
    fullName: string;
    phone: string;
    address?: string;
    district?: string;
  };
  items: WindowQuoteItem[];
  outsideLaMolina: boolean;
  formattedDate: string;
  quoteNumber?: string | null;
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
    verticalAlign: "top",
    fontVariantNumeric: "tabular-nums",
  },
});

export const NovaQuoteSheet: React.FC<NovaQuoteSheetProps> = ({
  customer,
  items,
  outsideLaMolina,
  formattedDate,
  quoteNumber,
}) => {
  const lineDetails = items.map((item) => {
    const price = priceWindow({
      widthM: item.widthM,
      heightM: item.heightM,
      glass: item.glass,
      finish: item.finish,
    });
    const sashes = computeSashes(item.widthM);
    const bodies = splitBodies(item.widthM, item.heightM);
    return { item, price, sashes, bodies };
  });

  const subtotales = lineDetails.map((d) => d.price.subtotal);
  const totals = quoteTotals(subtotales, outsideLaMolina);

  return (
    <Box
      p={{ base: "5", md: "10" }}
      bg="white"
      color="gray.900"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="cardLift"
      className="print-sheet"
      css={{
        "@media print": {
          boxShadow: "none",
          border: "none",
          padding: "0 !important",
          margin: "0 !important",
          color: "black",
        },
      }}
    >
      {/* MEMBRETE */}
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
          <Text fontSize="xs" fontWeight="semibold" letterSpacing="0.16em" color="gray.600">
            VIDRIERÍA & ALUMINIO
          </Text>
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="text.heading" lineHeight="1.15" mt="1">
            Glass & Aluminum Company S.A.C.
          </Heading>
          <Text fontSize="xs" color="gray.600" mt="2">
            RUC: {companyData.ruc}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {companyData.direccion} — WhatsApp: {companyData.whatsappDisplay}
          </Text>
          <Text fontSize="xs" color="gray.600">
            Web: www.gyacompany.com | Correo: {companyData.salesEmail}
          </Text>
        </Box>
        <Box textAlign={{ base: "left", sm: "right" }} flexShrink={0}>
          <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "xl", md: "2xl" }} letterSpacing="0.04em" color="brand.coral" lineHeight="1.1">
            PRESUPUESTO
          </Text>
          <Text fontSize="xs" color="gray.600" mt="1">
            N° {quoteNumber ?? "Provisional"}
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
          <Text><strong>Distrito:</strong> {customer.district || (outsideLaMolina ? "Fuera de La Molina" : "La Molina")}</Text>
        </Box>
        <Box>
          <Text><strong>Celular:</strong> {customer.phone || "—"}</Text>
          <Text><strong>Vigencia web:</strong> 24 horas (15 días calendario confirmada tras visita técnica)</Text>
        </Box>
      </SimpleGrid>

      {/* TABLA DE VENTANAS */}
      <Box overflowX="auto" mb="6" role="region" aria-label="Partidas del presupuesto" tabIndex={0}>
        <chakra.table w="full" minW="35rem" css={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Th scope="col">Ítem</Th>
              <Th scope="col">Esquema 2D</Th>
              <Th scope="col">Descripción técnica</Th>
              <Th scope="col" textAlign="center">Medidas</Th>
              <Th scope="col" textAlign="center">Hojas</Th>
              <Th scope="col" textAlign="right">P. unit.</Th>
              <Th scope="col" textAlign="right">Total</Th>
            </tr>
          </thead>
          <tbody>
            {lineDetails.map(({ item, price, sashes, bodies }, idx) => (
              <tr key={item.id}>
                <Td>{String(idx + 1).padStart(2, "0")}</Td>
                <Td>
                  <Window2DPreview
                    compact
                    sashesCount={sashes.count}
                    bodiesCount={bodies.length}
                    glassColor={item.glassColor}
                    profileColor={item.profileColor}
                    widthM={item.widthM}
                    heightM={item.heightM}
                  />
                </Td>
                <Td>
                  <Text fontWeight="semibold">Ventana Sistema Nova</Text>
                  <Text fontSize="xs" color="gray.600">
                    Vidrio {item.glass} ({item.glassColor}) · Perfil {item.profileColor}
                    {item.finish === "arenado" ? " · Acabado arenado" : item.finish === "laminado" ? " · Acabado laminado" : ""}
                  </Text>
                </Td>
                <Td textAlign="center">{item.widthM.toFixed(2)} × {item.heightM.toFixed(2)} m</Td>
                <Td textAlign="center">{sashes.count} hojas ({bodies.length} cuerpos)</Td>
                <Td textAlign="right">{formatSoles(price.subtotal)}</Td>
                <Td textAlign="right" fontWeight="semibold">{formatSoles(price.subtotal)}</Td>
              </tr>
            ))}
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
        <Box maxW={{ base: "full", md: "54%" }} fontSize="xs" color="gray.700" lineHeight="1.6">
          <Text fontWeight="semibold" mb="1" display="flex" alignItems="center" gap="1.5">
            <ShieldCheck size={16} aria-hidden="true" style={{ flexShrink: 0 }} /> Condiciones comerciales y garantía
          </Text>
          <Text>• Fabricación en taller propio e instalación con técnicos especialistas de la empresa.</Text>
          <Text>• Garantía de 3 meses en instalación y accesorios.</Text>
          <Text>• Los precios web son referenciales y se ratifican con la toma exacta de medidas en visita técnica.</Text>
          <Text>• Pago en efectivo o transferencias digitales aplica descuento por pronto pago reflejado en el total.</Text>

          {/* MEDIOS DE PAGO AUTORIZADOS CON LOGOS SVG */}
          <Box mt="3" pt="2.5" borderTop="1px dashed" borderColor="gray.300">
            <Text fontWeight="semibold" fontSize="2xs" color="gray.800" textTransform="uppercase" letterSpacing="0.06em" mb="2">
              Medios de pago autorizados
            </Text>
            <Flex wrap="wrap" gap="2.5" align="center">
              {/* Billeteras Digitales (Yape y Plin) */}
              <Flex
                align="center"
                gap="2"
                bg="gray.50"
                px="2.5"
                py="1.5"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <Box
                  position="relative"
                  w="36px"
                  h="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  borderRadius="sm"
                  bg="payment.yape"
                >
                  <Image
                    src={yapeLogo}
                    alt="Logo Yape"
                    width={36}
                    height={20}
                    style={{ objectFit: "contain", height: "100%", width: "auto" }}
                    unoptimized
                  />
                </Box>
                <Box
                  position="relative"
                  w="20px"
                  h="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  borderRadius="sm"
                >
                  <Image
                    src={plinLogo}
                    alt="Logo Plin"
                    width={20}
                    height={20}
                    style={{ objectFit: "contain", height: "100%", width: "auto" }}
                    unoptimized
                  />
                </Box>
                <Box lineHeight="1.15">
                  <Text fontSize="2xs" fontWeight="bold" color="gray.800">
                    Yape / Plin
                  </Text>
                  <Text fontSize="2xs" color="gray.600">
                    {companyData.whatsappDisplay}
                  </Text>
                </Box>
              </Flex>

              {/* Cuenta Corriente BBVA */}
              <Flex
                align="center"
                gap="2.5"
                bg="gray.50"
                px="2.5"
                py="1.5"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <Box
                  position="relative"
                  w="48px"
                  h="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={bbvaLogo}
                    alt="Logo BBVA"
                    width={48}
                    height={16}
                    style={{ objectFit: "contain", height: "100%", width: "auto" }}
                    unoptimized
                  />
                </Box>
                <Box lineHeight="1.15">
                  <Text fontSize="2xs" fontWeight="bold" color="gray.800">
                    BBVA Soles
                  </Text>
                  <Text fontSize="2xs" color="gray.600">
                    Cta: 0011-0106-0100041622
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box minW={{ base: "full", md: "18rem" }} fontSize="sm" css={{ fontVariantNumeric: "tabular-nums" }}>
          <Flex justify="space-between" mb="1.5">
            <Text color="gray.700">Subtotal neto</Text>
            <Text fontWeight="medium">{formatSoles(totals.windowsSubtotal)}</Text>
          </Flex>
          {totals.freight > 0 && (
            <Flex justify="space-between" mb="1.5">
              <Text color="gray.700">Flete fuera de La Molina</Text>
              <Text fontWeight="medium">{formatSoles(totals.freight)}</Text>
            </Flex>
          )}
          <Flex justify="space-between" mb="1.5">
            <Text color="gray.700">I.G.V. (18%)</Text>
            <Text fontWeight="medium">{formatSoles(totals.igv)}</Text>
          </Flex>
          <Flex justify="space-between" align="baseline" pt="3" mt="2" borderTop="2px solid" borderColor="gray.900">
            <Text fontWeight="semibold">TOTAL (Efectivo / QR)</Text>
            <Text fontFamily="heading" fontWeight="700" fontSize="2xl" color="brand.coral">
              {formatSoles(totals.total)}
            </Text>
          </Flex>
          <Flex justify="space-between" mt="1" fontSize="xs" color="gray.600">
            <Text>Precio de lista (Tarjeta):</Text>
            <Text>{formatSoles(totals.listPrice)}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
