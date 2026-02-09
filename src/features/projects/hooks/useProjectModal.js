import { useDisclosure } from "@chakra-ui/react";

/**
 * @typedef {Object} UseProjectModalReturn
 * @property {boolean} isOpen - Indica si el modal está abierto.
 * @property {function(): void} onOpen - Función para abrir el modal.
 * @property {function(): void} onClose - Función para cerrar el modal.
 */

/**
 * Custom hook para gestionar el estado de un modal de detalles de proyecto.
 * Encapsula la lógica de abrir/cerrar el modal para una mejor reutilización y facilidad de prueba.
 *
 * @returns {UseProjectModalReturn} Objeto con el estado del modal y funciones de control.
 *
 * @example
 * // Ejemplo de uso en un componente React
 * import { useProjectModal } from '@/hooks/useProjectModal';
 * import { Button } from '@chakra-ui/react';
 * import ProjectDetailModal from '@/components/projects/ProjectDetailModal';
 *
 * function MyComponent({ projectData }) {
 *   const { isOpen, onOpen, onClose } = useProjectModal();
 *
 *   return (
 *     <>
 *       <Button onClick={onOpen}>Ver Detalles del Proyecto</Button>
 *       <ProjectDetailModal isOpen={isOpen} onClose={onClose} project={projectData} />
 *     </>
 *   );
 * }
 */
export const useProjectModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    isOpen,
    onOpen,
    onClose,
  };
};
