"use client";

import React from "react";
import { Box, Heading, Text, VStack, SimpleGrid, HStack } from "@chakra-ui/react";
import { CheckCircle2, MapPin, MessageCircle, Phone, Mail } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import AuraContainer from "@shared/components/aura/AuraContainer";
import AuraHeader from "@shared/components/aura/AuraHeader";
import AuraSurface from "@shared/components/aura/AuraSurface";
import { Button } from "@/components/ui/button";
import type { LocalLandingDistrito } from "../data/distritos";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
  "Hola, quisiera una cotización de vidriería y aluminio."
)}`;

interface LocalLandingViewProps {
  distrito: LocalLandingDistrito;
}

/**
 * Landing hiperlocal por distrito. Los datos de contacto provienen de `companyData` (NAP único).
 */
export default function LocalLandingView({ distrito }: LocalLandingViewProps) {
  return (
    <AuraContainer>
      <VStack gap={8} align="stretch" pb={12}>
        <AuraHeader
          title={`Vidriería y aluminio en ${distrito.nombre}`}
          overline="Atención por distrito"
          description={distrito.intro}
          headingAs="h1"
          mb={0}
        />

        <AuraSurface p={{ base: "4", md: "6" }} variant="glass">
          <VStack align="stretch" gap={4}>
            <Heading as="h2" size="md" color="text.heading" fontWeight="700">
              Servicios en {distrito.nombre}
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
              {distrito.servicios.map((servicio) => (
                <HStack key={servicio} gap="2" align="flex-start">
                  <Box color="text.accent" style={{ flexShrink: 0 }}>
                    <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  </Box>
                  <Text fontSize="sm" color="text.muted">
                    {servicio}
                  </Text>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </AuraSurface>

        <AuraSurface p={{ base: "4", md: "6" }} variant="glass">
          <VStack align="stretch" gap={4}>
            <Heading as="h2" size="md" color="text.heading" fontWeight="700">
              Contacto
            </Heading>
            <VStack align="stretch" gap={2}>
              <HStack gap="2" align="flex-start">
                <MapPin size={18} style={{ flexShrink: 0 }} />
                <Text fontSize="sm" color="text.muted">
                  {companyData.companyName} · {companyData.direccion}
                </Text>
              </HStack>
              <HStack gap="2">
                <Phone size={18} style={{ flexShrink: 0 }} />
                <Text fontSize="sm" color="text.muted">
                  WhatsApp {companyData.whatsappDisplay}
                </Text>
              </HStack>
              <HStack gap="2">
                <Mail size={18} style={{ flexShrink: 0 }} />
                <Text fontSize="sm" color="text.muted">
                  {companyData.contactEmail}
                </Text>
              </HStack>
            </VStack>
            <Button
              variant="whatsapp"
              size="lg"
              minH="11"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              transition="all 0.2s ease"
            >
              <MessageCircle size={18} style={{ flexShrink: 0 }} />
              Cotizar por WhatsApp
            </Button>
          </VStack>
        </AuraSurface>
      </VStack>
    </AuraContainer>
  );
}
