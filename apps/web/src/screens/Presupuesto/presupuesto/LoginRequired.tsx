"use client";

import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Lock, LogIn, MessageSquare } from "lucide-react";
import Link from "next/link";
import { companyData } from "@/shared/config/company-data";

export const LoginRequired: React.FC = () => {
  return (
    <Box py="16" maxW="600px" mx="auto" px="4" textAlign="center">
      <Box
        bg="surface.card"
        p={{ base: "6", md: "8" }}
        borderRadius="card"
        border="1px solid"
        borderColor="border.default"
        boxShadow="cardLift"
      >
        <Box p="4" bg="bg.subtle" color="text.accent" borderRadius="full" display="inline-flex" mb="4">
          <Lock size={40} style={{ flexShrink: 0 }} />
        </Box>
        <Heading as="h1" size="xl" mb="2" color="text.heading">
          Inicio de Sesión Requerido
        </Heading>
        <Text color="text.muted" fontSize="sm" mb="6">
          Para generar y descargar cotizaciones formales con hoja membretada de {companyData.razonSocial}, debes iniciar sesión con tu cuenta de cliente o administrador.
        </Text>
        <VStack gap="3">
          <Button asChild size="lg" w="full">
            <Link href="/auth">
              <LogIn size={18} style={{ flexShrink: 0 }} /> Ingresar
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" w="full">
            <Link href="/contacto">
              <MessageSquare size={18} style={{ flexShrink: 0 }} /> Cotizar sin cuenta
            </Link>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
