"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Field,
  NativeSelect,
  Input,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster-instance";
import { quoteCalculator, QuoteCalculationInput } from "@/features/presupuesto/utils/quoteCalculator";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Lock, LogIn, Printer, Calculator, FileCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const PresupuestoWizardScreen: React.FC = () => {
  const { user, profile, loading } = useAuth();

  const [params, setParams] = useState<QuoteCalculationInput>({
    systemType: "mampara_serie25",
    width: 2.0,
    height: 2.1,
    glassType: "8mm_incoloro",
    aluminumColor: "negro_mate",
    difficulty: "primer_piso",
    includeInstallation: true,
  });

  const [customer, setCustomer] = useState({
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
    return (
      <Box py="16" maxW="600px" mx="auto" px="4" textAlign="center">
        <Box
          bg="surface.card"
          p="8"
          borderRadius="2xl"
          border="1px solid"
          borderColor="border.glass"
          backdropFilter="blur(16px)"
          boxShadow="0 20px 40px rgba(0,0,0,0.3)"
        >
          <Box p="4" bg="blue.500/10" color="blue.400" borderRadius="full" display="inline-flex" mb="4">
            <Lock size={40} />
          </Box>
          <Heading size="xl" mb="2">
            Inicio de Sesión Requerido
          </Heading>
          <Text color="text.muted" fontSize="sm" mb="6">
            Para generar y descargar cotizaciones formales con hoja membretada de Glass & Aluminum Company S.A.C., debes iniciar sesión con tu cuenta de cliente o administrador.
          </Text>
          <Button asChild colorPalette="blue" size="lg" w="full">
            <Link href="/auth">
              <LogIn size={18} style={{ marginRight: 6 }} /> Iniciar Sesión / Registrarse
            </Link>
          </Button>
        </Box>
      </Box>
    );
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
          {/* PANEL DE CONFIGURACIÓN */}
          <Box
            bg="surface.card"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.glass"
            backdropFilter="blur(12px)"
          >
            <Heading size="md" mb="6" display="flex" alignItems="center" gap="2">
              <Calculator size={20} /> Parámetros del Sistema
            </Heading>

            <VStack gap="4">
              <Field.Root>
                <Field.Label>Tipo de Sistema / Estructura</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={params.systemType}
                    onChange={(e) =>
                      setParams({ ...params, systemType: e.target.value as QuoteCalculationInput["systemType"] })
                    }
                  >
                    <option value="mampara_serie25">Mampara Corrediza Serie 25 (2 o 4 Hojas)</option>
                    <option value="ventana_nova">Ventana Corrediza Sistema Nova Hermética</option>
                    <option value="ducha_cristal">Puerta / Box de Ducha en Cristal Templado</option>
                    <option value="techo_policarbonato">Techo de Policarbonato / Cobertura de Vidrio</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Field.Root>

              <SimpleGrid columns={2} gap="4" w="full">
                <Field.Root>
                  <Field.Label>Ancho (Metros)</Field.Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={params.width}
                    onChange={(e) =>
                      setParams({ ...params, width: parseFloat(e.target.value) || 0.1 })
                    }
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Alto (Metros)</Field.Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={params.height}
                    onChange={(e) =>
                      setParams({ ...params, height: parseFloat(e.target.value) || 0.1 })
                    }
                  />
                </Field.Root>
              </SimpleGrid>

              <SimpleGrid columns={2} gap="4" w="full">
                <Field.Root>
                  <Field.Label>Tipo de Cristal</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={params.glassType}
                      onChange={(e) =>
                        setParams({ ...params, glassType: e.target.value as QuoteCalculationInput["glassType"] })
                      }
                    >
                      <option value="8mm_incoloro">Templado 8mm Incoloro</option>
                      <option value="10mm_incoloro">Templado 10mm Incoloro</option>
                      <option value="6mm_incoloro">Templado 6mm Incoloro</option>
                      <option value="8mm_laminado">Laminado de Seguridad 8mm</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Color de Aluminio</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={params.aluminumColor}
                      onChange={(e) =>
                        setParams({ ...params, aluminumColor: e.target.value as QuoteCalculationInput["aluminumColor"] })
                      }
                    >
                      <option value="negro_mate">Negro Mate Anodizado</option>
                      <option value="aluminio_mate">Aluminio Mate Natural</option>
                      <option value="blanco">Blanco Esmaltado</option>
                      <option value="champagne">Champagne Titanio</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>
              </SimpleGrid>

              <Field.Root>
                <Field.Label>Servicio de Instalación y Montaje</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={params.includeInstallation ? params.difficulty : "sin_instalacion"}
                    onChange={(e) => {
                      if (e.target.value === "sin_instalacion") {
                        setParams({ ...params, includeInstallation: false });
                      } else {
                        setParams({
                          ...params,
                          includeInstallation: true,
                          difficulty: e.target.value as QuoteCalculationInput["difficulty"],
                        });
                      }
                    }}
                  >
                    <option value="primer_piso">Instalación en Primer Piso / Fácil Acceso</option>
                    <option value="piso_alto_sin_andamio">Piso Alto (Ascensor / Escalera Amplia)</option>
                    <option value="piso_alto_con_andamio">Piso Alto con Andamio / Fachada Exterior</option>
                    <option value="sin_instalacion">Solo Fabricación (Sin Instalación)</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Field.Root>
            </VStack>
          </Box>

          {/* DATOS DEL CLIENTE */}
          <Box
            bg="surface.card"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.glass"
            backdropFilter="blur(12px)"
          >
            <Heading size="md" mb="6" display="flex" alignItems="center" gap="2">
              <FileCheck size={20} /> Datos para la Hoja Membretada
            </Heading>

            <VStack gap="4">
              <Field.Root>
                <Field.Label>Nombre Completo / Razón Social</Field.Label>
                <Input
                  placeholder="Ej. Arq. Carlos Mendoza"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                />
              </Field.Root>

              <SimpleGrid columns={2} gap="4" w="full">
                <Field.Root>
                  <Field.Label>DNI o RUC</Field.Label>
                  <Input
                    placeholder="8 u 11 dígitos"
                    value={customer.dniRuc}
                    onChange={(e) => setCustomer({ ...customer, dniRuc: e.target.value })}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Teléfono / WhatsApp</Field.Label>
                  <Input
                    placeholder="Ej. 974278303"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                </Field.Root>
              </SimpleGrid>

              <SimpleGrid columns={2} gap="4" w="full">
                <Field.Root>
                  <Field.Label>Correo Electrónico</Field.Label>
                  <Input
                    placeholder="cliente@ejemplo.com"
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Distrito (Lima)</Field.Label>
                  <Input
                    placeholder="Ej. La Molina"
                    value={customer.district}
                    onChange={(e) => setCustomer({ ...customer, district: e.target.value })}
                  />
                </Field.Root>
              </SimpleGrid>

              <Field.Root>
                <Field.Label>Dirección de Instalación</Field.Label>
                <Input
                  placeholder="Ej. Av. Los Fresnos 1214"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                />
              </Field.Root>

              <Button
                colorPalette="blue"
                size="lg"
                w="full"
                mt="2"
                onClick={handlePrint}
                display="flex"
                alignItems="center"
                gap="2"
              >
                <Printer size={20} /> Generar e Imprimir Presupuesto Oficial (PDF)
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>

      {/* HOJA MEMBRETADA FORMAL (Visible en pantalla y al imprimir con @media print) */}
      <Box
        p={{ base: "6", md: "10" }}
        bg="white"
        color="gray.900"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.300"
        boxShadow="xl"
      >
        {/* CABECERA MEMBRETADA */}
        <HStack justify="space-between" align="start" borderBottom="2px solid #0f172a" pb="6" mb="6">
          <Box>
            <Heading size="lg" color="blue.900">
              GLASS & ALUMINUM COMPANY S.A.C.
            </Heading>
            <Text fontSize="xs" fontWeight="bold" color="gray.600">
              RUC: 20601542407 | VIDRIERÍA Y CARPINTERÍA DE ALUMINIO
            </Text>
            <Text fontSize="xs" color="gray.600">
              Av. Los Fresnos 1214-1274, La Molina, Lima — Tel: (01) 974 278 303 / 996 537 435
            </Text>
            <Text fontSize="xs" color="gray.600">
              Web: www.gyacompany.com | Email: ventas@gyacompany.com
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="sm" fontWeight="bold" color="red.600">
              PRESUPUESTO FORMAL
            </Text>
            <Text fontSize="xs" color="gray.500">
              N° GYA-{new Date().getFullYear()}-0842
            </Text>
            <Text fontSize="xs" color="gray.500">
              Fecha: {new Date().toLocaleDateString("es-PE")}
            </Text>
          </Box>
        </HStack>

        {/* DATOS DEL CLIENTE */}
        <SimpleGrid columns={2} gap="4" mb="6" fontSize="sm" bg="gray.50" p="4" borderRadius="md">
          <Box>
            <Text><strong>Cliente:</strong> {customer.fullName || "Cliente Particular"}</Text>
            <Text><strong>DNI / RUC:</strong> {customer.dniRuc || "—"}</Text>
            <Text><strong>Dirección:</strong> {customer.address || "La Molina, Lima"}</Text>
          </Box>
          <Box>
            <Text><strong>Teléfono:</strong> {customer.phone || "—"}</Text>
            <Text><strong>Email:</strong> {customer.email || "—"}</Text>
            <Text><strong>Distrito:</strong> {customer.district || "La Molina"}</Text>
          </Box>
        </SimpleGrid>

        {/* TABLA DE PARTIDAS */}
        <Box overflowX="auto" mb="6">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0f172a", color: "white", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>Ítem</th>
                <th style={{ padding: "8px" }}>Descripción Técnica</th>
                <th style={{ padding: "8px", textAlign: "center" }}>Cant.</th>
                <th style={{ padding: "8px", textAlign: "center" }}>Unid.</th>
                <th style={{ padding: "8px", textAlign: "right" }}>P. Unit (S/)</th>
                <th style={{ padding: "8px", textAlign: "right" }}>Total (S/)</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "8px" }}>0{idx + 1}</td>
                  <td style={{ padding: "8px" }}>{item.description}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.unit}</td>
                  <td style={{ padding: "8px", textAlign: "right" }}>S/ {item.unitPrice.toFixed(2)}</td>
                  <td style={{ padding: "8px", textAlign: "right", fontWeight: "bold" }}>
                    S/ {item.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* RESUMEN DE TOTALES */}
        <HStack justify="space-between" align="start" pt="4" borderTop="2px solid #0f172a">
          <Box maxW="50%" fontSize="xs" color="gray.600">
            <Text fontWeight="bold" mb="1" display="flex" alignItems="center" gap="1">
              <ShieldCheck size={14} /> Condiciones Comerciales:
            </Text>
            <Text>• Validez del presupuesto: 15 días hábiles a partir de la fecha de emisión.</Text>
            <Text>• Garantía estructural: 2 años en perfiles y 1 año en accesorios y hermeticidad.</Text>
            <Text>• Tiempo de fabricación e instalación: 5 a 7 días hábiles tras confirmación.</Text>
          </Box>
          <Box textAlign="right" minW="220px" fontSize="sm">
            <HStack justify="space-between" mb="1">
              <Text>Subtotal:</Text>
              <Text fontWeight="medium">S/ {quote.subtotal.toFixed(2)}</Text>
            </HStack>
            {quote.installationCost > 0 && (
              <HStack justify="space-between" mb="1">
                <Text>Instalación / Montaje:</Text>
                <Text fontWeight="medium">S/ {quote.installationCost.toFixed(2)}</Text>
              </HStack>
            )}
            <HStack justify="space-between" mb="1">
              <Text>I.G.V. (18%):</Text>
              <Text fontWeight="medium">S/ {quote.igv.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between" pt="2" borderTop="1px solid #cbd5e1" fontSize="md" fontWeight="bold" color="blue.900">
              <Text>TOTAL:</Text>
              <Text>S/ {quote.total.toFixed(2)}</Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};
