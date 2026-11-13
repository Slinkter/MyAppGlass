"use client";

import React, { useMemo, useState } from "react";
import { Box, HStack, Heading, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@/shared/ui/dialog";
import { NativeSelectRoot, NativeSelectField } from "@/shared/ui/native-select";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { SystemAdminTable } from "@/features/admin/components/SystemAdminTable";
import { ConfirmDeleteDialog } from "@/features/admin/components/ConfirmDeleteDialog";
import {
  useSystems,
  setStatus,
  remove,
  seedSystems,
  type CatalogSystem,
  type SystemStatus,
} from "@/entities/system";
import { logger } from "@/shared/utils/logger";

type StatusFilter = "todos" | SystemStatus;

const ALL_SERVICES = "todos";

const STATUS_LABEL: Record<SystemStatus, string> = {
  borrador: "Borrador",
  publicado: "Publicado",
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="2">
    {children}
  </Text>
);

const EMPTY_VALUE = "Por confirmar";

export const SystemsScreen: React.FC = () => {
  const { systems, loading, error } = useSystems();

  const [serviceFilter, setServiceFilter] = useState<string>(ALL_SERVICES);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [viewing, setViewing] = useState<CatalogSystem | null>(null);
  const [deleting, setDeleting] = useState<CatalogSystem | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSeed = async () => {
    setActionLoading(true);
    setStatusMessage(null);
    try {
      const { created, skipped } = await seedSystems();
      setStatusMessage({
        type: "success",
        text: `Se cargaron ${created} sistemas en borrador. ${skipped} ya existían y no se tocaron.`,
      });
    } catch (seedError) {
      logger.error("Error al cargar los sistemas", seedError);
      setStatusMessage({ type: "error", text: "No se pudieron cargar los sistemas. Inténtelo otra vez." });
    } finally {
      setActionLoading(false);
    }
  };

  const services = useMemo(
    () => Array.from(new Set(systems.map((s) => s.serviceSlug))).sort(),
    [systems]
  );

  const filtered = useMemo(
    () =>
      systems.filter(
        (s) =>
          (serviceFilter === ALL_SERVICES || s.serviceSlug === serviceFilter) &&
          (statusFilter === "todos" || s.estado === statusFilter)
      ),
    [systems, serviceFilter, statusFilter]
  );

  const draftCount = systems.filter((s) => s.estado === "borrador").length;
  const publishedCount = systems.filter((s) => s.estado === "publicado").length;

  const changeStatus = async (system: CatalogSystem, estado: SystemStatus) => {
    setStatusMessage(null);
    try {
      await setStatus(system.id, estado);
      setStatusMessage({
        type: "success",
        text: estado === "publicado"
          ? `${system.nombre} quedó publicado.`
          : `${system.nombre} volvió a borrador.`,
      });
    } catch (err) {
      logger.error("No se pudo cambiar el estado del sistema", err, { id: system.id });
      setStatusMessage({ type: "error", text: `No se pudo actualizar ${system.nombre}. Intente de nuevo.` });
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setActionLoading(true);
    setStatusMessage(null);
    try {
      await remove(deleting.id);
      setStatusMessage({ type: "success", text: `${deleting.nombre} fue eliminado.` });
      setDeleting(null);
    } catch (err) {
      logger.error("No se pudo eliminar el sistema", err, { id: deleting.id });
      setStatusMessage({ type: "error", text: `No se pudo eliminar ${deleting.nombre}. Intente de nuevo.` });
    } finally {
      setActionLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box p={{ base: "8", md: "16" }} textAlign="center">
          <Spinner size="xl" color="brand.primary" />
          <Text mt="4" color="text.muted" fontSize="sm">
            Cargando sistemas desde Firestore...
          </Text>
        </Box>
      );
    }
    if (error) {
      return (
        <Box p={{ base: "8", md: "12" }} textAlign="center">
          <Text color="status.dangerText" fontWeight="semibold">
            {error}
          </Text>
        </Box>
      );
    }
    if (systems.length === 0) {
      return (
        <Box p={{ base: "8", md: "12" }} textAlign="center">
          <Text color="text.muted">Todavía no hay sistemas cargados.</Text>
        </Box>
      );
    }
    if (filtered.length === 0) {
      return (
        <Box p={{ base: "8", md: "12" }} textAlign="center">
          <Text color="text.muted">No hay sistemas con esos filtros.</Text>
        </Box>
      );
    }
    return (
      <SystemAdminTable
        systems={filtered}
        onView={setViewing}
        onPublish={(s) => void changeStatus(s, "publicado")}
        onUnpublish={(s) => void changeStatus(s, "borrador")}
        onDelete={setDeleting}
      />
    );
  };

  return (
    <Box maxW="84rem" mx="auto" py={{ base: "5", md: "8" }} px={{ base: "4", md: "6" }}>
      <AdminNav />

      <VStack align="start" gap="1" mb="6">
        <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
          Sistemas por servicio
        </Heading>
        <Text color="text.muted" fontSize="sm">
          Los sistemas en borrador solo se ven en este panel. Publique los que quiera ofrecer y elimine los que no.
        </Text>
        <Button variant="outline" size="sm" minH="11" mt="2" onClick={handleSeed} disabled={actionLoading}>
          Cargar sistemas
        </Button>
        {!loading && !error && (
          <HStack gap="2" mt="1">
            <Badge size="sm" variant="neutral">
              {draftCount} en borrador
            </Badge>
            <Text fontSize="xs" color="text.muted">·</Text>
            <Badge size="sm" variant="success">
              {publishedCount} publicados
            </Badge>
          </HStack>
        )}
      </VStack>

      {statusMessage && (
        <Text
          role="status"
          mb="4"
          fontSize="sm"
          fontWeight="semibold"
          color={statusMessage.type === "error" ? "status.dangerText" : "text.heading"}
        >
          {statusMessage.text}
        </Text>
      )}

      <Stack direction={{ base: "column", sm: "row" }} gap="3" mb="5">
        <VStack align="start" gap="1" flex="1">
          <SectionTitle>Servicio</SectionTitle>
          <NativeSelectRoot size="md" w="full">
            <NativeSelectField
              aria-label="Filtrar por servicio"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <option value={ALL_SERVICES}>Todos los servicios</option>
              {services.map((slug) => (
                <option key={slug} value={slug}>
                  {slug}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </VStack>
        <VStack align="start" gap="1" flex="1">
          <SectionTitle>Estado</SectionTitle>
          <NativeSelectRoot size="md" w="full">
            <NativeSelectField
              aria-label="Filtrar por estado"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="todos">Todos</option>
              <option value="borrador">{STATUS_LABEL.borrador}</option>
              <option value="publicado">{STATUS_LABEL.publicado}</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </VStack>
      </Stack>

      {renderContent()}

      {/* Detalle de solo lectura */}
      <DialogRoot
        open={viewing !== null}
        onOpenChange={(details) => !details.open && setViewing(null)}
        placement="center"
        scrollBehavior="inside"
      >
        <DialogContent maxW={{ base: "calc(100% - var(--chakra-spacing-4))", md: "560px" }} borderRadius="2xl" p="0" overflow="hidden">
          {viewing && (
            <>
              <DialogHeader p={{ base: "4", md: "5" }} borderBottom="1px solid" borderColor="border.subtle" bg="bg.subtle">
                <HStack justify="space-between" align="center" gap="3">
                  <VStack align="start" gap="0.5">
                    <DialogTitle fontSize="md" fontWeight="bold" color="text.heading">
                      {viewing.nombre}
                    </DialogTitle>
                    <Text fontSize="xs" color="text.muted">
                      {viewing.serviceSlug} · {STATUS_LABEL[viewing.estado]}
                    </Text>
                  </VStack>
                  <DialogCloseTrigger />
                </HStack>
              </DialogHeader>

              <DialogBody p={{ base: "4", md: "6" }}>
                <VStack align="stretch" gap="5">
                  <Box>
                    <SectionTitle>Descripción</SectionTitle>
                    <Text fontSize="sm" color="text.heading">
                      {viewing.descripcion || EMPTY_VALUE}
                    </Text>
                  </Box>

                  <Box>
                    <SectionTitle>Cómo lo llama cada proveedor</SectionTitle>
                    {viewing.aliases.length === 0 ? (
                      <Text fontSize="sm" color="text.muted">{EMPTY_VALUE}</Text>
                    ) : (
                      <VStack align="start" gap="1">
                        {viewing.aliases.map((a) => (
                          <Text key={`${a.proveedor}-${a.denominacion}`} fontSize="sm" color="text.heading">
                            {a.proveedor}: {a.denominacion}
                          </Text>
                        ))}
                      </VStack>
                    )}
                  </Box>

                  <Box>
                    <SectionTitle>Perfiles de aluminio</SectionTitle>
                    {viewing.perfiles.length === 0 ? (
                      <Text fontSize="sm" color="text.muted">{EMPTY_VALUE}</Text>
                    ) : (
                      <VStack align="start" gap="1">
                        {viewing.perfiles.map((p) => (
                          <Text key={p} fontSize="sm" color="text.heading">
                            {p}
                          </Text>
                        ))}
                      </VStack>
                    )}
                  </Box>

                  <Box>
                    <SectionTitle>Accesorios</SectionTitle>
                    {viewing.accesorios.length === 0 ? (
                      <Text fontSize="sm" color="text.muted">{EMPTY_VALUE}</Text>
                    ) : (
                      <VStack align="stretch" gap="2">
                        {viewing.accesorios.map((a) => (
                          <Box key={`${a.proveedor}-${a.cod}`}>
                            <Text fontSize="sm" color="text.heading" fontFamily="mono">
                              {a.cod}
                            </Text>
                            <Text fontSize="sm" color="text.heading">
                              {a.descripcion}
                            </Text>
                            <Text fontSize="xs" color="text.muted">
                              {a.proveedor}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    )}
                  </Box>

                  <Box>
                    <SectionTitle>Vidrio compatible</SectionTitle>
                    {viewing.vidrio.length === 0 ? (
                      <Text fontSize="sm" color="text.muted">{EMPTY_VALUE}</Text>
                    ) : (
                      <VStack align="start" gap="1">
                        {viewing.vidrio.map((v) => (
                          <Text key={v} fontSize="sm" color="text.heading">
                            {v}
                          </Text>
                        ))}
                      </VStack>
                    )}
                  </Box>

                  <Box>
                    <SectionTitle>Precio</SectionTitle>
                    <Text fontSize="sm" color="text.heading">
                      {viewing.pricePending ? "Precio a definir" : "Precio confirmado"}
                    </Text>
                  </Box>

                  <Box>
                    <SectionTitle>Origen del dato</SectionTitle>
                    <Text fontSize="sm" color="text.heading">
                      {viewing.fuente || EMPTY_VALUE}
                    </Text>
                  </Box>
                </VStack>
              </DialogBody>

              <DialogFooter p={{ base: "3", md: "4" }} borderTop="1px solid" borderColor="border.subtle" bg="bg.subtle">
                <Button variant="outline" borderColor="border.default" onClick={() => setViewing(null)} type="button">
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </DialogRoot>

      <ConfirmDeleteDialog
        isOpen={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Eliminar sistema"
        description={`¿Eliminar el sistema ${deleting?.nombre ?? ""}? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={actionLoading}
      />
    </Box>
  );
};
