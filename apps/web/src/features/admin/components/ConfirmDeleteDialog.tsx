"use client";

import React from "react";
import { Box, VStack, HStack, Text, Spinner } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@/shared/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";

export interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Eliminar definitivamente",
  cancelLabel = "Cancelar",
  loading = false,
}) => {
  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => !details.open && !loading && onClose()}
      placement="center"
      scrollBehavior="inside"
    >
      <DialogContent maxW={{ base: "calc(100% - var(--chakra-spacing-4))", sm: "480px" }} borderRadius="2xl" p="0" overflow="hidden">
        <DialogHeader p={{ base: "4", md: "5" }} borderBottom="1px solid" borderColor="border.subtle" bg="bg.subtle">
          <HStack justify="space-between" align="center">
            <HStack gap="2.5">
              <Box p="2" borderRadius="lg" bg="status.dangerSoft" color="status.dangerText">
                <AlertTriangle size={20} style={{ flexShrink: 0 }} />
              </Box>
              <DialogTitle fontSize="md" fontWeight="bold" color="text.heading">
                {title}
              </DialogTitle>
            </HStack>
            {!loading && <DialogCloseTrigger />}
          </HStack>
        </DialogHeader>

        <DialogBody p={{ base: "4", md: "6" }}>
          <VStack gap="3" align="start">
            <Text fontSize="sm" color="text.muted">
              {description}
            </Text>
            <Text fontSize="xs" color="text.muted" fontWeight="semibold">
              Esta acción no se puede deshacer.
            </Text>
          </VStack>
        </DialogBody>

        <DialogFooter p={{ base: "3", md: "4" }} borderTop="1px solid" borderColor="border.subtle" bg="bg.subtle">
          <HStack justify="flex-end" gap="3" w="full">
            <Button
              variant="outline"
              borderColor="border.default"
              onClick={onClose}
              disabled={loading}
              type="button"
            >
              {cancelLabel}
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              disabled={loading}
              type="button"
            >
              {loading ? (
                <>
                  <Spinner size="xs" />
                  Eliminando...
                </>
              ) : (
                <>
                  <Trash2 size={16} style={{ flexShrink: 0 }} />
                  {confirmLabel}
                </>
              )}
            </Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
