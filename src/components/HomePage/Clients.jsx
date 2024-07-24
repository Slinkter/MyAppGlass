import React from "react";
import Franja from "../Franja";
import { Box, Container, Flex, useMediaQuery } from "@chakra-ui/react";
import ClientsCard from "./ClientsCard";

const img01 = "/src/assets/building.jpg";
const img02 =
    "https://gyacompany.com/static/media/sectoroffices.563027e9e6a4ef74167a.jpg";
const img03 =
    "https://gyacompany.com/static/media/sectorhogar.a2bf8c5d2c17aa80a5da.jpg";

const listClient = [
    {
        imgClient: img01,
        nameClient: "Constructoras",
        descClient: "Más de 12 proyectos de construcción entregados .",
    },
    {
        imgClient: img02,
        nameClient: "Negocios",
        descClient: "Servicios de mantenimiento en áreas de trabajos ",
    },
    {
        imgClient: img03,
        nameClient: "Hogares",
        descClient:
            "Servicio de instalación de ventanas, mamparas , puertas de duchas y más.",
    },
];

const Clients = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed
    return (
        <Box minHeight="100vh">
            <Franja
                title={"CLIENTES"}
                text={
                    "Estamos comprometidos con brindar soluciones en vidrio y aluminio ."
                }
            />
            <Flex
                minHeight={"80vh"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                flexDir={isMobile ? "column" : "row"}
            >
                {listClient.map((client, index) => (
                    <ClientsCard
                        key={index}
                        IMAGE={client.imgClient}
                        nameClient={client.nameClient}
                        descClient={client.descClient}
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default Clients;
