/**
 * @file distritos.ts
 * @description Distritos con landing hiperlocal de vidriería y aluminio (plan SEO 5.3 / F8.1-F8.3).
 * Los datos de contacto NO se duplican aquí: se leen de `companyData`.
 */

export interface LocalLandingDistrito {
  slug: string;
  nombre: string;
  intro: string;
  servicios: string[];
}

export const LOCAL_LANDING_DISTRITOS: LocalLandingDistrito[] = [
  {
    slug: "surco",
    nombre: "Surco",
    intro:
      "Fabricamos e instalamos vidriería y carpintería de aluminio para viviendas y oficinas de Santiago de Surco, desde nuestra sede en La Molina.",
    servicios: [
      "Ventanas corredizas y proyectantes",
      "Mamparas de baño",
      "Barandas y cerramientos",
      "Vidrio laminado y templado",
    ],
  },
  {
    slug: "san-borja",
    nombre: "San Borja",
    intro:
      "Trabajamos en vidriería y aluminio para casas, departamentos y locales comerciales de San Borja, con atención directa desde nuestra sede en La Molina.",
    servicios: [
      "Ventanas de aluminio a medida",
      "Mamparas y puertas de vidrio",
      "Techos y cerramientos de vidrio",
      "Vidrio antirruido",
    ],
  },
  {
    slug: "miraflores",
    nombre: "Miraflores",
    intro:
      "Ofrecemos vidriería y aluminio a medida para viviendas, oficinas y espacios comerciales de Miraflores, con fabricación e instalación a cargo de nuestro equipo.",
    servicios: [
      "Ventanas batientes y corredizas",
      "Mamparas de ducha",
      "Barandas de vidrio",
      "Diseño según cliente",
    ],
  },
];

export const getLocalLandingDistrito = (slug: string): LocalLandingDistrito | undefined =>
  LOCAL_LANDING_DISTRITOS.find((d) => d.slug === slug);
