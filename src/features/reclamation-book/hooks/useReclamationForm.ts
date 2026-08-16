"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster-instance";
import { submitReclamationAction } from "@features/reclamation-book/actions";
import { ReclamationFormState, FormErrors, ReclamationFormContextValue, InputChangeEvent } from "@features/reclamation-book/types";
import {
  sanitizeSingleLine,
  sanitizeMultilineText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeDocumentNumber,
  sanitizeReclamationData,
  isValidTipoDocumento,
  isValidTipoBien,
  isValidTipoSolicitud,
} from "@features/reclamation-book/utils/sanitizer";

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
  middleName: "",
  archivos: [],
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = (formData: ReclamationFormState): FormErrors => {
  const errors: FormErrors = {};

  if (!sanitizeSingleLine(formData.nombreCompleto)) {
    errors.nombreCompleto = "El nombre completo es requerido.";
  }
  if (!sanitizeSingleLine(formData.domicilio)) {
    errors.domicilio = "El domicilio es requerido.";
  }

  const cleanEmail = sanitizeEmail(formData.email);
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    errors.email = "El formato del email es inválido.";
  }

  if (!sanitizePhone(formData.telefono)) {
    errors.telefono = "El teléfono es requerido.";
  }
  if (!formData.tipoDocumento || !isValidTipoDocumento(formData.tipoDocumento)) {
    errors.tipoDocumento = "Debe seleccionar un tipo de documento válido.";
  }
  if (!sanitizeDocumentNumber(formData.numeroDocumento)) {
    errors.numeroDocumento = "El número de documento es requerido.";
  }
  if (!formData.tipoBien || !isValidTipoBien(formData.tipoBien)) {
    errors.tipoBien = "Debe seleccionar un tipo de bien válido.";
  }
  if (!sanitizeMultilineText(formData.descripcionBien)) {
    errors.descripcionBien = "La descripción es requerida.";
  }
  if (!formData.tipoSolicitud || !isValidTipoSolicitud(formData.tipoSolicitud)) {
    errors.tipoSolicitud = "Debe seleccionar un tipo de solicitud válido.";
  }
  if (!sanitizeMultilineText(formData.detalle)) {
    errors.detalle = "El detalle de la solicitud es requerido.";
  }
  if (!sanitizeMultilineText(formData.pedido)) {
    errors.pedido = "El pedido es requerido.";
  }
  if (!formData.aceptaTerminos) {
    errors.aceptaTerminos = "Debe aceptar los términos y la política de privacidad.";
  }
  if (!formData.autorizaEmail) {
    errors.autorizaEmail = "Debe autorizar el envío de la respuesta a su email.";
  }

  return errors;
};

/**
 * Custom hook to manage the reclamation form logic with strict validation and sanitization.
 * Standardized for Chakra v3.
 *
 * @returns {ReclamationFormContextValue} State, handlers and modal props.
 */
export const useReclamationForm = (): ReclamationFormContextValue => {
  const [formData, setFormData] = useState<ReclamationFormState>(initialState);
  const [formLoadTime] = useState<number>(() => Date.now());
  const [errors, setErrors] = useState<FormErrors>({});
  const [isOpen, setIsOpen] = useState(false);
  const [newReclamationId, setNewReclamationId] = useState("");
  const router = useRouter();

  const handleInputsChange = (e: InputChangeEvent) => {
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
      [name]: type === "checkbox" ? Boolean(checked) : value ?? "",
    }));

    if (errors[name as keyof ReclamationFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (name: keyof ReclamationFormState, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));

    if (errors[name]) {
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
        let recaptchaToken = "";
        
        // Execute reCAPTCHA v3 if available on window
        const win = typeof window !== "undefined" ? (window as unknown as { grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } }) : null;
        if (win && win.grecaptcha) {
          try {
            recaptchaToken = await new Promise<string>((resolve, reject) => {
              win.grecaptcha?.ready(() => {
                win.grecaptcha?.execute(
                  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LfmMIktAAAAAAMpZBhN56QIkjXT9U34Dyk56nlx",
                  { action: "reclamation_submit" }
                )
                  .then((token: string) => resolve(token))
                  .catch((err: unknown) => reject(err));
              });
            });
          } catch (recaptchaErr) {
            console.error("reCAPTCHA execution error:", recaptchaErr);
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { archivos: _archivos, ...rawPayload } = formData;
        const sanitizedPayload = sanitizeReclamationData({
          ...rawPayload,
          recaptchaToken,
          _ts: formLoadTime,
        });

        const result = await submitReclamationAction(sanitizedPayload);

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
          throw new Error(result.error || "Error al registrar el reclamo.");
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
    handleCheckboxChange,
    handleFileChange,
    handleBtnSubmit,
    modalProps: {
      isOpen,
      onClose: handleModalCloseAndRedirect,
      newReclamationId,
    },
  };
};
