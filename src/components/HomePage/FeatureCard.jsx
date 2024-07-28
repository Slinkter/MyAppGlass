import React from "react";
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";

const FeatureCard = ({ heading, description, icon, href }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Ajusta el punto de quiebre según sea necesario
    const borderColor = useColorModeValue("gray.200", "black");
    return (
        <Card
            w={"full"}
            maxW={{ base: "full", md: "375px" }}
            h={{ base: "", md: "base" }}
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
            <CardBody textAlign="center">
                <Flex
                    w={24}
                    h={24}
                    align={"center"}
                    justify={"center"}
                    rounded={"full"}
                    bg={useColorModeValue("gray.100", "gray.400")}
                    mx="auto"
                    mb={4}
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
