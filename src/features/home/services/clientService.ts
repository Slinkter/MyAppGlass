/**
 * @file clientService.ts
 * @description Service layer for retrieving client-related data for the homepage.
 * @module home/services
 */

import { clients, type Client } from "@/features/home/data/clients";

/**
 * Obtiene la lista de clientes de forma síncrona desde data/clients.
 *
 * @returns {Client[]} Array de objetos de cliente.
 */
export const getClients = (): Client[] => {
  return clients;
};
