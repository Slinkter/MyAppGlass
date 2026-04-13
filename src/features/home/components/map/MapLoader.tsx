"use client";

import React from "react";
import { Flex, VStack, Spinner, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const MapLoader = () => {
  const spinnerColor = "text.accent";
  const mapContainerBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      align="center"
      justify="center"
      h={{ base: "400px", md: "600px" }}
      bg={mapContainerBg}
      rounded="2xl"
      position="relative"
    >
      <VStack gap={4}>
        <Spinner
          size="xl"
          color={spinnerColor}
          borderWidth="4px"           
          css={{ "--spinner-speed": "0.65s" }}
        />
        <Text
          fontSize="sm"
          color="gray.500"
        >
          Cargando ubicaciones...
        </Text>
      </VStack>
    </Flex>
  );
};

export default MapLoader;
