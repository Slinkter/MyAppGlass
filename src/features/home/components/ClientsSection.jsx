/**
 * @file ClientsSection.jsx
 * @description Orchestrator component for the "Our Clients" section, handling data fetching and grid layout.
 * @module home/components
 */

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { getClients } from "../services/clientService";
import ClientCard from "./ClientCard";
import { useAsyncData } from "@/shared/hooks/data/useAsyncData";
import { Spinner, Center } from "@chakra-ui/react";
import DataLoader from "@/shared/components/DataLoader/DataLoader";

/**
 * @component ClientsSection
 * @description Sección de "Clientes" en la página principal.
 * Muestra una cuadrícula de categorías de clientes atendidos por la empresa.
 *
 * @returns {JSX.Element} Sección completa de clientes.
 */
const ClientsSection = React.memo(() => {
  const { data: clients, isLoading, error } = useAsyncData(getClients, []);

  return (
    <DataLoader
      isLoading={isLoading}
      error={error}
      loadingComponent={
        <Center py={12}>
          <Spinner size="xl" color="primary.500" />
        </Center>
      }
    >
      <ItemGridLayout
        title="CLIENTES"
        subtitle="Estamos comprometidos con brindar soluciones en vidrio y aluminio"
        containerProps={{ mt: 0, pt: 8 }}
      >
        {(clients || []).map((client) => (
          <ItemGridLayout.Item key={client.id}>
            <ClientCard
              image={client.imgClient}
              nameClient={client.nameClient}
              descClient={client.descClient}
            />
          </ItemGridLayout.Item>
        ))}
      </ItemGridLayout>
    </DataLoader>
  );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
