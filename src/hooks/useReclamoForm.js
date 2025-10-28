import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { db } from "../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";

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
        if (!formData.aceptaTerminos) {
            alert("Debe declarar que la información es veraz y aceptar la política de privacidad.");
            return;
        }

        try {
            const options = {
                year: "numeric", month: "2-digit", day: "2-digit",
                hour: "2-digit", minute: "2-digit", second: "2-digit",
                hour12: false, timeZone: "America/Lima",
            };
            const refReclamos = collection(db, "reclamaciones");
            const docRef = await addDoc(refReclamos, {
                ...formData,
                fechaReclamo: new Date().toISOString("es-PE", options),
            });

            setNewReclamoId(docRef.id);
            onOpen();
            setFormData(initialState);
        } catch (error) {
            console.error("Error writing document to Firestore: ", error);
            alert("Hubo un error al enviar su reclamo. Por favor, intente más tarde.");
        }
    };

    return {
        formData,
        handleInputsChange,
        handleBtnSubmit,
        modalProps: { isOpen, onClose: handleModalCloseAndRedirect, newReclamoId },
    };
};