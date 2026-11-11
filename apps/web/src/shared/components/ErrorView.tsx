"use client";
import React from "react";
import { Box, Heading, Text, VStack, Stack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import RouterLink from "next/link";
import { Home } from "lucide-react";

const ErrorView: React.FC = () => {
  return (
    <Box 
      minH="80dvh"
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="bg.page"
    >
      <VStack gap={8} textAlign="center" maxW="lg" px={6}>
        <Heading size="4xl" color="text.accent">404</Heading>
        <VStack gap={2}>
          <Heading size="xl">Página no encontrada</Heading>
          <Text color="text.muted" fontSize="md">
            La página que busca no existe o ha sido movida. Puede regresar al inicio o explorar nuestros servicios y canales de contacto.
          </Text>
        </VStack>
        <Stack direction={{ base: "column", sm: "row" }} gap={3} w="full" justify="center">
          <Button 
            asChild 
            variant="primary" 
            size="md"
          >
            <RouterLink href="/" style={{ textDecoration: "none" }}>
              <Home size={18} /> Volver al inicio
            </RouterLink>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="md"
          >
            <RouterLink href="/#servicios" style={{ textDecoration: "none" }}>
              Ver servicios
            </RouterLink>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="md"
          >
            <RouterLink href="/contacto" style={{ textDecoration: "none" }}>
              Contacto
            </RouterLink>
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
};

export default ErrorView;
