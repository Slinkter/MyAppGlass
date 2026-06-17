"use client";

import React from "react";
import { Box, Text, Flex, Card } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";
import { CopyButton } from "./copy-button";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  copyable?: boolean;
}

/**
 * A standardized information display item using a Card layout.
 * Follows Aura design tokens for consistency.
 */
export const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  copyable = false,
}) => {
  return (
    <Card.Root
      flexDirection="row"
      p={4}
      gap={4}
      alignItems="center"
      w="full"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="xl"
      bg="surface.container"
      transition="all 0.2s"
      _hover={{
        borderColor: "border.strong",
        transform: "translateY(-2px)",
      }}
    >
      <Card.Body p={0} display="flex" flexDirection="row" alignItems="center" gap={4} w="full">
        <Flex
          align="center"
          justify="center"
          w={12}
          h={12}
          borderRadius="lg"
          bg="surface.icon"
          color="text.accent"
          flexShrink={0}
        >
          <Box as={icon} boxSize={5} />
        </Flex>
        <Box flex="1">
          <Text
            fontSize="xs"
            fontWeight="700"
            textTransform="uppercase"
            color="text.muted"
            letterSpacing="wide"
          >
            {label}
          </Text>
          <Text
            fontSize="md"
            fontWeight="600"
            color="text.heading"
            mt={0.5}
            lineHeight="shorter"
          >
            {value}
          </Text>
        </Box>
        {copyable && (
          <Flex align="center" h="full">
            <CopyButton value={value} label={label} />
          </Flex>
        )}
      </Card.Body>
    </Card.Root>
  );
};
