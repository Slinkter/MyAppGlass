"use client";
/**
 * @file ProjectCardContent.tsx
 * @description Tarjeta de proyecto: botón accesible (teclado y foco) sobre `MediaCard`.
 */

import React from "react";
import { ArrowRight } from "lucide-react";
import { MediaCard } from "@shared/components/Card/MediaCard";

interface ProjectCardContentProps {
  image?: string;
  residencial: string;
  address: string;
  year: string | number;
  onExplore: () => void;
  isLCP?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "auto" | "high" | "low";
}

/**
 * @component ProjectCardContent
 * @description Presentational component for the project card visual structure.
 * La raíz es un `role="button"`, así que el hover de la foto usa la clase `group`.
 */
const ProjectCardContent: React.FC<ProjectCardContentProps> = React.memo(
  ({ image = "", residencial, address, year, onExplore, isLCP, loading }) => {
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExplore();
        }
      },
      [onExplore],
    );

    const projectLocationAndYear = [address, year].filter(Boolean).join(" · ");

    return (
      <MediaCard
        image={image}
        imageAlt={`Proyecto ${residencial} - GYA Glass & Aluminum`}
        title={residencial}
        description={projectLocationAndYear}
        actionIcon={ArrowRight}
        loading={loading || (isLCP ? "eager" : "lazy")}
        isLCP={isLCP}
        rootProps={{
          as: "div",
          role: "button",
          tabIndex: 0,
          "aria-label": `Ver detalles del proyecto ${residencial} en ${projectLocationAndYear}`,
          cursor: "pointer",
          onClick: onExplore,
          onKeyDown: handleKeyDown,
          _focusVisible: {
            outline: "2px solid",
            outlineColor: "ring.primary",
            outlineOffset: "2px",
          },
        }}
      />
    );
  },
);

ProjectCardContent.displayName = "ProjectCardContent";

export default ProjectCardContent;
