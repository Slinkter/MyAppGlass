import { Metadata } from "next";
import { BankAccountsView } from "@/screens/Legal";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = buildPageMetadata({
  title: "Cuentas Bancarias Oficiales",
  description:
    "Consulta las cuentas corrientes y números de cuenta interbancaria (BCP e Interbank) y RUC oficial de Glass & Aluminum Company S.A.C.",
  path: "/cuentas-bancarias",
});

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <BankAccountsView />
    </ComponentErrorBoundary>
  );
}
