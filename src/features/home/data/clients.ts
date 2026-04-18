/**
 * @file clients.ts
 * @description Local data source for homepage client categories.
 * @module home/data
 */

export interface Client {
  id: number;
  imgClient: string;
  nameClient: string;
  descClient: string;
}

/**
 * @constant clients
 * @description Array containing static data for various client categories.
 * Each client object includes an ID, an imported image URL, a name, and a description.
 */
export const clients: Client[] = [
  {
    id: 1,
    imgClient: '/images/clients-building.webp',
    nameClient: "Constructoras",
    descClient: "Más de 12 proyectos de construcción entregados.",
  },
  {
    id: 2,
    imgClient: '/images/clients-sectoroffices.webp',
    nameClient: "Negocios",
    descClient: "Servicios de mantenimiento en áreas de trabajos.",
  },
  {
    id: 3,
    imgClient: '/images/clients-sectorhogar.webp',
    nameClient: "Hogares",
    descClient:
      "Servicio de instalación de ventanas, mamparas , puertas de duchas y más.",
  },
];
