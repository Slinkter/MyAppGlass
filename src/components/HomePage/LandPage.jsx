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
    // Estilos para el texto que se repiten, centralizados para mayor claridad.
    const textStyles = {
        color: useColorModeValue("gray.100", "gray.100"),
        textShadow: "none",
        _dark: {
            md: { color: "white", textShadow: "2px 2px 4px #000" },
        },
        md: { color: "white", textShadow: "2px 2px 4px #000" },
    };

    return (
        <Box
            backgroundImage={{
                base: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg_home_desktop})`,
                md: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg_home_desktop})`,
            }}
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Flex
                flexDir="column"
                w="full"
                justifyContent={"center"}
                alignItems={"center"}
                minH={"100dvh"} // Usar dvh para una mejor experiencia en móviles
                pb={20}
            >
                <Center>
                    <Image
                        src={logoGYA}
                        alt="Logo de Glass & Aluminum Company" // Alt más descriptivo
                        w={{ base: "55%", md: "30%" }}
                    />
                </Center>
                <Container textAlign={"center"}>
                    <Heading
                        as="h2"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="semibold"
                        mt={4}
                        color={useColorModeValue("red.500", "red.300")}
                        sx={textStyles} // Aplicar estilos centralizados
                        textTransform={"uppercase"}
                    >
                        Vidriería & Aluminio
                    </Heading>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="bold"
                        mt={2}
                        sx={textStyles} // Aplicar estilos centralizados
                    >
                        GLASS & ALUMINUM COMPANY S.A.C.
                    </Heading>

                    <Text
                        fontSize="xl"
                        mt={4}
                        sx={textStyles} // Aplicar estilos centralizados
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
