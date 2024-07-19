import React from "react";

import FeatureCard from "./FeatureCard";
import {
    Box,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import {
    FcAbout,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
} from "react-icons/fc";
import Franja from "../Franja";
import {
    IoIosCalculator,
    IoIosCalendar,
    IoIosKeypad,
    IoIosPaper,
    IoMdCall,
    IoMdConstruct,
    IoMdPricetags,
    IoMdSwap,
} from "react-icons/io";
import { HiOutlineBanknotes } from "react-icons/hi2";

const Feature = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed
    return (
        <>
            <Box>
                <Franja title={"BENEFICIO"} text={"¿Por Qué Elegirnos?"} />
            </Box>
            <Container maxW={"8xl"} mt={6} mb={6}>
                <SimpleGrid
                    columns={isMobile ? 2 : 4}
                    spacingX={isMobile ? "20px" : "30px"}
                    spacingY={isMobile ? "20px" : "30px"}
                >
                    <FeatureCard
                        heading={"Presupuesto Online "}
                        icon={<Icon as={IoIosCalculator} w={10} h={10} />}
                        description={
                            "Contamos con Whatsapp para recibir consulta . 996-537-435"
                        }
                    />
                    <FeatureCard
                        heading={"Agenda una visita técnica "}
                        icon={<Icon as={IoIosCalendar} w={10} h={10} />}
                        description={
                            "La visita técnica es sin costo previa coordinacion  "
                        }
                    />

                    <FeatureCard
                        heading={"Materiales y Accesoris "}
                        icon={<Icon as={IoIosKeypad} w={10} h={10} />}
                        description={
                            "Todos nuestros productos instalado tiene 3 meses de garantia"
                        }
                    />
                    <FeatureCard
                        heading={"Trabajadores Capacitados "}
                        icon={<Icon as={IoMdConstruct} w={10} h={10} />}
                        description={
                            "Nuestros operarios cuenta con experiencia en la instalación "
                        }
                    />
                    <FeatureCard
                        heading={"Garantía del Producto"}
                        icon={<Icon as={IoMdSwap} w={10} h={10} />}
                        description={
                            "Todos nuestros productos instalado tiene 3 meses de garantia"
                        }
                    />
                    {/*  */}
                    <FeatureCard
                        heading={"Depositos y Pagos Seguros "}
                        icon={<Icon as={HiOutlineBanknotes} w={10} h={10} />}
                        description={
                            "Contamos con una cuenta corriente a nombre la empresa y POS para tarjeta de credito y debito"
                        }
                    />
                    <FeatureCard
                        heading={" Boleta y/o Factura"}
                        icon={<Icon as={IoIosPaper} w={10} h={10} />}
                        description={
                            "Emitimos boleta o factura electronica una vez realizado el pago"
                        }
                    />
                    <FeatureCard
                        heading={"Ofertas y Promociones  "}
                        icon={<Icon as={IoMdPricetags} w={10} h={10} />}
                        description={
                            "Cada mes  renovamos nuestras ofertas en productos y servicios"
                        }
                    />
                </SimpleGrid>
            </Container>
        </>
    );
};

export default Feature;
