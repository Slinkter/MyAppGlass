import React from "react";
import {
  Text,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId: string;
}

/**
 * @component SuccessModal
 * @description Modal de éxito que confirma el envío del reclamo.
 */
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, trackingId }) => {
  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={(e) => !e.open && onClose()} 
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogContent
        bg="surface.card"
        border="1px solid"
        borderColor="border.glass"
        backdropFilter="blur(16px)"
        boxShadow="0 4px 30px rgba(0,0,0,0.1)"
        borderRadius="2xl"
        color="text.body"
      >
        <DialogHeader>
          <DialogTitle>¡Reclamo enviado con éxito!</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="primary" onClick={onClose}>
              Aceptar
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SuccessModal;
