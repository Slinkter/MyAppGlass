import buildingImg from '../assets/clients/building.jpg';
import officesImg from '../assets/clients/sectoroffices.jpg';
import hogarImg from '../assets/clients/sectorhogar.jpg';

/**
 * @typedef {object} Client
 * @property {number} id - Unique identifier for the client.
 * @property {string} imgClient - The imported image URL for the client.
 * @property {string} nameClient - The name of the client category (e.g., "Constructoras").
 * @property {string} descClient - A description of the client category.
 */

/**
 * @constant {Client[]} clients
 * @description Array containing static data for various client categories.
 * Each client object includes an ID, an imported image URL, a name, and a description.
 */
export const clients = [
  {
    id: 1,
    imgClient: buildingImg,
    nameClient: "Constructoras",
    descClient: "Más de 12 proyectos de construcción entregados."
  },
  {
    id: 2,
    imgClient: officesImg,
    nameClient: "Negocios",
    descClient: "Servicios de mantenimiento en áreas de trabajos."
  },
  {
    id: 3,
    imgClient: hogarImg,
    nameClient: "Hogares",
    descClient: "Servicio de instalación de ventanas, mamparas , puertas de duchas y más."
  }
];
