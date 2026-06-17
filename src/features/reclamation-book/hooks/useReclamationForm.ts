"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster-instance";
import { submitReclamationAction } from "../actions";
import { ReclamationFormState, FormErrors, ReclamationFormContextValue } from "../types";

const initialState: ReclamationFormState = {
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

const validateForm = (formData: ReclamationFormState): FormErrors => {
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
 * Custom hook to manage the reclamation form logic.
 * Standardized for Chakra v3.
 *
 * @returns {ReclamationFormContextValue} State, handlers and modal props.
 */
export const useReclamationForm = (): ReclamationFormContextValue => {
  const [formData, setFormData] = useState<ReclamationFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isOpen, setIsOpen] = useState(false);
  const [newReclamationId, setNewReclamationId] = useState("");
  const router = useRouter();

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; type: string; checked: boolean | "indeterminate" } }
  ) => {
    let name: string;
    let value: string | undefined;
    let type: string | undefined;
    let checked: boolean | "indeterminate" | undefined;

    if ("nativeEvent" in e) {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      name = target.name;
      value = target.value;
      type = (target as HTMLInputElement).type;
      checked = (target as HTMLInputElement).checked;
    } else {
      name = e.target.name;
      type = e.target.type;
      checked = e.target.checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof ReclamationFormState]) {
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
    router.push("/");
  };

  const handleBtnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const isFormValid = Object.keys(validationErrors).length === 0;

    if (isFormValid) {
      const toastId = toaster.create({
        title: "Procesando solicitud...",
        description: "Enviando reclamo al servidor legal.",
        type: "info",
        duration: 20000,
      });

      try {
        const { archivos, ...rest } = formData;
        const result = await submitReclamationAction(rest);

        toaster.dismiss(toastId);

        if (result.success && result.id) {
          setNewReclamationId(result.id);
          setIsOpen(true);
          setFormData(initialState);

          toaster.create({
            title: "Reclamo enviado",
            description: "Se ha registrado su reclamo exitosamente.",
            type: "success",
            duration: 5000,
          });
        } else {
          throw new Error(result.error);
        }
      } catch (error: unknown) {
        toaster.dismiss(toastId);
        console.error("Error submitting reclamation: ", error);
        const errorMessage = error instanceof Error ? error.message : "Hubo un error al procesar su solicitud.";

        toaster.create({
          title: "Fallo en el servidor",
          description: `Detalle: ${errorMessage}`,
          type: "error",
          duration: 10000,
        });
      }
    } else {
      toaster.create({
        title: "Campos incompletos",
        description: "Por favor, revise los errores en el formulario.",
        type: "warning",
        duration: 4000,
      });
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
      newReclamationId,
    },
  };
};
