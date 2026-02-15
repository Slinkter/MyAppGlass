import React from "react";
import { Flex, VStack, Spinner, Text, useColorModeValue } from "@chakra-ui/react";

const MapLoader = () => {
  const spinnerColor = useColorModeValue("blue.500", "blue.300");
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
      <VStack spacing={4}>
        <Spinner
          size="xl"
          color={spinnerColor}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
        <Text
          fontSize="sm"
          color="gray.500"
          animate={{ opacity: [0.5, 1, 0.5] }}
        >
          Cargando ubicaciones...
        </Text>
      </VStack>
    </Flex>
  );
};

export default MapLoader;
