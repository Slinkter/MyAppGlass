"use client";

/**
 * @file ProjectCard.tsx
 * @description Card component for displaying a project summary, serving as a trigger for a detailed modal.
 * @module projects/components
 * @remarks
 * Uses code splitting for the detail modal to optimize the bundle size of the initial project list.
 */

import React, { lazy, Suspense } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ProjectCardContent from "./ProjectCardContent";
import ModalSkeleton from "./modal/ModalSkeleton";

const LazyProjectDetailModal = lazy(() => import("./ProjectDetailModal"));

export interface ProjectCardProps {
  residencial: string;
  name?: string;
  address: string;
  year: string | number;
  g_maps?: string;
  photosObra?: { id: number; image: any; name?: string }[];
  image?: any;
  lat?: number | null;
  lng?: number | null;
  isLCP?: boolean;
}

/**
 * @component ProjectCard
 * @description Container component for a project card, displaying summary information and triggering a detailed modal on click.
 */
const ProjectCard = React.memo((props: ProjectCardProps) => {
  const { open, onOpen, onClose } = useDisclosure();
  const {
    residencial,
    name,
    address,
    year,
    g_maps,
    photosObra,
    image,
    lat,
    lng,
    isLCP,
  } = props;

  return (
    <>
      <ProjectCardContent
        image={image}
        residencial={residencial}
        address={address}
        year={year}
        onOpenModal={onOpen}
        isLCP={isLCP}
      />

      {open && (
        <Suspense fallback={<ModalSkeleton />}>
          <LazyProjectDetailModal
            isOpen={open}
            onClose={onClose}
            residencial={residencial}
            name={name}
            address={address}
            year={year}
            g_maps={g_maps}
            lat={lat}
            lng={lng}
            photos={photosObra}
          />
        </Suspense>
      )}
    </>
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
