"use client";

import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
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
import { AlertTriangle } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
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
            <DialogCloseTrigger />
          </HStack>
        </DialogHeader>

        <DialogBody p={{ base: "4", md: "6" }}>
          <Text fontSize="sm" color="text.muted" lineHeight="tall">
            {description}
          </Text>
        </DialogBody>

        <DialogFooter p={{ base: "4", md: "5" }} borderTop="1px solid" borderColor="border.subtle" bg="bg.subtle" gap="3">
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            loading={loading}
            bg="status.danger"
            color="white"
            _hover={{ bg: "status.dangerHover" }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
