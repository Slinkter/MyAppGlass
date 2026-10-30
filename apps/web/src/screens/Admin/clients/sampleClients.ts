import { ClientProfile } from "@/shared/schemas/ecommerce-schemas";

/** Clientes de ejemplo usados cuando Firestore está vacío o falla. */
export const SAMPLE_CLIENTS: ClientProfile[] = [
  {
    userId: "cli_01",
    fullName: "Constructora Los Fresnos S.A.C.",
    dniRuc: "20601542407",
    phone: "974278303",
    email: "compras@losfresnos.pe",
    address: "Av. Los Fresnos 1214",
    district: "La Molina",
    role: "cliente",
  },
  {
    userId: "cli_02",
    fullName: "Arq. María Elena Prado",
    dniRuc: "45879632",
    phone: "996537435",
    email: "obras@pradoarq.pe",
    address: "Calle Los Cedros 340",
    district: "Surco",
    role: "cliente",
  },
];
