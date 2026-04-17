/**
 * @file ServiceDetailImmersive.tsx
 * @description Option 1: Aura "Immersive Glasshouse" - Full width gallery and floating info panels.
 */
import React from "react";
import {
  Box, VStack, Heading, Text, Container, HStack, Button, Flex, Badge, SimpleGrid
} from "@chakra-ui/react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Gallery from "@shared/components/common/Gallery";

const MotionBox = motion.create(Box);

/**
 * @interface PageDataImmersive
 * @description Structure of page data for immersive detail
 */
export interface PageDataImmersive {
  /** SEO metadata */
  seo: { title: string };
  /** About section data */
  about: { description: string };
  /** Benefits list */
  benefits: Array<{ label: string }>;
  /** Available systems */
  systems: Array<{ label: string }>;
  /** Image galleries */
  imageLists: string[][];
}

/**
 * @interface ServiceDetailImmersiveProps
 */
export interface ServiceDetailImmersiveProps {
  /** The page data */
  pageData: PageDataImmersive;
}

/**
 * @description Immersive detailed view for a service
 */
export const ServiceDetailImmersive: React.FC<ServiceDetailImmersiveProps> = ({ pageData }) => {
  const { seo, about, benefits, systems, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <Box position="relative">
      {/* HERO GALLERY */}
      <Box h={{ base: "500px", md: "700px" }} position="relative" overflow="hidden">
        <AnimatePresence mode="wait">
          <MotionBox 
            key={activeIndex} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
            h="full" w="full"
          >
            <Gallery images={imageLists[activeIndex] || []} />
          </MotionBox>
        </AnimatePresence>
        
        {/* FLOATING HEADER */}
        <Box 
          position="absolute" top={0} left={0} right={0} 
          bgGradient="linear(to-b, blackAlpha.700, transparent)" 
          pt={10} pb={20} px={6} zIndex={5}
        >
          <Container maxW="7xl">
            <VStack align="flex-start" gap={2}>
              <Badge colorPalette="primary" variant="solid" borderRadius="full" px={4}>SERVICIO ELITE</Badge>
              <Heading color="white" size="2xl" letterSpacing="tighter">{seo.title}</Heading>
            </VStack>
          </Container>
        </Box>

        {/* SYSTEM SELECTOR OVERLAY */}
        <Box position="absolute" bottom={10} left={0} right={0} zIndex={5}>
          <Container maxW="7xl">
            <HStack gap={4} overflowX="auto" pb={4} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
              {systems.map((s, i) => (
                <Button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  variant="glass"
                  bg={activeIndex === i ? "whiteAlpha.900" : "blackAlpha.600"}
                  color={activeIndex === i ? "primary.900" : "white"}
                  borderRadius="full"
                  px={8}
                  backdropFilter="blur(10px)"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  {s.label}
                </Button>
              ))}
            </HStack>
          </Container>
        </Box>
      </Box>

      {/* CONTENT SECTION */}
      <Container maxW="7xl" py={20}>
        <Flex direction={{ base: "column", lg: "row" }} gap={16}>
          <VStack align="flex-start" gap={8} flex={1}>
            <VStack align="flex-start" gap={4}>
              <Text fontSize="sm" fontWeight="900" color="primary.500" textTransform="uppercase" letterSpacing="0.2em">Concepto</Text>
              <Text fontSize="2xl" color="text.body" fontWeight="medium" lineHeight="tall">
                {about.description}
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
              {benefits.map((b, i) => (
                <HStack key={i} p={4} variant="glass" bg="bg.section" borderRadius="xl" border="1px solid" borderColor="border.glass">
                  <Box as={CheckCircle2} color="primary.500" />
                  <Text fontSize="sm" fontWeight="bold">{b.label}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>

          <Box flex={1} maxW={{ lg: "400px" }}>
            <VStack p={10} bg="primary.900" color="white" borderRadius="3xl" gap={6} textAlign="center" shadow="2xl">
              <Box as={MessageCircle} boxSize={10} />
              <Heading size="lg">¿Iniciamos tu obra?</Heading>
              <Text opacity={0.8}>Recibe asesoría técnica personalizada para tu proyecto de {systems[activeIndex]?.label}.</Text>
              <Button variant="aura" w="full" size="lg" bg="white" color="primary.900" _hover={{ bg: "primary.50" }}>
                WHATSAPP TÉCNICO
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
