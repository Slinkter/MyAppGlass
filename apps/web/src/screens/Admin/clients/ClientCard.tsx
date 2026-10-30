"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Badge } from "@chakra-ui/react";
import { Phone, MapPin, Mail, ShoppingCart, MessageCircle } from "lucide-react";
import { ClientProfile } from "@/shared/schemas/ecommerce-schemas";

interface ClientCardProps {
  client: ClientProfile;
  onCreateSale: (client: ClientProfile) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client: c, onCreateSale }) => {
  const isCompany = c.dniRuc.length === 11;
  const whatsappUrl = `https://wa.me/51${c.phone.replace(/\D/g, "")}`;

  return (
      <Box
      p="6"
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(16px)"
      boxShadow="0 6px 24px rgba(0, 0, 0, 0.04)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="all 0.2s ease"
      _hover={{ borderColor: "rgba(56, 189, 248, 0.4)", transform: "translateY(-2px)" }}
    >
      <VStack align="start" gap="3">
        <HStack justify="space-between" w="full">
          <Badge
            variant="subtle"
            size="sm"
            borderRadius="md"
            bg={isCompany ? "rgba(167, 139, 250, 0.1)" : "rgba(56, 189, 248, 0.1)"}
            color={isCompany ? "#a78bfa" : "#38bdf8"}
          >
            {isCompany ? "Empresa / RUC" : "Persona Natural"}
          </Badge>
          <Text fontSize="2xs" color="text.muted" fontFamily="mono">
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
              <Phone size={14} color="#38bdf8" />
              <Text>{c.phone}</Text>
            </HStack>
            {c.phone && (
              <Button
                asChild
                size="2xs"
                variant="ghost"
                colorPalette="green"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={12} style={{ marginRight: 4 }} />
                  WhatsApp
                </a>
              </Button>
            )}
          </HStack>

          <HStack gap="2">
            <Mail size={14} color="#818cf8" />
            <Text truncate maxW="200px">{c.email}</Text>
          </HStack>
          <HStack gap="2">
            <MapPin size={14} color="#34d399" />
            <Text truncate maxW="220px">{c.address}</Text>
          </HStack>
        </VStack>
      </VStack>

      <Box pt="6" w="full">
        <Button
          colorPalette="cyan"
          variant="subtle"
          size="sm"
          borderRadius="xl"
          w="full"
          onClick={() => onCreateSale(c)}
        >
          <ShoppingCart size={14} style={{ marginRight: 6 }} />
          Emitir Venta a este Cliente
        </Button>
      </Box>
    </Box>
  );
};
