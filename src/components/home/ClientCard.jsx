import React from "react";
import {
    Card,
    CardBody,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import FadingImage from "../common/FadingImage";

const ClientCard = React.memo(({ image, nameClient, descClient }) => {
    const borderColor = useColorModeValue("gray.200", "gray.900"); // Using gray.900 for dark mode border
    return (
        <Card
            w="full"
            maxW={{ base: "full", md: "md" }} // Standardized maxW to Chakra token
            h={{ base: "auto", md: "xl" }}
            p={{ base: 3, md: 6 }}
            boxShadow={{ base: "base", md: "lg" }}
            border="1px solid"
            borderColor={borderColor}
            pos="relative"
            rounded="lg"
            _hover={{
                transform: "scale(1.015)",
                boxShadow: "xl",
                transition: "all 0.3s ease-out",
            }}
        >
            <CardBody textAlign="center">
                <FadingImage
                    src={image}
                    alt={`Imagen de ${nameClient}`}
                    rounded="lg" // Standardized borderRadius to rounded
                    objectFit="cover"
                    shadow="xl"
                    w="full"
                    h={{ base: "260px", md: "375px" }}
                    mb={5}
                />
                <Stack spacing={3}>
                    <Heading size="lg">{nameClient}</Heading>
                    <Text mt={1} fontSize="md" color="gray.500" px={6}>
                        {descClient}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;