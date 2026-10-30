"use client";

import React from "react";
import { Box, VStack, HStack, Text, Button, Spinner } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface FormModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  maxW: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  formError: string | null;
  loading: boolean;
  colorPalette: string;
  submitLabel: string;
  children: React.ReactNode;
}

/** Estructura común (diálogo, cabecera, error, pie con acciones) de los modales de admin. */
export const FormModalShell: React.FC<FormModalShellProps> = ({
  isOpen,
  onClose,
  onSubmit,
  maxW,
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  formError,
  loading,
  colorPalette,
  submitLabel,
  children,
}) => (
  <DialogRoot
    open={isOpen}
    onOpenChange={(details) => !details.open && onClose()}
    size="xl"
    scrollBehavior="inside"
  >
    <DialogContent maxW={{ base: "95vw", md: maxW }} borderRadius="2xl" p="0" overflow="hidden">
      <form onSubmit={onSubmit}>
        <DialogHeader p="5" borderBottom="1px solid" borderColor="border.default" bg="bg.subtle">
          <HStack justify="space-between">
            <HStack gap="2.5">
              <Box p="2" borderRadius="lg" bg={iconBg} color={iconColor}>
                {icon}
              </Box>
              <VStack align="start" gap="0">
                <DialogTitle fontSize="lg" fontWeight="bold">
                  {title}
                </DialogTitle>
                <Text fontSize="xs" color="text.muted">
                  {subtitle}
                </Text>
              </VStack>
            </HStack>
            <DialogCloseTrigger />
          </HStack>
        </DialogHeader>

        <DialogBody p="6">
          <VStack gap="5" align="stretch">
            {formError && (
              <Box
                p="3"
                borderRadius="lg"
                bg="status.dangerSoft"
                border="1px solid"
                borderColor="red.500"
                color="red.500"
                fontSize="sm"
              >
                {formError}
              </Box>
            )}
            {children}
          </VStack>
        </DialogBody>

        <DialogFooter p="5" borderTop="1px solid" borderColor="border.default" bg="bg.subtle">
          <HStack justify="flex-end" gap="3">
            <Button variant="outline" borderColor="border.default" onClick={onClose} disabled={loading} type="button">
              Cancelar
            </Button>
            <Button colorPalette={colorPalette} type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="xs" />
                  Guardando...
                </>
              ) : (
                <>
                  <Sparkles size={16} style={{ flexShrink: 0 }} />
                  {submitLabel}
                </>
              )}
            </Button>
          </HStack>
        </DialogFooter>
      </form>
    </DialogContent>
  </DialogRoot>
);
