import React from "react";
import { Box } from "@chakra-ui/react"; // Import Box
import ProjectsList from "../components/projects/ProjectsList";

const ProjectView = () => {
    return (
        <Box as="section" p={4}>
            <ProjectsList />
        </Box>
    );
};

export default ProjectView;
