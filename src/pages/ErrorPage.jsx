import React from "react";
import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorView = () => {
    const [countdown, setCountdown] = useState(15);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(timer);
            navigate("/");
        }

        return () => clearInterval(timer);
    }, [countdown, navigate]);

    return (
        <VStack minH="100vh" justifyContent="center" alignItems="center" p={4}>
            <Box
                textAlign="center"
                p={8}
                borderRadius="lg"
                boxShadow="xl"
                bg="white"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Heading as="h1" size="4xl" mb={4} color="red.500">
                    404
                </Heading>
                <Heading as="h1" size="2xl" mb={4} color="red.500">
                    Página no encontrada
                </Heading>
                <Text fontSize="xl" mb={6}>
                    Lo sentimos, la ruta a la que intentas acceder no existe.
                </Text>
                <Text fontSize="lg">
                    Serás redirigido a la página de inicio en{" "}
                    <Text as="span" fontWeight="bold" color="blue.900">
                        {countdown}
                    </Text>{" "}
                    segundos...
                </Text>
            </Box>
        </VStack>
    );
};

export default ErrorView;
