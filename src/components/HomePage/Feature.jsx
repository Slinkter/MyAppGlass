import React, { memo, useMemo } from "react";
import FeatureCard from "./FeatureCard";
import {
    Box,
    Container,
    SimpleGrid,
    Icon,
    useMediaQuery,
    Flex,
} from "@chakra-ui/react";
import {
    IoIosCalculator,
    IoIosCalendar,
    IoIosKeypad,
    IoIosPaper,
    IoMdConstruct,
    IoMdPricetags,
    IoMdSwap,
} from "react-icons/io";
import { HiOutlineBanknotes } from "react-icons/hi2";
import Franja from "../Franja";

const features = [
    {
        heading: "Presupuesto Online",
        icon: IoIosCalculator,
        description:
            "Recibe una estimación rápida y precisa a través de WhatsApp. Contáctanos al 996-537-435.",
    },
    {
        heading: " Visita Técnica",
        icon: IoIosCalendar,
        description:
            "Coordina una visita técnica sin costo adicional. Nuestro equipo evaluará tus necesidades en persona.",
    },
    {
        heading: "Materiales  ",
        icon: IoIosKeypad,
        description:
            "Ofrecemos una garantía de 3 meses en todos nuestros productos instalados.",
    },
    {
        heading: "Técnicos Capacitados",
        icon: IoMdConstruct,
        description:
            "Nuestro equipo de operarios está altamente capacitado y cuenta con amplia experiencia en instalaciones.",
    },
    {
        heading: "Garantías",
        icon: IoMdSwap,
        description:
            "Disfruta de una garantía de 6 meses en todos nuestros productos instalados.",
    },
    {
        heading: "Método de pago",
        icon: HiOutlineBanknotes,
        description:
            "Disponemos de una cuenta corriente empresarial y aceptamos tarjetas de crédito y débito.",
    },
    {
        heading: "Recibos ",
        icon: IoIosPaper,
        description:
            "Emitimos boletas y facturas electrónicas inmediatamente después de realizar el pago.",
    },
    {
        heading: " Promociones ",
        icon: IoMdPricetags,
        description:
            "Descubre nuestras ofertas y promociones actualizadas cada mes en una variedad de productos y servicios.",
    },
];

const Feature = memo(function Feature() {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed

    return (
        <Box minHeight="100vh">
            <Franja
                title={"BENEFICIOS"}
                text={"¿Por Qué Elegirnos?"}
                minHeight={"20vh"}
            />
            <Container maxW={"8xl"} mt={6} mb={6}>
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    minHeight={"80vh"}
                >
                    <SimpleGrid
                        columns={isMobile ? 1 : 4}
                        spacingX={isMobile ? "20px" : "30px"}
                        spacingY={isMobile ? "20px" : "30px"}
                    >
                        {features.map((feature, index) => {
                            const memoizedIcon = useMemo(() => (
                                <Icon as={feature.icon} w={10} h={10} />
                            ), [feature.icon]);

                            return (
                                <FeatureCard
                                    key={index}
                                    heading={feature.heading}
                                    icon={memoizedIcon}
                                    description={feature.description}
                                />
                            );
                        })}
                    </SimpleGrid>
                </Flex>
            </Container>
        </Box>
    );
});

export default Feature;
