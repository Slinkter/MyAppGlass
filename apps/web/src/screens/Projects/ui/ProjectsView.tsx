/**
 * @file ProjectsView.tsx
 * @description View component for the portfolio section, rendering the paginated list of projects.
 * @module views/projects
 */

import React from "react";
import { Box } from "@chakra-ui/react";
import type { Project } from "@/shared/api/firebase/types";
import { ProjectsList } from "@features/projects";

interface ProjectsViewProps {
  /** Proyectos leídos de Firestore en build (primer render, para el HTML exportado). */
  initialData?: Project[];
}

/**
 * @component ProjectsView
 * @description Page component that renders the projects list.
 * Displays all completed projects in a grid layout.
 * @returns {JSX.Element} The project page with projects list
 */
const ProjectsView: React.FC<ProjectsViewProps> = ({ initialData }) => {
  return (
    <Box as="section" py={1}>
      <ProjectsList initialData={initialData} />
    </Box>
  );
};

export default ProjectsView;
