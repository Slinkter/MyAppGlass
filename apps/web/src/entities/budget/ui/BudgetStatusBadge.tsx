"use client";

import React from "react";
import { HStack } from "@chakra-ui/react";
import { Badge, type BadgeVariant } from "@/shared/ui/badge";
import { ESTADO_PRESUPUESTO_LABELS, type EstadoPresupuesto } from "../model";

const VARIANT_BY_STATUS: Record<EstadoPresupuesto, BadgeVariant> = {
  borrador: "neutral",
  enviado: "info",
  aprobado: "success",
  rechazado: "danger",
};

interface BudgetStatusBadgeProps {
  estado: EstadoPresupuesto;
  /** Enviado y con la validez vencida. */
  expired?: boolean;
}

/** Estado del presupuesto formal; el texto acompaña siempre al color. */
export const BudgetStatusBadge: React.FC<BudgetStatusBadgeProps> = ({ estado, expired = false }) => (
  <HStack gap="1.5" wrap="wrap">
    <Badge variant={VARIANT_BY_STATUS[estado]}>{ESTADO_PRESUPUESTO_LABELS[estado]}</Badge>
    {expired && <Badge variant="warning">Vencido</Badge>}
  </HStack>
);
