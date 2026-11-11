/**
 * @file index.ts
 * @description Public API for the Client entity.
 * @module entities/client
 */

// UI
export { ClientCard } from "./ui/ClientCard";

// API
export {
  addClient,
  getClientProfile,
  setClientProfile,
  subscribeToClients,
} from "./api/clientsRepository";
export {
  createClientUserDoc,
  getUserRoleDoc,
  provisionUserDoc,
} from "./api/usersRepository";

// Model
export type { ClientProfile, UserRole } from "./model";
