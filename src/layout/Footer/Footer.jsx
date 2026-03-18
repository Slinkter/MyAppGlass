/**
 * @file Footer.jsx
 * @description Global application footer. Uses semantic color tokens for all
 * surface, text, and border colors — no inline useColorModeValue calls.
 * @module layout/footer
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
import logoGYA from "@/assets/branding/LogoCompanytrans.png";

/**
 * @component FooterRow
 * @description Unified footer item that handles both plain text and link rows.
 * @param {object} props
 * @param {React.ElementType} props.icon - Icon component.
 * @param {React.ReactNode} props.children - Row label.
 * @param {string} [props.to] - Internal route path (makes the row a link).
 * @param {boolean} [props.isExternal] - Whether the link opens in a new tab.
 * @param {string} [props.customIconColor] - Override for the icon color token.
 */
const FooterRow = ({ icon, children, to, isExternal, customIconColor }) => {
  const iconColor = customIconColor || "text.accent";

  const content = (
    <HStack spacing={4} align="center" w="full" py={1}>
      <Icon as={icon} boxSize={5} color={iconColor} flexShrink={0} />
      <Text
        fontSize="sm"
        fontWeight="500"
        color="text.body"
        transition="color 0.2s"
        _groupHover={to ? { color: "text.accent" } : {}}
      >
        {children}
      </Text>
    </HStack>
  );

  if (to) {
    return (
      <Link
        to={to}
        style={{ textDecoration: "none", width: "100%" }}
        target={isExternal ? "_blank" : undefined}
        className="group"
      >
        <Box
          role="group"
          transition="transform 0.2s"
          _hover={{ transform: "translateX(4px)" }}
        >
          {content}
        </Box>
      </Link>
    );
  }

  return content;
};

/**
 * @component FooterSection
 * @description A labeled column within the footer grid.
 * @param {object} props
 * @param {string} props.title - Section heading.
 * @param {React.ReactNode} props.children - Section rows.
 */
const FooterSection = ({ title, children }) => (
  <VStack align={{ base: "flex-start", md: "flex-start" }} spacing={5} w="full">
    <Heading
      as="h4"
      fontSize="xs"
      fontWeight="900"
      color="text.accent"
      textTransform="uppercase"
      letterSpacing="0.2em"
      mb={1}
    >
      {title}
    </Heading>
    <VStack align="flex-start" spacing={3} w="full">
      {children}
    </VStack>
  </VStack>
);

/**
 * @component Footer
 * @description Site-wide footer with contact info, schedule, and legal links.
 */
const Footer = () => (
  <Box
    as="footer"
    mt={{ base: 16, md: 32 }}
    mb={{ base: 32, md: 12 }}
    px={{ base: 4, md: 6 }}
  >
    <Container maxW="7xl" px={0}>
      <Box
        bg="surface.footer"
        border="1px solid"
        borderColor="border.default"
        borderRadius="3xl"
        pt={{ base: 12, md: 16 }}
        pb={8}
        px={{ base: 8, md: 16 }}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 12, md: 16 }}
          mb={16}
        >
          <FooterSection title="Contacto">
            <FooterRow icon={FaWhatsapp} customIconColor="brand.whatsapp">
              974 278 303
            </FooterRow>
            <FooterRow icon={FaWhatsapp} customIconColor="brand.whatsapp">
              996 537 435
            </FooterRow>
            <FooterRow icon={MdOutlineEmail}>acueva@gyacompany.com</FooterRow>
          </FooterSection>

          <FooterSection title="Horarios">
            <FooterRow icon={FaRegCalendar}>Lunes a Sábado</FooterRow>
            <FooterRow icon={FaRegClock}>9:00 am – 5:00 pm</FooterRow>
            <FooterRow icon={FaRegMap}>La Molina, Lima - Perú</FooterRow>
          </FooterSection>

          <FooterSection title="Corporativo">
            <FooterRow to="/politicas-empresa" icon={IoDocumentTextOutline}>
              Políticas de Empresa
            </FooterRow>
            <FooterRow to="/cuentas-bancarias" icon={FaRegBuilding}>
              Cuentas Bancarias
            </FooterRow>
            <Link
              to="/libro-de-reclamacion"
              style={{ textDecoration: "none", width: "100%" }}
            >
              <HStack
                spacing={4}
                align="center"
                py={1}
                _hover={{ transform: "translateX(4px)" }}
                transition="transform 0.2s"
              >
                <Image
                  src={LibroReclamacionesIcon}
                  alt="Libro"
                  boxSize={5}
                  flexShrink={0}
                />
                <Text fontSize="sm" fontWeight="600" color="text.body">
                  Libro de Reclamaciones
                </Text>
              </HStack>
            </Link>
          </FooterSection>
        </SimpleGrid>
      </Box>

      <Divider borderColor="border.default" border={0} mb={8} />

      <Flex direction="column" align="center" gap={4}>
        <Text
          fontSize="10px"
          color="text.muted"
          fontWeight="bold"
          letterSpacing="0.2em"
        >
          © 2026
        </Text>
      </Flex>
    </Container>
  </Box>
);

export default Footer;
