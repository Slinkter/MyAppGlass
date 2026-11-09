"use client";

/**
 * @file PaperToneShowcase.tsx
 * @description Comparador del tono de papel cálido (decisión abierta de BRAND-KIT §12):
 * #F7F6F3 (manual v2) frente a #FBF8F3 (tema actual `bg.paper`). Muestra el mismo contenido
 * sobre cada tono: texto, tarjeta blanca, barra de vidrio y chip. Los dos hex son constantes
 * con nombre porque la comparación exige valores literales (excepción documentada a R1).
 */

import React from "react";
import { Box, SimpleGrid, Text, VStack, HStack, Heading } from "@chakra-ui/react";
import { glassSurface } from "@/shared/constants/glass";
import { ShowcaseCard } from "../../components";

const PAPER_V2 = "#F7F6F3";
const PAPER_THEME = "#FBF8F3";

interface SampleProps {
  name: string;
  hex: string;
}

const Sample: React.FC<SampleProps> = ({ name, hex }) => (
  <Box borderRadius="2xl" borderWidth="1px" borderColor="border.default" overflow="hidden" minW="0">
    <VStack align="stretch" gap="4" p={{ base: "4", md: "6" }} style={{ backgroundColor: hex }} color="#111111">
      <HStack justify="space-between" wrap="wrap" gap="2">
        <Text fontSize="xs" fontWeight="semibold" letterSpacing="0.14em" textTransform="uppercase" color="#4A4A4A">
          {name}
        </Text>
        <Text fontSize="xs" fontFamily="mono" color="#4A4A4A">
          {hex}
        </Text>
      </HStack>

      <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} color="#002060" lineHeight="1.15">
        Confianza sólida en cada estructura
      </Heading>
      <Text fontSize="sm" color="#4A4A4A" lineHeight="1.6">
        Ventanas antirruido, mamparas y techos con instalación y garantía. Visita técnica sin costo.
      </Text>

      <HStack gap="2" wrap="wrap" {...glassSurface} color="text.body" borderRadius="full" p="2" w="fit-content" maxW="full">
        <Box px="3" py="2" borderRadius="full" bg="brand.navy" color="white" fontSize="sm" fontWeight="semibold">
          Inicio
        </Box>
        <Box px="3" py="2" fontSize="sm">
          Servicios
        </Box>
        <Box px="3" py="2" fontSize="sm">
          Proyectos
        </Box>
      </HStack>

      <Box bg="white" borderWidth="1px" borderColor="#E6E3DE" borderRadius="xl" p="4">
        <Text fontWeight="semibold" fontSize="sm">
          Tarjeta blanca sobre el papel
        </Text>
        <Text fontSize="xs" color="#4A4A4A" mt="1">
          El contraste entre papel y tarjeta define cuánto «flota» el contenido.
        </Text>
      </Box>
    </VStack>
  </Box>
);

export const PaperToneShowcase: React.FC = () => (
  <ShowcaseCard
    title="Decidido · tono del papel: A (#F7F6F3)"
    description="El dueño eligió el tono A (#F7F6F3, ahora en el token bg.paper). Se conserva la comparación como referencia."
    badge="Decidido"
  >
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      <Sample name="A · Elegido" hex={PAPER_V2} />
      <Sample name="B · Descartado" hex={PAPER_THEME} />
    </SimpleGrid>
  </ShowcaseCard>
);

export default PaperToneShowcase;
