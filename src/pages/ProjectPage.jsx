import React from "react";
import { Box } from "@chakra-ui/react";
import ProjectsList from "../components/projects/ProjectsList";

/**
 * @component ProjectPage
 * @description Page component that renders the projects list.
 * Displays all completed projects in a grid layout.
 * @returns {JSX.Element} The project page with projects list
 */
const ProjectPage = () => {
  return (
    <Box as="section" p={4}>
      <ProjectsList />
    </Box>
  );
};

export default ProjectPage;
