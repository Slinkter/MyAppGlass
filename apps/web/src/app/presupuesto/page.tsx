import type { Metadata } from "next";
import { PresupuestoWizardScreen } from "@/screens/Presupuesto/PresupuestoWizardScreen";
import { SITE_URL } from "@/shared/config/company-data";
import {
  buildPageMetadata,
  getWebAppJsonLd,
  getBreadcrumbJsonLd,
  serializeJsonLd,
} from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

const PRESUPUESTO_TITLE = "Cotizador de Presupuestos de Vidrio y Aluminio Online";
const PRESUPUESTO_DESCRIPTION =
  "Calcula tu presupuesto formal al instante para ventanas antirruido, mamparas de vidrio templado, techos y puertas de ducha en La Molina y Lima.";

export const metadata: Metadata = buildPageMetadata({
  title: PRESUPUESTO_TITLE,
  description: PRESUPUESTO_DESCRIPTION,
  path: "/presupuesto",
  keywords: [
    "cotizador de presupuestos vidrio y aluminio",
    "calcular presupuesto ventanas antirruido",
    "cotizar mamparas online lima",
    "precios vidriería la molina",
  ],
});

export default function PresupuestoPage() {
  const url = `${SITE_URL}/presupuesto`;
  const webAppJsonLd = getWebAppJsonLd(PRESUPUESTO_TITLE, PRESUPUESTO_DESCRIPTION, url);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Inicio", url: SITE_URL },
    { name: "Cotizador de Presupuestos", url },
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
      <PresupuestoWizardScreen />
    </ComponentErrorBoundary>
  );
}
