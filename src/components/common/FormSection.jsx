import { Heading, Box, useColorModeValue } from "@chakra-ui/react";

/**
 * @component FormSection
 * @description Componente de sección reutilizable para formularios con un título y borde inferior.
 * Proporciona estilos consistentes para las secciones de un formulario.
 *
 * @param {{
 *   title: string,
 *   children: React.ReactNode,
 *   pt?: string | number
 * }} props - Propiedades del componente.
 * @param {string} props.title - Título de la sección.
 * @param {React.ReactNode} props.children - Contenido del formulario dentro de la sección.
 * @param {string|number} [props.pt=4] - Padding top opcional (por defecto 4).
 * @returns {JSX.Element} La sección de formulario renderizada.
 *
 * @example
 * <FormSection title="Información Personal">
 *   <FormControl>...</FormControl>
 * </FormSection>
 */
const FormSection = ({ title, children, pt = 4 }) => {
  const headingColor = useColorModeValue("gray.900", "white");

  return (
    <Box>
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
