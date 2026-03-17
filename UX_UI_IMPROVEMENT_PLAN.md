# Plan de Mejoras UX/UI — GYA Company SPA
> **Ejecutor objetivo:** opencode-minimax  
> **Proyecto:** React SPA con Chakra UI + Framer Motion + Vite  
> **Tech Stack:** React 18, Chakra UI v2, Framer Motion, React Router DOM, react-icons  
> **Path raíz:** `/Users/ljcr/Documents/GitHub/MyAppGlass`

---

## Contexto del Proyecto

Esta aplicación es un sitio web comercial para **Glass & Aluminum Company S.A.C.** (GYA Company), una empresa peruana de vidriería y aluminio. Es una SPA renderizada en cliente con Vite.

### Convenciones de Código Establecidas
- **Importaciones directas** (no barrel files) para tree-shaking: `import X from "@features/home/components/X"`
- **Alias de módulos activos:** `@/` = `src/`, `@shared/` = `src/shared/`, `@features/` = `src/features/`
- **Componentes** deben estar wrapeados con `React.memo()` y tener `.displayName`
- **Tipografía responsiva estándar:**
  - H1 (Hero): `{ base: "4xl", md: "5xl", lg: "6xl" }`
  - H2 (Sección): `{ base: "3xl", md: "4xl" }`
  - H3 (Subsección): `{ base: "lg", md: "xl" }`
  - Párrafo: `{ base: "md", md: "lg" }`
  - Caption/secundario: `{ base: "sm", md: "md" }`
- **Iconos responsivos estándar:**
  - Touch targets: `minH="44px"` en móvil (estándar WCAG/Apple HIG)
  - Iconos decorativos grandes: `boxSize={{ base: 8, md: 10 }}`
  - Iconos de UI (botones, links): `boxSize={{ base: 5, md: 5 }}`

---

## Estado Actual (Post-Commit Base)

Los siguientes cambios ya están aplicados al momento de la creación de este plan (rama `refactoriy.2026.03.17`):
- ✅ `Layout.jsx`: Removido background image + glassmorphism overlay
- ✅ `Layout.jsx`: Añadido `pb={{ base: "80px", md: 0 }}` para compensar barra inferior móvil
- ✅ `HomePage.jsx`: Lazy loading de secciones below-the-fold con `React.lazy + Suspense`
- ✅ `ItemGridLayout.jsx`: Espaciado interior mejorado (`VStack spacing={12}`)
- ✅ `ClientCard.jsx`: Imagen reducida a `180px` en mobile, padding y texto compactos
- ✅ `FeatureCard.jsx`: Altura cambiada de fija a `h="auto"` 
- ✅ Tipografía estandarizada en `LandingPageSection`, `ItemGridLayout`, `Footer`, `Franja`

---

## FASE 1 — Visual Polish & Layout Consistency (ALTA PRIORIDAD)

> **Objetivo:** Eliminar inconsistencias visuales detectadas en el audit de la homepage

### Tarea 1.1 — Centrar Items Incompletos en Grid de Beneficios

**Archivo:** `src/features/home/components/FeaturesSection.jsx`

**Problema:** Cuando el grid de beneficios tiene una última fila incompleta (ej: 8 items en un grid de 3 columnas), los 2 ítems sobrantesque quedan alineados a la izquierda.

**Solución:** Modificar el grid para usar `columns` adaptado con wrapper de centrado para la fila incompleta.

**Instrucción:**
En `FeaturesSection.jsx`, cambiar el `containerProps` del `ItemGridLayout` a:
```jsx
containerProps={{ mt: 0, pt: 8 }}
```
Y en `src/shared/components/Layout/ItemGridLayout.jsx`, el `SimpleGrid` ya tiene `justifyItems="center"` — esto es correcto.

Además verificar que el `ItemGridLayout.Item` wrapper tenga `w="full"` para que el SimpleGrid reparta correctamente.

En `src/shared/components/Layout/ItemGridLayout.jsx`, buscar `ItemGridItem` y actualizar:
```jsx
// ANTES:
const ItemGridItem = ({ children }) => {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

// DESPUÉS:
const ItemGridItem = ({ children }) => {
  return (
    <motion.div variants={itemVariants} style={{ width: "100%" }}>
      {children}
    </motion.div>
  );
};
```

---

### Tarea 1.2 — Hero Section: CTA Button

**Archivo:** `src/features/home/components/LandingPageSection.jsx`

**Problema:** La sección Hero (portada) no tiene ningún Call-To-Action (CTA) que lleve al usuario a cotizar o ver servicios. El usuario llega al sitio y no hay inmediatamente una dirección de acción.

**Instrucción:** Agregar un botón CTA dentro del `MotionVStack`. Debe ir **debajo del Text descriptivo** (después de la línea que dice "Empresa Comercial especializada...").

```jsx
// Importar al inicio del archivo:
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Dentro del MotionVStack, después del <Text> del párrafo descriptivo:
<m.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.6 }}
>
  <Link to="/servicios">
    <Button
      mt={8}
      size={{ base: "lg", md: "xl" }}
      colorScheme="primary"
      fontWeight="bold"
      px={{ base: 8, md: 12 }}
      py={{ base: 4, md: 6 }}
      borderRadius="full"
      boxShadow="lg"
      _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
      transition="all 0.2s ease"
    >
      Ver Nuestros Servicios →
    </Button>
  </Link>
</m.div>
```

**Nota:** Usar `m.div` porque el componente ya está dentro de un `LazyMotion` con `domAnimation`.

---

### Tarea 1.3 — Footer Móvil: Padding Bottom y Alineación

**Archivo:** `src/layout/Footer/Footer.jsx`

**Problema detectado en audit visual:**
1. El copyright (`©2026`) está dentro de un `VStack` fuera del `Box` del footer, causando inconsistencia visual
2. Los items del Footer en móvil no tienen alineación central uniforme

**Instrucción:** Mover el `VStack` del copyright hacia adentro del `Box` del footer y unificar el padding:

```jsx
// ANTES (alrededor de línea 72-156):
return (
  <>
    <Box as="footer" my={8} px={{ base: 4, md: 0 }}>
      <Box
        bg={bgColor}
        ...
        pb={4}
      >
        <Flex ...>
          {/* Secciones del footer */}
        </Flex>
      </Box>
    </Box>
    <VStack color={copyrightColor}>
      <Text mt={2} mb={6}>
        Copyright ©2026
      </Text>
    </VStack>
  </>
);

// DESPUÉS:
return (
  <Box as="footer" my={{ base: 4, md: 8 }} px={{ base: 4, md: 0 }}>
    <Box
      bg={bgColor}
      backdropFilter="blur(10px)"
      boxShadow="md"
      borderRadius="2xl"
      color={textColor}
      maxW="7xl"
      mx="auto"
      pt={8}
      pb={6}
    >
      <Flex
        justifyContent="space-around"
        direction={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
        px={{ base: 4, md: 8 }}
        gap={{ base: 2, md: 0 }}
      >
        {/* Secciones del footer */}
      </Flex>
      
      {/* Copyright dentro del box */}
      <Text 
        textAlign="center" 
        fontSize="sm" 
        color={copyrightColor} 
        mt={6} 
        pt={4}
        borderTop="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        mx={{ base: 4, md: 8 }}
      >
        Copyright ©2026 Glass & Aluminum Company S.A.C. — Todos los derechos reservados.
      </Text>
    </Box>
  </Box>
);
```

---

## FASE 2 — Homepage Sections Deep Polish (MEDIA PRIORIDAD)

> **Objetivo:** Mejorar la calidad visual de cada sección con micro-interacciones y consistencia

### Tarea 2.1 — ClientCard: Grid 2 Columnas en Tablet

**Archivo:** `src/features/home/components/ClientsSection.jsx`

**Problema:** En tablets (768px-1023px) las tarjetas se muestran en 1 columna (apiladas), lo que desaprovecha el espacio disponible en pantallas medianas.

**Instrucción:** En `ClientsSection.jsx` el `ItemGridLayout` ya usa `columns={{ base: 1, md: 2, lg: 3 }}` por defecto, verificar que ese default esté activo. Si no se pasa el prop `columns`, el default del `ItemGridLayout.jsx` es `{ base: 1, md: 2, lg: 3 }`. Asegurar que `ClientsSection` **no** sobreescriba ese default.

Si hay un prop `columns` explícito en `ClientsSection.jsx`, eliminarlo para que use el default.

---

### Tarea 2.2 — FeatureCard: Hover State Mejorado + Color de Icono

**Archivo:** `src/features/home/components/FeatureCard.jsx`

**Problema:** Las tarjetas tiene hover de escala pero sin cambio de color del icono, lo que es una oportunidad perdida para feedback visual rico.

**Instrucción:** Agregar un `accentColor` responsive al icono y mejorar hover:

```jsx
// En FeatureCard, agregar:
const iconColor = useColorModeValue("primary.600", "primary.300");
const iconBgHover = useColorModeValue(
  "rgba(255, 255, 255, 0.5)",
  "rgba(0, 0, 0, 0.5)"
);

// Cambiar el Box del icono para incluir transición de hover en el círculo:
// ANTES:
<Flex
  w={{ base: 16, md: 20, lg: 24 }}
  h={{ base: 16, md: 20, lg: 24 }}
  mx="auto"
  mb={4}
  align="center"
  justify="center"
  rounded="full"
  bg={iconBgColor}
>
  {icon}
</Flex>

// DESPUÉS:
<Flex
  w={{ base: 16, md: 20, lg: 24 }}
  h={{ base: 16, md: 20, lg: 24 }}
  mx="auto"
  mb={4}
  align="center"
  justify="center"
  rounded="full"
  bg={iconBgColor}
  transition="background 0.3s ease"
  color={iconColor}
  _groupHover={{ bg: iconBgHover }}
>
  {icon}
</Flex>
```

Y cambiar el `Box` raíz de la tarjeta para incluir `role="group"`:
```jsx
<Box
  role="group"
  w="full"
  ...
>
```

---

### Tarea 2.3 — StoreSection: 2 Columnas en Desktop

**Archivo:** `src/features/home/components/StoreSection.jsx`

**Problema:** La sección de Ubicación usa todo el ancho pero el mapa y el botón están en un stack vertical. En pantallas grandes se podría mostrar la info de la tienda al lado del mapa.

**Instrucción:** Refactorizar el contenido de `StoreSection` para usar un layout de 2 columnas en desktop:

```jsx
// Dentro del ItemGridLayout.Item, reemplazar el Flex vertical por:
<Box w="full" mt={4} mb={12}>
  <Grid
    templateColumns={{ base: "1fr", lg: "1fr 280px" }}
    gap={{ base: 6, lg: 8 }}
    alignItems="start"
  >
    {/* Columna 1: Mapa */}
    <GridItem>
      <Suspense fallback={<MapFallback />}>
        <InteractiveMap />
      </Suspense>
    </GridItem>

    {/* Columna 2: Info + Botón */}
    <GridItem>
      <VStack spacing={4} align={{ base: "center", lg: "flex-start" }} pt={{ base: 0, lg: 4 }}>
        <VStack spacing={1} align={{ base: "center", lg: "flex-start" }}>
          <Text fontWeight="bold" fontSize="lg">Horario de Atención</Text>
          <Text fontSize="md">Lunes a Sábado</Text>
          <Text fontSize="md">9:00 am – 5:00 pm</Text>
        </VStack>
        <VStack spacing={1} align={{ base: "center", lg: "flex-start" }}>
          <Text fontWeight="bold" fontSize="lg">Dirección</Text>
          <Text fontSize="md">Av. Los Fresnos 1250</Text>
          <Text fontSize="md">La Molina, Lima</Text>
        </VStack>
        <Link href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36" isExternal w="full">
          <Button
            leftIcon={<Icon as={FaMapLocationDot} />}
            colorScheme="primary"
            width="full"
            size={{ base: "lg", md: "md" }}
          >
            Abrir en Google Maps
          </Button>
        </Link>
      </VStack>
    </GridItem>
  </Grid>
</Box>
```

**Imports a añadir en `StoreSection.jsx`:**
```jsx
import { Grid, GridItem, VStack, Text as ChakraText } from "@chakra-ui/react";
```

---

## FASE 3 — Páginas Secundarias (MEDIA-BAJA PRIORIDAD)

> **Objetivo:** Aplicar las mismas mejoras de spacing/tipografía a las páginas que no son la Home

### Tarea 3.1 — ServicePage: Consistencia Visual

**Archivo:** `src/features/services/components/ServicePageLayout.jsx`

**Instrucción:** Verificar que el `ServicePageLayout` use los mismos tokens de espacio definidos globalmente. En particular:
- El padding lateral (`px`) debería ser `{ base: 3, md: 8 }` como mínimo
- Los headings deben seguir la escala tipográfica estándar
- Añadir un `pb={{ base: "80px", md: 0 }}` para compensar la barra de nav inferior en móvil

---

### Tarea 3.2 — ProjectPage: Scroll Behavior

**Archivo:** `src/pages/ProjectPage.jsx`

**Instrucción:** Verificar que al abrir un modal de proyecto, el scroll del body quede bloqueado. Chakra UI `Modal` lo hace automáticamente con `blockScrollOnMount`. Verificar si se usa `isOpen` correctamente.

---

### Tarea 3.3 — ErrorPage: Estilo Consistente

**Archivo:** `src/pages/ErrorPage.jsx`

**Instrucción:** Si la página de error existe, verificar que tenga:
- Un CTA de regreso a Home (`<Link to="/">`)
- El mismo esquema de colores del sitio
- Tipografía dentro de la escala estándar

---

## FASE 4 — Accesibilidad y Microinteracciones (BAJA PRIORIDAD)

> **Objetivo:** Cumplir con WCAG 2.1 nivel AA y añadir detalles de microanimación

### Tarea 4.1 — Focus Visible Global

**Archivo:** `src/main.jsx` o el archivo CSS global del proyecto

**Instrucción:** Añadir estilos globales para `focus-visible`:
```css
/* En el CSS global o en el theme de Chakra */
*:focus-visible {
  outline: 3px solid var(--chakra-colors-primary-500);
  outline-offset: 2px;
  border-radius: 4px;
}
```

En Chakra UI, esto se puede poner en el `theme.styles.global`:
```js
// En el archivo de tema (theme.js o similar)
styles: {
  global: {
    "*:focus-visible": {
      outline: "3px solid",
      outlineColor: "primary.500",
      outlineOffset: "2px",
      borderRadius: "md",
    }
  }
}
```

---

### Tarea 4.2 — Navbar: Indicador de Página Activa

**Archivos:** `src/layout/Navbar/DesktopNav.jsx` y el componente de mobile nav

**Instrucción:** Verificar que el link activo de la navegación tenga un estilo visual diferenciado. En React Router DOM v6 se puede usar `NavLink` con `isActive`:

```jsx
import { NavLink } from "react-router-dom";

// Los links deben usar NavLink en vez de Link de react-router-dom:
<NavLink
  to="/servicios"
  style={({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "2px solid currentColor" : "none",
  })}
>
  Servicios
</NavLink>
```

---

### Tarea 4.3 — Skeleton Loading para ClientsSection

**Archivos:** `src/features/home/components/ClientListSkeleton.jsx` (ya existe según `index.js`)

**Instrucción:** Verificar que el `ClientListSkeleton` exista y esté siendo usado como fallback de `Suspense` en `ClientsSection`. Si no, crear el archivo:

```jsx
// src/features/home/components/ClientListSkeleton.jsx
import React from "react";
import { SimpleGrid, Skeleton, Box } from "@chakra-ui/react";

const ClientListSkeleton = React.memo(() => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 10 }} w="full">
    {Array.from({ length: 3 }).map((_, i) => (
      <Box key={i} borderRadius="2xl" overflow="hidden">
        <Skeleton height={{ base: "180px", md: "280px" }} />
        <Box p={4}>
          <Skeleton height="20px" mb={2} />
          <Skeleton height="16px" width="80%" mx="auto" />
        </Box>
      </Box>
    ))}
  </SimpleGrid>
));

ClientListSkeleton.displayName = "ClientListSkeleton";
export default ClientListSkeleton;
```

---

## Tokens de Diseño de Referencia

Estos son los valores de diseño a respetar en TODOS los cambios:

### Spacing (Chakra UI scale)
| Token  | px   | Uso recomendado                      |
|--------|------|--------------------------------------|
| `2`    | 8px  | Gap mínimo entre elementos inline    |
| `3`    | 12px | Padding horizontal en mobile         |
| `4`    | 16px | Gap estándar entre componentes small |
| `6`    | 24px | Padding interno de cards             |
| `8`    | 32px | Gap entre secciones en mobile        |
| `12`   | 48px | Gap interno de secciones             |
| `24`   | 96px | Gap entre secciones major en desktop |

### Breakpoints
| Breakpoint | Ancho mínimo |
|------------|-------------|
| `base`     | 0px         |
| `sm`       | 480px       |
| `md`       | 768px       |
| `lg`       | 992px       |
| `xl`       | 1280px      |

### Paleta de Colores
- **Primario accent:** `primary.600` (light) / `primary.300` (dark)
- **Texto principal:** `gray.800` (light) / `white` (dark)
- **Texto secundario:** `gray.600` (light) / `gray.400` (dark)
- **Fondo card:** `rgba(255,255,255,0.25)` (light) / `rgba(0,0,0,0.25)` (dark)

---

## Notas para opencode-minimax

1. **No usar barrel file imports** (`@features/home`). Importar siempre desde el archivo directo.
2. Las fases son independientes. Ejecutar en orden pero cada tarea dentro de una fase puede hacerse en paralelo.
3. Al terminar cada tarea, crear un commit con el formato: `style(scope): descripcion` o `feat(scope): descripcion`.
4. Si una tarea no aplica (el archivo ya tiene los cambios), documentarlo y pasar a la siguiente.
5. El servidor de desarrollo está en `http://localhost:5174/` — usar herramienta de browser para verificar cambios visuales.
6. El proyecto usa **pnpm** como gestor de paquetes. No usar npm ni yarn.
