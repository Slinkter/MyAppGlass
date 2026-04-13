"use client";

import React from "react";
import {
  Button,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from '@/components/ui/color-mode';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId: string;
}

/**
 * @component SuccessModal
 * @description Modal de éxito que confirma el envío del reclamo.
 */
const SuccessModal = ({ isOpen, onClose, trackingId }: SuccessModalProps) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(0, 0, 0, 0.95)"
  );
  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.1)",
    "rgba(255,255,255,0.1)"
  );
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 30px rgba(0,0,0,0.1)"
        borderRadius="2xl"
        color={textColor}
      >
        <DialogHeader>
          <DialogTitle>¡Reclamo enviado con éxito!</DialogTitle>
        </DialogHeader>
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
          <Button colorPalette="blue" onClick={onClose}>
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SuccessModal;
