import React from "react";
import {
  Textarea,
  Heading,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "@/components/ui/file-upload";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component ClaimDetailSection
 * @description Sección de detalle de la solicitud/reclamo
 */
const ClaimDetailSection: React.FC = () => {
  const { formData, handleInputsChange, handleFileChange, errors } = useReclamationFormContext();

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
          3
        </Box>
        <Heading
          as="h3"
          size="sm"
          fontWeight="800"
          color="text.heading"
          letterSpacing="tight"
        >
          Detalle de su Solicitud
        </Heading>
      </HStack>

      <Field 
        label="Tipo de Solicitud" 
        required 
        invalid={!!errors.tipoSolicitud} 
        errorText={errors.tipoSolicitud}
      >
        <NativeSelectRoot variant="subtle">
          <NativeSelectField
            name="tipoSolicitud"
            value={formData.tipoSolicitud}
            onChange={handleInputsChange}
            placeholder="Seleccionar tipo de registro"
          >
            <option value="Reclamo">
              Reclamo (Disconformidad con el producto o servicio contratado)
            </option>
            <option value="Queja">
              Queja (Malestar o descontento respecto a la atención al cliente)
            </option>
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>

      <Field 
        label="Detalle de la Solicitud" 
        required 
        invalid={!!errors.detalle} 
        errorText={errors.detalle}
      >
        <Textarea
          variant="subtle"
          name="detalle"
          value={formData.detalle}
          onChange={handleInputsChange}
          placeholder="Describa claramente los hechos ocurridos..."
          rows={4}
        />
      </Field>

      <Field 
        label="Pedido del Consumidor" 
        required 
        invalid={!!errors.pedido} 
        errorText={errors.pedido}
      >
        <Textarea
          variant="subtle"
          name="pedido"
          value={formData.pedido}
          onChange={handleInputsChange}
          placeholder="Especifique qué solución o acción solicita (Ej: Reparación, cambio, devolución)..."
          rows={3}
        />
      </Field>

      <Field 
        label="Adjuntar Evidencias (Opcional)"
        helperText="Puede adjuntar fotografías, comprobantes o documentos que sustenten su solicitud (Máx 5MB por archivo)."
      >
        <FileUploadRoot 
          maxW="xl" 
          alignItems="stretch" 
          maxFiles={3}
          onFileChange={handleFileChange}
        >
          <FileUploadDropzone
            label="Arrastre sus archivos aquí o haga clic para examinar"
            description=".png, .jpg, .pdf hasta 5MB"
          />
          <FileUploadList clearable showSize />
        </FileUploadRoot>
      </Field>
    </VStack>
  );
};

export default ClaimDetailSection;
