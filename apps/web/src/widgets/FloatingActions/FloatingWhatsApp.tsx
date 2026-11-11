"use client";

import { useState } from "react";
import { Box, Text, Link, VStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
} from "@/shared/ui/dialog";
import { companyData } from "@/shared/config/company-data";

import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";

interface FloatingWhatsAppButtonProps {
  onClick?: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ onClick }) => (
  <Button
    variant="whatsapp"
    borderRadius="full"
    w={{ base: "14", md: "16" }}
    h={{ base: "14", md: "16" }}
    minW="0"
    p="0"
    boxShadow="md"
    onClick={onClick}
    aria-label="Abrir chat de WhatsApp"
    transition="background-color 0.2s ease, box-shadow 0.2s ease"
    _motionReduce={{ transition: "none" }}
  >
    {/* WhatsApp Brand Icon */}
    <WhatsAppIcon size={32} />
  </Button>
);

/**
 * @component FloatingWhatsApp
 * @description Botón flotante de WhatsApp que abre un modal con overlay.
 * Migrado de Modal (v2) → Dialog (v3) y useDisclosure → useState.
 */
const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

  return (
    <>
      <Box
        position="fixed"
        left="4"
        right="auto"
        zIndex="sticky"
        display={{ base: "none", md: "flex" }}
        css={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + var(--chakra-spacing-4))", "body[data-scroll-locked] &": { display: "none" } }}
      >
        <FloatingWhatsAppButton onClick={() => setIsOpen(true)} />
      </Box>

      {/* v3: Dialog instead of Modal */}
      <DialogRoot
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="center"
      >
        <DialogContent
          maxW="xs"
          bg="bg.surface"
          color="text.body"
          borderRadius="modal"
          boxShadow="modalLg"
          position="fixed"
          left={{ base: "4", md: "5" }}
          right={{ base: "4", md: "auto" }}
          css={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 6rem)" }}
        >
          <DialogHeader>
            <DialogTitle fontFamily="heading" fontWeight="bold">¿Necesitas Ayuda?</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <VStack gap={3} align="start">
              <Text>
                Chatea con nosotros en WhatsApp para una cotización o consulta.
              </Text>
              <Text fontSize="xl" fontWeight="700" color="text.heading" whiteSpace="nowrap">
                {companyData.whatsappDisplay}
              </Text>
              <Button
                as={Link}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                w="full"
                variant="whatsapp"
                onClick={() => setIsOpen(false)}
                gap="2"
              >
                <WhatsAppIcon size={20} />
                Iniciar Chat
              </Button>
            </VStack>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default FloatingWhatsApp;
