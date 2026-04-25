"use client";
import React from "react";
import {
  VStack,
  Heading,
  HStack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import BackButton from "@shared/components/navigation/BackButton";
import { ServicePageSystem } from "../services/serviceService";

interface SystemSelectorProps {
  systems: ServicePageSystem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const SystemSelector = React.memo(({ systems, activeIndex, onSelect }: SystemSelectorProps) => {
  if (!systems || systems.length <= 1) return null;

  return (
    <HStack
      bg="bg.subtle"
      p="phi_xs"
      borderRadius="full"
      display="inline-flex"
      border="1px solid"
      borderColor="border.glass"
      _dark={{ bg: "blackAlpha.400", borderColor: "whiteAlpha.100" }}
      maxW="full"
      overflowX="auto"
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      {systems.map((system, index) => {
        const isActive = activeIndex === index;
        return (
          <Button
            key={system.label}
            onClick={() => onSelect(index)}
            size={{ base: "sm", md: "md" }}
            variant={isActive ? "aura" : "ghost"}
            borderRadius="full"
            px={{ base: 6, md: 8 }}
            flexShrink={0}
            fontWeight={isActive ? "bold" : "medium"}
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
    <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "flex-end" }} gap="phi_lg">
      <VStack gap="phi_sm" align="flex-start">
        <Box mb="phi_xs"><BackButton to="/servicios" /></Box>
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
