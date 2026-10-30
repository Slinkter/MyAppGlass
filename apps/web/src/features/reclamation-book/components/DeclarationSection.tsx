import React from "react";
import Link from "next/link";
import { Text, Heading, VStack, HStack, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { MathCaptchaField } from "@/shared/components/MathCaptchaField";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component DeclarationSection
 * @description Sección de declaración jurada, aceptación legal y envío del Libro de Reclamaciones.
 * Conforme a Ley N° 29571, Ley N° 31435 y Ley N° 29733 (Protección de Datos Personales).
 */
const DeclarationSection: React.FC = () => {
  const { formData, handleInputsChange, handleCheckboxChange, handleMathChange, errors } = useReclamationFormContext();

  return (
    <VStack gap="5" align="stretch">
      <HStack gap="2.5" pb="2" borderBottomWidth="1px" borderColor="border.default">
        <Box 
          w="24px" 
          h="24px" 
          borderRadius="full" 
          bg="primary.500" 
          color="white" 
          fontSize="xs" 
          fontWeight="900"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          4
        </Box>
        <Heading
          as="h3"
          size="sm"
          fontWeight="800"
          color="text.heading"
          letterSpacing="tight"
        >
          Declaración Jurada y Envío
        </Heading>
      </HStack>

      <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <input
          type="text"
          name="middleName"
          tabIndex={-1}
          autoComplete="off"
          value={formData.middleName || ""}
          onChange={handleInputsChange}
        />
      </div>

      <Box
        p="4"
        bg="surface.card"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="border.default"
      >
        <Text fontSize="xs" color="text.muted" lineHeight="relaxed">
          * Conforme a lo establecido en el <strong>Código de Protección y Defensa del Consumidor (Ley N° 29571)</strong> y su modificatoria por <strong>Ley N° 31435</strong>, la respuesta a la presente solicitud será remitida a la dirección de correo electrónico consignada en un plazo máximo e improrrogable de <strong>quince (15) días hábiles</strong>.
        </Text>
      </Box>

      <VStack gap="3" align="stretch">
        <Field
          errorText={errors.autorizaEmail}
          invalid={!!errors.autorizaEmail}
        >
          <Checkbox
            name="autorizaEmail"
            checked={formData.autorizaEmail}
            onCheckedChange={(details) => handleCheckboxChange("autorizaEmail", !!details.checked)}
          >
            <Text fontSize="xs" color="text.heading" fontWeight="500">
              Autorizo expresamente que la constancia y la respuesta formal a mi reclamo o queja sean notificadas a mi correo electrónico.
            </Text>
          </Checkbox>
        </Field>

        <Field
          errorText={errors.aceptaTerminos}
          invalid={!!errors.aceptaTerminos}
        >
          <Checkbox
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onCheckedChange={(details) => handleCheckboxChange("aceptaTerminos", !!details.checked)}
          >
            <Text fontSize="xs" color="text.heading" fontWeight="500">
              Declaro bajo juramento que la información proporcionada es veraz y autorizo el tratamiento de mis datos personales según la{" "}
              <Text as="span" color="text.accent" textDecoration="underline">
                <Link href="/politicas-empresa" target="_blank" rel="noopener noreferrer">
                  Política de Privacidad (Ley N° 29733)
                </Link>
              </Text>.
            </Text>
          </Checkbox>
        </Field>
      </VStack>

      {/* Reto Matemático de Seguridad */}
      <MathCaptchaField
        value={formData.mathAnswer || ""}
        onChange={handleMathChange}
        error={errors.mathAnswer}
        id="reclamo-math-captcha"
      />

      <Button
        type="submit"
        variant="aura"
        size="xl"
        borderRadius="full"
        fontWeight="900"
        letterSpacing="widest"
        width="full"
        mt="2"
      >
        REGISTRAR RECLAMO / QUEJA
      </Button>
    </VStack>
  );
};

export default DeclarationSection;
