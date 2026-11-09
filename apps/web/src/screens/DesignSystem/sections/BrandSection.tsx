"use client";

/**
 * @file ProposalBrand.tsx
 * @description Propuesta UI · Marca: lo que el manual v1.0 y el brand kit definen (logo, color, tipografía, voz,
 * fotografía, botones y campos), construido con los componentes y tokens reales del proyecto.
 */

import React from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShowcaseCard, SubsectionLabel } from "../components";
import { BrandLockup, BrandMark } from "../components/BrandMark";

/* ---------- Logo ---------- */
const LogoBlock: React.FC = () => (
  <VStack align="stretch" gap="8">
    <VStack align="stretch" gap="3">
      <SubsectionLabel>Lockup horizontal · propuesta (el archivo aún no existe)</SubsectionLabel>
      <Box p={{ base: "6", md: "10" }} borderWidth="1px" borderColor="border.subtle" borderRadius="card" bg="bg.page">
        <BrandLockup size="16" />
      </Box>
    </VStack>

    <VStack align="stretch" gap="3">
      <SubsectionLabel>Versiones del símbolo · color, un solo color y fondo oscuro</SubsectionLabel>
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4">
        {[
          { label: "Coral · versión principal", tone: "coral" as const, bg: "bg.page", border: true },
          { label: "Negro · sellos, facturas, grabado", tone: "ink" as const, bg: "bg.page", border: true },
          { label: "Blanco · fondos oscuros", tone: "white" as const, bg: "brand.ink", border: false },
        ].map((v) => (
          <VStack key={v.label} align="stretch" gap="2">
            <Box
              h="40"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={v.bg}
              borderRadius="card"
              borderWidth={v.border ? "1px" : "0"}
              borderColor="border.subtle"
            >
              <BrandMark tone={v.tone} size="20" />
            </Box>
            <Text fontSize="sm" color="text.muted">
              {v.label}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>

    <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
      <VStack align="stretch" gap="3">
        <SubsectionLabel>Área de respeto · un cuarto del ancho del símbolo</SubsectionLabel>
        <Box borderWidth="1px" borderStyle="dashed" borderColor="border.default" borderRadius="card" p="4" display="inline-flex" alignSelf="flex-start">
          <Box borderWidth="1px" borderStyle="dashed" borderColor="border.subtle" p="5">
            <BrandMark size="20" />
          </Box>
        </Box>
        <Text fontSize="sm" color="text.muted" maxW="pageNarrow">
          Tamaño mínimo: 24 px en pantalla y 10 mm impreso. El símbolo y el texto no se separan en piezas formales.
        </Text>
      </VStack>
      <VStack align="stretch" gap="3">
        <SubsectionLabel>Usos prohibidos</SubsectionLabel>
        <SimpleGrid columns={3} gap="3">
          {[
            { label: "No deformar", style: { transform: "scaleX(1.5)" } },
            { label: "No girar", style: { transform: "rotate(25deg)" } },
            { label: "No cambiar el color", style: { filter: "hue-rotate(200deg)" } },
          ].map((u) => (
            <VStack key={u.label} gap="2">
              <Box position="relative" h="20" w="full" display="flex" alignItems="center" justifyContent="center" borderWidth="1px" borderColor="border.subtle" borderRadius="card" overflow="hidden">
                <Box style={u.style}>
                  <BrandMark size="10" />
                </Box>
                <Box position="absolute" top="1.5" right="1.5" color="text.heading" aria-hidden="true">
                  <X size={16} />
                </Box>
              </Box>
              <Text fontSize="xs" color="text.muted" textAlign="center">
                {u.label}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </SimpleGrid>
  </VStack>
);

/* ---------- Color ---------- */
const SWATCHES = [
  { name: "Negro de marca", token: "brand.ink", value: "#111111", use: "Texto, títulos y botón principal", on: "white" },
  { name: "Blanco", token: "bg.page", value: "#FFFFFF", use: "Fondo de página y de tarjetas", on: "text.heading", line: true },
  { name: "Coral", token: "brand.coral", value: "#FF5A5F", use: "Único acento: logo, una palabra de título y «PRESUPUESTO». Solo texto grande (3,0:1 sobre blanco)", on: "white" },
  { name: "Verde WhatsApp", token: "brand.whatsappAccessible", value: "#15803D", use: "Solo botones y accesos a WhatsApp (5:1 con texto blanco)", on: "white" },
] as const;

const ColorBlock: React.FC = () => (
  <VStack align="stretch" gap="6">
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
      {SWATCHES.map((s) => (
        <VStack key={s.name} align="stretch" gap="2">
          <Box
            h="28"
            borderRadius="card"
            bg={s.token}
            borderWidth={"line" in s ? "1px" : "0"}
            borderColor="border.subtle"
            p="3"
            display="flex"
            alignItems="flex-end"
            color={s.on}
          >
            <Text fontSize="sm" fontWeight="700">
              {s.value}
            </Text>
          </Box>
          <Text fontWeight="600" color="text.heading">
            {s.name}
          </Text>
          <Text fontSize="sm" color="text.muted">
            {s.use}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
    <HStack gap="3" align="flex-start" p="4" borderWidth="1px" borderColor="border.subtle" borderRadius="card">
      <Box mt="0.5" color="text.heading" flexShrink={0}>
        <Check size={18} aria-hidden="true" />
      </Box>
      <Text fontSize="sm" color="text.muted" lineHeight="body">
        Regla del acento: una sola palabra coral por pantalla, solo en títulos de 24 px o más en peso 700 (o 19 px o más en 700). Sobre negro el coral llega a 6,1:1. En texto pequeño, botones e íconos se usa negro.
      </Text>
    </HStack>
  </VStack>
);

/* ---------- Tipografía ---------- */
const TYPE_ROWS = [
  { label: "Display · Lora 700 · 60/48/36 px", sample: "Ventanas a su medida", fontSize: { base: "3xl", md: "6xl" }, serif: true },
  { label: "Título de sección · Lora 700 · 48/36/30 px", sample: "Proyectos entregados", fontSize: { base: "2xl", md: "5xl" }, serif: true },
  { label: "Título de tarjeta · Lora 700 · 24 px", sample: "Mampara corrediza de aluminio", fontSize: "2xl", serif: true },
  { label: "Texto · Inter 400 · 16 px", sample: "Medimos, ensamblamos en nuestro taller e instalamos con equipo propio.", fontSize: "md", serif: false },
] as const;

const TypeBlock: React.FC = () => (
  <VStack align="stretch" gap="5">
    {TYPE_ROWS.map((r) => (
      <VStack key={r.label} align="stretch" gap="1" pb="4" borderBottomWidth="1px" borderColor="border.subtle">
        <Text fontSize="xs" fontWeight="bold" letterSpacing="label" textTransform="uppercase" color="text.muted">
          {r.label}
        </Text>
        <Text
          fontFamily={r.serif ? "heading" : "body"}
          fontWeight={r.serif ? "700" : "400"}
          fontSize={r.fontSize}
          lineHeight={r.serif ? "display" : "body"}
          color="text.heading"
        >
          {r.sample}
        </Text>
      </VStack>
    ))}
    <Text fontSize="sm" color="text.muted">
      Lora solo en 700; Inter de 400 a 700. Montos y medidas con cifras tabulares y la unidad visible: <Box as="span" css={{ fontVariantNumeric: "tabular-nums" }} color="text.heading" fontWeight="600">1 400 × 1 200 mm · S/ 1 176</Box>
    </Text>
  </VStack>
);

/* ---------- Voz ---------- */
const VOICE = [
  ["Vamos a su obra, medimos sin costo y le enviamos el presupuesto por WhatsApp.", "¡¡Cotiza YA con los mejores!!"],
  ["Ventana corrediza Serie 25, aluminio negro, vidrio laminado de 6 mm.", "Ventanas de última generación con tecnología de punta."],
  ["Reducción de ruido referencial: 50 %.", "Elimina el ruido por completo."],
  ["Ensamblamos en nuestro taller de La Molina.", "Fabricamos con los más altos estándares."],
] as const;

const VoiceBlock: React.FC = () => (
  <VStack align="stretch" gap="4">
    <Text color="text.muted" maxW="pageNarrow" lineHeight="body">
      Técnica, cercana y profesional. Trato de usted siempre. Sin exclamaciones en cadena ni emojis.
    </Text>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      <VStack align="stretch" gap="3">
        <Badge variant="chipSuccess">Hacer</Badge>
        {VOICE.map(([good]) => (
          <Box key={good} p="4" borderWidth="1px" borderColor="border.subtle" borderRadius="card">
            <Text fontSize="sm" color="text.heading" lineHeight="body">
              {good}
            </Text>
          </Box>
        ))}
      </VStack>
      <VStack align="stretch" gap="3">
        <Badge variant="chipDanger">No hacer</Badge>
        {VOICE.map(([, bad]) => (
          <Box key={bad} p="4" borderWidth="1px" borderColor="border.subtle" borderRadius="card">
            <Text fontSize="sm" color="text.muted" lineHeight="body" textDecoration="line-through">
              {bad}
            </Text>
          </Box>
        ))}
      </VStack>
    </SimpleGrid>
  </VStack>
);

export const BrandSection: React.FC = () => (
  <VStack align="stretch" gap={{ base: "8", md: "12" }}>
    <ShowcaseCard title="Logo" description="Del manual §7.1 y el brand kit: lockup horizontal propuesto, versiones de color, área de respeto y usos prohibidos. El símbolo es el del archivo vectorial del dueño.">
      <LogoBlock />
    </ShowcaseCard>
    <ShowcaseCard title="Color" description="Cuatro colores. El coral es el único acento y solo en texto grande; el negro es el protagonista.">
      <ColorBlock />
    </ShowcaseCard>
    <ShowcaseCard title="Tipografía" description="Lora 700 para títulos e Inter para todo lo demás.">
      <TypeBlock />
    </ShowcaseCard>
    <ShowcaseCard title="Voz" description="Cómo suena la empresa: la del maestro de taller que sabe y explica claro.">
      <VoiceBlock />
    </ShowcaseCard>
  </VStack>
);
