import React from "react";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Icon,
    Image,
    Text,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { MdSettings } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const LandPage = () => {
    const imglogo =
        "https://gyacompany.com/static/media/logovcr.8a738518d0998756db65.png";
    return (
        <Box
            backgroundImage="linear-gradient(90deg, rgba(0, 0, 0, .383), rgba(4, 4, 4, .314)),url('https://gyacompany.com/static/media/mainland.b54ee0d75a00a56cd8e6.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
            h={"95vh"}
        >
            <Flex
                mx={"auto"}
                flexDir={{ base: "column", md: "column" }}
                w={{ base: "full", md: "95%" }}
                justifyContent={"center"}
                alignItems={"center"}
                h={"91vh"}
            >
                <Center>
                    <Image
                        src={imglogo}
                        alt="Logo"
                        w={{ base: "55%", md: "35%" }}
                        boxShadow="2xl"
                        borderRadius="full"
                        p={1}
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
                    >
                        Vidriería & Aluminio
                    </Heading>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="bold"
                        mt={2}
                        color={"white"}
                        textShadow="2px 2px #000"
                    >
                        GLASS & ALUMINUM COMPANY S.A.C.
                    </Heading>

                    <Text
                        fontSize="xl"
                        mt={4}
                        color={"white"}
                        textShadow="1px 1px #000"
                    >
                        Empresa Comercial Especialista en la instalación de
                        cristales y aluminios para Constructoras, Negocios y
                        Hogares.
                    </Text>
                    <Button
                        leftIcon={<Icon as={FaWhatsapp} />}
                        size="lg"
                        mt="24px"
                        colorScheme="green"
                    >
                        <a href="https://wa.me/51996537435?text=Quisiera una cotización para ....">
                            Solicita un presupuesto ahora
                        </a>
                    </Button>
                </Container>
            </Flex>
        </Box>
    );
};

export default LandPage;
