"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Box, HStack, Heading, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { Search, UserRound } from "lucide-react";
import { Button } from "@/shared/ui/button";
import type { ClientProfile } from "@/entities/client";

interface BudgetClientPickerProps {
  clients: ClientProfile[];
  loading: boolean;
  selectedId: string;
  onSelect: (clientId: string) => void;
}

const MAX_RESULTS = 8;

/** Paso 1 del presupuesto: elegir un cliente activo del directorio. */
export const BudgetClientPicker: React.FC<BudgetClientPickerProps> = ({ clients, loading, selectedId, onSelect }) => {
  const [search, setSearch] = useState("");

  const selected = useMemo(() => clients.find((c) => c.userId === selectedId) ?? null, [clients, selectedId]);

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    return clients
      .filter((c) => c.isActive !== false)
      .filter(
        (c) =>
          !q ||
          c.fullName.toLowerCase().includes(q) ||
          c.dniRuc.includes(q) ||
          (c.contactName || "").toLowerCase().includes(q) ||
          (c.phone || "").includes(q)
      )
      .slice(0, MAX_RESULTS);
  }, [clients, search]);

  return (
    <Box p={{ base: "4", md: "6" }} borderRadius="2xl" bg="surface.card" border="1px solid" borderColor="border.default">
      <HStack gap="2.5" mb="4">
        <Box p="2" borderRadius="lg" bg="bg.subtle" color="text.heading">
          <UserRound size={18} style={{ flexShrink: 0 }} />
        </Box>
        <Heading as="h2" size="md" color="text.heading">
          1. Cliente
        </Heading>
      </HStack>

      {selected ? (
        <HStack justify="space-between" align="start" gap="3" wrap="wrap">
          <VStack align="start" gap="0.5" minW="0">
            <Text fontWeight="bold" color="text.heading">
              {selected.fullName}
            </Text>
            <Text fontSize="sm" color="text.muted">
              {selected.dniRuc.length === 11 ? "RUC" : "DNI"} {selected.dniRuc}
              {selected.contactName ? ` · Contacto: ${selected.contactName}` : ""}
            </Text>
            <Text fontSize="sm" color="text.muted">
              {[selected.address, selected.district].filter(Boolean).join(", ")}
            </Text>
            {selected.isActive === false && (
              <Text fontSize="sm" color="status.dangerText">
                Este cliente está desactivado. Actívelo en Clientes o elija otro.
              </Text>
            )}
          </VStack>
          <Button variant="outline" size="sm" minH="11" onClick={() => onSelect("")}>
            Cambiar cliente
          </Button>
        </HStack>
      ) : loading ? (
        <HStack py="6" justify="center">
          <Spinner color="brand.primary" />
        </HStack>
      ) : (
        <VStack align="stretch" gap="3">
          <HStack gap="2">
            <Box color="text.muted">
              <Search size={18} style={{ flexShrink: 0 }} />
            </Box>
            <Input
              aria-label="Buscar cliente"
              placeholder="Buscar por nombre, DNI o RUC, contacto o teléfono"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="md"
              borderRadius="xl"
            />
          </HStack>

          {matches.length === 0 ? (
            <Text fontSize="sm" color="text.muted">
              No hay clientes activos con ese dato.
            </Text>
          ) : (
            <VStack align="stretch" gap="1.5">
              {matches.map((c) => (
                <Button
                  key={c.userId}
                  variant="outline"
                  justifyContent="space-between"
                  h="auto"
                  minH="11"
                  py="2"
                  px="3"
                  borderRadius="xl"
                  onClick={() => onSelect(c.userId)}
                >
                  <Text as="span" textAlign="left" fontWeight="600" lineClamp={1}>
                    {c.fullName}
                  </Text>
                  <Text as="span" fontSize="xs" color="text.muted" flexShrink={0}>
                    {c.dniRuc}
                  </Text>
                </Button>
              ))}
            </VStack>
          )}

          <Text fontSize="sm" color="text.muted">
            ¿No está en la lista?{" "}
            <Link href="/admin/clientes" style={{ textDecoration: "underline" }}>
              Regístrelo en Clientes
            </Link>{" "}
            y vuelva aquí.
          </Text>
        </VStack>
      )}
    </Box>
  );
};
