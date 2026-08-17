import { Metadata } from "next";
import { ServiceDetailView } from "@/screens/services";
import { getServiceBySlug, getServices } from "@/features/services/services/serviceService";
import { servicePageDataMap } from "@/features/services/data/servicePageDataMap";
import { getServiceJsonLd, getBreadcrumbJsonLd, getFaqJsonLd } from "@/shared/utils/seo-utils";
import { serviceFaqsMap, defaultServiceFaqs } from "@/features/services/data/serviceFaqs";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export function generateStaticParams() {
  const servicesList = getServices();
  return servicesList.map((service) => ({
    serviceSlug: service.plink.split("/").pop() || "",
  }));
}

type Props = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const pageData = servicePageDataMap[serviceSlug];
  const service = getServiceBySlug(serviceSlug);
  
  if (!service) {
    return {
      title: "Servicio no encontrado | Glass & Aluminum Company S.A.C.",
    };
  }

  const canonicalUrl = `https://www.gyacompany.com/servicios/${serviceSlug}`;

  if (pageData?.seo) {
    return {
      title: pageData.seo.title,
      description: pageData.seo.description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: pageData.seo.title,
        description: pageData.seo.description,
        url: canonicalUrl,
        siteName: "Glass & Aluminum Company S.A.C.",
        locale: "es_PE",
        type: "website",
      },
    };
  }

  return {
    title: `${service.name} en La Molina | Glass & Aluminum Company S.A.C.`,
    description: `Fabricación e instalación de ${service.name} a medida en La Molina y Lima. ${service.description?.substring(0, 120)}`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${service.name} en La Molina | Glass & Aluminum Company S.A.C.`,
      description: `Fabricación e instalación de ${service.name} a medida en La Molina y Lima.`,
      url: canonicalUrl,
      siteName: "Glass & Aluminum Company S.A.C.",
      locale: "es_PE",
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { serviceSlug } = await params;
  const pageData = servicePageDataMap[serviceSlug];
  const service = getServiceBySlug(serviceSlug);

  const title = pageData?.seo.title || service?.name || "Servicio";
  const description = pageData?.seo.description || service?.description || "";
  const url = `https://www.gyacompany.com/servicios/${serviceSlug}`;

  const faqs = serviceSlug && serviceFaqsMap[serviceSlug]
    ? serviceFaqsMap[serviceSlug]
    : defaultServiceFaqs;

  const serviceJsonLd = getServiceJsonLd(title, description, url);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Inicio", url: "https://www.gyacompany.com" },
    { name: "Servicios", url: "https://www.gyacompany.com/servicios" },
    { name: title, url },
  ]);
  const faqJsonLd = getFaqJsonLd(faqs);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServiceDetailView />
    </ComponentErrorBoundary>
  );
}
