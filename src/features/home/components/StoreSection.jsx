import React, { Suspense, lazy, useState, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Spinner,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";

// Carga perezosa del mapa para evitar errores de inicialización en producción
import AuraSurface from "@/shared/components/aura/AuraSurface";

// Carga perezosa del mapa para evitar errores de inicialización en producción
const InteractiveMap = lazy(() => import("./InteractiveMap"));

const MotionVStack = m.create(VStack);

/**
 * Componente StoreSection
 * Muestra la sección de la ubicación de la tienda con un mapa interactivo.
 * @component
 */
const StoreSection = React.memo(() => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const infoCardRef = React.useRef(null);
  const isMobile = useIsMobile();

  const handleMarkerToggle = useCallback((marker) => {
    if (isMobile) return; // Bloquear selección en móvil
    setSelectedMarker((prev) => (prev?.id === marker?.id ? null : marker));
  }, [isMobile]);

  // Autofocus/Scroll on mobile when marker is selected
  React.useEffect(() => {
    if (selectedMarker && infoCardRef.current && window.innerWidth < 992) {
      infoCardRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest",
        inline: "nearest" 
      });
    }
  }, [selectedMarker]);

  const isStore = selectedMarker?.type === "store";
  const displaySelected = isMobile ? false : !!selectedMarker;

  return (
    <ItemGridLayout
      title="UBICACIÓN"
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
        <Box 
          w="full" 
          position="relative" 
          h={{ base: "auto", lg: "700px" }}
        >
          {/* MAPA */}
          <AuraSurface 
            w="full" 
            h={{ base: "400px", lg: "full" }}
            borderRadius={{ base: "2xl", md: "3xl" }}
            overflow="hidden"
          >
            <Suspense
              fallback={
                <Flex align="center" justify="center" h="full" w="full" bg="bg.section">
                  <Spinner size="xl" color="text.accent" thickness="2px" />
                </Flex>
              }
            >
              <InteractiveMap 
                selectedMarker={selectedMarker} 
                onMarkerToggle={handleMarkerToggle} 
              />
            </Suspense>
          </AuraSurface>

          {/* FICHA INFORMATIVA - DINÁMICA EN DESKTOP */}
          <AuraSurface
            ref={infoCardRef}
            variant="strong"
            position={{ base: "relative", lg: "absolute" }}
            top={{ lg: "phi_xl" }}
            left={{ lg: "phi_xl" }}
            zIndex={10}
            gap={0} 
            p={0}
            borderRadius={{ base: "2xl", md: "3xl" }}
            w={{ base: "full", lg: "340px" }}
            h={{ lg: "480px" }}
            mt={{ base: "phi_xl", lg: 0 }}
            display="flex"
            justifyContent="stretch"
          >
            <AnimatePresence mode="wait">
              {!displaySelected ? (
                <MotionVStack
                  key="default-info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  p="phi_lg"
                  gap="phi_xl"
                  w="full"
                  flex={1}
                  justifyContent="space-between"
                  align={{ base: "center", lg: "flex-start" }}
                >
                  <VStack gap="phi_xl" align={{ base: "center", lg: "flex-start" }} w="full">
                    <VStack gap="phi_md" align={{ base: "center", lg: "flex-start" }} w="full">
                      <HStack gap={3} color="text.accent">
                        <Box as={Clock} boxSize={5} />
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
                        <Box as={MapPin} boxSize={5} />
                        <Text fontWeight="900" fontSize="xs" textTransform="uppercase" letterSpacing="0.2em">
                          Dirección
                        </Text>
                      </HStack>
                      <Box pl={{ lg: "32px" }}>
                        <Text fontSize="md" color="text.heading" fontWeight="700">Av. Los Fresnos 1250</Text>
                        <Text fontSize="sm" color="text.muted">La Molina, Lima - Perú</Text>
                      </Box>
                    </VStack>
                  </VStack>

                  <Button
                    as="a"
                    href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="aura"
                    width="full"
                    size="xl"
                    aria-label="Cómo llegar a nuestra ubicación principal"
                  >
                    CÓMO LLEGAR
                  </Button>
                </MotionVStack>
              ) : (
                <MotionVStack
                  key={selectedMarker.id || "marker-info"}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  w="full"
                  h="full"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Imagen de Fondo Completa */}
                  <Box position="absolute" inset={0} zIndex={0}>
                    <Skeleton h="full" w="full" loading={!selectedMarker.image && !selectedMarker.photosObra?.[0]?.image}>
                      <Image 
                        src={selectedMarker.image || selectedMarker.photosObra?.[0]?.image} 
                        alt={selectedMarker.name}
                        w="100%" h="100%" objectFit="cover"
                        loading="lazy"
                      />
                    </Skeleton>
                  </Box>

                  {/* Gradiente de Legibilidad Reforzado */}
                  <Box 
                    position="absolute" 
                    inset={0} 
                    bgGradient="linear(to-t, blackAlpha.900 0%, blackAlpha.700 25%, blackAlpha.400 50%, transparent 100%)"
                    zIndex={1}
                  />

                  {/* Contenido Flotante */}
                  <Flex 
                    direction="column" 
                    justify="space-between" 
                    h="full" 
                    w="full" 
                    p="phi_lg" 
                    zIndex={2}
                    position="relative"
                  >
                    <Flex justify="flex-end" align="center" w="full">
                      <Badge
                        colorPalette={isStore ? "primary" : "blue"}
                        variant="solid"
                        borderRadius="full"
                        px={3}
                        boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                      >
                        {isStore ? "SEDE CENTRAL" : selectedMarker.year || "OBRA FINALIZADA"}
                      </Badge>
                    </Flex>

                    <VStack align="flex-start" gap="phi_xs" mb="phi_xs">
                      <Heading 
                        size="md" 
                        color="white" 
                        letterSpacing="tight" 
                        fontWeight="800"
                        shadow="glass.textShadow"
                      >
                        {selectedMarker.residencial || selectedMarker.name}
                      </Heading>
                      <HStack align="flex-start" gap={3} w="full">
                        <Box as={MapPin} boxSize={4} color="orange.300" mt={1} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
                        <Text 
                          fontSize="sm" 
                          color="whiteAlpha.900" 
                          fontWeight="600" 
                          lineHeight="tall"
                          shadow="glass.textShadow"
                        >
                          {selectedMarker.address}
                        </Text>
                      </HStack>
                    </VStack>
                  </Flex>
                </MotionVStack>
              )}
            </AnimatePresence>
          </AuraSurface>
        </Box>
      </ItemGridLayout.Item>
    </ItemGridLayout>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
