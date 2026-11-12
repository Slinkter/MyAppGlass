"use client";

import React from "react";
import { Box, HStack, SimpleGrid, Table, Text, VStack } from "@chakra-ui/react";
import { Building2, Calendar, Home, MapPin } from "lucide-react";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import {
  ARCH_BORDER,
  ARCH_SURFACE,
  ARCH_TEXT,
  FIREBASE_PROJECTS,
  LIMA_TOP_DISTRICTS,
  OFFICIAL_SYSTEMS_CATALOG,
} from "../components/architecturalTokens";

const DOSSIER_SPECS = [
  { icon: Home, label: "PROYECTO", value: `Edificio ${FIREBASE_PROJECTS.palmer.name}` },
  { icon: Building2, label: "TIPOLOGÍA", value: FIREBASE_PROJECTS.palmer.typology },
  { icon: MapPin, label: "UBICACIÓN", value: `${FIREBASE_PROJECTS.palmer.district} · ${FIREBASE_PROJECTS.palmer.coordinates}` },
  { icon: Calendar, label: "ENTREGA", value: FIREBASE_PROJECTS.palmer.year },
] as const;

export const DataV2Section: React.FC = () => (
  <VStack align="stretch" gap={6}>
    <SectionHeaderV2
      code="06 · Fichas Técnicas & Catálogo Oficial"
      title="Matriz de los 6 Sistemas & Cobertura Lima Top"
      description="Especificación tabular sin ambigüedad: los 6 sistemas vigentes de aluminio y PVC, sus vidrios (Crudo, Laminado, Templado), colores oficiales y coordenadas de atención."
      spec="TABULAR-NUMS · 6 SISTEMAS"
    />

    {/* 4-Cell Hairline Dossier Strip */}
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.steel}>
      {DOSSIER_SPECS.map((item, idx) => {
        const IconComp = item.icon;
        return (
          <Box
            key={item.label}
            p={5}
            borderBottom={{ base: idx < DOSSIER_SPECS.length - 1 ? "1px solid" : "none", lg: "none" }}
            borderRight={{ sm: idx % 2 === 0 ? "1px solid" : "none", lg: idx < DOSSIER_SPECS.length - 1 ? "1px solid" : "none" }}
            borderColor={ARCH_BORDER.hairline}
          >
            <HStack gap={2} color="brand.coral" mb={2}>
              <IconComp size={15} aria-hidden="true" />
              <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em">
                {item.label}
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="700" color={ARCH_TEXT.onDarkPrimary} fontVariantNumeric="tabular-nums">
              {item.value}
            </Text>
          </Box>
        );
      })}
    </SimpleGrid>

    {/* Official 6-System Matrix Table */}
    <Box border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.graphite} overflowX="auto">
      <HStack
        justify="space-between"
        px={5}
        py={3}
        bg={ARCH_SURFACE.steel}
        borderBottom="1px solid"
        borderColor={ARCH_BORDER.hairline}
      >
        <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onDarkPrimary}>
          CATÁLOGO OFICIAL DE VENTANAS Y MAMPARAS (06 SISTEMAS)
        </Text>
        <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
          ADICIONALES: ARENADO · DISEÑO SEGÚN CLIENTE
        </Text>
      </HStack>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={ARCH_SURFACE.panel} borderBottom="1px solid" borderColor={ARCH_BORDER.hairline}>
            <Table.ColumnHeader fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} py={3}>CÓDIGO</Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} py={3}>SISTEMA</Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} py={3}>TIPOLOGÍA</Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} py={3}>VIDRIO</Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} py={3}>ALUMINIO / ACABADO</Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} py={3}>DESEMPEÑO</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {OFFICIAL_SYSTEMS_CATALOG.map((row) => (
            <Table.Row key={row.code} borderBottom="1px solid" borderColor={ARCH_BORDER.hairline}>
              <Table.Cell fontFamily="mono" fontSize="xs" color="brand.coral" fontWeight="700" fontVariantNumeric="tabular-nums">
                {row.code}
              </Table.Cell>
              <Table.Cell fontWeight="700" color={ARCH_TEXT.onDarkPrimary}>{row.name}</Table.Cell>
              <Table.Cell fontSize="xs" color={ARCH_TEXT.onDarkMuted}>{row.typology}</Table.Cell>
              <Table.Cell fontSize="xs" color={ARCH_TEXT.onDarkPrimary}>{row.glass}</Table.Cell>
              <Table.Cell fontSize="xs" color={ARCH_TEXT.onDarkMuted}>{row.aluminum}</Table.Cell>
              <Table.Cell fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkPrimary}>{row.acoustic}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>

    {/* Concrete Contrast Coverage Table: 5 Official Districts */}
    <Box
      bg={ARCH_SURFACE.concrete}
      color={ARCH_TEXT.onConcretePrimary}
      border="1px solid"
      borderColor={ARCH_BORDER.concreteHairline}
      p={{ base: 4, md: 6 }}
    >
      <HStack justify="space-between" pb={3} mb={4} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
        <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onConcreteMuted}>
          ZONA DE COBERTURA OFICIAL · LIMA TOP
        </Text>
        <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>
          COLORES DE VIDRIO: INCOLORO · BRONCE · GRIS
        </Text>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 5 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
        {LIMA_TOP_DISTRICTS.map((d, idx) => (
          <Box
            key={d.name}
            p={3.5}
            borderRight={{ md: idx < LIMA_TOP_DISTRICTS.length - 1 ? "1px solid" : "none" }}
            borderBottom={{ base: idx < LIMA_TOP_DISTRICTS.length - 1 ? "1px solid" : "none", md: "none" }}
            borderColor={ARCH_BORDER.concreteHairline}
          >
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted} fontVariantNumeric="tabular-nums">
              0{idx + 1}
            </Text>
            <Text fontFamily="heading" fontWeight="700" fontSize="md" mt={1}>
              {d.name}
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted} mt={1} fontVariantNumeric="tabular-nums">
              {d.coords}
            </Text>
            <Text fontSize="xs" color={ARCH_TEXT.onConcreteMuted} mt={1.5}>
              {d.scope}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  </VStack>
);
