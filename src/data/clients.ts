/**
 * @file clients.ts
 * @description Static data representing the different client sectors served by GYA Company.
 * @module data
 */

export interface Client {
  id: number;
  imgClient: string;
  nameClient: string;
  descClient: string;
}

export const clients: Client[] = [
  {
    id: 1,
    imgClient: '/images/clients-building.webp', // Imported image
    nameClient: "Constructoras",
    descClient:
      "Servicios especializados para grandes proyectos de construcción.",
  },

  {
    id: 2,
    imgClient: '/images/clients-sectoroffices.webp', // Imported image
    nameClient: "Comercios",
    descClient:
      "Instalaciones de vidrio y espejos para espacios comerciales y corporativos.",
  },
  {
    id: 3,
    imgClient: '/images/clients-sectorhogar.webp', // Imported image
    nameClient: "Hogar",
    descClient:
      "Soluciones de vidrio para viviendas y proyectos residenciales.",
  },
];
