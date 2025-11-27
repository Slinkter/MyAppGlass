import { useDisclosure } from "@chakra-ui/react";

/**
 * Custom hook to manage the state of a project detail modal.
 * Encapsulates the modal open/close logic for better reusability and testability.
 *
 * @returns {{
 *   isOpen: boolean,
 *   onOpen: () => void,
 *   onClose: () => void
 * }} Modal state and control functions
 *
 * @example
 * const { isOpen, onOpen, onClose } = useProjectModal();
 *
 * return (
 *   <>
 *     <Button onClick={onOpen}>View Details</Button>
 *     <ProjectDetailModal isOpen={isOpen} onClose={onClose} {...data} />
 *   </>
 * );
 */
export const useProjectModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    isOpen,
    onOpen,
    onClose,
  };
};
