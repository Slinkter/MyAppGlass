import { SITE_URL } from "@/shared/config/company-data";
/**
 * @file seo-utils.ts
 * @description Generador de datos estructurados Schema.org para SEO Técnico y Local (LocalBusiness, HomeAndConstructionBusiness, Service, BreadcrumbList, FAQPage).
 */

export const getCompanyJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Glass & Aluminum Company S.A.C.",
      "alternateName": "GYA Company",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": `${SITE_URL}/servicios?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      ],
      "hasPart": [
        { "@type": "WebPage", "name": "Inicio", "url": `${SITE_URL}/` },
        { "@type": "WebPage", "name": "Servicios de Vidriería y Aluminio", "url": `${SITE_URL}/servicios` },
        { "@type": "WebPage", "name": "Proyectos y Obras", "url": `${SITE_URL}/proyectos` },
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
      "telephone": "+51974278303",
      "email": "ventas@gyacompany.com",
      "priceRange": "$$",
      "currenciesAccepted": "PEN, USD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
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

export const getServiceJsonLd = (name: string, description: string, url: string, image?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "url": url,
  "image": image || `${SITE_URL}/images/branding-LogoCompanytrans.webp`,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Glass & Aluminum Company S.A.C.",
    "telephone": "+51974278303",
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
