"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster-instance";
import { submitContactAction, checkStatusAction } from "@features/contacto/actions";
import { env } from "@/shared/config/env";
import { validateMathChallengeLocally } from "@/shared/utils/mathCaptcha";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptedTerms: boolean;
  middleName: string;
  mathAnswer: string;
  mathToken: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  acceptedTerms?: string;
  mathAnswer?: string;
}

export interface TrackingResult {
  id: string;
  type: string;
  name: string;
  status: string;
  createdAt: string | number | Date;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptedTerms: false,
    middleName: "",
    mathAnswer: "",
    mathToken: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formLoadTime] = useState<number>(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);

  const validateField = (name: keyof FormErrors, value: string | boolean): string | undefined => {
    switch (name) {
      case "name":
        return !String(value).trim() ? "El nombre es obligatorio" : undefined;
      case "email":
        if (!String(value).trim()) return "El correo es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) return "Correo electrónico no válido";
        return undefined;
      case "message":
        return !String(value).trim() ? "Los detalles del proyecto son obligatorios" : undefined;
      case "acceptedTerms":
        return !value ? "Debes aceptar las políticas de privacidad" : undefined;
      case "mathAnswer":
        if (!String(value).trim()) return "Debes responder a la pregunta de seguridad";
        if (!validateMathChallengeLocally(String(value), formData.mathToken)) return "Respuesta incorrecta. Por favor verifica tu cálculo.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormErrors, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCheckedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptedTerms: checked }));
    if (errors.acceptedTerms) {
      setErrors((prev) => ({ ...prev, acceptedTerms: undefined }));
    }
  };

  const handleMathChange = (answer: string, token: string) => {
    setFormData((prev) => ({ ...prev, mathAnswer: answer, mathToken: token }));
    if (errors.mathAnswer) {
      setErrors((prev) => ({ ...prev, mathAnswer: undefined }));
    }
  };

  const handleTrackingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
  };

  const handleTrackingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toaster.create({ title: "Código requerido", type: "warning" });
      return;
    }

    setIsTracking(true);
    setTrackingResult(null);

    try {
      const result = await checkStatusAction(trackingId);
      if (result.success) {
        setTrackingResult(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (error: unknown) {
      toaster.create({
        title: "No encontrado",
        description: error instanceof Error ? error.message : "Error al buscar la solicitud",
        type: "error",
      });
    } finally {
      setIsTracking(false);
    }
  };
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successTrackingId, setSuccessTrackingId] = useState("");
  const router = useRouter();

  const handleCloseModal = () => {
    setIsSuccessOpen(false);
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const messageErr = validateField("message", formData.message);
    const termsErr = validateField("acceptedTerms", formData.acceptedTerms);
    const mathErr = validateField("mathAnswer", formData.mathAnswer);

    const newErrors: FormErrors = {
      ...(nameErr && { name: nameErr }),
      ...(emailErr && { email: emailErr }),
      ...(messageErr && { message: messageErr }),
      ...(termsErr && { acceptedTerms: termsErr }),
      ...(mathErr && { mathAnswer: mathErr }),
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      let recaptchaToken = "";

      // Execute reCAPTCHA v3 if available on window
      const win = typeof window !== "undefined" ? (window as unknown as { grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } }) : null;
      if (win && win.grecaptcha) {
        try {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            win.grecaptcha?.ready(() => {
              win.grecaptcha?.execute(
                env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                { action: "contact_submit" }
              )
                .then((token: string) => resolve(token))
                .catch((err: unknown) => reject(err));
            });
          });
        } catch (recaptchaErr) {
          console.error("reCAPTCHA execution error in Contact Form:", recaptchaErr);
        }
      }

      const result = await submitContactAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        acceptedTerms: formData.acceptedTerms,
        middleName: formData.middleName,
        _ts: formLoadTime,
        recaptchaToken,
        mathAnswer: formData.mathAnswer,
        mathToken: formData.mathToken,
      });
      
      if (result.success && result.id) {
        setSuccessTrackingId(result.id);
        setIsSuccessOpen(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          acceptedTerms: false,
          middleName: "",
          mathAnswer: "",
          mathToken: "",
        });
        setErrors({});
      } else {
        throw new Error(result.error);
      }
    } catch (error: unknown) {
      toaster.create({
        title: "Fallo en el servidor",
        description: error instanceof Error ? error.message : "Hubo un problema al enviar tu mensaje.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleCheckedChange,
    handleMathChange,
    handleSubmit,
    trackingId,
    isTracking,
    trackingResult,
    handleTrackingChange,
    handleTrackingSubmit,
    isSuccessOpen,
    handleCloseModal,
    successTrackingId,
  };
};

