import React from "react";
import { Card, CardBody, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import useIsMobile from "../../hooks/useIsMobile";

const FeatureCard = ({ heading, description, icon }) => {
    const isMobile = useIsMobile(); // Ajusta el punto de quiebre según sea necesario

    return (
        <Card
            w={"full"}
            maxW={{ base: "full", md: "375px" }}
            h={{ base: "", md: "base" }}
            p={isMobile ? 3 : 6}
            rounded={"lg"}
            boxShadow={{ base: "base", md: "lg" }}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.200", "black")}
            transition="all .2s ease-in-out" // Duración y tipo de transición
            _hover={{
                transform: "scale(1.02)", // Escala al pasar el cursor sobre el componente
            }}
        >
            <CardBody textAlign="center">
                <Flex
                    w={24}
                    h={24}
                    mx="auto"
                    mb={4}
                    align={"center"}
                    justify={"center"}
                    rounded={"full"}
                    bg={useColorModeValue("gray.200", "gray.400")}
                >
                    {icon}
                </Flex>
                <Heading size="md" mb={3}>
                    {heading}
                </Heading>
                <Text mt={1} fontSize={"md"} color={"gray.500"}>
                    {description}
                </Text>
            </CardBody>
        </Card>
    );
};

export default FeatureCard;
