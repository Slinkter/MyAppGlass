import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import logoGYA from "../../assets/branding/logovcr.png";

/**
 * Componente LandPage
 * Muestra la cabecera principal con branding y descripción.
 * @component
 * @returns {JSX.Element}
 */
const LandingPageSection = React.memo(() => {
  return (
    <Box>
      <Flex
        minH={"100vh"}
        w={{ base: "full", md: "full" }}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        pb={20}
      >
        <Center>
          <Image src={logoGYA} alt="Logo" w={{ base: "55%", md: "30%" }} />
        </Center>
        <Box
          textAlign={"center"}
          p={{ base: 6, md: 10 }}
          mt={8}
          maxW="4xl"
          // Glassmorphism effects
        >
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="semibold"
            color={useColorModeValue("primary.700", "primary.300")}
            textTransform={"uppercase"}
          >
            Vidriería & Aluminio
          </Heading>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            mt={2}
            color={useColorModeValue("gray.900", "white")}
          >
            GLASS & ALUMINUM COMPANY S.A.C.
          </Heading>

          <Text
            fontSize="xl"
            mt={6}
            color={useColorModeValue("gray.800", "gray.200")}
          >
            Empresa Comercial Especialista en la venta e instalación de
            cristales y aluminios
          </Text>
        </Box>
      </Flex>
    </Box>
  );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
