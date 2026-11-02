"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { LocationProject } from "../../location/useLocationData";
import { Cover } from "./Cover";

interface CardProps {
  project: LocationProject;
  active: boolean;
  onSelect: (id: LocationProject["id"]) => void;
}

const ProjectCard = React.memo(({ project, active, onSelect }: CardProps) => (
  <Box
    as="button"
    data-project-id={String(project.id)}
    onClick={() => onSelect(project.id)}
    aria-pressed={active}
    aria-current={active ? "true" : undefined}
    aria-label={`${project.name}, ${project.address}${project.year ? `, ${project.year}` : ""}`}
    flexShrink={0}
    w={{ base: "260px", md: "300px", lg: "240px" }}
    minH={TOUCH_MIN}
    scrollSnapAlign="center"
    display="flex"
    flexDirection={{ base: "column", lg: "row" }}
    alignItems={{ lg: "center" }}
    gap={{ base: "0", lg: "3" }}
    textAlign="left"
    overflow="hidden"
    cursor="pointer"
    bg="bg.surface/90"
    backdropFilter="blur(14px)"
    border="2px solid"
    borderColor={active ? "primary.500" : "border.default"}
    borderRadius="xl"
    boxShadow={active ? "lg" : "sm"}
    p={{ lg: "2" }}
    transition="border-color 0.2s ease, box-shadow 0.2s ease"
    _hover={{ borderColor: "primary.500" }}
    _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
  >
    <Box
      position="relative"
      overflow="hidden"
      bg="bg.subtle"
      flexShrink={0}
      w={{ base: "full", lg: "48px" }}
      h={{ base: "110px", md: "130px", lg: "48px" }}
      borderRadius={{ lg: "lg" }}
    >
      <Cover src={project.image} alt="" />
    </Box>
    <Box minW={0} p={{ base: "3", lg: "0" }} flex="1">
      <Text fontSize="sm" fontWeight="800" color="text.heading" truncate>
        {project.name}
      </Text>
      <Text fontSize="xs" color="text.muted" truncate>
        {[project.address, project.year].filter(Boolean).join(" · ")}
      </Text>
    </Box>
  </Box>
));
ProjectCard.displayName = "ProjectCard";

export interface ProjectCarouselProps {
  projects: LocationProject[];
  selectedId: string | number | null;
  onSelect: (id: string | number | null) => void;
}

/** Carrusel horizontal con scroll-snap flotando sobre el mapa. */
export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, selectedId, onSelect }) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Centra la tarjeta activa DENTRO del carrusel (sin mover la página).
  useEffect(() => {
    const list = listRef.current;
    if (!list || selectedId === null) return;
    const card = list.querySelector<HTMLElement>(`[data-project-id="${CSS.escape(String(selectedId))}"]`);
    if (!card) return;
    const l = list.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const left = list.scrollLeft + (c.left - l.left) - (l.width - c.width) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [selectedId]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("button"));
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (i === -1) return;
    e.preventDefault();
    items[Math.min(items.length - 1, Math.max(0, i + (e.key === "ArrowRight" ? 1 : -1)))]?.focus();
  }, []);

  return (
    <Box
      ref={listRef}
      role="region"
      aria-label="Obras entregadas, carrusel horizontal"
      onKeyDown={handleKeyDown}
      position="absolute"
      left="0"
      right="0"
      bottom="0"
      zIndex={2}
      display="flex"
      gap="3"
      px="3"
      pt="2"
      pb="3"
      overflowX="auto"
      scrollSnapType="x mandatory"
      overscrollBehaviorX="contain"
      scrollPaddingInline="3"
      css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
      scrollBehavior="auto"
    >
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} active={p.id === selectedId} onSelect={onSelect} />
      ))}
    </Box>
  );
};

export default ProjectCarousel;
