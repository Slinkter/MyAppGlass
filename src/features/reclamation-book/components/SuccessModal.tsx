"use client";

import React from "react";
import {
  Text,
  VStack,
  HStack,
  Box,
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
import { CheckCircle2, Printer, ShieldCheck } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId: string;
}

/**
 * @component SuccessModal
 * @description Modal de éxito que confirma el registro del reclamo con opción de impresión/descarga de constancia.
 */
const handlePrint = () => {
  window.print();
};

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
        boxShadow="0 20px 50px rgba(0,0,0,0.3)"
        borderRadius="2xl"
        color="text.body"
        maxW="540px"
        p={{ base: "4", md: "6" }}
      >
        <DialogHeader pb="2">
          <HStack gap="3" align="center">
            <Box color="green.500" display="flex" alignItems="center">
              <CheckCircle2 size={28} />
            </Box>
            <DialogTitle fontSize="lg" fontWeight="900" color="text.heading">
              ¡Reclamo Registrado con Éxito!
            </DialogTitle>
          </HStack>
        </DialogHeader>
        <DialogCloseTrigger />

        <DialogBody>
          <VStack align="stretch" gap="4" py="2">
            <Text fontSize="sm" color="text.muted" lineHeight="relaxed">
              Su hoja de reclamación ha sido debidamente ingresada en nuestro sistema conforme a las directivas de <strong>Indecopi (Ley N° 29571 / Ley N° 31435)</strong>.
            </Text>

            <Box
              p="4"
              borderRadius="xl"
              bg="whiteAlpha.100"
              _dark={{ bg: "blackAlpha.400" }}
              border="1px dashed"
              borderColor="primary.500"
              textAlign="center"
            >
              <Text fontSize="2xs" fontWeight="800" color="text.muted" letterSpacing="0.15em" textTransform="uppercase">
                CÓDIGO DE SEGUIMIENTO OFICIAL
              </Text>
              <Text fontSize="xl" fontWeight="900" color="text.accent" fontFamily="monospace" my="1">
                {trackingId || "GYA-REC-OK"}
              </Text>
              <Text fontSize="2xs" color="text.muted">
                Guarde este código para consultar el avance de su solicitud en cualquier momento.
              </Text>
            </Box>

            <HStack gap="2" p="3" borderRadius="lg" bg="blue.500/10" color="blue.400" fontSize="xs">
              <ShieldCheck size={18} style={{ flexShrink: 0 }} />
              <Text fontSize="xs">
                Se ha remitido una copia completa a su correo electrónico. Plazo legal de respuesta: <strong>15 días hábiles improrrogables</strong>.
              </Text>
            </HStack>
          </VStack>
        </DialogBody>

        <DialogFooter gap="3" pt="4">
          <Button
            variant="outline"
            size="md"
            borderRadius="full"
            onClick={handlePrint}
            borderColor="border.default"
          >
            <Printer size={16} style={{ marginRight: '6px' }} /> Imprimir / Guardar PDF
          </Button>
          <DialogActionTrigger asChild>
            <Button variant="aura" size="md" borderRadius="full" onClick={onClose}>
              Finalizar
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SuccessModal;
