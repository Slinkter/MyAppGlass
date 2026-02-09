import React from "react";
import { Box } from "@chakra-ui/react";
import { ProjectsList } from "@features/projects";

/**
 * @component ProjectPage
 * @description Page component that renders the projects list.
 * Displays all completed projects in a grid layout.
 * @returns {JSX.Element} The project page with projects list
 */
const ProjectPage = () => {
  return (
    <Box as="section" py={1}>
      <ProjectsList />
      {/* <Box>Test Project Page Loading</Box> */}
    </Box>
  );
};

export default ProjectPage;
