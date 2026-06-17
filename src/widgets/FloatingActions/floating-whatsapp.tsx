"use client";

import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import { useState } from "react";
import { Box, Text, Link, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { companyData } from "@/shared/config/company-data";

// SVG Oficial de WhatsApp (Bootstrap Icons format, viewBox 0 0 16 16)
const WhatsAppIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

/**
 * @component FloatingWhatsApp
 * @description Botón flotante de WhatsApp que abre un modal con overlay.
 * Migrado de Modal (v2) → Dialog (v3) y useDisclosure → useState.
 */
const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;
  const modalBg = useColorModeValue("white", "gray.700");
  const modalColor = useColorModeValue("gray.800", "white");

  return (
    <>
      <Box
        position="fixed"
        bottom={{ base: 6, md: 4 }}
        left={{ base: "auto", md: "auto" }}
        right={{ base: 4, md: 4 }}
        zIndex="popover"
        display="flex"
        css={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + var(--chakra-spacing-4))" }}
      >
        <Button
          bg="brand.whatsapp"
          color="white"
          _hover={{ bg: "brand.whatsappHover", transform: "scale(1.08)" }}
          _active={{ bg: "brand.whatsappActive" }}
          variant="solid"
          borderRadius="full"
          w={16}
          h={16}
          boxShadow="lg"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat de WhatsApp"
           transition="background-color 0.2s ease, transform 0.2s ease"
        >
          {/* WhatsApp Brand Icon */}
          <WhatsAppIcon size={32} />
        </Button>
      </Box>

      {/* v3: Dialog instead of Modal */}
      <DialogRoot
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="center"
      >
        <DialogContent
          maxW="xs"
          bg={modalBg}
          color={modalColor}
          borderRadius="xl"
          boxShadow="xl"
          position="fixed"
          bottom={{ base: "100px", md: "90px" }}
          right={{ base: 4, md: "20px" }}
          left={{ base: 4, md: "auto" }}
          css={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 90px)" }}
        >
          <DialogHeader>
            <DialogTitle fontWeight="bold">¿Necesitas Ayuda?</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <VStack gap={3} align="start">
              <Text>
                Chatea con nosotros en WhatsApp para una cotización o consulta.
              </Text>
              <Button
                as={Link}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                w="full"
                bg="brand.whatsapp"
                color="white"
                _hover={{ bg: "brand.whatsappHover" }}
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
