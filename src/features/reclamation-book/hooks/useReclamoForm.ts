import { useState } from "react";
import { useRouter as useNavigate } from "next/navigation";
import { toaster } from "@/components/ui/toaster-instance"; // v3: useToast → toaster
import { reclamoService } from "@/api/reclamoService";
import { ReclamoFormState, FormErrors, ReclamationFormContextValue } from "../types";

const initialState: ReclamoFormState = {
  nombreCompleto: "",
  domicilio: "",
  email: "",
  telefono: "",
  tipoDocumento: "",
  numeroDocumento: "",
  nombrePadreMadre: "",
  tipoBien: "",
  montoReclamado: "",
  descripcionBien: "",
  tipoSolicitud: "",
  detalle: "",
  pedido: "",
  aceptaTerminos: false,
  autorizaEmail: false,
  archivos: [],
};

const validateForm = (formData: ReclamoFormState): FormErrors => {
  const errors: FormErrors = {};
  if (!formData.nombreCompleto.trim()) errors.nombreCompleto = "El nombre completo es requerido.";
  if (!formData.domicilio.trim()) errors.domicilio = "El domicilio es requerido.";
  if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "El formato del email es inválido.";
  if (!formData.telefono.trim()) errors.telefono = "El teléfono es requerido.";
  if (!formData.tipoDocumento) errors.tipoDocumento = "Debe seleccionar un tipo de documento.";
  if (!formData.numeroDocumento.trim()) errors.numeroDocumento = "El número de documento es requerido.";
  if (!formData.tipoBien) errors.tipoBien = "Debe seleccionar un tipo de bien.";
  if (!formData.descripcionBien.trim()) errors.descripcionBien = "La descripción es requerida.";
  if (!formData.tipoSolicitud) errors.tipoSolicitud = "Debe seleccionar un tipo de solicitud.";
  if (!formData.detalle.trim()) errors.detalle = "El detalle de la solicitud es requerido.";
  if (!formData.pedido.trim()) errors.pedido = "El pedido es requerido.";
  if (!formData.aceptaTerminos) errors.aceptaTerminos = "Debe aceptar los términos y la política de privacidad.";
  if (!formData.autorizaEmail) errors.autorizaEmail = "Debe autorizar el envío de la respuesta a su email.";
  return errors;
};

/**
 * Custom hook para gestionar toda la lógica del formulario de reclamo.
 * Migrado a Chakra v3: useDisclosure → useState, useToast → toaster.
 *
 * @returns {ReclamationFormContextValue} Estado, manejadores y props del modal.
 */
export const useReclamoForm = (): ReclamationFormContextValue => {
  const [formData, setFormData] = useState<ReclamoFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  // v3: useDisclosure replaced with useState
  const [isOpen, setIsOpen] = useState(false);
  const [newReclamoId, setNewReclamoId] = useState("");
  const navigate = useNavigate();

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; type: string; checked: boolean | "indeterminate" } }
  ) => {
    let name: string;
    let value: string | undefined;
    let type: string | undefined;
    let checked: boolean | "indeterminate" | undefined;

    if ("nativeEvent" in e) {
      // It's a React.ChangeEvent
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      name = target.name;
      value = target.value;
      type = (target as HTMLInputElement).type;
      checked = (target as HTMLInputElement).checked;
    } else {
      // It's the custom object from Checkbox onCheckedChange
      name = e.target.name;
      type = e.target.type;
      checked = e.target.checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof ReclamoFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (details: { acceptedFiles: File[] }) => {
    const { acceptedFiles } = details;
    setFormData((prev) => ({
      ...prev,
      archivos: acceptedFiles,
    }));
  };

  const handleModalCloseAndRedirect = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleBtnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const isFormValid = Object.keys(validationErrors).length === 0;

    if (isFormValid) {
      try {
        // Enviar solo los campos que espera el servicio (sin archivos si no están definidos en ReclamoData)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { archivos, ...rest } = formData;
        const newId = await reclamoService.submitReclamo(rest);
        setNewReclamoId(newId);
        setIsOpen(true);
        setFormData(initialState);
      } catch (error: unknown) {
        console.error("Error submitting reclamo: ", error);
        const errorMessage = error instanceof Error ? error.message : "Hubo un error al procesar su solicitud. Por favor, intente más tarde.";
        // v3: toaster.create() instead of toast()
        toaster.create({
          title: "Error al enviar reclamo",
          description: errorMessage,
          type: "error",
          duration: 6000,
        });
      }
    }
  };

  return {
    formData,
    errors,
    handleInputsChange,
    handleFileChange,
    handleBtnSubmit,
    modalProps: {
      isOpen,
      onClose: handleModalCloseAndRedirect,
      newReclamoId,
    },
  };
};
