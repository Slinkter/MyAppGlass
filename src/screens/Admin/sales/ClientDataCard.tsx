"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Input, SimpleGrid } from "@chakra-ui/react";
import { UserCheck } from "lucide-react";
import type { ClientForm } from "./types";

interface ClientDataCardProps {
  clientForm: ClientForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ClientDataCard: React.FC<ClientDataCardProps> = ({ clientForm, onChange }) => {
  return (
    <Box
      p="6"
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(16px)"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
    >
      <HStack mb="4" gap="2.5">
        <Box p="2" borderRadius="lg" bg="rgba(56, 189, 248, 0.1)" color="#38bdf8">
          <UserCheck size={18} />
        </Box>
        <Heading size="md" color="text.heading">
          1. Datos del Cliente / Empresa
        </Heading>
      </HStack>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3.5">
        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            Nombre / Razón Social: *
          </Text>
          <Input
            required
            borderRadius="xl"
            name="name"
            placeholder="ej. Constructora Los Fresnos S.A.C."
            value={clientForm.name}
            onChange={onChange}
          />
        </VStack>

        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            DNI o RUC:
          </Text>
          <Input
            borderRadius="xl"
            name="dniRuc"
            placeholder="ej. 20601542407"
            value={clientForm.dniRuc}
            onChange={onChange}
          />
        </VStack>

        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            Teléfono / Celular:
          </Text>
          <Input
            borderRadius="xl"
            name="phone"
            placeholder="ej. 974 278 303"
            value={clientForm.phone}
            onChange={onChange}
          />
        </VStack>

        <VStack align="start" gap="1">
          <Text fontSize="xs" fontWeight="bold" color="text.heading">
            Distrito de Entrega:
          </Text>
          <Input
            borderRadius="xl"
            name="district"
            placeholder="ej. La Molina, Surco..."
            value={clientForm.district}
            onChange={onChange}
          />
        </VStack>
      </SimpleGrid>
    </Box>
  );
};
