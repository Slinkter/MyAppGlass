import React from "react";
import {
  Box,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  useColorModeValue,
  Link,
  VStack,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { companyData } from "@/config/company-data";

/**
 * @component FloatingWhatsApp
 * @description Botón flotante de WhatsApp que abre un modal con overlay.
 * @returns {JSX.Element} Widget de WhatsApp rediseñado con funcionalidad de modal.
 */
const FloatingWhatsApp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const whatsappLink = `https://wa.me/${
    companyData.whatsappNumber
  }?text=${encodeURIComponent(companyData.whatsappMessage)}`;
  const modalBg = useColorModeValue("white", "gray.700");
  const modalColor = useColorModeValue("gray.800", "white");

  return (
    <>
      <Box
        position="fixed"
        bottom={4}
        right={4}
        zIndex="popover"
        display={{ base: "none", md: "flex" }}
      >
        <Button
          bg="#25D366" // WhatsApp green
          color="white"
          _hover={{ bg: "#1DAE54" }}
          _active={{ bg: "#178B43" }}
          variant="solid"
          rounded="full"
          w={16}
          h={16}
          boxShadow="lg"
          onClick={onOpen}
          aria-label="Abrir chat de WhatsApp"
        >
          <Icon as={FaWhatsapp} w={8} h={8} />
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="xs"
          bg={modalBg}
          color={modalColor}
          borderRadius="xl"
          boxShadow="xl"
          position="fixed"
          bottom="90px" // Position above the trigger button
          right="20px"
        >
          <ModalHeader fontWeight="bold" border="0">
            ¿Necesitas Ayuda?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3} align="start">
              <Text>
                Chatea con nosotros en WhatsApp para una cotización o consulta.
              </Text>
              <Button
                as={Link}
                href={whatsappLink}
                isExternal
                w="full"
                colorScheme="whatsapp"
                leftIcon={<Icon as={FaWhatsapp} />}
                onClick={onClose} // Close modal on click
              >
                Iniciar Chat
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FloatingWhatsApp;
