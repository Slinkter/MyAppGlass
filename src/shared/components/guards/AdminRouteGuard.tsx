"use client";

import React from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Box, VStack, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { ShieldAlert, LogIn, Home } from "lucide-react";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <Box minH="60vh" display="flex" alignItems="center" justifyContent="center">
        <VStack gap="4">
          <Spinner size="xl" color="brand.primary" />
          <Text color="text.muted">Verificando credenciales de acceso administrativo...</Text>
        </VStack>
      </Box>
    );
  }

  if (!user || role !== "admin") {
    return (
      <Box
        maxW="550px"
        mx="auto"
        my="16"
        p="8"
        borderRadius="2xl"
        bg="bg.surface"
        border="1px solid"
        borderColor="border.subtle"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.12)"
        textAlign="center"
      >
        <VStack gap="5">
          <Box p="4" bg="red.500/10" color="red.400" borderRadius="full">
            <ShieldAlert size={48} />
          </Box>
          <Heading size="lg" color="brand.primary">
            Acceso Restringido
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Esta sección está reservada exclusivamente para el personal administrativo y jefes de taller de{" "}
            <strong>Glass & Aluminum Company S.A.C.</strong>
          </Text>
          <VStack gap="3" w="full" pt="2">
            {!user ? (
              <Button asChild colorPalette="cyan" w="full" size="lg">
                <Link href="/auth">
                  <LogIn size={18} style={{ marginRight: 8 }} />
                  Iniciar Sesión como Administrador
                </Link>
              </Button>
            ) : (
              <Text fontSize="xs" color="orange.400">
                Sesión activa como: <strong>{user.email}</strong> (Rol: <strong>{role}</strong>). Solicite permisos al superadministrador.
              </Text>
            )}
            <Button asChild variant="outline" w="full">
              <Link href="/">
                <Home size={18} style={{ marginRight: 8 }} />
                Volver al Inicio
              </Link>
            </Button>
          </VStack>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};
