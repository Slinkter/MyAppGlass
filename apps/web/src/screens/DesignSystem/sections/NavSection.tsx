"use client";

/**
 * @file NavSection.tsx
 * @description Pestaña "Navegación y barras": barra de escritorio con solo cuatro enlaces (Inicio, Servicios, Proyectos,
 * Ubicación) y footer con los sitelinks. Decisión del dueño (2026-11-09): lo demás (Contacto, Mi cuenta, legal) vive en el footer.
 */

import React from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { glassSurface } from "@/shared/constants/glass";
import { companyData } from "@/shared/config/company-data";
import { ShowcaseCard, SubsectionLabel } from "../components";
import { BrandLockup, BrandMark } from "../components/BrandMark";

const NAV_ITEMS = ["Inicio", "Servicios", "Proyectos", "Ubicación"] as const;

/** Sitelinks del footer: rutas reales del sitio (docs/10_SEO_JERARQUIA.md). */
const SITELINKS = [
  { title: "Explorar", links: ["Inicio", "Servicios", "Proyectos", "Ubicación", "Contacto", "Mi cuenta"] },
  { title: "Servicios", links: ["Ventanas antirruido", "Mamparas de vidrio templado", "Barandas de vidrio y acero", "Techos de policarbonato", "Boxes y puertas de ducha"] },
  { title: "Herramientas", links: ["Cotizador de presupuestos", "Blog técnico", "Simulador visual"] },
  { title: "Corporativo", links: ["Políticas de la empresa", "Cuentas bancarias", "Libro de reclamaciones"] },
] as const;

const DesktopNav: React.FC = () => (
  <Box p={{ base: "4", md: "6" }} bg="bg.subtle" borderRadius="modal">
    <HStack justify="space-between" gap="3" px="4" py="2" borderRadius="full" maxW="pageDefault" mx="auto" {...glassSurface}>
      <HStack gap="2.5" flex="1 1 0">
        <BrandMark size="9" />
        <VStack align="flex-start" gap="0" lineHeight="1.1" display={{ base: "none", sm: "flex" }}>
          <Text fontSize="xs" fontWeight="bold" letterSpacing="label" textTransform="uppercase" color="text.muted">
            Vidriería &amp; Aluminio
          </Text>
          <Text fontFamily="heading" fontWeight="700" fontSize="sm" color="text.heading">
            Glass &amp; Aluminum Company
          </Text>
        </VStack>
      </HStack>
      <HStack as="nav" aria-label="Principal" gap="1" display={{ base: "none", md: "flex" }}>
        {NAV_ITEMS.map((item, i) => (
          <Box
            key={item}
            as="span"
            px="5"
            minH="11"
            display="inline-flex"
            alignItems="center"
            borderRadius="full"
            fontSize="sm"
            fontWeight="600"
            bg={i === 0 ? "brand.ink" : "transparent"}
            color={i === 0 ? "white" : "text.heading"}
            _hover={i === 0 ? undefined : { bg: "bg.subtle" }}
            aria-current={i === 0 ? "page" : undefined}
          >
            {item}
          </Box>
        ))}
      </HStack>
      <HStack gap="2" flex="1 1 0" justify="flex-end">
        <Button variant="whatsapp" size="sm" aria-label={`Escribir por WhatsApp al ${companyData.whatsappDisplay}`}>
          <Phone size={16} aria-hidden="true" />
          <Box as="span" display={{ base: "none", sm: "inline" }}>{companyData.whatsappDisplay}</Box>
        </Button>
      </HStack>
    </HStack>
  </Box>
);

const SitelinksFooter: React.FC = () => (
  <Box bg="brand.ink" color="white" borderRadius="modal" p={{ base: "6", md: "10" }}>
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap="8">
      <VStack align="flex-start" gap="4" gridColumn={{ lg: "span 1" }}>
        <BrandLockup tone="white" onDark size="12" />
        <Text fontSize="sm" color="whiteAlpha.800" lineHeight="body">
          Confianza sólida en cada estructura.
        </Text>
      </VStack>
      {SITELINKS.map((g) => (
        <VStack key={g.title} align="flex-start" gap="2">
          <Text fontSize="xs" fontWeight="bold" letterSpacing="label" textTransform="uppercase" color="whiteAlpha.700">
            {g.title}
          </Text>
          {g.links.map((l) => (
            <Text key={l} fontSize="sm" color="whiteAlpha.900">
              {l}
            </Text>
          ))}
        </VStack>
      ))}
    </SimpleGrid>
    <HStack mt="8" pt="4" borderTopWidth="1px" borderColor="whiteAlpha.300" justify="space-between" wrap="wrap" gap="2" fontSize="xs" color="whiteAlpha.700">
      <Text>{companyData.razonSocial} · RUC {companyData.ruc}</Text>
      <Text>{companyData.direccion} · Lunes a sábado, 8:00 a 18:00</Text>
    </HStack>
  </Box>
);

export const NavSection: React.FC = () => (
  <VStack align="stretch" gap={{ base: "8", md: "12" }}>
    <ShowcaseCard
      title="Barra de escritorio"
      description="Píldora flotante de vidrio con solo cuatro enlaces: Inicio, Servicios, Proyectos y Ubicación. El item activo va en negro con aria-current. El botón de WhatsApp es la única acción; Contacto, Mi cuenta y lo demás se registran en los sitelinks del footer."
    >
      <VStack align="stretch" gap="3">
        <SubsectionLabel>Escritorio · glass, items de 44 px</SubsectionLabel>
        <DesktopNav />
      </VStack>
    </ShowcaseCard>
    <ShowcaseCard title="Footer con sitelinks" description="Cuatro columnas con las rutas de la jerarquía SEO. Datos de empresa solo desde companyData; el horario se escribe aquí porque companyData todavía no lo tiene (pendiente).">
      <SitelinksFooter />
    </ShowcaseCard>
  </VStack>
);
