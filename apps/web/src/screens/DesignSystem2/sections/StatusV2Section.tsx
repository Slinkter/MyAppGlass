"use client";

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Skeleton, Text, VStack } from "@chakra-ui/react";
import { CheckCircle2, Clock, Ruler, ShieldCheck } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT } from "../components/architecturalTokens";

const STATUS_PLATES = [
  {
    code: "EST-01",
    label: "Obra Entregada",
    detail: "Conformidad firmada y garantía de 3 meses activa",
    icon: CheckCircle2,
    dotColor: "status.successText",
  },
  {
    code: "EST-02",
    label: "En Instalación",
    detail: "2 cuadrillas técnicas operando en Lima Top",
    icon: Clock,
    dotColor: "status.warningText",
  },
  {
    code: "EST-03",
    label: "Visita Técnica",
    detail: "Medición exacta en obra sin costo",
    icon: Ruler,
    dotColor: "status.infoText",
  },
  {
    code: "EST-04",
    label: "Boleta o Factura",
    detail: `Empresa formal · RUC ${companyData.ruc}`,
    icon: ShieldCheck,
    dotColor: "brand.coral",
  },
] as const;

export const StatusV2Section: React.FC = () => (
  <VStack align="stretch" gap={6}>
    <SectionHeaderV2
      code="07 · Estados Operativos & Estructura"
      title="Indicadores de Obra y Capacidad Instalada"
      description="Placas de estado sólidas con código técnico, wireframe de carga calibrado y datos reales de operación de Glass & Aluminum Company S.A.C."
      spec="CONTRASTE WCAG AA · OPERACIÓN 2021"
    />

    {/* 4-column Architectural Status Plates */}
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.steel}>
      {STATUS_PLATES.map((plate, idx) => {
        const IconComp = plate.icon;
        return (
          <Box
            key={plate.code}
            p={5}
            borderBottom={{ base: idx < STATUS_PLATES.length - 1 ? "1px solid" : "none", lg: "none" }}
            borderRight={{ sm: idx % 2 === 0 ? "1px solid" : "none", lg: idx < STATUS_PLATES.length - 1 ? "1px solid" : "none" }}
            borderColor={ARCH_BORDER.hairline}
          >
            <HStack justify="space-between" mb={4}>
              <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
                {plate.code}
              </Text>
              <Box color={plate.dotColor}>
                <IconComp size={16} aria-hidden="true" />
              </Box>
            </HStack>
            <HStack gap={2} mb={1.5}>
              <Box w="8px" h="8px" borderRadius="full" bg={plate.dotColor} flexShrink={0} />
              <Text fontWeight="700" fontSize="sm" color={ARCH_TEXT.onDarkPrimary}>
                {plate.label}
              </Text>
            </HStack>
            <Text fontSize="xs" color={ARCH_TEXT.onDarkMuted} lineHeight="1.5">
              {plate.detail}
            </Text>
          </Box>
        );
      })}
    </SimpleGrid>

    {/* 12-Col Split: Calibrated Skeleton + Operational Profile (Concrete Contrast) */}
    <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
      <Box
        gridColumn={{ lg: "span 5" }}
        p={{ base: 5, md: 7 }}
        bg={ARCH_SURFACE.graphite}
        borderBottom={{ base: "1px solid", lg: "none" }}
        borderRight={{ lg: "1px solid" }}
        borderColor={ARCH_BORDER.hairline}
      >
        <HStack justify="space-between" mb={4}>
          <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} letterSpacing="0.16em">
            SKELETON DE LÁMINA DE PROYECTO
          </Text>
          <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkSubtle} fontVariantNumeric="tabular-nums">
            4:3
          </Text>
        </HStack>
        <VStack align="stretch" gap={3}>
          <Skeleton h="150px" borderRadius="xs" bg={ARCH_SURFACE.panel} />
          <Skeleton h="18px" w="65%" borderRadius="xs" bg={ARCH_SURFACE.panel} />
          <Skeleton h="14px" w="42%" borderRadius="xs" bg={ARCH_SURFACE.panel} />
        </VStack>
      </Box>

      <Box
        gridColumn={{ lg: "span 7" }}
        p={{ base: 5, md: 7 }}
        bg={ARCH_SURFACE.concrete}
        color={ARCH_TEXT.onConcretePrimary}
      >
        <HStack justify="space-between" pb={3} mb={4} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
          <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onConcreteMuted}>
            RESPALDO OPERATIVO · {companyData.razonSocial}
          </Text>
          <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted} fontVariantNumeric="tabular-nums">
            DESDE 2021
          </Text>
        </HStack>

        <Heading fontFamily="heading" size="xl" mb={3}>
          Taller grande, showroom y equipo técnico propio
        </Heading>
        <Text fontSize="sm" color={ARCH_TEXT.onConcreteMuted} lineHeight="1.65" mb={5}>
          Operamos desde {companyData.direccion} con equipo integrado por 1 asesor comercial, 2 técnicos especialistas
          en instalación y 1 contador. Emitimos boleta o factura y atendemos proyectos exclusivamente en La Molina, Surco,
          San Borja, San Isidro y Miraflores.
        </Text>

        <SimpleGrid columns={3} gap={0} border="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
          <Box p={3} borderRight="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>EQUIPO</Text>
            <Text fontFamily="mono" fontSize="sm" fontWeight="700" fontVariantNumeric="tabular-nums">04 personas</Text>
          </Box>
          <Box p={3} borderRight="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>GARANTÍA</Text>
            <Text fontFamily="mono" fontSize="sm" fontWeight="700" fontVariantNumeric="tabular-nums">03 meses</Text>
          </Box>
          <Box p={3}>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>HORARIO</Text>
            <Text fontFamily="mono" fontSize="sm" fontWeight="700" fontVariantNumeric="tabular-nums">08:00–18:00</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  </VStack>
);
