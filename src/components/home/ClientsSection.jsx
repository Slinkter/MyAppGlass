import React from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { clients } from "@/data/clients";
import DataLoader from "@/components/common/DataLoader";
import ClientListSkeleton from "./ClientListSkeleton";
import Franja from "../common/Franja";
import ClientCard from "./ClientCard";

const ClientsSection = React.memo(() => {
    const clientsData = clients;

    return (
        <Box minHeight="100dvh">
            <Franja
                title={"CLIENTES"}
                text={
                    "Estamos comprometidos con brindar soluciones en vidrio y aluminio ."
                }
            />
            <DataLoader loadingComponent={<ClientListSkeleton />}>
                <Container maxW={"7xl"} mt={6} mb={6}> {/* Changed maxW to 7xl */}
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={10}
                    >
                        {clientsData.map((client) => (
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
        </Box>
    );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
