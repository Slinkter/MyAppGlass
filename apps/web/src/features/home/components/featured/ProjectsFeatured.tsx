"use client";

/**
 * @file ProjectsFeatured.tsx
 * @description Obras destacadas de la home: las 6 más recientes + enlace a todas.
 * Datos de Firestore vía `useProjects` (ya vienen de la más reciente a la más antigua).
 */

import React from "react";
import { Container } from "@chakra-ui/react";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import type { Project } from "@shared/types/project";
import { useProjects } from "@features/projects/hooks/useProjects";
import ProjectCard from "@features/projects/components/ProjectCard";
import { Reveal } from "@shared/components/motion/Reveal";
import { SectionHeader } from "../shared/SectionHeader";
import { CardRail } from "./CardRail";

const FEATURED_COUNT = 6;

export interface ProjectsFeaturedProps {
  initialData?: FirestoreProject[];
}

export const ProjectsFeatured: React.FC<ProjectsFeaturedProps> = ({ initialData }) => {
  const { data } = useProjects(initialData);
  const all = (data ?? []) as Project[];
  const items = all.slice(0, FEATURED_COUNT);

  return (
    <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }}>
      <SectionHeader
        eyebrow="Obras entregadas"
        title="Proyectos recientes"
        description="Instalaciones terminadas en Lima: así queda el trabajo en casa del cliente."
        action={{
          href: "/proyectos/ver",
          label: all.length > FEATURED_COUNT ? `Ver las ${all.length} obras` : "Ver todas las obras",
        }}
      />
      <CardRail label="Proyectos recientes">
        {items.map((project, index) => (
          <Reveal key={project.id} index={index % 3}>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </CardRail>
    </Container>
  );
};

export default ProjectsFeatured;
