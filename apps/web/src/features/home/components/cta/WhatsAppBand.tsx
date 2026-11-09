"use client";

/**
 * @file WhatsAppBand.tsx
 * @description Banda de llamada a la acción entre secciones: una sola acción primaria (botón negro)
 * y una secundaria (borde). Número y mensaje desde `companyData`. Vidrio claro sobre fotografía.
 */

import React from "react";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import RouterLink from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";
import { glassLightOnPhoto } from "@/shared/constants/glass";
import { Reveal } from "@shared/components/motion/Reveal";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

export const WhatsAppBand: React.FC = () => (
  <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }}>
    <Reveal>
      <Box
        position="relative"
        overflow="hidden"
        borderRadius={{ base: "2xl", md: "3xl" }}
        bg="gray.900"
        minH={{ base: "340px", md: "300px" }}
      >
        <Image
          src="/images/services-general-init03.webp"
          alt="Box de ducha en vidrio templado instalado"
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          style={{ objectFit: "cover" }}
        />
        <Flex
          position="relative"
          zIndex={1}
          minH={{ base: "340px", md: "300px" }}
          align={{ base: "flex-end", md: "center" }}
          p={{ base: "3", md: "8" }}
        >
          <Box
            w="full"
            maxW={{ md: "480px" }}
            p={{ base: "5", md: "6" }}
            borderRadius="2xl"
            color="gray.900"
            boxShadow="xl"
            {...glassLightOnPhoto}
          >
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="gray.700" mb="2">
              Presupuesto rápido
            </Text>
            <Heading as="h2" fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1.1" mb="3">
              Cuéntanos qué necesitas y te respondemos por WhatsApp
            </Heading>
            <Text fontSize="sm" color="gray.700" mb="5">
              Visita técnica sin costo.
            </Text>
            <Flex gap="3" wrap="wrap">
              <Button asChild variant="aura" _dark={{ bg: "gray.900", color: "white", _hover: { bg: "gray.800" } }} px={{ base: "4", sm: "5" }} fontSize={{ base: "xs", sm: "sm" }} whiteSpace="nowrap" flex={{ base: "1 1 100%", sm: "1 1 auto" }}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
                  Cotizar por WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" _dark={{ bg: "transparent", color: "gray.900", borderColor: "gray.900", _hover: { bg: "blackAlpha.100" } }} px={{ base: "4", sm: "5" }} fontSize={{ base: "xs", sm: "sm" }} whiteSpace="nowrap" flex={{ base: "1 1 100%", sm: "1 1 auto" }}>
                <RouterLink href="/presupuesto">Armar presupuesto</RouterLink>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Reveal>
  </Container>
);

export default WhatsAppBand;
