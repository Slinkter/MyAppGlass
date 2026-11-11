"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Badge } from "@chakra-ui/react";
import { Phone, MapPin, Mail, ShoppingCart, MessageCircle } from "lucide-react";
import { ClientProfile } from "@/entities/client/model";

interface ClientCardProps {
  client: ClientProfile;
  onCreateSale: (client: ClientProfile) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client: c, onCreateSale }) => {
  const isCompany = c.dniRuc.length === 11;
  const whatsappUrl = `https://wa.me/51${c.phone.replace(/\D/g, "")}`;

  return (
      <Box
      p={{ base: "4", md: "6" }}
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(16px)"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="transform 0.2s ease, border-color 0.2s ease"
      _hover={{ borderColor: "border.strong" }}
    >
      <VStack align="start" gap="3">
        <HStack justify="space-between" w="full">
          <Badge
            variant="subtle"
            size="sm"
            borderRadius="md"
            bg={isCompany ? "bg.tint" : "var(--chakra-colors-status-info-soft)"}
            color={isCompany ? "var(--chakra-colors-accent-violet-soft)" : "var(--chakra-colors-status-info)"}
          >
            {isCompany ? "Empresa / RUC" : "Persona Natural"}
          </Badge>
          <Text fontSize="xs" color="text.muted" fontFamily="mono">
            {c.dniRuc}
          </Text>
        </HStack>

        <VStack align="start" gap="0">
          <Heading size="md" color="text.heading">
            {c.fullName}
          </Heading>
          <Text fontSize="xs" color="text.muted">
            {c.district}
          </Text>
        </VStack>

        <VStack align="start" gap="2" pt="2" fontSize="xs" color="text.muted" w="full">
          <HStack justify="space-between" w="full">
            <HStack gap="2">
              <Phone size={14} style={{ flexShrink: 0 }} color="var(--chakra-colors-status-info)" />
              <Text>{c.phone}</Text>
            </HStack>
            {c.phone && (
              <Button
                asChild
                size="2xs"
                variant="ghost"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                  WhatsApp
                </a>
              </Button>
            )}
          </HStack>

          <HStack gap="2">
            <Mail size={14} style={{ flexShrink: 0 }} color="text.muted" />
            <Text truncate maxW="12.5rem">{c.email}</Text>
          </HStack>
          <HStack gap="2">
            <MapPin size={14} style={{ flexShrink: 0 }} color="var(--chakra-colors-status-success)" />
            <Text truncate maxW="13.75rem">{c.address}</Text>
          </HStack>
        </VStack>
      </VStack>

      <Box pt="6" w="full">
        <Button
          variant="subtle"
          size="sm"
          borderRadius="xl"
          w="full"
          onClick={() => onCreateSale(c)}
        >
          <ShoppingCart size={14} style={{ flexShrink: 0, marginRight: 6 }} />
          Emitir Venta a este Cliente
        </Button>
      </Box>
    </Box>
  );
};
