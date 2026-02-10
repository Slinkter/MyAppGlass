/**
 * @file Footer.jsx
 * @description Global application footer containing contact information, schedules, and important internal links.
 * @module layout/footer
 */

import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  Heading,
  Image,
} from "@chakra-ui/react";
import {
  FaWhatsapp,
  FaCalendar,
  FaClock,
  FaMap,
  FaLandmark,
} from "react-icons/fa"; // Added FaLandmark
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5"; // Added IoDocumentTextOutline
import LibroReclamacionesIcon from "@/assets/libro.svg";

const FooterSection = ({ title, children }) => {
  const headingColor = useColorModeValue("gray.900", "white");
  return (
    <VStack spacing={2} mb={{ base: 6, md: 4 }}>
      <Heading
        as="h3"
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="semibold"
        mb={2}
        color={headingColor}
      >
        {title}
      </Heading>
      {children}
    </VStack>
  );
};

const FooterLink = ({ to, icon, label, children }) => {
  const hoverColor = useColorModeValue("primary.600", "primary.300");
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <HStack spacing={2} alignItems="center" _hover={{ color: hoverColor }}>
        {icon && <Icon as={icon} />}
        {children || <Text fontSize="md">{label}</Text>}
      </HStack>
    </Link>
  );
};

/**
 * @component Footer
 * @description Global application footer.
 */
const Footer = () => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.1)",
  );
  const textColor = useColorModeValue("gray.800", "gray.100");
  const copyrightColor = useColorModeValue("gray.600", "gray.400");

  return (
    <>
      <Box as="footer" my={8} px={{ base: 4, md: 0 }}>
        <Box
          bg={bgColor}
          backdropFilter="blur(10px)"
          boxShadow="md"
          borderRadius="2xl"
          transition="all 0.3s ease"
          color={textColor}
          maxW="7xl"
          mx="auto"
          pt={8}
          pb={4}
        >
          <Flex
            justifyContent="space-around"
            direction={{ base: "column", md: "row" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <FooterSection title="CONTACTO">
              <HStack spacing={2} alignItems="center">
                <Icon as={FaWhatsapp} />
                <Text fontSize="md">974-278-303</Text>
              </HStack>
              <HStack spacing={2} alignItems="center">
                <Icon as={FaWhatsapp} />
                <Text fontSize="md">996-537-435</Text>
              </HStack>
            </FooterSection>

            <FooterSection title="HORARIOS">
              <HStack spacing={2} alignItems="center">
                <Icon as={FaCalendar} />
                <Text fontSize="md">Lunes a Sábado</Text>
              </HStack>
              <HStack spacing={2} alignItems="center">
                <Icon as={FaClock} />
                <Text fontSize="md">9:00 am - 5:00 pm</Text>
              </HStack>
            </FooterSection>

            <FooterSection title="DIRECCIÓN">
              <HStack spacing={2} alignItems="center" justifyContent="center">
                <Icon as={FaMap} />
                <Text fontSize="md">Av. Los Fresnos MZ. H LT. 1250</Text>
              </HStack>
              <HStack spacing={2} alignItems="center" justifyContent="center">
                <Icon as={MdEmail} />
                <Text fontSize="md">acueva@gyacompany.com</Text>
              </HStack>
            </FooterSection>

            <FooterSection title="LINKS">
              <FooterLink
                to="/politicas-empresa"
                icon={IoDocumentTextOutline}
                label="Políticas de la Empresa"
              />
              <FooterLink
                to="/cuentas-bancarias"
                icon={FaLandmark}
                label="Cuentas Bancarias"
              />
              <FooterLink to="/libro-de-reclamacion">
                <Image
                  src={LibroReclamacionesIcon}
                  alt="Libro de Reclamaciones"
                  h="30px"
                  w="auto"
                  loading="lazy"
                  decoding="async"
                />
                <Text fontSize="md">Libro de Reclamaciones</Text>
              </FooterLink>
            </FooterSection>
          </Flex>
        </Box>
      </Box>
      <VStack color={copyrightColor}>
        <Text mt={2} mb={6}>
          Copyright ©2025
        </Text>
      </VStack>
    </>
  );
};

export default Footer;
