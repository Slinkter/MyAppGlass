import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { HomeView } from "@/screens/home";

export const metadata: Metadata = {
  title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
  description: "Expertos en vidriería y aluminio en La Molina. Ventanas antirruido, mamparas, duchas y barandas de vidrio. ¡Cotiza a domicilio con GYA Company!",
  keywords: ["vidriería la molina", "Glass & Aluminum Company S.A.C.", "GYA Company", "ventanas antirruido la molina", "mamparas de vidrio"],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
    description: "Expertos en vidriería y aluminio en La Molina. Ventanas antirruido, mamparas, duchas y barandas de vidrio. ¡Cotiza a domicilio con GYA Company!",
    url: SITE_URL,
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <HomeView />
    </ComponentErrorBoundary>
  );
}
