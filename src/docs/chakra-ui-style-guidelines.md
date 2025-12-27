# Guía de Estilos y Convenciones de Chakra UI

Este documento establece las mejores prácticas y convenciones para escribir estilos en el proyecto `MyAppGlass` utilizando Chakra UI. El objetivo es mantener un codebase limpio, consistente, mantenible y performante.

## 1. Filosofía Principal: "Style Props" y Sistema de Tema

Chakra UI es una librería de "CSS-in-JS" que favorece el uso de **style props** directamente en los componentes. Esto permite un prototipado rápido y mantiene los estilos co-ubicados con el marcado.

-   **HACER:** Utilizar style props para aplicar estilos que son específicos de una instancia de un componente.
-   **NO HACER:** Utilizar el prop `style={{}}` (estilos en línea) o crear archivos CSS externos para estilizar componentes individuales.

```jsx
// ✅ HACER: Usar style props
<Box color="white" bg="blue.500" p={4} borderRadius="md">
  Hola Mundo
</Box>

// ❌ NO HACER: Usar estilos en línea
<div style={{ backgroundColor: 'blue', padding: '16px' }}>
  Hola Mundo
</div>
```

## 2. El Sistema de Tema es la Única Fuente de Verdad (SSOT)

Todos los valores de diseño (colores, fuentes, espaciados, etc.) deben estar definidos en el archivo de tema: `src/config/theme.js`. Esto asegura consistencia visual y facilita los cambios de diseño a nivel global.

### Uso de Tokens del Tema

Siempre que sea posible, utilice los "tokens" del tema en lugar de valores hardcodeados.

```jsx
// ✅ HACER: Usar tokens de color y espaciado del tema
<Box bg="primary.accent" p={4}>
  Contenido
</Box>

// ❌ NO HACER: Hardcodear valores que existen en el tema
<Box bg="#ff5757" p="16px">
  Contenido
</Box>
```

### Manejo de Modos de Color (Claro/Oscuro)

Para valores que cambian entre el modo claro y oscuro, utilice el hook `useColorModeValue` únicamente dentro de los componentes. Para estilos definidos en el tema (como variantes), utilice la función `props` que recibe la variante.

```jsx
// En un componente:
const bgColor = useColorModeValue("gray.100", "gray.700");

// En una variante dentro de theme.js
const theme = extendTheme({
  components: {
    Card: {
      variants: {
        custom: (props) => ({
          bg: props.colorMode === 'dark' ? "gray.700" : "gray.100",
        }),
      },
    },
  },
});
```

## 3. Componentes vs. Variantes: Reutilización de Estilos

Cuando un conjunto de estilos se repite en múltiples lugares, tenemos dos estrategias principales:

### Estrategia 1: Crear una Variante de Componente (Preferida)

Si un componente base de Chakra (como `Card`, `Button`, `Input`) se utiliza consistentemente con el mismo conjunto de estilos, la mejor práctica es crear una **variante** en el `theme.js`.

**Caso de Uso:** Nuestro `GlassCard`. En lugar de aplicar manualmente `backdropFilter`, `bg`, `borderColor`, etc., en cada instancia, creamos una variante `glass` para el componente `Card`.

**Implementación (`src/config/theme.js`):**

```javascript
// ...
components: {
    Card: {
        variants: {
            glass: (props) => ({
                backdropFilter: "blur(20px)",
                bg: props.colorMode === "dark" ? "rgba(20, 20, 20, 0.7)" : "rgba(255, 255, 255, 0.7)",
                borderColor: props.colorMode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)",
                borderWidth: "1px",
                // ...otros estilos
            }),
        },
    },
},
// ...
```

**Uso (`GlassCard.jsx`):**

```jsx
// El componente se vuelve simple y declarativo
const GlassCard = (props) => <Card variant="glass" {...props} />;
```

### Estrategia 2: Crear un Componente Personalizado

Si la reutilización implica una combinación de múltiples componentes de Chakra o una lógica específica, cree un nuevo componente en `src/components`.

```jsx
// Ejemplo: Un botón con un ícono y texto específico
const PrimaryIconButton = ({ children, icon }) => (
  <Button leftIcon={icon} colorScheme="primary">
    {children}
  </Button>
);
```

## 4. Composición y Layout

Utilice los componentes de layout de Chakra (`Box`, `Flex`, `Grid`, `Stack`, `VStack`, `HStack`) como base para estructurar la UI.

-   **`Box`:** El componente más genérico, equivalente a un `div`. Úselo como base para otros componentes.
-   **`Flex`:** Para layouts basados en flexbox.
-   **`Grid`:** Para layouts complejos basados en CSS Grid.
-   **`Stack`, `VStack`, `HStack`:** Para apilar elementos con un espaciado consistente entre ellos. Son una forma rápida y legible de usar flexbox para layouts simples.

## 5. Diseño Responsivo (Responsive Design)

Chakra UI tiene un excelente soporte para estilos responsivos utilizando la notación de objeto o array en los style props. Los breakpoints (`sm`, `md`, `lg`, `xl`) están definidos en el tema.

-   **Notación de Objeto (Preferida):** Es más legible y explícita.
-   **Notación de Array:** Es más corta, para cambios simples.

```jsx
// ✅ HACER: Notación de objeto, clara y explícita
<Box width={{ base: "100%", md: "50%", lg: "25%" }}>
  Contenido
</Box>

// ACEPTABLE: Notación de array para estilos simples
<Text fontSize={["sm", "md", "lg"]}>
  Este texto cambia de tamaño
</Text>
```

## 6. Rendimiento

-   **Transiciones:** No aplique transiciones globales en los `baseStyle` de los componentes en `theme.js`. Esto afecta negativamente el rendimiento. Aplique la prop `transition` solo en los componentes o variantes que realmente la necesitan.
-   **Memoización:** Utilice `React.memo` en componentes que reciben props y podrían re-renderizarse innecesariamente. Esto es especialmente importante para componentes de lista (`ProjectCard`, `ClientCard`).

Al seguir estas guías, aseguramos que el proyecto `MyAppGlass` se mantenga consistente, fácil de mantener y con un rendimiento óptimo.
