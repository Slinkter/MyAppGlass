"use client";

import React from "react";
import { Box, Flex, Heading, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT, ARCH_TRANSITION } from "./architecturalTokens";

export interface SelectedWorkItem {
  code: string;
  name: string;
  location: string;
  year: string;
  system: string;
  image: string;
  coordinates?: string;
}

export const SelectedWorksGrid: React.FC<{ projects: SelectedWorkItem[] }> = ({ projects }) => (
  <Box bg={ARCH_SURFACE.graphite} border="1px solid" borderColor={ARCH_BORDER.hairline}>
    <Flex
      justify="space-between"
      align="center"
      px={{ base: 4, md: 6 }}
      py={3}
      bg={ARCH_SURFACE.steel}
      borderBottom="1px solid"
      borderColor={ARCH_BORDER.hairline}
      flexWrap="wrap"
      gap={2}
    >
      <Text
        fontFamily="mono"
        fontSize="xs"
        fontWeight="700"
        letterSpacing="0.18em"
        textTransform="uppercase"
        color={ARCH_TEXT.onDarkPrimary}
      >
        OBRAS SELECCIONADAS · ARCHIVO TÉCNICO
      </Text>
      <HStack gap={2} fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkPrimary} fontWeight="700" fontVariantNumeric="tabular-nums">
        <Text>01 — 0{projects.length}</Text>
        <ArrowUpRight size={14} aria-hidden="true" />
      </HStack>
    </Flex>

    <SimpleGrid columns={{ base: 1, md: 3 }} gap={0}>
      {projects.map((proj, idx) => (
        <Reveal key={proj.code} motion="cine" index={idx}>
          <Box
            p={{ base: 4, md: 5 }}
            h="full"
            borderRight={{ md: idx < projects.length - 1 ? "1px solid" : "none" }}
            borderBottom={{ base: idx < projects.length - 1 ? "1px solid" : "none", md: "none" }}
            borderColor={ARCH_BORDER.hairline}
            bg={ARCH_SURFACE.graphite}
            transition={ARCH_TRANSITION.transformBorder}
            _hover={{ transform: "translateY(-3px)", borderColor: ARCH_BORDER.hairlineStrong }}
            _motionReduce={{ transition: "none", transform: "none" }}
          >
            <HStack justify="space-between" mb={3} fontFamily="mono" fontSize="xs" fontVariantNumeric="tabular-nums">
              <HStack gap={2}>
                <Box w="6px" h="6px" bg={idx === 0 ? "brand.coral" : ARCH_TEXT.onDarkSubtle} />
                <Text color={ARCH_TEXT.onDarkPrimary} fontWeight="700">
                  {proj.code} / 0{projects.length}
                </Text>
              </HStack>
              <Text color={ARCH_TEXT.onDarkMuted}>{proj.year}</Text>
            </HStack>

            <Box
              overflow="hidden"
              border="1px solid"
              borderColor={ARCH_BORDER.hairline}
              aspectRatio="4 / 3"
              mb={4}
              bg={ARCH_SURFACE.steel}
            >
              <Image src={proj.image} alt={`${proj.name} — ${proj.location}`} w="full" h="full" objectFit="cover" />
            </Box>

            <Heading
              as="h3"
              fontFamily="heading"
              size="lg"
              fontWeight="700"
              color={ARCH_TEXT.onDarkPrimary}
              letterSpacing="-0.02em"
            >
              {proj.name}
            </Heading>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={1.5} fontVariantNumeric="tabular-nums">
              {proj.location}
            </Text>
            <Box mt={3} pt={3} borderTop="1px solid" borderColor={ARCH_BORDER.hairline}>
              <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkPrimary} fontVariantNumeric="tabular-nums">
                {proj.system}
              </Text>
              {proj.coordinates && (
                <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkSubtle} mt={0.5} fontVariantNumeric="tabular-nums">
                  {proj.coordinates}
                </Text>
              )}
            </Box>
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>
  </Box>
);
