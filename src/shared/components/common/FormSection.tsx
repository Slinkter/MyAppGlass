import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import { Heading, Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface FormSectionProps extends BoxProps {
  title: string;
  children: React.ReactNode;
  pt?: string | number | object;
}

/**
 * @component FormSection
 * @description Un componente de sección reutilizable diseñado para agrupar campos de formulario
 * con un título claro y un estilo visual consistente, incluyendo un borde inferior.
 */
const FormSection: React.FC<FormSectionProps> = ({ title, children, pt = 4, ...props }) => {
  const headingColor = useColorModeValue("gray.900", "white");

  return (
    <Box {...props}>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb={2}
        pt={pt}
        color={headingColor}
      >
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default FormSection;
