"use client";

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
  <Card.Root
    bg="bg.surface"
    borderColor="border.default"
    borderRadius="card"
    p={{ base: "4", md: "6" }}
  >
    <Card.Header p="0" pb={{ base: "3", md: "4" }}>
      <HStack justify="space-between" align="start" wrap="wrap" gap="2">
        <Box flex={{ base: "1 1 100%", sm: "1" }} minW="0">
          <Card.Title as="h2" fontSize={{ base: "lg", md: "xl" }}>
            {title}
          </Card.Title>
          {description && <Card.Description>{description}</Card.Description>}
        </Box>
        {badge && (
          <Badge colorPalette="gray" px="3" py="1" borderRadius="full">
            {badge}
          </Badge>
        )}
      </HStack>
    </Card.Header>
    <Card.Body p="0">{children}</Card.Body>
  </Card.Root>
);
