import React from "react";
import {
    Card,
    CardBody,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// ...existing code...

const ClientCard = React.memo(({ IMAGE, nameClient, descClient }) => {
    const borderColor = useColorModeValue("gray.200", "gray.900"); // Using gray.900 for dark mode border
    return (
        <Card
            w={"full"}
            maxW={{ base: "full", md: "475px" }}
            h={{ base: "auto", md: "xl" }}
            p={{ base: 3, md: 6 }}
            boxShadow={{ base: "base", md: "lg" }}
            border={"1px solid"}
            borderColor={borderColor}
            pos={"relative"}
            rounded={"lg"}
            _hover={{
                transform: "scale(1.02)",
            }}
        >
            <CardBody textAlign={"center"}>
                <Image
                    src={IMAGE}
                    borderRadius={"lg"}
                    objectFit={"cover"}
                    shadow={"xl"}
                    w={"full"}
                    h={{ base: "260px", md: "375px" }}
                    mb={5}
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
});

ClientCard.displayName = "ClientCard";

export default ClientCard;
