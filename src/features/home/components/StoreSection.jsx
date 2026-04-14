import React, { Suspense, lazy } from "react";
import {
  Box,
  Button,
  Flex,
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
 * Muestra la sección de la ubicación de la tienda con un mapa interactivo.
 * @component
 */
const StoreSection = React.memo(() => {
  return (
    <ItemGridLayout
      title="UBICACION"
      subtitle="SEDE PRINCIPAL | PROYECTOS ENTREGADOS"
      seoTitle="Ubicaciones - GYA Company"
      seoDescription="Encuentra nuestra tienda principal en Lima y explora la ubicación de nuestros proyectos de vidriería y aluminio."
      seoCanonicalUrl="https://www.gyacompany.com/ubicaciones"
      columns={{ base: 1 }}
      gap="phi_md"
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
          h={{ base: "auto", lg: "700px" }}
        >
          {/* MAPA - ISLA INDEPENDIENTE EN MOBILE, FONDO EN DESKTOP */}
          <Box 
            w="full" 
            h={{ base: "400px", lg: "full" }}
            borderRadius="3xl"
            overflow="hidden"
            border="1px solid"
            borderColor="border.glass"
            boxShadow="2xl"
          >
            <Suspense
              fallback={
                <Flex align="center" justify="center" h="full" w="full" bg="bg.section">
                  <Spinner size="xl" color="text.accent" thickness="4px" />
                </Flex>
              }
            >
              <InteractiveMap />
            </Suspense>
          </Box>

          {/* FICHA INFORMATIVA - FLOTANTE EN DESKTOP */}
          <VStack 
            position={{ base: "relative", lg: "absolute" }}
            top={{ lg: "phi_xl" }}
            left={{ lg: "phi_xl" }}
            zIndex={2}
            gap="phi_xl" 
            align={{ base: "center", lg: "flex-start" }} 
            p="phi_lg"
            bg="bg.glass"
            backdropFilter="blur(24px)"
            borderRadius="3xl"
            border="1px solid"
            borderColor="border.glass"
            boxShadow="2xl"
            w={{ base: "full", lg: "340px" }}
            mt={{ base: "phi_xl", lg: 0 }}
          >
            <VStack gap="phi_md" align={{ base: "center", lg: "flex-start" }} w="full">
              <HStack gap={3} color="text.accent">
                <Icon as={Clock} boxSize={5} />
                <Text fontWeight="900" fontSize="xs" textTransform="uppercase" letterSpacing="0.2em">
                  Horarios
                </Text>
              </HStack>
              <Box pl={{ lg: "32px" }}>
                <Text fontSize="md" color="text.heading" fontWeight="700">Lunes a Sábado</Text>
                <Text fontSize="sm" color="text.muted">9:00 am – 5:00 pm</Text>
              </Box>
            </VStack>

            <VStack gap="phi_md" align={{ base: "center", lg: "flex-start" }} w="full">
              <HStack gap={3} color="text.accent">
                <Icon as={MapPin} boxSize={5} />
                <Text fontWeight="900" fontSize="xs" textTransform="uppercase" letterSpacing="0.2em">
                  Dirección
                </Text>
              </HStack>
              <Box pl={{ lg: "32px" }}>
                <Text fontSize="md" color="text.heading" fontWeight="700">Av. Los Fresnos 1250</Text>
                <Text fontSize="sm" color="text.muted">La Molina, Lima - Perú</Text>
              </Box>
            </VStack>

            <Button
              as="a"
              href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
              target="_blank"
              rel="noopener noreferrer"
              variant="aura"
              width="full"
              size="xl"
              borderRadius="full"
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
