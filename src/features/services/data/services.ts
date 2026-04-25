/**
 * @file services.ts
 * @description Local data source for all company services.
 * @module services/data
 */

export interface Service {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
  link: string;
  plink: string;
}

export const services: Service[] = [
  {
    id: 1,
    image: '/images/services-general-init01.webp',
    name: "Ventanas",
    category: "Aluminio",
    description: "Ventanas de aluminio con sistemas Nova, Serie 25 y 31. Ideal para proyectos residenciales y comerciales.",
    link: "https://bit.ly/3HuT0Eq",
    plink: "/servicios/ventana",
  },
  {
    id: 2,
    image: '/images/services-general-init02a.webp',
    name: "Mamparas",
    category: "Vidrio",
    description: "Mamparas de baño en vidrio templado. Sistemas Nova y Serie 25 con acabados en natural y negro.",
    link: "https://www.facebook.com/media/set/?set=a.414060650462803&type=3/?from=GoogleBT",
    plink: "/servicios/mampara",
  },
  {
    id: 3,
    image: '/images/services-general-init03.webp',
    name: "Duchas",
    category: "Vidrio",
    description: "Boxes de ducha con vidrio templado de 8mm. Sistemas KIT y Acrílico disponibles.",
    link: "https://www.facebook.com/media/set/?set=a.414060420462826&type=3?from=GoogleBT",
    plink: "/servicios/ducha",
  },
  {
    id: 4,
    image: '/images/services-general-init05a.webp',
    name: "Parapeto",
    category: "Vidrio",
    description: "Parapetos de vidrio templado con estructura de acero o aluminio. Acabados profesionales.",
    link: "https://www.facebook.com/media/set/?set=a.414060023796199&type=3?from=GoogleBT",
    plink: "/servicios/parapeto",
  },
  {
    id: 5,
    image: '/images/services-general-init06.webp',
    name: "Barandas",
    category: "Vidrio",
    description: "Barandas de vidrio templado con accesorios de acero cromado. Seguridad y elegancia.",
    link: "https://www.facebook.com/gyacompany?from=GoogleBT",
    plink: "/servicios/baranda",
  },
  {
    id: 6,
    image: '/images/services-general-init07a.webp',
    name: "Balcones",
    category: "Cerramientos",
    description: "Balcones de vidrio templado con arenado decorativo. Diseño moderno y seguro.",
    link: "https://www.facebook.com/media/set/?set=a.414059690462899&type=3?from=GoogleBT",
    plink: "/servicios/balcones",
  },
  {
    id: 7,
    image: '/images/services-general-init04.webp',
    name: "Techos",
    category: "Cerramientos",
    description: "Techos de policarbonato con estructura de aluminio. Protección e iluminación natural.",
    link: "https://www.facebook.com/media/set/?set=a.414060237129511&type=3?from=GoogleBT",
    plink: "/servicios/techo",
  },
  {
    id: 8,
    image: '/images/services-general-init11.webp',
    name: "Puerta de Vidrio",
    category: "Vidrio",
    description: "Puertas de vidrio templado con chapa bola y accesorios de calidad.",
    link: "https://www.facebook.com/gyacompany/?from=GoogleBT",
    plink: "/servicios/pvidrio",
  },
  {
    id: 9,
    image: '/images/services-general-init12.webp',
    name: "Puerta en Serie",
    category: "Aluminio",
    description: "Puertas enrollables de aluminio con plancha arenada. Resistencia y durabilidad.",
    link: "https://www.facebook.com/gyacompany/?from=GoogleBT",
    plink: "/servicios/pserie",
  },
  {
    id: 10,
    image: '/images/services-general-init13.webp',
    name: "Celosías",
    category: "Aluminio",
    description: "Celosías de aluminio para ventilación de espacios. Funcionalidad y diseño.",
    link: "https://www.facebook.com/gyacompany/?from=GoogleBT",
    plink: "/servicios/celosias",
  },
];
