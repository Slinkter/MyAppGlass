import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { ServiceDetailView } from "@/screens/Services";
import { getBuildServices } from "@/shared/api/firebase/publicRest";
import { BUILD_SENTINEL } from "@/shared/config/build-sentinel";
import { getServiceSeo } from "@/features/services/hooks/serviceMappers";
import { getServiceJsonLd, getSectionBreadcrumbJsonLd, getFaqJsonLd } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

/**
 * Los slugs salen de Firestore (lectura REST en build). Si la lectura falla o no hay
 * servicios se devuelve un centinela para que `output: 'export'` no falle.
 */
export async function generateStaticParams() {
  const services = await getBuildServices();
  return services.length > 0
    ? services.map((service) => ({ serviceSlug: service.slug }))
    : [{ serviceSlug: BUILD_SENTINEL }];
}

type Props = {
  params: Promise<{ serviceSlug: string }>;
};

async function resolveServiceData(params: Promise<{ serviceSlug: string }>) {
  const { serviceSlug } = await params;
  const services = await getBuildServices();
  const service = services.find((s) => s.slug === serviceSlug);
  return { serviceSlug, service };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, service } = await resolveServiceData(params);

  if (!service) {
    return {
      title: "Servicio | Glass & Aluminum Company S.A.C.",
      robots: { index: false, follow: true },
    };
  }

  const canonicalUrl = `${SITE_URL}/servicios/${serviceSlug}`;
  const seo = getServiceSeo(service);

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: "Glass & Aluminum Company S.A.C.",
      locale: "es_PE",
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { serviceSlug, service } = await resolveServiceData(params);

  // Sin datos de build (centinela o slug desconocido): el detalle se resuelve en el cliente.
  if (!service) {
    return (
      <ComponentErrorBoundary>
        <ServiceDetailView serviceSlug={serviceSlug} />
      </ComponentErrorBoundary>
    );
  }

  const { title, description } = getServiceSeo(service);
  const url = `${SITE_URL}/servicios/${serviceSlug}`;

  const serviceJsonLd = getServiceJsonLd(title, description, url, service.coverImage);
  const breadcrumbJsonLd = getSectionBreadcrumbJsonLd(
    { name: "Servicios", path: "/servicios" },
    { name: title, url }
  );

  return (
    <ComponentErrorBoundary>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(service.faqs)) }}
        />
      )}
      <ServiceDetailView serviceSlug={serviceSlug} initialData={service} />
    </ComponentErrorBoundary>
  );
}
