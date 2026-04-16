/**
 * @file FooterGrid.jsx
 * @description Option 3: Aura "Grid Precision" - Technical, detailed, and organized.
 * Focuses on engineering accuracy and architectural layout.
 * @module layout/footer/variants
 */

import {
  Box,
  HStack,
  Text,
  VStack,
  Heading,
  Image,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import {
  Clock,
  MapPin,
  Mail,
  FileText,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import LibroReclamacionesIcon from "@/assets/libro.svg";
import logoGYA from "@/assets/branding/logosvg.svg";

const FooterSection = ({ title, children }) => (
  <VStack align="flex-start" gap={6} w="full">
    <Heading as="h4" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="0.4em" mb={2}>
      {title}
    </Heading>
    <VStack align="flex-start" gap={4} w="full">
      {children}
    </VStack>
  </VStack>
);

const FooterGrid = () => {
  return (
    <Box 
      as="footer" 
      bg="bg.section" 
      pt={32} 
      pb={12} 
      position="relative"
      backgroundImage="radial-gradient(circle, var(--chakra-colors-border-default) 1px, transparent 1px)"
      _dark={{ 
        bg: "black",
        backgroundImage: "radial-gradient(circle, var(--chakra-colors-whiteAlpha-200) 1px, transparent 1px)" 
      }}
      backgroundSize="40px 40px"
    >
      {/* Architectural Markers */}
      <Text position="absolute" top={10} left={10} fontSize="10px" fontFamily="mono" color="text.subtle" opacity={0.5}>A-1 / GYA_CORE</Text>
      <Text position="absolute" top={10} right={10} fontSize="10px" fontFamily="mono" color="text.subtle" opacity={0.5}>B-2 / 2026_REV</Text>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={12} mb={20}>
          <VStack align="flex-start" gap={8} pr={{ lg: 12 }} borderRight={{ lg: "1px solid" }} borderColor="border.glass">
            <Image src={logoGYA} alt="Logo" h="32px" />
            <Text fontSize="sm" color="text.muted" lineHeight="tall">
              Especialistas en la instalación de cristales de alta gama y estructuras de aluminio arquitectónico.
            </Text>
          </VStack>

          <FooterSection title="Contacto">
            <HStack gap={3} color="text.body">
              <Box as={FaWhatsapp} color="brand.whatsapp" />
              <Text fontSize="sm" fontWeight="600">974 278 303</Text>
            </HStack>
            <HStack gap={3} color="text.body">
              <Box as={Mail} color="primary.500" />
              <Text fontSize="sm" fontWeight="600">acueva@gyacompany.com</Text>
            </HStack>
          </FooterSection>

          <FooterSection title="Sede">
            <HStack gap={3} align="flex-start">
              <Box as={MapPin} color="primary.500" mt={1} />
              <Text fontSize="sm" color="text.body">Av. Los Fresnos 1250, La Molina, Lima.</Text>
            </HStack>
            <HStack gap={3}>
              <Box as={Clock} color="primary.500" />
              <Text fontSize="sm" color="text.body">Lun - Sáb: 9:00 - 17:00</Text>
            </HStack>
          </FooterSection>

          <FooterSection title="Garantía">
            <Link to="/politicas-empresa">
              <HStack gap={3} _hover={{ color: "primary.500" }} transition="color 0.2s">
                <Box as={FileText} />
                <Text fontSize="sm" fontWeight="600">Políticas de Privacidad</Text>
              </HStack>
            </Link>
            <Link to="/libro-de-reclamacion">
              <HStack gap={3} _hover={{ color: "primary.500" }} transition="color 0.2s">
                <Image src={LibroReclamacionesIcon} alt="Libro" boxSize={4} />
                <Text fontSize="sm" fontWeight="600">Libro Reclamaciones</Text>
              </HStack>
            </Link>
          </FooterSection>
        </SimpleGrid>

        <Box pt={12} borderTop="1px solid" borderColor="border.glass" textAlign="center">
          <Text fontSize="xs" color="text.subtle" fontWeight="bold" letterSpacing="0.5em" textTransform="uppercase">
            © {new Date().getFullYear()} GYA Glass & Aluminum S.A.C.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterGrid;
