"use client";

import React from "react";
import { Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface FeatureCardProps {
  heading: string;
  description: string;
  icon?: React.ReactElement | null;
}

/**
 * @component FeatureCard
 * @description Premium benefit card with minimal, purposeful hover interactions.
 * Only 2 elements animate on hover: card lift and icon — everything else stays clean.
 */
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ heading, description, icon }) => {
  const activeColor = "white";
  const activeBgStyle = { 
    base: "linear-gradient(135deg, {colors.brand.red} 0%, {colors.brand.redHover} 100%)", 
    _dark: "linear-gradient(135deg, {colors.brand.red} 0%, {colors.brand.redDark} 100%)" 
  };

  return (
    <Card.Root
      role="group"
      w="full"
      h="full"
      minH={{ base: "76px", md: "84px" }}
      bg="surface.card"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="xl"
      boxShadow="xs"
      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{ 
        boxShadow: "md",
        borderColor: "text.accent",
        transform: "translateY(-2px)",
        bg: "bg.subtle"
      }}
      position="relative"
      overflow="hidden"
      css={{
        '@media (prefers-reduced-motion: reduce)': {
          '*': { transition: 'none !important', animation: 'none !important', transform: 'none !important' }
        }
      }}
    >
      <Card.Body
        p={{ base: "3.5", md: "4" }}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="left"
        gap="3.5"
        w="full"
        h="full"
      >
        {icon && (
          <Flex
            flexShrink={0}
            w={{ base: "10", md: "11" }}
            h={{ base: "10", md: "11" }}
            align="center"
            justify="center"
            borderRadius="lg"
            bg="bg.page"
            color="text.accent"
            border="1px solid"
            borderColor="border.default"
            transition="all 0.25s ease-out"
            _groupHover={{ 
              bg: activeBgStyle,
              color: activeColor,
              borderColor: "transparent",
              transform: "scale(1.06)",
            }}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(
                  icon as React.ReactElement<{
                    size?: number;
                    strokeWidth?: number;
                    "aria-hidden"?: string;
                    style?: React.CSSProperties;
                  }>,
                  {
                    size: 20,
                    strokeWidth: 1.8,
                    "aria-hidden": "true",
                    style: { flexShrink: 0 },
                  }
                )
              : icon}
          </Flex>
        )}

        <VStack gap="0.5" align="flex-start" justify="center" flex="1" minW="0">
          <Heading 
            fontSize={{ base: "xs", md: "sm" }}
            textTransform="uppercase" 
            color="text.heading"
            letterSpacing="0.08em"
            fontWeight="bold"
            lineClamp={1}
          >
            {heading}
          </Heading>
          <Text 
            fontSize="xs" 
            color="text.muted" 
            lineHeight="1.35"
            fontWeight="500"
            lineClamp={2}
          >
            {description}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
