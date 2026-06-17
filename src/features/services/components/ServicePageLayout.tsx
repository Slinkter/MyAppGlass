"use client";
import React from "react";
import {
  Box,
  Flex,
  VStack,
  Container,
} from "@chakra-ui/react";
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
                h={{ base: "300px", md: "380px", lg: "40vh" }}
                minH={{ md: "350px" }}
                maxH={{ lg: "480px" }}
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
              </Box>
            </Skeleton>
          </Box>

          <ServiceBentoGrid 
            activeIndex={activeIndex}
            about={about}
            benefits={benefits}
            systemName={activeSystem?.label || seo.title}
          />

        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageLayout;
