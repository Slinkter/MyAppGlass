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
import { subscribeToClients, addClient } from "@/shared/api/firebase/clientsRepository";
import { ClientCard } from "./clients/ClientCard";
import { NewClientModal } from "./clients/NewClientModal";
import { EMPTY_NEW_CLIENT, type NewClientForm } from "./clients/newClientForm";
import { SAMPLE_CLIENTS } from "./clients/sampleClients";
import { ClientProfile } from "@/shared/schemas/ecommerce-schemas";
import { exportToExcel } from "@/shared/utils/excel-export";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { useOrderDraft } from "@/features/products/context/OrderDraftContext";
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

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = subscribeToClients(
        (data) => {
          setClients(data.length > 0 ? data : SAMPLE_CLIENTS);
          setLoading(false);
        },
        (_error) => {
          logger.warn("Error en listener de clientes, usando fallback");
          setClients(SAMPLE_CLIENTS);
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
        c.email.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q)
      );
    });
  }, [clients, searchQuery]);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMessage(null);

    try {
      const created = await addClient({
        fullName: newClient.fullName,
        dniRuc: newClient.dniRuc,
        phone: newClient.phone,
        email: newClient.email || `cliente_${newClient.dniRuc}@gyacompany.com`,
        address: newClient.address,
        district: newClient.district,
        role: "cliente" as const,
      });
      setStatusMessage({ type: "success", text: "Cliente registrado con éxito en Firestore." });
      setClients([...clients, created]);
      setTimeout(() => {
        setIsModalOpen(false);
        setNewClient(EMPTY_NEW_CLIENT);
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al registrar cliente";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setActionLoading(false);
    }
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
      "DNI / RUC": c.dniRuc,
      "Teléfono Celular": c.phone,
      "Correo Electrónico": c.email,
      "Dirección": c.address,
      "Distrito": c.district,
    }));
    exportToExcel(formatted, `GYA_Clientes_${new Date().toISOString().split("T")[0]}`, "Clientes");
  };

  return (
    <Box maxW="1350px" mx="auto" py="8" px={{ base: "4", md: "6" }}>
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
            <FileSpreadsheet size={16} style={{ marginRight: 6 }} />
            Exportar Excel
          </Button>
          <Button colorPalette="cyan" borderRadius="xl" onClick={() => setIsModalOpen(true)} size="md">
            <UserPlus size={16} style={{ marginRight: 6 }} />
            Registrar Cliente
          </Button>
        </HStack>
      </HStack>

      {/* Búsqueda */}
      <Box p="4" borderRadius="2xl" bg="surface.card" border="1px solid" borderColor="border.default" mb="6">
        <HStack gap="2">
          <Box color="text.muted" pl="2">
            <Search size={18} />
          </Box>
          <Input
            placeholder="Buscar cliente por nombre, DNI/RUC, teléfono o distrito..."
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {filteredClients.map((c) => (
            <ClientCard key={c.userId || c.dniRuc} client={c} onCreateSale={handleCreateSaleForClient} />
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
        />
      )}
    </Box>
  );
};
