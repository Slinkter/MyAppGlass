import React from "react";
import {
  Container,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import HelmetWrapper from "@/components/HelmetWrapper";

/**
 * Componente: ItemGridLayout
 * --------------------------------------------------------------------
 * @description
 * Un layout reutilizable para mostrar colecciones de elementos (Proyectos, Servicios, Features)
 * en una cuadrícula (Grid) responsiva.
 *
 * Funcionalidades:
 * 1. SEO Automático: Integra `HelmetWrapper` para inyectar títulos y meta-descripciones
 *    específicas para la página que renderiza la lista.
 * 2. Encabezado Estandarizado: Muestra un Título y Subtítulo con estilos consistentes.
 * 3. Grid Adaptable: Usa `SimpleGrid` para ajustar el número de columnas según el dispositivo
 *    (por defecto: 1 en móvil, 2 en tablet, 3 en escritorio).
 * 4. Inyección de Componentes: Recibe un `ItemComponent` como prop, lo que le permite
 *    renderizar cualquier tipo de tarjeta (ProjectCard, ServiceCard, etc.) dinámicamente.
 *
 * @param {Object} props
 * @param {string} props.title - Título principal de la sección.
 * @param {string} props.subtitle - Texto descriptivo secundario.
 * @param {Array} props.items - Array de datos a iterar.
 * @param {React.ElementType} props.ItemComponent - El componente que renderizará cada ítem.
 * @param {string} props.seoTitle - Título para la etiqueta <title> del navegador.
 * @param {string} props.seoDescription - Meta descripción para SEO.
 * @param {string} props.seoCanonicalUrl - URL canónica para SEO.
 * @param {Object} [props.columns] - Configuración de columnas responsivas para SimpleGrid.
 * @param {number} [props.spacing] - Espaciado entre elementos del grid.
 * @param {Object} [props.containerProps] - Props adicionales para el contenedor principal.
 */
const ItemGridLayout = (props) => {
  const {
    title,
    subtitle,
    items,
    ItemComponent,
    seoTitle,
    seoDescription,
    seoCanonicalUrl,
    columns = { base: 1, md: 2, lg: 3 },
    spacing = 10,
    containerProps = {},
  } = props;
  const headingColor = useColorModeValue("primary.700", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("primary.500", "primary.300");

  return (
    <>
      <HelmetWrapper
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={seoCanonicalUrl}
      />
      <Container
        maxW="10xl"
        my={6}
        p={0}
        mx={0}
        textAlign="center"
        {...containerProps}
      >
        <Heading
          as="h2"
          color={headingColor}
          mb={{ base: "2", md: "2" }}
          fontSize={{ base: "4xl", md: "4xl" }}
          mt={4}
          textTransform="uppercase"
          fontWeight={600}
          letterSpacing="wide"
          textAlign="center"
          borderBottom="4px"
          borderColor={borderColor}
          width="fit-content"
          mx="auto"
        >
          {title}
        </Heading>

        <Text
          mb={{ base: "2", md: "4" }}
          fontSize={{ base: "2xl", md: "2xl" }}
          color={textColor}
          textAlign="center"
          textTransform="uppercase"
        >
          {subtitle}
        </Text>

        <SimpleGrid columns={columns} spacing={spacing}>
          {items.map((item) => (
            <ItemComponent key={item.id} {...item} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default ItemGridLayout;
