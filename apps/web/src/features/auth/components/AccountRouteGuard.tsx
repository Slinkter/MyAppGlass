"use client";

import React from "react";
import Link from "next/link";
import { Box, VStack, Text, Spinner } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";

/** Guardia de /mi-cuenta: exige sesión iniciada (cualquier rol). */
export const AccountRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box minH="60dvh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="brand.primary" />
      </Box>
    );
  }

  if (!user) {
    return (
      <VStack gap="4" py="16" px="4">
        <Text color="text.muted">Inicia sesión para ver tu cuenta.</Text>
        <Button asChild variant="aura">
          <Link href="/auth">Iniciar sesión</Link>
        </Button>
      </VStack>
    );
  }

  return <>{children}</>;
};
