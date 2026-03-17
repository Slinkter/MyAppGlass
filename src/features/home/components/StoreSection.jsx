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
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
  Spinner,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
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
  return (
    <ItemGridLayout
      title="UBICACION"
      subtitle="Av. Los Fresnos 1250 - La Molina "
      seoTitle="Ubicaciones - GYA Company"
      seoDescription="Encuentra nuestra tienda principal en Lima y explora la ubicación de nuestros proyectos de vidriería y aluminio."
      seoCanonicalUrl="https://www.gyacompany.com/ubicaciones"
      columns={{ base: 1 }}
      spacing={4}
      containerProps={{
        mt: 0,
        pt: 8,
        pb: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ItemGridLayout.Item>
        <Box w="full" mt={4} mb={12}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 280px" }}
            gap={{ base: 6, lg: 8 }}
            alignItems="start"
          >
            <GridItem>
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
            </GridItem>

            <GridItem>
              <VStack spacing={4} align={{ base: "center", lg: "flex-start" }} pt={{ base: 0, lg: 4 }}>
                <VStack spacing={1} align={{ base: "center", lg: "flex-start" }}>
                  <Text fontWeight="bold" fontSize="lg">
                    Horario de Atención
                  </Text>
                  <Text fontSize="md">Lunes a Sábado</Text>
                  <Text fontSize="md">9:00 am – 5:00 pm</Text>
                </VStack>
                <VStack spacing={1} align={{ base: "center", lg: "flex-start" }}>
                  <Text fontWeight="bold" fontSize="lg">
                    Dirección
                  </Text>
                  <Text fontSize="md">Av. Los Fresnos 1250</Text>
                  <Text fontSize="md">La Molina, Lima</Text>
                </VStack>
                <Link href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36" isExternal w="full">
                  <Button
                    leftIcon={<Icon as={FaMapLocationDot} />}
                    colorScheme="primary"
                    width="full"
                    size={{ base: "lg", md: "md" }}
                  >
                    Abrir en Google Maps
                  </Button>
                </Link>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </ItemGridLayout.Item>
    </ItemGridLayout>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
