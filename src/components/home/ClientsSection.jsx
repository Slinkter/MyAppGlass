import React, { useState, useEffect, useMemo } from "react";
import { Box, Container, SimpleGrid, Spinner } from "@chakra-ui/react";
import { getClients } from "@/services/clientService";
import DataLoader from "@/components/common/DataLoader";
import ClientListSkeleton from "./ClientListSkeleton";
import Franja from "@/components/common/Franja";
import ClientCard from "./ClientCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

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
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Infinite Scroll State
  const [sentinelRef, setSentinelRef] = useState(null);
  const isSentinelVisible = useIntersectionObserver(sentinelRef, {
    threshold: 0.1,
  });
  const [visibleCount, setVisibleCount] = useState(6);

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

  const visibleClients = useMemo(
    () => clients.slice(0, visibleCount),
    [clients, visibleCount]
  );
  const hasMore = visibleCount < clients.length;

  useEffect(() => {
    if (isSentinelVisible && hasMore && !isLoading) {
      setVisibleCount((prev) => Math.min(prev + 6, clients.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSentinelVisible, hasMore, isLoading]);

  return (
    <Box>
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
            {visibleClients.map((client) => (
              <ClientCard
                key={client.id} // Use a unique ID from the data instead of index
                image={client.imgClient}
                nameClient={client.nameClient}
                descClient={client.descClient}
              />
            ))}
          </SimpleGrid>
        </Container>

        {/* Sentinel & Spinner */}
        {!isLoading && hasMore && (
          <Box
            ref={setSentinelRef}
            h="60px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={12}
          >
            <Spinner size="md" color="primary.500" thickness="3px" />
          </Box>
        )}

        {/* Spacer */}
        {!hasMore && !isLoading && <Box h="3rem" />}
      </DataLoader>
    </Box>
  );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
