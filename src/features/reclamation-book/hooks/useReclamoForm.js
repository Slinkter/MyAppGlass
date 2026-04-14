import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster"; // v3: useToast → toaster
import { reclamoService } from "@/api/reclamoService.js";

const initialState = {
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
};

/**
 * @typedef {Object.<string, string>} FormErrors
 */

const validateForm = (formData) => {
  const errors = {};
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
 * @returns {object} Estado, manejadores y props del modal.
 */
export const useReclamoForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  // v3: useDisclosure replaced with useState
  const [isOpen, setIsOpen] = useState(false);
  const [newReclamoId, setNewReclamoId] = useState("");
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleModalCloseAndRedirect = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleBtnSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const isFormValid = Object.keys(validationErrors).length === 0;

    if (isFormValid) {
      try {
        const newId = await reclamoService.submitReclamo(formData);
        setNewReclamoId(newId);
        setIsOpen(true);
        setFormData(initialState);
      } catch (error) {
        console.error("Error submitting reclamo: ", error);
        // v3: toaster.create() instead of toast()
        toaster.create({
          title: "Error al enviar reclamo",
          description: error.message || "Hubo un error al procesar su solicitud. Por favor, intente más tarde.",
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
    handleBtnSubmit,
    modalProps: {
      isOpen,
      onClose: handleModalCloseAndRedirect,
      newReclamoId,
    },
  };
};