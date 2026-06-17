import { Metadata } from "next";
import { BankAccountsView } from "@/screens/legal";

export const metadata: Metadata = {
  title: "Cuentas Bancarias | Glass & Aluminum Company S.A.C.",
  description: "Información oficial de cuentas bancarias de Glass & Aluminum Company S.A.C. para pagos y transferencias. Empresa peruana con más de 10 años de experiencia.",
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <BankAccountsView />
    </ComponentErrorBoundary>
  );
}
