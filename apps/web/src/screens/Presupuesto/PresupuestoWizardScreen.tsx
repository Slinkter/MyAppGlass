"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster-instance";
import { useAuth } from "@/features/auth/context/AuthContext";
import { submitQuoteRequest } from "@/features/presupuesto/services/quoteService";
import {
  normalizePhone,
  validateCustomer,
  validateLines,
  type FieldErrors,
} from "@/features/presupuesto/schemas/quote-form-schema";
import { createQuoteLine, parseSystemParam } from "@/features/presupuesto/utils/quoteLines";
import { summarizeQuote } from "@/features/presupuesto/utils/quoteSummary";
import type { QuoteLineInput } from "@/features/presupuesto/types";
import { logger } from "@/shared/utils/logger";
import { LoginRequired } from "./presupuesto/LoginRequired";
import { QuoteLinesPanel } from "./presupuesto/QuoteLinesPanel";
import { QuoteSummaryCard } from "./presupuesto/QuoteSummaryCard";
import { CustomerPanel } from "./presupuesto/CustomerPanel";
import { QuoteSuccess } from "./presupuesto/QuoteSuccess";
import { QuoteSheet } from "./presupuesto/QuoteSheet";
import type { QuoteCustomer } from "./presupuesto/types";

const EMPTY_CUSTOMER: QuoteCustomer = { fullName: "", dniRuc: "", email: "", phone: "", address: "", district: "La Molina" };

export const PresupuestoWizardScreen: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const formattedDate = useMemo(() => new Date().toLocaleDateString("es-PE"), []);

  const [lines, setLines] = useState<QuoteLineInput[]>(() => [createQuoteLine()]);
  const [customer, setCustomer] = useState<QuoteCustomer>(EMPTY_CUSTOMER);
  const [customerErrors, setCustomerErrors] = useState<FieldErrors>({});
  const [lineErrors, setLineErrors] = useState<Record<string, FieldErrors>>({});
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Preselecciona el sistema que llega desde el simulador (/presupuesto?sistema=...).
  useEffect(() => {
    const system = parseSystemParam(new URLSearchParams(window.location.search).get("sistema"));
    if (system) setLines((prev) => prev.map((l, i) => (i === 0 ? { ...l, systemType: system } : l)));
  }, []);

  // Si el usuario está autenticado, autocompletar sus datos del perfil.
  useEffect(() => {
    if (profile) {
      setCustomer({
        fullName: profile.fullName || "",
        dniRuc: profile.dniRuc || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        district: profile.district || "La Molina",
      });
    } else if (user) {
      setCustomer((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [profile, user]);

  // Medidas vacías (NaN) no rompen el resumen en vivo; la validación las bloquea al enviar.
  const summary = useMemo(
    () =>
      summarizeQuote(
        lines.map((l) => ({
          ...l,
          width: Number.isFinite(l.width) ? l.width : 0,
          height: Number.isFinite(l.height) ? l.height : 0,
        })),
      ),
    [lines],
  );

  // Si no está autenticado, bloquear acceso y mostrar pantalla de Login Requerido.
  if (!user && !loading) {
    return <LoginRequired />;
  }

  const handleSubmit = async () => {
    if (saving || quoteNumber) return;
    const cErrors = validateCustomer(customer);
    const lErrors = validateLines(lines);
    setCustomerErrors(cErrors);
    setLineErrors(lErrors);
    if (Object.keys(cErrors).length > 0 || Object.keys(lErrors).length > 0) {
      toaster.create({
        title: "Revisa los datos marcados",
        description: "Corrige los campos indicados para enviar tu solicitud.",
        type: "warning",
      });
      return;
    }

    setSaving(true);
    try {
      const number = await submitQuoteRequest({
        userId: user?.uid ?? "",
        ...customer,
        phone: normalizePhone(customer.phone),
        params: { version: 2, items: lines },
        total: summary.total,
      });
      setQuoteNumber(number);
    } catch (error) {
      logger.error("Error al guardar el presupuesto", error);
      toaster.create({ title: "No se pudo registrar el presupuesto", description: "Inténtalo nuevamente.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleNew = () => {
    setQuoteNumber(null);
    setLines([createQuoteLine()]);
    setLineErrors({});
    setCustomerErrors({});
  };

  return (
    <Box py="8" maxW="1200px" mx="auto" px={{ base: "4", md: "0" }}>
      {/* SECCIÓN INTERACTIVA (Oculta al imprimir) */}
      <Box className="no-print">
        <VStack gap="2" align="start" mb="8">
          <Heading as="h1" size="2xl" color="brand.primary">
            Solicita tu presupuesto
          </Heading>
          <Text color="text.muted">
            Indica qué necesitas, las medidas y tus datos. Verás un precio estimado al instante y lo confirmamos tras una visita técnica sin costo.
          </Text>
        </VStack>

        {quoteNumber ? (
          <QuoteSuccess
            quoteNumber={quoteNumber}
            total={summary.total}
            pricePending={summary.pricePending}
            onPrint={() => window.print()}
            onNew={handleNew}
          />
        ) : (
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8" mb="12">
            <VStack gap="8" align="stretch">
              <QuoteLinesPanel lines={lines} setLines={setLines} errors={lineErrors} />
              <QuoteSummaryCard summary={summary} />
            </VStack>
            <CustomerPanel
              customer={customer}
              setCustomer={setCustomer}
              errors={customerErrors}
              saving={saving}
              onSubmit={handleSubmit}
            />
          </SimpleGrid>
        )}
      </Box>

      {/* HOJA MEMBRETADA FORMAL (Visible en pantalla y al imprimir con @media print) */}
      <QuoteSheet customer={customer} quote={summary} formattedDate={formattedDate} quoteNumber={quoteNumber} />
    </Box>
  );
};
