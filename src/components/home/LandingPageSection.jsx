import React from "react";
import {
    Box,
    Center,
    Container,
    Flex,
    Heading,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import logoGYA from "../../assets/branding/logovcr.png";
import bg_home_desktop from "../../assets/common/mainland.jpg";

/**
 * Componente LandPage
 * Muestra la cabecera principal con branding y descripción.
 * @component
 * @returns {JSX.Element}
 */
const LandingPageSection = React.memo(() => {
    return (
        <Box
            backgroundImage={{
                base: useColorModeValue("gray.50", "gray.800"),
                md: `linear-gradient(90deg, rgba(0, 0, 0, .483), rgba(4, 4, 4, .414)), url(${bg_home_desktop})`,
            }}
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Flex
                minH={"100vh"}
                w={{ base: "full", md: "full" }}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                pb={20}
            >
                <Center>
                    <Image
                        src={logoGYA}
                        alt="Logo"
                        w={{ base: "55%", md: "30%" }}
                    />
                </Center>
                <Container textAlign={"center"}>
                    <Heading
                        as="h2"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="semibold"
                        mt={4}
                        color={{
                            base: useColorModeValue(
                                "primary.500",
                                "primary.300"
                            ),
                            md: "white",
                        }}
                        textShadow={{
                            base: "none",
                            md: "2px 2px #000",
                        }}
                        textTransform={"uppercase"}
                    >
                        Vidriería & Aluminio
                    </Heading>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight={600}
                        mt={2}
                        color={{
                            base: useColorModeValue("gray.800", "gray.100"),
                            md: "white",
                        }}
                        textShadow={{
                            base: "none",
                            md: "2px 2px #000",
                        }}
                    >
                        GLASS & ALUMINUM COMPANY S.A.C.
                    </Heading>

                    <Text
                        fontSize="xl"
                        mt={4}
                        color={{
                            base: useColorModeValue("gray.600", "gray.300"),
                            md: "white",
                        }}
                        textShadow={{
                            base: "none",
                            md: "2px 2px #000",
                        }}
                    >
                        Empresa Comercial Especialista en la venta e instalación
                        de cristales y aluminios
                    </Text>
                </Container>
            </Flex>
        </Box>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
