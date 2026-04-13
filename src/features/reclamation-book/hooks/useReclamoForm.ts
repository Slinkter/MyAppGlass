import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import { reclamoService } from "@/api/reclamoService";
import { toaster } from "@/components/ui/toaster";

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

export type ReclamoFormData = typeof initialState;

const validateForm = (formData: ReclamoFormData) => {
  const errors: Record<string, string> = {};
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

export const useReclamoForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const { open, onOpen, onClose } = useDisclosure();
  const [newReclamoId, setNewReclamoId] = useState("");
  const router = useRouter();

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = e.target.checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const setFieldValue = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleModalCloseAndRedirect = () => {
    onClose();
    router.push("/");
  };

  const handleBtnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const isFormValid = Object.keys(validationErrors).length === 0;

    if (isFormValid) {
      try {
        const newId = await reclamoService.submitReclamo(formData);
        setNewReclamoId(newId);
        onOpen();
        setFormData(initialState);
      } catch (error: any) {
        console.error("Error submitting reclamo: ", error);
        toaster.create({
          title: "Error al enviar reclamo",
          description:
            error.message ||
            "Hubo un error al procesar su solicitud. Por favor, intente más tarde.",
          type: "error",
        });
      }
    }
  };

  return {
    formData,
    errors,
    handleInputsChange,
    setFieldValue,
    handleBtnSubmit,
    modalProps: {
      isOpen: open,
      onClose: handleModalCloseAndRedirect,
      newReclamoId,
    },
  };
};
