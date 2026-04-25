"use client";

import { useState } from "react";
import { toaster } from "@/components/ui/toaster-instance";
import { submitContactoAction, checkStatusAction } from "../actions";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracking State
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    } catch (error: any) {
      toaster.create({
        title: "No encontrado",
        description: error.message,
        type: "error",
      });
    } finally {
      setIsTracking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toaster.create({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos del formulario.",
        type: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactoAction(formData);
      
      if (result.success) {
        toaster.create({
          title: "¡Mensaje Enviado!",
          description: "Gracias por contactarnos. Te responderemos en menos de 24 horas.",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toaster.create({
        title: "Fallo en el servidor",
        description: error.message || "Hubo un problema al enviar tu mensaje.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    // Tracking exports
    trackingId,
    isTracking,
    trackingResult,
    handleTrackingChange,
    handleTrackingSubmit,
  };
};
