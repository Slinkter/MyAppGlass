import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import HelmetWrapper from "@/components/HelmetWrapper";
import { companyData } from "@/config/company-data";

const CompanyPoliciesPage = () => {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const headingColor = useColorModeValue("primary.700", "primary.300");

  // GlassSection styles for the cards
  const glassSectionBg = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.1)"
  );
  const glassSectionBlur = "blur(10px)"; // Suave blur

  return (
    <>
      <HelmetWrapper
        title="Políticas de la Empresa - GYA Company"
        description="Conoce las políticas y términos de servicio de GYA Company."
        canonicalUrl="https://www.gyacompany.com/politicas-empresa"
      />
      <Container maxW="7xl" py={10}>
        <VStack spacing={8} align="start">
          <Heading as="h1" size="2xl" color={headingColor}>
            Políticas de la Empresa
          </Heading>
          <Text fontSize="lg" color={textColor}>
            En GYA Company, nos comprometemos con la transparencia y la claridad
            en cada interacción. Para ofrecerle la mejor experiencia y evitar
            cualquier malentendido, hemos estructurado nuestros términos y
            condiciones en dos secciones, diseñadas para atender las necesidades
            específicas de nuestros clientes residenciales y corporativos.
          </Text>

          {/* Card for Residential Clients */}
          <Box
            width="100%"
            bg={glassSectionBg}
            backdropFilter={glassSectionBlur}
            border="none"
            boxShadow="sm"
            borderRadius="2xl"
            p={6}
            mb={8} // Margin bottom to separate cards
          >
            <VStack spacing={6} align="start">
              <Heading as="h2" size="xl" color={headingColor}>
                Términos y Condiciones: Servicios Residenciales
              </Heading>
              <Text fontSize="md" color={textColor}>
                Estas condiciones están pensadas para la instalación de
                ventanas, mamparas, techos y espejos en domicilios particulares.
              </Text>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  1. Validez del Presupuesto
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Nuestros presupuestos para servicios residenciales tienen una
                  validez de{" "}
                  <Text as="span" fontWeight="bold">
                    5 días hábiles
                  </Text>
                  , debido a la dinámica de nuestro stock. Le sugerimos
                  confirmar su pedido dentro de este periodo para mantener el
                  precio acordado.
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  2. Forma de Pago
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Para dar inicio a la fabricación e instalación de su proyecto,
                  operamos bajo la modalidad de pago 50/50:
                </Text>
                <UnorderedList pl={4} color={textColor}>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      50% de Anticipo:
                    </Text>{" "}
                    Al momento de la firma o aceptación del presupuesto.
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      50% de Saldo:
                    </Text>{" "}
                    Se cancela una vez finalizada la entrega e instalación del
                    trabajo, a su completa satisfacción.
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Medios de Pago:
                    </Text>{" "}
                    Aceptamos transferencias bancarias sin comisión. Los pagos
                    realizados con tarjeta de crédito o débito están sujetos a
                    un recargo administrativo del 5%.
                  </ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  3. Tiempos de Instalación
                </Heading>
                <Text fontSize="md" color={textColor}>
                  El plazo estimado para la instalación se detalla en cada
                  presupuesto (usualmente entre 4 a 15 días hábiles, según el
                  producto). Consideramos días hábiles de lunes a viernes,
                  excluyendo feriados.
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  4. Política de Garantía
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Ofrecemos una garantía de{" "}
                  <Text as="span" fontWeight="bold">
                    6 meses
                  </Text>{" "}
                  para nuestros productos instalados.
                </Text>
                <UnorderedList pl={4} color={textColor}>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Cobertura:
                    </Text>{" "}
                    Cubre defectos de fabricación del vidrio, aluminio y
                    posibles fallas en la instalación.
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      No incluye:
                    </Text>{" "}
                    No cubre roturas de vidrio posteriores a la entrega,
                    rayaduras por limpieza inadecuada o daños derivados de un
                    mal uso.
                  </ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  5. Reclamos
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Cualquier observación debe ser comunicada al momento de la
                  entrega. Aceptamos reclamos justificados hasta{" "}
                  <Text as="span" fontWeight="bold">
                    30 días calendario
                  </Text>{" "}
                  posteriores a la instalación, siempre que se presente su
                  comprobante de pago.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Card for Corporate Clients */}
          <Box
            width="100%"
            bg={glassSectionBg}
            backdropFilter={glassSectionBlur}
            border="none"
            boxShadow="sm"
            borderRadius="2xl"
            p={6}
          >
            <VStack spacing={6} align="start">
              <Heading as="h2" size="xl" color={headingColor}>
                Términos y Condiciones: Proyectos y Empresas
              </Heading>
              <Text fontSize="md" color={textColor}>
                Estas condiciones están dirigidas a constructoras, arquitectos y
                proyectos de gran envergadura.
              </Text>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  1. Validez de la Propuesta
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Nuestra propuesta económica es válida por{" "}
                  <Text as="span" fontWeight="bold">
                    30 días hábiles
                  </Text>{" "}
                  a partir de su fecha de emisión. Transcurrido este plazo, los
                  precios unitarios y las condiciones podrán ser revisados y
                  ajustados conforme a las fluctuaciones del mercado.
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  2. Plazos de Ejecución
                </Heading>
                <Text fontSize="md" color={textColor}>
                  El plazo de ejecución se computa en días hábiles (de lunes a
                  viernes) y se inicia al cumplirse dos requisitos: la recepción
                  de la Orden de Servicio/Compra debidamente firmada y la
                  confirmación del abono del anticipo.
                </Text>
                <UnorderedList pl={4} color={textColor}>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Exclusiones:
                    </Text>{" "}
                    GYA Company no asume responsabilidad por retrasos derivados
                    de causas ajenas a nuestra gestión, tales como demoras de
                    otros contratistas, restricciones de acceso a las zonas de
                    trabajo o modificaciones en el diseño original solicitadas
                    durante el desarrollo de la obra.
                  </ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  3. Forma de Pago y Valorizaciones
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Salvo estipulación contractual específica, el esquema de pagos
                  estándar para proyectos se estructura de la siguiente manera:
                </Text>
                <UnorderedList pl={4} color={textColor}>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Anticipo:
                    </Text>{" "}
                    Un porcentaje inicial (generalmente entre 10% y 20%)
                    destinado a la programación y planificación de los trabajos.
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Materiales:
                    </Text>{" "}
                    Pago contra la llegada de los materiales a la obra (entre
                    20% y 30%).
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Avance:
                    </Text>{" "}
                    El saldo restante se liquidará mediante valorizaciones
                    periódicas, en función del avance de la instalación en obra.
                  </ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  4. Recepción y Conformidad
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Es responsabilidad del cliente designar a un responsable de
                  calidad o residente de obra para la supervisión y recepción de
                  los avances. Una vez suscrita la conformidad o acta de
                  recepción, no se admitirán reclamos posteriores por daños
                  estéticos o roturas imputables a la intervención de terceros
                  (otros gremios, almacenamiento inapropiado en obra, etc.).
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  5. Garantía Corporativa
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Nuestros proyectos cuentan con una garantía de{" "}
                  <Text as="span" fontWeight="bold">
                    12 meses
                  </Text>{" "}
                  que ampara defectos de fabricación e instalación. Esta
                  garantía quedará sin efecto ante daños ocasionados por
                  negligencia, accidentes o manipulación por personal no
                  autorizado por nuestra empresa.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Card for Privacy Policy */}
          <Box
            width="100%"
            bg={glassSectionBg}
            backdropFilter={glassSectionBlur}
            border="none"
            boxShadow="sm"
            borderRadius="2xl"
            p={6}
          >
            <VStack spacing={6} align="start">
              <Heading as="h2" size="xl" color={headingColor}>
                Política de Privacidad y Protección de Datos Personales
              </Heading>
              <Text fontSize="md" color={textColor}>
                La presente política se aplica a todos los bancos de datos
                personales gestionados por{" "}
                <Text as="span" fontWeight="bold">
                  {companyData.razonSocial}
                </Text>
                , con RUC N° {companyData.ruc} y domicilio en{" "}
                {companyData.direccion}.
              </Text>
              <Text fontSize="md" color={textColor}>
                Garantizamos la absoluta confidencialidad de sus datos y
                empleamos altos estándares de seguridad conforme a la Ley de
                Protección de Datos Personales – Ley N° 29733 y su Reglamento
                (Decreto Supremo N° 016-2024-JUS).
              </Text>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  1. Objetivo y Finalidad
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Recopilamos sus datos personales (tales como nombre, teléfono,
                  dirección y correo electrónico) únicamente para gestionar la
                  prestación de nuestros servicios de vidriería y aluminio,
                  elaborar presupuestos, coordinar instalaciones y mantenerlo
                  informado sobre el estado de su proyecto.
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  2. Principios Rectores
                </Heading>
                <UnorderedList pl={4} color={textColor} spacing={2}>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Consentimiento:
                    </Text>{" "}
                    El tratamiento de sus datos siempre mediará su
                    consentimiento previo, expreso e informado.
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Finalidad:
                    </Text>{" "}
                    Sus datos serán utilizados exclusivamente para los fines del
                    servicio contratado.
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Seguridad:
                    </Text>{" "}
                    Implementamos medidas técnicas para evitar la pérdida, mal
                    uso o acceso no autorizado a su información.
                  </ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  3. Tratamiento de Datos
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Sus datos serán almacenados en nuestro banco de datos de
                  "Clientes" y podrán ser compartidos estrictamente con personal
                  autorizado y proveedores necesarios para la ejecución del
                  servicio (ej. transporte o instalación), siempre bajo
                  confidencialidad. No vendemos ni compartimos su información
                  con terceros para fines publicitarios sin su autorización.
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="lg" mb={2} color={headingColor}>
                  4. Ejercicio de Derechos del Titular
                </Heading>
                <Text fontSize="md" color={textColor}>
                  Usted puede ejercer sus derechos de Acceso, Rectificación,
                  Cancelación, Oposición, Portabilidad y Tratamiento Objetivo en
                  cualquier momento. Para ello, puede enviar una solicitud a
                  nuestro correo electrónico de contacto o acercarse a nuestra
                  oficina en el horario de atención al público.
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default CompanyPoliciesPage;
