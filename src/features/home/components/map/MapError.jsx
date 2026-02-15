import React from "react";
import { Flex, VStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapError = () => {
  const errorBgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex
      h="400px"
      align="center"
      justify="center"
      bg={errorBgColor}
      borderRadius="2xl"
    >
      <VStack spacing={3}>
        <Icon as={FaMapMarkerAlt} boxSize={8} color="red.400" />
        <Text color="red.500" fontWeight="bold">
          Error cargando el mapa
        </Text>
        <Text fontSize="sm" color="gray.500">
          Verifique su conexión o clave API
        </Text>
      </VStack>
    </Flex>
  );
};

export default MapError;
