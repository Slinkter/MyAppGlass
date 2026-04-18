import { useDisclosure } from "@chakra-ui/react";

export interface UseProjectModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Custom hook para gestionar el estado de un modal de detalles de proyecto.
 * Encapsula la lógica de abrir/cerrar el modal para una mejor reutilización y facilidad de prueba.
 *
 * @returns {UseProjectModalReturn} Objeto con el estado del modal y funciones de control.
 */
export const useProjectModal = (): UseProjectModalReturn => {
  const { open, onOpen, onClose } = useDisclosure();

  return {
    isOpen: open,
    onOpen,
    onClose,
  };
};
