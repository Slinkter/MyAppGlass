import { Heading, Box, useColorModeValue } from "@chakra-ui/react";

/**
 * @component FormSection
 * @description Un componente de sección reutilizable diseñado para agrupar campos de formulario
 * con un título claro y un estilo visual consistente, incluyendo un borde inferior.
 * Facilita la organización de formularios complejos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - El título que se mostrará en la parte superior de la sección del formulario.
 * @param {React.ReactNode} props.children - El contenido principal del formulario, que se renderizará dentro de esta sección.
 * @param {string|number} [props.pt=4] - Espaciado superior (padding-top) de la sección. Se rige por el sistema de espaciado de Chakra UI.
 * @returns {JSX.Element} La sección de formulario renderizada con el título y el contenido proporcionados.
 *
 * @example
 * // Ejemplo de uso básico de FormSection
 * <FormSection title="Datos de Contacto">
 *   <Stack spacing={4}>
 *     <Input placeholder="Nombre" />
 *     <Input placeholder="Correo Electrónico" />
 *   </Stack>
 * </FormSection>
 *
 * @example
 * // FormSection con un padding superior personalizado
 * <FormSection title="Configuración Avanzada" pt={8}>
 *   <Switch>Habilitar opción</Switch>
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
