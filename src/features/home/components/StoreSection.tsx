import React, { Suspense, lazy, useState, useCallback, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Heading,
} from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { MapPin, Clock } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";

// Carga perezosa del mapa para evitar errores de inicialización en producción
import AuraSurface from "@/shared/components/aura/AuraSurface";
import AuraSkeleton, { ServiceCardSkeleton } from "@/shared/components/aura/AuraSkeleton";
import { type MarkerType } from "./InteractiveMap";

// Carga perezosa del mapa para evitar errores de inicialización en producción
const InteractiveMap = lazy(() => import("./InteractiveMap"));

const MotionVStack = m.create(VStack);

/**
 * Componente StoreSection
 * Muestra la sección de la ubicación de la tienda con un mapa interactivo.
 * @component
 */
const StoreSection: React.FC = React.memo(() => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMarkerToggle = useCallback((marker: MarkerType) => {
    if (isMobile) return; // Bloquear selección en móvil
    setSelectedMarker((prev) => (prev?.id === marker?.id ? null : marker));
  }, [isMobile]);

  // Autofocus/Scroll on mobile when marker is selected
  useEffect(() => {
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
      }}
    >
      <ItemGridLayout.Item>
        <Box 
          w="full" 
          position="relative" 
          h={{ base: "auto", lg: "700px" }}
        >
          {/* MAPA */}
          <Box 
            w="full" 
            h={{ base: "400px", lg: "full" }}
            borderRadius={{ base: "2xl", md: "3xl" }}
            overflow="hidden"
            border="1px solid"
            borderColor="border.glass"
            boxShadow="2xl"
          >
            <Suspense
              fallback={
                <Flex 
                  align="center" 
                  justify="center" 
                  h={{ base: "400px", lg: "700px" }} 
                  w="full" 
                  bg="bg.section"
                  borderRadius="inherit"
                >
                   <VStack gap="phi_lg" w={{ base: "full", lg: "340px" }} p="phi_lg">
                    <ServiceCardSkeleton />
                    <ServiceCardSkeleton />
                    <AuraSkeleton h="50px" w="full" borderRadius="full" />
                  </VStack>
                </Flex>
              }
            >
              <InteractiveMap 
                selectedMarker={selectedMarker} 
                onMarkerToggle={handleMarkerToggle} 
              />
            </Suspense>
          </Box>

          {/* FICHA INFORMATIVA - DINÁMICA EN DESKTOP */}
          <VStack 
            ref={infoCardRef}
            position={{ base: "relative", lg: "absolute" }}
            top={{ lg: "phi_xl" }}
            left={{ lg: "phi_xl" }}
            zIndex={10}
            gap={0} 
            align={{ base: "center", lg: "flex-start" }} 
            p={0}
            bg="bg.glass"
            backdropFilter="blur(24px)"
            borderRadius={{ base: "2xl", md: "3xl" }}
            border="1px solid"
            borderColor="border.glass"
            boxShadow="2xl"
            w={{ base: "full", lg: "340px" }}
            h={{ lg: "480px" }}
            mt={{ base: "phi_xl", lg: 0 }}
            overflow="hidden"
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
                  align="center"
                >
                  <VStack gap="phi_md" align="center" w="full">
                    {/* Sección Horarios */}
                    <VStack 
                      gap="phi_xs" 
                      align="center" 
                      w="full"
                      p="phi_md"
                      bg="bg.subtle"
                      borderRadius="2xl"
                      border="1px solid"
                      borderColor="border.glass"
                    >
                      <HStack gap={3} color="text.accent">
                        <Box as={Clock} boxSize={5} />
                        <Text fontWeight="800" fontSize="xs" textTransform="uppercase" letterSpacing="0.2em">
                          Horarios
                        </Text>
                      </HStack>
                      <Box textAlign="center">
                        <Text fontSize="md" color="text.heading" fontWeight="700">Lunes a Sábado</Text>
                        <Text fontSize="sm" color="text.muted">9:00 am – 5:00 pm</Text>
                      </Box>
                    </VStack>

                    {/* Sección Dirección */}
                    <VStack 
                      gap="phi_xs" 
                      align="center" 
                      w="full"
                      p="phi_md"
                      bg="bg.subtle"
                      borderRadius="2xl"
                      border="1px solid"
                      borderColor="border.glass"
                    >
                      <HStack gap={3} color="text.accent">
                        <Box as={MapPin} boxSize={5} />
                        <Text fontWeight="800" fontSize="xs" textTransform="uppercase" letterSpacing="0.2em">
                          Dirección
                        </Text>
                      </HStack>
                      <Box textAlign="center">
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
                  key={selectedMarker?.id || "marker-info"}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  w="full"
                  h="full"
                  position="relative"
                  overflow="hidden"
                >
                  <Box position="absolute" inset={0} zIndex={0}>
                    <Image 
                      src={selectedMarker?.image || (selectedMarker as unknown as { photosObra?: { image: string }[] })?.photosObra?.[0]?.image} 
                      alt={selectedMarker?.name}
                      w="100%" h="100%" objectFit="cover"
                      loading="lazy"
                    />
                  </Box>

                  {/* Gradiente de Legibilidad Ultra-Reforzado */}
                  <Box 
                    position="absolute" 
                    inset={0} 
                    bgGradient="linear(to-t, blackAlpha.950 0%, blackAlpha.800 40%, blackAlpha.400 70%, transparent 100%)"
                    zIndex={1}
                  />
                  <Box 
                    position="absolute" 
                    inset={0} 
                    bg="blackAlpha.300" 
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
                        {isStore ? "SEDE CENTRAL" : (selectedMarker as MapProject)?.year || "OBRA FINALIZADA"}
                      </Badge>
                    </Flex>

                    {/* Info Capsule */}
                    <AuraSurface
                      variant="interactive"
                      p="phi_md"
                      w="full"
                      mb="phi_xs"
                    >
                      <VStack align="flex-start" gap="phi_xs">
                        <Heading 
                          size="md" 
                          color="white" 
                          letterSpacing="tight" 
                          fontWeight="800"
                        >
                          {(selectedMarker as unknown as { residencial?: string })?.residencial || selectedMarker?.name}
                        </Heading>
                        <HStack align="flex-start" gap={3} w="full">
                          <Box as={MapPin} boxSize={4} color="orange.300" mt={1} />
                          <Text 
                            fontSize="sm" 
                            color="whiteAlpha.900" 
                            fontWeight="600" 
                            lineHeight="tall"
                          >
                            {selectedMarker?.address}
                          </Text>
                        </HStack>
                      </VStack>
                    </AuraSurface>
                  </Flex>
                </MotionVStack>
              )}
            </AnimatePresence>
          </VStack>
        </Box>
      </ItemGridLayout.Item>
    </ItemGridLayout>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
