import React from "react";
import { Box, Heading, Text, VStack, Container, useColorModeValue } from "@chakra-ui/react";
import HelmetWrapper from "@/components/HelmetWrapper";

const BankAccountsPage = () => {
    const textColor = useColorModeValue("gray.800", "gray.100");
    const headingColor = useColorModeValue("primary.700", "primary.300");

    return (
        <>
            <HelmetWrapper
                title="Cuentas Bancarias y Datos de Facturación - GYA Company"
                description="Información detallada de cuentas bancarias y datos fiscales para pagos y facturación a GYA Company."
                canonicalUrl="https://www.gyacompany.com/cuentas-bancarias"
            />
            <Container maxW="7xl" py={10}>
                <VStack spacing={8} align="start">
                    <Heading as="h1" size="2xl" color={headingColor}>
                        Cuentas Bancarias y Datos de Facturación
                    </Heading>
                    <Text fontSize="lg" color={textColor}>
                        En GYA Company, valoramos la transparencia y facilitamos sus procesos de pago y facturación. A continuación, encontrará nuestra información bancaria y fiscal detallada, esencial para sus transacciones, incluyendo aquellas sujetas a retenciones (detracciones).
                        Esta información es crucial para la confianza y claridad, especialmente para nuestros clientes corporativos.
                    </Text>

                    {/* Sección de Identificación Fiscal */}
                    <Box width="100%">
                        <Heading as="h2" size="xl" mb={4} color={headingColor}>
                            Identificación Fiscal
                        </Heading>
                        <VStack align="start" spacing={2}>
                            <Text fontSize="md" color={textColor}>
                                <Text as="span" fontWeight="bold">Razón Social:</Text> Glass & Aluminum Company S.A.C.
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                <Text as="span" fontWeight="bold">R.U.C:</Text> 20606432870
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                <Text as="span" fontWeight="bold">Dirección Fiscal:</Text> Av. Los Fresnos Mz H Lt 16 (1250), Urb. El Valle - La Molina, Lima.
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                <Text as="span" fontWeight="bold">Correo de Facturación:</Text> acueva@gyacompany.com
                            </Text>
                        </VStack>
                    </Box>

                    {/* Sección de Cuentas Bancarias (Soles) */}
                    <Box width="100%">
                        <Heading as="h2" size="xl" mb={4} color={headingColor}>
                            Cuentas Bancarias (Soles)
                        </Heading>
                        <VStack align="start" spacing={2}>
                            <Text fontSize="md" color={textColor}>
                                <Text as="span" fontWeight="bold">Banco:</Text> BBVA
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                <Text as="span" fontWeight="bold">N° Cuenta:</Text> 0011-0106-0100041622
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                <Text as="span" fontWeight="bold">CCI:</Text> 011-106-000100041622-20
                            </Text>
                        </VStack>
                    </Box>

                    {/* Sección de Cuenta de Detracciones */}
                    <Box width="100%">
                        <Heading as="h2" size="xl" mb={4} color={headingColor}>
                            Cuenta de Detracciones (Banco de la Nación)
                        </Heading>
                        <Text fontSize="md" color={textColor}>
                            <Text as="span" fontWeight="bold">N° Cuenta:</Text> 00-066-173291 (Obligatorio para facturas sujetas a detracción)
                        </Text>
                    </Box>

                    <Text fontSize="lg" color={textColor}>
                        Para cualquier consulta adicional o confirmación de pagos, no dude en contactarnos a <Text as="span" fontWeight="bold">acueva@gyacompany.com</Text>.
                    </Text>
                </VStack>
            </Container>
        </>
    );
};

export default BankAccountsPage;
