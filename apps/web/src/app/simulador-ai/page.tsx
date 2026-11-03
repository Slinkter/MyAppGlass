import type { Metadata } from "next";
import { SimuladorAIScreen } from "@/screens/SimuladorAI/SimuladorAIScreen";
import { SITE_URL } from "@/shared/config/company-data";
import {
  buildPageMetadata,
  getWebAppJsonLd,
  getBreadcrumbJsonLd,
  serializeJsonLd,
} from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

const SIMULADOR_TITLE = "Simulador Visual de Ventanas y Mamparas en Tu Espacio";
const SIMULADOR_DESCRIPTION =
  "Previsualiza sistemas de ventanas (Sistema Nova, Serie 25, Serie 35, Serie 62), tipos de vidrio (Crudo, Laminado, Templado) y colores de aluminio directamente sobre la foto de tu ambiente.";

export const metadata: Metadata = buildPageMetadata({
  title: SIMULADOR_TITLE,
  description: SIMULADOR_DESCRIPTION,
  path: "/simulador-ai",
  keywords: [
    "simulador visual de ventanas",
    "simulador Sistema Nova",
    "Serie 25 Serie 35 Serie 62",
    "vidrio laminado templado simulador",
    "simulador mamparas lima",
  ],
});

export default function SimuladorAIPage() {
  const url = `${SITE_URL}/simulador-ai`;
  const webAppJsonLd = getWebAppJsonLd(SIMULADOR_TITLE, SIMULADOR_DESCRIPTION, url);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Inicio", url: SITE_URL },
    { name: "Simulador Visual", url },
  ]);

  return (
    <ComponentErrorBoundary>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <SimuladorAIScreen />
    </ComponentErrorBoundary>
  );
}
