import React from "react";
import { Box, Card, CardBody, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import useIsMobile from "../../hooks/useIsMobile";

const ClientsCard = ({ IMAGE, nameClient, descClient }) => {
    const isMobile = useIsMobile(); // Ajusta el punto de quiebre según sea necesario
    const borderColor = useColorModeValue("gray.200", "black");
    return (
        <Card
            w={"full"}
            maxW={{ base: "full", md: "475px" }}
            h={{ base: "", md: "xl" }}
            p={isMobile ? 3 : 6}
            boxShadow={{ base: "base", md: "lg" }}
            border={"1px solid"}
            borderColor={borderColor}
            pos={"relative"}
            rounded={"lg"}
            transition="all .2s ease-in-out" // Duración y tipo de transición
            _hover={{
                transform: "scale(1.02)", // Escala al pasar el cursor sobre el componente
            }}
        >
            <CardBody textAlign={"center"}>
                <Image
                    src={IMAGE}
                    borderRadius={"lg"}
                    objectFit={"cover"}
                    shadow={"xl"}
                    w={"full"}
                    h={{ base: "260px", md: "375px" }} // Ajuste de altura responsiva
                    mb={"20px"}
                />
                <Stack spacing={3}>
                    <Heading size={"lg"}>{nameClient}</Heading>
                    <Text mt={1} fontSize={"md"} color={"gray.500"} px={6}>
                        {descClient}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default ClientsCard;
