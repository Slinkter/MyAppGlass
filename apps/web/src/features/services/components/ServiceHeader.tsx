"use client";
import React from "react";
import {
  HStack,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import BackButton from "@shared/components/navigation/BackButton";
import { ServicePageSystem } from "@features/services/services/serviceService";

interface SystemSelectorProps {
  systems: ServicePageSystem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const SystemSelector = React.memo(({ systems, activeIndex, onSelect }: SystemSelectorProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  if (!systems || systems.length <= 1) return null;

  return (
    <HStack
      ref={containerRef}
      bg="bg.subtle"
      p="2"
      borderRadius="full"
      display="inline-flex"
      borderWidth="1px"
      borderColor="border.default"
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
            data-index={index}
            onClick={() => onSelect(index)}
            size={{ base: "sm", md: "md" }}
            variant={isActive ? "aura" : "ghost"}
            borderRadius="full"
            px="5"
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
    <VStack gap="5" align="stretch">
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "flex-end" }} gap="5">
        <VStack gap="2" align="flex-start">
          <BackButton to="/servicios" />
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} fontWeight="800" letterSpacing="-0.03em" color="text.heading" lineHeight="1.15">
            {title}
          </Heading>
        </VStack>
        <SystemSelector
          systems={systems}
          activeIndex={activeIndex}
          onSelect={onSelect}
        />
      </Flex>
    </VStack>
  );
};

export default ServiceHeader;
