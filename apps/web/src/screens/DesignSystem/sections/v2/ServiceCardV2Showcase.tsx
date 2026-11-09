"use client";

/**
 * @file ServiceCardV2Showcase.tsx
 * @description Prototipo de rediseño de ServiceCard (solo en /design-system).
 * Compara la tarjeta real actual con la propuesta v2:
 * - Descripción con 2 líneas (sin recorte a 1 línea).
 * - Velo de lectura con tokens de Chakra (sin degradados ni rgba sueltos).
 * - Acción circular de 44px (targets táctiles).
 * - Foco de teclado visible en el enlace raíz (ring.primary).
 * - Hover de un solo gesto, active con escala y motion reducido respetado.
 */

import React from "react";
import RouterLink from "next/link";
import { Box, HStack, SimpleGrid, Text, VStack, Heading } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton, useImageReveal } from "@shared/components/Image/ImageReveal";
import { GLASS_FALLBACK_CSS, RESPONSIVE_GRIDS } from "@/shared/constants/layout";
import ServiceCard from "@/features/services/components/ServiceCard";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../../components";

/** Curva de desaceleración del sistema de movimiento de las cards. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export interface ServiceCardV2Props {
  image: string;
  name: string;
  category?: string;
  description?: string;
  plink: string;
  loading?: "lazy" | "eager";
}

/**
 * @component ServiceCardV2
 * @description Propuesta de tarjeta de servicio con fotografía protagonista.
 * El enlace raíz es el elemento `a` (display block) y recibe el foco visible.
 */
export const ServiceCardV2: React.FC<ServiceCardV2Props> = React.memo(
  ({ image, name, category, description, plink, loading = "lazy" }) => {
    const { loaded, onLoad: handleLoad, reveal } = useImageReveal();

    return (
      <Box
        asChild
        display="block"
        w="full"
        h={{ base: "280px", sm: "300px", md: "320px" }}
        borderRadius={{ base: "2xl", lg: "3xl" }}
        overflow="hidden"
        position="relative"
        isolation="isolate"
        transform="translateZ(0)"
        boxShadow="sm"
        bg="brand.navy"
        textDecoration="none"
        color="white"
        className="group"
        transition={`transform 0.6s ${EASE}, box-shadow 0.6s ${EASE}`}
        _hover={{ transform: "translateY(-4px) translateZ(0)", boxShadow: "cardLift" }}
        _active={{ transform: "scale(0.98)" }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "ring.primary",
          outlineOffset: "2px",
        }}
        _motionReduce={{ transition: "none", transform: "none" }}
      >
        <RouterLink href={plink} aria-label={`${name}: ver servicio`}>
          {/* Fotografía con revelado sincronizado */}
          <ImageRevealSkeleton loaded={loaded} />
          <Box position="absolute" inset={0} zIndex={0} borderRadius="inherit" overflow="hidden" {...reveal}>
            <ResponsiveImage
              src={image}
              alt={`Servicio de ${name} - GYA Glass & Aluminum`}
              w="full"
              h="full"
              objectFit="cover"
              loading={loading}
              onLoad={handleLoad}
              transition={`transform 0.55s ${EASE}`}
              _groupHover={{ transform: "scale(1.04)" }}
              _motionReduce={{ transition: "none", transform: "none" }}
            />
          </Box>

          {/* Badge de categoría en vidrio: texto blanco sobre velo blackAlpha.700 (≥ 8:1 sobre foto clara) */}
          {category && (
            <Box
              position="absolute"
              top={{ base: "3", md: "4" }}
              left={{ base: "3", md: "4" }}
              maxW="calc(100% - 24px)"
              zIndex={2}
              bg="blackAlpha.700"
              backdropFilter="blur(12px)"
              px="3"
              py="1"
              borderRadius="full"
              css={GLASS_FALLBACK_CSS}
            >
              <Text fontSize="xs" fontWeight="semibold" color="white" letterSpacing="0.12em" textTransform="uppercase" truncate>
                {category}
              </Text>
            </Box>
          )}

          {/* Panel de lectura inferior: velo plano tokenizado (sin degradado) */}
          <HStack
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            zIndex={2}
            p={{ base: "4", md: "5" }}
            justify="space-between"
            align="flex-end"
            gap="3"
            minW={0}
            bg="blackAlpha.800"
            backdropFilter="blur(8px)"
            css={GLASS_FALLBACK_CSS}
          >
            <VStack align="flex-start" gap="1" minW={0} flex="1">
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                color="white"
                fontWeight="semibold"
                letterSpacing="-0.02em"
                lineHeight="snug"
                lineClamp={2}
              >
                {name}
              </Heading>
              {description && (
                <Text fontSize="sm" color="whiteAlpha.900" lineHeight="normal" lineClamp={2}>
                  {description}
                </Text>
              )}
            </VStack>

            {/* Acción circular de 44px (target táctil mínimo) */}
            <Box
              boxSize="11"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="whiteAlpha.300"
              color="white"
              flexShrink={0}
              transition={`background-color 0.4s ${EASE}`}
              _groupHover={{ bg: "whiteAlpha.500" }}
              _motionReduce={{ transition: "none" }}
            >
              <Box as={ArrowUpRight} boxSize="5" style={{ flexShrink: 0 }} />
            </Box>
          </HStack>
        </RouterLink>
      </Box>
    );
  },
);

ServiceCardV2.displayName = "ServiceCardV2";

/** Datos idénticos a EditorialCardsShowcase.tsx para comparar ambas versiones. */
const SERVICES = [
  {
    name: "Ventanas de Aluminio",
    category: "Serie 62",
    description: "Aislamiento antirruido y térmico con perfiles de alta hermeticidad.",
    image: "/images/services-products-01.Ventanas-nova-a10.webp",
    plink: "/servicios/ventana",
  },
  {
    name: "Mamparas de Cristal",
    category: "Templado",
    description: "Apertura telescópica y perfiles anodizados de alta resistencia.",
    image: "/images/services-products-02.Mampara-save-mampara01.webp",
    plink: "/servicios/mampara",
  },
  {
    name: "Duchas & Baños",
    category: "Templado",
    description: "Sistemas corredizos y batientes con herrajes importados.",
    image: "/images/services-products-03.Ducha-ducha01.webp",
    plink: "/servicios/ducha",
  },
] as const;

/**
 * @component ServiceCardV2Showcase
 * @description Sección de comparación: tarjetas actuales (reales) frente a la propuesta v2.
 */
export const ServiceCardV2Showcase: React.FC = () => (
  <ShowcaseStack>
    <Box minW="0" maxW="100%" overflowWrap="break-word">
      <ShowcaseCard
        title="ServiceCard v2 — propuesta de rediseño"
        description="Comparación con la tarjeta actual: descripción completa en 2 líneas, velo de lectura tokenizado, acción de 44px y foco de teclado visible."
        badge="features/services"
      >
        <VStack align="stretch" gap={{ base: "5", md: "6" }}>
          <Box>
            <SubsectionLabel mb={{ base: "3", md: "4" }}>Actual</SubsectionLabel>
            <SimpleGrid columns={RESPONSIVE_GRIDS.cards} gap={{ base: "4", md: "6" }}>
              {SERVICES.map((service) => (
                <ServiceCard
                  key={`actual-${service.plink}`}
                  name={service.name}
                  category={service.category}
                  description={service.description}
                  image={service.image}
                  plink={service.plink}
                />
              ))}
            </SimpleGrid>
          </Box>

          <Box>
            <SubsectionLabel mb={{ base: "3", md: "4" }}>Propuesta v2</SubsectionLabel>
            <SimpleGrid columns={RESPONSIVE_GRIDS.cards} gap={{ base: "4", md: "6" }}>
              {SERVICES.map((service) => (
                <ServiceCardV2
                  key={`v2-${service.plink}`}
                  name={service.name}
                  category={service.category}
                  description={service.description}
                  image={service.image}
                  plink={service.plink}
                />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </ShowcaseCard>
    </Box>
  </ShowcaseStack>
);

export default ServiceCardV2Showcase;
