import React from "react";

import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Button,
} from "@chakra-ui/react";

import ItemService from "../components/ServicePage/ItemServicio";
import listService from "../components/ServicePage/db_service";

const ServiceView = () => {
    return (
        <div>
            <Box>
                <Container maxW={"8xl"} mt={6} mb={6} textAlign="center">
                    <Heading as="h2" size="xl" color="red.500" mb={4}>
                        SERVICIOS
                    </Heading>
                    <Text fontSize="lg" color="gray.600" mb={8}>
                        Tenemos una amplia variedad de servicios de instalación
                        en cristales y aluminios
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {listService.map((servicio) => (
                            <ItemService key={servicio.id} {...servicio} />
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </div>
    );
};

export default ServiceView;
