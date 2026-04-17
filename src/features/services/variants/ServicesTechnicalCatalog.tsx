/**
 * @file ServicesTechnicalCatalog.tsx
 * @description Option 3: Aura "Technical Catalog" - Engineering detail and structured layout.
 */
import React from "react";
import { Box, Flex, Heading, VStack, Badge } from "@chakra-ui/react";
import { services } from "../data/services";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ArrowRight } from "lucide-react";

/**
 * @interface TechnicalCardProps
 * @description Props for the TechnicalCard component
 */
export interface TechnicalCardProps {
  /** The name of the service */
  name: string;
  /** The category of the service */
  category: string;
  /** URL to the service image */
  image: string;
}

const TechnicalCard: React.FC<TechnicalCardProps> = ({ name, category, image }) => (
  <Box borderBottom="1px solid" borderColor="border.glass" py={6} _hover={{ bg: "bg.subtle" }} transition="all 0.2s" cursor="pointer" px={4}>
    <Flex align="center" justify="space-between">
      <Flex align="center" gap={6}>
        <Box w="80px" h="80px" borderRadius="lg" overflow="hidden" shadow="md">
          <ResponsiveImage src={image} objectFit="cover" w="full" h="full" alt={name} />
        </Box>
        <VStack align="flex-start" gap={0}>
          <Badge variant="subtle" colorPalette="zinc" fontSize="10px" mb={1}>{category}</Badge>
          <Heading size="md" letterSpacing="tight">{name}</Heading>
        </VStack>
      </Flex>
      <Box as={ArrowRight} opacity={0.3} />
    </Flex>
  </Box>
);

/**
 * @description Technical catalog layout for services
 */
export const ServicesTechnicalCatalog: React.FC = () => (
  <Box py={10} bg="bg.section" borderRadius="2xl" border="1px solid" borderColor="border.glass" overflow="hidden">
    <VStack align="stretch" gap={0}>
      {services.slice(0, 8).map((service) => (
        <TechnicalCard key={service.id} {...service} />
      ))}
    </VStack>
  </Box>
);
