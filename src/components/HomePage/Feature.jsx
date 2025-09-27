import FeatureCard from "./FeatureCard";
import { Box, Container, SimpleGrid, Icon, Flex } from "@chakra-ui/react";
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
            "Obtén una cotización rápida y precisa por WhatsApp. Escríbenos al 996-537-435 para empezar.",
    },
    {
        heading: "Visita Técnica",
        icon: IoIosCalendar,
        description:
            "Agenda una visita técnica gratuita. Nuestro equipo de expertos evaluará tus necesidades en persona.",
    },
    {
        heading: "Materiales",
        icon: IoIosKeypad,
        description:
            "Trabajamos únicamente con materiales de alta calidad para garantizar la durabilidad y seguridad de cada instalación.",
    },
    {
        heading: "Técnicos Capacitados",
        icon: IoMdConstruct,
        description:
            "Contamos con un equipo de instaladores profesionales con amplia experiencia en el sector.",
    },
    {
        heading: "Garantías",
        icon: IoMdSwap,
        description:
            "Tu inversión está protegida. Ofrecemos una garantía de 6 meses en todos nuestros productos y servicios.",
    },
    {
        heading: "Método de pago",
        icon: HiOutlineBanknotes,
        description:
            "Aceptamos tarjetas de crédito y débito. Además, contamos con una cuenta corriente empresarial para tu comodidad.",
    },
    {
        heading: "Recibos",
        icon: IoIosPaper,
        description:
            "Emitimos boletas y facturas electrónicas al instante para formalizar tu compra y garantizar tu tranquilidad.",
    },
    {
        heading: "Promociones",
        icon: IoMdPricetags,
        description:
            "Aprovecha nuestras ofertas y promociones mensuales en una gran variedad de productos y servicios.",
    },
];

const Feature = () => {
    return (
        <Box minHeight="100dvh">
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
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                heading={feature.heading}
                                icon={<Icon as={feature.icon} w={10} h={10} />}
                                description={feature.description}
                            />
                        ))}
                    </SimpleGrid>
                </Flex>
            </Container>
        </Box>
    );
};

export default Feature;
