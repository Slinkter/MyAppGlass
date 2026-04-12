/**
 * @file Footer.jsx
 * @description Global application footer unificado para alineación perfecta y rendimiento máximo.
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
 * @description Unifica FooterItem y FooterLink en un solo estándar de alineación.
 */
const FooterRow = ({ icon, children, to, isExternal, customIconColor }) => {
    const defaultIconColor = useColorModeValue("primary.500", "primary.400");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const iconColor = customIconColor || defaultIconColor;
    const hoverColor = useColorModeValue("primary.600", "primary.300");

    const content = (
        <HStack spacing={4} align="center" w="full" py={1}>
            <Icon as={icon} boxSize={5} color={iconColor} flexShrink={0} />
            <Text
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                transition="color 0.2s"
                _groupHover={to ? { color: hoverColor } : {}}
            >
                {children}
            </Text>
        </HStack>
    );

    if (to) {
        return (
            <Link to={to} style={{ textDecoration: "none", width: "100%" }} target={isExternal ? "_blank" : undefined} className="group">
                <Box role="group" transition="transform 0.2s" _hover={{ transform: "translateX(4px)" }}>
                    {content}
                </Box>
            </Link>
        );
    }

    return content;
};

const FooterSection = ({ title, children }) => {
    const headingColor = useColorModeValue("primary.700", "primary.300");
    return (
        <VStack align={{ base: "flex-start", md: "flex-start" }} spacing={5} w="full">
            <Heading
                as="h4"
                fontSize="xs"
                fontWeight="900"
                color={headingColor}
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
};

const Footer = () => {
    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.98)", "rgba(10, 10, 10, 0.98)");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const copyrightColor = useColorModeValue("gray.500", "gray.500");
    const linkTextColor = useColorModeValue("gray.700", "gray.200");
    const logoFilter = useColorModeValue("none", "brightness(0) invert(1)"); // eslint-disable-line no-unused-vars

    return (
        <Box as="footer" mt={{ base: 16, md: 32 }} mb={{ base: 32, md: 12 }} px={{ base: 4, md: 6 }}>
            <Container maxW="7xl" px={0}>
                <Box
                    bg={bgColor}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="3xl"
                    pt={{ base: 12, md: 16 }}
                    pb={8}
                    px={{ base: 8, md: 16 }}
                >
                    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 12, md: 16 }} mb={16}>
                        <FooterSection title="Contacto">
                            <FooterRow icon={FaWhatsapp} customIconColor="green.500">974 278 303</FooterRow>
                            <FooterRow icon={FaWhatsapp} customIconColor="green.500">996 537 435</FooterRow>
                            <FooterRow icon={MdOutlineEmail}>acueva@gyacompany.com</FooterRow>
                        </FooterSection>

                        <FooterSection title="Horarios">
                            <FooterRow icon={FaRegCalendar}>Lunes a Sábado</FooterRow>
                            <FooterRow icon={FaRegClock}>9:00 am – 5:00 pm</FooterRow>
                            <FooterRow icon={FaRegMap}>La Molina, Lima - Perú</FooterRow>
                        </FooterSection>

                        <FooterSection title="Corporativo">
                            <FooterRow to="/politicas-empresa" icon={IoDocumentTextOutline}>Políticas de Empresa</FooterRow>
                            <FooterRow to="/cuentas-bancarias" icon={FaRegBuilding}>Cuentas Bancarias</FooterRow>
                            <Link to="/libro-de-reclamacion" style={{ textDecoration: "none", width: "100%" }}>
                                <HStack spacing={4} align="center" py={1} _hover={{ transform: "translateX(4px)" }} transition="transform 0.2s">
                                    <Image src={LibroReclamacionesIcon} alt="Libro" boxSize={5} flexShrink={0} />
                                    <Text fontSize="sm" fontWeight="600" color={linkTextColor}>Libro de Reclamaciones</Text>
                                </HStack>
                            </Link>
                        </FooterSection>
                    </SimpleGrid>

                    <Divider borderColor={borderColor} mb={8} />

                    <Flex direction="column" align="center" gap={4}>
                        <Image src={logoGYA} alt="Logo" h="32px" />
                        <Text fontSize="10px" color={copyrightColor} fontWeight="bold" letterSpacing="0.2em">
                            © {new Date().getFullYear()} GYA GLASS & ALUMINUM S.A.C.
                        </Text>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
