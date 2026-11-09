"use client";

import React from "react";
import { Box, Heading, VStack, SimpleGrid, Field, Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { FileCheck, Send } from "lucide-react";
import type { FieldErrors } from "@/features/presupuesto/schemas/quote-form-schema";
import type { QuoteCustomer } from "./types";

interface CustomerPanelProps {
  customer: QuoteCustomer;
  setCustomer: React.Dispatch<React.SetStateAction<QuoteCustomer>>;
  errors: FieldErrors;
  saving: boolean;
  onSubmit: () => void;
}

export const CustomerPanel: React.FC<CustomerPanelProps> = ({ customer, setCustomer, errors, saving, onSubmit }) => {
  const set = (patch: Partial<QuoteCustomer>) => setCustomer((prev) => ({ ...prev, ...patch }));

  return (
    <Box
      bg="surface.card"
      p={{ base: "4", md: "6" }}
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(12px)"
    >
      <Heading size="md" mb="6" display="flex" alignItems="center" gap="2">
        <FileCheck size={20} style={{ flexShrink: 0 }} /> 2. Tus datos de contacto
      </Heading>

      <VStack gap="4">
        <Field.Root required invalid={!!errors.fullName}>
          <Field.Label>Nombre completo / Razón social <Field.RequiredIndicator /></Field.Label>
          <Input
            autoComplete="name"
            placeholder="Ej. Arq. Carlos Mendoza"
            value={customer.fullName}
            onChange={(e) => set({ fullName: e.target.value })}
          />
          {errors.fullName && <Field.ErrorText>{errors.fullName}</Field.ErrorText>}
        </Field.Root>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" w="full">
          <Field.Root invalid={!!errors.dniRuc}>
            <Field.Label>DNI o RUC (opcional)</Field.Label>
            <Input
              inputMode="numeric"
              placeholder="8 u 11 dígitos"
              value={customer.dniRuc}
              onChange={(e) => set({ dniRuc: e.target.value })}
            />
            {errors.dniRuc && <Field.ErrorText>{errors.dniRuc}</Field.ErrorText>}
          </Field.Root>
          <Field.Root required invalid={!!errors.phone}>
            <Field.Label>Teléfono / WhatsApp <Field.RequiredIndicator /></Field.Label>
            <Input
              type="tel"
              autoComplete="tel"
              placeholder="Ej. 974 278 303"
              value={customer.phone}
              onChange={(e) => set({ phone: e.target.value })}
            />
            {errors.phone && <Field.ErrorText>{errors.phone}</Field.ErrorText>}
          </Field.Root>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" w="full">
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Correo electrónico (opcional)</Field.Label>
            <Input
              type="email"
              autoComplete="email"
              placeholder="cliente@ejemplo.com"
              value={customer.email}
              onChange={(e) => set({ email: e.target.value })}
            />
            {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
          </Field.Root>
          <Field.Root invalid={!!errors.district}>
            <Field.Label>Distrito (Lima)</Field.Label>
            <Input placeholder="Ej. La Molina" value={customer.district} onChange={(e) => set({ district: e.target.value })} />
            {errors.district && <Field.ErrorText>{errors.district}</Field.ErrorText>}
          </Field.Root>
        </SimpleGrid>

        <Field.Root invalid={!!errors.address}>
          <Field.Label>Dirección de instalación</Field.Label>
          <Input
            autoComplete="street-address"
            placeholder="Ej. Av. Los Fresnos 1214"
            value={customer.address}
            onChange={(e) => set({ address: e.target.value })}
          />
          {errors.address && <Field.ErrorText>{errors.address}</Field.ErrorText>}
        </Field.Root>

        <Button variant="aura" size="lg" w="full" minH="11" mt="2" loading={saving} onClick={onSubmit}>
          <Send size={20} style={{ flexShrink: 0 }} /> Enviar solicitud de presupuesto
        </Button>
      </VStack>
    </Box>
  );
};
