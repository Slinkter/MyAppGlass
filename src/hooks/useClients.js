import { clients } from "@/data/clients";

/**
 * @hook useClients
 * @description Hook personalizado para obtener los datos de los clientes de forma síncrona.
 * @returns {{clients: Array<object>}} Un objeto con la lista de clientes.
 */
export const useClients = () => {
    return { clients };
};
