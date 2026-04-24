import { Metadata } from "next";
import { BankAccountsView } from "@/views/legal";

export const metadata: Metadata = {
  title: "Cuentas Bancarias | GYA Glass & Aluminum",
  description: "Información oficial de las cuentas bancarias de la empresa para pagos y transferencias.",
};

export default function Page() {
  return <BankAccountsView />;
}
