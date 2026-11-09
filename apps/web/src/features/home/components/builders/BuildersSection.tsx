"use client";

/**
 * @file BuildersSection.tsx
 * @description Sección "Para constructoras e inmobiliarias" (audiencia principal, PRODUCT.md).
 * Solo afirmaciones respaldadas; capacidad, plazos y series quedan como marcador visible.
 * @module home/components
 */

import React from "react";
import { Box, Container, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { ClipboardList, Hammer, MessageCircle, ReceiptText, ShieldCheck, Ruler } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";

interface BuilderBlock {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BLOCKS: BuilderBlock[] = [
  {
    icon: ClipboardList,
    title: "Partida de carpintería de aluminio y vidrio",
    description: "Ventanas, mamparas, duchas y techos para tu obra, en una sola partida.",
  },
  {
    icon: Ruler,
    title: "Visita técnica sin costo",
    description: "Medimos en obra y te enviamos el presupuesto por WhatsApp.",
  },
  {
    icon: Hammer,
    title: "Ensamblaje en taller e instalación en obra",
    description: "Ensamblamos en nuestro taller de La Molina e instalamos con nuestro propio equipo.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de 3 meses",
    description: "Cubre todos los productos instalados.",
  },
  {
    icon: ReceiptText,
    title: "Boleta o factura electrónica",
    description: "La emitimos al realizar el pago.",
  },
];

const QUOTE_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
  "Hola, quisiera cotizar una partida de carpintería de aluminio y vidrio para una obra.",
)}`;

const BuildersSection: React.FC = React.memo(() => (
  <Container maxW="pageDefault" px={{ base: 4, sm: 6, md: 8 }}>
    <Box textAlign="center" mb={{ base: "8", md: "12" }}>
      <Heading
        as="h2"
        fontFamily="heading"
        fontWeight="700"
        letterSpacing="-0.02em"
        lineHeight="1.1"
        color="text.heading"
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
      >
        Para constructoras e inmobiliarias
      </Heading>
      <Text mt="4" mx="auto" maxW="2xl" color="text.muted" fontSize={{ base: "md", md: "lg" }}>
        Cotiza la partida de carpintería de aluminio y vidrio de tu obra con un solo proveedor.
      </Text>
    </Box>

    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "4", md: "6" }}>
      {BLOCKS.map(({ icon: Icon, title, description }) => (
        <Flex
          key={title}
          gap="4"
          align="flex-start"
          p={{ base: "5", md: "6" }}
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="card"
        >
          <Flex flexShrink={0} boxSize="11" align="center" justify="center" borderRadius="lg" bg="bg.tint" color="text.heading">
            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
          </Flex>
          <Box minW="0">
            <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="lg" lineHeight="1.2" color="text.heading">
              {title}
            </Heading>
            <Text mt="2" fontSize="sm" color="text.muted" lineHeight="1.5">
              {description}
            </Text>
          </Box>
        </Flex>
      ))}

      {/* Marcador: datos que se confirman por proyecto, no se inventan */}
      <Flex
        direction="column"
        gap="3"
        align="flex-start"
        p={{ base: "5", md: "6" }}
        bg="bg.subtle"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="border.warm"
        borderRadius="card"
      >
        <Text fontSize="xs" fontWeight="700" letterSpacing="0.14em" textTransform="uppercase" color="text.muted">
          Por confirmar
        </Text>
        <Text fontSize="md" fontWeight="600" color="text.heading" lineHeight="1.4">
          Capacidad, plazos y series: se confirman por proyecto.
        </Text>
        <Button asChild variant="outline" minH="11">
          <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
            Consultar por WhatsApp
          </a>
        </Button>
      </Flex>
    </SimpleGrid>

    <Flex justify="center" mt={{ base: "8", md: "10" }}>
      <Button asChild variant="whatsapp" size="lg" minH="11">
        <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          Cotizar partida por WhatsApp
        </a>
      </Button>
    </Flex>
  </Container>
));

BuildersSection.displayName = "BuildersSection";

export default BuildersSection;
