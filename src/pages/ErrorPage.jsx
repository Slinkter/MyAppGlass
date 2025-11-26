import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useNavigate, useLocation, useRouteError } from "react-router-dom"; // Import useLocation and useRouteError

const ErrorView = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const error = useRouteError(); // Get route error data
    const [countdown, setCountdown] = useState(15);

    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)");
    const borderColor = useColorModeValue("rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.15)");
    const textColor = useColorModeValue("gray.800", "gray.100");
    const headingColor = useColorModeValue("red.500", "red.300");
    const countdownColor = useColorModeValue("primary.600", "primary.300");

    useEffect(() => {
        // Log location and error data for debugging
        console.log("ErrorPage rendered at location:", location.pathname);
        if (error) {
            console.error("Route error:", error);
        }

        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(timer);
            navigate("/");
        }

        return () => clearInterval(timer);
    }, [countdown, navigate, location, error]); // Add location and error to dependency array

    return (
        <VStack minH="100dvh" justifyContent="center" alignItems="center" p={4}>
            <Box
                bg={bgColor}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="0 4px 30px rgba(0,0,0,0.1)"
                borderRadius="2xl"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                p={8}
                color={textColor}
            >
                <Heading as="h1" size="4xl" mb={4} color={headingColor}>
                    404
                </Heading>
                <Heading as="h2" size="2xl" mb={4} color={headingColor}>
                    Página no encontrada
                </Heading>
                <Text fontSize="xl" mb={6}>
                    Lo sentimos, la ruta a la que intentas acceder no existe.
                </Text>
                <Text fontSize="lg">
                    Serás redirigido a la página de inicio en{" "}
                    <Text as="span" fontWeight="bold" color={countdownColor}>
                        {countdown}
                    </Text>{" "}
                    segundos...
                </Text>
            </Box>
        </VStack>
    );
};

export default ErrorView;
