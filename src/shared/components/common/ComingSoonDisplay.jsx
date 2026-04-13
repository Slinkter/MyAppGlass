import React from "react";
import { Flex, VStack, Icon, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { ClockIcon } from "@heroicons/react/24/outline";

/**
 * @component ComingSoonDisplay
 * @description Placeholder component displayed when content (like a gallery) is not yet available.
 */
const ComingSoonDisplay = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  return (
    <Flex
      h="100%"
      w="100%"
      align="center"
      justify="center"
      direction="column"
    >
      <VStack spacing={4} textAlign="center">
        <Icon as={ClockIcon} w={12} h={12} color={textColor} />
        <Heading size="lg">Próximamente</Heading>
        <Text color={textColor}>
          Estamos trabajando para agregar nuevas imágenes a esta sección.
        </Text>
      </VStack>
    </Flex>
  );
};

export default ComingSoonDisplay;
