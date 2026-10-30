"use client";

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Lock, LogIn } from "lucide-react";
import Link from "next/link";

export const LoginRequired: React.FC = () => {
  return (
    <Box py="16" maxW="600px" mx="auto" px="4" textAlign="center">
      <Box
        bg="surface.card"
        p="8"
        borderRadius="2xl"
        border="1px solid"
        borderColor="border.glass"
        backdropFilter="blur(16px)"
        boxShadow="0 20px 40px rgba(0,0,0,0.3)"
      >
        <Box p="4" bg="blue.500/10" color="blue.400" borderRadius="full" display="inline-flex" mb="4">
          <Lock size={40} />
        </Box>
        <Heading size="xl" mb="2">
          Inicio de Sesión Requerido
        </Heading>
        <Text color="text.muted" fontSize="sm" mb="6">
          Para generar y descargar cotizaciones formales con hoja membretada de Glass & Aluminum Company S.A.C., debes iniciar sesión con tu cuenta de cliente o administrador.
        </Text>
        <Button asChild colorPalette="blue" size="lg" w="full">
          <Link href="/auth">
            <LogIn size={18} style={{ marginRight: 6 }} /> Iniciar Sesión / Registrarse
          </Link>
        </Button>
      </Box>
    </Box>
  );
};
