"use client";

/**
 * @file ShowcaseCard.tsx
 * @description Tarjeta contenedora de cada bloque de `/design-system` (Aura Studio): etiqueta de grupo,
 * título en la fuente de títulos (Lora), descripción en texto secundario y contenido con aire.
 * Solo se usa dentro de `/design-system`.
 */

import React from "react";
import { Badge, Box, Card, HStack } from "@chakra-ui/react";

export interface ShowcaseCardProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  title,
  description,
  badge,
  children,
}) => (
  <Card.Root variant={"studio" as never} p={{ base: "5", md: "8" }}>
    <Card.Header p="0" pb={{ base: "5", md: "6" }}>
      <HStack justify="space-between" align="start" wrap="wrap" gap="3">
        <Box flex={{ base: "1 1 100%", sm: "1" }} minW="0">
          <Card.Title as="h2" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1.15" letterSpacing="-0.01em">
            {title}
          </Card.Title>
          {description && (
            <Card.Description mt="2" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed" maxW="3xl">
              {description}
            </Card.Description>
          )}
        </Box>
        {badge && <Badge variant={"studio" as never}>{badge}</Badge>}
      </HStack>
    </Card.Header>
    <Card.Body p="0">{children}</Card.Body>
  </Card.Root>
);
