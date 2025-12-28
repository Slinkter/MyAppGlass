import React from "react";
import { HStack, Text, Box, Icon, useColorModeValue } from "@chakra-ui/react";

/**
 * @component SpecItem
 * @description Muestra una especificación técnica individual (Clave: Valor) con icono.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ElementType} props.icon - Icono a mostrar.
 * @param {string} props.label - Etiqueta de la especificación.
 * @param {string} props.value - Valor de la especificación.
 * @returns {JSX.Element} Ítem de especificación.
 */
const SpecItem = ({ icon, label, value }) => {
  const bg = useColorModeValue("whiteAlpha.500", "whiteAlpha.50");
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const iconBg = useColorModeValue("primary.50", "whiteAlpha.100");
  const iconColor = useColorModeValue("primary.600", "primary.300");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const valueColor = useColorModeValue("gray.800", "gray.100");

  return (
    <HStack
      w="full"
      p={3}
      bg={bg}
      rounded="xl"
      borderWidth="1px"
      borderColor={borderColor}
      justify="space-between"
      align="center"
      spacing={4}
      transition="all 0.2s"
      _hover={{
        borderColor: iconColor,
        transform: "translateY(-1px)",
        shadow: "sm",
      }}
    >
      <HStack spacing={3} overflow="hidden">
        <Box
          p={2}
          rounded="lg"
          bg={iconBg}
          color={iconColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} boxSize={4} />
        </Box>
        <Text
          fontSize="xs"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wider"
          color={labelColor}
          noOfLines={2}
        >
          {label}
        </Text>
      </HStack>

      <Text
        fontSize="sm"
        fontWeight="bold"
        color={valueColor}
        textAlign="right"
        noOfLines={2}
        maxW="50%"
      >
        {value}
      </Text>
    </HStack>
  );
};

export default SpecItem;
