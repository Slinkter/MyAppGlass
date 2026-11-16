"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import {
  Search,
  UserPlus,
  FileSpreadsheet,
} from "lucide-react";
import { subscribeToClients, addClient, updateClient, setClientActive } from "@/entities/client/api/clientsRepository";
import { clienteCrmSchema } from "@/shared/schemas/presupuesto-schema";
import { ClientCard } from "@/entities/client/ui/ClientCard";
import { NewClientModal } from "@/features/admin/components/clients/NewClientModal";
import { EMPTY_NEW_CLIENT, type NewClientForm } from "@/features/admin/components/clients/newClientForm";
import { ClientProfile } from "@/shared/schemas/ecommerce-schemas";
import { exportToExcel } from "@/shared/utils/excel-export";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { useOrderDraft } from "@/features/admin/context/OrderDraftContext";
import { useRouter } from "next/navigation";
import { logger } from "@/shared/utils/logger";

export const ClientManagementScreen: React.FC = () => {
  const router = useRouter();
  const { setClient } = useOrderDraft();
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal Nuevo Cliente
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newClient, setNewClient] = useState<NewClientForm>(EMPTY_NEW_CLIENT);
  // Cliente en edición (null = alta)
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = subscribeToClients(
        (data) => {
          setClients(data);
          setLoading(false);
        },
        (_error) => {
          logger.warn("Error en listener de clientes en Firestore");
          setClients([]);
          setStatusMessage({
            type: "error",
            text: "No se pudo cargar el directorio de clientes desde Firestore.",
          });
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (_err) {
      logger.warn("No se pudo conectar a colección clientes");
      setLoading(false);
    }
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = searchQuery.toLowerCase();
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.dniRuc.includes(q) ||
        c.phone.includes(q) ||
        (c.email || "").toLowerCase().includes(q) ||
        (c.contactName || "").toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q)
      );
    });
  }, [clients, searchQuery]);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMessage(null);

    const parsed = clienteCrmSchema.safeParse(newClient);
    if (!parsed.success) {
      setStatusMessage({ type: "error", text: parsed.error.issues[0]?.message ?? "Revise los datos del cliente." });
      setActionLoading(false);
      return;
    }
    const { fullName, dniRuc, contactName, phone, email, address, district, notes } = parsed.data;
    const fields = { fullName, dniRuc, contactName, phone, email, address, district, notes };

    try {
      if (editingId) {
        await updateClient(editingId, fields);
        setStatusMessage({ type: "success", text: "Datos del cliente actualizados." });
      } else {
        await addClient({ ...fields, role: "cliente" as const, isActive: true });
        setStatusMessage({ type: "success", text: "Cliente registrado." });
      }
      setTimeout(() => {
        setIsModalOpen(false);
        setEditingId(null);
        setNewClient(EMPTY_NEW_CLIENT);
      }, 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al registrar cliente";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setNewClient(EMPTY_NEW_CLIENT);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (client: ClientProfile) => {
    setEditingId(client.userId);
    setNewClient({
      fullName: client.fullName,
      dniRuc: client.dniRuc,
      phone: client.phone,
      // El correo de relleno del panel anterior no se muestra ni se vuelve a guardar.
      email: /^cliente_\d+@gyacompany\.com$/i.test(client.email || "") ? "" : client.email || "",
      address: client.address,
      district: client.district,
      contactName: client.contactName || "",
      notes: client.notes || "",
    });
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (client: ClientProfile) => {
    try {
      await setClientActive(client.userId, client.isActive === false);
    } catch (err: unknown) {
      logger.warn("No se pudo cambiar el estado del cliente", err);
      setStatusMessage({ type: "error", text: "No se pudo cambiar el estado del cliente. Inténtelo nuevamente." });
    }
  };

  const handleCreateBudgetForClient = (client: ClientProfile) => {
    router.push(`/admin/presupuestos/editor?clienteId=${encodeURIComponent(client.userId)}`);
  };

  const handleCreateSaleForClient = (client: ClientProfile) => {
    setClient({
      id: client.userId,
      name: client.fullName,
      dniRuc: client.dniRuc,
      phone: client.phone,
      address: client.address,
      district: client.district,
    });
    router.push("/admin/ventas");
  };

  const handleExportClients = () => {
    const formatted = clients.map((c) => ({
      "Nombre Completo / Empresa": c.fullName,
      "Contacto": c.contactName || "",
      "Estado": c.isActive === false ? "Inactivo" : "Activo",
      "DNI / RUC": c.dniRuc,
      "Teléfono Celular": c.phone,
      "Correo Electrónico": c.email,
      "Dirección": c.address,
      "Distrito": c.district,
    }));
    exportToExcel(formatted, `GYA_Clientes_${new Date().toISOString().split("T")[0]}`, "Clientes");
  };

  return (
    <Box maxW="84rem" mx="auto" py={{ base: "5", md: "8" }} px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Encabezado */}
      <HStack justify="space-between" align="center" wrap="wrap" gap="4" mb="8">
        <VStack align="start" gap="1">
          <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
            Directorio de Clientes y Empresas
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Administración de clientes habituales, constructoras e instaladores para emisión ágil de órdenes y presupuestos.
          </Text>
        </VStack>

        <HStack gap="3">
          <Button variant="outline" borderRadius="xl" onClick={handleExportClients} size="md">
            <FileSpreadsheet size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            Exportar Excel
          </Button>
          <Button borderRadius="xl" onClick={openCreateModal} size="md">
            <UserPlus size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            Registrar Cliente
          </Button>
        </HStack>
      </HStack>

      {/* Búsqueda */}
      <Box p="4" borderRadius="2xl" bg="surface.card" border="1px solid" borderColor="border.default" mb="6">
        <HStack gap="2">
          <Box color="text.muted" pl="2">
            <Search size={18} style={{ flexShrink: 0 }} />
          </Box>
          <Input
            placeholder="Buscar por nombre, DNI o RUC, contacto, teléfono o distrito..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="subtle"
            size="md"
            borderRadius="xl"
          />
        </HStack>
      </Box>

      {/* Grid de Tarjetas de Clientes */}
      {loading ? (
        <Box p="16" textAlign="center">
          <Spinner size="xl" color="brand.primary" />
          <Text mt="4" color="text.muted" fontSize="sm">
            Cargando directorio de clientes...
          </Text>
        </Box>
      ) : filteredClients.length === 0 ? (
        <Box p="16" textAlign="center" borderRadius="2xl" bg="surface.card" border="1px dashed" borderColor="border.default">
          <Text color="text.muted">No se encontraron clientes coincidentes con la búsqueda.</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "4", md: "6" }}>
          {filteredClients.map((c) => (
            <ClientCard
              key={c.userId || c.dniRuc}
              client={c}
              onCreateSale={handleCreateSaleForClient}
              onCreateBudget={handleCreateBudgetForClient}
              onEdit={openEditModal}
              onToggleActive={handleToggleActive}
            />
          ))}
        </SimpleGrid>
      )}

      {/* Modal Registrar Cliente */}
      {isModalOpen && (
        <NewClientModal
          newClient={newClient}
          onChange={setNewClient}
          onSubmit={handleCreateClient}
          onClose={() => setIsModalOpen(false)}
          actionLoading={actionLoading}
          statusMessage={statusMessage}
          isEditing={Boolean(editingId)}
        />
      )}
    </Box>
  );
};
