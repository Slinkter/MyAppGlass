"use client";

/**
 * @file MediaCard.tsx
 * @description Tarjeta con fotografía protagonista: foto, degradado de lectura, badge de vidrio,
 * título, descripción y acción circular. Base compartida de ServiceCard y ProjectCardContent.
 * El elemento raíz lo decide el consumidor vía `rootProps` (enlace o botón).
 */

import React from "react";
import { Box, Heading, Text, VStack, HStack, type BoxProps } from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton } from "@shared/components/Image/ImageReveal";
import { useImageReveal } from "@shared/components/Image/useImageReveal";
import { glassLightOnPhoto } from "@/shared/constants/glass";

/** Curva de desaceleración suave del sistema de movimiento de las cards. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export interface MediaCardProps {
  image: string;
  imageAlt: string;
  /** Contenido del badge superior (texto o texto con icono). */
  badge?: React.ReactNode;
  title: string;
  /** Línea secundaria bajo el título. */
  description?: React.ReactNode;
  /** Icono de la acción circular inferior (se omite si la tarjeta no tiene destino). */
  actionIcon?: React.ElementType;
  loading?: "lazy" | "eager";
  isLCP?: boolean;
  /** Props del elemento raíz (p. ej. `role`, `onClick`, `onKeyDown`, `tabIndex`). */
  rootProps?: BoxProps;
}

/** Cambios de movimiento compartidos: un solo gesto en hover, sin rebotes. */
const cardMotion = {
  transition: `transform 0.35s ${EASE}, box-shadow 0.35s ${EASE}`,
  _hover: { transform: "translateY(-4px) translateZ(0)", boxShadow: "cardLift" },
  _active: { transform: "scale(0.98) translateZ(0)" },
  _motionReduce: { transition: "none", transform: "none" },
} as const;

/**
 * @component MediaCard
 * @description Presentational card: la foto y los textos se revelan juntos al cargar la imagen.
 */
export const MediaCard: React.FC<MediaCardProps> = React.memo(
  ({ image, imageAlt, badge, title, description, actionIcon, loading = "lazy", isLCP = false, rootProps }) => {
    const { loaded, onLoad: handleLoad, reveal } = useImageReveal();

    return (
      <Box
        className="group"
        w="full"
        h={{ base: "260px", sm: "280px", md: "310px" }}
        borderRadius="card"
        overflow="hidden"
        position="relative"
        isolation="isolate"
        transform="translateZ(0)"
        boxShadow="none"
        bg="brand.ink"
        {...cardMotion}
        {...rootProps}
      >
        {/* Fotografía: recorte heredado del contenedor para que las esquinas nunca se vean */}
        <ImageRevealSkeleton loaded={loaded} />
        <Box position="absolute" inset={0} zIndex={0} borderRadius="inherit" overflow="hidden" {...reveal}>
          <ResponsiveImage
            src={image}
            alt={imageAlt}
            w="full"
            h="full"
            objectFit="cover"
            loading={loading}
            isLCP={isLCP}
            onLoad={handleLoad}
            transition={`transform 0.55s ${EASE}`}
            _groupHover={{ transform: "scale(1.04)" }}
            _motionReduce={{ transition: "none", transform: "none" }}
          />
        </Box>

        {/* Anillo de borde: define el contorno y oculta cualquier fleco en las esquinas */}
        <Box
          position="absolute"
          inset={0}
          zIndex={3}
          pointerEvents="none"
          borderRadius="inherit"
          border="1px solid"
          borderColor="border.default"
          opacity={0.35}
        />

        {/* Badge de vidrio superior */}
        {badge && (
          <Box
            position="absolute"
            top={{ base: "3", md: "4" }}
            left={{ base: "3", md: "4" }}
            maxW="calc(100% - 24px)"
            zIndex={2}
            px="3"
            py="1"
            borderRadius="full"
            color="gray.900"
            {...glassLightOnPhoto}
          >
            {badge}
          </Box>
        )}

        {/* Leyenda de vidrio flotante: texto blanco ≥ 5,7:1 incluso sobre una foto blanca */}
        <HStack
          position="absolute"
          bottom={{ base: "2", md: "3" }}
          left={{ base: "2", md: "3" }}
          right={{ base: "2", md: "3" }}
          zIndex={2}
          borderRadius={{ base: "xl", md: "2xl" }}
          color="gray.900"
          {...glassLightOnPhoto}
          p={{ base: "3", md: "4" }}
          justify="space-between"
          align="flex-end"
          minW={0}
        >
          <VStack align="flex-start" gap="1" minW={0} maxW={actionIcon ? "calc(100% - 56px)" : "full"}>
            <Heading
              as="h3"
              fontFamily="heading"
              fontSize={{ base: "xl", md: "2xl" }}
              color="gray.900"
              fontWeight="700"
              letterSpacing="-0.02em"
              lineHeight="tight"
              lineClamp={2}
            >
              {title}
            </Heading>
            {description && (
              <Text fontSize="sm" color="gray.700" lineClamp={2} fontWeight="normal">
                {description}
              </Text>
            )}
          </VStack>

          {/* Acción: solo cambia el relleno en hover, sin giros */}
          <Box
            w="11"
            h="11"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            color="white"
            bg="gray.900"
            flexShrink={0}
            transition={`background-color 0.4s ${EASE}`}
            _groupHover={{ bg: "blackAlpha.800" }}
            _motionReduce={{ transition: "none" }}
          >
            <Box as={actionIcon} boxSize={5} style={{ flexShrink: 0 }} />
          </Box>
        </HStack>
      </Box>
    );
  },
);

MediaCard.displayName = "MediaCard";
export default MediaCard;
