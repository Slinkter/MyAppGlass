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
import { ReactNode } from "react";
import NAV_ITEMS from "@/shared/config/nav-items";

// SVG Oficial de WhatsApp para consistencia visual en el Footer (viewBox 0 0 16 16)
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);


interface FooterRowProps {
    icon?: any;
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
                            alt="Icono"
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
