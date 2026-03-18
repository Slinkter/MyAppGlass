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
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FaWhatsapp,
  FaRegCalendar,
  FaRegClock,
  FaRegMap,
  FaRegBuilding,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import LibroReclamacionesIcon from "@/assets/libro.svg";

const FooterSection = ({ title, children }) => {
  const headingColor = useColorModeValue("gray.900", "white");
  return (
    <VStack
      align={{ base: "center", md: "flex-start" }}
      spacing={5}
      mb={{ base: 6, md: 0 }}
    >
      <Heading
        as="h4"
        fontSize="sm"
        fontWeight="bold"
        color={headingColor}
        textTransform="uppercase"
        letterSpacing="widest"
      >
        {title}
      </Heading>
      <VStack align={{ base: "center", md: "flex-start" }} spacing={4} w="full">
        {children}
      </VStack>
    </VStack>
  );
};

const FooterItem = ({ icon, children, customIconColor }) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const defaultIconColor = useColorModeValue("gray.400", "gray.500");

  return (
    <HStack
      spacing={4}
      alignItems="flex-start"
      justifyContent={{ base: "center", md: "flex-start" }}
      w="full"
    >
      <Icon
        as={icon}
        boxSize={5}
        color={customIconColor || defaultIconColor}
        mt={1}
      />
      <Box
        color={textColor}
        fontSize="sm"
        lineHeight="tall"
        textAlign={{ base: "center", md: "left" }}
      >
        {children}
      </Box>
    </HStack>
  );
};

const FooterLink = ({ to, icon, label, children }) => {
  const hoverColor = useColorModeValue("primary.600", "primary.300");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Link
      to={to}
      style={{ textDecoration: "none", display: "inline-block", width: "100%" }}
    >
      <HStack
        spacing={3}
        alignItems="center"
        py={1}
        color={textColor}
        transition="all 0.3s ease"
        justifyContent={{ base: "center", md: "flex-start" }}
        _hover={{ color: hoverColor, transform: "translateX(4px)" }}
      >
        {icon && <Icon as={icon} boxSize={5} />}
        {children || <Text fontSize="sm">{label}</Text>}
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
    "rgba(255, 255, 255, 0.4)",
    "rgba(20, 20, 20, 0.4)",
  );
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const copyrightColor = useColorModeValue("gray.500", "gray.500");

  return (
    <Box as="footer" my={{ base: 4, md: 8 }} px={{ base: 4, md: 0 }}>
      <Box
        bg={bgColor}
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius={{ base: "2xl", md: "3xl" }}
        maxW="7xl"
        mx="auto"
        pt={{ base: 10, md: 14 }}
        pb={6}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, md: 8 }}
          px={{ base: 6, md: 12 }}
          mb={10}
        >
          <FooterSection title="Contacto">
            <FooterItem icon={FaWhatsapp} customIconColor="green.400">
              <Text>974-278-303</Text>
            </FooterItem>
            <FooterItem icon={FaWhatsapp} customIconColor="green.400">
              <Text>996-537-435</Text>
            </FooterItem>
          </FooterSection>

          <FooterSection title="Horarios">
            <FooterItem icon={FaRegCalendar}>
              <Text>Lunes a Sábado</Text>
            </FooterItem>
            <FooterItem icon={FaRegClock}>
              <Text>9:00 am - 5:00 pm</Text>
            </FooterItem>
          </FooterSection>

          <FooterSection title="Dirección">
            <FooterItem icon={FaRegMap}>
              <Text>Av. Los Fresnos MZ. H LT. 1250</Text>
            </FooterItem>
            <FooterItem icon={MdOutlineEmail}>
              <Text>acueva@gyacompany.com</Text>
            </FooterItem>
          </FooterSection>

          <FooterSection title="Legal">
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
                h="24px"
                w="auto"
                loading="lazy"
                decoding="async"
              />
              <Text fontSize="sm">Libro de Reclamaciones</Text>
            </FooterLink>
          </FooterSection>
        </SimpleGrid>
      </Box>

      <Box mt={6} px={{ base: 4, md: 12 }}>
        <Flex direction={"column"} align="center" justify="center" gap={1}>
          <Text
            fontSize="xs"
            color={copyrightColor}
            textAlign="center"
            fontWeight="medium"
          >
            Glass & Aluminum Company S.A.C. — Todos los derechos reservados.
          </Text>
          <Text fontSize="xs" color={copyrightColor} textAlign="center">
            Copyright ©2026
          </Text>
        </Flex>
      </Box>
      {/* Espaciador inferior para coexistir con el BottomNav en móviles */}
      <Box h={{ base: "40px", md: "20px" }} mb={4} />
    </Box>
  );
};

export default Footer;
