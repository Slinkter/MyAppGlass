import { ReclamationData } from "@/shared/api/reclamoService";

/**
 * Extension of ReclamationData to include fields specific to the UI form state.
 */
export interface ReclamationFormState extends ReclamationData {
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
 * Value provided by the ReclamationFormContext.
 */
export interface ReclamationFormContextValue {
  formData: ReclamationFormState;
  errors: FormErrors;
  handleInputsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; type: string; checked: boolean | "indeterminate" } }) => void;
  handleFileChange: (details: { acceptedFiles: File[] }) => void;
  handleBtnSubmit: (e: React.FormEvent) => Promise<void>;
  modalProps: ModalProps;
}
