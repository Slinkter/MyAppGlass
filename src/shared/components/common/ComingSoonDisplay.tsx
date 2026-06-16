import React from "react";
import { Flex, VStack, Box, Heading, Text } from "@chakra-ui/react";
import { LuClock } from "react-icons/lu";

/**
 * @component ComingSoonDisplay
 * @description Placeholder component displayed when content (like a gallery) is not yet available.
 */
const ComingSoonDisplay: React.FC = () => {
  return (
    <Flex
      h="100%"
      w="100%"
      align="center"
      justify="center"
      direction="column"
    >
      <VStack gap="6" textAlign="center">
        <Box as={LuClock} w={12} h={12} color="text.muted" />
        <Heading size="lg">Próximamente</Heading>
        <Text color="text.muted">
          Estamos trabajando para agregar nuevas imágenes a esta sección.
        </Text>
      </VStack>
    </Flex>
  );
};

export default ComingSoonDisplay;
