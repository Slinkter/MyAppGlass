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
 * @description Tarjeta de beneficio: superficie plana con borde fino, sin degradados ni
 * animaciones (no es interactiva). Solo tokens del tema.
 */
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ heading, description, icon }) => (
  <Card.Root
    w="full"
    h="full"
    minH="20"
    bg="bg.surface"
    borderWidth="1px"
    borderColor="border.default"
    borderRadius="card"
    boxShadow="none"
    overflow="hidden"
  >
    <Card.Body
      p={{ base: "4", md: "5" }}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      textAlign="left"
      gap="4"
      w="full"
      h="full"
    >
      {icon && (
        <Flex
          flexShrink={0}
          boxSize="11"
          align="center"
          justify="center"
          borderRadius="lg"
          bg="bg.tint"
          color="text.heading"
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
                },
              )
            : icon}
        </Flex>
      )}

      <VStack gap="1" align="flex-start" justify="center" flex="1" minW="0">
        <Heading
          as="h3"
          fontFamily="heading"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="700"
          color="text.heading"
          lineClamp={1}
        >
          {heading}
        </Heading>
        <Text fontSize="sm" color="text.muted" lineHeight="1.4" lineClamp={3}>
          {description}
        </Text>
      </VStack>
    </Card.Body>
  </Card.Root>
));

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
