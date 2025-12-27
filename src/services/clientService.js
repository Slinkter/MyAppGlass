import { clients } from "@/data/clients";

/**
 * @file clientService.js
 * @description Capa de servicio para la gestión de datos de clientes.
 */

/**
 * Obtiene la lista de todos los tipos de clientes.
 * Simula una llamada a una API.
 * @returns {Promise<Array>} Una promesa que se resuelve con la lista de clientes.
 */
export const getClients = async () => {
    // Simula un pequeño retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300));
    return Promise.resolve(clients);
};
