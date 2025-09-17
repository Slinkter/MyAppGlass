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

import logoGYA from "../../assets/logovcr.png";
import bg_home_desktop from "../../assets/mainland.jpg";

const LandPage = () => {
    return (
        <Box
            backgroundImage={{
                base: useColorModeValue("gray.50", "gray.800"),
                md: `linear-gradient(90deg, rgba(0, 0, 0, .483), rgba(4, 4, 4, .414)),url(${bg_home_desktop})`,
            }}
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Flex
                flexDir={{ base: "column", md: "column" }}
                w={{ base: "full", md: "full" }}
                justifyContent={"center"}
                alignItems={"center"}
                minH={"100vh"}
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
                            base: useColorModeValue("red.500", "red.300"),
                            md: "white",
                        }}
                        textShadow={{
                            base: " ",
                            md: "2px 2px #000",
                        }}
                        textTransform={"uppercase"}
                    >
                        Vidriería & Aluminio
                    </Heading>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="bold"
                        mt={2}
                        color={{
                            base: useColorModeValue("gray.800", "gray.100"),
                            md: "white",
                        }}
                        fontStyle={"600"}
                        textShadow={{
                            base: " ",
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
                            base: " ",
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
};

export default LandPage;
