import {
    Box,
    Card,
    CardBody,
    Divider,
    Heading,
    Image,
    Stack,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const ClientsCard = ({ IMAGE, nameClient, descClient }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed
    return (
        <Box maxW={{ base: "full", md: "375px" }} p={4}>
            <Card boxShadow={"lg"}>
                <CardBody>
                    <Image
                        src={IMAGE}
                        borderRadius={"lg"}
                        objectFit={"cover"}
                        w={"full"}
                        h={{ base: "260px", md: "460px" }} // Ajuste de altura responsiva
                    />
                    <Divider my={4} />
                    <Stack spacing={3}>
                        <Heading size={"lg"}>{nameClient}</Heading>
                        <Text>{descClient}</Text>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default ClientsCard;
