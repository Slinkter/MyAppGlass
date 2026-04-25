/**
 * @file jsonLd.ts
 * @description Generador de datos estructurados para SEO (LocalBusiness y Services).
 */

export const getCompanyJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GYA Company - Vidriería y Aluminio",
  "image": "https://www.gyacompany.com/images/branding-LogoCompanytrans.webp",
  "@id": "https://www.gyacompany.com",
  "url": "https://www.gyacompany.com",
  "telephone": "+51900000000", // Actualizar con número real
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "La Molina",
    "addressLocality": "Lima",
    "addressRegion": "Lima",
    "postalCode": "15024",
    "addressCountry": "PE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -12.072,
    "longitude": -76.942
  },
  "openingHoursSpecification": {
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
  },
  "sameAs": [
    "https://www.facebook.com/gyacompany",
    "https://www.instagram.com/gyacompany"
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
