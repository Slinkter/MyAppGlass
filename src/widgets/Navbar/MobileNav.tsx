"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    IconButton,
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
import { usePathname } from "next/navigation";
import NavLink from "next/link";
import NAV_ITEMS from "@/shared/config/nav-items";
import { useColorMode } from "@/components/ui/color-mode-hooks";
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <img
                        src={Icon as any}
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

    return (
        <DrawerRoot
            open={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
            size="full"
            placement="top"
        >
            {/* ULTRA-CLEAN FLOATING TRIGGER */}
            <Box
                position="fixed"
                top="6"
                right="6"
                zIndex={1100}
                display={{ base: "block", md: "none" }}
            >
                <DrawerTrigger asChild>
                    <IconButton
                        variant="plain"
                        aria-label="Menú"
                        color={isOpen ? "text.accent" : "text.heading"}
                        _dark={{ color: isOpen ? "text.accent" : "white" }}
                        size="xl"
                        _hover={{ transform: "scale(1.1)" }}
                        _active={{ transform: "scale(0.9)" }}
                        transition="color 0.3s ease, transform 0.3s ease"
                    >
                        <Box
                        transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
                    >
                        {isOpen ? (
                            <X size={32} strokeWidth={1.5} />
                        ) : (
                            <Menu size={32} strokeWidth={1.5} />
                        )}
                    </Box>
                    </IconButton>
                </DrawerTrigger>
            </Box>

            <DrawerBackdrop backdropFilter="blur(16px)" bg="blackAlpha.600" />

            <DrawerContent
                bg="bg.page"
                p={0}
                height="100vh"
                width="100vw"
                position="fixed"
                top={0}
                left={0}
            >
                <DrawerBody
                    display="flex"
                    flexDirection="column"
                    h="full"
                    px={8}
                    pt={24}
                    pb={8}
                >
                    <VStack
                        flex="1"
                        align="flex-start"
                        justify="center"
                        gap={2}
                        transition="opacity 0.3s"
                    >
                        {NAV_ITEMS.map((item, index) => (
                            <Box
                                key={item.label}
                                w="full"
                                animation={`slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.04}s both`}
                            >
                                <NavItemLarge
                                    label={item.label}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                />
                            </Box>
                        ))}
                    </VStack>

                    <VStack gap={8} w="full" mt="auto" align="flex-start">
                        <Separator borderColor="border.glass" opacity={0.6} />

                        <SimpleGrid columns={2} gapY={6} gapX={4} w="full">
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

                        <HStack w="full" justify="space-between" pt={4}>
                            <Text
                                fontSize="xs"
                                color="text.muted"
                                letterSpacing="widest"
                                textTransform="uppercase"
                            >
                                © {new Date().getFullYear()} Glass & Aluminum
                                Company S.A.C.
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
                    </VStack>
                </DrawerBody>
                <DrawerCloseTrigger
                    top="6"
                    right="6"
                    color="text.accent"
                    visibility="hidden"
                />
            </DrawerContent>
        </DrawerRoot>
    );
});

MobileNav.displayName = "MobileNav";
export default MobileNav;
