"use client";

/**
 * @file Footer.tsx
 * @description Global application footer unificado con diseño plano y limpio integrado en el fondo.
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
import {
    Calendar,
    Clock,
    MapPin,
    Building,
    Mail,
    FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LibroReclamacionesIcon from "@/assets/libro.svg";
import logoGYA from "@/assets/branding/logosvg.svg";
import type { ElementType, ReactNode } from "react";
import NAV_ITEMS from "@/shared/config/nav-items";

import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";


interface FooterRowProps {
    icon?: ElementType;
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

    const isStaticImage = icon && (typeof icon === "string" || (typeof icon === "object" && icon !== null && ("src" in icon || "default" in icon)));

    const content = (
        <HStack
            gap="4"
            align="center"
            justify={{ base: "center", sm: "flex-start" }}
            w="full"
            py={1.5}
        >
            {icon && (
                isStaticImage ? (
                    <Box
                        position="relative"
                        w="20px"
                        h="20px"
                        flexShrink={0}
                    >
                        <Image
                            src={icon}
                            alt=""
                            aria-hidden="true"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </Box>
                ) : (
                    <Box as={icon} boxSize="20px" color={iconColor} flexShrink={0} />
                )
            )}
            <Text
                fontSize="sm"
                fontWeight="500"
                color="text.body"
                textAlign={{ base: "center", sm: "left" }}
                transition="color 0.2s, transform 0.2s"
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
                <Box role="group" transition="transform 0.2s" w="full">
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
            gap="6"
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
                gap="2"
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
            mt="20"
            mb={{ base: "20", md: "8" }}
            px="6"
        >
            <Container maxW="7xl" px={0}>
                <Box
                    pt={{ base: "8", md: "14" }}
                    pb="6"
                    px={{ base: "4", md: "6" }}
                >
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 4 }}
                        gap={{ base: "8", md: "10", lg: "14" }}
                        mb="14"
                    >
                        <FooterSection title="Explorar">
                            {NAV_ITEMS.map((item) => (
                                <FooterRow key={item.label} to={item.href}>
                                    {item.label}
                                </FooterRow>
                            ))}
                        </FooterSection>

                        <FooterSection title="Contacto">
                            <FooterRow
                                icon={WhatsAppIcon}
                                customIconColor="brand.whatsapp"
                            >
                                974 278 303
                            </FooterRow>
                            <FooterRow
                                icon={WhatsAppIcon}
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
                            <FooterRow to="/libro-de-reclamacion" icon={LibroReclamacionesIcon}>
                                Libro de Reclamaciones
                            </FooterRow>
                        </FooterSection>
                    </SimpleGrid>

                    <Separator borderColor="border.glass" mb="6" />

                    <Flex
                        direction="column"
                        align="center"
                        gap="4"
                        pt="6"
                        w="full"
                    >
                        <Box
                            position="relative"
                            h="56px"
                            w="180px"
                            mb="2"
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
                            suppressHydrationWarning
                        >
                            © {new Date().getFullYear()}
                        </Text>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
