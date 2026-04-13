"use client";

import React from "react";
import { Flex, Icon, Box, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LucideIcon } from "lucide-react";

export interface ProjectDetailItemProps {
  icon: LucideIcon | React.ElementType;
  label: string;
  value?: string | number;
}

/**
 * @component ProjectDetailItem
 * @description Muestra un ítem de detalle individual para un proyecto, incluyendo un icono, una etiqueta y su valor.
 */
const ProjectDetailItem = ({ icon, label, value }: ProjectDetailItemProps) => {
  const iconColor = useColorModeValue("primary.500", "primary.400");
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const valueColor = useColorModeValue("gray.800", "white");

  if (!value) return null;

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
