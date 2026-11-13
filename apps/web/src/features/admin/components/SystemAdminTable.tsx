"use client";

import { SUPPLIER_LABELS } from "@/entities/supplier";
import React from "react";
import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import type { CatalogSystem } from "@/entities/system";

export interface SystemAdminTableProps {
  systems: CatalogSystem[];
  onPublish: (system: CatalogSystem) => void;
  onUnpublish: (system: CatalogSystem) => void;
  onDelete: (system: CatalogSystem) => void;
  onView: (system: CatalogSystem) => void;
}

const HEADER_CELL = {
  p: "4",
  fontSize: "xs",
  fontWeight: "bold",
  color: "text.muted",
  textTransform: "uppercase",
  letterSpacing: "wider",
} as const;

/** Etiqueta de alias por proveedor: "Proveedor: denominación". */
const aliasLabel = (proveedor: string, denominacion: string): string =>
  `${(SUPPLIER_LABELS as Record<string, string>)[proveedor] ?? proveedor}: ${denominacion}`;

const StatusBadge: React.FC<{ publicado: boolean }> = ({ publicado }) =>
  publicado ? (
    <Badge size="sm" variant="success">
      Publicado
    </Badge>
  ) : (
    <Badge size="sm" variant="neutral">
      Borrador
    </Badge>
  );

interface RowActionsProps {
  system: CatalogSystem;
  onPublish: (system: CatalogSystem) => void;
  onUnpublish: (system: CatalogSystem) => void;
  onDelete: (system: CatalogSystem) => void;
  onView: (system: CatalogSystem) => void;
  compact: boolean;
}

const RowActions: React.FC<RowActionsProps> = ({
  system,
  onPublish,
  onUnpublish,
  onDelete,
  onView,
  compact,
}) => {
  const publicado = system.estado === "publicado";
  const size = compact ? "sm" : "xs";
  const minH = compact ? "11" : undefined;

  return (
    <HStack gap="2" wrap="wrap" justify={compact ? "stretch" : "flex-end"}>
      <Button size={size} minH={minH} variant="outline" borderColor="border.default" onClick={() => onView(system)}>
        Ver
      </Button>
      {publicado ? (
        <Button size={size} minH={minH} variant="outline" borderColor="border.default" onClick={() => onUnpublish(system)}>
          Despublicar
        </Button>
      ) : (
        <Button size={size} minH={minH} variant="primary" onClick={() => onPublish(system)}>
          Publicar
        </Button>
      )}
      <Button size={size} minH={minH} variant="outline" borderColor="border.default" onClick={() => onDelete(system)}>
        Eliminar
      </Button>
    </HStack>
  );
};

export const SystemAdminTable: React.FC<SystemAdminTableProps> = ({
  systems,
  onPublish,
  onUnpublish,
  onDelete,
  onView,
}) => (
  <>
    {/* Escritorio (md en adelante): tabla */}
    <Box
      display={{ base: "none", md: "block" }}
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      overflow="hidden"
    >
      <Box as="table" w="full" textAlign="left" style={{ borderCollapse: "collapse" }}>
        <Box as="thead" bg="bg.subtle" borderBottom="1px solid" borderColor="border.default">
          <Box as="tr">
            <Box as="th" {...HEADER_CELL}>Nombre</Box>
            <Box as="th" {...HEADER_CELL}>Servicio</Box>
            <Box as="th" {...HEADER_CELL}>Cómo lo llama el proveedor</Box>
            <Box as="th" {...HEADER_CELL}>Estado</Box>
            <Box as="th" {...HEADER_CELL} textAlign="right">Acciones</Box>
          </Box>
        </Box>
        <Box as="tbody">
          {systems.map((system) => (
            <Box
              as="tr"
              key={system.id}
              borderBottom="1px solid"
              borderColor="border.subtle"
              _hover={{ bg: "bg.subtle" }}
              transition="background 0.15s ease"
            >
              <Box as="td" p="4">
                <Text fontSize="sm" fontWeight="semibold" color="text.heading">
                  {system.nombre}
                </Text>
              </Box>
              <Box as="td" p="4">
                <Text fontSize="xs" color="text.muted" fontFamily="mono">
                  {system.serviceSlug}
                </Text>
              </Box>
              <Box as="td" p="4">
                <VStack align="start" gap="0.5">
                  {system.aliases.map((alias) => (
                    <Text key={`${alias.proveedor}-${alias.denominacion}`} fontSize="xs" color="text.muted">
                      {aliasLabel(alias.proveedor, alias.denominacion)}
                    </Text>
                  ))}
                </VStack>
              </Box>
              <Box as="td" p="4">
                <StatusBadge publicado={system.estado === "publicado"} />
              </Box>
              <Box as="td" p="4" textAlign="right">
                <RowActions
                  system={system}
                  onPublish={onPublish}
                  onUnpublish={onUnpublish}
                  onDelete={onDelete}
                  onView={onView}
                  compact={false}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>

    {/* Móvil (360 px): tarjetas apiladas, sin desplazamiento horizontal */}
    <Stack display={{ base: "flex", md: "none" }} gap="3">
      {systems.map((system) => (
        <Box
          key={system.id}
          borderRadius="2xl"
          bg="surface.card"
          border="1px solid"
          borderColor="border.default"
          p="4"
        >
          <HStack justify="space-between" align="start" gap="3" mb="2">
            <Text fontSize="sm" fontWeight="semibold" color="text.heading">
              {system.nombre}
            </Text>
            <StatusBadge publicado={system.estado === "publicado"} />
          </HStack>
          <Text fontSize="xs" color="text.muted" mb="1">
            Servicio: <Text as="span" fontFamily="mono">{system.serviceSlug}</Text>
          </Text>
          {system.aliases.length > 0 && (
            <VStack align="start" gap="0.5" mb="3">
              <Text fontSize="xs" color="text.muted" fontWeight="semibold">
                Cómo lo llama el proveedor
              </Text>
              {system.aliases.map((alias) => (
                <Text key={`${alias.proveedor}-${alias.denominacion}`} fontSize="xs" color="text.muted">
                  {aliasLabel(alias.proveedor, alias.denominacion)}
                </Text>
              ))}
            </VStack>
          )}
          <RowActions
            system={system}
            onPublish={onPublish}
            onUnpublish={onUnpublish}
            onDelete={onDelete}
            onView={onView}
            compact
          />
        </Box>
      ))}
    </Stack>
  </>
);
