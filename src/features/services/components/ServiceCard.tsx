"use client";

import React from "react";
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";

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
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          transform: "translateY(-6px)"
        }}
      >
        {/* Fotografía de Fondo */}
        <Box position="absolute" inset={0} zIndex={0} overflow="hidden">
          <ResponsiveImage
            src={image}
            alt={`Servicio de ${name} - GYA Glass & Aluminum`}
            w="full"
            h="full"
            objectFit="cover"
            loading={loading}
            isLCP={isLCP}
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
          transition="opacity 0.3s ease"
          _groupHover={{ opacity: 0.95 }}
        />

        {/* Badge de Categoría Superior Floating Glass */}
        {category && (
          <Box
            position="absolute"
            top="4"
            left="4"
            zIndex={2}
            bg="rgba(0, 0, 0, 0.55)"
            backdropFilter="blur(10px)"
            px="3"
            py="1"
            borderRadius="full"
            border="1px solid rgba(255, 255, 255, 0.15)"
          >
            <Text 
              fontSize="10px" 
              fontWeight="800" 
              color="white"
              letterSpacing="0.2em"
              textTransform="uppercase"
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
          p={{ base: "5", md: "6" }}
          justify="space-between"
          align="flex-end"
        >
          <VStack align="flex-start" gap="1" maxW="calc(100% - 40px)">
            <Heading 
              as="h3" 
              fontSize={{ base: "xl", md: "2xl" }} 
              color="white"
              fontWeight="800"
              letterSpacing="tight"
              lineHeight="tight"
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
            <Box as={ArrowUpRight} boxSize={5} />
          </Box>
        </HStack>
      </Box>
    </RouterLink>
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
