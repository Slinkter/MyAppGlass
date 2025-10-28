import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    useColorModeValue,
    useDisclosure,
    useColorMode,
} from "@chakra-ui/react";
import {
    HamburgerIcon,
    CloseIcon,
    MoonIcon,
    SunIcon,
} from "@chakra-ui/icons";

const NAV_ITEMS = [
    {
        label: "Inicio",
        href: "/",
    },
    {
        label: "Servicios",
        href: "/servicios",
    },
    {
        label: "Proyectos",
        href: "/proyectos",
    },
];

export default function WithSubnavigation() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onToggle } = useDisclosure();

    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";
    const bgColor = useColorModeValue(colorWhite, colorBlack);

    return (
        <>
            {/* desktop */}
            <Flex
                minH={"50px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={bgColor}
                align={"center"}
            >
                <Flex // 1.mobil
                    display={{ base: "flex", md: "none" }}
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        aria-label={"Toggle Navigation"}
                        variant={"ghost"}
                    />
                </Flex>
                <Flex // 2.desktop
                    flex={{ base: 1 }}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Flex display={{ base: "none", md: "flex" }}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Flex // 3.Theme
                    w={10}
                    h={10}
                    justify={"center"}
                    align={"center"}
                    rounded={"full"}
                    bg={bgColor}
                    onClick={toggleColorMode}
                >
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Flex>
            </Flex>
            {/* movil */}
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </>
    );
}

/*  */

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("red.400", "red.600");

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box
                    key={navItem.label}
                    as="a"
                    p={2}
                    href={navItem.href ?? "#"}
                    fontSize={"md"}
                    fontWeight={600}
                    color={linkColor}
                    _hover={{
                        textDecoration: "none",
                        color: linkHoverColor,
                    }}
                >
                    {navItem.label}
                </Box>
            ))}
        </Stack>
    );
};

/*  */
const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.900")}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

/*  */

const MobileNavItem = ({ label, children, href }) => {
    const { onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? "#"}
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
        </Stack>
    );
};
