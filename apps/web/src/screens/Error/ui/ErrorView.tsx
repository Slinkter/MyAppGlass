"use client";
import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import RouterLink from "next/link";
import { Home } from "lucide-react";

const ErrorView: React.FC = () => {
  return (
    <Box 
      minH="80vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="bg.page"
    >
      <VStack gap={8} textAlign="center" maxW="lg" px={6}>
        <Heading size="4xl" color="text.accent">404</Heading>
        <VStack gap={2}>
          <Heading size="xl">Página no encontrada</Heading>
          <Text color="text.muted" fontSize="lg">
            Lo sentimos, el proyecto o sección que buscas no está disponible actualmente.
          </Text>
        </VStack>
        <Button 
          as={RouterLink} 
          href="/" 
          variant="aura" 
          size="lg"
          gap={3}
        >
          <Home size={20} /> VOLVER AL INICIO
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorView;
