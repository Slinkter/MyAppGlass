"use client";

/**
 * @file AdminDialog.tsx
 * @description Marco único de los modales de administración sobre el `Dialog` del tema:
 * foco atrapado, Escape para cerrar, `aria-labelledby`, cierre con etiqueta en español,
 * velo `overlay` del tema y entrada con fundido + desplazamiento (transform/opacity).
 * Sustituye a los overlays hechos a mano con `position="fixed"`.
 */

import React from "react";
import { Box, Text, VisuallyHidden } from "@chakra-ui/react";
import { glassSurface } from "@/shared/constants/glass";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogCloseTrigger,
} from "@/components/ui/dialog";

export interface AdminDialogProps {
  /** Título visible (o solo para lectores de pantalla si `hideHeader`). */
  title: string;
  /** Etiqueta pequeña en mayúsculas sobre el título (lenguaje del mapa inmersivo). */
  eyebrow?: string;
  onClose: () => void;
  /** Ancho máximo en escritorio. */
  maxW?: string;
  /** Si se envía, el contenido se envuelve en un `<form>`. */
  onSubmit?: (e: React.FormEvent) => void;
  /** Oculta la cabecera visible (el documento trae la suya). El título sigue disponible para lectores de pantalla. */
  hideHeader?: boolean;
  /** Id para que el contenido pueda referenciarse (p. ej. impresión). */
  contentId?: string;
  children: React.ReactNode;
}

export const AdminDialog: React.FC<AdminDialogProps> = ({
  title,
  eyebrow,
  onClose,
  maxW = "520px",
  onSubmit,
  hideHeader = false,
  contentId,
  children,
}) => {
  const body = (
    <DialogBody p={hideHeader ? "0" : { base: "4", md: "6" }}>{children}</DialogBody>
  );

  return (
    <DialogRoot
      open
      onOpenChange={(details) => !details.open && onClose()}
      placement="center"
      scrollBehavior="outside"
      lazyMount
    >
      <DialogContent
        id={contentId}
        maxW={{ base: "calc(100% - var(--chakra-spacing-4))", md: maxW }}
        borderRadius="2xl"
        {...glassSurface}
        boxShadow="cardLift"
        p="0"
      >
        {hideHeader ? (
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
        ) : (
          <DialogHeader p={{ base: "4", md: "6" }} pb="0" display="flex" flexDirection="column" alignItems="flex-start" gap="1">
            {eyebrow && (
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="text.muted">
                {eyebrow}
              </Text>
            )}
            <DialogTitle as="h2" fontFamily="heading" fontSize={{ base: "lg", md: "xl" }} color="text.heading" pe="12">
              {title}
            </DialogTitle>
          </DialogHeader>
        )}
        <DialogCloseTrigger />
        {onSubmit ? (
          <Box as="form" onSubmit={onSubmit}>
            {body}
          </Box>
        ) : (
          body
        )}
      </DialogContent>
    </DialogRoot>
  );
};

export default AdminDialog;
