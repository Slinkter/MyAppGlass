"use client";

import React from "react";
import { Box, VStack, HStack, Text, Button, Input, SimpleGrid } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { AdminDialog } from "@/features/admin/components/form/AdminDialog";
import type { NewClientForm } from "./newClientForm";

interface NewClientModalProps {
  newClient: NewClientForm;
  onChange: (value: NewClientForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  actionLoading: boolean;
  statusMessage: { type: "success" | "error"; text: string } | null;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  newClient,
  onChange,
  onSubmit,
  onClose,
  actionLoading,
  statusMessage,
}) => {
  return (
    <AdminDialog title="Registrar nuevo cliente o empresa" maxW="520px" onClose={onClose} onSubmit={onSubmit}>

      <VStack align="stretch" gap="3.5">
        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            Nombre Completo / Razón Social: *
          </Text>
          <Input
            required
            borderRadius="xl"
            placeholder="ej. Constructora Los Fresnos S.A.C."
            value={newClient.fullName}
            onChange={(e) => onChange({ ...newClient, fullName: e.target.value })}
          />
        </VStack>

        <SimpleGrid columns={2} gap="3">
          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="bold" color="text.heading">
              DNI o RUC: *
            </Text>
            <Input
              required
              borderRadius="xl"
              placeholder="8 u 11 dígitos"
              value={newClient.dniRuc}
              onChange={(e) => onChange({ ...newClient, dniRuc: e.target.value })}
            />
          </VStack>

          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="bold" color="text.heading">
              Teléfono Celular: *
            </Text>
            <Input
              required
              borderRadius="xl"
              placeholder="974278303"
              value={newClient.phone}
              onChange={(e) => onChange({ ...newClient, phone: e.target.value })}
            />
          </VStack>
        </SimpleGrid>

        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            Correo Electrónico:
          </Text>
          <Input
            type="email"
            borderRadius="xl"
            placeholder="contacto@empresa.com"
            value={newClient.email}
            onChange={(e) => onChange({ ...newClient, email: e.target.value })}
          />
        </VStack>

        <SimpleGrid columns={2} gap="3">
          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="bold" color="text.heading">
              Dirección: *
            </Text>
            <Input
              required
              borderRadius="xl"
              placeholder="Av. Los Fresnos 1214"
              value={newClient.address}
              onChange={(e) => onChange({ ...newClient, address: e.target.value })}
            />
          </VStack>

          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="bold" color="text.heading">
              Distrito: *
            </Text>
            <Input
              required
              borderRadius="xl"
              placeholder="La Molina"
              value={newClient.district}
              onChange={(e) => onChange({ ...newClient, district: e.target.value })}
            />
          </VStack>
        </SimpleGrid>

        {statusMessage && (
          <Box
            p="3"
            borderRadius="xl"
            bg={statusMessage.type === "success" ? "status.successSoft" : "status.dangerSoft"}
            color={statusMessage.type === "success" ? "status.successText" : "status.dangerText"}
            border="1px solid"
            borderColor={statusMessage.type === "success" ? "status.successBorder" : "status.dangerBorder"}
            fontSize="xs"
          >
            {statusMessage.text}
          </Box>
        )}

        <HStack justify="end" gap="2" pt="2" wrap="wrap">
          <Button variant="outline" size="sm" borderRadius="xl" flex={{ base: "1 1 100%", sm: "0 0 auto" }} type="button" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button size="sm" borderRadius="xl" flex={{ base: "1 1 100%", sm: "0 0 auto" }} type="submit" loading={actionLoading}>
            <CheckCircle2 size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            Guardar Cliente
          </Button>
        </HStack>
      </VStack>
    </AdminDialog>
  );
};
