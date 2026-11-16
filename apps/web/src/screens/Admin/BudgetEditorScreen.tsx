"use client";

/**
 * @file BudgetEditorScreen.tsx
 * @description Alta y edición del presupuesto formal (PRES-0001). Se elige el cliente, se agregan
 * productos y servicios y se guarda como borrador. Los totales y el número los fija la Cloud
 * Function `guardarPresupuesto`; lo que se ve aquí mientras se edita es una vista previa.
 */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, HStack, Heading, Input, SimpleGrid, Spinner, Text, Textarea, VStack } from "@chakra-ui/react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { logger } from "@/shared/utils/logger";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { subscribeToClients, type ClientProfile } from "@/entities/client";
import { useRealtimeProducts } from "@/entities/product";
import {
  BudgetTotals,
  VALIDEZ_DIAS_DEFECTO,
  budgetErrorMessage,
  getBudget,
  guardarPresupuestoInputSchema,
  saveBudget,
} from "@/entities/budget";
import { BudgetClientPicker } from "@/features/admin/components/budgets/BudgetClientPicker";
import { BudgetItemsEditor } from "@/features/admin/components/budgets/BudgetItemsEditor";
import {
  budgetToLines,
  previewTotals,
  toSaveInput,
  type BudgetLineDraft,
} from "@/features/admin/components/budgets/budgetForm";

interface BudgetEditorScreenProps {
  /** Número del borrador a editar; sin él se crea uno nuevo. */
  numero?: string;
  /** Cliente preseleccionado al llegar desde /admin/clientes. */
  initialClienteId?: string;
}

const detailHref = (numero: string) => `/admin/presupuestos/ver?numero=${encodeURIComponent(numero)}`;

export const BudgetEditorScreen: React.FC<BudgetEditorScreenProps> = ({ numero, initialClienteId = "" }) => {
  const router = useRouter();
  const { products, loading: loadingProducts } = useRealtimeProducts();

  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);

  const [clienteId, setClienteId] = useState(initialClienteId);
  const [lines, setLines] = useState<BudgetLineDraft[]>([]);
  const [validezDias, setValidezDias] = useState(String(VALIDEZ_DIAS_DEFECTO));
  const [notas, setNotas] = useState("");

  const [loadingBudget, setLoadingBudget] = useState(Boolean(numero));
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToClients(
      (data) => {
        setClients(data);
        setLoadingClients(false);
      },
      (error) => {
        logger.warn("No se pudo cargar el directorio de clientes", error);
        setLoadingClients(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Edición: carga el borrador una sola vez (no en tiempo real, para no pisar lo que se escribe).
  useEffect(() => {
    if (!numero) return;
    let cancelled = false;
    getBudget(numero)
      .then((budget) => {
        if (cancelled) return;
        if (!budget) {
          setLoadError(`No existe el presupuesto ${numero}.`);
        } else if (budget.estado !== "borrador") {
          router.replace(detailHref(numero));
          return;
        } else {
          setClienteId(budget.clienteId);
          setLines(budgetToLines(budget));
          setValidezDias(String(budget.validezDias));
          setNotas(budget.notas ?? "");
        }
        setLoadingBudget(false);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        logger.warn("No se pudo cargar el presupuesto", error);
        setLoadError("No se pudo cargar el presupuesto. Revise su conexión e inténtelo nuevamente.");
        setLoadingBudget(false);
      });
    return () => {
      cancelled = true;
    };
  }, [numero, router]);

  const totals = useMemo(() => previewTotals(lines), [lines]);

  const handleSave = async () => {
    setFormError(null);
    const input = toSaveInput({ numero, clienteId, lines, validezDias, notas });
    const parsed = guardarPresupuestoInputSchema.safeParse(input);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const lineIndex = issue?.path[0] === "items" && typeof issue.path[1] === "number" ? issue.path[1] + 1 : null;
      const field = issue?.path[2];
      const detail =
        field === "cantidad"
          ? "escriba una cantidad mayor a 0"
          : field === "precioUnitario"
            ? "escriba el precio unitario"
            : issue?.message ?? "revise los datos";
      setFormError(lineIndex ? `Ítem ${lineIndex}: ${detail}.` : issue?.message ?? "Revise los datos del presupuesto.");
      return;
    }
    if (totals.total <= 0) {
      setFormError("El total debe ser mayor a 0. Revise los precios.");
      return;
    }

    setSaving(true);
    try {
      const saved = await saveBudget(input);
      router.push(detailHref(saved.numero));
    } catch (error: unknown) {
      logger.warn("No se pudo guardar el presupuesto", error);
      setFormError(budgetErrorMessage(error));
      setSaving(false);
    }
  };

  return (
    <Box maxW="84rem" mx="auto" py={{ base: "5", md: "8" }} px={{ base: "4", md: "6" }}>
      <AdminNav />

      <VStack align="start" gap="1" mb="6">
        <Button asChild variant="ghost" size="sm" minH="11" px="0">
          <Link href={numero ? detailHref(numero) : "/admin/presupuestos"}>
            <ArrowLeft size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            {numero ? `Volver a ${numero}` : "Volver a presupuestos"}
          </Link>
        </Button>
        <Heading as="h1" size="2xl" color="text.heading" letterSpacing="-0.02em">
          {numero ? `Editar ${numero}` : "Nuevo presupuesto"}
        </Heading>
        <Text color="text.muted" fontSize="sm">
          {numero
            ? "Mientras esté en borrador puede cambiar el cliente, los ítems y la validez."
            : "Se guarda como borrador y recibe su número al guardar. Luego podrá enviarlo y generar el PDF."}
        </Text>
      </VStack>

      {loadingBudget ? (
        <HStack justify="center" py="16">
          <Spinner size="lg" color="brand.primary" />
        </HStack>
      ) : loadError ? (
        <Box p="6" borderRadius="2xl" bg="surface.card" border="1px solid" borderColor="border.default" role="alert">
          <Text color="text.heading" fontWeight="600">
            {loadError}
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: "4", md: "6" }} alignItems="start">
          <VStack align="stretch" gap={{ base: "4", md: "6" }} gridColumn={{ lg: "span 2" }}>
            <BudgetClientPicker clients={clients} loading={loadingClients} selectedId={clienteId} onSelect={setClienteId} />
            <BudgetItemsEditor lines={lines} onChange={setLines} products={products} loadingProducts={loadingProducts} />
          </VStack>

          <Box
            p={{ base: "4", md: "6" }}
            borderRadius="2xl"
            bg="surface.card"
            border="1px solid"
            borderColor="border.default"
            position={{ lg: "sticky" }}
            top={{ lg: "6" }}
          >
            <Heading as="h2" size="md" color="text.heading" mb="4">
              3. Condiciones y total
            </Heading>

            <VStack align="stretch" gap="4">
              <Field label="Validez (días)" helperText="Cuenta desde el día en que marque el presupuesto como enviado.">
                <Input
                  inputMode="numeric"
                  value={validezDias}
                  onChange={(e) => setValidezDias(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  borderRadius="xl"
                />
              </Field>

              <Field label="Notas para el cliente" optionalText=" (opcional)">
                <Textarea
                  value={notas}
                  maxLength={1000}
                  rows={4}
                  placeholder="ej. Medidas por confirmar en obra."
                  onChange={(e) => setNotas(e.target.value)}
                  borderRadius="xl"
                />
              </Field>

              <BudgetTotals subtotal={totals.subtotal} igv={totals.igv} total={totals.total} preview />

              {formError && (
                <Box
                  role="alert"
                  p="3"
                  borderRadius="xl"
                  bg="status.dangerSoft"
                  color="status.dangerText"
                  border="1px solid"
                  borderColor="status.dangerBorder"
                  fontSize="sm"
                >
                  {formError}
                </Box>
              )}

              <Button variant="primary" size="lg" w="full" minH="12" loading={saving} onClick={handleSave}>
                <Save size={18} style={{ flexShrink: 0, marginRight: 8 }} />
                {numero ? "Guardar cambios" : "Guardar borrador"}
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      )}
    </Box>
  );
};
