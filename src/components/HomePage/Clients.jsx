import React, { memo } from "react";
import Franja from "../Franja";
import { Box, Container, Flex, useMediaQuery } from "@chakra-ui/react";
import ClientsCard from "./ClientsCard";
import cliente01 from "../../assets/building.jpg";
import cliente02 from "../../assets/sectoroffices.jpg";
import cliente03 from "../../assets/sectorhogar.jpg";

const listClient = [
    {
        imgClient: cliente01,
        nameClient: "Constructoras",
        descClient: "Más de 12 proyectos de construcción entregados.",
    },
    {
        imgClient: cliente02,
        nameClient: "Negocios",
        descClient: "Servicios de mantenimiento en áreas de trabajos.",
    },
    {
        imgClient: cliente03,
        nameClient: "Hogares",
        descClient:
            "Servicio de instalación de ventanas, mamparas , puertas de duchas y más.",
    },
];

const Clients = memo(function Clients() {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed
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
                    flexDir={isMobile ? "column" : "row"}
                    gap={6}
                >
                    {listClient.map((client, index) => (
                        <ClientsCard
                            key={index}
                            IMAGE={client.imgClient}
                            nameClient={client.nameClient}
                            descClient={client.descClient}
                            spacingX={isMobile ? "20px" : "30px"}
                            spacingY={isMobile ? "20px" : "30px"}
                        />
                    ))}
                </Flex>
            </Container>
        </Box>
    );
});

export default Clients;
