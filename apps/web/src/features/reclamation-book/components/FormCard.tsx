import React from "react";
import { VStack } from "@chakra-ui/react";

/**
 * @component FormCard
 * @description Tarjeta contenedora de cada sección del libro de reclamaciones.
 * Misma gramática visual que los correos (fondo de superficie, borde fino, radio amplio)
 * y padding responsive del design system.
 */
const FormCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <VStack
    as="section"
    gap="5"
    align="stretch"
    bg="surface.card"
    borderWidth="1px"
    borderColor="border.default"
    borderRadius={{ base: "xl", md: "2xl" }}
    p={{ base: "4", md: "6" }}
  >
    {children}
  </VStack>
);

export default FormCard;
