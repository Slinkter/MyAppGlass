import React, { useState, useEffect } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { getClients } from "@/services/clientService";
import DataLoader from "@shared/components/DataLoader/DataLoader";
import ClientListSkeleton from "./ClientListSkeleton";
import Franja from "@/components/common/Franja";
import ClientCard from "./ClientCard";


/**
 * @component ClientsSection
 * @description Sección de "Clientes" en la página principal.
 * Carga una lista de clientes desde un servicio asíncrono y los muestra en una cuadrícula.
 * Maneja estados de carga (Loading) y error.
 * Implementa Infinite Scroll.
 *
 * @returns {JSX.Element} Sección completa de clientes.
 */
const ClientsSection = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError(err.message || "Error al cargar los clientes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <>
      <Franja
        title={"CLIENTES"}
        text={
          "Estamos comprometidos con brindar soluciones en vidrio y aluminio ."
        }
      />

      <DataLoader
        isLoading={isLoading}
        error={error}
        loadingComponent={<ClientListSkeleton />}
      >
        <Container maxW={"7xl"} mt={12} mb={0}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {clients.map((client) => (
              <ClientCard
                key={client.id} // Use a unique ID from the data instead of index
                image={client.imgClient}
                nameClient={client.nameClient}
                descClient={client.descClient}
              />
            ))}
          </SimpleGrid>
        </Container>
      </DataLoader>
    </>
  );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
