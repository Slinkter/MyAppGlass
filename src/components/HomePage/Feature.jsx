import React from "react";

import FeatureCard from "./FeatureCard";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
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
  return (
    <>
      <Box>
        <Franja title={"BENEFICIO"} text={"¿Por Qué Elegirnos?"} />
      </Box>
      <Container maxW={"8xl"} mt={6} mb={6}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <FeatureCard
            heading={"Presupuesto Online "}
            icon={<Icon as={IoIosCalculator} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          <FeatureCard
            heading={"Visita Técnica "}
            icon={<Icon as={IoIosCalendar} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          <FeatureCard
            heading={"Atención al Cliente "}
            icon={<Icon as={IoMdCall} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          <FeatureCard
            heading={"Materiales "}
            icon={<Icon as={IoIosKeypad} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          <FeatureCard
            heading={"Trabajadores Capacitados "}
            icon={<Icon as={IoMdConstruct} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          <FeatureCard
            heading={"Garantía "}
            icon={<Icon as={IoMdSwap} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          {/*  */}
          <FeatureCard
            heading={"Pagos Seguros "}
            icon={<Icon as={HiOutlineBanknotes} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          <FeatureCard
            heading={"Entrega de Boleta y/o Factura"}
            icon={<Icon as={IoIosPaper} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
          <FeatureCard
            heading={"Ofertas y Promociones  "}
            icon={<Icon as={IoMdPricetags} w={10} h={10} />}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
          />
        </Flex>
      </Container>
    </>
  );
};

export default Feature;
