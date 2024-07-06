import React from "react";
import {
    Box,
    Button,
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
        <>
            <Flex
                mx={"auto"}
                maxW="1400px"
                flexDir={{ base: "column", md: "column" }}
                w={{ base: "full", md: "85%" }}
                justifyContent={"center"}
                alignItems={"center"}
                h={"91vh"}
            >
                <Center>
                    <Image
                        src={imglogo}
                        alt="Logo"
                        w={{ base: "55%", md: "35%" }}
                        h="auto"
                    />
                </Center>
                <Container textAlign={"center"}>
                    <Heading
                        as="h2"
                        fontSize={{ base: "2xl", md: "4xl" }}
                        fontWeight="semibold"
                        mt={8}
                    >
                        Vidriería & Aluminio
                    </Heading>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "5xl" }}
                        fontWeight="bold"
                        mt={2}
                    >
                        GLASS & ALUMINUM
                    </Heading>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="bold"
                    >
                        COMPANY S.A.C.
                    </Heading>
                    <Text fontSize="lg" mt={4}>
                        Empresa Comercial Especialista en la instalación de
                        cristales y aluminios para Constructoras, Negocios y
                        Hogares.
                    </Text>
                    <Button size="lg" colorScheme="green" mt="24px">
                        <a
                            href="https://wa.me/51996537435?text=Quisiera una cotización para ...."
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}
                        >
                            <i className="fa-brands fa-whatsapp mx-2" />
                            Solicita un presupuesto ahora
                        </a>
                    </Button>
                </Container>
            </Flex>
        </>
    );
};

export default LandPage;
