/**
 * @file clientService.js
 * @description Service layer for retrieving client-related data for the homepage.
 * @module home/services
 */

import { clients } from "@/data/clients";

// Re-using the Client typedef from "@/data/clients"
/**
 * @typedef {Object} Client
 * @property {number} id - Unique identifier for the client.
 * @property {string} imgClient - The imported image URL for the client.
 * @property {string} nameClient - The name of the client category (e.g., "Constructoras").
 * @property {string} descClient - A description of the client category.
 */

/**
 * Obtiene la lista de clientes.
 * Simula una llamada a una API o una operación asíncrona.
 *
 * @returns {Promise<Client[]>} Una promesa que se resuelve con un array de objetos de cliente.
 */
export const getClients = async () => {
  return Promise.resolve(clients);
};
