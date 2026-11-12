"use client";

import React, { useState } from "react";
import { Box, Flex, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Building2, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT, OPTICAL_GLASS } from "./architecturalTokens";

export interface SystemTier {
  id: string;
  label: string;
  price: string;
  desc: string;
  features: string[];
  code?: string;
  typology?: string;
  glass?: string;
  aluminum?: string;
}

export const GlassSystemCard: React.FC<{ tiers: SystemTier[] }> = ({ tiers }) => {
  const [activeTier, setActiveTier] = useState(tiers[0]?.id ?? "");
  const currentTier = tiers.find((t) => t.id === activeTier) ?? tiers[0];
  if (!currentTier) return null;

  return (
    <Box
      position="relative"
      p={{ base: 4, md: 10 }}
      bg={ARCH_SURFACE.graphite}
      border="1px solid"
      borderColor={ARCH_BORDER.hairline}
      overflow="hidden"
      css={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Subtle architectural reticle datum label in background */}
      <HStack justify="space-between" mb={4} fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
        <Text>CAPA ÓPTICA 10% · VISOR DE SISTEMAS</Text>
        <Text>BACKDROP-BLUR 16PX</Text>
      </HStack>

      {/* Optical Glass Card (1 of 3 authorized glassmorphism elements) */}
      <Box
        maxW="760px"
        mx="auto"
        p={{ base: 5, md: 8 }}
        borderRadius="lg"
        bg={OPTICAL_GLASS.bg}
        backdropFilter={OPTICAL_GLASS.backdropFilter}
        border={OPTICAL_GLASS.border}
        borderColor={OPTICAL_GLASS.borderColor}
        boxShadow="0 20px 50px rgba(0, 0, 0, 0.45)"
      >
        {/* Segmented system selector (44px min height) */}
        <Flex
          gap={1.5}
          flexWrap="wrap"
          p={1.5}
          mb={6}
          bg="rgba(0, 0, 0, 0.35)"
          border="1px solid"
          borderColor={ARCH_BORDER.hairline}
          borderRadius="md"
        >
          {tiers.map((tier) => {
            const isSelected = activeTier === tier.id;
            return (
              <Button
                key={tier.id}
                size="sm"
                minH="44px"
                px={3.5}
                borderRadius="sm"
                flex={{ base: "1 1 130px", md: "1" }}
                variant={isSelected ? "primary" : "ghost"}
                aria-pressed={isSelected}
                bg={isSelected ? ARCH_SURFACE.concrete : "transparent"}
                color={isSelected ? ARCH_TEXT.onConcretePrimary : ARCH_TEXT.onDarkPrimary}
                _hover={
                  isSelected
                    ? { bg: "white" }
                    : { bg: "rgba(255, 255, 255, 0.08)" }
                }
                onClick={() => setActiveTier(tier.id)}
              >
                {tier.label}
              </Button>
            );
          })}
        </Flex>

        <Flex justify="space-between" align="baseline" mb={2} flexWrap="wrap" gap={2}>
          <HStack gap={3}>
            <Box w="8px" h="8px" bg="brand.coral" flexShrink={0} />
            <Heading
              fontFamily="heading"
              size="xl"
              fontWeight="700"
              color={ARCH_TEXT.onDarkPrimary}
              letterSpacing="-0.02em"
            >
              {currentTier.label}
            </Heading>
          </HStack>
          <Text
            fontFamily="mono"
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="brand.coral"
            fontVariantNumeric="tabular-nums"
          >
            {currentTier.code ? `${currentTier.code} · ` : ""}
            {currentTier.price}
          </Text>
        </Flex>

        <Text color={ARCH_TEXT.onDarkMuted} fontSize="sm" lineHeight="1.6" mb={5}>
          {currentTier.desc}
        </Text>

        {(currentTier.typology || currentTier.glass || currentTier.aluminum) && (
          <SimpleGrid
            columns={{ base: 1, sm: 3 }}
            gap={0}
            mb={5}
            border="1px solid"
            borderColor={ARCH_BORDER.hairline}
            bg="rgba(11, 12, 14, 0.55)"
          >
            <Box p={3} borderRight={{ sm: "1px solid" }} borderBottom={{ base: "1px solid", sm: "none" }} borderColor={ARCH_BORDER.hairline}>
              <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkSubtle}>TIPOLOGÍA</Text>
              <Text fontSize="xs" fontWeight="600" color={ARCH_TEXT.onDarkPrimary} mt={0.5}>
                {currentTier.typology ?? "Corrediza / Proyectante"}
              </Text>
            </Box>
            <Box p={3} borderRight={{ sm: "1px solid" }} borderBottom={{ base: "1px solid", sm: "none" }} borderColor={ARCH_BORDER.hairline}>
              <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkSubtle}>VIDRIO</Text>
              <Text fontSize="xs" fontWeight="600" color={ARCH_TEXT.onDarkPrimary} mt={0.5}>
                {currentTier.glass ?? "Crudo / Laminado / Templado"}
              </Text>
            </Box>
            <Box p={3}>
              <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkSubtle}>ALUMINIO</Text>
              <Text fontSize="xs" fontWeight="600" color={ARCH_TEXT.onDarkPrimary} mt={0.5}>
                {currentTier.aluminum ?? "Negro / Mate / Blanco / Champagne"}
              </Text>
            </Box>
          </SimpleGrid>
        )}

        <VStack align="stretch" gap={2.5} mb={6}>
          {currentTier.features.map((feat) => (
            <HStack key={feat} gap={3} color={ARCH_TEXT.onDarkPrimary} fontSize="sm">
              <Check size={15} aria-hidden="true" />
              <Text>{feat}</Text>
            </HStack>
          ))}
        </VStack>

        <HStack
          justify="space-between"
          pt={4}
          borderTop="1px solid"
          borderColor={ARCH_BORDER.hairline}
          flexWrap="wrap"
          gap={3}
        >
          <HStack gap={2} fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted}>
            <Building2 size={15} aria-hidden="true" />
            <Text>Constructoras, arquitectos y residencias</Text>
          </HStack>
          <HStack gap={2} fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted}>
            <ShieldCheck size={15} aria-hidden="true" />
            <Text>Boleta o Factura · RUC 20606432870</Text>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
