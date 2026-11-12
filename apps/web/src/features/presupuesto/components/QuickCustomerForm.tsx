"use client";

import React, { useState } from "react";
import { Box, VStack, Heading, Text, Input, Checkbox, HStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { QUOTE_TEXTS } from "./quoteTexts";
import { validateQuickCustomer, type FieldErrors } from "../schemas/quote-form-schema";
import Link from "next/link";

export interface QuickCustomerFormProps {
  initialValues?: { fullName?: string; phone?: string };
  onSubmit: (data: { fullName: string; phone: string; acceptsPrivacy: true }) => Promise<void> | void;
  onCancel?: () => void;
  loading?: boolean;
}

export const QuickCustomerForm: React.FC<QuickCustomerFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [fullName, setFullName] = useState(initialValues?.fullName || "");
  const [phone, setPhone] = useState(initialValues?.phone || "");
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const closing = QUOTE_TEXTS.closing;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      fullName,
      phone,
      acceptsPrivacy: acceptsPrivacy as true,
    };
    const fieldErrors = validateQuickCustomer(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length === 0) {
      onSubmit(data);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="bg.panel"
      p={{ base: "4", sm: "6" }}
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.subtle"
      maxW="560px"
      w="100%"
      mx="auto"
    >
      <VStack gap="5" align="stretch">
        <VStack gap="1" align="start">
          <Heading as="h2" size="lg" color="text.heading">
            {closing.title}
          </Heading>
          <Text fontSize="sm" color="text.muted">
            {closing.lead}
          </Text>
        </VStack>

        <VStack gap="3" align="stretch">
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb="1" color="text.heading">
              {closing.name.label}
            </Text>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={closing.name.placeholder}
              disabled={loading}
              borderColor={errors.fullName ? "status.danger" : "border.subtle"}
            />
            {errors.fullName && (
              <Text fontSize="xs" color="status.danger" mt="1">
                {errors.fullName}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb="1" color="text.heading">
              {closing.phone.label}
            </Text>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={closing.phone.placeholder}
              disabled={loading}
              borderColor={errors.phone ? "status.danger" : "border.subtle"}
            />
            {errors.phone && (
              <Text fontSize="xs" color="status.danger" mt="1">
                {errors.phone}
              </Text>
            )}
          </Box>

          <Box pt="2">
            <HStack align="flex-start" gap="2.5">
              <Checkbox.Root
                checked={acceptsPrivacy}
                onCheckedChange={(details) => setAcceptsPrivacy(Boolean(details.checked))}
                disabled={loading}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
              <Text fontSize="xs" color="text.muted" lineHeight="tall">
                {closing.acceptance.before}
                <Link
                  href="/politicas-empresa"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "var(--chakra-colors-brand-primary)" }}
                >
                  {closing.acceptance.link}
                </Link>
                {closing.acceptance.after}
              </Text>
            </HStack>
            {errors.acceptsPrivacy && (
              <Text fontSize="xs" color="status.danger" mt="1">
                {errors.acceptsPrivacy}
              </Text>
            )}
          </Box>
        </VStack>

        <HStack justify="flex-end" gap="3" pt="4" borderTop="1px solid" borderColor="border.subtle">
          {onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel} disabled={loading} type="button">
              Volver al carrito
            </Button>
          )}
          <Button size="sm" type="submit" loading={loading} variant="primary">
            {loading ? closing.saving : closing.button}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
