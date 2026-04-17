/**
 * @file ServiceDetailElite.tsx
 * @description Option 6: Aura "Obsidian Refraction" - The Final Boss. 
 * Inspired by luxury architectural trends 2026 (Digital Materiality).
 */
import React from "react";
import { Box, VStack, Heading, Text, Container, Flex, Image, SimpleGrid, HStack } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Diamond, Compass, Zap, Layers } from "lucide-react";

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

/**
 * @interface SpecTagProps
 * @description Props for the SpecTag component
 */
export interface SpecTagProps {
  /** Icon component to render */
  icon: React.ElementType;
  /** Label for the specification */
  label: string;
  /** Value for the specification */
  value: string;
}

const SpecTag: React.FC<SpecTagProps> = ({ icon, label, value }) => (
  <VStack align="flex-start" gap={1} p={6} border="1px solid" borderColor="whiteAlpha.200" _hover={{ borderColor: "orange.300", bg: "whiteAlpha.50" }} transition="all 0.4s ease">
    <Box as={icon} color="orange.300" boxSize={4} />
    <Text fontSize="10px" fontWeight="black" color="whiteAlpha.500" textTransform="uppercase" letterSpacing="0.2em">{label}</Text>
    <Text fontSize="sm" fontWeight="bold" color="white">{value}</Text>
  </VStack>
);

/**
 * @interface PageDataElite
 * @description Structure of page data for elite detail
 */
export interface PageDataElite {
  /** About section data */
  about: { description: string };
  /** Image galleries */
  imageLists: string[][];
}

/**
 * @interface ServiceDetailEliteProps
 */
export interface ServiceDetailEliteProps {
  /** The page data */
  pageData: PageDataElite;
}

/**
 * @description Elite detailed view for a service
 */
const ServiceDetailElite: React.FC<ServiceDetailEliteProps> = ({ pageData }) => {
  const { about, imageLists } = pageData;
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <Box bg="#050505" color="white" position="relative" overflow="hidden">
      {/* 1. CINEMATIC HERO */}
      <Box h="110vh" position="relative" clipPath="inset(0 0 0 0)">
        <MotionBox style={{ scale }} position="absolute" inset={0} zIndex={0}>
          <Image src={imageLists[3]?.[0]} w="full" h="full" objectFit="cover" filter="brightness(0.4) grayscale(0.2)" alt="Background" />
        </MotionBox>
        
        <Container maxW="7xl" h="full" position="relative" zIndex={1}>
          <Flex h="full" align="center">
            <VStack align="flex-start" gap={8} maxW="3xl">
              <HStack gap={4}>
                <Box w="40px" h="1px" bg="orange.300" />
                <Text fontSize="xs" fontWeight="black" letterSpacing="0.4em" color="orange.300">COLLECCIÓN 2026</Text>
              </HStack>
              <MotionHeading 
                size="4xl" 
                lineHeight="0.85" 
                letterSpacing="-0.04em"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                EL ARTE DE <br /> LA VISIÓN
              </MotionHeading>
              <Text fontSize="xl" color="whiteAlpha.700" maxW="xl" lineHeight="tall">
                {about.description}
              </Text>
            </VStack>
          </Flex>
        </Container>

        {/* REFRACCIÓN DE CRISTAL (DECORATIVO) */}
        <Box 
          position="absolute" bottom="0" right="0" w="40%" h="60%" 
          bg="rgba(255,255,255,0.02)" backdropFilter="blur(40px)" 
          style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          borderLeft="1px solid rgba(255,255,255,0.1)"
        />
      </Box>

      {/* 2. TECHNICAL MATERIALITY */}
      <Container maxW="7xl" py={40}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={20} align="center">
          <VStack align="flex-start" gap={12}>
            <VStack align="flex-start" gap={4}>
              <Heading size="2xl" letterSpacing="tight">Materialidad <br /> Digital</Heading>
              <Text color="whiteAlpha.600" fontSize="lg">
                Nuestros perfiles de aluminio obsidiana no solo sostienen el cristal; definen el espacio. 
                Cada unión es una pieza de micro-ingeniería.
              </Text>
            </VStack>
            
            <SimpleGrid columns={2} w="full" gap={0}>
              <SpecTag icon={Diamond} label="Cristal" value="Templado 12mm" />
              <SpecTag icon={Compass} label="Precisión" value="± 0.1mm" />
              <SpecTag icon={Layers} label="Acabado" value="Anodizado Pro" />
              <SpecTag icon={Zap} label="Aislamiento" value="Térmico A+" />
            </SimpleGrid>
          </VStack>

          <Box position="relative">
            <Image src={imageLists[0]?.[0]} borderRadius="sm" filter="contrast(1.1) brightness(0.8)" alt="Detail" />
            <Box position="absolute" bottom="-40px" left="-40px" p={8} bg="orange.300" color="black">
              <Text fontWeight="black" fontSize="4xl" lineHeight="1">99%</Text>
              <Text fontWeight="bold" fontSize="xs" textTransform="uppercase" letterSpacing="widest">Transparencia</Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      {/* 3. CALL TO EXCELLENCE */}
      <Box py={40} borderTop="1px solid" borderColor="whiteAlpha.100" bgGradient="linear(to-b, #050505, #101010)">
        <VStack gap={12}>
          <Heading size="3xl" textAlign="center" letterSpacing="-0.02em">Define tu próximo <br /> horizonte.</Heading>
          <Box 
            as="button" 
            px={16} py={6} 
            border="1px solid" borderColor="orange.300" 
            color="orange.300" 
            fontSize="sm" fontWeight="black" letterSpacing="0.3em" 
            textTransform="uppercase"
            _hover={{ bg: "orange.300", color: "black", shadow: "0 0 50px rgba(251, 211, 141, 0.3)" }}
            transition="all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
          >
            INICIAR CONSULTA ELITE
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ServiceDetailElite;
