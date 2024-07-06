import {
    Box,
    Flex,
    Link,
    IconButton,
    useDisclosure,
    Stack,
    Collapse,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Show, Hide } from "@chakra-ui/react";

const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box p={6} pos={"relative"} alignSelf={"center"} w={"full"}>
            <Flex
                mx={"auto"}
                maxW="1200px"
                justifyContent={{ base: "center", md: "center" }}
                wrap="wrap"
            >
                <Show above="md">
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        display={{ base: "none", md: "flex" }}
                        mt={{ base: 4, md: 0 }}
                        justifyContent="space-between"
                        alignItems="center"
                        transition={"all 0.3 ease-in"}
                    >
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            spacing={4}
                            align="center"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Link as={RouterLink} to="/" p={2}>
                                Inicio
                            </Link>
                            <Link as={RouterLink} to="/servicios" p={2}>
                                Servicios
                            </Link>
                            <Link as={RouterLink} to="/producto" p={2}>
                                Productos
                            </Link>
                            <Link as={RouterLink} to="/proyectos" p={2}>
                                Proyectos
                            </Link>
                            <Link as={RouterLink} to="/nosotros" p={2}>
                                Nosotros
                            </Link>
                        </Stack>
                    </Flex>
                </Show>

                <Hide above="md">
                    <IconButton
                        position={"absolute"}
                        top={0}
                        right={1}
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        variant="outline"
                        aria-label="Toggle Navigation"
                    />

                    <Collapse
                        in={isOpen}
                        animateOpacity
                        transition={{
                            exit: { delay: 1.2 },
                            enter: { duration: 0.5 },
                        }}
                    >
                        <Flex
                            direction={{ base: "column", md: "row" }}
                            display={{
                                base: isOpen ? "flex" : "none",
                                md: "flex",
                            }}
                            mt={{ base: 4, md: 0 }}
                            justifyContent="space-between"
                            alignItems="center"
                            transition={"all 0.3 ease-in"}
                        >
                            <Stack
                                direction={{ base: "column", md: "row" }}
                                spacing={4}
                                align="center"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Link as={RouterLink} to="/" p={2}>
                                    Inicio
                                </Link>
                                <Link as={RouterLink} to="/servicios" p={2}>
                                    Servicios
                                </Link>
                                <Link as={RouterLink} to="/producto" p={2}>
                                    Productos
                                </Link>
                                <Link as={RouterLink} to="/proyectos" p={2}>
                                    Proyectos
                                </Link>
                                <Link as={RouterLink} to="/nosotros" p={2}>
                                    Nosotros
                                </Link>
                            </Stack>
                        </Flex>
                    </Collapse>
                </Hide>
            </Flex>
        </Box>
    );
};

export default Navbar;
