/**
 * @file StoreSection.jsx
 * @description Section component that anchors the physical presence of the store with map integration.
 * @module home/components
 * @remarks
 * The `InteractiveMap` is lazy-loaded within this section to optimize the Initial Page Load.
 */

import React, { Suspense, lazy } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Franja from "@shared/components/common/Franja";
import { Icon } from "@chakra-ui/react";
import { FaMapLocationDot } from "react-icons/fa6";

// Carga perezosa del mapa para evitar errores de inicialización en producción
const InteractiveMap = lazy(() => import("./InteractiveMap"));

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
          <Suspense
            fallback={
              <Flex
                align="center"
                justify="center"
                h={{ base: "400px", md: "600px" }}
                w="full"
                bg={useColorModeValue("gray.100", "gray.800")}
                rounded="2xl"
              >
                <Spinner size="xl" color="primary.500" thickness="4px" />
              </Flex>
            }
          >
            <InteractiveMap />
          </Suspense>

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
