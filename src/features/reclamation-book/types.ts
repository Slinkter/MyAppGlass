import { ReclamationData } from "@/shared/api/reclamoService";

export type TipoDocumento = "DNI" | "CE" | "PASAPORTE";
export type TipoBien = "producto" | "servicio";
export type TipoSolicitud = "Reclamo" | "Queja";

/**
 * Extension of ReclamationData to include fields specific to the UI form state.
 */
export interface ReclamationFormState extends ReclamationData {
  tipoDocumento: TipoDocumento | "";
  tipoBien: TipoBien | "";
  tipoSolicitud: TipoSolicitud | "";
  middleName: string;
  recaptchaToken?: string;
  archivos: File[];
}

/**
 * Type for form validation errors.
 */
export type FormErrors = Partial<Record<keyof ReclamationFormState, string>>;

/**
 * Props for the success modal.
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  newReclamationId: string;
}

/**
 * Event parameter type accepted by input handlers.
 */
export type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | { target: { name: string; type: string; checked: boolean | "indeterminate" } };

/**
 * Value provided by the ReclamationFormContext.
 */
export interface ReclamationFormContextValue {
  formData: ReclamationFormState;
  errors: FormErrors;
  handleInputsChange: (e: InputChangeEvent) => void;
  handleFileChange: (details: { acceptedFiles: File[] }) => void;
  handleBtnSubmit: (e: React.FormEvent) => Promise<void>;
  modalProps: ModalProps;
}

