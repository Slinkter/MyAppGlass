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
  Badge,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import {
  Search,
  UserPlus,
  Phone,
  MapPin,
  Mail,
  FileSpreadsheet,
  ShoppingCart,
  CheckCircle2,
  X,
  MessageCircle,
} from "lucide-react";
import { collection, addDoc, query, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
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

  const [newClient, setNewClient] = useState({
    fullName: "",
    dniRuc: "",
    phone: "",
    email: "",
    address: "",
    district: "La Molina",
  });

  useEffect(() => {
    setLoading(true);
    try {
      const q = query(collection(db, "clientes"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs.map((docSnap) => ({
              userId: docSnap.id,
              ...docSnap.data(),
            })) as ClientProfile[];
            setClients(data);
          } else {
            setClients([
              {
                userId: "cli_01",
                fullName: "Constructora Los Fresnos S.A.C.",
                dniRuc: "20601542407",
                phone: "974278303",
                email: "compras@losfresnos.pe",
                address: "Av. Los Fresnos 1214",
                district: "La Molina",
                role: "cliente",
              },
              {
                userId: "cli_02",
                fullName: "Arq. María Elena Prado",
                dniRuc: "45879632",
                phone: "996537435",
                email: "obras@pradoarq.pe",
                address: "Calle Los Cedros 340",
                district: "Surco",
                role: "cliente",
              },
            ]);
          }
          setLoading(false);
        },
        (error) => {
          logger.warn("Error en listener de clientes, usando fallback");
          setClients([
            {
              userId: "cli_01",
              fullName: "Constructora Los Fresnos S.A.C.",
              dniRuc: "20601542407",
              phone: "974278303",
              email: "compras@losfresnos.pe",
              address: "Av. Los Fresnos 1214",
              district: "La Molina",
              role: "cliente",
            },
            {
              userId: "cli_02",
              fullName: "Arq. María Elena Prado",
              dniRuc: "45879632",
              phone: "996537435",
              email: "obras@pradoarq.pe",
              address: "Calle Los Cedros 340",
              district: "Surco",
              role: "cliente",
            },
          ]);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
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
      const clientData = {
        fullName: newClient.fullName,
        dniRuc: newClient.dniRuc,
        phone: newClient.phone,
        email: newClient.email || `cliente_${newClient.dniRuc}@gyacompany.com`,
        address: newClient.address,
        district: newClient.district,
        role: "cliente" as const,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "clientes"), clientData);
      setStatusMessage({ type: "success", text: "Cliente registrado con éxito en Firestore." });
      setClients([
        ...clients,
        { userId: docRef.id, ...clientData } as ClientProfile,
      ]);
      setTimeout(() => {
        setIsModalOpen(false);
        setNewClient({
          fullName: "",
          dniRuc: "",
          phone: "",
          email: "",
          address: "",
          district: "La Molina",
        });
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
          {filteredClients.map((c) => {
            const isCompany = c.dniRuc.length === 11;
            const whatsappUrl = `https://wa.me/51${c.phone.replace(/\D/g, "")}`;

            return (
              <Box
                key={c.userId || c.dniRuc}
                p="6"
                borderRadius="2xl"
                bg="surface.card"
                border="1px solid"
                borderColor="border.default"
                backdropFilter="blur(16px)"
                boxShadow="0 6px 24px rgba(0, 0, 0, 0.04)"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="all 0.2s ease"
                _hover={{ borderColor: "rgba(56, 189, 248, 0.4)", transform: "translateY(-2px)" }}
              >
                <VStack align="start" gap="3">
                  <HStack justify="space-between" w="full">
                    <Badge
                      variant="subtle"
                      size="sm"
                      borderRadius="md"
                      bg={isCompany ? "rgba(167, 139, 250, 0.1)" : "rgba(56, 189, 248, 0.1)"}
                      color={isCompany ? "#a78bfa" : "#38bdf8"}
                    >
                      {isCompany ? "Empresa / RUC" : "Persona Natural"}
                    </Badge>
                    <Text fontSize="2xs" color="text.muted" fontFamily="mono">
                      {c.dniRuc}
                    </Text>
                  </HStack>

                  <VStack align="start" gap="0">
                    <Heading size="md" color="text.heading">
                      {c.fullName}
                    </Heading>
                    <Text fontSize="xs" color="text.muted">
                      {c.district}
                    </Text>
                  </VStack>

                  <VStack align="start" gap="2" pt="2" fontSize="xs" color="text.muted" w="full">
                    <HStack justify="space-between" w="full">
                      <HStack gap="2">
                        <Phone size={14} color="#38bdf8" />
                        <Text>{c.phone}</Text>
                      </HStack>
                      {c.phone && (
                        <Button
                          asChild
                          size="2xs"
                          variant="ghost"
                          colorPalette="green"
                        >
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={12} style={{ marginRight: 4 }} />
                            WhatsApp
                          </a>
                        </Button>
                      )}
                    </HStack>

                    <HStack gap="2">
                      <Mail size={14} color="#818cf8" />
                      <Text truncate maxW="200px">{c.email}</Text>
                    </HStack>
                    <HStack gap="2">
                      <MapPin size={14} color="#34d399" />
                      <Text truncate maxW="220px">{c.address}</Text>
                    </HStack>
                  </VStack>
                </VStack>

                <Box pt="6" w="full">
                  <Button
                    colorPalette="cyan"
                    variant="subtle"
                    size="sm"
                    borderRadius="xl"
                    w="full"
                    onClick={() => handleCreateSaleForClient(c)}
                  >
                    <ShoppingCart size={14} style={{ marginRight: 6 }} />
                    Emitir Venta a este Cliente
                  </Button>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      )}

      {/* Modal Registrar Cliente */}
      {isModalOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.75)"
          backdropFilter="blur(12px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1000"
          p="4"
        >
          <Box
            as="form"
            onSubmit={handleCreateClient}
            bg="surface.card"
            p="7"
            borderRadius="2xl"
            maxW="520px"
            w="full"
            border="1px solid"
            borderColor="border.default"
            boxShadow="0 25px 50px rgba(0, 0, 0, 0.5)"
          >
            <HStack justify="space-between" mb="5">
              <Heading size="md" color="text.heading">
                Registrar Nuevo Cliente / Empresa
              </Heading>
              <Button size="xs" variant="ghost" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </Button>
            </HStack>

            <VStack align="stretch" gap="3.5">
              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Nombre Completo / Razón Social: *
                </Text>
                <Input
                  required
                  borderRadius="xl"
                  placeholder="ej. Constructora Los Fresnos S.A.C."
                  value={newClient.fullName}
                  onChange={(e) => setNewClient({ ...newClient, fullName: e.target.value })}
                />
              </VStack>

              <SimpleGrid columns={2} gap="3">
                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    DNI o RUC: *
                  </Text>
                  <Input
                    required
                    borderRadius="xl"
                    placeholder="8 u 11 dígitos"
                    value={newClient.dniRuc}
                    onChange={(e) => setNewClient({ ...newClient, dniRuc: e.target.value })}
                  />
                </VStack>

                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Teléfono Celular: *
                  </Text>
                  <Input
                    required
                    borderRadius="xl"
                    placeholder="974278303"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                </VStack>
              </SimpleGrid>

              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Correo Electrónico:
                </Text>
                <Input
                  type="email"
                  borderRadius="xl"
                  placeholder="contacto@empresa.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                />
              </VStack>

              <SimpleGrid columns={2} gap="3">
                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Dirección: *
                  </Text>
                  <Input
                    required
                    borderRadius="xl"
                    placeholder="Av. Los Fresnos 1214"
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  />
                </VStack>

                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Distrito: *
                  </Text>
                  <Input
                    required
                    borderRadius="xl"
                    placeholder="La Molina"
                    value={newClient.district}
                    onChange={(e) => setNewClient({ ...newClient, district: e.target.value })}
                  />
                </VStack>
              </SimpleGrid>

              {statusMessage && (
                <Box
                  p="3"
                  borderRadius="xl"
                  bg={statusMessage.type === "success" ? "rgba(52, 211, 153, 0.1)" : "rgba(239, 68, 68, 0.1)"}
                  color={statusMessage.type === "success" ? "#34d399" : "#f87171"}
                  border={`1px solid ${statusMessage.type === "success" ? "rgba(52, 211, 153, 0.25)" : "rgba(239, 68, 68, 0.25)"}`}
                  fontSize="xs"
                >
                  {statusMessage.text}
                </Box>
              )}

              <HStack justify="end" gap="2" pt="2">
                <Button variant="outline" size="sm" borderRadius="xl" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button colorPalette="cyan" size="sm" borderRadius="xl" type="submit" loading={actionLoading}>
                  <CheckCircle2 size={16} style={{ marginRight: 6 }} />
                  Guardar Cliente
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};
