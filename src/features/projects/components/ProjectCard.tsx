"use client";
import React from "react";
import ProjectCardContent from "./ProjectCardContent";
import { useRouter } from "next/navigation";
import logger from "@shared/utils/logger";

export interface ProjectCardProps {
  id: string | number;
  residencial: string;
  address: string;
  year: string | number;
  image: string;
  isLCP?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "auto" | "high" | "low";
}

/**
 * @component ProjectCard
 * @description Container component for a project card that handles navigation to the detail page.
 */
const ProjectCard: React.FC<ProjectCardProps> = React.memo((props) => {
  const router = useRouter();
  const {
    id, residencial, address, year, image, isLCP, loading, fetchPriority,
  } = props;

  const handleNavigate = () => {
    logger.debug({ id, residencial, address, year }, "ProjectCard navigate clicked");
    if (!id || id === "undefined") {
      logger.warn({ id, props }, "ProjectCard: Attempted to navigate with undefined ID");
      return;
    }
    router.push(`/proyectos/${id}`);
  };

  return (
    <ProjectCardContent
      image={image}
      residencial={residencial}
      address={address}
      year={year}
      onExplore={handleNavigate}
      isLCP={isLCP}
      loading={loading}
      fetchPriority={fetchPriority}
    />
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
