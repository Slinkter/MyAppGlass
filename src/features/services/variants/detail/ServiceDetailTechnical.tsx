/**
 * @file ServiceDetailTechnical.tsx
 * @description Option 2: Aura "Architectural Specs" - Split layout with focus on technical details.
 */
import React from "react";
import { 
  Box, VStack, Heading, Text, HStack, Button, Flex, Separator, SimpleGrid
 } from "@chakra-ui/react";
import { Layers, Shield, ArrowRight } from "lucide-react";
import Gallery from "@shared/components/common/Gallery";

/**
 * @interface PageDataTechnical
 * @description Structure of page data for technical detail
 */
export interface PageDataTechnical {
  /** SEO metadata */
  seo: { title: string };
  /** About section data */
  about: { description: string };
  /** Available systems */
  systems: Array<{ label: string }>;
  /** Image galleries */
  imageLists: string[][];
}

/**
 * @interface ServiceDetailTechnicalProps
 */
export interface ServiceDetailTechnicalProps {
  /** The page data */
  pageData: PageDataTechnical;
}

/**
 * @description Technical detailed view for a service
 */
export const ServiceDetailTechnical: React.FC<ServiceDetailTechnicalProps> = ({ pageData }) => {
  const { seo, about, systems, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <Flex direction={{ base: "column", lg: "row" }} minH="100vh">
      {/* LEFT: FIXED VISUAL */}
      <Box flex={1} position={{ lg: "sticky" }} top={0} h={{ base: "400px", lg: "100vh" }}>
        <Gallery images={imageLists[activeIndex] || []} />
      </Box>

      {/* RIGHT: SCROLLABLE SPECS */}
      <Box flex={1} bg="bg.page" p={{ base: 8, md: 20 }}>
        <VStack align="flex-start" gap={12} maxW="2xl">
          <VStack align="flex-start" gap={4}>
            <Text fontFamily="mono" fontSize="xs" color="primary.500" letterSpacing="0.3em">REF: GYA_SPEC_2026</Text>
            <Heading size="2xl" letterSpacing="tight">{seo.title}</Heading>
            <Text fontSize="lg" color="text.muted">{about.description}</Text>
          </VStack>

          <VStack align="flex-start" gap={6} w="full">
            <Text fontWeight="bold" fontSize="xs" textTransform="uppercase" letterSpacing="widest" opacity={0.5}>Seleccionar Sistema</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
              {systems.map((s, i) => (
                <Box 
                  key={i} 
                  p={4} 
                  border="1px solid" 
                  borderColor={activeIndex === i ? "primary.900" : "border.glass"}
                  bg={activeIndex === i ? "primary.900" : "transparent"}
                  color={activeIndex === i ? "white" : "text.body"}
                  onClick={() => setActiveIndex(i)}
                  cursor="pointer"
                  transition="all 0.2s"
                  borderRadius="sm"
                >
                  <HStack justify="space-between">
                    <Text fontWeight="bold" fontSize="sm">{s.label}</Text>
                    {activeIndex === i && <Box as={ArrowRight} size={14} />}
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>

          <Separator borderColor="border.glass" />

          <SimpleGrid columns={2} gap={10} w="full">
            <VStack align="flex-start">
              <Box as={Shield} color="primary.500" />
              <Text fontWeight="bold" fontSize="sm">Garantía</Text>
              <Text fontSize="xs" color="text.muted">Certificación de seguridad estructural.</Text>
            </VStack>
            <VStack align="flex-start">
              <Box as={Layers} color="primary.500" />
              <Text fontWeight="bold" fontSize="sm">Materiales</Text>
              <Text fontSize="xs" color="text.muted">Aluminio de alta pureza y cristal templado.</Text>
            </VStack>
          </SimpleGrid>

          <Button variant="aura" size="lg" w="full">
            SOLICITAR ESPECIFICACIONES <Box as={ArrowRight} />
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
