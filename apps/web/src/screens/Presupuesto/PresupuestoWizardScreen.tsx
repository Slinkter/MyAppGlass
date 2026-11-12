"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Heading, Text, VStack, HStack, Input, Checkbox } from "@chakra-ui/react";
import { toaster } from "@/shared/ui/toaster-instance";
import { useAuth } from "@/features/auth/context/AuthContext";
import { submitQuoteRequest } from "@/features/presupuesto/services/quoteService";
import { WindowForm } from "@/features/presupuesto/components/WindowForm";
import { QuoteCart } from "@/features/presupuesto/components/QuoteCart";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { useQuoteCart } from "@/features/presupuesto/hooks/useQuoteCart";
import { NovaQuoteSheet } from "@/entities/quote";
import { normalizeMobile } from "@/features/presupuesto/schemas/quote-form-schema";
import { QUOTE_TEXTS } from "@/features/presupuesto/components/quoteTexts";
import { priceWindow, quoteTotals } from "@/entities/quote/lib/windowRules";
import { Button } from "@/shared/ui/button";
import { ArrowLeft, CheckCircle2, Download, Phone } from "lucide-react";
import type { WindowQuoteItem } from "@/entities/quote";
import { companyData } from "@/shared/config/company-data";
import Link from "next/link";

const QUOTE_DATE_FORMATTER = new Intl.DateTimeFormat("es-PE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Lima",
});

type Step = "builder" | "preview";

export const PresupuestoWizardScreen: React.FC = () => {
  const { user, profile } = useAuth();
  const formattedDate = useMemo(() => QUOTE_DATE_FORMATTER.format(new Date()), []);

  const {
    items,
    outsideLaMolina,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    setOutsideLaMolina,
  } = useQuoteCart();

  const [step, setStep] = useState<Step>("builder");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isClearOpen, setIsClearOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);

  // Datos del cliente pedidos desde el inicio
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(true);
  const [customerErrors, setCustomerErrors] = useState<{ name?: string; phone?: string }>({});

  // Autocompletar datos de perfil si existe sesión
  useEffect(() => {
    if (profile?.fullName) setCustomerName(profile.fullName);
    if (profile?.phone) setCustomerPhone(profile.phone);
  }, [profile]);

  const editingItem = useMemo(
    () => (editingId ? items.find((i) => i.id === editingId) : undefined),
    [editingId, items],
  );

  const handleEditItem = (id: string) => {
    setEditingId(id);
    setStep("builder");
  };

  const handleSaveWindow = (itemData: Omit<WindowQuoteItem, "id">) => {
    if (editingId && editingItem) {
      updateItem(editingId, { ...itemData, id: editingId });
      setEditingId(null);
    } else {
      const newId = `w_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      addItem({ ...itemData, id: newId });
    }
    setStep("builder");
  };

  const handleCancelWindow = () => {
    setEditingId(null);
    setStep("builder");
  };

  const handleRequestVisit = () => {
    const text = encodeURIComponent(
      "Hola Glass & Aluminum Company, tengo una ventana con medidas especiales y quisiera solicitar una visita técnica gratuita para tomar las medidas exactas."
    );
    window.location.href = `https://wa.me/${companyData.whatsappNumber}?text=${text}`;
  };

  // Validar datos de cliente y pasar a previsualización del presupuesto formal
  const handlePreviewQuote = async () => {
    const errors: { name?: string; phone?: string } = {};
    if (!customerName.trim() || customerName.trim().length < 3) {
      errors.name = "Ingrese su nombre y apellido.";
    }
    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      errors.phone = "Ingrese un número celular válido (9 dígitos).";
    }

    setCustomerErrors(errors);
    if (Object.keys(errors).length > 0) {
      toaster.create({
        title: "Complete sus datos de contacto",
        description: "Requerimos su nombre y celular para generar el presupuesto con su nombre.",
        type: "warning",
      });
      return;
    }

    if (items.length === 0) {
      toaster.create({
        title: "Agregue al menos una ventana",
        description: "Configure una ventana y toque 'Agregar al presupuesto'.",
        type: "warning",
      });
      return;
    }

    // Registrar en Firestore para obtener el número oficial
    setSaving(true);
    try {
      const subtotales = items.map((item) => priceWindow(item).subtotal);
      const totals = quoteTotals(subtotales, outsideLaMolina);

      const number = await submitQuoteRequest({
        userId: user?.uid ?? "",
        fullName: customerName.trim(),
        phone: normalizeMobile(cleanPhone),
        email: user?.email ?? "",
        dniRuc: "",
        address: outsideLaMolina ? "Fuera de La Molina" : "La Molina",
        district: outsideLaMolina ? "Otro distrito" : "La Molina",
        total: totals.total,
        params: {
          version: 3,
          category: "ventana",
          system: "ventana_nova",
          outsideLaMolina,
          items,
        },
      });

      setQuoteNumber(number);
      setStep("preview");
    } catch {
      // Si falla Firestore, asignamos un número provisional y permitimos ver el presupuesto
      setQuoteNumber(`WEB-${Date.now().toString().slice(-4)}`);
      setStep("preview");
    } finally {
      setSaving(false);
    }
  };

  const whatsappMessageUrl = useMemo(() => {
    if (!quoteNumber) return "";
    const text = encodeURIComponent(
      `Hola Glass & Aluminum Company, soy ${customerName}. Generé el presupuesto web N° ${quoteNumber} para ventanas Nova. Deseo coordinar la validación y visita técnica.`
    );
    return `https://wa.me/${companyData.whatsappNumber}?text=${text}`;
  }, [quoteNumber, customerName]);

  const activeCustomer = useMemo(
    () => ({
      fullName: customerName.trim() || "Cliente Particular",
      phone: customerPhone.trim() || "—",
      district: outsideLaMolina ? "Fuera de La Molina" : "La Molina",
    }),
    [customerName, customerPhone, outsideLaMolina]
  );

  return (
    <Box py="8" maxW="pageWide" mx="auto" px={{ base: "4", md: "0" }}>
      {/* SECCIÓN INTERACTIVA (Oculta al imprimir) */}
      <Box className="no-print">
        {step === "builder" && (
          <VStack gap="8" align="stretch">
            {/* 1. Datos del cliente requeridos al inicio */}
            <Box
              bg="bg.panel"
              p={{ base: "4", sm: "6" }}
              borderRadius="2xl"
              border="1px solid"
              borderColor="border.subtle"
            >
              <VStack align="stretch" gap="4">
                <Box>
                  <Heading as="h1" size="lg" color="text.heading">
                    {QUOTE_TEXTS.page.title}
                  </Heading>
                  <Text fontSize="sm" color="text.muted" mt="1">
                    Ingrese sus datos de contacto para asignarle su presupuesto y coordinar la confirmación técnica.
                  </Text>
                </Box>

                <HStack gap="4" align="flex-start" flexWrap={{ base: "wrap", md: "nowrap" }}>
                  <Box flex="1" minW={{ base: "full", sm: "240px" }}>
                    <Text fontSize="xs" fontWeight="semibold" mb="1" color="text.heading">
                      Nombre y Apellido *
                    </Text>
                    <Input
                      placeholder="Ej. Carlos Alberto Mendoza"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      borderColor={customerErrors.name ? "status.danger" : "border.subtle"}
                    />
                    {customerErrors.name && (
                      <Text fontSize="xs" color="status.danger" mt="1">
                        {customerErrors.name}
                      </Text>
                    )}
                  </Box>

                  <Box flex="1" minW={{ base: "full", sm: "240px" }}>
                    <Text fontSize="xs" fontWeight="semibold" mb="1" color="text.heading">
                      Celular (WhatsApp) *
                    </Text>
                    <Input
                      type="tel"
                      placeholder="Ej. 974 278 303"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      borderColor={customerErrors.phone ? "status.danger" : "border.subtle"}
                    />
                    {customerErrors.phone && (
                      <Text fontSize="xs" color="status.danger" mt="1">
                        {customerErrors.phone}
                      </Text>
                    )}
                  </Box>
                </HStack>

                <HStack align="flex-start" gap="2.5" pt="1">
                  <Checkbox.Root
                    checked={acceptsPrivacy}
                    onCheckedChange={(details) => setAcceptsPrivacy(Boolean(details.checked))}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                  <Text fontSize="xs" color="text.muted" lineHeight="tall">
                    Acepto la{" "}
                    <Link
                      href="/politicas-empresa"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline", color: "var(--chakra-colors-brand-primary)" }}
                    >
                      política de datos personales
                    </Link>{" "}
                    (Ley N° 29733). Solo nos comunicaremos para coordinar su presupuesto.
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* 2. Formulario de la Ventana */}
            <WindowForm
              key={editingId || "new_window"}
              systemLabel="Sistema Nova"
              initial={editingItem}
              onSubmit={handleSaveWindow}
              onCancelEdit={editingId ? handleCancelWindow : undefined}
              onRequestVisit={handleRequestVisit}
            />

            {/* 3. Carrito con esquema 2D e instalación en La Molina */}
            {items.length > 0 && (
              <QuoteCart
                items={items}
                outsideLaMolina={outsideLaMolina}
                onOutsideLaMolinaChange={setOutsideLaMolina}
                editingId={editingId}
                onEdit={handleEditItem}
                onRemove={removeItem}
                onClear={() => setIsClearOpen(true)}
                onGenerate={handlePreviewQuote}
                loading={saving}
              />
            )}
          </VStack>
        )}

        {step === "preview" && (
          <VStack gap="6" align="stretch">
            {/* Barra superior de acciones del presupuesto */}
            <Box
              bg="bg.panel"
              p="5"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border.subtle"
            >
              <HStack justify="space-between" align="center" flexWrap="wrap" gap="4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("builder")}
                >
                  <ArrowLeft size={16} /> Modificar medidas / ventanas
                </Button>

                <HStack gap="3" flexWrap="wrap">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    <Download size={16} /> Descargar Presupuesto (PDF)
                  </Button>
                  {whatsappMessageUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a href={whatsappMessageUrl} target="_blank" rel="noopener noreferrer">
                        <Phone size={16} /> Confirmar por WhatsApp
                      </a>
                    </Button>
                  )}
                </HStack>
              </HStack>
            </Box>

            {/* Banner de confirmación */}
            <HStack
              bg="status.successSoft"
              p="4"
              borderRadius="xl"
              border="1px solid"
              borderColor="status.success"
              color="text.heading"
              gap="3"
            >
              <CheckCircle2 size={24} color="var(--chakra-colors-status-success)" style={{ flexShrink: 0 }} />
              <VStack align="start" gap="0">
                <Text fontWeight="bold" fontSize="sm">
                  Presupuesto N° {quoteNumber} listo para su revisión
                </Text>
                <Text fontSize="xs" color="text.muted">
                  A continuación se presenta su cotización formal. Puede imprimirla o descargarla como PDF para validar en tienda.
                </Text>
              </VStack>
            </HStack>
          </VStack>
        )}
      </Box>

      {/* CONFIRMACIÓN DE LIMPIEZA */}
      <ConfirmDialog
        isOpen={isClearOpen}
        onClose={() => setIsClearOpen(false)}
        onConfirm={() => {
          clearCart();
          setIsClearOpen(false);
        }}
        title="¿Vaciar el presupuesto?"
        description="Se eliminarán todas las ventanas agregadas hasta el momento. Esta acción no se puede deshacer."
        confirmLabel="Vaciar presupuesto"
      />

      {/* HOJA MEMBRETADA FORMAL (Visible en previsualización de presupuesto y al imprimir) */}
      <Box
        mt={step === "preview" ? "4" : "10"}
        display={step === "preview" ? "block" : "none"}
        className="print-sheet"
      >
        <NovaQuoteSheet
          customer={activeCustomer}
          items={items}
          outsideLaMolina={outsideLaMolina}
          formattedDate={formattedDate}
          quoteNumber={quoteNumber}
        />
      </Box>
    </Box>
  );
};
