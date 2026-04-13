/**
 * @file Footer.jsx
 * @description Global application footer unificado con elevación premium y diseño dimensional.
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
    Calendar,
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

/**
 * @component FooterRow
 * @description Unifica FooterItem y FooterLink en un solo estándar de alineación.
 */
const FooterRow = ({ icon, children, to, isExternal, customIconColor }) => {
    const iconColor = customIconColor || "text.accent";
    const hoverColor = "text.accent";

    const content = (
        <HStack spacing={4} align="center" w="full" py={1.5}>
            <Icon as={icon} boxSize={5} color={iconColor} flexShrink={0} />
            <Text
                fontSize="sm"
                fontWeight="600"
                color="text.body"
                transition="all 0.2s"
                _groupHover={to ? { color: hoverColor, transform: "translateX(2px)" } : {}}
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
                <Box role="group" transition="transform 0.2s">
                    {content}
                </Box>
            </Link>
        );
    }

    return content;
};

const FooterSection = ({ title, children }) => {
    return (
        <VStack align="flex-start" spacing={6} w="full">
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
            <VStack align="flex-start" spacing={2} w="full">
                {children}
            </VStack>
        </VStack>
    );
};

const Footer = () => {
    return (
        <Box as="footer" mt={{ base: 16, md: 32 }} mb={{ base: 32, md: 12 }} px={{ base: 4, md: 6 }}>
            <Container maxW="7xl" px={0}>
                <Box
                    bg="bg.section"
                    border="1px solid"
                    borderColor="border.glass"
                    borderRadius="3xl"
                    boxShadow="2xl"
                    pt={{ base: 12, md: 16 }}
                    pb={10}
                    px={{ base: 8, md: 16 }}
                >
                    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 12, md: 16 }} mb={16}>
                        <FooterSection title="Contacto">
                            <FooterRow icon={FaWhatsapp} customIconColor="brand.whatsapp">974 278 303</FooterRow>
                            <FooterRow icon={FaWhatsapp} customIconColor="brand.whatsapp">996 537 435</FooterRow>
                            <FooterRow icon={Mail}>acueva@gyacompany.com</FooterRow>
                        </FooterSection>

                        <FooterSection title="Horarios">
                            <FooterRow icon={Calendar}>Lunes a Sábado</FooterRow>
                            <FooterRow icon={Clock}>9:00 am – 5:00 pm</FooterRow>
                            <FooterRow icon={MapPin}>La Molina, Lima - Perú</FooterRow>
                        </FooterSection>

                        <FooterSection title="Corporativo">
                            <FooterRow to="/politicas-empresa" icon={FileText}>Políticas de Empresa</FooterRow>
                            <FooterRow to="/cuentas-bancarias" icon={Building}>Cuentas Bancarias</FooterRow>
                            <Link to="/libro-de-reclamacion" style={{ textDecoration: "none", width: "100%" }}>
                                <HStack 
                                    spacing={4} 
                                    align="center" 
                                    py={1.5} 
                                    _hover={{ transform: "translateX(4px)" }} 
                                    transition="transform 0.2s"
                                >
                                    <Image src={LibroReclamacionesIcon} alt="Libro" boxSize={5} flexShrink={0} />
                                    <Text fontSize="sm" fontWeight="600" color="text.body">Libro de Reclamaciones</Text>
                                </HStack>
                            </Link>
                        </FooterSection>
                    </SimpleGrid>

                    <Divider borderColor="border.glass" mb={10} />

                    <Flex direction="column" align="center" gap={5}>
                        <Image src={logoGYA} alt="Logo" h="36px" />
                        <Text fontSize="10px" color="text.subtle" fontWeight="bold" letterSpacing="0.3em">
                            © {new Date().getFullYear()} GYA GLASS & ALUMINUM S.A.C.
                        </Text>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
