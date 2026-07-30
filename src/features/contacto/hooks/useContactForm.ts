"use client";

import { useState } from "react";
import { toaster } from "@/components/ui/toaster-instance";
import { submitContactAction, checkStatusAction } from "@features/contacto/actions";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  acceptedTerms: boolean;
  hp_confirm: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  acceptedTerms?: string;
}

export interface TrackingResult {
  id: string;
  type: string;
  name: string;
  status: string;
  createdAt: string | number | Date;
}

export const useContactForm = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    projectType: "Vidrio Templado",
    message: "",
    acceptedTerms: false,
    hp_confirm: "",
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
      case "phone":
        if (value && !/^[0-9+\s-]{6,15}$/.test(String(value))) return "Número telefónico no válido";
        return undefined;
      case "message":
        return !String(value).trim() ? "Cuéntanos brevemente sobre tu proyecto o medidas" : undefined;
      case "acceptedTerms":
        return !value ? "Debes aceptar las políticas de privacidad" : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const setProjectType = (type: string) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const nextStep = () => {
    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const phoneErr = validateField("phone", formData.phone);

    const step1Errors: FormErrors = {
      ...(nameErr && { name: nameErr }),
      ...(emailErr && { email: emailErr }),
      ...(phoneErr && { phone: phoneErr }),
    };

    setErrors(step1Errors);

    if (Object.keys(step1Errors).length === 0) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const messageErr = validateField("message", formData.message);
    const termsErr = validateField("acceptedTerms", formData.acceptedTerms);

    const step2Errors: FormErrors = {
      ...(messageErr && { message: messageErr }),
      ...(termsErr && { acceptedTerms: termsErr }),
    };

    setErrors(step2Errors);

    if (Object.keys(step2Errors).length > 0) return;

    setIsSubmitting(true);

    try {
      const fullMessage = `[Tipo de Proyecto: ${formData.projectType}] [Teléfono: ${formData.phone || "No especificado"}]\n\n${formData.message}`;
      const result = await submitContactAction({
        name: formData.name,
        email: formData.email,
        message: fullMessage,
        acceptedTerms: formData.acceptedTerms,
        hp_confirm: formData.hp_confirm,
        _ts: formLoadTime,
      });
      
      if (result.success) {
        toaster.create({
          title: "¡Cotización Recibida!",
          description: "Hemos recibido tu requerimiento. Un especialista técnico te contactará pronto.",
          type: "success",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "Vidrio Templado",
          message: "",
          acceptedTerms: false,
          hp_confirm: "",
        });
        setStep(1);
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
    step,
    nextStep,
    prevStep,
    formData,
    errors,
    isSubmitting,
    handleChange,
    setProjectType,
    handleBlur,
    handleCheckedChange,
    handleSubmit,
    trackingId,
    isTracking,
    trackingResult,
    handleTrackingChange,
    handleTrackingSubmit,
  };
};
