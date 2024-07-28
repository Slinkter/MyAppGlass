import React from "react";
import {
    Box,
    Center,
    Container,
    Flex,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";

const LandPage = () => {
    const imglogo =
        "https://gyacompany.com/static/media/logovcr.8a738518d0998756db65.png";
    return (
        <Box
            backgroundImage="linear-gradient(90deg, rgba(0, 0, 0, .483), rgba(4, 4, 4, .414)),url('https://gyacompany.com/static/media/mainland.b54ee0d75a00a56cd8e6.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Flex
                flexDir={{ base: "column", md: "column" }}
                w={{ base: "full", md: "full" }}
                justifyContent={"center"}
                alignItems={"center"}
                minH={"100vh"}
            >
                <Center>
                    <Image
                        src={imglogo}
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
                        color={"white"}
                        textShadow="2px 2px #000"
                        textTransform={"uppercase"}
                        shadow={"base"}
                    >
                        Vidriería & Aluminio
                    </Heading>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="bold"
                        mt={2}
                        color={"white"}
                        fontStyle={"600"}
                        textShadow="2px 3px #000"
                    >
                        GLASS & ALUMINUM COMPANY S.A.C.
                    </Heading>

                    <Text
                        fontSize="xl"
                        mt={4}
                        color={"white"}
                        textShadow="2px 2px #000"
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
