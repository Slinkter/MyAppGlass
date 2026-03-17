# Informe de Optimización de Rendimiento y UX - MyAppGlass (Technical Spec)

Este documento detalla los hallazgos técnicos y proporciona especificaciones de implementación exactas (rutas y lógica) para optimizar el rendimiento de renderizado y la UX. **Diseñado como instrucción para agentes IA (ej. opencode-minimax).**

## 1. Diagnóstico Técnico y Cuellos de Botella

1. **Jank por Blur (GPU Overhead)**: `backdrop-filter: blur()` en `src/layout/MainLayout/Layout.jsx` forzando repintado continuo en móviles durante el scroll.
2. **LCP y TTI Lentos en Galería**: Las imágenes dentro de `src/shared/components/common/Gallery.jsx` o en `src/features/projects/components/modal/VisualViewer.jsx` se cargan de forma reactiva, provocando tiempos de espera al usuario al navegar por el carrusel.
3. **Layout Shifts Secundarios**: El visor de mapas (`MapViewer`) no tiene un estado de carga estructurado que iguale sus dimensiones finales.

---

## 2. Plan de Implementación Técnica (Para Opencode-Minimax)

Ejecutar las siguientes tareas en orden de prioridad:

### 🚀 Tarea 1: Mitigación de GPU Overhead (Layout.jsx)
**Archivo Objetivo**: `src/layout/MainLayout/Layout.jsx`
**Acciones**:
1. Modificar el seudoelemento `_before` del `Box` principal.
2. Aplicar el `backdrop-filter: "blur(5px)"` **solo** para pantallas de escritorio (`md` o superior).
3. Para móviles (`base`), usar un degradado oscuro superpuesto *sin* blur para garantizar la legibilidad del texto sin saturar la GPU. Ejemplo lógico: `backdropFilter: { base: "none", md: "blur(5px)" }` y ajustar la opacidad del `bg`.
4. Asegurar que `backgroundAttachment` se mantenga `scroll` en móvil y solo sea `fixed` en desktop.

### ⚡ Tarea 2: Precarga Inteligente (Eager Pre-fetching) en Galería
**Archivos Objetivo**:
- `src/shared/hooks/ui/useGallery.js` (o donde se maneje el estado de la galería).
- `src/shared/components/common/Gallery.jsx` / `GalleryViewer.jsx`
**Acciones**:
1.  **Lógica de Precarga**: Implementar un `useEffect` que detecte el `selectedIndex` actual. Debe instanciar las imágenes adyacentes (índice actual + 1 y actual - 1) en memoria usando `const img = new Image(); img.src = images[nextIndex].image;`.
2.  **Renderizado Prioritario**: En el mapeo de imágenes principales (dentro del `GalleryViewer` o equivalente), pasar dinámicamente propiedades al componente de imagen nativo o al `ImageWithFallback`:
    *   Si es la imagen actual (`index === selectedIndex`): prop `forceShow={true}`, `loading="eager"`, `fetchpriority="high"`.
    *   Para el resto: `loading="lazy"`.
3.  **Hardware Acceleration**: Añadir al contenedor animado del Slider en Framer Motion la propiedad `style={{ willChange: "transform, opacity" }}`.

### 🎨 Tarea 3: UX y Esqueletos Específicos (Mapas)
**Archivo Objetivo**: `src/features/projects/components/modal/MapViewer.jsx` (y componentes relacionados de mapa si aplicara).
**Acciones**:
1. Implementar `Skeleton` de Chakra UI envolviendo el componente principal del mapa.
2. Utilizar el callback de carga del provider del mapa (ej: `<GoogleMap onLoad={() => setIsMapLoaded(true)}>`) para ocultar el esqueleto. El skeleton debe tener el mismo ancho y alto exactos (`100%`) que el contenedor original.
3. Asegurar que el botón del modal flotante "WhatsApp" (`FloatingWhatsApp`) tenga un padding/hit-area mínimo de `44x44px` para cumplir normas de accesibilidad táctil.

### 🛠️ Tarea 4: Optimización del DOM en el Listado de Proyectos
**Archivo Objetivo**: `src/features/projects/components/ProjectCardContent.jsx`
**Acciones**:
1. Las píldoras flotantes generan un DOM complejo. Asegurarse de que el uso de `useColorModeValue` y los overlays (como la superposición negra de gradiente) no causen redibujados (re-paints) masivos en el hover. Aplicar opacidades a propiedades visuales y usar `transform` en lugar de `margin`/`padding` para las animaciones al vuelo.

---

**Nota para Opencode-Minimax:**
Procede a crear planes de implementación y aplicar estos cambios componente por componente, verificando siempre las compilaciones de Vite. Presta especial atención a no romper los Layouts Responsivos construidos con Chakra UI.
