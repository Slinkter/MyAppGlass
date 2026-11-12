"use client";

import React from "react";
import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import { ARCH_SURFACE, ARCH_TEXT, OPTICAL_GLASS } from "./architecturalTokens";

export interface FloatingPillNavbarProps {
  brandName?: string;
  links?: string[];
  activeIndex?: number;
  ctaLabel?: string;
}

export const FloatingPillNavbar: React.FC<FloatingPillNavbarProps> = ({
  brandName = companyData.razonSocial,
  links = ["Inicio", "Servicios", "Proyectos", "Ubicación"],
  activeIndex = 2,
  ctaLabel = "Solicitar visita",
}) => (
  <Box position="sticky" top={4} zIndex="sticky" px={{ base: 3, md: 6 }} py={2}>
    <Container maxW="pageWide" px={0}>
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 3, md: 5 }}
        py={2}
        borderRadius="full"
        bg={OPTICAL_GLASS.bg}
        backdropFilter={OPTICAL_GLASS.backdropFilter}
        border={OPTICAL_GLASS.border}
        borderColor={OPTICAL_GLASS.borderColor}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.32)"
      >
        <HStack gap={3} minW={0} pl={1}>
          <Box w="8px" h="8px" borderRadius="full" bg="brand.coral" flexShrink={0} />
          <Text
            fontFamily="mono"
            fontWeight="700"
            letterSpacing="0.12em"
            fontSize="xs"
            textTransform="uppercase"
            color={ARCH_TEXT.onDarkPrimary}
            truncate
          >
            {brandName}
          </Text>
        </HStack>

        <HStack gap={1} display={{ base: "none", md: "flex" }}>
          {links.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Button
                key={item}
                variant={isActive ? "primary" : "ghost"}
                size="sm"
                borderRadius="full"
                minH="44px"
                px={4}
                aria-current={isActive ? "page" : undefined}
                bg={isActive ? ARCH_SURFACE.concrete : "transparent"}
                color={isActive ? ARCH_TEXT.onConcretePrimary : ARCH_TEXT.onDarkPrimary}
                _hover={
                  isActive
                    ? { bg: "white" }
                    : { bg: "rgba(255, 255, 255, 0.08)" }
                }
              >
                {item}
              </Button>
            );
          })}
        </HStack>

        <Button
          variant="outline"
          size="sm"
          borderRadius="full"
          minH="44px"
          px={4}
          borderColor="rgba(255, 255, 255, 0.28)"
          color={ARCH_TEXT.onDarkPrimary}
          _hover={{ bg: "rgba(255, 255, 255, 0.10)" }}
        >
          {ctaLabel} <ArrowRight size={15} aria-hidden="true" />
        </Button>
      </Flex>
    </Container>
  </Box>
);
