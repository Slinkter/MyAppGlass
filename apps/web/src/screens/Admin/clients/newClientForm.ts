export interface NewClientForm {
  fullName: string;
  dniRuc: string;
  phone: string;
  email: string;
  address: string;
  district: string;
}

export const EMPTY_NEW_CLIENT: NewClientForm = {
  fullName: "",
  dniRuc: "",
  phone: "",
  email: "",
  address: "",
  district: "La Molina",
};
