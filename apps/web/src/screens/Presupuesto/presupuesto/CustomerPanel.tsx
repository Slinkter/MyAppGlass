"use client";

import React from "react";
import { Box, Heading, VStack, SimpleGrid, Field, Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { FileCheck, Printer } from "lucide-react";
import type { QuoteCustomer } from "./types";

interface CustomerPanelProps {
  customer: QuoteCustomer;
  setCustomer: React.Dispatch<React.SetStateAction<QuoteCustomer>>;
  onPrint: () => void;
}

export const CustomerPanel: React.FC<CustomerPanelProps> = ({ customer, setCustomer, onPrint }) => {
  return (
    <Box
      bg="surface.card"
      p="6"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(12px)"
    >
      <Heading size="md" mb="6" display="flex" alignItems="center" gap="2">
        <FileCheck size={20} /> Datos para la Hoja Membretada
      </Heading>

      <VStack gap="4">
        <Field.Root>
          <Field.Label>Nombre Completo / Razón Social</Field.Label>
          <Input
            placeholder="Ej. Arq. Carlos Mendoza"
            value={customer.fullName}
            onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
          />
        </Field.Root>

        <SimpleGrid columns={2} gap="4" w="full">
          <Field.Root>
            <Field.Label>DNI o RUC</Field.Label>
            <Input
              placeholder="8 u 11 dígitos"
              value={customer.dniRuc}
              onChange={(e) => setCustomer({ ...customer, dniRuc: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Teléfono / WhatsApp</Field.Label>
            <Input
              placeholder="Ej. 974278303"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
          </Field.Root>
        </SimpleGrid>

        <SimpleGrid columns={2} gap="4" w="full">
          <Field.Root>
            <Field.Label>Correo Electrónico</Field.Label>
            <Input
              placeholder="cliente@ejemplo.com"
              type="email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Distrito (Lima)</Field.Label>
            <Input
              placeholder="Ej. La Molina"
              value={customer.district}
              onChange={(e) => setCustomer({ ...customer, district: e.target.value })}
            />
          </Field.Root>
        </SimpleGrid>

        <Field.Root>
          <Field.Label>Dirección de Instalación</Field.Label>
          <Input
            placeholder="Ej. Av. Los Fresnos 1214"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
        </Field.Root>

        <Button
          colorPalette="blue"
          size="lg"
          w="full"
          mt="2"
          onClick={onPrint}
          display="flex"
          alignItems="center"
          gap="2"
        >
          <Printer size={20} /> Generar e Imprimir Presupuesto Oficial (PDF)
        </Button>
      </VStack>
    </Box>
  );
};
