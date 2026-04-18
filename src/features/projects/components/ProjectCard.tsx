"use client";
import React from "react";
import ProjectCardContent from "./ProjectCardContent";
import { useRouter } from "next/navigation";

export interface ProjectCardProps {
  id: string | number;
  residencial: string;
  address: string;
  year: string | number;
  image: string;
  isLCP?: boolean;
  loading?: "lazy" | "eager" | string;
  fetchPriority?: "auto" | "high" | "low" | string;
  [key: string]: any;
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
    if (!id || id === "undefined") {
      console.warn("ProjectCard: Attempted to navigate to a project with an undefined ID", props);
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
