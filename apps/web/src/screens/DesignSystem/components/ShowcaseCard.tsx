"use client";

/**
 * @file ShowcaseCard.tsx
 * @description Tarjeta contenedora de cada bloque de `/design-system` (el sistema de diseño): etiqueta de grupo,
 * título en la fuente de títulos (Lora), línea fina que se dibuja una vez bajo el título, descripción en texto secundario y contenido con aire. Entra con `Reveal`.
 * Solo se usa dentro de `/design-system`.
 */

import React from "react";
import { Box, Card, HStack } from "@chakra-ui/react";
import { Badge } from "@/shared/ui/badge";
import { Reveal } from "@shared/components/motion/Reveal";
import { DrawLine } from "./Motion";

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
  <Reveal h="full">
  <Card.Root variant={"flat" as never} p={{ base: "5", md: "8" }} h="full">
    <Card.Header p="0" pb={{ base: "5", md: "6" }}>
      <HStack justify="space-between" align="start" wrap="wrap" gap="3">
        <Box flex={{ base: "1 1 100%", sm: "1" }} minW="0">
          <Card.Title as="h2" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="title">
            {title}
          </Card.Title>
          <DrawLine mt="3" />
          {description && (
            <Card.Description mt="2" fontSize={{ base: "sm", md: "md" }} lineHeight="body" maxW="pageNarrow">
              {description}
            </Card.Description>
          )}
        </Box>
        {badge && <Badge variant={"chip" as never}>{badge}</Badge>}
      </HStack>
    </Card.Header>
    <Card.Body p="0">{children}</Card.Body>
  </Card.Root>
  </Reveal>
);
