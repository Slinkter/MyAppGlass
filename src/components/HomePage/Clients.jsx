import React from "react";
import Franja from "../Franja";
import {
    Box,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Container,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import ClientsCard from "./ClientsCard";

const img01 = "/src/assets/building.jpg";
const img02 =
    "https://gyacompany.com/static/media/sectoroffices.563027e9e6a4ef74167a.jpg";
const img03 =
    "https://gyacompany.com/static/media/sectorhogar.a2bf8c5d2c17aa80a5da.jpg";

const listClient = [
    {
        imgClient: img01,
        nameClient: "Construtoras",
        descClient:
            "Más de 12 proyectos de construcción entregados con soluciones  en vidrio y aluminio.",
    },
    {
        imgClient: img02,
        nameClient: "Negocios",
        descClient:
            "Servicios de mantenimiento y productos de alta calidad para locales y negocios",
    },
    {
        imgClient: img03,
        nameClient: "Hogares",
        descClient:
            "Materiales y servicios profesionales para ventanas, mamparas y puertas de duchas",
    },
];

const Clients = () => {
    return (
        <div>
            {" "}
            <Box>
                <Franja
                    title={"Clientes"}
                    text={
                        "Estamos comprometidos con brindar soluciones en vidrio y aluminio .Contamos con la experiencia y los recursos para satisfacer sus expectativas."
                    }
                />
            </Box>
            <Container maxW={"8xl"} mt={6} mb={6}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    {listClient.map((client) => (
                        <>
                            <ClientsCard
                                IMAGE={client.imgClient}
                                nameClient={client.nameClient}
                                descClient={client.descClient}
                            />
                        </>
                    ))}
                </Flex>
            </Container>
        </div>
    );
};

export default Clients;
