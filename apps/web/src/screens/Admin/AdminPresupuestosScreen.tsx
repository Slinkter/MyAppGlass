"use client";

/**
 * @file AdminPresupuestosScreen.tsx
 * @description /admin/presupuestos con dos vistas:
 *  - Presupuestos: los formales que arma el admin (PRES-0001, colección `presupuestos`).
 *  - Solicitudes de la web: lo que llega del cotizador público (GYA-AAAA-XXXX).
 */

import React, { useState } from "react";
import Link from "next/link";
import { Box, VStack, HStack, Heading, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { BudgetsPanel } from "./budgets/BudgetsPanel";
import { WebRequestsPanel } from "./budgets/WebRequestsPanel";

type View = "formales" | "solicitudes";

const VIEWS: { id: View; label: string; hint: string }[] = [
  { id: "formales", label: "Presupuestos", hint: "Presupuestos que usted arma para un cliente, con número PRES." },
  { id: "solicitudes", label: "Solicitudes de la web", hint: "Cotizaciones que los clientes generan en el cotizador de la web." },
];

export const AdminPresupuestosScreen: React.FC = () => {
  const [view, setView] = useState<View>("formales");
  const current = VIEWS.find((v) => v.id === view) ?? VIEWS[0];

  return (
    <Box bg="bg.canvas" minH="100dvh" pb="12">
      <AdminNav />
      <Box maxW="pageWide" mx="auto" px={{ base: "4", md: "8" }} pt="8">
        <VStack align="stretch" gap="6">
          <HStack justify="space-between" align="center" flexWrap="wrap" gap="4">
            <VStack align="start" gap="1">
              <Heading as="h1" size="2xl" color="text.heading">
                Presupuestos
              </Heading>
              <Text color="text.muted" fontSize="sm">
                {current.hint}
              </Text>
            </VStack>
            <Button asChild variant="primary" minH="11">
              <Link href="/admin/presupuestos/editor">
                <Plus size={16} style={{ flexShrink: 0, marginRight: 6 }} />
                Nuevo presupuesto
              </Link>
            </Button>
          </HStack>

          <HStack gap="2" wrap="wrap" role="tablist" aria-label="Tipo de presupuesto">
            {VIEWS.map((v) => (
              <Button
                key={v.id}
                role="tab"
                aria-selected={view === v.id}
                variant={view === v.id ? "solid" : "outline"}
                size="sm"
                minH="11"
                borderRadius="xl"
                onClick={() => setView(v.id)}
              >
                {v.label}
              </Button>
            ))}
          </HStack>

          <Box role="tabpanel" aria-label={current.label}>
            {view === "formales" ? <BudgetsPanel /> : <WebRequestsPanel />}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
