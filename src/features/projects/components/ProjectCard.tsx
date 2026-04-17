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
}

/**
 * @component ProjectCard
 * @description Container component for a project card that handles navigation to the detail page.
 */
const ProjectCard: React.FC<ProjectCardProps> = React.memo((props) => {
  const router = useRouter();
  const {
    id, residencial, address, year, image, isLCP,
  } = props;

  const handleNavigate = () => {
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
    />
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
