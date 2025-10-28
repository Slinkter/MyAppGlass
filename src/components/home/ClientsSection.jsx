import React from "react";
import Franja from "../common/Franja";
import { Box, Container, Flex } from "@chakra-ui/react";
import ClientCard from "./ClientCard";
import { useClients } from "@/hooks/useClients";
import DataLoader from "@/components/common/DataLoader";
import ClientListSkeleton from "./ClientListSkeleton";

const ClientsSection = React.memo(() => {
    const { clients, isLoading, error } = useClients();

    return (
        <Box minHeight="100vh">
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
                <Container maxW={"8xl"} mt={6} mb={6}>
                    <Flex
                        minHeight={"80vh"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        flexDir={{ base: "column", md: "row" }}
                        gap={6}
                    >
                        {clients.map((client) => (
                            <ClientCard
                                key={client.id} // Use a unique ID from the data instead of index
                                image={client.imgClient}
                                nameClient={client.nameClient}
                                descClient={client.descClient}
                            />
                        ))}
                    </Flex>
                </Container>
            </DataLoader>
        </Box>
    );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
