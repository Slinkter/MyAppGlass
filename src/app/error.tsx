"use client";

import React, { useEffect } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";
import RouterLink from "next/link";
import { logger } from "@/shared/utils/logger";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Unhandled Route Error in App Router", error, { digest: error.digest });
  }, [error]);

  return (
    <Box minH="70vh" display="flex" alignItems="center" justifyContent="center" bg="bg.page" px={6}>
      <VStack gap={6} textAlign="center" maxW="lg">
        <Heading size="3xl" color="red.500">Error Inesperado</Heading>
        <Text color="text.muted" fontSize="md">
          Ha ocurrido un inconveniente al cargar esta sección. Puedes reintentar la operación o volver al inicio.
        </Text>
        <VStack gap={3} w="full" sm={{ flexDirection: "row", justifyContent: "center" }}>
          <Button variant="aura" size="md" onClick={() => reset()} gap={2}>
            <RotateCcw size={16} /> Reintentar
          </Button>
          <Button as={RouterLink} href="/" variant="outline" size="md" gap={2}>
            <Home size={16} /> Volver al Inicio
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
