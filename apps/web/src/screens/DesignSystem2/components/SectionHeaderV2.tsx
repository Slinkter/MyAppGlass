"use client";

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT } from "./architecturalTokens";

export interface SectionHeaderV2Props {
  code: string;
  title: string;
  description: string;
  spec?: string;
}

export const SectionHeaderV2: React.FC<SectionHeaderV2Props> = ({
  code,
  title,
  description,
  spec = "DIN / BAUHAUS GRID · 12 COL",
}) => (
  <Box
    bg={ARCH_SURFACE.steel}
    border="1px solid"
    borderColor={ARCH_BORDER.hairline}
    borderRadius="xs"
  >
    <HStack
      justify="space-between"
      px={{ base: 4, md: 6 }}
      py={2.5}
      borderBottom="1px solid"
      borderColor={ARCH_BORDER.hairline}
      flexWrap="wrap"
      gap={2}
    >
      <HStack gap={2.5}>
        <Box w="8px" h="8px" bg="brand.coral" flexShrink={0} />
        <Text
          fontFamily="mono"
          fontSize="xs"
          fontWeight="700"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color={ARCH_TEXT.onDarkPrimary}
          fontVariantNumeric="tabular-nums"
        >
          {code}
        </Text>
      </HStack>
      <Text
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="0.14em"
        textTransform="uppercase"
        color={ARCH_TEXT.onDarkMuted}
        fontVariantNumeric="tabular-nums"
      >
        {spec}
      </Text>
    </HStack>

    <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0}>
      <Box
        gridColumn={{ lg: "span 7" }}
        p={{ base: 4, md: 6 }}
        borderBottom={{ base: "1px solid", lg: "none" }}
        borderRight={{ lg: "1px solid" }}
        borderColor={ARCH_BORDER.hairline}
      >
        <Heading
          as="h2"
          fontFamily="heading"
          fontWeight="700"
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight="1.05"
          letterSpacing="-0.025em"
          color={ARCH_TEXT.onDarkPrimary}
        >
          {title}
        </Heading>
      </Box>
      <Box
        gridColumn={{ lg: "span 5" }}
        p={{ base: 4, md: 6 }}
        display="flex"
        alignItems="center"
      >
        <Text color={ARCH_TEXT.onDarkMuted} fontSize="sm" lineHeight="1.6">
          {description}
        </Text>
      </Box>
    </SimpleGrid>
  </Box>
);
