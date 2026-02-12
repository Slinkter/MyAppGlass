/**
 * @file ServicePageLayout.jsx
 * @description Main structure for the detailed service page, splitting view between a sidebar and a gallery.
 * @module services/components
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  Flex,
  VStack,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import Gallery from "@shared/components/common/Gallery";
import GlassCard from "@shared/components/common/GlassCard";
import ServiceSidebar from "./ServiceSidebar";
import { ClockIcon } from "@heroicons/react/24/outline";

const ComingSoonDisplay = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  return (
    <Flex
      h="100%"
      w="100%"
      align="center"
      justify="center"
      direction="column"
    >
      <VStack spacing={4} textAlign="center">
        <Icon as={ClockIcon} w={12} h={12} color={textColor} />
        <Heading size="lg">Próximamente</Heading>
        <Text color={textColor}>
          Estamos trabajando para agregar nuevas imágenes a esta sección.
        </Text>
      </VStack>
    </Flex>
  );
};

const ServicePageLayout = ({ pageData }) => {
  const { seo, systems, features, imageLists } = pageData;

  const [activeIndex, setActiveIndex] = useState(0);

  const activeImageList = imageLists[activeIndex] || [];
  const activeSystem = systems[activeIndex];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      <Box p={{ base: 0, md: 4, lg: 2 }} w="100%" overflowX="hidden">
        <Grid
          templateColumns={{ base: "minmax(0, 1fr)", lg: "1fr 3fr" }}
          maxW="100%"
          mx="auto"
          gap={{ base: 3, md: 5, lg: 6 }}
          alignItems="start"
          px={{ base: 3, md: 0 }}
          py={{ base: 3, md: 0 }}
        >
          {/* CARD 1: PANEL DE CONTROL */}
          <GridItem w="100%" minW={0}>
            <ServiceSidebar
              seo={seo}
              systems={systems}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              activeSystem={activeSystem}
              features={features}
            />
          </GridItem>

          <GridItem w="100%" minW={0}>
            <GlassCard
              h={{ base: "400px", sm: "450px", md: "550px", lg: "85vh" }}
              overflow="hidden"
              p={{ base: 1, md: 2, lg: 3 }}
              borderWidth="1px"
              borderColor={useColorModeValue(
                "whiteAlpha.300",
                "whiteAlpha.100",
              )}
              boxShadow="2xl"
            >
              <Box h="100%" w="100%" minW={0} maxW="100%">
                {activeImageList && activeImageList.length > 0 ? (
                  <Gallery images={activeImageList} />
                ) : (
                  <ComingSoonDisplay />
                )}
              </Box>
            </GlassCard>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ServicePageLayout;
