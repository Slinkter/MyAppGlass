import { Metadata } from "next";
import { BankAccountsView } from "@/screens/legal";

export const metadata: Metadata = {
  title: "Cuentas Bancarias Oficiales | GYA Company",
  description: "Consulta las cuentas bancarias BCP e Interbank y RUC oficial de Glass & Aluminum Company S.A.C. para transferencias sin comisión.",
  alternates: {
    canonical: "https://www.gyacompany.com/cuentas-bancarias",
  },
  openGraph: {
    title: "Cuentas Bancarias Oficiales | GYA Company",
    description: "Consulta las cuentas bancarias BCP e Interbank y RUC oficial de Glass & Aluminum Company S.A.C. para transferencias sin comisión.",
    url: "https://www.gyacompany.com/cuentas-bancarias",
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <BankAccountsView />
    </ComponentErrorBoundary>
  );
}
