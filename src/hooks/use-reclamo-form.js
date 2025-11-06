import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { reclamoService } from "../api/reclamoService.js";

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
};

/**
 * Hook personalizado para gestionar la lógica del formulario de reclamaciones.
 * Encapsula el estado del formulario, la validación, el envío a Firestore y el manejo del modal de éxito.
 *
 * @returns {{
 *  formData: object,
 *  handleInputsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
 *  handleBtnSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *  modalProps: { isOpen: boolean, onClose: () => void, newReclamoId: string },
 *  handleModalCloseAndRedirect: () => void
 * }} - Objeto con el estado y los manejadores del formulario.
 */
export const useReclamoForm = () => {
    const [formData, setFormData] = useState(initialState);
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
    };

    const handleModalCloseAndRedirect = () => {
        onClose();
        navigate("/");
    };

    const handleBtnSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            "nombreCompleto",
            "domicilio",
            "email",
            "telefono",
            "tipoDocumento",
            "numeroDocumento",
            "tipoBien",
            "tipoSolicitud",
            "detalle",
        ];

        for (const field of requiredFields) {
            if (!formData[field]) {
                toast({
                    title: "Campos incompletos",
                    description: `Por favor, complete el campo requerido: ${field}`,
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
        }

        if (!formData.aceptaTerminos) {
            toast({
                title: "Error de validación",
                description:
                    "Debe declarar que la información es veraz y aceptar la política de privacidad.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const newId = await reclamoService.submitReclamo(formData);

            setNewReclamoId(newId);
            onOpen();
            setFormData(initialState);
        } catch (error) {
            console.error("Error submitting reclamo: ", error);

            // Default error message
            let toastConfig = {
                title: "Error al enviar reclamo",
                description:
                    "Hubo un error al procesar su solicitud. Por favor, intente más tarde.",
                status: "error",
            };

            // Customize message for specific backend errors
            if (error.code === "functions/invalid-argument") {
                toastConfig = {
                    title: "Datos inválidos",
                    description:
                        error.message ||
                        "Algunos campos del formulario son inválidos. Por favor, revíselos.",
                    status: "warning",
                };
            }

            toast({
                ...toastConfig,
                duration: 6000,
                isClosable: true,
            });
        }
    };

    return {
        formData,
        handleInputsChange,
        handleBtnSubmit,
        modalProps: {
            isOpen,
            onClose: handleModalCloseAndRedirect,
            newReclamoId,
        },
    };
};
