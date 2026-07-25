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
  plink,
  loading = "lazy",
  isLCP = false
}) => {
  return (
    <RouterLink href={plink} style={{ width: "100%", height: "100%", textDecoration: "none" }}>
      <Box
        role="group"
        w="full"
        h={{ base: "240px", sm: "260px", md: "290px" }}
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
        bg="black"
        transition="all 0.3s ease"
        _hover={{ 
          boxShadow: "xl",
          transform: "translateY(-4px)"
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
            transition="transform 0.6s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        </Box>

        {/* Degradado Oscuro Inferior Fino */}
        <Box 
          position="absolute" 
          inset={0} 
          zIndex={1}
          background="linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)" 
        />

        {/* Texto Flotante Directo (Sin cajas blancas) */}
        <HStack
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          zIndex={2}
          p="5"
          justify="space-between"
          align="flex-end"
        >
          <VStack align="flex-start" gap="1">
            {category && (
              <Text 
                fontSize="10px" 
                fontWeight="700" 
                color="whiteAlpha.800"
                letterSpacing="0.15em"
                textTransform="uppercase"
              >
                {category}
              </Text>
            )}
            <Heading 
              as="h3" 
              fontSize={{ base: "lg", md: "xl" }} 
              color="white"
              fontWeight="700"
              letterSpacing="tight"
              lineHeight="tight"
            >
              {name}
            </Heading>
          </VStack>

          {/* Flecha Sutil en blanco */}
          <Box 
            color="whiteAlpha.800"
            transition="transform 0.3s ease, color 0.3s ease"
            _groupHover={{ color: "white", transform: "translate(2px, -2px)" }}
            mb="0.5"
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
