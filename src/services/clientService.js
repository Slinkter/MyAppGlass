/**
 * @file clientService.js
 * @description Capa de servicio para la gestión de datos de clientes.
 * Proporciona funciones para obtener la lista de clientes.
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
 * Simula la obtención asíncrona de la lista de clientes.
 * Actualmente, carga los datos desde un archivo local `clients.js`.
 *
 * @returns {Promise<Client[]>} Una promesa que resuelve con un array de objetos de cliente.
 *
 * @example
 * // Ejemplo de uso para obtener todos los clientes:
 * import { getClients } from '@/services/clientService';
 *
 * async function loadClients() {
 *   try {
 *     const clientsList = await getClients();
 *     console.log("Clientes cargados:", clientsList);
 *   } catch (error) {
 *     console.error("Error al cargar clientes:", error);
 *   }
 * }
 * loadClients();
 */
export const getClients = async () => {
    // Simula un pequeño retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300));
    return Promise.resolve(clients);
};