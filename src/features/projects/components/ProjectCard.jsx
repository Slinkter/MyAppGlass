/**
 * @file ProjectCard.jsx
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

/**
 * @component ProjectCard
 * @description Container component for a project card, displaying summary information and triggering a detailed modal on click.
 * @param {object} props - The component props.
 * @param {boolean} props.residencial - Indicates if the project is residential.
 * @param {string} props.name - The name of the project.
 * @param {string} props.address - The address of the project.
 * @param {number} props.year - The year the project was completed.
 * @param {string} props.g_maps - Google Maps link for the project location.
 * @param {Array<string>} props.photosObra - Array of URLs for project photos.
 * @param {string} props.image - URL for the main project image.
 * @param {boolean} props.preloaded - If true, forces the image to show immediately (e.g., for preloaded content).
 */
const ProjectCard = React.memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    residencial,
    name,
    address,
    year,
    g_maps,
    photosObra,
    image,
    preloaded,
  } = props;

  return (
    <>
      <ProjectCardContent
        image={image}
        residencial={residencial}
        address={address}
        year={year}
        onOpenModal={onOpen}
        forceShow={preloaded}
      />

      {isOpen && (
        <Suspense fallback={<ModalSkeleton />}>
          <LazyProjectDetailModal
            isOpen={isOpen}
            onClose={onClose}
            residencial={residencial}
            name={name}
            address={address}
            year={year}
            g_maps={g_maps}
            photos={photosObra}
          />
        </Suspense>
      )}
    </>
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
