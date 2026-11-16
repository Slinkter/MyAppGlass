"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Badge } from "@chakra-ui/react";
import { Phone, MapPin, Mail, ShoppingCart, MessageCircle, Pencil, Power, FileText, UserRound } from "lucide-react";
import { ClientProfile } from "@/entities/client/model";

interface ClientCardProps {
  client: ClientProfile;
  onCreateSale: (client: ClientProfile) => void;
  onCreateBudget?: (client: ClientProfile) => void;
  onEdit?: (client: ClientProfile) => void;
  onToggleActive?: (client: ClientProfile) => void;
}

// Correo de relleno que generaba el panel anterior cuando el cliente no tenía correo.
const PLACEHOLDER_EMAIL = /^cliente_\d+@gyacompany\.com$/i;

export const ClientCard: React.FC<ClientCardProps> = ({ client: c, onCreateSale, onCreateBudget, onEdit, onToggleActive }) => {
  const isCompany = c.dniRuc.length === 11;
  const isInactive = c.isActive === false;
  const email = c.email && !PLACEHOLDER_EMAIL.test(c.email) ? c.email : "";
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
      opacity={isInactive ? 0.7 : 1}
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
          {isInactive && (
            <Badge mt="1" bg="status.warningSoft" color="var(--chakra-colors-status-warning)" fontSize="xs" px="1.5" borderRadius="sm">
              Inactivo: no se le cotiza
            </Badge>
          )}
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

          {c.contactName && (
            <HStack gap="2">
              <UserRound size={14} style={{ flexShrink: 0 }} />
              <Text truncate maxW="13.75rem">{c.contactName}</Text>
            </HStack>
          )}
          {email && (
            <HStack gap="2">
              <Mail size={14} style={{ flexShrink: 0 }} />
              <Text truncate maxW="12.5rem">{email}</Text>
            </HStack>
          )}
          <HStack gap="2">
            <MapPin size={14} style={{ flexShrink: 0 }} color="var(--chakra-colors-status-success)" />
            <Text truncate maxW="13.75rem">{c.address}</Text>
          </HStack>
        </VStack>
      </VStack>

      <VStack pt="6" w="full" gap="2" align="stretch">
        {onCreateBudget && (
          <Button size="sm" borderRadius="xl" w="full" minH="11" disabled={isInactive} onClick={() => onCreateBudget(c)}>
            <FileText size={14} style={{ flexShrink: 0, marginRight: 6 }} />
            Armar presupuesto
          </Button>
        )}
        <Button variant="subtle" size="sm" borderRadius="xl" w="full" minH="11" onClick={() => onCreateSale(c)}>
          <ShoppingCart size={14} style={{ flexShrink: 0, marginRight: 6 }} />
          Emitir Venta a este Cliente
        </Button>
        {(onEdit || onToggleActive) && (
          <HStack gap="2">
            {onEdit && (
              <Button variant="outline" size="sm" borderRadius="xl" flex="1" minH="11" onClick={() => onEdit(c)}>
                <Pencil size={14} style={{ flexShrink: 0, marginRight: 6 }} />
                Editar
              </Button>
            )}
            {onToggleActive && (
              <Button variant="outline" size="sm" borderRadius="xl" flex="1" minH="11" onClick={() => onToggleActive(c)}>
                <Power size={14} style={{ flexShrink: 0, marginRight: 6 }} />
                {isInactive ? "Activar" : "Desactivar"}
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};
