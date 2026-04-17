import { ReclamoData } from "@/api/reclamoService";

/**
 * Extension of ReclamoData to include fields specific to the UI form state.
 */
export interface ReclamoFormState extends ReclamoData {
  archivos: File[];
}

/**
 * Type for form validation errors.
 */
export type FormErrors = Partial<Record<keyof ReclamoFormState, string>>;

/**
 * Props for the success modal.
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  newReclamoId: string;
}

/**
 * Value provided by the ReclamationFormContext.
 */
export interface ReclamationFormContextValue {
  formData: ReclamoFormState;
  errors: FormErrors;
  handleInputsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; type: string; checked: boolean | "indeterminate" } }) => void;
  handleFileChange: (details: { acceptedFiles: File[] }) => void;
  handleBtnSubmit: (e: React.FormEvent) => Promise<void>;
  modalProps: ModalProps;
}
