"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Spinner,
  IconButton,
  Image,
} from "@chakra-ui/react";
import {
  Edit2,
  Trash2,
  Building2,
  MapPin,
  User,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Calendar,
} from "lucide-react";
import type { Project } from "@/shared/api/firebase/types";

export interface ProjectAdminTableProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onCreateNew: () => void;
  onTogglePublish?: (project: Project) => void;
}

export const ProjectAdminTable: React.FC<ProjectAdminTableProps> = ({
  projects,
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
      boxShadow="0 8px 30px rgba(0, 0, 0, 0.04)"
    >
      {/* Header bar del módulo */}
      <HStack
        p="5"
        justify="space-between"
        wrap="wrap"
        gap="3"
        borderBottom="1px solid"
        borderColor="border.default"
        bg="bg.subtle"
      >
        <VStack align="start" gap="0.5">
          <HStack gap="2">
            <Building2 size={18} style={{ flexShrink: 0, color: "#a855f7" }} />
            <Text fontSize="md" fontWeight="bold" color="text.primary">
              Portafolio de Proyectos y Obras
            </Text>
            <Badge size="sm" variant="subtle" colorPalette="purple">
              {projects.length} obras
            </Badge>
          </HStack>
          <Text fontSize="xs" color="text.muted">
            Gestiona los proyectos ejecutados, residenciales, edificios comerciales y clientes
          </Text>
        </VStack>

        <Button
          size="sm"
          colorPalette="purple"
          onClick={onCreateNew}
          style={{ cursor: "pointer" }}
        >
          <PlusCircle size={16} style={{ flexShrink: 0 }} />
          Nuevo Proyecto
        </Button>
      </HStack>

      {/* Contenido / Tabla */}
      {loading ? (
        <Box p="16" textAlign="center">
          <Spinner size="xl" color="purple.500" />
          <Text mt="4" color="text.muted" fontSize="sm">
            Cargando portafolio de proyectos desde Firebase Firestore...
          </Text>
        </Box>
      ) : projects.length === 0 ? (
        <Box p="16" textAlign="center">
          <Box
            p="3"
            borderRadius="full"
            bg="bg.subtle"
            display="inline-flex"
            color="text.muted"
            mb="3"
          >
            <Building2 size={32} style={{ flexShrink: 0 }} />
          </Box>
          <Text fontWeight="semibold" color="text.primary">
            No hay proyectos registrados en el portafolio
          </Text>
          <Text color="text.muted" fontSize="sm" mt="1" maxW="400px" mx="auto">
            Registra una obra residencial o comercial con su galería fotográfica para exhibirla a los clientes.
          </Text>
          <Button
            mt="4"
            size="sm"
            colorPalette="purple"
            onClick={onCreateNew}
          >
            <PlusCircle size={16} style={{ flexShrink: 0 }} />
            Crear Primer Proyecto
          </Button>
        </Box>
      ) : (
        <Box overflowX="auto">
          <Box as="table" w="full" textAlign="left" style={{ borderCollapse: "collapse" }}>
            <Box as="thead" bg="bg.subtle" borderBottom="1px solid" borderColor="border.default">
              <Box as="tr">
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Proyecto / Obra
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Cliente & Ubicación
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Servicio Vinculado
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Álbum Fotográfico
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Año / Conclusión
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Estado
                </Box>
                <Box as="th" p="4" textAlign="right" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Acciones
                </Box>
              </Box>
            </Box>

            <Box as="tbody">
              {projects.map((proj) => (
                <Box
                  as="tr"
                  key={proj.id}
                  borderBottom="1px solid"
                  borderColor="border.subtle"
                  _hover={{ bg: "bg.subtle" }}
                  transition="background 0.15s ease"
                >
                  {/* Proyecto (Cover + Título + Slug) */}
                  <Box as="td" p="4">
                    <HStack gap="3">
                      <Box
                        w="46px"
                        h="46px"
                        borderRadius="lg"
                        overflow="hidden"
                        bg="bg.subtle"
                        flexShrink={0}
                        border="1px solid"
                        borderColor="border.default"
                      >
                        {proj.coverImage ? (
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
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
                        <Text fontSize="sm" fontWeight="semibold" color="text.primary">
                          {proj.title}
                        </Text>
                        <Badge size="xs" variant="surface" colorPalette="gray" fontFamily="mono">
                          {proj.slug}
                        </Badge>
                      </VStack>
                    </HStack>
                  </Box>

                  {/* Cliente & Ubicación */}
                  <Box as="td" p="4">
                    <VStack align="start" gap="1">
                      <HStack gap="1.5" fontSize="xs" color="text.primary">
                        <User size={13} style={{ flexShrink: 0, color: "#a855f7" }} />
                        <Text fontWeight="medium">{proj.client}</Text>
                      </HStack>
                      <HStack gap="1.5" fontSize="2xs" color="text.muted">
                        <MapPin size={12} style={{ flexShrink: 0 }} />
                        <Text>{proj.location}</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Servicio Vinculado */}
                  <Box as="td" p="4">
                    <Badge size="sm" variant="subtle" colorPalette="blue">
                      {proj.serviceId || "General"}
                    </Badge>
                  </Box>

                  {/* Álbum Galería count */}
                  <Box as="td" p="4">
                    <Badge size="sm" variant="subtle" colorPalette="purple">
                      <ImageIcon size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                      {proj.gallery?.length || 0} fotos
                    </Badge>
                  </Box>

                  {/* Año / Conclusión */}
                  <Box as="td" p="4">
                    <HStack gap="1" fontSize="xs" color="text.muted">
                      <Calendar size={13} style={{ flexShrink: 0 }} />
                      <Text>{proj.completedAt || "Reciente"}</Text>
                    </HStack>
                  </Box>

                  {/* Estado Publicado */}
                  <Box as="td" p="4">
                    {proj.published ? (
                      <Badge
                        size="sm"
                        colorPalette="green"
                        variant="subtle"
                        cursor={onTogglePublish ? "pointer" : "default"}
                        onClick={() => onTogglePublish?.(proj)}
                      >
                        <CheckCircle2 size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                        Publicado
                      </Badge>
                    ) : (
                      <Badge
                        size="sm"
                        colorPalette="gray"
                        variant="subtle"
                        cursor={onTogglePublish ? "pointer" : "default"}
                        onClick={() => onTogglePublish?.(proj)}
                      >
                        <XCircle size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                        Borrador
                      </Badge>
                    )}
                  </Box>

                  {/* Acciones */}
                  <Box as="td" p="4" textAlign="right">
                    <HStack justify="flex-end" gap="1.5">
                      <Button
                        size="xs"
                        variant="subtle"
                        colorPalette="purple"
                        onClick={() => onEdit(proj)}
                      >
                        <Edit2 size={12} style={{ flexShrink: 0 }} />
                        Editar
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorPalette="red"
                        onClick={() => onDelete(proj)}
                      >
                        <Trash2 size={12} style={{ flexShrink: 0 }} />
                      </Button>
                    </HStack>
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
