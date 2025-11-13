import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
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
                <Container maxW={"8xl"} mt={6} mb={6}>
                    <Flex
                        minHeight={"80vh"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        flexDir={{ base: "column", md: "row" }}
                        gap={6}
                    >
                        {clientsData.map((client) => (
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
