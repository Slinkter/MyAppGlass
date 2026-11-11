"use client";

import React from "react";
import AdminRowActions from "./AdminRowActions";
import { Box, VStack, HStack, Text, Button, Spinner, IconButton } from "@chakra-ui/react";
import { Badge } from "@/shared/ui/badge";
import {
  ExternalLink,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  PlusCircle,
} from "lucide-react";
import type { Service } from "@/shared/api/firebase/types";
import { getServiceHref } from "@/features/services/hooks/serviceMappers";

export interface ServiceAdminTableProps {
  services: Service[];
  loading: boolean;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
  onCreateNew: () => void;
  onTogglePublish?: (service: Service) => void;
}

export const ServiceAdminTable: React.FC<ServiceAdminTableProps> = ({
  services,
  loading,
  onEdit,
  onDelete,
  onCreateNew,
  onTogglePublish,
}) => {
  return (
    <Box
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(20px)"
      overflow="hidden"
      boxShadow="var(--chakra-shadows-admin-table)"
    >
      {/* Header bar del módulo */}
      <HStack
        p={{ base: "3", md: "5" }}
        justify="space-between"
        wrap="wrap"
        gap="3"
        borderBottom="1px solid"
        borderColor="border.default"
        bg="bg.subtle"
      >
        <VStack align="start" gap="0.5">
          <HStack gap="2">
            <Layers size={18} style={{ flexShrink: 0, color: "var(--chakra-colors-status-info)" }} />
            <Text fontSize="md" fontWeight="bold" color="text.heading">
              Catálogo de Servicios
            </Text>
            <Badge size="sm" variant="info">
              {services.length} registros
            </Badge>
          </HStack>
          <Text fontSize="xs" color="text.muted">
            Gestiona los servicios corporativos de carpintería de aluminio y vidrio templado
          </Text>
        </VStack>

        <Button
          size="sm"
          onClick={onCreateNew}
          style={{ cursor: "pointer" }}
        >
          <PlusCircle size={16} style={{ flexShrink: 0 }} />
          Nuevo Servicio
        </Button>
      </HStack>

      {/* Contenido / Tabla */}
      {loading ? (
        <Box p={{ base: "8", md: "16" }} textAlign="center">
          <Spinner size="xl" color="brand.primary" />
          <Text mt="4" color="text.muted" fontSize="sm">
            Cargando catálogo de servicios desde Firebase Firestore...
          </Text>
        </Box>
      ) : services.length === 0 ? (
        <Box p={{ base: "8", md: "16" }} textAlign="center">
          <Box
            p="3"
            borderRadius="full"
            bg="bg.subtle"
            display="inline-flex"
            color="text.muted"
            mb="3"
          >
            <Layers size={32} style={{ flexShrink: 0 }} />
          </Box>
          <Text fontWeight="semibold" color="text.heading">
            No hay servicios registrados
          </Text>
          <Text color="text.muted" fontSize="sm" mt="1" maxW="400px" mx="auto">
            Comienza publicando el primer servicio de la empresa para que aparezca en el sitio web y el cotizador.
          </Text>
          <Button
            mt="4"
            size="sm"
            onClick={onCreateNew}
          >
            <PlusCircle size={16} style={{ flexShrink: 0 }} />
            Crear Primer Servicio
          </Button>
        </Box>
      ) : (
        <Box overflowX="auto">
          <Box as="table" w="full" minW="640px" textAlign="left" style={{ borderCollapse: "collapse" }}>
            <Box as="thead" bg="bg.subtle" borderBottom="1px solid" borderColor="border.default">
              <Box as="tr">
                <Box as="th" p="4" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Orden
                </Box>
                <Box as="th" p="4" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Servicio
                </Box>
                <Box as="th" p="4" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Slug / URL
                </Box>
                <Box as="th" p="4" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Características
                </Box>
                <Box as="th" p="4" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Galería
                </Box>
                <Box as="th" p="4" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Estado
                </Box>
                <Box as="th" p="4" textAlign="right" fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Acciones
                </Box>
              </Box>
            </Box>

            <Box as="tbody">
              {services.map((item) => (
                <Box
                  as="tr"
                  key={item.id}
                  borderBottom="1px solid"
                  borderColor="border.subtle"
                  _hover={{ bg: "bg.subtle" }}
                  transition="background 0.15s ease"
                >
                  {/* Orden */}
                  <Box as="td" p="4" fontSize="sm" fontWeight="bold" color="text.muted" w="60px">
                    #{item.order ?? 0}
                  </Box>

                  {/* Servicio (Cover + Título + Descripción corta) */}
                  <Box as="td" p="4">
                    <HStack gap="3">
                      <Box
                        w="44px"
                        h="44px"
                        borderRadius="lg"
                        overflow="hidden"
                        bg="bg.subtle"
                        flexShrink={0}
                        border="1px solid"
                        borderColor="border.default"
                      >
                        {item.coverImage ? (
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            w="full"
                            h="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="text.muted"
                          >
                            <ImageIcon size={18} style={{ flexShrink: 0 }} />
                          </Box>
                        )}
                      </Box>
                      <VStack align="start" gap="0.5">
                        <Text fontSize="sm" fontWeight="semibold" color="text.heading">
                          {item.title}
                        </Text>
                        <Text
                          fontSize="xs"
                          color="text.muted"
                          maxW="300px"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.shortDescription}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>

                  {/* Slug */}
                  <Box as="td" p="4">
                    <HStack gap="1.5">
                      <Badge size="sm" variant="neutral" fontFamily="mono">
                        /servicios/{item.slug}
                      </Badge>
                      <IconButton
                        aria-label="Ver en el sitio"
                        size="2xs"
                        variant="ghost"
                        color="text.muted"
                        onClick={() => window.open(getServiceHref(item.slug), "_blank")}
                      >
                        <ExternalLink size={12} style={{ flexShrink: 0 }} />
                      </IconButton>
                    </HStack>
                  </Box>

                  {/* Features */}
                  <Box as="td" p="4">
                    <Text fontSize="xs" color="text.muted">
                      {item.features?.length || 0} características
                    </Text>
                  </Box>

                  {/* Galería count */}
                  <Box as="td" p="4">
                    <Badge size="sm" variant="info">
                      <ImageIcon size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                      {item.gallery?.length || 0} fotos
                    </Badge>
                  </Box>

                  {/* Publicado */}
                  <Box as="td" p="4">
                    {item.published ? (
                      <Badge
                        size="sm"
                        variant="success"
                        cursor={onTogglePublish ? "pointer" : "default"}
                        onClick={() => onTogglePublish?.(item)}
                      >
                        <CheckCircle2 size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                        Publicado
                      </Badge>
                    ) : (
                      <Badge
                        size="sm"
                        variant="neutral"
                        cursor={onTogglePublish ? "pointer" : "default"}
                        onClick={() => onTogglePublish?.(item)}
                      >
                        <XCircle size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                        Borrador
                      </Badge>
                    )}
                  </Box>

                  {/* Acciones */}
                  <Box as="td" p="4" textAlign="right">
                    <AdminRowActions onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
