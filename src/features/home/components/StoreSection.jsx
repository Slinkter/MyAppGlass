import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Franja from "@shared/components/common/Franja";
import { Icon } from "@chakra-ui/react";
import { FaMapLocationDot } from "react-icons/fa6";
import InteractiveMap from "./InteractiveMap";

/**
 * Componente StoreSection
 * Muestra la sección de la ubicación de la tienda con un mapa interactivo
 * que incluye marcadores de la tienda principal y todos los proyectos realizados.
 * @component
 * @returns {JSX.Element}
 */
const StoreSection = React.memo(() => {
  const buttonBg = useColorModeValue(
    "rgba(255, 255, 255, 0.4)",
    "rgba(0, 0, 0, 0.4)",
  );
  const buttonHoverBg = useColorModeValue(
    "rgba(255, 255, 255, 0.6)",
    "rgba(0, 0, 0, 0.6)",
  );
  const buttonActiveBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(0, 0, 0, 0.8)",
  );
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      height={{ base: "auto", md: "auto" }}
      display="flex"
      flexDirection="column"
    >
      <Franja
        title="UBICACIONES"
        text="Nuestra tienda principal y proyectos realizados en Lima"
        minHeight="20vh"
      />
      <Container maxW={"7xl"} mt={12} mb={12} px={{ base: 4, md: 8 }}>
        <Flex
          alignItems="center"
          justifyContent="center"
          minHeight={{ base: "auto", md: "auto" }}
          flexDir="column"
          textAlign={"center"}
        >
          {/* Mapa interactivo con marcadores */}
          <InteractiveMap />

          {/* Botón para abrir en Google Maps */}
          <Link href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36" isExternal>
            <Button
              mt={{ base: 8, md: 5 }}
              leftIcon={<Icon as={FaMapLocationDot} />}
              bg={buttonBg}
              color={textColor}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
              type="submit"
              colorScheme="primary"
              width={{ base: "full", md: "lg" }}
            >
              Abrir en Google Maps
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
