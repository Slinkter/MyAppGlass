"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { toaster } from "@/shared/ui/toaster-instance";
import { useAuth } from "@/features/auth/context/AuthContext";
import { submitQuoteRequest } from "@/features/presupuesto/services/quoteService";
import { OptionChooser } from "@/features/presupuesto/components/OptionChooser";
import { WindowForm } from "@/features/presupuesto/components/WindowForm";
import { QuoteCart } from "@/features/presupuesto/components/QuoteCart";
import { QuickCustomerForm } from "@/features/presupuesto/components/QuickCustomerForm";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { useQuoteCart } from "@/features/presupuesto/hooks/useQuoteCart";
import { NovaQuoteSheet } from "@/entities/quote";
import { parseQuoteEntry } from "@/entities/quote/lib/quoteEntry";
import { normalizeMobile } from "@/features/presupuesto/schemas/quote-form-schema";
import { QUOTE_TEXTS } from "@/features/presupuesto/components/quoteTexts";
import { priceWindow, quoteTotals } from "@/entities/quote/lib/windowRules";
import { Button } from "@/shared/ui/button";
import { ArrowLeft, CheckCircle2, Printer, Phone } from "lucide-react";
import type { WindowQuoteItem } from "@/entities/quote";
import { companyData } from "@/shared/config/company-data";

const QUOTE_DATE_FORMATTER = new Intl.DateTimeFormat("es-PE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Lima",
});

type Step = "chooser" | "builder" | "checkout" | "success";

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

  const [step, setStep] = useState<Step>("chooser");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isClearOpen, setIsClearOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [lastCustomer, setLastCustomer] = useState<{ fullName: string; phone: string }>({
    fullName: "",
    phone: "",
  });

  const editingItem = useMemo(
    () => (editingId ? items.find((i) => i.id === editingId) : undefined),
    [editingId, items],
  );

  // Preselecciona el sistema que llega desde URL (/presupuesto?categoria=ventana&sistema=ventana_nova)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const entry = parseQuoteEntry(new URLSearchParams(window.location.search));
      if (entry) {
        setStep("builder");
      }
    }
  }, []);

  // Autocompletar datos de perfil si existe sesión
  useEffect(() => {
    if (profile?.fullName || profile?.phone) {
      setLastCustomer((prev) => ({
        fullName: profile.fullName || prev.fullName,
        phone: profile.phone || prev.phone,
      }));
    }
  }, [profile]);

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

  const handleFinalSubmit = async (customerData: { fullName: string; phone: string; acceptsPrivacy: true }) => {
    if (saving || items.length === 0) return;
    setSaving(true);
    setLastCustomer({ fullName: customerData.fullName, phone: customerData.phone });

    try {
      const subtotales = items.map((item) => {
        const p = priceWindow({
          widthM: item.widthM,
          heightM: item.heightM,
          glass: item.glass,
          finish: item.finish,
        });
        return p.subtotal;
      });

      const totals = quoteTotals(subtotales, outsideLaMolina);

      const number = await submitQuoteRequest({
        userId: user?.uid ?? "",
        fullName: customerData.fullName,
        phone: normalizeMobile(customerData.phone),
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
      setStep("success");
      clearCart();
    } catch {
      toaster.create({
        title: "No se pudo registrar el presupuesto",
        description: "Inténtalo nuevamente. Tus productos se mantienen en el carrito.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const whatsappMessageUrl = useMemo(() => {
    if (!quoteNumber) return "";
    const text = encodeURIComponent(
      `Hola Glass & Aluminum Company, solicité el presupuesto web N° ${quoteNumber} para ventanas Nova. Deseo coordinar la visita técnica para confirmar las medidas.`
    );
    return `https://wa.me/${companyData.whatsappNumber}?text=${text}`;
  }, [quoteNumber]);

  return (
    <Box py="8" maxW="pageWide" mx="auto" px={{ base: "4", md: "0" }}>
      {/* SECCIÓN INTERACTIVA (Oculta al imprimir) */}
      <Box className="no-print">
        {step === "chooser" && (
          <OptionChooser
            categoryLabel="Ventana"
            systemLabel="Sistema Nova"
            onChooseVisit={() => {
              window.location.href = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
                "Hola Glass & Aluminum Company, deseo solicitar una visita técnica gratuita para tomar medidas de ventanas."
              )}`;
            }}
            onChooseQuote={() => setStep("builder")}
          />
        )}

        {step === "builder" && (
          <VStack gap="8" align="stretch">
            <HStack justify="space-between" align="center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("chooser")}
              >
                <ArrowLeft size={16} /> Volver a opciones
              </Button>
            </HStack>

            <WindowForm
              key={editingId || "new_window"}
              systemLabel="Sistema Nova"
              initial={editingItem}
              onSubmit={handleSaveWindow}
              onCancelEdit={editingId ? handleCancelWindow : undefined}
              onRequestVisit={handleRequestVisit}
            />

            {items.length > 0 && (
              <QuoteCart
                items={items}
                outsideLaMolina={outsideLaMolina}
                onOutsideLaMolinaChange={setOutsideLaMolina}
                editingId={editingId}
                onEdit={handleEditItem}
                onRemove={removeItem}
                onClear={() => setIsClearOpen(true)}
                onGenerate={() => setStep("checkout")}
              />
            )}
          </VStack>
        )}

        {step === "checkout" && (
          <VStack gap="6" align="stretch">
            <QuickCustomerForm
              initialValues={lastCustomer}
              onSubmit={handleFinalSubmit}
              onCancel={() => setStep("builder")}
              loading={saving}
            />
          </VStack>
        )}

        {step === "success" && (
          <Box
            bg="bg.panel"
            p={{ base: "6", md: "8" }}
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.subtle"
            textAlign="center"
            maxW="600px"
            mx="auto"
          >
            <VStack gap="4">
              <Box color="status.success" p="3" borderRadius="full" bg="status.successSoft">
                <CheckCircle2 size={48} />
              </Box>
              <Heading as="h1" size="2xl" color="text.heading">
                {QUOTE_TEXTS.sheet.title}
              </Heading>
              <Text fontSize="lg" fontWeight="semibold" color="brand.coral">
                N° {quoteNumber}
              </Text>
              <Text color="text.muted" fontSize="sm">
                {QUOTE_TEXTS.status.successNext}
              </Text>

              <HStack gap="3" pt="4" flexWrap="wrap" justify="center">
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer size={16} /> Imprimir / Guardar PDF
                </Button>
                {whatsappMessageUrl && (
                  <Button
                    size="sm"
                    variant="primary"
                    asChild
                  >
                    <a href={whatsappMessageUrl} target="_blank" rel="noopener noreferrer">
                      <Phone size={16} /> Avisar por WhatsApp
                    </a>
                  </Button>
                )}
              </HStack>
            </VStack>
          </Box>
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

      {/* HOJA MEMBRETADA FORMAL (Visible en éxito o al imprimir) */}
      {(step === "success" || step === "checkout") && (
        <Box mt="10" display={step === "success" ? "block" : "none"} className="print-only">
          <NovaQuoteSheet
            customer={lastCustomer}
            items={items}
            outsideLaMolina={outsideLaMolina}
            formattedDate={formattedDate}
            quoteNumber={quoteNumber}
          />
        </Box>
      )}
    </Box>
  );
};
