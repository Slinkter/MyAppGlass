/**
 * @file ErrorPage.jsx
 * @description Custom 404/Error page with an automatic redirect timer.
 * Refactored to use semantic tokens for full theme compatibility.
 */

import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorView = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <VStack minH="100dvh" justifyContent="center" alignItems="center" p={4} bg="bg.page">
      <Box
        bg="bg.section"
        border="1px solid"
        borderColor="border.glass"
        boxShadow="0 4px 30px rgba(0,0,0,0.1)"
        borderRadius="2xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={8}
        color="text.body"
      >
        <Heading as="h1" size="4xl" mb={4} color="text.accent">
          404
        </Heading>
        <Heading as="h2" size="2xl" mb={4} color="text.heading">
          Página no encontrada
        </Heading>
        <Text fontSize="xl" mb={6}>
          Lo sentimos, la ruta a la que intentas acceder no existe.
        </Text>
        <Text fontSize="lg">
          Serás redirigido a la página de inicio en{" "}
          <Text as="span" fontWeight="bold" color="text.accent">
            {countdown}
          </Text>{" "}
          segundos...
        </Text>
      </Box>
    </VStack>
  );
};

export default ErrorView;
