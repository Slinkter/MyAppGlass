import React from "react";
import { Text, Heading, VStack, HStack, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component DeclarationSection
 * @description Sección de declaración, aceptación y envío
 * Migrado a Chakra v3: FormControl+Checkbox → Field + Checkbox snippet (compound component)
 */
const DeclarationSection: React.FC = () => {
  const { formData, handleInputsChange, handleBtnSubmit, errors } = useReclamationFormContext();

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
          name="hp_confirm"
          tabIndex={-1}
          autoComplete="off"
          value={formData.hp_confirm || ""}
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
          * Conforme a lo establecido en el D.S. N° 006-2014-PCM, la respuesta a la presente solicitud será remitida a la dirección de correo electrónico consignada en un plazo máximo de 15 días hábiles.
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
            onCheckedChange={(details) =>
              handleInputsChange({ target: { name: "autorizaEmail", type: "checkbox", checked: details.checked } })
            }
          >
            <Text fontSize="xs" color="text.heading" fontWeight="500">
              Autorizo expresamente que la respuesta a mi reclamo o queja sea notificada a mi correo electrónico.
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
            onCheckedChange={(details) =>
              handleInputsChange({ target: { name: "aceptaTerminos", type: "checkbox", checked: details.checked } })
            }
          >
            <Text fontSize="xs" color="text.heading" fontWeight="500">
              Declaro bajo juramento que la información proporcionada es veraz y acepto la Política de Protección de Datos.
            </Text>
          </Checkbox>
        </Field>
      </VStack>

      <Button
        type="submit"
        variant="aura"
        size="xl"
        borderRadius="full"
        fontWeight="900"
        letterSpacing="widest"
        width="full"
        mt="2"
        onClick={handleBtnSubmit}
      >
        REGISTRAR RECLAMO / QUEJA
      </Button>
    </VStack>
  );
};

export default DeclarationSection;
