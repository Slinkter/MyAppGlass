"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  SimpleGrid,
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
import { TOUCH_MIN } from "@/shared/constants/layout";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../components";
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
    <ShowcaseStack>
      {/* 1. Visor de Galería Compuesta (Gallery.Viewer + Thumbnails) */}
      <ShowcaseCard
        title="Gallery Compuesta (Viewer + Thumbnails)"
        description="Componente real de producción (`shared/components/common/Gallery.tsx`) con visor fotográfico modal y tira interactiva de miniaturas."
        badge="shared/components/common"
      >
        <ShowcasePanel borderRadius="2xl" maxW="4xl" mx="auto" w="full" minW="0" overflow="hidden">
          <Gallery images={sampleGallery}>
            <Flex direction={{ base: "column", md: "row" }} gap="4" w="full" minW="0">
              <Box flex="1" minW="0" h={{ base: "220px", sm: "280px", md: "360px" }}>
                <Gallery.Viewer />
              </Box>
              <Box
                minW="0"
                w={{ base: "full", md: "100px" }}
                flexShrink={{ md: 0 }}
                h={{ base: "88px", md: "360px" }}
                overflow="hidden"
              >
                <Gallery.Thumbnails />
              </Box>
            </Flex>
          </Gallery>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 2. Modales Interactivos (Dialog de Chakra UI v3) */}
      <ShowcaseCard
        title="Dialog Modal (Chakra UI v3 Snippet)"
        description="Ventana modal accesible con backdrop-blur utilizada en formularios administrativos."
        badge="components/ui/dialog"
      >
        <VStack align="flex-start" gap="4">
          <Text fontSize="sm" color="text.muted">
            Haz clic en el botón inferior para abrir la simulación de modal interactivo:
          </Text>
          <Button
            variant="aura"
            minH={TOUCH_MIN}
            whiteSpace="normal"
            onClick={() => setIsDialogOpen(true)}
          >
            Abrir Modal de Demostración
          </Button>

          <DialogRoot open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
            <DialogContent
              bg="bg.surface"
              borderColor="border.default"
              borderRadius="modal"
              maxW="calc(100vw - 2rem)"
            >
              <DialogHeader>
                <DialogTitle>Especificaciones de Carpintería de Aluminio</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack align="flex-start" gap="3">
                  <Text fontSize="sm" color="text.body">
                    Este modal utiliza el componente accesible <strong>Dialog</strong> nativo de Chakra UI v3 con fondo oscurecido y soporte para tecla Escape.
                  </Text>
                  <ShowcasePanel p={{ base: "3", md: "5" }} bg="surface.container" borderRadius="lg" w="full">
                    <Text fontSize="xs" color="text.muted">
                      • Sistema: Serie 62<br />
                      • Vidrio: Templado · Color: Incoloro<br />
                      • Aluminio: Negro
                    </Text>
                  </ShowcasePanel>
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" minH={TOUCH_MIN} onClick={() => setIsDialogOpen(false)}>
                    Cerrar
                  </Button>
                </DialogActionTrigger>
                <Button variant="aura" minH={TOUCH_MIN} onClick={() => setIsDialogOpen(false)}>
                  Entendido
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </VStack>
      </ShowcaseCard>

      {/* 3. Feedback y Overlays: Tooltip, Drawer, Toast */}
      <ShowcaseCard
        title="Feedback y Overlays"
        description="Tooltip, Drawer y Toast: componentes de una sola acción."
      >
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4">
          <ShowcasePanel>
            <VStack align="flex-start" gap="3">
              <SubsectionLabel>Tooltip</SubsectionLabel>
              <Text fontSize="sm" color="text.muted">
                Ayuda contextual al pasar el cursor o enfocar con teclado.
              </Text>
              <Tooltip content="Serie 62 antirruido" showArrow positioning={{ placement: "top" }}>
                <IconButton
                  aria-label="Más información"
                  variant="ghost"
                  size={{ base: "md", md: "sm" }}
                  minH={{ base: TOUCH_MIN, md: "auto" }}
                  minW={{ base: TOUCH_MIN, md: "auto" }}
                >
                  <Info size={16} style={{ flexShrink: 0 }} />
                </IconButton>
              </Tooltip>
            </VStack>
          </ShowcasePanel>

          <ShowcasePanel>
            <VStack align="flex-start" gap="3">
              <SubsectionLabel>Drawer</SubsectionLabel>
              <Text fontSize="sm" color="text.muted">
                Panel lateral deslizable para detalles o filtros.
              </Text>
              <DrawerRoot placement="end" size={{ base: "full", md: "md" }}>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size={{ base: "md", md: "sm" }}
                    minH={{ base: TOUCH_MIN, md: "auto" }}
                    minW={{ base: TOUCH_MIN, md: "auto" }}
                  >
                    Abrir Drawer
                  </Button>
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
                    <Button variant="aura" minH={TOUCH_MIN}>Entendido</Button>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerRoot>
            </VStack>
          </ShowcasePanel>

          <ShowcasePanel>
            <VStack align="flex-start" gap="3">
              <SubsectionLabel>Toast</SubsectionLabel>
              <Text fontSize="sm" color="text.muted">
                Notificaciones efímeras con toaster.create.
              </Text>
              <Button
                variant="aura"
                minH={TOUCH_MIN}
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
            </VStack>
          </ShowcasePanel>
        </SimpleGrid>
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
