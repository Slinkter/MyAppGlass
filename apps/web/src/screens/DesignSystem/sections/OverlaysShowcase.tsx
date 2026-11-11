"use client";

import React from "react";
import {
  IconButton,
  List,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Info } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  DrawerActionTrigger,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Tooltip } from "@/shared/ui/tooltip";
import { toaster } from "@/shared/ui/toaster-instance";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../components";

const specs = [
  "Sistema: Serie 62",
  "Vidrio: Templado · Color: Incoloro",
  "Aluminio: Negro",
];

export const OverlaysShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* Modales interactivos (Dialog de Chakra UI v3) */}
      <ShowcaseCard
        title="Dialog Modal (Chakra UI v3 Snippet)"
        description="Ventana modal accesible, de esquina de 24 px, usada en formularios administrativos."
        badge="shared/ui/dialog"
      >
        <VStack align="flex-start" gap="4">
          <Text fontSize="sm" color="text.muted">
            Haz clic en el botón inferior para abrir la simulación de modal interactivo:
          </Text>

          <DialogRoot lazyMount size="md" placement="center" motionPreset="slide-in-bottom">
            <DialogTrigger asChild>
              <Button variant="primary" minH={TOUCH_MIN} whiteSpace="normal">
                Abrir Modal de Demostración
              </Button>
            </DialogTrigger>
            <DialogContent
              bg="bg.surface"
              borderColor="border.default"
              borderRadius="modal"
              
              aria-labelledby="dialog-aluminum-specs-title"
            >
              <DialogHeader>
                <DialogTitle id="dialog-aluminum-specs-title">
                  Especificaciones de Carpintería de Aluminio
                </DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack align="flex-start" gap="3">
                  <DialogDescription>
                    <Text as="span" fontSize="sm" color="text.body">
                      Este modal usa el componente <strong>Dialog</strong> de Chakra UI v3 con fondo oscurecido y cierre con la tecla Escape.
                    </Text>
                  </DialogDescription>
                  <ShowcasePanel p={{ base: "3", md: "5" }} bg="surface.container" borderRadius="lg" w="full">
                    <List.Root as="ul" gap="1" fontSize="xs" color="text.muted" listStyleType="disc" pl="4">
                      {specs.map((spec) => (
                        <List.Item key={spec}>{spec}</List.Item>
                      ))}
                    </List.Root>
                  </ShowcasePanel>
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" minH={TOUCH_MIN}>
                    Cerrar
                  </Button>
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                  <Button variant="primary" minH={TOUCH_MIN}>
                    Entendido
                  </Button>
                </DialogActionTrigger>
              </DialogFooter>
              <DialogCloseTrigger aria-label="Cerrar ventana modal" />
            </DialogContent>
          </DialogRoot>
        </VStack>
      </ShowcaseCard>

      {/* 3. Feedback y Overlays: Tooltip, Drawer, Toast */}
      <ShowcaseCard
        title="Feedback y Overlays"
        description="Tooltip, Drawer y Toast: componentes de una sola acción."
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          <ShowcasePanel>
            <VStack align="flex-start" gap="3">
              <SubsectionLabel>Tooltip</SubsectionLabel>
              <Text fontSize="sm" color="text.muted">
                Ayuda contextual al pasar el cursor o enfocar con teclado.
              </Text>
              <Tooltip
                content="Serie 62 antirruido"
                showArrow
                openDelay={200}
                positioning={{ placement: "top" }}
              >
                <IconButton
                  aria-label="Más información"
                  variant="ghost"
                  size="md"
                  minW={TOUCH_MIN}
                  minH={TOUCH_MIN}
                >
                  <Info size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
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
              <DrawerRoot lazyMount unmountOnExit placement="end" size="md">
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="md"
                    minW={TOUCH_MIN}
                    minH={TOUCH_MIN}
                  >
                    Abrir Drawer
                  </Button>
                </DrawerTrigger>
                <DrawerContent aria-labelledby="drawer-system-detail-title">
                  <DrawerCloseTrigger aria-label="Cerrar panel lateral" />
                  <DrawerHeader>
                    <DrawerTitle id="drawer-system-detail-title">Detalle del sistema</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <Text fontSize="sm" color="text.body">
                      Sistema: Serie 62 · Vidrio: Templado · Color: Incoloro · Aluminio: Negro
                    </Text>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerActionTrigger asChild>
                      <Button variant="primary" minH={TOUCH_MIN}>
                        Entendido
                      </Button>
                    </DrawerActionTrigger>
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
                variant="primary"
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
