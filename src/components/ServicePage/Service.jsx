import React from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    useMediaQuery,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import ItemService from "./ItemServicio";
import listService from "./db_service";
window.document.title =
    "Vidrieria en La Molina instalación de ventanas, mamparas, puertas de ducha y más. Servicios de mantenimiento y calidad garantizada. tef. 996-537-435";
const Service = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <Box>
            <Container maxW={"8xl"} my={6} textAlign="center">
                <Heading
                    as="h2"
                    color="red.500"
                    mb={4}
                    fontSize={{ base: "2xl", md: "4xl" }}
                    mt={4}
                    textShadow="1px 1px #000"
                    textTransform={"uppercase"}
                >
                    SERVICIOS
                </Heading>
                <Text
                    mb={8}
                    fontSize="lg"
                    color={useColorModeValue("gray.500", "white")}
                    textAlign="center"
                >
                    Tenemos una amplia variedad de servicios de instalación en
                    cristales y aluminios
                </Text>

                <Flex
                    flexDir={isMobile ? "column" : "row"}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mx={"auto"}
                    gap={6}
                >
                    {listService.map((servicio) => (
                        <ItemService key={servicio.id} {...servicio} />
                    ))}
                </Flex>
            </Container>
        </Box>
    );
};

export default Service;
