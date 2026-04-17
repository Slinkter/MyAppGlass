import { Metadata } from "next";
import BankAccountsPage from "@/pages/BankAccountsPage";

export const metadata: Metadata = {
  title: "Cuentas Bancarias | GYA Glass & Aluminum",
  description: "Información oficial de las cuentas bancarias de la empresa para pagos y transferencias.",
};

export default function Page() {
  return <BankAccountsPage />;
}
