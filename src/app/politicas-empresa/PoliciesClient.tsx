"use client";

import React from "react";
import {
  Box,
  Heading,
  Text as ChakraText,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { companyData } from "@/config/company-data";

export const PoliciesClient = () => {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const headingColor = useColorModeValue("primary.700", "primary.300");

  const glassSectionBg = useColorModeValue(
    "rgba(0, 0, 0, 0.03)",
    "rgba(255, 255, 255, 0.03)",
  );

  return (
    <Container maxW="7xl" py={10}>
      <VStack gap={8} align="start">
        <Heading as="h1" size="2xl" color={headingColor}>
          Políticas de la Empresa
        </Heading>
        <ChakraText fontSize="lg" color={textColor}>
          En GYA Company, nos comprometemos con la transparencia y la claridad
          en cada interacción. Para ofrecerle la mejor experiencia y evitar
          cualquier malentendido, hemos estructurado nuestros términos y
          condiciones en dos secciones, diseñadas para atender las necesidades
          específicas de nuestros clientes residenciales y corporativos.
        </ChakraText>

        {/* Card for Residential Clients */}
        <Box
          width="100%"
          bg={glassSectionBg}
          border="1px solid"
          borderColor="border.glass"
          boxShadow="sm"
          borderRadius="2xl"
          p={6}
          mb={8}
        >
          <VStack gap={6} align="start">
            <Heading as="h2" size="xl" color={headingColor}>
              Términos y Condiciones: Servicios Residenciales
            </Heading>
            <ChakraText fontSize="md" color={textColor}>
              Estas condiciones están pensadas para la instalación de
              ventanas, mamparas, techos y espejos en domicilios particulares.
            </ChakraText>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                1. Validez del Presupuesto
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Nuestros presupuestos para servicios residenciales tienen una
                validez de{" "}
                <ChakraText as="span" fontWeight="bold">
                  5 días hábiles
                </ChakraText>
                , debido a la dinámica de nuestro stock. Le sugerimos
                confirmar su pedido dentro de este periodo para mantener el
                precio acordado.
              </ChakraText>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                2. Forma de Pago
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Para dar inicio a la fabricación e instalación de su proyecto,
                operamos bajo la modalidad de pago 50/50:
              </ChakraText>
              <Box pl={4} color={textColor}>
                <ChakraText fontWeight="bold">50% de Anticipo:</ChakraText> Al momento de la firma o aceptación del presupuesto.
                <ChakraText fontWeight="bold" display="block">50% de Saldo:</ChakraText> Se cancela una vez finalizada la entrega e instalación del trabajo, a su completa satisfacción.
                <ChakraText fontWeight="bold" display="block">Medios de Pago:</ChakraText> Aceptamos transferencias bancarias sin comisión. Los pagos realizados con tarjeta de crédito o débito están sujetos a un recargo administrativo del 5%.
              </Box>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                3. Tiempos de Instalación
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                El plazo estimado para la instalación se detalla en cada
                presupuesto (usualmente entre 4 a 15 días hábiles, según el
                producto). Consideramos días hábiles de lunes a viernes,
                excluyendo feriados.
              </ChakraText>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                4. Política de Garantía
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Ofrecemos una garantía de{" "}
                <ChakraText as="span" fontWeight="bold">
                  6 meses
                </ChakraText>{" "}
                para nuestros productos instalados.
              </ChakraText>
              <Box pl={4} color={textColor}>
                <ChakraText fontWeight="bold">Cobertura:</ChakraText> Cubre defectos de fabricación del vidrio, aluminio y posibles fallas en la instalación.
                <ChakraText fontWeight="bold" display="block">No incluye:</ChakraText> No cubre roturas de vidrio posteriores a la entrega, rayaduras por limpieza inadecuada o daños derivados de un mal uso.
              </Box>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                5. Reclamos
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Cualquier observación debe ser comunicada al momento de la
                entrega. Aceptamos reclamos justificados hasta{" "}
                <ChakraText as="span" fontWeight="bold">
                  30 días calendario
                </ChakraText>{" "}
                posteriores a la instalación, siempre que se presente su
                comprobante de pago.
              </ChakraText>
            </Box>
          </VStack>
        </Box>

        {/* Card for Corporate Clients */}
        <Box
          width="100%"
          bg={glassSectionBg}
          border="1px solid"
          borderColor="border.glass"
          boxShadow="sm"
          borderRadius="2xl"
          p={6}
          mb={8}
        >
          <VStack gap={6} align="start">
            <Heading as="h2" size="xl" color={headingColor}>
              Términos y Condiciones: Proyectos y Empresas
            </Heading>
            <ChakraText fontSize="md" color={textColor}>
              Estas condiciones están dirigidas a constructoras, arquitectas y
              proyectos de gran envergadura.
            </ChakraText>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                1. Validez de la Propuesta
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Nuestra propuesta económica es válida por{" "}
                <ChakraText as="span" fontWeight="bold">
                  30 días hábiles
                </ChakraText>{" "}
                a partir de su fecha de emisión. Transcurrido este plazo, los
                precios unitarios y las condiciones podrán ser revisados y
                ajustados conforme a las fluctuaciones del mercado.
              </ChakraText>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                2. Plazos de Ejecución
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                El plazo de ejecución se computa en días hábiles (de lunes a
                viernes) y se inicia al cumplirse dos requisitos: la recepción
                de la Orden de Servicio/Compra debidamente firmada y la
                confirmación del abono del anticipo.
              </ChakraText>
              <Box pl={4} color={textColor}>
                <ChakraText fontWeight="bold">Exclusiones:</ChakraText> GYA Company no asume responsabilidad por retrasos derivados de causas ajenas a nuestra gestión, tales como demoras de otros contratistas, restricciones de acceso a las zonas de trabajo o modificaciones en el diseño original solicitadas durante el desarrollo de la obra.
              </Box>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                3. Forma de Pago y Valorizaciones
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Salvo estipulación contractual específica, el esquema de pagos
                estándar para proyectos se estructura de la siguiente manera:
              </ChakraText>
              <Box pl={4} color={textColor}>
                <ChakraText fontWeight="bold">Anticipo:</ChakraText> Un porcentaje inicial (generalmente entre 10% y 20%) destinado a la programación y planificación de los trabajos.
                <ChakraText fontWeight="bold" display="block">Materiales:</ChakraText> Pago contra la llegada de los materiales a la obra (entre 20% y 30%).
                <ChakraText fontWeight="bold" display="block">Avance:</ChakraText> El saldo restante se liquidará mediante valorizaciones periódicas, en función del avance de la instalación en obra.
              </Box>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                4. Recepción y Conformidad
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Es responsabilidad del cliente designar a un responsable de
                calidad o residente de obra para la supervisión y recepción de
                los avances. Una vez suscrita la conformidad o acta de
                recepción, no se admitirán reclamos posteriores por daños
                estéticos o roturas imputables a la intervención de terceros
                (otros gremios, almacenamiento inapropiado en obra, etc.).
              </ChakraText>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                5. Garantía Corporativa
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Nuestros proyectos cuentan con una garantía de{" "}
                <ChakraText as="span" fontWeight="bold">
                  12 meses
                </ChakraText>{" "}
                que ampara defectos de fabricación e instalación. Esta
                garantía quedará sin efecto ante daños ocasionados por
                negligencia, accidentes o manipulación por personal no
                autorizado por nuestra empresa.
              </ChakraText>
            </Box>
          </VStack>
        </Box>

        {/* Card for Privacy Policy */}
        <Box
          width="100%"
          bg={glassSectionBg}
          border="1px solid"
          borderColor="border.glass"
          boxShadow="sm"
          borderRadius="2xl"
          p={6}
        >
          <VStack gap={6} align="start">
            <Heading as="h2" size="xl" color={headingColor}>
              Política de Privacidad y Protección de Datos Personales
            </Heading>
            <ChakraText fontSize="md" color={textColor}>
              La presente política se aplica a todos los bancos de datos
              personales gestionados por{" "}
              <ChakraText as="span" fontWeight="bold">
                {companyData.razonSocial}
              </ChakraText>
              , con RUC N° {companyData.ruc} y domicilio en{" "}
              {companyData.direccion}.
            </ChakraText>
            <ChakraText fontSize="md" color={textColor}>
              Garantizamos la absoluta confidencialidad de sus datos y
              empleamos altos estándares de seguridad conforme a la Ley de
              Protección de Datos Personales – Ley N° 29733 y su Reglamento
              (Decreto Supremo N° 016-2024-JUS).
            </ChakraText>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                1. Objetivo y Finalidad
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Recopilamos sus datos personales (tales como nombre, teléfono,
                dirección y correo electrónico) únicamente para gestionar la
                prestación de nuestros servicios de vidriería y aluminio,
                elaborar presupuestos, coordinar instalaciones y mantenerlo
                informado sobre el estado de su proyecto.
              </ChakraText>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                2. Principios Rectores
              </Heading>
              <Box pl={4} color={textColor}>
                <ChakraText fontWeight="bold">Consentimiento:</ChakraText> El tratamiento de sus datos siempre mediará su consentimiento previo, expreso e informado.
                <ChakraText fontWeight="bold" display="block">Finalidad:</ChakraText> Sus datos serán utilizados exclusivamente para los fines del servicio contratado.
                <ChakraText fontWeight="bold" display="block">Seguridad:</ChakraText> Implementamos medidas técnicas para evitar la pérdida, mal uso o acceso no autorizado a su información.
              </Box>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                3. Tratamiento de Datos
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Sus datos serán almacenados en nuestro banco de datos de
                &quot;Clientes&quot; y podrán ser compartidos estrictamente
                con personal autorizado y proveedores necesarios para la
                ejecución del servicio (ej. transporte o instalación), siempre
                bajo confidencialidad. No vendemos ni compartimos su
                información con terceros para fines publicitarios sin su
                autorización.
              </ChakraText>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={2} color={headingColor}>
                4. Ejercicio de Derechos del Titular
              </Heading>
              <ChakraText fontSize="md" color={textColor}>
                Usted puede ejercer sus derechos de Acceso, Rectificación,
                Cancelación, Oposición, Portabilidad y Tratamiento Objetivo en
                cualquier momento. Para ello, puede enviar una solicitud a
                nuestro correo electrónico de contacto o acercarse a nuestra
                oficina en el horario de atención al público.
              </ChakraText>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
