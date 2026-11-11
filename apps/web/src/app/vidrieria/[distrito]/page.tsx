import { Metadata } from "next";
import { SITE_URL } from "@/shared/config/company-data";
import {
  buildPageMetadata,
  getSectionBreadcrumbJsonLd,
  serializeJsonLd,
} from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import LocalLandingView from "@/features/local-landings/components/LocalLandingView";
import {
  LOCAL_LANDING_DISTRITOS,
  getLocalLandingDistrito,
} from "@/features/local-landings/data/distritos";
import { PageTransition } from "@/shared/components/motion/PageTransition";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_LANDING_DISTRITOS.map((d) => ({ distrito: d.slug }));
}

type Props = {
  params: Promise<{ distrito: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { distrito: slug } = await params;
  const distrito = getLocalLandingDistrito(slug);

  if (!distrito) {
    return {
      title: "Distrito no encontrado",
      robots: { index: false, follow: true },
    };
  }

  return buildPageMetadata({
    title: `Vidriería y aluminio en ${distrito.nombre}`,
    description: `Vidriería y aluminio a medida en ${distrito.nombre}: ventanas, mamparas, barandas y vidrio laminado, templado y antirruido. Cotiza con GYA Company.`,
    path: `/vidrieria/${distrito.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { distrito: slug } = await params;
  const distrito = getLocalLandingDistrito(slug);

  if (!distrito) {
    return null;
  }

  const breadcrumbJsonLd = getSectionBreadcrumbJsonLd(
    { name: "Servicios", path: "/#servicios" },
    { name: `Vidriería en ${distrito.nombre}`, url: `${SITE_URL}/vidrieria/${distrito.slug}` }
  );

  return (
    <PageTransition>
      <ComponentErrorBoundary>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
        />
        <LocalLandingView distrito={distrito} />
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
