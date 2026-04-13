"use client";

import React, { Suspense, lazy } from "react";
import {
  Box,
  Button,
  Flex,
  Spinner,
  VStack,
  HStack,
  Text as ChakraText,
  Icon,
} from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { MapPin, Clock } from "lucide-react";
import { FaMapLocationDot } from "react-icons/fa6";

const InteractiveMap = lazy(() => import("./InteractiveMap"));

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
        <Box 
          w="full" 
          position="relative" 
          h={{ base: "auto", lg: "650px" }}
        >
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
                  <Spinner size="xl" color="text.accent" borderWidth="4px" />
                </Flex>
              }
            >
              <InteractiveMap />
            </Suspense>
          </Box>

          <VStack 
            position={{ base: "relative", lg: "absolute" }}
            top={{ lg: "phi_xl" }}
            left={{ lg: "phi_xl" }}
            zIndex={2}
            gap="phi_xl" 
            align={{ base: "center", lg: "flex-start" }} 
            p="phi_lg"
            bg="bg.section"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.glass"
            shadow="2xl"
            w={{ base: "full", lg: "320px" }}
            mt={{ base: "phi_xl", lg: 0 }}
          >
            <VStack gap="phi_md" align={{ base: "center", lg: "flex-start" }} w="full">
              <HStack gap={3} color="text.accent">
                <Icon as={Clock} boxSize={5} />
                <ChakraText fontWeight="bold" fontSize="sm" textTransform="uppercase" letterSpacing="widest">
                  Horarios
                </ChakraText>
              </HStack>
              <Box pl={{ base: 0, lg: 8 }}>
                <ChakraText fontSize="md" color="text.body" fontWeight="medium">Lunes a Sábado</ChakraText>
                <ChakraText fontSize="sm" color="text.muted">9:00 am – 5:00 pm</ChakraText>
              </Box>
            </VStack>

            <VStack gap="phi_md" align={{ base: "center", lg: "flex-start" }} w="full">
              <HStack gap={3} color="text.accent">
                <Icon as={MapPin} boxSize={5} />
                <ChakraText fontWeight="bold" fontSize="sm" textTransform="uppercase" letterSpacing="widest">
                  Dirección
                </ChakraText>
              </HStack>
              <Box pl={{ base: 0, lg: 8 }}>
                <ChakraText fontSize="md" color="text.body" fontWeight="medium">Av. Los Fresnos 1250</ChakraText>
                <ChakraText fontSize="sm" color="text.muted">La Molina, Lima - Perú</ChakraText>
              </Box>
            </VStack>

            <Button
              asChild
              colorPalette="teal" 
              w="full"
              size="lg"
              py={7}
              aria-label="Cómo llegar a nuestra ubicación principal"
            >
              <a 
                href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={FaMapLocationDot} mr={2} /> CÓMO LLEGAR
              </a>
            </Button>
          </VStack>
        </Box>
      </ItemGridLayout.Item>
    </ItemGridLayout>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
