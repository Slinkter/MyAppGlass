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
  Spinner,
  VStack,
  HStack,
  Text,
  Icon,
  usePrefersReducedMotion,
  Link,
} from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { MapPin, Clock } from "lucide-react";
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
  // eslint-disable-next-line no-unused-vars
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <ItemGridLayout
      title="UBICACION"
      subtitle="SEDE PRINCIPAL | PROYECTOS ENTREGADOS"
      seoTitle="Ubicaciones - GYA Company"
      seoDescription="Encuentra nuestra tienda principal en Lima y explora la ubicación de nuestros proyectos de vidriería y aluminio."
      seoCanonicalUrl="https://www.gyacompany.com/ubicaciones"
      columns={{ base: 1 }}
      spacing="phi_md"
      containerProps={{
        mt: 0,
        py: "phi_xl",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ItemGridLayout.Item>
        {/* CONTENEDOR MAESTRO - ACTÚA COMO ANCLA RELATIVA EN DESKTOP */}
        <Box 
          w="full" 
          position="relative" 
          h={{ base: "auto", lg: "650px" }}
        >
          {/* MAPA - ISLA INDEPENDIENTE EN MOBILE, FONDO EN DESKTOP */}
          <Box 
            w="full" 
            h={{ base: "400px", lg: "full" }}
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor="border.glass"
            shadow="lg"
          >
            <Suspense
              fallback={
                <Flex
                  align="center"
                  justify="center"
                  h="full"
                  w="full"
                  bg="bg.section"
                >
                  <Spinner size="xl" color="text.accent" thickness="4px" />
                </Flex>
              }
            >
              <InteractiveMap />
            </Suspense>
          </Box>

          {/* FICHA INFORMATIVA - FLOTANTE EN DESKTOP, BLOQUE INDEPENDIENTE EN MOBILE */}
          <VStack 
            position={{ base: "relative", lg: "absolute" }}
            top={{ lg: "phi_xl" }}
            left={{ lg: "phi_xl" }}
            zIndex={2}
            spacing="phi_xl" 
            align={{ base: "center", lg: "flex-start" }} 
            p="phi_lg"
            variant="glass"
            bg="bg.section"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.glass"
            shadow="2xl"
            w={{ base: "full", lg: "320px" }}
            mt={{ base: "phi_xl", lg: 0 }}
          >
            <VStack spacing="phi_md" align={{ base: "center", lg: "flex-start" }} w="full">
              <HStack spacing={3} color="text.accent">
                <Icon as={Clock} boxSize={5} />
                <Text fontWeight="bold" fontSize="sm" textTransform="uppercase" letterSpacing="widest">
                  Horarios
                </Text>
              </HStack>
              <Box pl={{ base: 0, lg: 8 }}>
                <Text fontSize="md" color="text.body" fontWeight="medium">Lunes a Sábado</Text>
                <Text fontSize="sm" color="text.muted">9:00 am – 5:00 pm</Text>
              </Box>
            </VStack>

            <VStack spacing="phi_md" align={{ base: "center", lg: "flex-start" }} w="full">
              <HStack spacing={3} color="text.accent">
                <Icon as={MapPin} boxSize={5} />
                <Text fontWeight="bold" fontSize="sm" textTransform="uppercase" letterSpacing="widest">
                  Dirección
                </Text>
              </HStack>
              <Box pl={{ base: 0, lg: 8 }}>
                <Text fontSize="md" color="text.body" fontWeight="medium">Av. Los Fresnos 1250</Text>
                <Text fontSize="sm" color="text.muted">La Molina, Lima - Perú</Text>
              </Box>
            </VStack>

            <Button
              as={Link}
              href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
              isExternal
              leftIcon={<Icon as={FaMapLocationDot} />}
              variant="aura"
              width="full"
              size="lg"
              py={7}
              aria-label="Cómo llegar a nuestra ubicación principal"
            >
              CÓMO LLEGAR
            </Button>
          </VStack>
        </Box>
      </ItemGridLayout.Item>
    </ItemGridLayout>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
