"use client";

import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerCloseTrigger,
} from "@/components/ui/drawer";
import { toaster } from "@/components/ui/toaster-instance";
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
      title: "Ducha de Vidrio Templado",
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
            <Badge colorPalette="gray" px="3" py="1" borderRadius="full">shared/components/common</Badge>
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
              variant="aura"
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
                        • Sistema: Serie 62<br />
                        • Vidrio: Templado · Color: Incoloro<br />
                        • Aluminio: Negro
                      </Text>
                    </Box>
                  </VStack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cerrar
                    </Button>
                  </DialogActionTrigger>
                  <Button variant="aura" onClick={() => setIsDialogOpen(false)}>
                    Entendido
                  </Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* 3. Tooltip */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">Tooltip</Card.Title>
              <Card.Description>
                Ayuda contextual accesible al pasar el cursor o enfocar con teclado.
              </Card.Description>
            </Box>
            <Badge colorPalette="gray" px="3" py="1" borderRadius="full">components/ui/tooltip</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Tooltip content="Serie 62 antirruido" showArrow positioning={{ placement: "top" }}>
            <IconButton aria-label="Más información" variant="ghost" size="sm">
              <Info size={16} style={{ flexShrink: 0 }} />
            </IconButton>
          </Tooltip>
        </Card.Body>
      </Card.Root>

      {/* 4. Drawer */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">Drawer</Card.Title>
              <Card.Description>
                Panel lateral deslizable para detalles o filtros sin abandonar la página.
              </Card.Description>
            </Box>
            <Badge colorPalette="gray" px="3" py="1" borderRadius="full">components/ui/drawer</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <DrawerRoot placement="end" size="md">
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">Abrir Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerCloseTrigger />
              <DrawerHeader>
                <DrawerTitle>Detalle del sistema</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <Text fontSize="sm" color="text.body">
                  Sistema: Serie 62 · Vidrio: Templado · Color: Incoloro · Aluminio: Negro
                </Text>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="aura">Entendido</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerRoot>
        </Card.Body>
      </Card.Root>

      {/* 5. Toast */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">Toast</Card.Title>
              <Card.Description>
                Notificaciones efímeras disparadas con toaster.create.
              </Card.Description>
            </Box>
            <Badge colorPalette="gray" px="3" py="1" borderRadius="full">components/ui/toaster-instance</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Button
            variant="aura"
            onClick={() =>
              toaster.create({
                title: "Cotización enviada",
                description: "Te contactaremos a la brevedad.",
                type: "success",
                closable: true,
              })
            }
          >
            Mostrar Toast
          </Button>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
