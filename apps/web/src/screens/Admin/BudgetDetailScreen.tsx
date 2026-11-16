"use client";

/**
 * @file BudgetDetailScreen.tsx
 * @description Detalle del presupuesto formal: datos, cambio de estado y PDF archivado.
 * Todas las escrituras pasan por las Cloud Functions; la pantalla solo lee en tiempo real.
 */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Box, HStack, Heading, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft, Check, Download, FileText, Pencil, Send, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { logger } from "@/shared/utils/logger";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { formatSoles } from "@/entities/quote";
import {
  BudgetStatusBadge,
  BudgetTotals,
  UNIDAD_LABELS,
  budgetErrorMessage,
  changeBudgetStatus,
  formatBudgetDate,
  generateBudgetPdf,
  getBudgetPdfUrl,
  isBudgetExpired,
  subscribeToBudget,
  toDate,
  type Presupuesto,
} from "@/entities/budget";

interface BudgetDetailScreenProps {
  numero: string;
}

type NextStatus = "enviado" | "aprobado" | "rechazado";

const CONFIRM_COPY: Record<NextStatus, { title: string; description: string; confirmLabel: string }> = {
  enviado: {
    title: "Marcar como enviado",
    description: "Desde este momento corre la validez y el presupuesto ya no se podrá editar. Hágalo cuando se lo haya entregado al cliente.",
    confirmLabel: "Marcar enviado",
  },
  aprobado: {
    title: "Marcar como aprobado",
    description: "Confirme que el cliente aceptó el presupuesto. Este estado es definitivo.",
    confirmLabel: "Marcar aprobado",
  },
  rechazado: {
    title: "Marcar como rechazado",
    description: "Confirme que el cliente no aceptó el presupuesto. Este estado es definitivo.",
    confirmLabel: "Marcar rechazado",
  },
};

const cardProps = {
  p: { base: "4", md: "6" },
  borderRadius: "2xl",
  bg: "surface.card",
  border: "1px solid",
  borderColor: "border.default",
} as const;

export const BudgetDetailScreen: React.FC<BudgetDetailScreenProps> = ({ numero }) => {
  const [budget, setBudget] = useState<Presupuesto | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [pendingStatus, setPendingStatus] = useState<NextStatus | null>(null);
  const [busy, setBusy] = useState<"status" | "pdf" | "download" | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToBudget(
      numero,
      (data) => {
        setBudget(data);
        setLoadError(data ? null : `No existe el presupuesto ${numero}.`);
        setLoading(false);
      },
      (error) => {
        logger.warn("No se pudo leer el presupuesto", error);
        setLoadError("No se pudo cargar el presupuesto. Revise su conexión e inténtelo nuevamente.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [numero]);

  const handleConfirmStatus = async () => {
    if (!pendingStatus) return;
    setBusy("status");
    setMessage(null);
    try {
      await changeBudgetStatus({ numero, estado: pendingStatus });
      setMessage({ type: "success", text: "Estado actualizado." });
    } catch (error: unknown) {
      logger.warn("No se pudo cambiar el estado del presupuesto", error);
      setMessage({ type: "error", text: budgetErrorMessage(error) });
    } finally {
      setBusy(null);
      setPendingStatus(null);
    }
  };

  const handleGeneratePdf = async () => {
    setBusy("pdf");
    setMessage(null);
    try {
      await generateBudgetPdf(numero);
      setMessage({ type: "success", text: "PDF generado y archivado. Ya puede descargarlo." });
    } catch (error: unknown) {
      logger.warn("No se pudo generar el PDF", error);
      setMessage({ type: "error", text: budgetErrorMessage(error) });
    } finally {
      setBusy(null);
    }
  };

  const handleDownloadPdf = async () => {
    if (!budget?.pdf?.path) return;
    setBusy("download");
    setMessage(null);
    try {
      const url = await getBudgetPdfUrl(budget.pdf.path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error: unknown) {
      logger.warn("No se pudo obtener el enlace del PDF", error);
      setMessage({ type: "error", text: "No se pudo abrir el PDF. Genérelo otra vez e inténtelo nuevamente." });
    } finally {
      setBusy(null);
    }
  };

  const expired = budget ? isBudgetExpired(budget) : false;
  // El PDF quedó atrás si el presupuesto cambió después de generarlo (se editó o cambió de estado).
  const pdfDate = toDate(budget?.pdf?.generadoEl);
  const updatedDate = toDate(budget?.updatedAt);
  const pdfOutdated = Boolean(pdfDate && updatedDate && updatedDate.getTime() > pdfDate.getTime());

  return (
    <Box maxW="84rem" mx="auto" py={{ base: "5", md: "8" }} px={{ base: "4", md: "6" }}>
      <AdminNav />

      <Button asChild variant="ghost" size="sm" minH="11" px="0" mb="2">
        <Link href="/admin/presupuestos">
          <ArrowLeft size={16} style={{ flexShrink: 0, marginRight: 6 }} />
          Volver a presupuestos
        </Link>
      </Button>

      {loading ? (
        <HStack justify="center" py="16">
          <Spinner size="lg" color="brand.primary" />
        </HStack>
      ) : !budget ? (
        <Box {...cardProps} role="alert">
          <Text color="text.heading" fontWeight="600">
            {loadError}
          </Text>
        </Box>
      ) : (
        <>
          <HStack justify="space-between" align="start" wrap="wrap" gap="3" mb="6">
            <VStack align="start" gap="2">
              <Heading as="h1" size="2xl" color="text.heading" letterSpacing="-0.02em">
                {budget.numero}
              </Heading>
              <BudgetStatusBadge estado={budget.estado} expired={expired} />
            </VStack>
            {budget.estado === "borrador" && (
              <Button asChild variant="outline" minH="11">
                <Link href={`/admin/presupuestos/editor?numero=${encodeURIComponent(budget.numero)}`}>
                  <Pencil size={16} style={{ flexShrink: 0, marginRight: 6 }} />
                  Editar borrador
                </Link>
              </Button>
            )}
          </HStack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: "4", md: "6" }} alignItems="start">
            <VStack align="stretch" gap={{ base: "4", md: "6" }} gridColumn={{ lg: "span 2" }}>
              {/* Cliente */}
              <Box {...cardProps}>
                <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="2">
                  Cliente
                </Text>
                <Text fontWeight="bold" fontSize="lg" color="text.heading">
                  {budget.cliente.fullName}
                </Text>
                <VStack align="start" gap="0.5" mt="1" fontSize="sm" color="text.muted">
                  <Text>
                    {budget.cliente.dniRuc.length === 11 ? "RUC" : "DNI"} {budget.cliente.dniRuc}
                  </Text>
                  {budget.cliente.contactName && <Text>Contacto: {budget.cliente.contactName}</Text>}
                  {(budget.cliente.phone || budget.cliente.email) && (
                    <Text>{[budget.cliente.phone, budget.cliente.email].filter(Boolean).join(" · ")}</Text>
                  )}
                  <Text>{[budget.cliente.address, budget.cliente.district].filter(Boolean).join(", ")}</Text>
                </VStack>
              </Box>

              {/* Ítems */}
              <Box {...cardProps}>
                <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="3">
                  Productos y servicios
                </Text>
                <VStack align="stretch" gap="0" css={{ fontVariantNumeric: "tabular-nums" }}>
                  {budget.items.map((item, index) => (
                    <HStack
                      key={`${index}-${item.descripcion}`}
                      justify="space-between"
                      align="start"
                      gap="3"
                      py="3"
                      borderTop={index === 0 ? "none" : "1px solid"}
                      borderColor="border.default"
                    >
                      <VStack align="start" gap="0.5" minW="0">
                        <Text fontWeight="600" color="text.heading">
                          {item.descripcion}
                        </Text>
                        <Text fontSize="sm" color="text.muted">
                          {item.cantidad} {UNIDAD_LABELS[item.unidad]} × {formatSoles(item.precioUnitario)}
                          {item.sku ? ` · ${item.sku}` : ""}
                        </Text>
                      </VStack>
                      <Text fontWeight="600" color="text.heading" flexShrink={0}>
                        {formatSoles(item.importe)}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {budget.notas && (
                <Box {...cardProps}>
                  <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="2">
                    Notas para el cliente
                  </Text>
                  <Text fontSize="sm" color="text.heading" whiteSpace="pre-wrap">
                    {budget.notas}
                  </Text>
                </Box>
              )}
            </VStack>

            {/* Totales y acciones */}
            <Box {...cardProps} position={{ lg: "sticky" }} top={{ lg: "6" }}>
              <VStack align="stretch" gap="4">
                <BudgetTotals subtotal={budget.subtotal} igv={budget.igv} total={budget.total} igvRate={budget.igvRate} />

                <VStack align="stretch" gap="1" fontSize="sm" color="text.muted">
                  <HStack justify="space-between">
                    <Text>Creado</Text>
                    <Text color="text.heading">{formatBudgetDate(budget.createdAt)}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Validez</Text>
                    <Text color="text.heading">{budget.validezDias} días</Text>
                  </HStack>
                  {budget.enviadoEl && (
                    <HStack justify="space-between">
                      <Text>Enviado</Text>
                      <Text color="text.heading">{formatBudgetDate(budget.enviadoEl)}</Text>
                    </HStack>
                  )}
                  {budget.venceEl && (
                    <HStack justify="space-between">
                      <Text>Vence</Text>
                      <Text color="text.heading">{formatBudgetDate(budget.venceEl)}</Text>
                    </HStack>
                  )}
                  {budget.resueltoEl && (
                    <HStack justify="space-between">
                      <Text>{budget.estado === "aprobado" ? "Aprobado" : "Rechazado"}</Text>
                      <Text color="text.heading">{formatBudgetDate(budget.resueltoEl)}</Text>
                    </HStack>
                  )}
                </VStack>

                {message && (
                  <Box
                    role={message.type === "error" ? "alert" : "status"}
                    p="3"
                    borderRadius="xl"
                    fontSize="sm"
                    border="1px solid"
                    bg={message.type === "success" ? "status.successSoft" : "status.dangerSoft"}
                    color={message.type === "success" ? "status.successText" : "status.dangerText"}
                    borderColor={message.type === "success" ? "status.successBorder" : "status.dangerBorder"}
                  >
                    {message.text}
                  </Box>
                )}

                {/* Estado */}
                {budget.estado === "borrador" && (
                  <Button variant="primary" minH="12" disabled={busy !== null} onClick={() => setPendingStatus("enviado")}>
                    <Send size={16} style={{ flexShrink: 0, marginRight: 8 }} />
                    Marcar como enviado
                  </Button>
                )}
                {budget.estado === "enviado" && (
                  <HStack gap="2">
                    <Button variant="primary" flex="1" minH="12" disabled={busy !== null} onClick={() => setPendingStatus("aprobado")}>
                      <Check size={16} style={{ flexShrink: 0, marginRight: 6 }} />
                      Aprobado
                    </Button>
                    <Button variant="outline" flex="1" minH="12" disabled={busy !== null} onClick={() => setPendingStatus("rechazado")}>
                      <X size={16} style={{ flexShrink: 0, marginRight: 6 }} />
                      Rechazado
                    </Button>
                  </HStack>
                )}

                {/* PDF */}
                <VStack align="stretch" gap="2" pt="2" borderTop="1px solid" borderColor="border.default">
                  <Button variant="outline" minH="12" loading={busy === "pdf"} disabled={busy !== null} onClick={handleGeneratePdf}>
                    <FileText size={16} style={{ flexShrink: 0, marginRight: 8 }} />
                    {budget.pdf ? "Volver a generar el PDF" : "Generar PDF"}
                  </Button>
                  {budget.pdf && (
                    <>
                      <Button variant="outline" minH="12" loading={busy === "download"} disabled={busy !== null} onClick={handleDownloadPdf}>
                        <Download size={16} style={{ flexShrink: 0, marginRight: 8 }} />
                        Abrir PDF (versión {budget.pdf.version})
                      </Button>
                      <Text fontSize="xs" color="text.muted">
                        Generado el {formatBudgetDate(budget.pdf.generadoEl)}.
                        {budget.estado === "borrador" ? " Un PDF de borrador lleva la marca «BORRADOR»." : ""}
                        {pdfOutdated ? " El presupuesto cambió después: vuelva a generarlo antes de entregarlo." : ""}
                      </Text>
                    </>
                  )}
                </VStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </>
      )}

      {pendingStatus && (
        <ConfirmDialog
          isOpen
          onClose={() => setPendingStatus(null)}
          onConfirm={handleConfirmStatus}
          loading={busy === "status"}
          {...CONFIRM_COPY[pendingStatus]}
        />
      )}
    </Box>
  );
};
