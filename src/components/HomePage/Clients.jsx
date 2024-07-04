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

const img01 =
  "https://gyacompany.com/static/media/sectorcontruc.aa29579be08b9b2d0472.jpg";

const img02 =
  "https://gyacompany.com/static/media/sectoroffices.563027e9e6a4ef74167a.jpg";
const img03 =
  "https://gyacompany.com/static/media/sectorhogar.a2bf8c5d2c17aa80a5da.jpg";

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
          <ClientsCard IMAGE={img01} />
          <ClientsCard IMAGE={img02} />
          <ClientsCard IMAGE={img03} />
        </Flex>
      </Container>
    </div>
  );
};

export default Clients;
