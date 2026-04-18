"use client";

/**
 * @file ServiceDetailBentoRefined.tsx
 * @description Option 3: Aura "Bento Refined" - Optimized bento layout with extreme glassmorphism.
 */
import React from "react";
import { 
  Box, VStack, Heading, Text, Container, HStack, SimpleGrid, Grid, GridItem, Flex, BoxProps 
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck } from "lucide-react";
import Gallery from "@shared/components/common/Gallery";
import { GalleryItem } from "@/shared/types/gallery";

/**
 * @interface BentoCardProps
 * @description Props for the BentoCard component extending BoxProps
 */
export interface BentoCardProps extends BoxProps {
  /** The content of the card */
  children: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, ...props }) => (
  <Box 
    p={8} 
    h="full" 
    bg="bg.section"
    backdropFilter="blur(16px)" 
    borderRadius="3xl"
    border="1px solid"
    borderColor="border.glass"
    _dark={{ bg: "whiteAlpha.50", borderColor: "whiteAlpha.100" }}
    {...props}
  >
    {children}
  </Box>
);

/**
 * @interface PageDataBento
 * @description Structure of page data for bento detail
 */
export interface PageDataBento {
  /** SEO metadata */
  seo: { title: string };
  /** About section data */
  about: { description: string };
  /** Benefits list */
  benefits: Array<{ label: string }>;
  /** Available systems */
  systems: Array<{ label: string }>;
  /** Image galleries */
  imageLists: GalleryItem[][];
}

/**
 * @interface ServiceDetailBentoRefinedProps
 */
export interface ServiceDetailBentoRefinedProps {
  /** The page data */
  pageData: PageDataBento;
}

/**
 * @description Bento refined detailed view for a service
 */
export const ServiceDetailBentoRefined: React.FC<ServiceDetailBentoRefinedProps> = ({ pageData }) => {
  const { seo, about, benefits, systems, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const galleryItems = React.useMemo(() => imageLists[activeIndex] || [], [imageLists, activeIndex]);

  return (
    <Container maxW="7xl" py={12}>
      <VStack gap={8} align="stretch">
        <Flex justify="space-between" align="flex-end" direction={{ base: "column", md: "row" }} gap={6}>
          <VStack align="flex-start" gap={2}>
            <Text color="primary.500" fontWeight="bold" fontSize="xs" letterSpacing="0.2em">PRODUCTOS GYA</Text>
            <Heading size="2xl">{seo.title}</Heading>
          </VStack>
          <HStack bg="bg.subtle" p={1} borderRadius="full">
            {systems.map((s, i) => (
              <Button 
                key={i} 
                onClick={() => setActiveIndex(i)} 
                variant={activeIndex === i ? "aura" : "ghost"} 
                size="sm" 
                borderRadius="full"
              >
                {s.label}
              </Button>
            ))}
          </HStack>
        </Flex>

        <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} templateRows={{ base: "auto", lg: "repeat(2, 300px)" }} gap={6}>
          <GridItem colSpan={{ base: 1, lg: 2 }} rowSpan={2}>
            <Box borderRadius="3xl" overflow="hidden" h="full" shadow="2xl">
              <Gallery images={galleryItems}>
                <Gallery.Viewer />
              </Gallery>
            </Box>
          </GridItem>
          
          <GridItem colSpan={1}>
            <BentoCard bgGradient="linear(to-br, primary.900, primary.700)" color="white">
              <Box as={Sparkles} boxSize={8} mb={4} />
              <Heading size="md" mb={2}>Acabado Premium</Heading>
              <Text fontSize="sm" opacity={0.8}>{about.description}</Text>
            </BentoCard>
          </GridItem>

          <GridItem colSpan={1}>
            <BentoCard>
              <VStack align="flex-start" gap={4}>
                <Text fontWeight="bold" fontSize="xs" color="text.accent">BENEFICIOS</Text>
                <SimpleGrid columns={1} gap={3} w="full">
                  {benefits.slice(0, 4).map((b, i) => (
                    <HStack key={i} gap={3}>
                      <ShieldCheck color="var(--chakra-colors-primary-500)" size={16} />
                      <Text fontSize="xs" fontWeight="bold">{b.label}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </BentoCard>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};
