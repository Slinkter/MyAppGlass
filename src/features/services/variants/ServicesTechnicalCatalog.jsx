/**
 * @file ServicesTechnicalCatalog.jsx
 * @description Option 3: Aura "Technical Catalog" - Engineering detail and structured layout.
 */
import React from "react";
import { Box, Flex, Text, Heading, VStack, Icon, SimpleGrid, Badge } from "@chakra-ui/react";
import { services } from "../data/services";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ArrowRight } from "lucide-react";

const TechnicalCard = ({ name, category, image }) => (
  <Box borderBottom="1px solid" borderColor="border.glass" py={6} _hover={{ bg: "bg.subtle" }} transition="all 0.2s" cursor="pointer" px={4}>
    <Flex align="center" justify="space-between">
      <Flex align="center" gap={6}>
        <Box w="80px" h="80px" borderRadius="lg" overflow="hidden" shadow="md">
          <ResponsiveImage src={image} objectFit="cover" w="full" h="full" />
        </Box>
        <VStack align="flex-start" spacing={0}>
          <Badge variant="subtle" colorScheme="zinc" fontSize="10px" mb={1}>{category}</Badge>
          <Heading size="md" letterSpacing="tight">{name}</Heading>
        </VStack>
      </Flex>
      <Icon as={ArrowRight} opacity={0.3} />
    </Flex>
  </Box>
);

export const ServicesTechnicalCatalog = () => (
  <Box py={10} bg="bg.section" borderRadius="2xl" border="1px solid" borderColor="border.glass" overflow="hidden">
    <VStack align="stretch" spacing={0}>
      {services.slice(0, 8).map((service) => (
        <TechnicalCard key={service.id} {...service} />
      ))}
    </VStack>
  </Box>
);
