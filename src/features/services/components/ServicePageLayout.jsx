/**
 * @file ServicePageLayout.jsx
 * @description Main structure for the detailed service page, splitting view between sidebar, gallery, about and benefits sections.
 * @module services/components
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import Gallery from "@shared/components/common/Gallery";
import GlassCard from "@shared/components/common/GlassCard";
import ServiceSidebar from "./ServiceSidebar";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";

const AboutSection = ({ about }) => {
  const headingColor = useColorModeValue("primary.700", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");

  if (!about) return null;

  return (
    <Box mb={8}>
      <Heading
        as="h3"
        size="lg"
        color={headingColor}
        mb={4}
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {about.title}
      </Heading>
      <Text fontSize="md" color={textColor} lineHeight="tall">
        {about.description}
      </Text>
    </Box>
  );
};

const BenefitsSection = ({ benefits }) => {
  const headingColor = useColorModeValue("primary.700", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const checkColor = useColorModeValue("primary.600", "primary.300");

  if (!benefits || benefits.length === 0) return null;

  return (
    <Box>
      <Heading
        as="h3"
        size="md"
        color={headingColor}
        mb={4}
        textTransform="uppercase"
        letterSpacing="wide"
      >
        ¿Por qué elegirnos?
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
        {benefits.map((benefit, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2}>
            <Icon as={CheckIcon} color={checkColor} boxSize={4} flexShrink={0} />
            <Text fontSize="sm" color={textColor}>
              {benefit.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const ServicePageLayout = ({ pageData }) => {
  const { seo, about, benefits, systems, features, imageLists } = pageData;

  const [activeIndex, setActiveIndex] = useState(0);

  const activeImageList = imageLists[activeIndex] || [];
  const activeSystem = systems[activeIndex];

  const borderColorValue = useColorModeValue(
    "whiteAlpha.300",
    "whiteAlpha.100",
  );

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      <Box p={{ base: 0, md: 4, lg: 2 }} w="100%" overflowX="hidden" pb={{ base: "80px", md: 0 }}>
        <Grid
          templateColumns={{ base: "minmax(0, 1fr)", lg: "1fr 3fr" }}
          maxW="100%"
          mx="auto"
          gap={{ base: 3, md: 5, lg: 6 }}
          alignItems="start"
          px={{ base: 3, md: 8 }}
          py={{ base: 3, md: 0 }}
        >
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
            <VStack spacing={6} align="stretch">
              <GlassCard
                h={{ base: "400px", sm: "450px", md: "550px", lg: "60vh" }}
                overflow="hidden"
                p={{ base: 1, md: 2, lg: 3 }}
                borderWidth="1px"
                borderColor={borderColorValue}
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

              <GlassCard
                p={6}
                borderWidth="1px"
                borderColor={borderColorValue}
                boxShadow="xl"
              >
                <VStack spacing={8} align="stretch">
                  <AboutSection about={about} />
                  <BenefitsSection benefits={benefits} />
                </VStack>
              </GlassCard>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ServicePageLayout;
