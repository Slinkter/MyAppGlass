"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Store } from "lucide-react";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { STORE_ID, type LocationProject } from "../useLocationData";
import { Cover } from "./Cover";

interface PillSharedProps {
  active: boolean;
}

/**
 * Ítem interno del dock: sin `backdrop-filter` propio para no apilar vidrio sobre vidrio
 * ni sobrecargar la GPU sobre el mapa (`liquid-glass.md › Restraint` y `Tauri and Electron`).
 */
const itemStyle = ({ active }: PillSharedProps) =>
  ({
    flexShrink: 0,
    minH: TOUCH_MIN,
    scrollSnapAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2.5",
    p: "1.5",
    pr: "3",
    textAlign: "left",
    overflow: "hidden",
    cursor: "pointer",
    bg: active ? "bg.surface" : "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: active ? "primary.500" : "transparent",
    borderRadius: "xl",
    boxShadow: active ? "sm" : "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    _hover: { bg: "bg.surface/70" },
    _focusVisible: { outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" },
  }) as const;

interface StorePillProps {
  active: boolean;
  onSelectStore: () => void;
}

const StorePill = React.memo(({ active, onSelectStore }: StorePillProps) => (
  <Box
    as="button"
    data-project-id={STORE_ID}
    onClick={onSelectStore}
    aria-pressed={active}
    aria-current={active ? "true" : undefined}
    aria-label="Sede Principal en La Molina"
    w={{ base: "178px", md: "192px" }}
    {...itemStyle({ active })}
  >
    <Flex
      w="40px"
      h="40px"
      flexShrink={0}
      borderRadius="lg"
      bg={active ? "primary.900" : "bg.subtle"}
      color={active ? "white" : "text.heading"}
      _dark={{
        bg: active ? "white" : "bg.subtle",
        color: active ? "primary.900" : "text.heading",
      }}
      align="center"
      justify="center"
    >
      <Store size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
    </Flex>
    <Box minW={0} flex="1">
      <Text fontSize="xs" fontWeight="800" color="text.heading" truncate>
        Sede Principal
      </Text>
      <Text fontSize="xs" color="text.muted" truncate>
        La Molina
      </Text>
    </Box>
  </Box>
));
StorePill.displayName = "StorePill";

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
    w={{ base: "205px", md: "225px" }}
    {...itemStyle({ active })}
  >
    <Box
      position="relative"
      overflow="hidden"
      bg="bg.subtle"
      flexShrink={0}
      w="40px"
      h="40px"
      borderRadius="lg"
      aria-hidden="true"
    >
      <Cover src={project.image} alt="" />
    </Box>
    <Box minW={0} flex="1">
      <Text fontSize="xs" fontWeight="800" color="text.heading" truncate>
        {project.residencial || project.name}
      </Text>
      <Text fontSize="xs" color="text.muted" truncate>
        {[project.address, `${project.distanceKm.toLocaleString("es-PE")} km`].filter(Boolean).join(" · ")}
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

/**
 * Contenedor único de Liquid Glass (`GlassEffectContainer`, `liquid-glass.md › Restraint`)
 * elevado sobre el borde inferior (`bottom: 6`) para dejar visibles el logo y los enlaces legales
 * del mapa (`maps.md › Best practices`).
 */
export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, selectedId, onSelect }) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Centra la cápsula activa DENTRO del dock sin mover la página.
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

  const handleSelectStore = useCallback(() => onSelect(STORE_ID), [onSelect]);

  return (
    <Box
      position="absolute"
      left={{ base: "3", lg: "5" }}
      right={{ base: "3", lg: "5" }}
      bottom={{ base: "6", lg: "7" }}
      zIndex={2}
      bg="bg.surface/88"
      backdropFilter="blur(24px) saturate(1.4)"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="2xl"
      boxShadow="lg"
      p="1.5"
      css={{
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)": {
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          background: "var(--chakra-colors-bg\\.surface)",
        },
      }}
    >
      <Box
        ref={listRef}
        role="region"
        aria-label="Ubicaciones: sede principal y obras entregadas"
        onKeyDown={handleKeyDown}
        display="flex"
        alignItems="center"
        gap="1.5"
        overflowX="auto"
        scrollSnapType="x mandatory"
        overscrollBehaviorX="contain"
        scrollPaddingInline="2"
        css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
        scrollBehavior="auto"
      >
        <StorePill active={selectedId === STORE_ID || selectedId === null} onSelectStore={handleSelectStore} />
        <Box w="1px" h="7" bg="border.default" flexShrink={0} aria-hidden="true" />
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} active={p.id === selectedId} onSelect={onSelect} />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectCarousel;
