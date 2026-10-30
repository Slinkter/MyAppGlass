"use client";
import React, { useEffect, useState } from "react";
import {
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ContactSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId: string;
}

/**
 * @component ContactSuccessModal
 * @description Modal de éxito para confirmación del envío del formulario de contacto con redirección.
 */
export const ContactSuccessModal: React.FC<ContactSuccessModalProps> = ({
  isOpen,
  onClose,
  trackingId,
}) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) return;

    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && countdown <= 0) {
      onClose();
    }
  }, [isOpen, countdown, onClose]);

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
        boxShadow="0 24px 48px rgba(0,0,0,0.15)"
        borderRadius="2xl"
        color="text.body"
        p={4}
      >
        <DialogHeader>
          <VStack gap={2} align="center" w="full" pb={2}>
            <HStack
              w="12"
              h="12"
              bg="green.500/10"
              color="green.500"
              borderRadius="full"
              justify="center"
              align="center"
              mb={2}
            >
              <Check size={24} strokeWidth={3} />
            </HStack>
            <DialogTitle fontSize="xl" fontWeight="900" textAlign="center" letterSpacing="tight">
              ¡Consulta Recibida!
            </DialogTitle>
          </VStack>
        </DialogHeader>
        
        <DialogBody>
          <VStack gap={4} align="center" textAlign="center">
            <Text fontSize="sm" color="text.body">
              Hemos registrado tu solicitud de cotización correctamente.
            </Text>
            <VStack gap={1} bg="surface.muted" p={3} borderRadius="xl" border="1px solid" borderColor="border.default" w="full">
              <Text fontSize="2xs" color="text.muted" fontWeight="800" letterSpacing="widest" textTransform="uppercase">
                Código de Seguimiento
              </Text>
              <Text fontSize="lg" fontWeight="900" color="text.heading">
                {trackingId}
              </Text>
            </VStack>
            <Text fontSize="xs" color="text.muted">
              Puedes usar este código para consultar el estado de tu cotización en cualquier momento.
            </Text>
            
            <HStack gap={2} pt={2} color="text.accent">
              <Spinner size="xs" color="currentColor" />
              <Text fontSize="xs" fontWeight="700">
                Redireccionando al inicio en {countdown} segundos...
              </Text>
            </HStack>
          </VStack>
        </DialogBody>

        <DialogFooter>
          <Button colorPalette="primary" variant="aura" borderRadius="full" w="full" onClick={onClose} fontWeight="800">
            Volver al Inicio Ahora
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
