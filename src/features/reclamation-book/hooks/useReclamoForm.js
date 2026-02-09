import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useToast } from "@chakra-ui/react";
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
 * @typedef {Object.<string, string>} FormErrors - Objeto de errores del formulario donde la clave es el nombre del campo y el valor es el mensaje de error.
 */

/**
 * Valida los datos del formulario de reclamo y devuelve un objeto con los errores encontrados.
 * Cada campo se valida individualmente y se agrega un mensaje de error si no cumple con los criterios.
 *
 * @param {object} formData - El objeto con los datos actuales del formulario de reclamo.
 * @returns {FormErrors} Un objeto que contiene mensajes de error para los campos inválidos.
 */
const validateForm = (formData) => {
  const errors = {};
  if (!formData.nombreCompleto.trim())
    errors.nombreCompleto = "El nombre completo es requerido.";
  if (!formData.domicilio.trim())
    errors.domicilio = "El domicilio es requerido.";
  if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = "El formato del email es inválido.";
  if (!formData.telefono.trim()) errors.telefono = "El teléfono es requerido.";
  if (!formData.tipoDocumento)
    errors.tipoDocumento = "Debe seleccionar un tipo de documento.";
  if (!formData.numeroDocumento.trim())
    errors.numeroDocumento = "El número de documento es requerido.";
  if (!formData.tipoBien) errors.tipoBien = "Debe seleccionar un tipo de bien.";
  if (!formData.descripcionBien.trim())
    errors.descripcionBien = "La descripción es requerida.";
  if (!formData.tipoSolicitud)
    errors.tipoSolicitud = "Debe seleccionar un tipo de solicitud.";
  if (!formData.detalle.trim())
    errors.detalle = "El detalle de la solicitud es requerido.";
  if (!formData.pedido.trim()) errors.pedido = "El pedido es requerido.";
  if (!formData.aceptaTerminos)
    errors.aceptaTerminos =
      "Debe aceptar los términos y la política de privacidad.";
  if (!formData.autorizaEmail)
    errors.autorizaEmail =
      "Debe autorizar el envío de la respuesta a su email.";

  return errors;
};

/**
 * @typedef {Object} ReclamoFormData
 * @property {string} nombreCompleto
 * @property {string} domicilio
 * @property {string} email
 * @property {string} telefono
 * @property {string} tipoDocumento
 * @property {string} numeroDocumento
 * @property {string} nombrePadreMadre
 * @property {string} tipoBien
 * @property {string} montoReclamado
 * @property {string} descripcionBien
 * @property {string} tipoSolicitud
 * @property {string} detalle
 * @property {string} pedido
 * @property {boolean} aceptaTerminos
 * @property {boolean} autorizaEmail
 */

/**
 * @typedef {Object} UseReclamoFormReturn
 * @property {ReclamoFormData} formData - El estado actual de los datos del formulario.
 * @property {FormErrors} errors - Un objeto con los mensajes de error de validación por campo.
 * @property {function(React.ChangeEvent<HTMLInputElement>): void} handleInputsChange - Manejador genérico para cambios en los campos de entrada del formulario.
 * @property {function(React.FormEvent<HTMLFormElement>): Promise<void>} handleBtnSubmit - Manejador para el envío del formulario, que incluye validación y lógica de envío a la API.
 * @property {object} modalProps - Propiedades para controlar un modal de éxito.
 * @property {boolean} modalProps.isOpen - Indica si el modal de éxito está abierto.
 * @property {function(): void} modalProps.onClose - Función para cerrar el modal de éxito y redirigir.
 * @property {string} modalProps.newReclamoId - ID del reclamo recién creado, si la solicitud fue exitosa.
 */

/**
 * Custom hook para gestionar toda la lógica del formulario de reclamo.
 * Encapsula el estado del formulario, la validación, el envío a la API y el manejo del modal de éxito.
 * Proporciona todas las propiedades y funciones necesarias para un formulario de reclamo completo.
 *
 * @returns {UseReclamoFormReturn} Un objeto con el estado del formulario, errores, manejadores y propiedades del modal.
 */
export const useReclamoForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newReclamoId, setNewReclamoId] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear the error for the field being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleModalCloseAndRedirect = () => {
    onClose();
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
        onOpen();
        setFormData(initialState); // Reset form on success
      } catch (error) {
        console.error("Error submitting reclamo: ", error);
        toast({
          title: "Error al enviar reclamo",
          description:
            error.message ||
            "Hubo un error al procesar su solicitud. Por favor, intente más tarde.",
          status: "error",
          duration: 6000,
          isClosable: true,
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