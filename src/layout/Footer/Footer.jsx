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
  FaRegCalendar,
  FaRegClock,
  FaRegMap,
  FaRegBuilding, // Changed from FaLandmark for outline equivalent
} from "react-icons/fa"; // Added FaLandmark
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5"; // Added IoDocumentTextOutline
import LibroReclamacionesIcon from "@/assets/libro.svg";

const FooterSection = ({ title, children }) => {
  const headingColor = useColorModeValue("gray.900", "white");
  return (
    <VStack spacing={2} mb={{ base: 6, md: 4 }}>
      <Heading
        as="h3"
        fontSize={{ base: "lg", md: "xl" }}
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
    <Link to={to} style={{ textDecoration: "none", display: "inline-block" }}>
      <HStack
        spacing={3}
        alignItems="center"
        py={{ base: 3, md: 1 }}
        px={{ base: 2, md: 0 }}
        minH={{ base: "44px", md: "auto" }}
        _hover={{ color: hoverColor }}
      >
        {icon && <Icon as={icon} boxSize={{ base: 6, md: 5 }} />}
        {children || <Text fontSize={{ base: "lg", md: "md" }}>{label}</Text>}
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
    <Box as="footer" my={{ base: 4, md: 8 }} px={{ base: 4, md: 0 }}>
      <Box
        bg={bgColor}
        backdropFilter="blur(10px)"
        boxShadow="md"
        borderRadius="2xl"
        color={textColor}
        maxW="7xl"
        mx="auto"
        pt={8}
        pb={6}
      >
        <Flex
          justifyContent="space-around"
          direction={{ base: "column", md: "row" }}
          textAlign={{ base: "center", md: "left" }}
          px={{ base: 4, md: 8 }}
          gap={{ base: 2, md: 0 }}
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
              <Icon as={FaRegCalendar} />
              <Text fontSize="md">Lunes a Sábado</Text>
            </HStack>
            <HStack spacing={2} alignItems="center">
              <Icon as={FaRegClock} />
              <Text fontSize="md">9:00 am - 5:00 pm</Text>
            </HStack>
          </FooterSection>

          <FooterSection title="DIRECCIÓN">
            <HStack spacing={2} alignItems="center" justifyContent="center">
              <Icon as={FaRegMap} />
              <Text fontSize="md">Av. Los Fresnos MZ. H LT. 1250</Text>
            </HStack>
            <HStack spacing={2} alignItems="center" justifyContent="center">
              <Icon as={MdOutlineEmail} />
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
              icon={FaRegBuilding}
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

        <Text
          textAlign="center"
          fontSize="sm"
          color={copyrightColor}
          mt={6}
          pt={4}
          borderTop="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          mx={{ base: 4, md: 8 }}
        >
          Copyright ©2026 Glass & Aluminum Company S.A.C. — Todos los derechos reservados.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
