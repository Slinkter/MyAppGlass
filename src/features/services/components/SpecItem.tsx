"use client";

import React from "react";
import { HStack, Text as ChakraText } from "@chakra-ui/react";

export interface SpecItemProps {
  label: string;
  value: string | number;
}

/**
 * @component SpecItem
 * @description Muestra una especificación técnica individual (Clave: Valor) con icono.
 */
const SpecItem = ({ label, value }: SpecItemProps) => {
  return (
    <HStack
      w="full"
      p={3}
      bg="surface.container"
      rounded="xl"
      borderWidth="1px"
      borderColor="border.default"
      justify="space-between"
      align="center"
      gap={4}
      transition="all 0.2s"
      _hover={{
        borderColor: "text.accent",
        transform: "translateY(-1px)",
        shadow: "sm",
      }}
    >
      <HStack gap={3} overflow="hidden">
        <ChakraText
          fontSize="xs"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wider"
          color="text.muted"
          lineClamp={2}
        >
          {label}
        </ChakraText>
      </HStack>

      <ChakraText
        fontSize="sm"
        fontWeight="bold"
        color="text.body"
        textAlign="right"
        lineClamp={2}
        maxW="50%"
      >
        {value}
      </ChakraText>
    </HStack>
  );
};

export default SpecItem;
