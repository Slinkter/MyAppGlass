"use client";
import React from "react";
import {
  VStack,
  Heading,
  HStack,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import BackButton from "@shared/components/navigation/BackButton";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import { ServicePageSystem } from "../services/serviceService";

interface SystemSelectorProps {
  systems: ServicePageSystem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const SystemSelector = React.memo(({ systems, activeIndex, onSelect }: SystemSelectorProps) => {
  const activeBg = useColorModeValue("primary.700", "primary.300");
  const activeColor = useColorModeValue("white", "primary.900");
  const inactiveBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const inactiveColor = useColorModeValue("gray.700", "gray.300");
  const inactiveHoverBg = useColorModeValue("gray.200", "whiteAlpha.200");

  if (!systems || systems.length <= 1) return null;

  return (
    <HStack
      gap={2}
      justify={{ base: "center", md: "flex-end" }}
      flexWrap="wrap"
      maxW="full"
    >
      {systems.map((system, index) => {
        const isActive = activeIndex === index;
        return (
          <Button
            key={system.label}
            onClick={() => onSelect(index)}
            size="sm"
            px={5}
            mt={2}
            borderRadius="full"
            fontWeight="semibold"
            fontSize="xs"
            letterSpacing="wider"
            textTransform="uppercase"
            bg={isActive ? activeBg : inactiveBg}
            color={isActive ? activeColor : inactiveColor}
            _hover={{ bg: isActive ? activeBg : inactiveHoverBg }}
            transition="all 0.2s ease"
          >
            {system.label}
          </Button>
        );
      })}
    </HStack>
  );
});
SystemSelector.displayName = "SystemSelector";

interface ServiceHeaderProps {
  title: string;
  systems: ServicePageSystem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ title, systems, activeIndex, onSelect }) => {
  return (
    <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "flex-end" }} gap={8}>
      <VStack gap={4} align="flex-start">
        <Box mb={2}><BackButton to="/servicios" /></Box>
        <Heading size={{ base: "xl", md: "4xl" }} fontWeight="black" letterSpacing="tight" color="text.heading">
          {title}
        </Heading>
      </VStack>
      <SystemSelector
        systems={systems}
        activeIndex={activeIndex}
        onSelect={onSelect}
      />
    </Flex>
  );
};

export default ServiceHeader;
