/**
 * @file clients.ts
 * @description Static data representing the different client sectors served by GYA Company.
 * @module data
 */

import buildingImg from "@/assets/clients/building.jpg";
import sectorhogarImg from "@/assets/clients/sectorhogar.jpg";
import sectorofficesImg from "@/assets/clients/sectoroffices.jpg";

export interface Client {
  id: number;
  imgClient: string;
  nameClient: string;
  descClient: string;
}

export const clients: Client[] = [
  {
    id: 1,
    imgClient: buildingImg, // Imported image
    nameClient: "Constructoras",
    descClient:
      "Servicios especializados para grandes proyectos de construcción.",
  },

  {
    id: 2,
    imgClient: sectorofficesImg, // Imported image
    nameClient: "Comercios",
    descClient:
      "Instalaciones de vidrio y espejos para espacios comerciales y corporativos.",
  },
  {
    id: 3,
    imgClient: sectorhogarImg, // Imported image
    nameClient: "Hogar",
    descClient:
      "Soluciones de vidrio para viviendas y proyectos residenciales.",
  },
];
