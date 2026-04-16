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
    Heading,
    Image,
    SimpleGrid,
    Container,
    Separator,
 } from "@chakra-ui/react";
import AuraSurface from "@shared/components/aura/AuraSurface";
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
import logoGYA from "@/assets/branding/logosvg.svg";

/**
 * @component FooterRow
 * @description Unifica FooterItem y FooterLink en un solo estándar de alineación.
 */
const FooterRow = ({ icon, children, to, isExternal, customIconColor }) => {
    const iconColor = customIconColor || "text.accent";
    const hoverColor = "text.accent";

    const content = (
        <HStack gap="phi_sm" align="center" w="full" py={1.5}>
            <Box as={icon} boxSize={5} color={iconColor} flexShrink={0} />
            <Text
                fontSize="sm"
                fontWeight="500"
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
        <VStack align="flex-start" gap="phi_md" w="full">
            <Heading
                as="h4"
                fontSize="xs"
                fontWeight="800"
                color="text.accent"
                textTransform="uppercase"
                letterSpacing="0.2em"
                mb={1}
            >
                {title}
            </Heading>
            <VStack align="flex-start" gap="phi_xs" w="full">
                {children}
            </VStack>
        </VStack>
    );
};

const Footer = () => {
    return (
        <Box as="footer" mt="phi_2xl" mb={{ base: "phi_2xl", md: "phi_lg" }} px="phi_md">
            <Container maxW="7xl" px={0}>
                <AuraSurface
                    pt={{ base: "phi_lg", md: "phi_xl" }}
                    pb="phi_md"
                    px={{ base: "phi_md", md: "phi_xl" }}
                    borderRadius="3xl"
                >
                    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "phi_lg", md: "phi_xl" }} mb="phi_xl">
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
                                    gap="phi_sm" 
                                    align="center" 
                                    py={1.5} 
                                    _hover={{ transform: "translateX(4px)" }} 
                                    transition="transform 0.2s"
                                >
                                    <Image src={LibroReclamacionesIcon.src || LibroReclamacionesIcon} alt="Libro" boxSize={5} flexShrink={0} />
                                    <Text fontSize="sm" fontWeight="600" color="text.body">Libro de Reclamaciones</Text>
                                </HStack>
                            </Link>
                        </FooterSection>
                    </SimpleGrid>

                    <Separator borderColor="border.glass" mb="phi_md" />

                    <Flex direction="column" align="center" gap="phi_sm">
                        <Image src={logoGYA.src || logoGYA} alt="Logo" h="36px" mb="phi_xs" />
                        <Text 
                            fontSize="9px" 
                            color="text.muted" 
                            fontWeight="700" 
                            letterSpacing="0.4em"
                            textTransform="uppercase"
                            textAlign="center"
                        >
                            © {new Date().getFullYear()} GYA GLASS & ALUMINUM S.A.C.
                        </Text>
                    </Flex>
                </AuraSurface>
            </Container>
        </Box>
    );
};

export default Footer;
