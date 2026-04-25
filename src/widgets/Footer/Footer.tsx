"use client";

/**
 * @file Footer.tsx
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
    LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import LibroReclamacionesIcon from "@/assets/libro.svg";
import logoGYA from "@/assets/branding/logosvg.svg";
import { ReactNode, ElementType } from "react";
import { IconType } from "react-icons";

interface FooterRowProps {
    icon: LucideIcon | IconType | ElementType;
    children: ReactNode;
    to?: string;
    isExternal?: boolean;
    customIconColor?: string;
}

/**
 * @component FooterRow
 * @description Unifica FooterItem y FooterLink en un solo estándar de alineación.
 */
const FooterRow = ({
    icon,
    children,
    to,
    isExternal,
    customIconColor,
}: FooterRowProps) => {
    const iconColor = customIconColor || "text.accent";
    const hoverColor = "text.accent";

    const content = (
        <HStack
            gap="phi_sm"
            align="center"
            justify={{ base: "center", sm: "flex-start" }}
            w="full"
            py={1.5}
        >
            <Box as={icon} boxSize="20px" color={iconColor} flexShrink={0} />
            <Text
                fontSize="sm"
                fontWeight="500"
                color="text.body"
                textAlign={{ base: "center", sm: "left" }}
                transition="all 0.2s"
                _groupHover={
                    to
                        ? { color: hoverColor, transform: "translateX(2px)" }
                        : {}
                }
            >
                {children}
            </Text>
        </HStack>
    );

    if (to) {
        return (
            <Link
                href={to}
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

interface FooterSectionProps {
    title: string;
    children: ReactNode;
}

const FooterSection = ({ title, children }: FooterSectionProps) => {
    return (
        <VStack
            align={{ base: "center", sm: "flex-start" }}
            gap="phi_md"
            w="full"
        >
            <Heading
                as="h4"
                fontSize="xs"
                fontWeight="800"
                color="text.accent"
                textTransform="uppercase"
                letterSpacing="0.2em"
                mb={1}
                textAlign={{ base: "center", sm: "left" }}
            >
                {title}
            </Heading>
            <VStack
                align={{ base: "center", sm: "flex-start" }}
                gap="phi_xs"
                w="full"
            >
                {children}
            </VStack>
        </VStack>
    );
};

const Footer = () => {
    return (
        <Box
            as="footer"
            mt="phi_2xl"
            mb={{ base: "phi_2xl", md: "phi_lg" }}
            px="phi_md"
        >
            <Container maxW="7xl" px={0}>
                <AuraSurface
                    pt={{ base: "phi_lg", md: "phi_xl" }}
                    pb="phi_md"
                    px={{ base: "phi_md", md: "phi_xl" }}
                    borderRadius="3xl"
                >
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, lg: 3 }}
                        gap={{ base: "phi_lg", md: "phi_xl" }}
                        mb="phi_xl"
                    >
                        <FooterSection title="Contacto">
                            <FooterRow
                                icon={FaWhatsapp}
                                customIconColor="brand.whatsapp"
                            >
                                974 278 303
                            </FooterRow>
                            <FooterRow
                                icon={FaWhatsapp}
                                customIconColor="brand.whatsapp"
                            >
                                996 537 435
                            </FooterRow>
                            <FooterRow icon={Mail}>
                                acueva@gyacompany.com
                            </FooterRow>
                        </FooterSection>

                        <FooterSection title="Horarios">
                            <FooterRow icon={Calendar}>
                                Lunes a Sábado
                            </FooterRow>
                            <FooterRow icon={Clock}>
                                9:00 am – 5:00 pm
                            </FooterRow>
                            <FooterRow icon={MapPin}>
                                La Molina, Lima - Perú
                            </FooterRow>
                        </FooterSection>

                        <FooterSection title="Corporativo">
                            <FooterRow to="/politicas-empresa" icon={FileText}>
                                Políticas de Empresa
                            </FooterRow>
                            <FooterRow to="/cuentas-bancarias" icon={Building}>
                                Cuentas Bancarias
                            </FooterRow>
                            <Link
                                href="/libro-de-reclamacion"
                                style={{
                                    textDecoration: "none",
                                    width: "100%",
                                }}
                            >
                                <HStack
                                    gap="phi_sm"
                                    align="center"
                                    justify={{
                                        base: "center",
                                        sm: "flex-start",
                                    }}
                                    py={1.5}
                                    _hover={{
                                        transform: {
                                            base: "scale(1.02)",
                                            sm: "translateX(4px)",
                                        },
                                    }}
                                    transition="transform 0.2s"
                                >
                                    <Box
                                        position="relative"
                                        w="20px"
                                        h="20px"
                                        flexShrink={0}
                                    >
                                        <Image
                                            src={LibroReclamacionesIcon}
                                            alt="Libro de Reclamaciones"
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </Box>
                                    <Text
                                        fontSize="sm"
                                        fontWeight="600"
                                        color="text.body"
                                    >
                                        Libro de Reclamaciones
                                    </Text>
                                </HStack>
                            </Link>
                        </FooterSection>
                    </SimpleGrid>

                    <Separator borderColor="border.glass" mb="phi_md" />

                    <Flex
                        direction="column"
                        align="center"
                        gap="phi_sm"
                        pt="phi_md"
                        w="full"
                    >
                        <Box
                            position="relative"
                            h="56px"
                            w="180px"
                            mb="phi_xs"
                            opacity={0.8}
                            _dark={{ filter: "brightness(0) invert(1)" }}
                        >
                            <Image
                                src={logoGYA}
                                alt="Logo GYA Glass & Aluminum"
                                fill
                                style={{ objectFit: "contain" }}
                                loading="lazy"
                            />
                        </Box>

                        <Text
                            fontSize="9px"
                            color="text.muted"
                            fontWeight="800"
                            letterSpacing="0.35em"
                            textTransform="uppercase"
                            textAlign="center"
                            maxW="280px"
                            lineHeight="1.8"
                        >
                            GLASS & ALUMINUM COMPANY S.A.C.
                        </Text>
                        <Text
                            fontSize="9px"
                            color="text.muted"
                            fontWeight="800"
                            letterSpacing="0.25em"
                            textTransform="uppercase"
                            textAlign="center"
                            maxW="280px"
                            lineHeight="1.8"
                        >
                            © {new Date().getFullYear()}
                        </Text>
                    </Flex>
                </AuraSurface>
            </Container>
        </Box>
    );
};

export default Footer;
