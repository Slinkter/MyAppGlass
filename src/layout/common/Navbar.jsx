import {
    Box,
    Flex,
    IconButton,
    Stack,
    useColorModeValue,
    useColorMode, // Import useColorMode
    Link, // Import Link from Chakra UI
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom"; // Alias Link from react-router-dom as RouterLink
// Removed Heroicons SunIcon and MoonIcon
import {
    FaWhatsapp,
    FaTools,
    FaFolderOpen,
    FaSun,
    FaMoon,
} from "react-icons/fa"; // Import WhatsApp, Tools, Folder, Sun, Moon icons
import { AiFillHome } from "react-icons/ai"; // Import Home icon

import NAV_ITEMS from "../../data/nav-items";

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode(); // Use useColorMode
    const location = useLocation(); // Use useLocation

    // Glassmorphism styles
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.1)",
        "rgba(0, 0, 0, 0.1)"
    ); // More subtle background
    const textColor = useColorModeValue("gray.800", "gray.100");
    const activeColor = useColorModeValue("primary.600", "primary.300");
    const inactiveColor = useColorModeValue("gray.600", "gray.400");

    const mobileNavItems = [
        { label: "Inicio", icon: AiFillHome, href: "/" }, // Changed to AiFillHome
        { label: "Servicios", icon: FaTools, href: "/servicios" }, // Changed to FaTools
        { label: "Proyectos", icon: FaFolderOpen, href: "/proyectos" }, // Changed to FaFolderOpen
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <Box
                as="header"
                position="sticky"
                top="6"
                zIndex="sticky"
                py={4}
                display={{ base: "none", md: "block" }}
            >
                <Flex
                    as="nav"
                    bg={bgColor}
                    color={textColor}
                    minH="60px"
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    align="center"
                    justifyContent="center" // Center the DesktopNav
                    position="relative" // Allow absolute positioning of children
                    maxW="7xl" // Constrain width to align with other content
                    mx="auto" // Center the Navbar
                    // Glassmorphism effects
                    backdropFilter="blur(10px)" // Suave blur
                    border="none" // SIN borde
                    boxShadow="none" // SIN shadow
                    borderRadius="2xl"
                    transition="all 0.3s ease"
                >
                    {/* DESKTOP */}
                    <Flex
                        flex={{ base: 1 }} // Take up available space
                        justifyContent="center" // Center the DesktopNav
                        alignItems="center"
                        display={{ base: "none", md: "flex" }} // Only show on desktop
                    >
                        <DesktopNav />
                    </Flex>
                    <IconButton
                        aria-label="Toggle Color Mode"
                        icon={
                            colorMode === "light" ? (
                                <FaMoon size="24" /> // Changed to FaMoon
                            ) : (
                                <FaSun size="24" /> // Changed to FaSun
                            )
                        }
                        onClick={toggleColorMode}
                        variant="ghost"
                        color={inactiveColor}
                        _hover={{ bg: "transparent", color: activeColor }}
                        position="absolute"
                        right="4"
                        top="50%"
                        transform="translateY(-50%)"
                        display={{ base: "none", md: "block" }} // Only show on desktop
                    />
                </Flex>
            </Box>

            {/* Mobile Bottom Navbar (Styled like desktop Navbar) */}
            <Flex
                display={{ base: "flex", md: "none" }} // Only show on mobile
                position="fixed"
                bottom="4" // Margin from bottom
                left="4" // Margin from left
                right="4" // Margin from right
                zIndex="sticky"
                bg={bgColor}
                backdropFilter="blur(10px)"
                border="none" // SIN borde
                boxShadow="none" // SIN shadow
                borderRadius="2xl"
                transition="all 0.3s ease"
                py={2} // Vertical padding
                px={2} // Horizontal padding
                minH="50px" // Compact height
                justifyContent="space-around"
                alignItems="center"
            >
                {mobileNavItems.map((item) => (
                    <RouterLink to={item.href} key={item.label}>
                        {" "}
                        {/* Changed to RouterLink */}
                        <IconButton
                            variant="ghost"
                            aria-label={item.label}
                            icon={<item.icon size="24" />}
                            color={
                                location.pathname === item.href
                                    ? activeColor
                                    : inactiveColor
                            }
                            _hover={{ bg: "transparent", color: activeColor }}
                        />
                    </RouterLink>
                ))}

                {/* WhatsApp Icon for Mobile */}
                <Link
                    href="https://wa.me/51974278303?text=Quisiera una cotización para ...."
                    isExternal
                >
                    {" "}
                    {/* Placeholder number, now using Chakra Link */}
                    <IconButton
                        variant="ghost"
                        aria-label="WhatsApp"
                        icon={<FaWhatsapp size="24" />}
                        color={inactiveColor}
                        _hover={{ bg: "transparent", color: activeColor }}
                    />
                </Link>

                <IconButton
                    variant="ghost"
                    aria-label="Toggle Color Mode"
                    icon={
                        colorMode === "light" ? (
                            <FaMoon size="24" /> // Changed to FaMoon
                        ) : (
                            <FaSun size="24" /> // Changed to FaSun
                        )
                    }
                    onClick={toggleColorMode}
                    color={inactiveColor}
                    _hover={{ bg: "transparent", color: activeColor }}
                />
            </Flex>
        </>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.700", "gray.200");
    const linkHoverColor = useColorModeValue("primary.600", "primary.300");

    return (
        <Stack direction="row" spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <RouterLink // Changed to RouterLink
                    key={navItem.label}
                    to={navItem.href ?? "#"}
                    style={{ textDecoration: "none" }}
                >
                    <Box
                        p={2}
                        fontSize="md"
                        fontWeight={600}
                        color={linkColor}
                        transition="color 0.3s ease"
                        _hover={{
                            color: linkHoverColor,
                        }}
                    >
                        {navItem.label}
                    </Box>
                </RouterLink>
            ))}
        </Stack>
    );
};
