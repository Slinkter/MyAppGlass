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
import { m, AnimatePresence } from "framer-motion";
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
                    transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                    _groupHover={{ x: 10, color: "text.accent" }}
                >
                    {label}
                </Text>
                <m.div
                    initial={false}
                    animate={{ width: isActive ? "60px" : "0" }}
                    style={{
                        height: "2px",
                        backgroundColor: "var(--chakra-colors-text-accent)",
                        marginTop: "8px",
                        willChange: "width",
                        transform: "translateZ(0)",
                    }}
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
                transition="all 0.2s ease"
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
                top="phi_md"
                right="phi_md"
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
                        transition="all 0.3s ease"
                    >
                        <m.div
                            initial={false}
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            {isOpen ? (
                                <X size={32} strokeWidth={1.5} />
                            ) : (
                                <Menu size={32} strokeWidth={1.5} />
                            )}
                        </m.div>
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
                        <AnimatePresence>
                            {NAV_ITEMS.map((item, index) => (
                                <m.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.04,
                                        ease: "easeOut",
                                        duration: 0.3,
                                    }}
                                    style={{
                                        width: "100%",
                                        willChange: "transform, opacity",
                                        transform: "translateZ(0)",
                                    }}
                                >
                                    <NavItemLarge
                                        label={item.label}
                                        href={item.href}
                                        onClick={handleLinkClick}
                                    />
                                </m.div>
                            ))}
                        </AnimatePresence>
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
                                transition="all 0.3s ease"
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
                    top="phi_md"
                    right="phi_md"
                    color="text.accent"
                    visibility="hidden"
                />
            </DrawerContent>
        </DrawerRoot>
    );
});

MobileNav.displayName = "MobileNav";
export default MobileNav;
