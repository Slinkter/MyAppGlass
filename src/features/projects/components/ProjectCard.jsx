import React, { lazy, Suspense } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ProjectCardContent from "./ProjectCardContent";
import ModalSkeleton from "./modal/ModalSkeleton";

const LazyProjectDetailModal = lazy(() => import('./ProjectDetailModal'));

/**
 * @component ProjectCard
 * @description Container component para tarjeta de proyecto
 */
const ProjectCard = React.memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { residencial, name, address, year, g_maps, photosObra, image } = props;

  return (
    <>
      <ProjectCardContent
        image={image}
        residencial={residencial}
        address={address}
        year={year}
        onOpenModal={onOpen}
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