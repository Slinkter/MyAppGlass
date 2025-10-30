import React from "react";
import { Box } from "@chakra-ui/react"; // Import Box
import ProjectsList from "../components/projects/ProjectsList";

const ProjectView = () => {
    return (
        <Box> {/* Replaced <div> with <Box> */}
            <ProjectsList />
        </Box>
    );
};

export default ProjectView;