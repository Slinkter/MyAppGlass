import { Metadata } from "next";
import { BankAccountsClient } from "./BankAccountsClient";

export const metadata: Metadata = {
  title: "Cuentas Bancarias y Datos de Facturación - GYA Company",
  description: "Información detallada de cuentas bancarias y datos fiscales para pagos y facturación a GYA Company.",
  alternates: {
    canonical: "https://www.gyacompany.com/cuentas-bancarias",
  },
};

export default function BankAccountsPage() {
  return <BankAccountsClient />;
}
