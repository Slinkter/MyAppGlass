"use client";

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { projects } from "@/features/projects/data/projects";

const HomeProjectsSection = () => {
    // Show top 3 projects for home page
    const highlightProjects = projects.slice(0, 3);

    return (
        <ItemGridLayout
            title="PROYECTOS RECIENTES"
            subtitle="Conoce algunos de nuestros trabajos más destacados en edificios residenciales y comerciales."
            columns={{ base: 1, md: 3 }}
        >
            {highlightProjects.map((project, index) => (
                <ItemGridLayout.Item key={project.id} delay={index * 0.1}>
                    <ProjectCard
                        {...project}
                    />
                </ItemGridLayout.Item>
            ))}
        </ItemGridLayout>
    );
};

export default HomeProjectsSection;
