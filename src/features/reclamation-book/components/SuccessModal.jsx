import {
  Dialog,
  Button,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from '@/components/ui/color-mode';

/**
 * @component SuccessModal
 * @description Modal de éxito que confirma el envío del reclamo.
 * Muestra el número de seguimiento generado y confirma el envío del correo.
 * Migrado a Chakra UI v3 Dialog.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Estado de visibilidad del modal.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {string} props.trackingId - Código de seguimiento generado para el reclamo (ej: REC-2025-001).
 * @returns {JSX.Element} Modal de confirmación.
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

  const handleOpenChange = (details) => {
    if (!details.open) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange} placement="center">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          boxShadow="0 4px 30px rgba(0,0,0,0.1)"
          borderRadius="2xl"
          color={textColor}
        >
          <Dialog.Header>
            <Dialog.Title>¡Reclamo enviado con éxito!</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
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
          </Dialog.Body>
          <Dialog.Footer>
            <Button colorPalette="primary" onClick={onClose}>
              Aceptar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default SuccessModal;
