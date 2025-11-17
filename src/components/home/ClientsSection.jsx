import React from "react";
import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { clients } from "@/data/clients";
import DataLoader from "@/components/common/DataLoader";
import ClientListSkeleton from "./ClientListSkeleton";
import Franja from "../common/Franja";
import ClientCard from "./ClientCard";

const ClientsSection = React.memo(() => {
    const clientsData = clients;
    // GlassSection styles
    const glassSectionBg = useColorModeValue(
        "rgba(255, 255, 255, 0.1)",
        "rgba(0, 0, 0, 0.1)"
    );
    const glassSectionBlur = "blur(10px)"; // Suave blur

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
                    <Flex
                        // GlassSection properties

                        border="none" // SIN borde
                        boxShadow="none" // SIN shadow
                        borderRadius="2xl"
                        transition="all 0.3s ease"
                        // Removed p={{ base: 6, md: 10 }}
                        // Removed minHeight={"80vh"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        flexDir={{ base: "column", md: "row" }}
                        gap={6}
                    >
                        <Flex
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
                    </Flex>
                </Container>
            </DataLoader>
        </Box>
    );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
