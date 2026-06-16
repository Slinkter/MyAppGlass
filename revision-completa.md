# Revisión Completa de Componentes

**Fecha:** 2026-06-15
**Proyecto:** MyAppGlass — GYA Glass & Aluminum
**Framework:** Next.js 16.2.4 + Chakra UI v3 + TypeScript

---

## Estado de Correcciones

| Prioridad | Issue | Archivo | Estado |
|-----------|-------|---------|--------|
| 🔴 Crítico | Cards colapsan a 0px en mobile | `ServiceCard.tsx` | ✅ Corregido |
| 🔴 Crítico | Links `<a>` anidados en mobile | `ServiceCard.tsx` | ✅ Corregido |
| 🔴 Crítico | `useBreakpointValue` undefined en SSR | `ServiceCard.tsx` | ✅ Corregido |
| 🔴 Alto | `ServiceListSkeleton` minH auto en mobile | `ServiceListSkeleton.tsx` | ✅ Corregido |
| 🔴 Alto | Icon library inconsistente | `ComingSoonDisplay.tsx` | ✅ Corregido |
| 🔴 Alto | Colores hardcodeados sin dark mode | `ErrorDisplay.tsx` | ✅ Corregido |
| 🔴 Alto | Tipo `fetchPriority` con `\| string` | `ProjectCard.tsx` / `ProjectCardContent.tsx` | ✅ Corregido |
| 🟡 Medio | Focus ring oculto para teclado | `GalleryViewer.tsx` | ✅ Corregido |
| 🟡 Medio | `router.back()` inseguro como default | `BackButton.tsx` | ✅ Corregido |
| 🟡 Medio | `rootMargin` no responde a resize | `useFilterableList.ts` | ✅ Corregido |
| 🟡 Medio | JSX de Button duplicado (~50 líneas) | `ServiceCard.tsx` | ✅ Corregido |

---

## 1. 🔴 Críticos — Mobile (Corregidos)

### 1.1 ServiceCard — Altura cero en mobile

**Archivo:** `src/features/services/components/ServiceCard.tsx:61,85`

**Problema:**
```tsx
minH={{ base: "auto", md: "320px" }}
```
Todos los hijos del `Card.Body` están posicionados con `position: absolute`, por lo que no aportan altura al contenedor. Con `minH: auto`, la card mide 0px en mobile. El `Skeleton` hereda `h="full"` del padre y también mide 0px.

**Solución:**
```tsx
minH={{ base: "52", md: "320px" }}
```
`h="52"` = 208px, altura estable para la card antes de que cargue la imagen.

### 1.2 ServiceCard — Links HTML anidados en mobile

**Archivo:** `src/features/services/components/ServiceCard.tsx:159-209`

**Problema:** En mobile convivían dos elementos `<a>`:
1. `LinkOverlay asChild > RouterLink` (cubre toda la card)
2. `Button asChild > RouterLink` ("Ver Catálogo")

HTML inválido: `<a>` anidado dentro de `<a>`. Los navegadores en mobile no resuelven correctamente el tap target.

**Solución:** El botón en mobile se renderiza sin link (`Visual-only`), ya que toda la card es clickeable vía `LinkOverlay`. En desktop el botón conserva su link funcional.

### 1.3 ServiceCard — `useBreakpointValue` undefined en SSR

**Archivo:** `src/features/services/components/ServiceCard.tsx:46`

**Problema:** Durante SSR/hidratación, `useBreakpointValue` retorna `undefined` (falsy). La card renderiza temporalmente el layout desktop en mobile antes de que el breakpoint se resuelva, causando flicker.

**Solución:** `?? true` para que el default asuma mobile (seguro para mobile-first).

---

## 2. 🔴 Alto (Corregidos)

### 2.1 ServiceListSkeleton — minH desactualizado

**Archivo:** `src/features/services/components/ServiceListSkeleton.tsx:32`

**Problema:** El skeleton aún tenía `minH={{ base: "auto" }}` que no coincide con el nuevo valor de `ServiceCard`.

**Solución:** `minH={{ base: "52", md: "320px" }}`

### 2.2 ComingSoonDisplay — Librería de iconos inconsistente

**Archivo:** `src/shared/components/common/ComingSoonDisplay.tsx`

**Problema:** Importaba `ClockIcon` de `@heroicons/react/24/outline`. El resto del proyecto usa `lucide-react` y `react-icons/lu`.

**Solución:** Migrado a `LuClock` de `react-icons/lu`. También reemplacé `useColorModeValue` por tokens semánticos (`text.muted`).

### 2.3 ErrorDisplay — Sin soporte dark mode

**Archivo:** `src/shared/components/DataLoader/ErrorDisplay.tsx`

**Problema:** Usaba colores hardcodeados (`whiteAlpha.200`, `whiteAlpha.300`, `color="white"`) que no funcionan en dark mode.

**Solución:** Reemplazado por tokens semánticos del design system (`surface.card`, `border.default`, `text.body`, `text.accent`).

### 2.4 ProjectCard — Tipo `fetchPriority` incorrecto

**Archivo:** `src/features/projects/components/ProjectCard.tsx:15`, `ProjectCardContent.tsx:33`

**Problema:** 
```tsx
fetchPriority?: "auto" | "high" | "low" | string;
```
El `| string` anula por completo el union type, aceptando cualquier string.

**Solución:** Eliminado `| string`.

---

## 3. 🟡 Medio (Corregidos)

### 3.1 GalleryViewer — Focus visible ring

**Archivo:** `src/shared/components/common/gallery/GalleryViewer.tsx:113`

**Problema:** `_focus={{ outline: "none" }}` oculta el outline tanto para mouse como para teclado, rompiendo la accesibilidad por keyboard.

**Solución:** `_focusVisible={{ outline: "none" }}` — solo oculta el outline cuando se hace clic con mouse.

### 3.2 BackButton — Navegación insegura

**Archivo:** `src/shared/components/navigation/BackButton.tsx:19`

**Problema:** `router.back()` por defecto podía sacar al usuario del sitio si llegó directo a la página (sin historial).

**Solución:** Ahora usa `router.push(to)` cuando hay una ruta definida, y `router.back()` solo como fallback.

### 3.3 useFilterableList — rootMargin no reactivo

**Archivo:** `src/shared/hooks/ui/useFilterableList.ts:73`

**Problema:** `rootMargin` se calculaba con `typeof window` al renderizar, pero no se actualizaba al cambiar el tamaño de la ventana.

**Solución:** Migrado a `useMediaQuery` de Chakra que es reactivo.

### 3.4 ServiceCard — JSX duplicado del Button

**Archivo:** `src/features/services/components/ServiceCard.tsx:159-209`

**Problema:** ~50 líneas de JSX casi idéntico para el botón en mobile vs desktop.

**Solución:** Extraído a un solo `<Button>` con props condicionales (`pointerEvents` vs `asChild`).

---

## 4. 🟡 Medio — Hallazgos (No codeados)

### 4.1 React Best Practices

| Issue | Archivo | Descripción |
|-------|---------|-------------|
| Stale closure en keyboard handler | `useGallery.ts:96-103` | `useEffect` depende del objeto `gallery` que se reconstruye cada render. El efecto de teclado se re-ejecuta constantemente. Las dependencias deberían ser `handlePrevious`, `handleNext`, no el objeto completo. |
| 3 patrones de navegación distintos | `BlogCard.tsx`, `ServiceCard.tsx`, `ProjectCard.tsx` | BlogCard usa `next/link`, ServiceCard usa `LinkBox/LinkOverlay`, ProjectCard usa `router.push()`. Unificar a un solo patrón. |

### 4.2 Arquitectura

| Issue | Archivo | Descripción |
|-------|---------|-------------|
| Sync/Async inconsistente | `serviceService.ts` | `getServices()` es síncrono, `getServicePageData()` es async. Si se planea migrar a API real, ambos deberían ser async. |
| Interface duplicada `Service` | `services.ts` y `serviceService.ts` | El tipo `Service` está definido en dos archivos con los mismos campos. Unificar. |
| Dead code | `ServiceListSkeleton.tsx` | El componente existe pero no se importa en ninguna parte desde que se removió el loading state de `ServiceList.tsx`. |

### 4.3 UI/UX

| Issue | Archivo | Descripción |
|-------|---------|-------------|
| CTA no clickeable | `ServiceBentoGrid.tsx:92-112` | "¿Iniciamos tu obra?" es solo texto, no tiene botón de acción. Debería linkear a contacto o WhatsApp. |
| Botón "Ver Catálogo" genérico | `ServiceCard.tsx` | Mismo texto para todos los servicios. Podría ser dinámico: "Ver Ventanas", "Ver Mamparas", etc. |
| Tipografía homogénea | `theme/index.ts:170-171` | Tanto `heading` como `body` usan `Lora`. Sin diferenciación de jerarquía. |

### 4.4 Performance

| Issue | Archivo | Descripción |
|-------|---------|-------------|
| Animación infinita en galería | `GalleryViewer.tsx:133` | `galleryScale` corre `infinite alternate` continuamente, consumiendo GPU en mobile. |
| Transiciones CSS pesadas | `ServiceCard.tsx` | 7-8 transiciones con cubic-bezier complejos en un mismo elemento. |

### 4.5 Accesibilidad

| Issue | Archivo | Descripción |
|-------|---------|-------------|
| BentoCTA sin elemento interactivo | `ServiceBentoGrid.tsx:92-112` | Los usuarios de teclado no pueden acceder a la acción de contacto. |
| LinkOverlay sin contenido visible | `ServiceCard.tsx:216-218` | En mobile, el `<a>` del LinkOverlay es self-closing. Solo visible para screen readers vía `aria-label`. |

---

## 5. Resumen de Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `src/features/services/components/ServiceCard.tsx` | minH mobile, nested links, undefined breakpoint, Button DRY |
| `src/features/services/components/ServiceListSkeleton.tsx` | minH mobile |
| `src/shared/components/common/ComingSoonDisplay.tsx` | Icono + tokens semánticos |
| `src/shared/components/DataLoader/ErrorDisplay.tsx` | Tokens semánticos dark mode |
| `src/features/projects/components/ProjectCard.tsx` | Tipo strict |
| `src/features/projects/components/ProjectCardContent.tsx` | Tipo strict |
| `src/shared/components/common/gallery/GalleryViewer.tsx` | _focus → _focusVisible |
| `src/shared/components/navigation/BackButton.tsx` | Default seguro |
| `src/shared/hooks/ui/useFilterableList.ts` | rootMargin reactivo |

---

*TypeScript compila sin errores después de todas las correcciones.*
