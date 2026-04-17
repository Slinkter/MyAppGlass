/**
 * @file services.ts
 * @description Local data source for all company services.
 * @module services/data
 */

import init01 from "@/assets/services/general/init01.jpg";
import init02a from "@/assets/services/general/init02a.jpg";
import init03 from "@/assets/services/general/init03.jpg";
import init05a from "@/assets/services/general/init05a.jpg";
import init06 from "@/assets/services/general/init06.jpg";
import init07a from "@/assets/services/general/init07a.jpg";
import init04 from "@/assets/services/general/init04.jpg";
import init11 from "@/assets/services/general/init11.jpg";
import init12 from "@/assets/services/general/init12.jpg";
import init13 from "@/assets/services/general/init13.jpg";

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
    image: init01.src,
    name: "Ventanas",
    category: "Aluminio",
    description: "Ventanas de aluminio con sistemas Nova, Serie 25 y 31. Ideal para proyectos residenciales y comerciales.",
    link: "https://bit.ly/3HuT0Eq",
    plink: "/servicios/ventana",
  },
  {
    id: 2,
    image: init02a.src,
    name: "Mamparas",
    category: "Vidrio",
    description: "Mamparas de baño en vidrio templado. Sistemas Nova y Serie 25 con acabados en natural y negro.",
    link: "https://www.facebook.com/media/set/?set=a.414060650462803&type=3/?from=GoogleBT",
    plink: "/servicios/mampara",
  },
  {
    id: 3,
    image: init03.src,
    name: "Duchas",
    category: "Vidrio",
    description: "Boxes de ducha con vidrio templado de 8mm. Sistemas KIT y Acrílico disponibles.",
    link: "https://www.facebook.com/media/set/?set=a.414060420462826&type=3?from=GoogleBT",
    plink: "/servicios/ducha",
  },
  {
    id: 4,
    image: init05a.src,
    name: "Parapeto",
    category: "Vidrio",
    description: "Parapetos de vidrio templado con estructura de acero o aluminio. Acabados profesionales.",
    link: "https://www.facebook.com/media/set/?set=a.414060023796199&type=3?from=GoogleBT",
    plink: "/servicios/parapeto",
  },
  {
    id: 5,
    image: init06.src,
    name: "Barandas",
    category: "Vidrio",
    description: "Barandas de vidrio templado con accesorios de acero cromado. Seguridad y elegancia.",
    link: "https://www.facebook.com/gyacompany?from=GoogleBT",
    plink: "/servicios/baranda",
  },
  {
    id: 6,
    image: init07a.src,
    name: "Balcones",
    category: "Cerramientos",
    description: "Balcones de vidrio templado con arenado decorativo. Diseño moderno y seguro.",
    link: "https://www.facebook.com/media/set/?set=a.414059690462899&type=3?from=GoogleBT",
    plink: "/servicios/balcones",
  },
  {
    id: 7,
    image: init04.src,
    name: "Techos",
    category: "Cerramientos",
    description: "Techos de policarbonato con estructura de aluminio. Protección y iluminación natural.",
    link: "https://www.facebook.com/media/set/?set=a.414060237129511&type=3?from=GoogleBT",
    plink: "/servicios/techo",
  },
  {
    id: 8,
    image: init11.src,
    name: "Puerta de Vidrio",
    category: "Vidrio",
    description: "Puertas de vidrio templado con chapa bola y accesorios de calidad.",
    link: "https://www.facebook.com/gyacompany/?from=GoogleBT",
    plink: "/servicios/pvidrio",
  },
  {
    id: 9,
    image: init12.src,
    name: "Puerta en Serie",
    category: "Aluminio",
    description: "Puertas enrollables de aluminio con plancha arenada. Resistencia y durabilidad.",
    link: "https://www.facebook.com/gyacompany/?from=GoogleBT",
    plink: "/servicios/pserie",
  },
  {
    id: 10,
    image: init13.src,
    name: "Celosías",
    category: "Aluminio",
    description: "Celosías de aluminio para ventilación de espacios. Funcionalidad y diseño.",
    link: "https://www.facebook.com/gyacompany/?from=GoogleBT",
    plink: "/servicios/celosias",
  },
];
