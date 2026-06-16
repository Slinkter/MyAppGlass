"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    VStack,
    Text,
    Separator,
    HStack,
    SimpleGrid,
} from "@chakra-ui/react";
import {
    Menu,
    X,
    ShieldCheck,
    Landmark,
    Home,
    Sun,
    Moon,
    LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import NavLink from "next/link";
import NAV_ITEMS from "@/shared/config/nav-items";
import { companyData } from "@/shared/config/company-data";
import { useColorMode } from "@/components/ui/color-mode-hooks";
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
} from "@/components/ui/drawer";

interface NavItemLargeProps {
    label: string;
    href: string;
    onClick: () => void;
}

/**
 * @component NavItemLarge
 */
const NavItemLarge = ({ label, href, onClick }: NavItemLargeProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <NavLink
            href={href}
            onClick={onClick}
            style={{ textDecoration: "none", width: "100%", display: "block" }}
        >
            <Box position="relative" py={3} overflow="hidden" role="group">
                <Text
                    fontFamily="heading"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight={isActive ? "800" : "400"}
                    color={isActive ? "text.accent" : "text.heading"}
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    transition="color 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                    _groupHover={{ x: 10, color: "text.accent" }}
                >
                    {label}
                </Text>
                <Box
                    h="2px"
                    bg="text.accent"
                    mt="2"
                    transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    w={isActive ? "60px" : "0"}
                />
            </Box>
        </NavLink>
    );
};

interface UtilityLinkProps {
    label: string;
    href: string;
    icon: LucideIcon | string;
    onClick: () => void;
    isImage?: boolean;
}

const UtilityLink = ({
    label,
    href,
    icon: Icon,
    onClick,
    isImage,
}: UtilityLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <NavLink
            href={href}
            onClick={onClick}
            style={{ textDecoration: "none" }}
        >
            <HStack
                gap={3}
                color={isActive ? "text.accent" : "text.muted"}
                _hover={{ color: "text.accent", x: 4 }}
                transition="color 0.2s ease"
            >
                {isImage ? (
                    <img
                        src={Icon as string}
                        alt={label}
                        width={20}
                        height={20}
                        style={{ opacity: isActive ? 1 : 0.7 }}
                    />
                ) : (
                    <Box
                        as={Icon as LucideIcon}
                        boxSize={5}
                        opacity={isActive ? 1 : 0.7}
                    />
                )}
                <Text
                    fontSize="sm"
                    fontWeight={isActive ? "700" : "500"}
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                >
                    {label}
                </Text>
            </HStack>
        </NavLink>
    );
};

const MobileNav = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { colorMode, toggleColorMode } = useColorMode();

    // Close menu instantly when pathname changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleLinkClick = useCallback(() => {
        setIsOpen(false);
    }, []);

    const whatsappLink = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

    return (
        <DrawerRoot
            open={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
            size="md"
            placement="bottom"
        >
            {/* FLOATING GLASS MENU BUTTON — same aesthetic as desktop floating island */}
            <Box
                position="fixed"
                bottom="5"
                right="5"
                zIndex={1100}
                display={{ base: "block", md: "none" }}
            >
                <DrawerTrigger asChild>
                    <Box
                        as="button"
                        aria-label="Menú de navegación"
                        css={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "9999px",
                            backgroundColor: "var(--chakra-colors-bg-panel)",
                            backdropFilter: "blur(40px) saturate(210%)",
                            WebkitBackdropFilter: "blur(40px) saturate(210%)",
                            border: "1px solid var(--chakra-colors-border-default)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        animation="pulse-shadow 3s ease-in-out infinite"
                        _hover={{ transform: "scale(1.08)", animation: "none" }}
                        _active={{ transform: "scale(0.92)" }}
                        transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
                        >
                            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </Box>
                    </Box>
                </DrawerTrigger>
            </Box>

            <DrawerBackdrop backdropFilter="blur(12px)" bg="blackAlpha.500" />

            <DrawerContent
                bg="bg.panel"
                borderTopRadius="2xl"
                p={0}
                maxH="85vh"
                overflowY="auto"
            >
                <DrawerBody
                    display="flex"
                    flexDirection="column"
                    px={6}
                    pt={8}
                    pb={6}
                >
                    <VStack
                        flex="1"
                        align="flex-start"
                        justify="flex-start"
                        gap={1}
                    >
                        {NAV_ITEMS.map((item, index) => (
                            <Box
                                key={item.label}
                                w="full"
                                animation={`slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s both`}
                            >
                                <NavItemLarge
                                    label={item.label}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                />
                            </Box>
                        ))}
                    </VStack>

                    {/* WhatsApp CTA in drawer */}
                    <Box
                        w="full"
                        animation="slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both"
                        mt={4}
                    >
                        <Box
                            asChild
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={3}
                            w="full"
                            py={4}
                            borderRadius="xl"
                            bg="#25D366"
                            color="white"
                            fontWeight="600"
                            fontSize="md"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            _hover={{ bg: "#1DAE54" }}
                            transition="background-color 0.2s ease"
                        >
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleLinkClick}
                            >
                                <FaWhatsapp size={20} />
                                Chatea por WhatsApp
                            </a>
                        </Box>
                    </Box>

                    <Separator borderColor="border.glass" opacity={0.6} my={6} />

                    <SimpleGrid columns={2} gapY={5} gapX={4} w="full" mb={6}>
                        <UtilityLink
                            label="Inicio"
                            href="/"
                            icon={Home}
                            onClick={handleLinkClick}
                        />
                        <UtilityLink
                            label="Cuentas"
                            href="/cuentas-bancarias"
                            icon={Landmark}
                            onClick={handleLinkClick}
                        />
                        <UtilityLink
                            label="Políticas"
                            href="/politicas-empresa"
                            icon={ShieldCheck}
                            onClick={handleLinkClick}
                        />
                        <UtilityLink
                            label="Libro"
                            href="/libro-de-reclamacion"
                            icon="/images/libro.svg"
                            onClick={handleLinkClick}
                            isImage
                        />
                    </SimpleGrid>

                    <HStack w="full" justify="space-between">
                        <Text
                            fontSize="xs"
                            color="text.muted"
                            letterSpacing="widest"
                            textTransform="uppercase"
                        >
                            © {new Date().getFullYear()} GYA
                        </Text>
                        <HStack
                            as="button"
                            onClick={toggleColorMode}
                            gap={2}
                            px={4}
                            py={2}
                            borderRadius="full"
                            border="1px solid"
                            borderColor="border.glass"
                            color="text.heading"
                            _hover={{ bg: "bg.subtle" }}
                            transition="background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease"
                        >
                            {colorMode === "dark" ? (
                                <Sun size={14} />
                            ) : (
                                <Moon size={14} />
                            )}
                            <Text
                                fontSize="xs"
                                fontWeight="bold"
                                letterSpacing="widest"
                                textTransform="uppercase"
                            >
                                {colorMode === "dark" ? "Claro" : "Oscuro"}
                            </Text>
                        </HStack>
                    </HStack>
                </DrawerBody>
            </DrawerContent>
        </DrawerRoot>
    );
});

MobileNav.displayName = "MobileNav";
export default MobileNav;
