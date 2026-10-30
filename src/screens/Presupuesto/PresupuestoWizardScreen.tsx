"use client";

import React, { useState, useMemo } from "react";
import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster-instance";
import { quoteCalculator, QuoteCalculationInput } from "@/features/presupuesto/utils/quoteCalculator";
import { useAuth } from "@/features/auth/context/AuthContext";
import { LoginRequired } from "./presupuesto/LoginRequired";
import { QuoteConfigPanel } from "./presupuesto/QuoteConfigPanel";
import { CustomerPanel } from "./presupuesto/CustomerPanel";
import { QuoteSheet } from "./presupuesto/QuoteSheet";
import type { QuoteCustomer } from "./presupuesto/types";

export const PresupuestoWizardScreen: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const formattedDate = useMemo(() => new Date().toLocaleDateString("es-PE"), []);

  const [params, setParams] = useState<QuoteCalculationInput>({
    systemType: "mampara_serie25",
    width: 2.0,
    height: 2.1,
    glassType: "8mm_incoloro",
    aluminumColor: "negro_mate",
    difficulty: "primer_piso",
    includeInstallation: true,
  });

  const [customer, setCustomer] = useState<QuoteCustomer>({
    fullName: "",
    dniRuc: "",
    email: "",
    phone: "",
    address: "",
    district: "La Molina",
  });

  // Si el usuario está autenticado, autocompletar sus datos del perfil
  React.useEffect(() => {
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

  const quote = quoteCalculator.calculateQuote(params);

  // Si no está autenticado, bloquear acceso y mostrar pantalla de Login Requerido
  if (!user && !loading) {
    return <LoginRequired />;
  }

  const handlePrint = () => {
    if (!customer.fullName || !customer.phone) {
      toaster.create({
        title: "Datos de cliente requeridos",
        description: "Por favor complete su nombre y teléfono para generar la hoja membretada.",
        type: "warning",
      });
      return;
    }
    window.print();
  };

  return (
    <Box py="8" maxW="1200px" mx="auto">
      {/* SECCIÓN INTERACTIVA (Oculta al imprimir) */}
      <Box className="no-print">
        <VStack gap="2" align="start" mb="8">
          <Heading size="2xl" color="brand.primary">
            Calculadora de Presupuestos & Cotizador a Medida
          </Heading>
          <Text color="text.muted">
            Configura las dimensiones exactas, acabados de aluminio y tipo de cristal para obtener tu desglose oficial y presupuesto formal imprimible.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="8" mb="12">
          <QuoteConfigPanel params={params} setParams={setParams} />
          <CustomerPanel customer={customer} setCustomer={setCustomer} onPrint={handlePrint} />
        </SimpleGrid>
      </Box>

      {/* HOJA MEMBRETADA FORMAL (Visible en pantalla y al imprimir con @media print) */}
      <QuoteSheet customer={customer} quote={quote} formattedDate={formattedDate} />
    </Box>
  );
};
