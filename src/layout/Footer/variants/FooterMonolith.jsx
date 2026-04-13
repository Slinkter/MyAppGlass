/**
 * @file FooterMonolith.jsx
 * @description Option 1: Aura "Structural Monolith" - High contrast, solid and professional.
 * Focuses on authority and reliability.
 * @module layout/footer/variants
 */

import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Icon,
  Heading,
  Image,
  SimpleGrid,
  Container,
  Divider,
} from "@chakra-ui/react";
import {
  Clock,
  MapPin,
  Building,
  Mail,
  FileText,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import LibroReclamacionesIcon from "@/assets/libro.svg";
import logoGYA from "@/assets/branding/LogoCompanytrans.png";

const FooterRow = ({ icon, children, to, isExternal, customIconColor }) => {
  const content = (
    <HStack spacing={4} align="center" w="full" py={3} px={4} borderRadius="lg" _hover={{ bg: "whiteAlpha.100" }} transition="all 0.2s">
      <Icon as={icon} boxSize={5} color={customIconColor || "primary.300"} flexShrink={0} />
      <Text fontSize="sm" fontWeight="600" color="whiteAlpha.900">
        {children}
      </Text>
    </HStack>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: "none", width: "100%" }} target={isExternal ? "_blank" : undefined}>
        {content}
      </Link>
    );
  }

  return content;
};

const FooterSection = ({ title, children }) => (
  <VStack align="flex-start" spacing={4} w="full">
    <Heading as="h4" fontSize="xs" fontWeight="900" color="primary.300" textTransform="uppercase" letterSpacing="0.2em" mb={2}>
      {title}
    </Heading>
    <VStack align="flex-start" spacing={1} w="full">
      {children}
    </VStack>
  </VStack>
);

const FooterMonolith = () => {
  return (
    <Box 
      as="footer" 
      bgGradient="radial(circle at top, primary.800 0%, primary.900 100%)" 
      _dark={{ bgGradient: "radial(circle at top, primary.900 0%, black 100%)" }} 
      color="white" 
      py={24} 
      borderTop="1px solid" 
      borderColor="whiteAlpha.300"
      position="relative"
    >
      <Box position="absolute" top={0} left={0} right={0} h="1px" bgGradient="linear(to-r, transparent, primary.400, transparent)" opacity={0.5} />
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} mb={16}>
          <FooterSection title="Contacto Directo">
            <FooterRow icon={FaWhatsapp} customIconColor="brand.whatsapp">974 278 303</FooterRow>
            <FooterRow icon={Mail}>acueva@gyacompany.com</FooterRow>
          </FooterSection>

          <FooterSection title="Ubicación y Horarios">
            <FooterRow icon={MapPin}>Av. Los Fresnos 1250, La Molina</FooterRow>
            <FooterRow icon={Clock}>Lun - Sáb: 9am - 5pm</FooterRow>
          </FooterSection>

          <FooterSection title="Soporte y Garantía">
            <FooterRow to="/politicas-empresa" icon={FileText}>Políticas de Empresa</FooterRow>
            <FooterRow to="/libro-de-reclamacion" icon={Building}>
              <HStack spacing={2}>
                <Image src={LibroReclamacionesIcon} alt="Libro" boxSize={5} filter="brightness(0) invert(1)" />
                <Text>Libro de Reclamaciones</Text>
              </HStack>
            </FooterRow>
          </FooterSection>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.200" mb={10} />

        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={6}>
          <Image src={logoGYA} alt="Logo" h="40px" filter="brightness(0) invert(1)" />
          <Text fontSize="10px" color="whiteAlpha.600" fontWeight="bold" letterSpacing="0.3em" textAlign="center">
            © {new Date().getFullYear()} GYA GLASS & ALUMINUM S.A.C. TODOS LOS DERECHOS RESERVADOS.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default FooterMonolith;
