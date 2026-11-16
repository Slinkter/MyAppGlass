"use client";

/**
 * @file BudgetsPanel.tsx
 * @description Listado de presupuestos formales (PRES-0001) con búsqueda y filtro por estado.
 */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Box, HStack, Input, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { FileText, Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { logger } from "@/shared/utils/logger";
import { formatSoles } from "@/entities/quote";
import {
  BudgetStatusBadge,
  ESTADO_PRESUPUESTO_LABELS,
  formatBudgetDate,
  isBudgetExpired,
  subscribeToBudgets,
  type EstadoPresupuesto,
  type Presupuesto,
} from "@/entities/budget";

type StatusFilter = "todos" | EstadoPresupuesto;

const FILTERS: StatusFilter[] = ["todos", "borrador", "enviado", "aprobado", "rechazado"];
const filterLabel = (f: StatusFilter) => (f === "todos" ? "Todos" : ESTADO_PRESUPUESTO_LABELS[f]);

export const BudgetsPanel: React.FC = () => {
  const [budgets, setBudgets] = useState<Presupuesto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("todos");

  useEffect(() => {
    const unsubscribe = subscribeToBudgets(
      (data) => {
        setBudgets(data);
        setError(null);
        setLoading(false);
      },
      (err) => {
        logger.warn("No se pudo leer el listado de presupuestos", err);
        setError("No se pudo cargar el listado. Revise su conexión o vuelva a iniciar sesión.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return budgets.filter((b) => {
      if (status !== "todos" && b.estado !== status) return false;
      if (!term) return true;
      return (
        b.numero.toLowerCase().includes(term) ||
        b.cliente.fullName.toLowerCase().includes(term) ||
        b.cliente.dniRuc.includes(term)
      );
    });
  }, [budgets, search, status]);

  return (
    <VStack align="stretch" gap="5">
      <HStack gap="3" wrap="wrap" justify="space-between">
        <HStack flex="1" minW="64" maxW="450px" bg="bg.panel" px="3" py="2" borderRadius="xl" border="1px solid" borderColor="border.subtle">
          <Search size={18} color="var(--chakra-colors-text-muted)" style={{ flexShrink: 0 }} />
          <Input
            aria-label="Buscar presupuesto"
            placeholder="Buscar por número, cliente, DNI o RUC"
            variant="subtle"
            size="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </HStack>

        <HStack gap="1.5" wrap="wrap" role="group" aria-label="Filtrar por estado">
          {FILTERS.map((f) => (
            <Button
              key={f}
              size="sm"
              minH="11"
              borderRadius="lg"
              variant={status === f ? "solid" : "ghost"}
              aria-pressed={status === f}
              onClick={() => setStatus(f)}
            >
              {filterLabel(f)}
            </Button>
          ))}
        </HStack>
      </HStack>

      {loading ? (
        <HStack justify="center" py="16">
          <Spinner size="lg" color="brand.primary" />
        </HStack>
      ) : error ? (
        <Box role="alert" bg="bg.panel" p="6" borderRadius="2xl" border="1px solid" borderColor="border.subtle">
          <Text color="text.heading">{error}</Text>
        </Box>
      ) : filtered.length === 0 ? (
        <Box bg="bg.panel" p="8" borderRadius="2xl" border="1px solid" borderColor="border.subtle" textAlign="center">
          <FileText size={40} style={{ margin: "0 auto", color: "var(--chakra-colors-text-muted)" }} />
          <Text mt="3" fontWeight="medium" color="text.heading">
            {budgets.length === 0 ? "Aún no hay presupuestos" : "Ningún presupuesto coincide"}
          </Text>
          <Text fontSize="sm" color="text.muted">
            {budgets.length === 0 ? "Cree el primero con «Nuevo presupuesto»." : "Pruebe con otro número, cliente o estado."}
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
          {filtered.map((b) => (
            <Box
              key={b.numero}
              asChild
              bg="bg.panel"
              p="5"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border.subtle"
              boxShadow="cardLift"
              transition="border-color 0.2s ease"
              _hover={{ borderColor: "border.strong" }}
            >
              <Link href={`/admin/presupuestos/ver?numero=${encodeURIComponent(b.numero)}`}>
                <VStack align="stretch" gap="3">
                  <HStack justify="space-between" align="center" gap="2" wrap="wrap">
                    <Text fontWeight="bold" color="text.heading" fontFamily="mono">
                      {b.numero}
                    </Text>
                    <BudgetStatusBadge estado={b.estado} expired={isBudgetExpired(b)} />
                  </HStack>

                  <VStack align="start" gap="0.5">
                    <Text fontWeight="bold" color="text.heading" lineClamp={2}>
                      {b.cliente.fullName}
                    </Text>
                    <Text fontSize="sm" color="text.muted">
                      {b.items.length} {b.items.length === 1 ? "ítem" : "ítems"} · {formatBudgetDate(b.createdAt)}
                    </Text>
                  </VStack>

                  <HStack justify="space-between" align="baseline" pt="3" borderTop="1px solid" borderColor="border.subtle">
                    <Text fontSize="xs" color="text.muted">
                      Total con IGV
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="text.heading" css={{ fontVariantNumeric: "tabular-nums" }}>
                      {formatSoles(b.total)}
                    </Text>
                  </HStack>
                </VStack>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
