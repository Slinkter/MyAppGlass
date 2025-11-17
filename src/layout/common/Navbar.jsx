import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import ColorModeSwitcher from "../../components/common/ColorModeSwitcher";
import NAV_ITEMS from "../../data/nav-items";

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();

    // Glassmorphism styles
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.1)",
        "rgba(0, 0, 0, 0.1)"
    ); // More subtle background
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    ); // Keep border for MobileNav if needed
    const textColor = useColorModeValue("gray.800", "gray.100");

    return (
        <Box as="header" position="sticky" top="6" zIndex="sticky" py={4}>
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
                // Glassmorphism effects (GlassSection rules)
                backdropFilter="blur(10px)" // Suave blur
                border="none" // SIN borde
                boxShadow="none" // SIN shadow
                borderRadius="2xl"
                transition="all 0.3s ease"
            >
                {/* MOVIL */}
                <Flex
                    display={{ base: "flex", md: "none" }}
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                >
                    <IconButton
                        onClick={onToggle}
                        aria-label="Toggle Navigation"
                        variant="ghost"
                        _hover={{
                            bg: useColorModeValue(
                                "whiteAlpha.400",
                                "blackAlpha.400"
                            ),
                        }}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                    />
                </Flex>
                {/* DESKTOP */}
                <Flex
                    flex={{ base: 1 }} // Take up available space
                    justifyContent="center" // Center the DesktopNav
                    alignItems="center"
                    display={{ base: "none", md: "flex" }} // Only show on desktop
                >
                    <DesktopNav />
                </Flex>
                <ColorModeSwitcher
                    position="absolute"
                    right="4"
                    top="50%"
                    transform="translateY(-50%)"
                />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav onToggle={onToggle} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.700", "gray.200");
    const linkHoverColor = useColorModeValue("primary.600", "primary.300");

    return (
        <Stack direction="row" spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Link
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
                </Link>
            ))}
        </Stack>
    );
};

const MobileNav = ({ onToggle }) => {
    // Glassmorphism styles (GlassSection rules)
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.1)",
        "rgba(0, 0, 0, 0.1)"
    ); // More subtle background
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    );

    return (
        <Stack
            display={{ md: "none" }}
            p={4}
            mt={2}
            // Glassmorphism effects (GlassSection rules)
            bg={bgColor}
            backdropFilter="blur(10px)" // Suave blur
            border="none" // SIN borde
            boxShadow="none" // SIN shadow
            borderRadius="2xl"
            transition="all 0.3s ease"
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem
                    key={navItem.label}
                    onToggle={onToggle}
                    {...navItem}
                />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, href, onToggle }) => {
    return (
        <Stack spacing={4} onClick={onToggle}>
            <Link to={href ?? "#"} style={{ textDecoration: "none" }}>
                <Box
                    py={2}
                    justifyContent="space-between"
                    alignItems="center"
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    <Text
                        fontWeight={600}
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        {label}
                    </Text>
                </Box>
            </Link>
        </Stack>
    );
};
