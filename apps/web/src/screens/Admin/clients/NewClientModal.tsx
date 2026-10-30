"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Input, SimpleGrid } from "@chakra-ui/react";
import { CheckCircle2, X } from "lucide-react";
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
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.75)"
      backdropFilter="blur(12px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
      p="4"
    >
              <Box
      as="form"
      onSubmit={onSubmit}
      bg="surface.card"
      p="7"
      borderRadius="2xl"
      maxW="520px"
      w="full"
      border="1px solid"
      borderColor="border.default"
      boxShadow="0 25px 50px rgba(0, 0, 0, 0.5)"
    >
      <HStack justify="space-between" mb="5">
        <Heading size="md" color="text.heading">
          Registrar Nuevo Cliente / Empresa
        </Heading>
        <Button size="xs" variant="ghost" onClick={() => onClose()}>
          <X size={18} />
        </Button>
      </HStack>

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
            bg={statusMessage.type === "success" ? "rgba(52, 211, 153, 0.1)" : "rgba(239, 68, 68, 0.1)"}
            color={statusMessage.type === "success" ? "#34d399" : "#f87171"}
            border={`1px solid ${statusMessage.type === "success" ? "rgba(52, 211, 153, 0.25)" : "rgba(239, 68, 68, 0.25)"}`}
            fontSize="xs"
          >
            {statusMessage.text}
          </Box>
        )}

        <HStack justify="end" gap="2" pt="2">
          <Button variant="outline" size="sm" borderRadius="xl" type="button" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button colorPalette="cyan" size="sm" borderRadius="xl" type="submit" loading={actionLoading}>
            <CheckCircle2 size={16} style={{ marginRight: 6 }} />
            Guardar Cliente
          </Button>
        </HStack>
      </VStack>
    </Box>
    </Box>
  );
};
