"use client";

import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { MessageSquareText, ShieldCheck } from "lucide-react";
import GlassCard from "@/shared/components/common/GlassCard";
import { companyData } from "@/shared/config/company-data";

export function WhatsAppSection() {
  return (
    <GlassCard p={{ base: "6", md: "8" }} bg="primary.900" color="white" border="none" boxShadow="2xl">
      <VStack align="flex-start" gap="6">
        <HStack justify="space-between" w="full">
          <Box bg="whiteAlpha.200" p="3" borderRadius="2xl">
            <MessageSquareText size={28} />
          </Box>
          <HStack gap="1" bg="whiteAlpha.200" px="3" py="1" borderRadius="full">
            <ShieldCheck size={14} />
            <Text fontSize="xs" fontWeight="700">Respuesta Inmediata</Text>
          </HStack>
        </HStack>

        <Box>
          <Heading size="md" mb="2" color="white">
            Asesoría Directa por WhatsApp
          </Heading>
          <Text opacity={0.85} fontSize="sm">
            Ideal para consultas rápidas, envío de fotos de obra, presupuestos en PDF y atención en tiempo real.
          </Text>
        </Box>

        <a
          href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent("Hola, deseo cotizar un proyecto.")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: "100%", textDecoration: "none" }}
        >
          <Button 
            bg="white" 
            color="primary.900" 
            w="full" 
            size="xl" 
            borderRadius="full"
            fontWeight="900"
            letterSpacing="0.1em"
            _hover={{ transform: "translateY(-2px)", boxShadow: "0 10px 24px rgba(0,0,0,0.25)" }}
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            CONTACTAR VÍA WHATSAPP
          </Button>
        </a>
      </VStack>
    </GlassCard>
  );
}
