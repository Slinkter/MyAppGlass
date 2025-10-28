import { clients } from "@/data/clients";

/**
 * @hook useClients
 * @description Hook personalizado para obtener los datos de los clientes de forma síncrona.
 * @returns {{clients: Array<object>, isLoading: boolean, error: null}} Un objeto con la lista de clientes, y estados de carga/error para compatibilidad con DataLoader.
 */
export const useClients = () => {
    return { clients, isLoading: false, error: null };
};
