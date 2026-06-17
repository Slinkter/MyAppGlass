"use client";
import React from "react";
import {
  Box,
  Flex,
  VStack,
  Container,
  Text,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Gallery from "@shared/components/common/Gallery";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import { ServicePageData, ServicePageFeature } from "../services/serviceService";
import ServiceHeader from "./ServiceHeader";
import ServiceBentoGrid from "./ServiceBentoGrid";



export interface ServicePageLayoutProps {
  pageData: ServicePageData & { about?: { description: string }, benefits?: ServicePageFeature[] };
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ pageData }) => {
  const { seo, about, benefits, systems, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const activeImageList = React.useMemo(() => imageLists[activeIndex] || [], [imageLists, activeIndex]);
  const activeSystem = React.useMemo(() => systems[activeIndex], [systems, activeIndex]);

  const handleSelect = React.useCallback((index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
  }, []);

  return (
    <Box animation="fadeIn 0.4s ease-out">
      <Container maxW="7xl" px="0" pt={{ base: 4, md: 8 }} pb={{ base: "16", lg: "10" }}>
        <VStack gap={{ base: "8", lg: "6" }} align="stretch">
          
          <ServiceHeader 
            title={seo.title}
            systems={systems}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />

          <Box>
            <Skeleton
              loading={isPending}
              borderRadius="3xl"
            >
              <Box
                h={{ base: "350px", md: "500px", lg: "65vh" }}
                minH={{ md: "500px" }}
                maxH={{ lg: "800px" }}
                position="relative"
              >
                <Box
                  key={`gallery-${activeIndex}`}
                  w="full"
                  h="full"
                  animation="scaleIn 0.5s cubic-bezier(0, 0.55, 0.45, 1)"
                >
                  {activeImageList.length > 0 ? (
                    <Gallery images={activeImageList}>
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: "4", md: "8" }}
                        h="100%"
                        w="100%"
                        minW={0}
                      >
                        <Gallery.Viewer />
                        <Gallery.Thumbnails />
                      </Flex>
                    </Gallery>
                  ) : (
                    <ComingSoonDisplay />
                  )}
                </Box>

                {(about || benefits) && (
                  <Box
                    display={{ base: "none", md: "block" }}
                    position="absolute"
                    bottom="4"
                    right="4"
                    maxW="380px"
                    bg="rgba(0,0,0,0.65)"
                    _dark={{ bg: "rgba(0,0,0,0.75)" }}
                    backdropFilter="blur(12px)"
                    borderRadius="2xl"
                    p="5"
                    color="white"
                    zIndex={2}
                  >
                    {about && (
                      <>
                        <Text fontSize="xs" fontWeight="900" color="blue.300" letterSpacing="0.2em" textTransform="uppercase" mb="2">
                          Concepto Técnico
                        </Text>
                        <Text fontSize="sm" lineHeight="tall" fontWeight="medium" opacity={0.92}>
                          {about.description}
                        </Text>
                      </>
                    )}
                    {benefits && benefits.length > 0 && (
                      <>
                        <Box h="1px" bg="whiteAlpha.300" my="4" />
                        <Text fontSize="xs" fontWeight="900" color="blue.300" letterSpacing="0.2em" textTransform="uppercase" mb="3">
                          Ventajas Estructurales
                        </Text>
                        <SimpleGrid columns={{ base: 2 }} gap="2">
                          {benefits.map((benefit) => (
                            <HStack key={benefit.label} gap="2">
                              <Box as={CheckCircle2} color="blue.300" boxSize={3.5} flexShrink={0} />
                              <Text fontSize="xs" fontWeight="semibold" opacity={0.9}>{benefit.label}</Text>
                            </HStack>
                          ))}
                        </SimpleGrid>
                      </>
                    )}
                  </Box>
                )}
              </Box>
            </Skeleton>
          </Box>

          <ServiceBentoGrid 
            systemName={activeSystem?.label || seo.title}
          />

        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageLayout;
