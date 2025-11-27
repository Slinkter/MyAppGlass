import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component SuccessModal
 * @description Modal component to display success message after form submission.
 * Shows the tracking number and confirmation message.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   trackingId: string
 * }} props - Component props
 * @returns {JSX.Element} The rendered success modal
 *
 * @example
 * <SuccessModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   trackingId="REC-2025-001"
 * />
 */
const SuccessModal = ({ isOpen, onClose, trackingId }) => {
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(20px)" />
      <ModalContent
        bg={bgColor}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 30px rgba(0,0,0,0.1)"
        borderRadius="2xl"
        color={textColor}
      >
        <ModalHeader>¡Reclamo enviado con éxito!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Su número de seguimiento es:{" "}
            <Text as="span" fontWeight="bold">
              {trackingId}
            </Text>
            .
          </Text>
          <Text mt={2}>
            Se ha enviado una copia de la confirmación a su correo electrónico.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" onClick={onClose}>
            Aceptar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
