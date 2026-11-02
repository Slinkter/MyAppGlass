"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { Skeleton } from "@/components/ui/skeleton";

/** Tiempo máximo esperando la foto: pasado este plazo se muestra la card igualmente. */
const IMAGE_REVEAL_TIMEOUT_MS = 7000;

export interface ServiceCardProps {
  image: string;
  name: string;
  category?: string;
  description?: string;
  plink: string;
  index?: number;
  onLoadComplete?: () => void;
  loading?: "lazy" | "eager";
  isLCP?: boolean;
}

/**
 * @component ServiceCard
 * @description Tarjeta de servicio ultra-limpia y sobria integrada en la fotografía.
 */
const ServiceCard: React.FC<ServiceCardProps> = React.memo(({
  image,
  name,
  category,
  description,
  plink,
  loading = "lazy",
  isLCP = false
}) => {
  // La card se revela entera (foto + textos) cuando la imagen termina de cargar,
  // así nada aparece desfasado; mientras tanto se ve un skeleton de la misma altura.
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), IMAGE_REVEAL_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const reveal = {
    opacity: loaded ? 1 : 0,
    transition: "opacity 0.5s ease",
    _motionReduce: { transition: "none" },
  };

  return (
    <RouterLink href={plink} style={{ width: "100%", height: "100%", textDecoration: "none" }}>
      <Box
        role="group"
        w="full"
        h={{ base: "260px", sm: "280px", md: "310px" }}
        borderRadius="3xl"
        overflow="hidden"
        position="relative"
        bg="black"
        boxShadow="sm"
        transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _hover={{
          boxShadow: "var(--chakra-shadows-card-lift)",
          transform: "translateY(-6px)"
        }}
      >
        {/* Fotografía de Fondo */}
        <Skeleton
          aria-hidden
          position="absolute"
          inset={0}
          zIndex={1}
          borderRadius="0"
          pointerEvents="none"
          opacity={loaded ? 0 : 1}
          // La animación `pulse` de Chakra anima la opacidad y pisaría el desvanecido.
          animation={loaded ? "none" : undefined}
          transition="opacity 0.5s ease"
          _motionReduce={{ transition: "none" }}
        />
        <Box position="absolute" inset={0} zIndex={0} overflow="hidden" {...reveal}>
          <ResponsiveImage
            src={image}
            alt={`Servicio de ${name} - GYA Glass & Aluminum`}
            w="full"
            h="full"
            objectFit="cover"
            loading={loading}
            isLCP={isLCP}
            onLoad={handleLoad}
            transition="transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{ transform: "scale(1.06)" }}
          />
        </Box>

        {/* Degradado Oscuro de Gradación Fina */}
        <Box
          position="absolute"
          inset={0}
          zIndex={1}
          background="linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.05) 100%)"
          {...reveal}
        />

        {/* Badge de Categoría Superior Floating Glass */}
        {category && (
          <Box
            position="absolute"
            top={{ base: "3", md: "4" }}
            left={{ base: "3", md: "4" }}
            maxW="calc(100% - 24px)"
            zIndex={2}
            bg="rgba(0, 0, 0, 0.55)"
            backdropFilter="blur(10px)"
            px="3"
            py="1"
            borderRadius="full"
            border="1px solid rgba(255, 255, 255, 0.15)"
            {...reveal}
          >
            <Text
              fontSize="xs"
              fontWeight="800"
              color="white"
              letterSpacing={{ base: "0.08em", md: "0.2em" }}
              textTransform="uppercase"
              truncate
            >
              {category}
            </Text>
          </Box>
        )}

        {/* Contenedor Inferior de Información */}
        <HStack
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          zIndex={2}
          p={{ base: "4", md: "6" }}
          justify="space-between"
          align="flex-end"
          minW={0}
          {...reveal}
        >
          <VStack align="flex-start" gap="1" minW={0} maxW="calc(100% - 52px)">
            <Heading
              as="h3"
              fontSize={{ base: "xl", md: "2xl" }}
              color="white"
              fontWeight="800"
              letterSpacing="tight"
              lineHeight="tight"
              lineClamp={2}
            >
              {name}
            </Heading>
            {description && (
              <Text
                fontSize="xs"
                color="whiteAlpha.800"
                lineClamp={1}
                fontWeight="400"
              >
                {description}
              </Text>
            )}
          </VStack>

          {/* Botón Circular Acción Floating */}
          <Box
            w="40px"
            h="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bg="whiteAlpha.200"
            backdropFilter="blur(8px)"
            border="1px solid rgba(255, 255, 255, 0.25)"
            color="white"
            flexShrink={0}
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{
              bg: "primary.500",
              borderColor: "primary.500",
              transform: "scale(1.1) rotate(45deg)"
            }}
          >
            <Box as={ArrowUpRight} boxSize={5} style={{ flexShrink: 0 }} />
          </Box>
        </HStack>
      </Box>
    </RouterLink>
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
