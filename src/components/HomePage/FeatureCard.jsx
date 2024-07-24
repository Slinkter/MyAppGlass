import {
    Box,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useMediaQuery,
    Button,
} from "@chakra-ui/react";
import React from "react";

const FeatureCard = ({ heading, description, icon, href }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Ajusta el punto de quiebre según sea necesario
    return (
        <Card
            w={"full"}
            maxW={{ base: "full", md: "375px" }}
            h={{ base: "", md: "" }}
            overflow="hidden"
            p={isMobile ? 3 : 6}
            boxShadow={{ base: "base", md: "lg" }}
            pos={"relative"}
            rounded={"lg"}
        >
            <CardHeader>
                <Flex
                    w={20}
                    h={20}
                    align={"center"}
                    justify={"center"}
                    rounded={"full"}
                    bg={useColorModeValue("gray.100", "gray.400")}
                    mx="auto"
                >
                    {icon}
                </Flex>
            </CardHeader>
            <CardBody textAlign="center">
                <Heading size="md" mb={3}>
                    {heading}
                </Heading>
                <Text mt={1} fontSize={"sm"} color={"gray.500"}>
                    {description}
                </Text>
            </CardBody>
        </Card>
    );
};

export default FeatureCard;
