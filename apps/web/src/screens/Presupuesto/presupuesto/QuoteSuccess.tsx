"use client";

import React from "react";
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { CheckCircle2, MessageCircle, Printer, RotateCcw } from "lucide-react";
import { companyData } from "@/shared/config/company-data";

interface QuoteSuccessProps {
  quoteNumber: string;
  total: number;
  pricePending: boolean;
  onPrint: () => void;
  onNew: () => void;
}

export const QuoteSuccess: React.FC<QuoteSuccessProps> = ({ quoteNumber, total, pricePending, onPrint, onNew }) => {
  const message = `Hola, acabo de solicitar el presupuesto N° ${quoteNumber} por un total estimado de S/ ${total.toFixed(2)}. Quisiera coordinar la visita técnica.`;
  const whatsappLink = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Box bg="surface.card" p={{ base: "4", md: "8" }} borderRadius="2xl" border="1px solid" borderColor="border.default" mb="8">
      <VStack gap="4" align="start">
        <Heading size="lg" display="flex" alignItems="center" gap="2">
          <CheckCircle2 size={24} style={{ flexShrink: 0 }} /> Solicitud registrada
        </Heading>
        <Text>
          Tu presupuesto es el <strong>N° {quoteNumber}</strong> con un total estimado de <strong>S/ {total.toFixed(2)}</strong>.
          Nos comunicaremos contigo para confirmar medidas y coordinar la visita técnica sin costo.
        </Text>
        {pricePending && (
          <Text fontSize="sm" color="text.muted">
            Algunas partidas tienen precio por definir; el monto final te lo confirmamos nosotros.
          </Text>
        )}
        <HStack gap="3" wrap="wrap">
          <Button asChild variant="whatsapp" minH="11">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} style={{ flexShrink: 0 }} /> Coordinar por WhatsApp
            </a>
          </Button>
          <Button variant="outline" minH="11" onClick={onPrint}>
            <Printer size={18} style={{ flexShrink: 0 }} /> Imprimir / guardar PDF
          </Button>
          <Button variant="ghost" minH="11" onClick={onNew}>
            <RotateCcw size={18} style={{ flexShrink: 0 }} /> Nuevo presupuesto
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
