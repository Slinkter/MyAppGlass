import { useColorModeValue } from "@/components/ui/color-mode";
import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

/**
 * @component ProjectDetailItem
 * @description Muestra un ítem de detalle individual para un proyecto, incluyendo un icono, una etiqueta y su valor.
 *
 * @param {{
 *   icon: React.ElementType,
 *   label: string,
 *   value: string
 * }} props - Propiedades del componente.
 * @param {React.ElementType} props.icon - Componente de icono a mostrar.
 * @param {string} props.label - Etiqueta descriptiva del detalle.
 * @param {string} props.value - Valor del detalle a mostrar.
 * @returns {JSX.Element} Ítem de detalle renderizado.
 */
const ProjectDetailItem = ({ icon, label, value }) => {
  const iconColor = useColorModeValue("primary.600", "primary.300");
  const cellBg = useColorModeValue("whiteAlpha.600", "whiteAlpha.50");

  return (
    <VStack
      align="start"
      gap={3}
      p={4}
      bg={cellBg}
      borderRadius="xl"
      border="1px solid"
      borderColor="border.glass"
      transition="all 0.2s"
      _hover={{ transform: "translateX(2px)", borderColor: "primary.500" }}
    >
      <Box as={icon} size={20} color={iconColor} strokeWidth={1.5} />
      <Box>
        <Text fontSize="10px" fontWeight="900" color="text.muted" textTransform="uppercase" letterSpacing="0.1em" mb={1}>
          {label}
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="text.heading" noOfLines={2} lineHeight="shorter">
          {value || "No especificado"}
        </Text>
      </Box>
    </VStack>
  );
};

export default ProjectDetailItem;
