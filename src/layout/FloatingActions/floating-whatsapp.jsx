import React from "react";
import {
  Box,
  Button,
  Icon,
  Dialog,
  useDisclosure,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { companyData } from "@/config/company-data";
import { useColorModeValue } from "@/components/ui/color-mode";

/**
 * @component FloatingWhatsApp
 * @description Botón flotante de WhatsApp que abre un modal con overlay.
 * Migrado a Chakra UI v3 Dialog.
 * @returns {JSX.Element} Widget de WhatsApp rediseñado con funcionalidad de modal.
 */
const FloatingWhatsApp = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const whatsappLink = `https://wa.me/${
    companyData.whatsappNumber
  }?text=${encodeURIComponent(companyData.whatsappMessage)}`;
  const modalBg = useColorModeValue("white", "gray.700");
  const modalColor = useColorModeValue("gray.800", "white");

  const handleOpenChange = (details) => {
    if (!details.open) {
      onClose();
    }
  };

  return (
    <>
      <Box
        position="fixed"
        bottom={{ base: "90px", md: 4 }}
        right={4}
        zIndex="popover"
        display="flex"
      >
        <Button
          bg="#25D366"
          color="white"
          _hover={{ bg: "#1DAE54", transform: "scale(1.08)" }}
          _active={{ bg: "#178B43" }}
          variant="solid"
          rounded="full"
          w={16}
          h={16}
          boxShadow="lg"
          onClick={onOpen}
          aria-label="Abrir chat de WhatsApp"
          transition="all 0.2s ease"
        >
          <Icon as={FaWhatsapp} w={8} h={8} />
        </Button>
      </Box>

      <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center">
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            maxW="xs"
            bg={modalBg}
            color={modalColor}
            borderRadius="xl"
            boxShadow="xl"
            position="fixed"
            bottom="90px"
            right="20px"
          >
            <Dialog.Header fontWeight="bold" border="0">
              ¿Necesitas Ayuda?
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <VStack gap={3} align="start">
                <Text>
                  Chatea con nosotros en WhatsApp para una cotización o consulta.
                </Text>
                <Button
                  asChild
                  w="full"
                  colorPalette="green"
                  onClick={onClose}
                >
                  <Link href={whatsappLink} isExternal>
                    <Icon as={FaWhatsapp} mr={2} />
                    Iniciar Chat
                  </Link>
                </Button>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default FloatingWhatsApp;
