"use client";

/**
 * @file CompanyPoliciesView.tsx
 * @description Vista de términos y condiciones de la empresa y políticas de privacidad con diseño plano sobrio.
 * @module screens/legal/ui
 */

import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { companyData } from "@/shared/config/company-data";
import AuraContainer from "@shared/components/aura/AuraContainer";
import AuraHeader from "@shared/components/aura/AuraHeader";
import AuraSurface from "@shared/components/aura/AuraSurface";
import { Building2, UserCheck, FileCheck, CheckCircle2 } from "lucide-react";

interface PolicyPointProps {
  title: string;
  children: React.ReactNode;
}

const PolicyPoint: React.FC<PolicyPointProps> = ({ title, children }) => (
  <Box w="full" py={2}>
    <HStack gap={2} mb={1.5} align="center">
      <Box as={CheckCircle2} color="text.accent" boxSize={4} flexShrink={0} />
      <Heading as="h3" size="sm" color="text.heading" fontWeight="700">
        {title}
      </Heading>
    </HStack>
    <Box pl={6}>
      {children}
    </Box>
  </Box>
);

const CompanyPoliciesView: React.FC = () => {
  return (
    <AuraContainer>
      <VStack gap={8} align="stretch" pb={12}>
        {/* Cabecera Principal */}
        <AuraHeader
          title="Políticas de la Empresa"
          overline="Términos y Condiciones"
          description="En GYA Company, nos comprometemos con la transparencia y la claridad en cada interacción. A continuación se detallan las políticas que rigen nuestros servicios residenciales, corporativos y el tratamiento de datos personales."
          headingAs="h1"
          mb={0}
        />

        {/* Resumen de Garantía y Normativa en 3 Bloques */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={2}>
          <AuraSurface p="5" variant="glass">
            <HStack gap="3">
              <Box p="2.5" borderRadius="xl" bg="whiteAlpha.100" color="text.accent">
                <UserCheck size={20} />
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="xs" fontWeight="800" color="text.heading">Servicios Residenciales</Text>
                <Text fontSize="2xs" color="text.muted">Presupuesto 5 días • Garantía 6 meses</Text>
              </VStack>
            </HStack>
          </AuraSurface>

          <AuraSurface p="5" variant="glass">
            <HStack gap="3">
              <Box p="2.5" borderRadius="xl" bg="whiteAlpha.100" color="text.accent">
                <Building2 size={20} />
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="xs" fontWeight="800" color="text.heading">Proyectos y Empresas</Text>
                <Text fontSize="2xs" color="text.muted">Propuesta 30 días • Garantía 12 meses</Text>
              </VStack>
            </HStack>
          </AuraSurface>

          <AuraSurface p="5" variant="glass">
            <HStack gap="3">
              <Box p="2.5" borderRadius="xl" bg="whiteAlpha.100" color="text.accent">
                <FileCheck size={20} />
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="xs" fontWeight="800" color="text.heading">Ley N° 29733</Text>
                <Text fontSize="2xs" color="text.muted">Protección de Datos Personales</Text>
              </VStack>
            </HStack>
          </AuraSurface>
        </SimpleGrid>

        {/* Bloque 1: Servicios Residenciales */}
        <AuraSurface p={{ base: 6, md: 8 }} variant="glass">
          <VStack gap={5} align="start">
            <HStack gap={2} wrap="wrap">
              <Badge colorPalette="red" variant="subtle" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.12em">
                Domicilios Particulares
              </Badge>
            </HStack>
            <Heading as="h2" size="xl" color="text.heading" fontWeight="800" letterSpacing="tight">
              Términos y Condiciones: Servicios Residenciales
            </Heading>
            <Text fontSize="sm" color="text.muted">
              Condiciones aplicables para la instalación de ventanas, mamparas, techos de vidrio y espejos en hogares.
            </Text>

            <VStack gap={4} align="start" w="full" pt={2}>
              <PolicyPoint title="1. Validez del Presupuesto">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Nuestros presupuestos para servicios residenciales tienen una validez de{" "}
                  <Text as="span" fontWeight="bold" color="text.heading">
                    5 días hábiles
                  </Text>
                  , debido a la dinámica de nuestro stock. Le sugerimos confirmar su pedido dentro de este periodo para mantener el precio acordado.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="2. Forma de Pago (Modalidad 50/50)">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed" mb={2}>
                  Para dar inicio a la fabricación e instalación de su proyecto, operamos bajo el esquema:
                </Text>
                <VStack align="start" gap={1.5} color="text.body" fontSize="sm">
                  <Text>• <Text as="span" fontWeight="bold">50% de Anticipo:</Text> Al momento de la confirmación del presupuesto.</Text>
                  <Text>• <Text as="span" fontWeight="bold">50% de Saldo:</Text> Al finalizar la entrega e instalación del trabajo a su completa conformidad.</Text>
                  <Text fontSize="xs" color="text.muted" mt={1}>* Aceptamos transferencias bancarias sin comisión. Los pagos con tarjeta de crédito/débito tienen un recargo administrativo del 5%.</Text>
                </VStack>
              </PolicyPoint>

              <PolicyPoint title="3. Tiempos de Instalación">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  El plazo estimado de instalación varía entre 4 y 15 días hábiles según la complejidad del producto. El cómputo se realiza en días hábiles (lunes a viernes, excluyendo feriados).
                </Text>
              </PolicyPoint>

              <PolicyPoint title="4. Política de Garantía (6 Meses)">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed" mb={2}>
                  Ofrecemos una garantía de <Text as="span" fontWeight="bold" color="text.heading">6 meses</Text> que cubre defectos de fabricación del vidrio, aluminio y fallas de instalación.
                </Text>
                <Text fontSize="xs" color="text.muted">
                  * Exclusiones: No cubre roturas posteriores a la entrega, rayaduras por limpieza inadecuada o daños por uso indebido.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="5. Reclamos">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Cualquier observación debe comunicarse al momento de la entrega. Aceptamos reclamos justificados hasta <Text as="span" fontWeight="bold" color="text.heading">30 días calendario</Text> posteriores a la instalación presentando su comprobante de pago.
                </Text>
              </PolicyPoint>
            </VStack>
          </VStack>
        </AuraSurface>

        {/* Bloque 2: Proyectos y Empresas */}
        <AuraSurface p={{ base: 6, md: 8 }} variant="glass">
          <VStack gap={5} align="start">
            <HStack gap={2} wrap="wrap">
              <Badge colorPalette="blue" variant="subtle" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.12em">
                Corporativo & Obras
              </Badge>
            </HStack>
            <Heading as="h2" size="xl" color="text.heading" fontWeight="800" letterSpacing="tight">
              Términos y Condiciones: Proyectos y Empresas
            </Heading>
            <Text fontSize="sm" color="text.muted">
              Condiciones orientadas a constructoras, arquitectos y proyectos comerciales de gran escala.
            </Text>

            <VStack gap={4} align="start" w="full" pt={2}>
              <PolicyPoint title="1. Validez de la Propuesta">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Nuestra propuesta económica es válida por <Text as="span" fontWeight="bold" color="text.heading">30 días hábiles</Text> a partir de su emisión. Transcurrido este plazo, los precios unitarios podrán ser ajustados conforme a las fluctuaciones del mercado.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="2. Plazos de Ejecución y Exclusiones">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  El plazo de ejecución inicia tras la firma de la Orden de Compra y la recepción del anticipo. GYA Company no asume responsabilidad por retrasos ajenos a su gestión (demoras de otros gremios, restricciones de acceso o cambios de diseño en obra).
                </Text>
              </PolicyPoint>

              <PolicyPoint title="3. Forma de Pago y Valorizaciones">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed" mb={2}>
                  Esquema estándar para proyectos:
                </Text>
                <VStack align="start" gap={1.5} color="text.body" fontSize="sm">
                  <Text>• <Text as="span" fontWeight="bold">Anticipo (10% - 20%):</Text> Para programación y planificación inicial.</Text>
                  <Text>• <Text as="span" fontWeight="bold">Materiales (20% - 30%):</Text> Contra la llegada de materiales a la obra.</Text>
                  <Text>• <Text as="span" fontWeight="bold">Avance de Obra:</Text> Saldo mediante valorizaciones periódicas según avance.</Text>
                </VStack>
              </PolicyPoint>

              <PolicyPoint title="4. Recepción y Conformidad">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  El cliente debe designar un responsable de residencia u obra para la supervisión. Tras la firma del acta de conformidad, no se admiten reclamos por daños estéticos o roturas ocasionadas por terceros.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="5. Garantía Corporativa (12 Meses)">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Nuestros proyectos corporativos cuentan con una garantía de <Text as="span" fontWeight="bold" color="text.heading">12 meses</Text> contra defectos de fabricación e instalación.
                </Text>
              </PolicyPoint>
            </VStack>
          </VStack>
        </AuraSurface>

        {/* Bloque 3: Política de Privacidad */}
        <AuraSurface p={{ base: 6, md: 8 }} variant="glass">
          <VStack gap={5} align="start">
            <HStack gap={2} wrap="wrap">
              <Badge colorPalette="gray" variant="subtle" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.12em">
                Privacidad & Datos
              </Badge>
            </HStack>
            <Heading as="h2" size="xl" color="text.heading" fontWeight="800" letterSpacing="tight">
              Política de Privacidad y Protección de Datos Personales
            </Heading>
            <Text fontSize="sm" color="text.muted">
              Aplicable a los bancos de datos gestionados por <Text as="span" fontWeight="bold" color="text.heading">{companyData.razonSocial}</Text> (RUC N° {companyData.ruc}, {companyData.direccion}).
            </Text>

            <VStack gap={4} align="start" w="full" pt={2}>
              <PolicyPoint title="1. Marco Normativo y Titularidad del Banco de Datos">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  En cumplimiento de la <strong>Ley N° 29733 (Ley de Protección de Datos Personales)</strong> y su Reglamento (D.S. N° 003-2013-JUS / D.S. N° 016-2024-JUS), los datos personales facilitados a través de nuestro portal web serán incorporados a los bancos de datos de titularidad de <strong>{companyData.razonSocial}</strong> denominados <em>&ldquo;Clientes y Contactos Web&rdquo;</em> y <em>&ldquo;Libro de Reclamaciones&rdquo;</em>.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="2. Finalidad del Tratamiento y Consentimiento">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Los datos recopilados se utilizarán con la finalidad exclusiva de elaborar cotizaciones técnicas, coordinar visitas e instalaciones en obra, formalizar la relación contractual y dar estricto cumplimiento a las obligaciones legales de atención de reclamos. El usuario otorga su consentimiento previo, informado, expreso e inequívoco al enviar los formularios.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="3. Plazo de Conservación de Datos">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Los datos de solicitudes comerciales se conservarán mientras dure la relación contractual o hasta que el titular solicite su supresión. La información registrada en el Libro de Reclamaciones se conservará durante un período mínimo obligatorio de <strong>dos (2) años</strong>, conforme a las directivas de Indecopi.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="4. Ejercicio de Derechos ARCO">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Usted puede ejercer libremente y en cualquier momento sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>, así como revocar su consentimiento, enviando una comunicación escrita con copia de su documento de identidad al correo: <Text as="span" fontWeight="bold" color="text.heading">ventas@gyacompany.com</Text> o a nuestra sede física en {companyData.direccion}.
                </Text>
              </PolicyPoint>

              <PolicyPoint title="5. Libro de Reclamaciones e Indecopi">
                <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                  Conforme a la Ley N° 29571 (Código de Protección y Defensa del Consumidor) y su modificatoria mediante la Ley N° 31435, toda queja o reclamo ingresado en nuestro Libro de Reclamaciones Virtual será atendido formalmente en un plazo máximo e improrrogable de <strong>quince (15) días hábiles</strong>.
                </Text>
              </PolicyPoint>
            </VStack>
          </VStack>
        </AuraSurface>
      </VStack>
    </AuraContainer>
  );
};

export default CompanyPoliciesView;
