/**
 * @file jsonLd.ts
 * @description Generador de datos estructurados para SEO (LocalBusiness y Services).
 */

export const getCompanyJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.gyacompany.com/#website",
      "url": "https://www.gyacompany.com",
      "name": "GYA Company",
      "publisher": { "@id": "https://www.gyacompany.com/#organization" },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": "https://www.gyacompany.com/servicios?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      ],
      "hasPart": [
        { "@type": "WebPage", "name": "Portal GYA", "url": "https://www.gyacompany.com/" },
        { "@type": "WebPage", "name": "Ventanas de Aluminio", "url": "https://www.gyacompany.com/servicios/ventana" },
        { "@type": "WebPage", "name": "Mamparas de Vidrio", "url": "https://www.gyacompany.com/servicios/mampara" },
        { "@type": "WebPage", "name": "Puertas de Ducha", "url": "https://www.gyacompany.com/servicios/ducha" },
        { "@type": "WebPage", "name": "Proyectos Realizados", "url": "https://www.gyacompany.com/proyectos" }
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.gyacompany.com/#organization",
      "name": "Glass & Aluminum Company S.A.C. - GYA Company",
      "legalName": "Glass & Aluminum Company S.A.C.",
      "alternateName": "GYA Company",
      "image": "https://www.gyacompany.com/images/branding-LogoCompanytrans.webp",
      "url": "https://www.gyacompany.com",
      "telephone": "+51974278303",
      "sameAs": [
        "https://www.facebook.com/gyacompany",
        "https://www.instagram.com/gyacompany",
        "https://www.tiktok.com/@gyacompany"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. los Fresnos 1214-1274",
        "addressLocality": "La Molina",
        "addressRegion": "Lima",
        "postalCode": "15024",
        "addressCountry": "PE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -12.0722,
        "longitude": -76.9421
      }
    }
  ]
});

export const getServiceJsonLd = (name: string, description: string, url: string, image: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "url": url,
  "image": image,
  "provider": {
    "@type": "LocalBusiness",
    "name": "GYA Company"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lima"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Vidriería",
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
