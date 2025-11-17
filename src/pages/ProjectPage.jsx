import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react"; // Import Box
import ProjectsList from "../components/projects/ProjectsList";

const ProjectView = () => {
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(0, 0, 0, 0.25)"
    );
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    );
    const textColor = useColorModeValue("gray.800", "gray.100");

    return (
        <Box
            as="section"
            p={4}
            // Glassmorphism effects
        >
            <ProjectsList />
        </Box>
    );
};

export default ProjectView;
