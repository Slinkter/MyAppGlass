import {
    Box,
    Container,
    Heading,
    Text,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import ItemService from "./ItemServicio";
import listService from "./db_service";

const Service = () => {
    return (
        <Container maxW={"8xl"} my={6} textAlign="center">
            <Heading
                as="h2"
                color="red.500"
                mb={{ base: "2", md: "2" }}
                fontSize={{ base: "4xl", md: "4xl" }}
                mt={4}
                textTransform={"uppercase"}
                fontWeight={600}
                letterSpacing={"wide"}
                textAlign="center"
                borderBottom={"4px"}
                borderColor={"red.500"}
                width={"fit-content"}
                mx={"auto"}
            >
                SERVICIOS
            </Heading>
            <Text
                mb={{ base: "2", md: "4" }}
                fontSize={{ base: "2xl", md: "2xl" }}
                color={useColorModeValue("gray.600", "white")}
                textAlign="center"
            >
                Fabricación & Instalación
            </Text>

            <Flex
                direction={{ base: "column", md: "row" }}
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
    );
};

export default Service;
