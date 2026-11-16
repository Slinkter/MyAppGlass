"use client";

/**
 * @file WebRequestsPanel.tsx
 * @description Solicitudes que llegan del cotizador público (/presupuesto, correlativo GYA-AAAA-XXXX).
 * Es el listado que antes ocupaba toda la pantalla /admin/presupuestos.
 */

import React, { useState, useEffect, useMemo } from "react";
import { Box, VStack, HStack, Text, Input, SimpleGrid, Spinner, Badge } from "@chakra-ui/react";
import { Search, Calculator, Phone, User } from "lucide-react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { formatSoles } from "@/entities/quote";

export interface PresupuestoSolicitadoDoc {
  id: string;
  number: string;
  fullName: string;
  phone: string;
  total: number;
  status: string;
  createdAt?: { seconds: number };
  params?: {
    version: number;
    category?: string;
    system?: string;
    items?: unknown[];
  };
}

export const WebRequestsPanel: React.FC = () => {
  const [presupuestos, setPresupuestos] = useState<PresupuestoSolicitadoDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "presupuestos_solicitados"), orderBy("createdAt", "desc"), limit(50));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: PresupuestoSolicitadoDoc[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<PresupuestoSolicitadoDoc, "id">),
        }));
        setPresupuestos(docs);
        setLoading(false);
      },
      () => {
        setPresupuestos([]);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return presupuestos;
    return presupuestos.filter((p) => {
      const matchName = p.fullName?.toLowerCase().includes(term);
      const matchPhone = p.phone?.includes(term);
      const matchNumber = p.number?.toLowerCase().includes(term);
      return matchName || matchPhone || matchNumber;
    });
  }, [presupuestos, searchQuery]);

  return (
    <VStack align="stretch" gap="6">
      <Box maxW="450px">
        <HStack bg="bg.panel" px="3" py="2" borderRadius="xl" border="1px solid" borderColor="border.subtle">
          <Search size={18} color="var(--chakra-colors-text-muted)" />
          <Input
            aria-label="Buscar solicitud"
            placeholder="Buscar por cliente, celular o número..."
            variant="subtle"
            size="sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </HStack>
      </Box>

      {loading ? (
        <HStack justify="center" py="16">
          <Spinner size="lg" color="brand.coral" />
        </HStack>
      ) : filtered.length === 0 ? (
        <Box bg="bg.panel" p="8" borderRadius="2xl" border="1px solid" borderColor="border.subtle" textAlign="center">
          <Calculator size={40} style={{ margin: "0 auto", color: "var(--chakra-colors-text-muted)" }} />
          <Text mt="3" fontWeight="medium" color="text.heading">
            No se encontraron presupuestos
          </Text>
          <Text fontSize="sm" color="text.muted">
            {searchQuery ? "Intente con otro nombre o celular." : "Aún no hay solicitudes registradas."}
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
          {filtered.map((p) => (
            <Box
              key={p.id}
              bg="bg.panel"
              p="5"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border.subtle"
              boxShadow="cardLift"
            >
              <VStack align="stretch" gap="3">
                <HStack justify="space-between" align="center">
                  <Badge colorPalette="teal" variant="subtle">
                    {p.number}
                  </Badge>
                  <Badge colorPalette="orange" variant="outline">
                    {p.status}
                  </Badge>
                </HStack>

                <VStack align="start" gap="1" pt="1">
                  <HStack gap="2">
                    <User size={16} color="var(--chakra-colors-text-muted)" />
                    <Text fontWeight="bold" fontSize="md" color="text.heading">
                      {p.fullName || "Cliente"}
                    </Text>
                  </HStack>
                  <HStack gap="2">
                    <Phone size={16} color="var(--chakra-colors-text-muted)" />
                    <Text fontSize="sm" color="text.muted">
                      {p.phone || "—"}
                    </Text>
                  </HStack>
                </VStack>

                <HStack justify="space-between" align="baseline" pt="3" borderTop="1px solid" borderColor="border.subtle">
                  <Text fontSize="xs" color="text.muted">
                    Total cotizado:
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="brand.coral">
                    {formatSoles(p.total || 0)}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
