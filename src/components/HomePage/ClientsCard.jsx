import {
    Box,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useMediaQuery,
    Button,
} from "@chakra-ui/react";
import React from "react";

const ClientsCard = ({ IMAGE, nameClient, descClient, href }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Ajusta el punto de quiebre según sea necesario
    return (
        <Box maxW={{ base: "full", md: "475px" }} p={4}>
            <Card
                overflow="hidden"
                p={isMobile ? 3 : 6}
                boxShadow={{ base: "base", md: "lg" }}
                pos={"relative"}
            >
                <CardHeader>
                    <Image
                        src={IMAGE}
                        borderRadius={"lg"}
                        objectFit={"cover"}
                        w={"full"}
                        h={{ base: "260px", md: "345px" }} // Ajuste de altura responsiva
                    />
                </CardHeader>
                <CardBody textAlign={"center"}>
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
