"use client";

import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  Badge,
} from "@chakra-ui/react";
import Gallery from "@/shared/components/common/Gallery";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
} from "@/components/ui/dialog";

export const OverlaysShowcase: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sampleGallery = [
    {
      id: "gal-1",
      src: "/images/services-products-01.Ventanas-nova-a10.webp",
      title: "Ventana Corrediza Sistema Nova",
    },
    {
      id: "gal-2",
      src: "/images/services-products-02.Mampara-save-mampara01.webp",
      title: "Mampara de Cristal Templado",
    },
    {
      id: "gal-3",
      src: "/images/services-products-03.Ducha-ducha01.webp",
      title: "Ducha de Acero Inoxidable",
    },
  ];

  return (
    <VStack gap="8" align="stretch">
      {/* 1. Visor de Galería Compuesta (Gallery.Viewer + Thumbnails) */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">Gallery Compuesta (Viewer + Thumbnails)</Card.Title>
              <Card.Description>
                Componente real de producción (`shared/components/common/Gallery.tsx`) con visor fotográfico modal y tira interactiva de miniaturas.
              </Card.Description>
            </Box>
            <Badge colorPalette="blue" px="3" py="1" borderRadius="full">shared/components/common</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Box
            p={{ base: "2", md: "4" }}
            bg="bg.page"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border.subtle"
            maxW="4xl"
            mx="auto"
          >
            <Gallery images={sampleGallery}>
              <VStack gap="4" w="full">
                <Box h={{ base: "260px", sm: "320px", md: "400px" }} w="full">
                  <Gallery.Viewer />
                </Box>
                <Gallery.Thumbnails />
              </VStack>
            </Gallery>
          </Box>
        </Card.Body>
      </Card.Root>

      {/* 2. Modales Interactivos (Dialog de Chakra UI v3) */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">Dialog Modal (Chakra UI v3 Snippet)</Card.Title>
              <Card.Description>
                Ventana modal accesible con backdrop-blur utilizada en formularios administrativos.
              </Card.Description>
            </Box>
            <Badge colorPalette="purple" px="3" py="1" borderRadius="full">components/ui/dialog</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <VStack align="flex-start" gap="4">
            <Text fontSize="sm" color="text.muted">
              Haz clic en el botón inferior para abrir la simulación de modal interactivo:
            </Text>
            <Button
              colorPalette="blue"
              onClick={() => setIsDialogOpen(true)}
            >
              Abrir Modal de Demostración
            </Button>

            <DialogRoot open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
              <DialogContent bg="bg.surface" borderColor="border.default" borderRadius="modal">
                <DialogHeader>
                  <DialogTitle>Especificaciones de Carpintería de Aluminio</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <VStack align="flex-start" gap="3">
                    <Text fontSize="sm" color="text.body">
                      Este modal utiliza el componente accesible <strong>Dialog</strong> nativo de Chakra UI v3 con fondo oscurecido y soporte para tecla Escape.
                    </Text>
                    <Box p="3" bg="surface.container" borderRadius="lg" borderWidth="1px" borderColor="border.subtle" w="full">
                      <Text fontSize="xs" color="text.muted">
                        • Sistema: Serie 62 Antirruido<br />
                        • Vidrio: DVH Templado 6mm + Cámara 12mm + Laminado 4+4mm<br />
                        • Acabado: Perfilería anodizada negra mate
                      </Text>
                    </Box>
                  </VStack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline" borderColor="border.default" onClick={() => setIsDialogOpen(false)}>
                      Cerrar
                    </Button>
                  </DialogActionTrigger>
                  <Button colorPalette="blue" onClick={() => setIsDialogOpen(false)}>
                    Entendido
                  </Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
