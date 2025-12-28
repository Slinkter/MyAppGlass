import React from "react";
import { Flex, Icon, Box, Text, useColorModeValue } from "@chakra-ui/react";

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
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const valueColor = useColorModeValue("gray.800", "white");

  return (
    <Flex align="center">
      <Icon as={icon} w={6} h={6} mr={3} color={iconColor} />
      <Box>
        <Text fontSize="sm" color={labelColor}>
          {label}
        </Text>
        <Text fontWeight="bold" color={valueColor}>
          {value}
        </Text>
      </Box>
    </Flex>
  );
};

export default ProjectDetailItem;
