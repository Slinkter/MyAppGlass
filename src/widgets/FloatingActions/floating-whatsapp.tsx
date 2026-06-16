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
import { FaWhatsapp } from "react-icons/fa";
import { companyData } from "@/shared/config/company-data";

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
        display={{ base: "none", md: "flex" }}
      >
        <Button
          bg="#25D366"
          color="white"
          _hover={{ bg: "#1DAE54", transform: "scale(1.08)" }}
          _active={{ bg: "#178B43" }}
          variant="solid"
          borderRadius="full"
          w={16}
          h={16}
          boxShadow="lg"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat de WhatsApp"
           transition="background-color 0.2s ease, transform 0.2s ease"
        >
          {/* v3: icon as child, not as prop */}
          <Box as={FaWhatsapp} w={8} h={8} />
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
                bg="#25D366"
                color="white"
                _hover={{ bg: "#1DAE54" }}
                onClick={() => setIsOpen(false)}
              >
                <Box as={FaWhatsapp} />
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
