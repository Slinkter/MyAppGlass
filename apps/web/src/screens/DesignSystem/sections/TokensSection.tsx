"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Separator,
  Card,
} from "@chakra-ui/react";
import { Copy } from "lucide-react";

export const TokensSection: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedToken(text);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      // Ignorar fallo en contextos no seguros
    }
  };

  return (
    <VStack gap="8" align="stretch">
      {/* 1. Jerarquía Tipográfica Lora */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <Card.Title fontSize="xl">Tipografía Oficial (Fuente Lora)</Card.Title>
          <Card.Description>
            Jerarquía tipográfica editorial inspirada en diseño arquitectónico.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <VStack gap="5" align="stretch">
            <Box>
              <Heading size="4xl" color="text.heading">Heading 4XL (3rem / 48px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Títulos Hero de la portada</Text>
            </Box>
            <Box>
              <Heading size="3xl" color="text.heading">Heading 3XL (2.25rem / 36px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Títulos de secciones principales</Text>
            </Box>
            <Box>
              <Heading size="2xl" color="text.heading">Heading 2XL (1.875rem / 30px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Encabezados de módulos y catálogos</Text>
            </Box>
            <Box>
              <Heading size="xl" color="text.heading">Heading XL (1.5rem / 24px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Títulos de tarjetas y modales</Text>
            </Box>
            <Box>
              <Heading size="md" color="text.heading">Heading MD (1.125rem / 18px)</Heading>
              <Text fontSize="xs" color="text.muted">Subtítulos técnicos y encabezados de tablas</Text>
            </Box>
            <Separator borderColor="border.subtle" />
            <Box>
              <Text fontSize="md" color="text.body">
                <strong>Texto de Cuerpo (md / 16px):</strong> Carpintería de aluminio de alta precisión y vidrio templado para residencias y proyectos comerciales en Lima.
              </Text>
              <Text fontSize="sm" color="text.muted" mt="2">
                <strong>Texto Secundario (sm / 14px):</strong> Fichas técnicas, leyendas de cotización y especificaciones de hermeticidad.
              </Text>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* 2. Reglas de Negocio Inmutables (AGENTS.md) */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <Card.Title fontSize="xl">Catálogo Oficial de Sistemas & Vidrios (Inmutable)</Card.Title>
          <Card.Description>
            Definiciones canónicas estrictas que no deben alterarse en ninguna pantalla.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <VStack gap="6" align="stretch">
            <Box>
              <Text fontWeight="semibold" mb="3" fontSize="sm" color="text.heading">
                LOS 4 SISTEMAS OFICIALES DE VENTANAS
              </Text>
              <HStack gap="3" wrap="wrap">
                <Badge colorPalette="blue" px="3" py="1.5" borderRadius="full" fontSize="xs">
                  Sistema Nova
                </Badge>
                <Badge colorPalette="cyan" px="3" py="1.5" borderRadius="full" fontSize="xs">
                  Serie 25
                </Badge>
                <Badge colorPalette="teal" px="3" py="1.5" borderRadius="full" fontSize="xs">
                  Serie 35
                </Badge>
                <Badge colorPalette="purple" px="3" py="1.5" borderRadius="full" fontSize="xs">
                  Serie 62 Antirruido
                </Badge>
              </HStack>
            </Box>

            <Separator borderColor="border.subtle" />

            <Box>
              <Text fontWeight="semibold" mb="3" fontSize="sm" color="text.heading">
                LOS 3 TIPOS DE VIDRIO (SIN SUFIJO DE GROSOR)
              </Text>
              <HStack gap="3" wrap="wrap">
                <Badge variant="outline" colorPalette="gray" px="3" py="1.5" borderRadius="full" fontSize="xs">
                  Crudo
                </Badge>
                <Badge variant="outline" colorPalette="blue" px="3" py="1.5" borderRadius="full" fontSize="xs">
                  Laminado
                </Badge>
                <Badge variant="outline" colorPalette="purple" px="3" py="1.5" borderRadius="full" fontSize="xs">
                  Templado
                </Badge>
              </HStack>
            </Box>

            <Separator borderColor="border.subtle" />

            <Box>
              <Text fontWeight="semibold" mb="3" fontSize="sm" color="text.heading">
                ACABADOS DE ALUMINIO REGLAMENTARIOS
              </Text>
              <HStack gap="2" wrap="wrap">
                {["Negro", "Mate", "Blanco", "Madera", "Champagne"].map((color) => (
                  <Badge key={color} variant="subtle" colorPalette="gray" px="3" py="1" borderRadius="md">
                    {color}
                  </Badge>
                ))}
              </HStack>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* 3. Swatches Dinámicos de Tokens */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <Card.Title fontSize="xl">Tokens Semánticos de Color</Card.Title>
          <Card.Description>
            Variables vivas del tema Aura. Haz clic en cualquiera para copiar la prop de Chakra UI.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap="4">
            {[
              { token: "bg.page", label: "Fondo General" },
              { token: "bg.surface", label: "Fondo Tarjeta" },
              { token: "bg.section", label: "Fondo Sección" },
              { token: "surface.container", label: "Contenedor" },
              { token: "brand.primary", label: "Acento Primario" },
              { token: "primary.900", label: "Zinc 900" },
              { token: "primary.700", label: "Zinc 700" },
              { token: "brand.whatsapp", label: "WhatsApp" },
              { token: "brand.red", label: "Red GYA" },
              { token: "status.info", label: "Info / Cyan" },
              { token: "status.success", label: "Éxito / Verde" },
              { token: "status.danger", label: "Peligro / Rojo" },
              { token: "border.subtle", label: "Borde Tenue" },
              { token: "border.default", label: "Borde Base" },
              { token: "border.strong", label: "Borde Fuerte" },
            ].map((item) => (
              <Box
                key={item.token}
                p="3"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="border.subtle"
                cursor="pointer"
                _hover={{ borderColor: "brand.primary", transform: "translateY(-2px)" }}
                transition="all 0.2s ease"
                onClick={() => copyToClipboard(item.token)}
              >
                <Box
                  h="40px"
                  borderRadius="md"
                  bg={item.token}
                  mb="2"
                  borderWidth="1px"
                  borderColor="border.subtle"
                />
                <Text fontSize="xs" fontWeight="bold" color="text.heading">{item.label}</Text>
                <HStack justify="space-between" mt="1">
                  <Text fontSize="xs" color="text.muted">{item.token}</Text>
                  {copiedToken === item.token ? (
                    <Badge colorPalette="green" size="xs">Copiado</Badge>
                  ) : (
                    <Box color="text.muted">
                      <Copy size={12} style={{ flexShrink: 0 }} />
                    </Box>
                  )}
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
