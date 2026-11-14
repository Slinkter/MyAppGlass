"use client";

import React from "react";
import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import BackButton from "@shared/components/navigation/BackButton";
import type { ServicePageSystem } from "@/entities/service/model";

type OpeningFilter = "todos" | "corrediza" | "proyectante" | "batiente";

const classifySystemOpening = (label: string): Exclude<OpeningFilter, "todos"> => {
  const norm = label.toLowerCase();
  if (norm.includes("proyectante") || norm.includes("3831") || norm.includes("serie 42") || norm.includes("vpr")) {
    return "proyectante";
  }
  if (norm.includes("batiente") || norm.includes("mbt") || norm.includes("serie 35") || norm.includes("serie 36")) {
    return "batiente";
  }
  return "corrediza";
};

interface SystemSelectorProps {
  systems: ServicePageSystem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const SystemSelector = React.memo(({ systems, activeIndex, onSelect }: SystemSelectorProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [openingFilter, setOpeningFilter] = React.useState<OpeningFilter>("todos");
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const showCategoryFilters = systems.length > 7;

  const indexedSystems = React.useMemo(
    () =>
      systems
        .map((system, index) => ({
          system,
          index,
          category: classifySystemOpening(system.label),
        }))
        .filter((item) => openingFilter === "todos" || item.category === openingFilter),
    [systems, openingFilter],
  );

  const updateScrollButtons = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [indexedSystems.length, updateScrollButtons]);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex, openingFilter]);

  const scrollStrip = (direction: -1 | 1) => {
    containerRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  if (!systems || systems.length <= 1) return null;

  return (
    <VStack align="stretch" gap="2.5" w="full" maxW="full">
      {showCategoryFilters && (
        <HStack gap="1.5" flexWrap="wrap" role="group" aria-label="Filtrar sistemas por tipo de apertura">
          {(
            [
              { id: "todos", label: `Todos (${systems.length})` },
              { id: "corrediza", label: "Corredizas" },
              { id: "proyectante", label: "Proyectantes" },
              { id: "batiente", label: "Batientes" },
            ] as const
          ).map((tab) => {
            const count =
              tab.id === "todos"
                ? systems.length
                : systems.filter((s) => classifySystemOpening(s.label) === tab.id).length;
            if (tab.id !== "todos" && count === 0) return null;
            return (
              <Button
                key={tab.id}
                variant={openingFilter === tab.id ? "primary" : "outline"}
                size="xs"
                minH="11"
                borderRadius="full"
                px="3.5"
                aria-pressed={openingFilter === tab.id}
                onClick={() => {
                  setOpeningFilter(tab.id);
                  if (tab.id !== "todos") {
                    const currentCat = systems[activeIndex]
                      ? classifySystemOpening(systems[activeIndex].label)
                      : null;
                    if (currentCat !== tab.id) {
                      const firstMatchIdx = systems.findIndex(
                        (s) => classifySystemOpening(s.label) === tab.id,
                      );
                      if (firstMatchIdx !== -1) onSelect(firstMatchIdx);
                    }
                  }
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </HStack>
      )}

      <Flex align="center" gap="1.5" maxW="full" minW={0}>
        {canScrollLeft && (
          <Button
            variant="outline"
            size="sm"
            minW="11"
            minH="11"
            px="0"
            borderRadius="full"
            aria-label="Desplazar sistemas a la izquierda"
            onClick={() => scrollStrip(-1)}
            flexShrink={0}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </Button>
        )}

        <HStack
          ref={containerRef}
          onScroll={updateScrollButtons}
          bg="bg.subtle"
          p="1.5"
          borderRadius="full"
          borderWidth="1px"
          borderColor="border.default"
          maxW="full"
          overflowX="auto"
          gap="1"
          role="group"
          aria-label="Sistemas disponibles"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {indexedSystems.map(({ system, index }) => {
            const isActive = activeIndex === index;
            return (
              <Button
                key={system.label}
                data-index={index}
                onClick={() => onSelect(index)}
                size="sm"
                minH="11"
                variant={isActive ? "primary" : "ghost"}
                aria-pressed={isActive}
                borderRadius="full"
                px="4"
                flexShrink={0}
                fontWeight={isActive ? "700" : "500"}
              >
                {system.label}
              </Button>
            );
          })}
        </HStack>

        {canScrollRight && (
          <Button
            variant="outline"
            size="sm"
            minW="11"
            minH="11"
            px="0"
            borderRadius="full"
            aria-label="Desplazar sistemas a la derecha"
            onClick={() => scrollStrip(1)}
            flexShrink={0}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </Button>
        )}
      </Flex>
    </VStack>
  );
});
SystemSelector.displayName = "SystemSelector";

interface ServiceHeaderProps {
  title: string;
  systems: ServicePageSystem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  systems,
  activeIndex,
  onSelect,
}) => {
  return (
    <Box w="full">
      <VStack gap="3.5" align="stretch">
        <HStack justify="space-between" align="center" gap="3" flexWrap="wrap">
          <BackButton to="/#servicios" />
        </HStack>

        <Heading
          as="h1"
          fontFamily="heading"
          fontWeight="700"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          lineHeight="1.1"
          letterSpacing="-0.02em"
          color="text.heading"
        >
          {title}
        </Heading>

        <SystemSelector
          systems={systems}
          activeIndex={activeIndex}
          onSelect={onSelect}
        />
      </VStack>
    </Box>
  );
};

export default ServiceHeader;
