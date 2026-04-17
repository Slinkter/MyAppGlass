/**
 * @file clients.ts
 * @description Local data source for homepage client categories.
 * @module home/data
 */

import buildingImg from "../../../assets/clients/building.jpg";
import officesImg from "../../../assets/clients/sectoroffices.jpg";
import hogarImg from "../../../assets/clients/sectorhogar.jpg";

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
    imgClient: buildingImg,
    nameClient: "Constructoras",
    descClient: "Más de 12 proyectos de construcción entregados.",
  },
  {
    id: 2,
    imgClient: officesImg,
    nameClient: "Negocios",
    descClient: "Servicios de mantenimiento en áreas de trabajos.",
  },
  {
    id: 3,
    imgClient: hogarImg,
    nameClient: "Hogares",
    descClient:
      "Servicio de instalación de ventanas, mamparas , puertas de duchas y más.",
  },
];
