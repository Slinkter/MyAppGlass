import React, { useEffect } from "react";
import Franja from "../common/Franja";
import { Box, Container, Flex, Text, Spinner } from "@chakra-ui/react";
import ClientCard from "./ClientCard";
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../../features/clients/clientsSlice';

const ClientsSection = React.memo(() => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.items);
    const clientStatus = useSelector((state) => state.clients.status);
    const error = useSelector((state) => state.clients.error);

    useEffect(() => {
        if (clientStatus === 'idle') {
            dispatch(fetchClients());
        }
    }, [clientStatus, dispatch]);

    if (clientStatus === 'loading') {
        return (
            <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (clientStatus === 'failed') {
        return <Text>Error: {error}</Text>;
    }

    return (
        <Box minHeight="100vh">
            <Franja
                title={"CLIENTES"}
                text={
                    "Estamos comprometidos con brindar soluciones en vidrio y aluminio ."
                }
            />
            <Container maxW={"8xl"} mt={6} mb={6}>
                <Flex
                    minHeight={"80vh"}
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    flexDir={{ base: "column", md: "row" }}
                    gap={6}
                >
                    {clients.map((client, index) => (
                        <ClientCard
                            key={index}
                            IMAGE={client.imgClient}
                            nameClient={client.nameClient}
                            descClient={client.descClient}
                        />
                    ))}
                </Flex>
            </Container>
        </Box>
    );
});

export default ClientsSection;
