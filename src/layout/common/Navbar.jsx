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

    return (
        <>
            <Flex
                minH="12" // Standardized from "50px" to Chakra token
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle="solid"
                borderColor={useColorModeValue("gray.200", "blackAlpha.500")}
                align="center"
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
                    flex={{ base: 1 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Flex display={{ base: "none", md: "flex" }}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <ColorModeSwitcher />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav onToggle={onToggle} />
            </Collapse>
        </>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("red.400", "red.600");

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
    return (
        <Stack
            display={{ md: "none" }}
            p={4}
            bg={useColorModeValue("white", "gray.900")}
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
                        color={useColorModeValue("gray.600", "gray.200")}
                    >
                        {label}
                    </Text>
                </Box>
            </Link>
        </Stack>
    );
};
