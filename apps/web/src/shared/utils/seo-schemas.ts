import { SITE_URL, companyData } from "@/shared/config/company-data";
import { resolveSeoImageUrl } from "./seo-metadata";

/**
 * @file seo-schemas.ts
 * @description Generadores de datos estructurados Schema.org JSON-LD para SEO Técnico y Local
 * (WebSite, LocalBusiness, HomeAndConstructionBusiness, SiteNavigationElement, Service, CreativeWork, WebApplication, BreadcrumbList, FAQPage).
 */

export const getCompanyJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "inLanguage": "es-PE",
      "name": "Glass & Aluminum Company S.A.C.",
      "alternateName": "GYA Company",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "hasPart": [
        { "@type": "WebPage", "name": "Inicio", "url": `${SITE_URL}/` },
        { "@type": "WebPage", "name": "Servicios de Vidriería y Aluminio", "url": `${SITE_URL}/#servicios` },
        { "@type": "WebPage", "name": "Proyectos y Obras", "url": `${SITE_URL}/#proyectos` },
        { "@type": "WebPage", "name": "Cotizador de Presupuestos Online", "url": `${SITE_URL}/presupuesto` },
        { "@type": "WebPage", "name": "Simulador Visual de Ambientes con IA", "url": `${SITE_URL}/simulador-ai` },
        { "@type": "WebPage", "name": "Blog Técnico de Expertos", "url": `${SITE_URL}/blog` },
        { "@type": "WebPage", "name": "Cotizaciones y Contacto", "url": `${SITE_URL}/contacto` },
        { "@type": "WebPage", "name": "Libro de Reclamaciones Virtual", "url": `${SITE_URL}/libro-de-reclamacion` }
      ]
    },
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE_URL}/#organization`,
      "name": "Glass & Aluminum Company S.A.C.",
      "legalName": "Glass & Aluminum Company S.A.C.",
      "alternateName": "GYA Company",
      "image": `${SITE_URL}/images/branding-LogoCompanytrans.webp`,
      "logo": `${SITE_URL}/images/branding-LogoCompanytrans.webp`,
      "url": SITE_URL,
      "telephone": `+${companyData.whatsappNumber}`,
      "email": companyData.contactEmail,
      "priceRange": "$$",
      "currenciesAccepted": "PEN, USD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": `+${companyData.whatsappNumber}`,
          "contactType": "customer service",
          "email": companyData.contactEmail,
          "areaServed": "PE",
          "availableLanguage": "es"
        },
        {
          "@type": "ContactPoint",
          "telephone": `+${companyData.whatsappNumber}`,
          "contactType": "sales",
          "email": companyData.contactEmail,
          "areaServed": "PE",
          "availableLanguage": "es"
        }
      ],
      "knowsAbout": [
        "Ventana de aluminio y vidrio",
        "Sistema Nova",
        "Serie 20",
        "Serie 25",
        "Serie 35",
        "Serie 62",
        "Mampara de aluminio y vidrio",
        "Box de Ducha",
        "Baranda de vidrio y acero",
        "Techo de policarbonato y aluminio",
        "Espejo a medida",
        "Freno Hidráulico",
        "Mantenimiento de vidrio y aluminio"
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "La Molina, Lima" },
        { "@type": "AdministrativeArea", "name": "Santiago de Surco, Lima" },
        { "@type": "AdministrativeArea", "name": "San Borja, Lima" },
        { "@type": "AdministrativeArea", "name": "Miraflores, Lima" },
        { "@type": "AdministrativeArea", "name": "San Isidro, Lima" },
        { "@type": "City", "name": "Lima" }
      ],
      "sameAs": [
        "https://www.facebook.com/gyacompany",
        "https://www.instagram.com/gyacompany",
        "https://www.tiktok.com/@gyacompany"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Los Fresnos 1250",
        "addressLocality": "La Molina",
        "addressRegion": "Lima",
        "postalCode": "15024",
        "addressCountry": "PE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -12.0867,
        "longitude": -76.9315
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        }
      ]
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#sitelinks`,
      "name": "Navegación Principal GYA Company",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Ventana",
          "description": "Ventana en aluminio 6063-T5 (Nova, Series 20, 25, 35, 62) con vidrio crudo, laminado, templado o insulado DVH.",
          "url": `${SITE_URL}/servicios/ventana`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Mampara",
          "description": "Mampara corrediza y batiente en aluminio 6063-T5 y vidrio templado o laminado.",
          "url": `${SITE_URL}/servicios/mampara`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Baranda",
          "description": "Baranda en vidrio templado o laminado con perfil de aluminio o accesorios tubulares metálicos.",
          "url": `${SITE_URL}/servicios/baranda`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Techo",
          "description": "Techo sol y sombra en estructura de aluminio 6063-T5 y policarbonato con protección UV.",
          "url": `${SITE_URL}/servicios/techo`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Box de Ducha",
          "description": "Box de ducha frontal y esquinero en vidrio templado de 6, 8 y 10 mm con herrajes cromados y sellado.",
          "url": `${SITE_URL}/servicios/ducha`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Cotizador de Presupuestos Online",
          "description": "Calcula y configura tu presupuesto referencial de ventanas, mamparas y estructuras de vidrio y aluminio.",
          "url": `${SITE_URL}/presupuesto`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Cotizaciones y Contacto",
          "description": "Solicita una visita técnica en La Molina y toda Lima Metropolitana por WhatsApp o formulario web.",
          "url": `${SITE_URL}/contacto`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 8,
          "name": "Blog Técnico de Vidriería",
          "description": "Guías especializadas sobre aislamiento acústico, vidrio templado, laminado y carpintería de aluminio.",
          "url": `${SITE_URL}/blog`
        }
      ]
    }
  ]
});

export const getBreadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

/**
 * Breadcrumb de 3 niveles: Inicio > Sección > Página actual.
 * Compartido por blog y servicios.
 */
export const getSectionBreadcrumbJsonLd = (
  section: { name: string; path: string },
  page: { name: string; url: string }
) =>
  getBreadcrumbJsonLd([
    { name: "Inicio", url: SITE_URL },
    { name: section.name, url: `${SITE_URL}${section.path}` },
    { name: page.name, url: page.url },
  ]);

export const getBlogPostJsonLd = (
  post: { title: string; image: string; date: string; description?: string; excerpt?: string },
  postUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "image": resolveSeoImageUrl(post.image),
  "datePublished": post.date,
  "dateModified": post.date,
  "author": {
    "@type": "Organization",
    "name": "Glass & Aluminum Company S.A.C.",
    "url": SITE_URL
  },
  "description": post.description || post.excerpt,
  "publisher": {
    "@type": "Organization",
    "name": "Glass & Aluminum Company S.A.C.",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/images/branding-LogoCompanytrans.webp`
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": postUrl
  }
});

export const getServiceJsonLd = (name: string, description: string, url: string, image?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "url": url,
  "image": resolveSeoImageUrl(image),
  "provider": {
    "@type": "LocalBusiness",
    "name": "Glass & Aluminum Company S.A.C.",
    "telephone": `+${companyData.whatsappNumber}`,
    "url": SITE_URL
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "La Molina" },
    { "@type": "City", "name": "Lima" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catálogo de Servicios de Vidriería y Aluminio",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": name
        }
      }
    ]
  }
});

const ISO_DATE_REGEX = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/;

export const getProjectJsonLd = (
  project: {
    title: string;
    description: string;
    location: string;
    address?: string;
    coverImage?: string;
    completedAt?: string;
    client?: string;
  },
  url: string
) => {
  const trimmedDate = project.completedAt?.trim();
  const validIsoDate = trimmedDate && ISO_DATE_REGEX.test(trimmedDate) ? trimmedDate : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": url,
    "image": resolveSeoImageUrl(project.coverImage),
    "creator": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Glass & Aluminum Company S.A.C."
    },
    "locationCreated": {
      "@type": "Place",
      "name": project.location,
      ...(project.address ? { address: project.address } : {})
    },
    ...(validIsoDate ? { dateCreated: validIsoDate } : {})
  };
};

export const getWebAppJsonLd = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": name,
  "description": description,
  "url": url,
  "applicationCategory": "DesignApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "PEN"
  },
  "provider": {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": "Glass & Aluminum Company S.A.C."
  }
});

export const getFaqJsonLd = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

/**
 * Serializa datos para incrustarlos en <script type="application/ld+json">.
 * Escapa "<" (y U+2028/U+2029) para que un texto con "</script>" o "<!--" no rompa la etiqueta.
 */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
