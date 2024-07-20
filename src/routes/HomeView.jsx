import {
    AspectRatio,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Image,
    Stack,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import Tienda from "../components/HomePage/Tienda";
import Feature from "../components/HomePage/Feature";
import Clients from "../components/HomePage/Clients";
import LandPage from "../components/HomePage/LandPage";

const HomeView = () => {
    // const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box>
            <LandPage />
            <Clients />
            <Feature />

            <Tienda />
        </Box>
    );
};

export default HomeView;
/*   <Box p={4}>
       <Button onClick={toggleColorMode}>
           Cambiar a {colorMode === "light" ? "oscuro" : "claro"}
       </Button>
   </Box>; */
