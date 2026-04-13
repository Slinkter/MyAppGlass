/**
 * @file FooterLiquid.jsx
 * @description Option 2: Aura "Liquid Glass" - Immersive, lightweight, and sophisticated.
 * Focuses on transparency and premium aesthetics.
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
} from "@chakra-ui/react";
import {
  Clock,
  MapPin,
  Building,
  Mail,
  FileText,
  Calendar,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import LibroReclamacionesIcon from "@/assets/libro.svg";
import logoGYA from "@/assets/branding/LogoCompanytrans.png";

const MotionBox = motion(Box);

const FooterRow = ({ icon, children, to, isExternal, customIconColor }) => {
  const content = (
    <HStack spacing={4} align="center" w="full" py={2}>
      <Icon as={icon} boxSize={5} color={customIconColor || "text.accent"} />
      <Text fontSize="sm" fontWeight="500" color="text.body" _groupHover={{ color: "primary.500", transform: "translateX(4px)" }} transition="all 0.3s ease">
        {children}
      </Text>
    </HStack>
  );

  if (to) {
    return (
      <Link href={to} style={{ textDecoration: "none", width: "100%" }} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="group">
        <Box role="group">{content}</Box>
      </Link>
    );
  }

  return content;
};

const FooterLiquid = () => {
  return (
    <Box as="footer" position="relative" pb={12} pt={24} px={4} overflow="hidden">
      {/* Dynamic Background Accents */}
      <MotionBox 
        position="absolute" top="-100px" left="-50px" w="400px" h="400px" 
        bg="primary.400" filter="blur(140px)" opacity={0.12} borderRadius="full" zIndex={0} 
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <MotionBox 
        position="absolute" bottom="-50px" right="-100px" w="350px" h="350px" 
        bg="primary.600" filter="blur(120px)" opacity={0.1} borderRadius="full" zIndex={0} 
        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <MotionBox
          bg="surface.nav"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="whiteAlpha.400"
          borderRadius="3xl"
          p={{ base: 10, md: 16 }}
          shadow="2xl"
          boxShadow="inset 0 0 80px rgba(255,255,255,0.05), 0 25px 50px -12px rgba(0,0,0,0.5)"
          _dark={{ borderColor: "whiteAlpha.100" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={12} mb={16}>
            <VStack align="flex-start" spacing={6}>
              <Heading size="xs" textTransform="uppercase" letterSpacing="widest" color="text.accent">Contacto</Heading>
              <VStack align="flex-start" spacing={1} w="full">
                <FooterRow icon={FaWhatsapp} customIconColor="brand.whatsapp">974 278 303</FooterRow>
                <FooterRow icon={FaWhatsapp} customIconColor="brand.whatsapp">996 537 435</FooterRow>
                <FooterRow icon={Mail}>acueva@gyacompany.com</FooterRow>
              </VStack>
            </VStack>

            <VStack align="flex-start" spacing={6}>
              <Heading size="xs" textTransform="uppercase" letterSpacing="widest" color="text.accent">Sede y Horarios</Heading>
              <VStack align="flex-start" spacing={1} w="full">
                <FooterRow icon={Calendar}>Lunes a Sábado</FooterRow>
                <FooterRow icon={Clock}>9:00 am – 5:00 pm</FooterRow>
                <FooterRow icon={MapPin}>La Molina, Lima - Perú</FooterRow>
              </VStack>
            </VStack>

            <VStack align="flex-start" spacing={6}>
              <Heading size="xs" textTransform="uppercase" letterSpacing="widest" color="text.accent">Corporativo</Heading>
              <VStack align="flex-start" spacing={1} w="full">
                <FooterRow to="/politicas-empresa" icon={FileText}>Políticas de Empresa</FooterRow>
                <FooterRow to="/cuentas-bancarias" icon={Building}>Cuentas Bancarias</FooterRow>
                <Link href="/libro-de-reclamacion" style={{ textDecoration: "none", width: "100%" }}>
                  <HStack spacing={4} align="center" py={2} _hover={{ transform: "translateX(4px)" }} transition="all 0.3s ease">
                    <Image src={LibroReclamacionesIcon} alt="Libro" boxSize={5} _dark={{ filter: "brightness(0) invert(1)" }} />
                    <Text fontSize="sm" fontWeight="600" color="text.body">Libro de Reclamaciones</Text>
                  </HStack>
                </Link>
              </VStack>
            </VStack>
          </SimpleGrid>

          <Flex direction="column" align="center" gap={6} borderTop="1px solid" borderColor="border.glass" pt={10}>
            <Image src={logoGYA} alt="Logo" h="36px" _dark={{ filter: "brightness(0) invert(1)" }} />
            <Text fontSize="10px" color="text.subtle" fontWeight="800" letterSpacing="0.4em" textAlign="center">
              © {new Date().getFullYear()} GYA GLASS & ALUMINUM S.A.C.
            </Text>
          </Flex>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default FooterLiquid;
