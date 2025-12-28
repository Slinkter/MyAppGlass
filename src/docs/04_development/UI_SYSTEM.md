# 🎨 Sistema de UI y Guías de Estilo (UI System)

Este documento define las reglas visuales y de implementación de UI para `MyAppGlass`.

## 1. Filosofía de Diseño: Glassmorphism

El efecto de vidrio esmerilado es nuestra firma visual. Transmite modernidad y transparencia.

### Regla de Oro
**"Menos es más. El contenido debe flotar."**

## 2. Chakra UI & Theming

Todo el diseño se centraliza en `src/config/theme.js`. **NO usar CSS puro ni estilos en línea a menos que sea estrictamente necesario.**

### Paleta de Colores
- **Primary:** `#f44336` (Rojo corporativo)
- **Secondary:** `#6c757d` (Gris texto)
- **Background (Dark):** `#1a202c` (Gris oscuro azulado)
- **Glass White:** `rgba(255, 255, 255, 0.1)`

### Tipografía
- **Headings & Body:** `Lora`, serif. Elegante y profesional.

## 3. Componentes Base

### `<GlassCard />` (Futura Implementación)
Debe ser el contenedor por defecto para cualquier tarjeta.

```jsx
// Uso Correcto
<Box
  bg={useColorModeValue("whiteAlpha.800", "blackAlpha.400")}
  backdropFilter="blur(10px)"
  border="1px solid"
  borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
>
  {children}
</Box>
```

### Animaciones (Framer Motion)
Utilizar `ScrollReveal` para entradas suaves.
- **Fade Up:** Estándar para tarjetas y secciones.
- **Scale In:** Para botones de llamada a la acción (CTA) importantes.

## 4. Buenas Prácticas

1.  **Responsive:** Usar sintaxis de array/objeto de Chakra: `w={{ base: "100%", md: "50%" }}`.
2.  **Accesibilidad:** Verificar contraste de texto sobre fondos "glass".
3.  **Spacing:** Usar la escala de Chakra (4px por unidad). Evitar pixel perfect (ej. `21px`), preferir `5` (20px) o `6` (24px).
