# Fase 1 — UI/UX y Diseño · Findings

> **Agente:** A — UI/UX Auditor  
> **Skills activas:** `web-design-guidelines`, `ui-ux-pro-max`, `frontend-design`, `hallmark`  
> **Estado:** ✅ Completa  
> **Rama:** `audit/gya-q3-2026`  
> **Inicio:** 2026-08-20 · **Cierre:** 2026-08-20  

---

## 📌 Alcance de la Auditoría

Se auditó a profundidad la capa visual del Portal GYA en todas sus rutas públicas y componentes base, evaluando la coherencia técnica con el sistema de diseño declarado (**Next.js 16 + Chakra UI v3 "Aura" + escala Fibonacci / Proporción Áurea**), accesibilidad WCAG 2.1 AA, adaptación responsiva en 3 breakpoints clave y consistencia entre modos claro y oscuro (`next-themes`).

### Rutas Auditadas
1. **`/` (Home / Landing):** `src/screens/home/ui/HomeView.tsx` y componentes `src/features/home/**`
2. **`/servicios` (Catálogo):** `src/screens/services/ui/ServicesListView.tsx` y `src/features/services/components/ServiceList.tsx`
3. **`/servicios/[serviceSlug]` (Detalle de servicio):** `src/screens/services/ui/ServiceDetailView.tsx` y `src/features/services/components/**`
4. **`/proyectos` (Portafolio de obras):** `src/screens/projects/ui/ProjectsView.tsx` y `src/features/projects/components/ProjectsList.tsx`
5. **`/proyectos/[projectId]` (Ficha de obra):** `src/screens/projects/ui/ProjectDetailView.tsx` y `src/features/projects/components/modal/**`
6. **`/blog` (Artículos de autoridad):** `src/screens/blog/ui/BlogView.tsx` y `src/features/blog/components/BlogList.tsx`
7. **`/blog/[slug]` (Lectura de post):** `src/screens/blog/ui/BlogPostView.tsx`
8. **`/contacto` (Cotizador y tracking):** `src/app/contacto/contact-page-client.tsx` y `src/features/contacto/components/**`
9. **`/libro-de-reclamacion` (Libro legal):** `src/app/libro-de-reclamacion/page.tsx` y `src/features/reclamation-book/components/**`
10. **`/cuentas-bancarias` (Facturación):** `src/screens/legal/ui/BankAccountsView.tsx`
11. **`/politicas-empresa` (Términos y privacidad):** `src/screens/legal/ui/CompanyPoliciesView.tsx`
12. **Widgets Globales:** `src/widgets/Navbar/**`, `src/widgets/Footer/**`, `src/widgets/FloatingActions/**`
13. **Fundamentos Aura:** `src/shared/components/aura/**`, `src/shared/components/common/**`, `src/shared/providers/theme/**`

### Dimensiones de Validación
- **Breakpoints:** Mobile (375px) · Tablet (768px) · Desktop (1440px)
- **Modos de Color:** Claro (`data-theme="light"`) · Oscuro (`data-theme="dark"`)
- **Accesibilidad:** WCAG 2.1 Nivel AA (contraste 4.5:1 / 3:1, semántica ARIA, navegación por teclado, focus rings, landmarks HTML5)
- **Tokens de Espaciado:** Escala Fibonacci declarada (`phi_xs` a `phi_3xl`) vs valores arbitrarios en producción

---

## 📊 Resumen Ejecutivo

- **Total de hallazgos identificados:** 23
  - 🔴 **Críticos (Bloquean release / conversión / a11y):** 5
  - 🟡 **Medios (Deuda técnica visual, tokens y diseño responsivo):** 10
  - 🟢 **Menores (Micro-copy, nits tipográficos y refinamiento estético):** 8
- **Estado del Sistema Aura & Fibonacci:** Existe una desconexión crítica entre la documentación (`README.md`, `DOCS_DEVELOPMENT.md`) y la implementación en código: los tokens `phi_xs` a `phi_3xl` no existen en `src/shared/providers/theme/index.ts` y ningún componente los consume, recurriendo a valores numéricos arbitrarios.
- **Navegación y Modo Oscuro:** El botón `ThemeToggle` de escritorio está desactivado (`return null;`), y la píldora activa de `AuraDesktopNav` tiene un contraste casi nulo (1.15:1) en modo oscuro por tener color fijo `#18181b`. Además, en carga inicial de escritorio el navbar es invisible hasta hacer scroll.
- **Conversión y Negocio:** En la página de detalle de servicios (`BentoCTA`), el enlace de cotización por WhatsApp contiene un número de teléfono de prueba/falso (`51994119999`), desviando clientes potenciales.

---

## 🔴 Hallazgos Críticos (Bloquean Release)

### H1.1 — Enlace de conversión WhatsApp con número ficticio en detalle de servicios
- **Severidad:** 🔴 Crítico
- **Archivo:** `src/features/services/components/ServiceBentoGrid.tsx:23`
- **Descripción:** El botón de llamada a la acción principal (`BentoCTA`) en todos los detalles de servicios tiene hardcodeado el número de WhatsApp `51994119999` en lugar de utilizar `companyData.whatsappNumber` (`51974278303`).
- **Impacto:** Los clientes que intentan solicitar cotización técnica desde cualquier servicio son dirigidos a un número inexistente, perdiendo leads directamente.
- **Patch sugerido:**
```tsx
// PATCH: src/features/services/components/ServiceBentoGrid.tsx
import { companyData } from "@/shared/config/company-data";

export const BentoCTA = React.memo(({ systemName }: { systemName: string }) => (
  <a
    href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(`Hola, quisiera cotizar el servicio de ${systemName}.`)}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ width: "100%", height: "100%", textDecoration: "none" }}
  >
```
- **Esfuerzo:** XS

---

### H1.2 — Tarjetas de Proyectos inaccesibles por teclado y lectores de pantalla
- **Severidad:** 🔴 Crítico
- **Archivo:** `src/features/projects/components/ProjectCardContent.tsx:37-53`
- **Descripción:** La tarjeta `ProjectCardContent` utiliza un contenedor `Box` con un manejador `onClick` pero sin elemento `<a>`, sin `role="link"`, sin `tabIndex={0}`, y sin manejadores de teclado `onKeyDown` (Enter/Space). A diferencia de `ServiceCard`, un usuario que navega con teclado no puede enfocar ni abrir ningún proyecto del portafolio.
- **Impacto:** Violación estricta de WCAG 2.1 (Criterio 2.1.1 Keyboard Navigation). Inaccesibilidad total para usuarios con tecnologías de asistencia.
- **Patch sugerido:**
```tsx
// PATCH: src/features/projects/components/ProjectCardContent.tsx
import RouterLink from "next/link";

// Envolver la tarjeta en RouterLink semántico o usar LinkBox de Chakra:
<RouterLink href={`/proyectos/${id}`} style={{ width: "100%", height: "100%", textDecoration: "none" }}>
  <Box
    role="group"
    tabIndex={0}
    w="full"
    h={{ base: "260px", sm: "280px", md: "310px" }}
    borderRadius="3xl"
    overflow="hidden"
    position="relative"
    bg="black"
    boxShadow="sm"
    transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
    _hover={{ 
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transform: "translateY(-6px)"
    }}
    _focusVisible={{
      outline: "none",
      ring: "2px",
      ringColor: "ring.primary",
      ringOffset: "2px",
    }}
  >
```
- **Esfuerzo:** S

---

### H1.3 — Contraste inaccesible (1.15:1) en indicador de pestaña activa de navegación en Modo Oscuro
- **Severidad:** 🔴 Crítico
- **Archivo:** `src/widgets/Navbar/AuraDesktopNav.tsx:54-58`
- **Descripción:** La variable `activeBg` está fija en `#18181b` tanto para modo claro como oscuro. En modo oscuro, el fondo del navbar es `rgba(10, 10, 12, 0.5)` y el fondo de la página es `#09090b`. Una píldora de fondo `#18181b` sobre `#09090b` arroja un ratio de contraste de **1.15:1**, haciéndola imperceptible.
- **Impacto:** Falla WCAG 2.1 AA (Criterio 1.4.11 Non-text Contrast). Los usuarios en modo oscuro no pueden identificar visualmente en qué sección del sitio se encuentran.
- **Patch sugerido:**
```tsx
// PATCH: src/widgets/Navbar/AuraDesktopNav.tsx
const activeBg = useColorModeValue("#18181b", "rgba(255, 255, 255, 0.15)");
const activeColor = useColorModeValue("white", "white");
const activeBorder = useColorModeValue("none", "1px solid rgba(255, 255, 255, 0.2)");
```
- **Esfuerzo:** XS

---

### H1.4 — Doble ejecutor de envío en Formulario de Reclamaciones (Race Condition)
- **Severidad:** 🔴 Crítico
- **Archivo:** `src/features/reclamation-book/components/DeclarationSection.tsx:123` y `src/features/reclamation-book/components/ReclamationForm.tsx:109`
- **Descripción:** El formulario tiene `onSubmit={handleBtnSubmit}` en la etiqueta `<form>` de `ReclamationForm.tsx:109`, y al mismo tiempo el botón de envío en `DeclarationSection.tsx:123` tiene `type="submit"` y `onClick={handleBtnSubmit}`. Al hacer clic en el botón, la función `handleBtnSubmit` se ejecuta dos veces consecutivas.
- **Impacto:** Puede disparar peticiones dobles a Firebase Functions, duplicar registros en Firestore o mostrar notificaciones toast duplicadas en pantalla.
- **Patch sugerido:**
```tsx
// PATCH: src/features/reclamation-book/components/DeclarationSection.tsx (línea 123)
<Button
  type="submit"
  variant="aura"
  size="xl"
  borderRadius="full"
  fontWeight="900"
  letterSpacing="widest"
  width="full"
  mt="2"
  // Eliminar: onClick={handleBtnSubmit} (el evento submit del form lo maneja)
>
  REGISTRAR RECLAMO / QUEJA
</Button>
```
- **Esfuerzo:** XS

---

### H1.5 — Violación de Landmarks semánticos HTML5 por anidamiento de `<main>` en BlogView
- **Severidad:** 🔴 Crítico
- **Archivo:** `src/screens/blog/ui/BlogView.tsx:7` y `src/app/layout.tsx:113`
- **Descripción:** En `layout.tsx:113` ya existe el contenedor principal `<Box as="main" id="main-content">`. Dentro de `BlogView.tsx:7`, se renderiza otro `<Box as='main'>`. Según las especificaciones de HTML5 y WAI-ARIA, una página debe tener exactamente un único elemento `<main>` no anidado.
- **Impacto:** Falla de validación a11y estructural. Los lectores de pantalla informan múltiples áreas principales anidadas, confundiendo la navegación por landmarks.
- **Patch sugerido:**
```tsx
// PATCH: src/screens/blog/ui/BlogView.tsx
export const BlogView: React.FC = () => {
  return (
    <Box as="section" py={{ base: '6', md: '12', lg: '16' }}>
      <BlogList />
    </Box>
  );
};
```
- **Esfuerzo:** XS

---

### Tabla Resumen — Hallazgos Críticos

| # | Título | Archivo | Esfuerzo |
|---|---|---|---|
| H1.1 | Enlace WhatsApp con número ficticio en detalle de servicios | `src/features/services/components/ServiceBentoGrid.tsx:23` | XS |
| H1.2 | Tarjetas de Proyectos sin soporte de teclado ni enlace semántico | `src/features/projects/components/ProjectCardContent.tsx:37` | S |
| H1.3 | Contraste insuficiente en píldora activa de navbar en modo oscuro | `src/widgets/Navbar/AuraDesktopNav.tsx:54` | XS |
| H1.4 | Disparo duplicado de submit en Libro de Reclamaciones | `src/features/reclamation-book/components/DeclarationSection.tsx:123` | XS |
| H1.5 | Elementos `<main>` anidados en ruta de blog | `src/screens/blog/ui/BlogView.tsx:7` | XS |

---

## 🟡 Hallazgos Medios (Deuda Significativa y Diseño Responsivo)

### H1.6 — Ausencia total de tokens Fibonacci (`phi_xs` a `phi_3xl`) en Chakra UI v3
- **Severidad:** 🟡 Medio
- **Archivo:** `src/shared/providers/theme/index.ts:207-221`
- **Descripción:** El `README.md` y `docs/DOCS_DEVELOPMENT.md` especifican que el proyecto sigue estrictamente la proporción áurea con la escala Fibonacci (`phi_xs: 8px`, `phi_sm: 13px`, `phi_md: 21px`, `phi_lg: 34px`, `phi_xl: 55px`, `phi_2xl: 89px`, `phi_3xl: 144px`). Sin embargo, en `theme/index.ts`, `tokens.spacing` no incluye ninguno de estos tokens y los componentes usan valores numéricos tradicionales (e.g. `gap="8"`, `p="6"`, `mt="5"`).
- **Impacto:** Inconsistencia entre la especificación arquitectónica del sistema de diseño y la implementación real.
- **Patch sugerido:**
```tsx
// PATCH: src/shared/providers/theme/index.ts
spacing: {
  phi_xs: { value: "0.5rem" },      // 8px
  phi_sm: { value: "0.8125rem" },   // 13px
  phi_md: { value: "1.3125rem" },   // 21px
  phi_lg: { value: "2.125rem" },    // 34px
  phi_xl: { value: "3.4375rem" },   // 55px
  phi_2xl: { value: "5.5625rem" },  // 89px
  phi_3xl: { value: "9rem" },       // 144px
  "18": { value: "4.5rem" },
  "22": { value: "5.5rem" },
  "30": { value: "7.5rem" },
  "34": { value: "8.5rem" },
  "38": { value: "9.5rem" },
  "42": { value: "10.5rem" },
  "46": { value: "11.5rem" },
},
```
- **Esfuerzo:** M

---

### H1.7 — Navbar de escritorio completamente oculto en carga inicial (Scroll = 0)
- **Severidad:** 🟡 Medio
- **Archivo:** `src/widgets/Navbar/AuraNavbar.tsx:45-48`
- **Descripción:** En pantallas de escritorio (`md:` en adelante), el navbar tiene `opacity: scrolled ? 1 : 0` y `pointerEvents: scrolled ? 'auto' : 'none'`. Al cargar cualquier página en scroll 0, el usuario no visualiza ninguna barra de navegación superior.
- **Impacto:** Desorientación de usuario en primera visita. Un sitio web corporativo de alta gama requiere navegación accesible inmediatamente en la parte superior sin forzar un desplazamiento previo.
- **Patch sugerido:**
```tsx
// PATCH: src/widgets/Navbar/AuraNavbar.tsx
<Box
  as="header"
  position="sticky"
  top="6"
  zIndex="sticky"
  display={{ base: "none", md: "flex" }}
  justifyContent="center"
  w="full"
  pointerEvents="auto"
  opacity={1}
  transform="translateY(0)"
  transition="box-shadow 0.3s ease, background-color 0.3s ease"
>
  <Box pointerEvents="auto">
    <AuraDesktopNav />
  </Box>
</Box>
```
- **Esfuerzo:** S

---

### H1.8 — `ThemeToggle` es un componente vacío que impide cambiar el modo en escritorio
- **Severidad:** 🟡 Medio
- **Archivo:** `src/widgets/FloatingActions/ThemeToggle.tsx:1-4`
- **Descripción:** `ThemeToggle.tsx` contiene únicamente `export const ThemeToggle = () => return null;`. En móvil existe un botón de cambio dentro del Drawer, pero en escritorio no hay ningún elemento en la interfaz que permita al usuario alternar entre modo claro y oscuro.
- **Impacto:** Los usuarios de escritorio quedan atrapados en el tema por defecto (`light`) sin control de accesibilidad visual.
- **Patch sugerido:**
```tsx
// PATCH: src/widgets/FloatingActions/ThemeToggle.tsx
"use client";
import React from "react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Box } from "@chakra-ui/react";

export const ThemeToggle: React.FC = () => {
  return (
    <Box
      position="fixed"
      bottom={6}
      right={6}
      zIndex="popover"
      display={{ base: "none", md: "flex" }}
      bg="surface.card"
      borderRadius="full"
      borderWidth="1px"
      borderColor="border.default"
      boxShadow="md"
      p={1}
    >
      <ColorModeButton />
    </Box>
  );
};
```
- **Esfuerzo:** S

---

### H1.9 — Interactividad de marcadores del mapa bloqueada arbitrariamente en dispositivos móviles
- **Severidad:** 🟡 Medio
- **Archivo:** `src/features/home/components/store/StoreSection.tsx:34`
- **Descripción:** El callback `handleMarkerToggle` incluye `if (isMobile) return;`, lo que bloquea completamente la interacción táctil con los marcadores de proyectos en el mapa para usuarios móviles.
- **Impacto:** Los usuarios en móviles no pueden consultar información de las obras ni interactuar con la ficha de proyecto desde el mapa.
- **Patch sugerido:**
```tsx
// PATCH: src/features/home/components/store/StoreSection.tsx (línea 34)
const handleMarkerToggle = useCallback(
  (marker: MarkerType) => {
    setSelectedMarker((prev) => {
      const next = prev?.id === marker?.id ? null : marker;
      if (next && infoCardRef.current && typeof window !== "undefined") {
        requestAnimationFrame(() => {
          infoCardRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        });
      }
      return next;
    });
  },
  []
);
```
- **Esfuerzo:** S

---

### H1.10 — Padding excesivo `p="14"` (56px) en `FeatureCard` que colapsa el layout en móviles (375px)
- **Severidad:** 🟡 Medio
- **Archivo:** `src/features/home/components/features/FeatureCard.tsx:53`
- **Descripción:** `Card.Body` define un padding fijo `p="14"` (56px a cada lado). En un viewport móvil de 375px con márgenes laterales del contenedor, la tarjeta tiene ~320px de ancho total, dejando apenas 200px de espacio útil para el contenido, lo que provoca saltos de línea antiestéticos.
- **Impacto:** Degradación visual y lectura deficiente en smartphones compactos (iPhone SE, Galaxy A series).
- **Patch sugerido:**
```tsx
// PATCH: src/features/home/components/features/FeatureCard.tsx (línea 53)
<Card.Body
  p={{ base: "6", sm: "8", md: "10", lg: "14" }}
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  textAlign="center"
  zIndex={1}
  w="full"
>
```
- **Esfuerzo:** XS

---

### H1.11 — Uso de `color="text.body"` en títulos principales (`Heading`) debilitando la jerarquía visual
- **Severidad:** 🟡 Medio
- **Archivo:** `src/shared/components/Layout/ItemGridLayout.tsx:79` y `src/features/home/components/hero/LandingPageSection.tsx:115`
- **Descripción:** En los encabezados de sección principales (`<h1>` y `<h2>`), el texto utiliza `color="text.body"` (gris medio) en lugar del token semántico correspondiente `color="text.heading"` (negro profundo / blanco puro).
- **Impacto:** Reduce el impacto visual y contraste de los encabezados clave frente a los párrafos y subtítulos.
- **Patch sugerido:**
```tsx
// PATCH: src/shared/components/Layout/ItemGridLayout.tsx (línea 79)
<Heading
  as={headingAs}
  fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
  fontWeight="900"
  letterSpacing="tight"
  color="text.heading"
  lineHeight="1.1"
>
```
- **Esfuerzo:** XS

---

### H1.12 — Token CSS inexistente `var(--chakra-colors-bg-panel)` en `SkipLink`
- **Severidad:** 🟡 Medio
- **Archivo:** `src/shared/components/navigation/SkipLink.tsx:22`
- **Descripción:** El estilo inyectado para el SkipLink hace referencia a `background-color: var(--chakra-colors-bg-panel);`. Este token semántico no está definido en el tema de Chakra v3, por lo que el navegador resuelve un fondo transparente al recibir foco por teclado.
- **Impacto:** El texto "Saltar al contenido principal" se sobrepone de forma ilegible sobre los elementos del encabezado durante la navegación con teclado.
- **Patch sugerido:**
```tsx
// PATCH: src/shared/components/navigation/SkipLink.tsx (línea 22)
background-color: var(--chakra-colors-surface-card);
color: var(--chakra-colors-text-heading);
```
- **Esfuerzo:** XS

---

### H1.13 — Referencias a tokens inexistentes `glass.bg` y `glassHover` en `AuraSurface`
- **Severidad:** 🟡 Medio
- **Archivo:** `src/shared/components/aura/AuraSurface.tsx:28,40`
- **Descripción:** `AuraSurface` utiliza `bg={isStrong ? "glass.bg" : ...}` y `boxShadow: "glassHover"`. En `theme/index.ts`, el token semántico definido es `"bg.glass"` (no `glass.bg`) y `tokens.shadows` está vacío (`{}`).
- **Impacto:** Los estilos de fondo y sombra fallan silenciosamente, aplicando valores transparentes o heredados.
- **Patch sugerido:**
```tsx
// PATCH: src/shared/components/aura/AuraSurface.tsx (líneas 28 y 40)
bg={isStrong ? "bg.glass" : isGlass ? { _light: "rgba(255,255,255,0.25)", _dark: "rgba(10,10,12,0.35)" } : "surface.card"}
// y en hover:
boxShadow: "lg"
```
- **Esfuerzo:** XS

---

### H1.14 — Error tipográfico en nombre legal en vista de cuentas bancarias
- **Severidad:** 🟡 Medio
- **Archivo:** `src/screens/legal/ui/BankAccountsView.tsx:199`
- **Descripción:** En la tarjeta de billeteras digitales (Yape/Plin), el nombre de la empresa dice literalmente `"GLASS & ALUMINIO COMPANY S.A.C."` en lugar de `"GLASS & ALUMINUM COMPANY S.A.C."` o consumir directamente `companyData.razonSocial`.
- **Impacto:** Error en documento de validez fiscal y bancaria que afecta la credibilidad corporativa y contraviene las directrices de identidad del proyecto (`AI_HANDOFF.md`).
- **Patch sugerido:**
```tsx
// PATCH: src/screens/legal/ui/BankAccountsView.tsx (línea 199)
<Text
  fontWeight="800"
  fontSize="sm"
  color="text.heading"
>
  {companyData.razonSocial}
</Text>
```
- **Esfuerzo:** XS

---

### H1.15 — Animación apilada duplicada (`slideUp`) en `BlogCard` y `ItemGridLayout.Item`
- **Severidad:** 🟡 Medio
- **Archivo:** `src/features/blog/components/BlogCard.tsx:32` y `src/features/blog/components/BlogList.tsx:22`
- **Descripción:** `ItemGridLayout.Item` ya aplica una animación CSS `slideUp` con delay progresivo (`delay={index * 0.1}`). Dentro del hijo, `BlogCard` vuelve a aplicar `animation={slideUp ... ${index * 0.1}s}`. Esto crea dos transforms simultáneos que provocan un efecto visual brusco y doble repaint en pantallas de alta tasa de refresco (120Hz).
- **Impacto:** Tartamudeo visual (jank) al cargar la vista de Blog.
- **Patch sugerido:**
```tsx
// PATCH: src/features/blog/components/BlogCard.tsx (línea 32)
// Eliminar la prop animation de Box en BlogCard ya que ItemGridLayout.Item lo orquesta
```
- **Esfuerzo:** XS

---

### Tabla Resumen — Hallazgos Medios

| # | Título | Archivo | Esfuerzo |
|---|---|---|---|
| H1.6 | Ausencia de tokens Fibonacci en tema Chakra UI | `src/shared/providers/theme/index.ts:207` | M |
| H1.7 | Navbar de escritorio invisible en carga inicial | `src/widgets/Navbar/AuraNavbar.tsx:45` | S |
| H1.8 | `ThemeToggle` de escritorio deshabilitado (`return null;`) | `src/widgets/FloatingActions/ThemeToggle.tsx:1` | S |
| H1.9 | Interacción de mapa bloqueada arbitrariamente en móviles | `src/features/home/components/store/StoreSection.tsx:34` | S |
| H1.10 | Padding excesivo `p="14"` en `FeatureCard` en móviles | `src/features/home/components/features/FeatureCard.tsx:53` | XS |
| H1.11 | `color="text.body"` en títulos principales (`Heading`) | `src/shared/components/Layout/ItemGridLayout.tsx:79` | XS |
| H1.12 | Token inexistente `bg-panel` en `SkipLink` | `src/shared/components/navigation/SkipLink.tsx:22` | XS |
| H1.13 | Tokens inexistentes `glass.bg` y `glassHover` en `AuraSurface` | `src/shared/components/aura/AuraSurface.tsx:28` | XS |
| H1.14 | Nombre legal incorrecto "GLASS & ALUMINIO" en cuentas | `src/screens/legal/ui/BankAccountsView.tsx:199` | XS |
| H1.15 | Animación `slideUp` duplicada en tarjetas de blog | `src/features/blog/components/BlogCard.tsx:32` | XS |

---

## 🟢 Hallazgos Menores (Micro-Copy y Refinamiento Estético)

### H1.16 — Botón "Leer más" con `opacity: 0` inaccesible en pantallas táctiles
- **Severidad:** 🟢 Menor
- **Archivo:** `src/features/blog/components/BlogCard.tsx:125`
- **Descripción:** El texto "Leer más" permanece con `opacity: 0` y solo se revela en `_groupHover`. En dispositivos móviles (donde no existe el estado hover), el usuario solo ve el icono de flecha sin el copy contextual descriptivo.
- **Patch sugerido:** Usar `opacity={{ base: 1, md: 0 }}` y `_groupHover={{ opacity: 1 }}`.
- **Esfuerzo:** XS

---

### H1.17 — Botón "Compartir" sin acción ni `aria-label` en detalle de blog
- **Severidad:** 🟢 Menor
- **Archivo:** `src/screens/blog/ui/BlogPostView.tsx:149-151`
- **Descripción:** El botón de compartir artículo es un `Box` con un icono `LucideArrowRight` sin evento `onClick`, sin soporte de `navigator.share` y sin `aria-label`.
- **Patch sugerido:** Implementar `navigator.share` con fallback de copia de URL y añadir `aria-label="Compartir este artículo"`.
- **Esfuerzo:** S

---

### H1.18 — Sombra roja dura (`boxShadow`) en botón submit de formulario de contacto
- **Severidad:** 🟢 Menor
- **Archivo:** `src/features/contacto/components/ContactFormSection.tsx:266`
- **Descripción:** El botón tiene `boxShadow="0 8px 24px rgba(204, 2, 2, 0.35)"` hardcodeado en rojo, mientras que el botón utiliza `variant="aura"` (Zinc/Black 900), produciendo un brillo rojo discordante con la paleta sobria de la marca.
- **Patch sugerido:** Remover la sombra roja fija o alinearlo con tokens Aura `boxShadow="sm"`.
- **Esfuerzo:** XS

---

### H1.19 — Campo MathCaptcha sin vinculación explícita de `<label>` para a11y
- **Severidad:** 🟢 Menor
- **Archivo:** `src/shared/components/MathCaptchaField.tsx:94`
- **Descripción:** El input numérico del captcha no tiene una etiqueta `<label htmlFor={id}>` asociada ni `aria-label`, anunciándose únicamente como "cuadro de edición" en lectores de pantalla.
- **Patch sugerido:** Añadir `aria-label="Respuesta de la operación matemática de seguridad"` al `<Input>`.
- **Esfuerzo:** XS

---

### H1.20 — Texto no descriptivo `alt="Icono"` en imagen del Libro de Reclamaciones
- **Severidad:** 🟢 Menor
- **Archivo:** `src/widgets/Footer/Footer.tsx:78`
- **Descripción:** En la fila del footer para el Libro de Reclamaciones, la etiqueta `Image` tiene `alt="Icono"`.
- **Patch sugerido:** Reemplazar por `alt="Libro de Reclamaciones Virtual"`.
- **Esfuerzo:** XS

---

### H1.21 — Microtipografía `9px` y `2xs` hardcodeada fuera de escala de diseño
- **Severidad:** 🟢 Menor
- **Archivo:** `src/widgets/Footer/Footer.tsx:253,266` y `src/screens/legal/ui/CompanyPoliciesView.tsx:66`
- **Descripción:** Se encontraron valores `fontSize="9px"` y `fontSize="2xs"` que no existen en `tokens.fontSizes` de Chakra v3 (mínimo `xs: 0.75rem / 12px`), dificultando la lectura en pantallas pequeñas.
- **Patch sugerido:** Normalizar a `fontSize="xs"` o `fontSize="11px"`.
- **Esfuerzo:** XS

---

### H1.22 — Correo electrónico divergente en Políticas de Privacidad
- **Severidad:** 🟢 Menor
- **Archivo:** `src/screens/legal/ui/CompanyPoliciesView.tsx:247`
- **Descripción:** El texto para el ejercicio de derechos ARCO indica `ventas@gyacompany.com`, mientras que el correo oficial del sitio (`companyData.contactEmail`) es `acueva@gyacompany.com`.
- **Patch sugerido:** Utilizar `{companyData.contactEmail}`.
- **Esfuerzo:** XS

---

### H1.23 — Error ortográfico en subtítulo de lista de servicios
- **Severidad:** 🟢 Menor
- **Archivo:** `src/features/services/components/ServiceList.tsx:52`
- **Descripción:** Subtítulo con falta de tilde y espacio final: `"Descubre nuestros servicios de fabricacion e instalación "`.
- **Patch sugerido:** Corregir a `"Descubre nuestros servicios de fabricación e instalación"`.
- **Esfuerzo:** XS

---

### Tabla Resumen — Hallazgos Menores

| # | Título | Archivo | Esfuerzo |
|---|---|---|---|
| H1.16 | Copy "Leer más" invisible en dispositivos táctiles | `src/features/blog/components/BlogCard.tsx:125` | XS |
| H1.17 | Botón "Compartir" sin función ni `aria-label` en blog | `src/screens/blog/ui/BlogPostView.tsx:149` | S |
| H1.18 | Sombra roja discordante en botón de cotización | `src/features/contacto/components/ContactFormSection.tsx:266` | XS |
| H1.19 | Input MathCaptcha sin `aria-label` explícito | `src/shared/components/MathCaptchaField.tsx:94` | XS |
| H1.20 | Texto alternativo no descriptivo `alt="Icono"` en footer | `src/widgets/Footer/Footer.tsx:78` | XS |
| H1.21 | Tipografía `9px` y token `2xs` fuera del sistema | `src/widgets/Footer/Footer.tsx:253` | XS |
| H1.22 | Correo `ventas@` desalineado con `companyData` | `src/screens/legal/ui/CompanyPoliciesView.tsx:247` | XS |
| H1.23 | Falta ortográfica en subtítulo de servicios | `src/features/services/components/ServiceList.tsx:52` | XS |

---

## 📱 Matriz de Auditoría Responsiva & Modos de Color

| Vista / Componente | 375px (Mobile) | 768px (Tablet) | 1440px (Desktop) | Modo Claro | Modo Oscuro |
|---|---|---|---|---|---|
| **AuraNavbar (Desktop)** | Oculto (OK) | Oculto (OK) | 🟡 Oculto en scroll 0 | ✅ Contraste alto | 🔴 Píldora activa 1.15:1 |
| **MobileNav (Drawer)** | ✅ Fluido + Safe Areas | ✅ Drawer funcional | Oculto (OK) | ✅ Correcto | ✅ Correcto con toggle |
| **Hero (Landing)** | ✅ Logo escala bien | ✅ Buen espaciado | ✅ Impacto visual | ✅ Correcto | ✅ Correcto |
| **FeatureCard** | 🟡 Padding 56px excesivo | ✅ Correcto | ✅ Grid 3 columnas | ✅ Correcto | ✅ Correcto |
| **StoreSection (Mapa)** | 🟡 Marcadores bloqueados | ✅ Correcto | ✅ Tarjeta flotante | ✅ Correcto | ✅ Correcto |
| **ServiceList** | ✅ 1 columna | ✅ 2 columnas | ✅ 3 columnas | ✅ Correcto | 🟡 Botones inline _dark |
| **ServiceDetail (Bento)** | ✅ Stack vertical | ✅ Grid adaptativo | ✅ Layout bento | 🔴 WhatsApp falso | 🔴 WhatsApp falso |
| **ProjectsList** | ✅ 1 columna | ✅ 2 columnas | ✅ 3 columnas | 🔴 Inaccesible teclado | 🔴 Inaccesible teclado |
| **BlogList** | 🟡 Doble animación | ✅ 2 columnas | ✅ 2 columnas | ✅ Correcto | ✅ Correcto |
| **ContactFormSection** | ✅ Formulario usable | ✅ 2 columnas | ✅ MaxW 4xl centrado | 🟢 Sombra roja | 🟢 Sombra roja |
| **Libro de Reclamaciones** | ✅ Responsive fluido | ✅ Grid 2 col inputs | ✅ MaxW 4xl | ✅ Correcto | ✅ Correcto |
| **BankAccountsView** | ✅ Stack vertical | ✅ Grid 2 columnas | ✅ MaxW 7xl | 🟡 Typo en nombre | 🟡 Typo en nombre |
| **Footer** | ✅ 1 columna centrada | ✅ 2 columnas | ✅ 4 columnas | 🟢 9px pequeño | 🟢 9px pequeño |

---

## 📐 Evaluación de Escala Fibonacci & Proporción Áurea

1. **Estado en Tema:** No implementada en tokens de Chakra UI v3 (`theme/index.ts`).
2. **Uso en Componentes:** 0% de adopción en `src/`. Los espaciados utilizan la escala por defecto de Chakra (`1` a `16`, `px`, etc.) en lugar de la escala declarada `phi_xs` (8px) a `phi_3xl` (144px).
3. **Recomendación:** Incorporar los tokens `phi_` a `theme.tokens.spacing` y migrar progresivamente los espaciados mayores (`ItemGridLayout`, `AuraContainer`, `AuraHeader`) para garantizar el ritmo vertical áureo.

---

## 🎨 Detección de Patrones AI-Slop & Calidad Visual

1. **Orbes de Fondo Repetidos:** Se detectó la duplicación exacta de bloques de código de "orbes de luz difusa" (`bgGradient="radial(circle, ...)" filter="blur(140px)"`) copiados y pegados en `LandingPageSection.tsx`, `contact-page-client.tsx` y `BlogCard.tsx`. Se recomienda encapsular en un componente shared `<AuraBackgroundGlow />`.
2. **Estilos `_dark` Inyectados Manualmente:** En `ServiceList.tsx` y `ProjectsList.tsx`, los botones de filtro repiten 15 líneas de estilos inline `_dark`, `borderColor`, `color` en lugar de utilizar una variante `variant="subtle"` o `variant="outline"` nativa de Chakra v3.

---

## 🚀 Quick Wins (≤ 1 día)

1. **Corregir número de WhatsApp en `ServiceBentoGrid.tsx:23`:** Reemplazar el número falso `51994119999` por `companyData.whatsappNumber`.
2. **Hacer accesible `ProjectCardContent.tsx`:** Envolver la tarjeta en un enlace semántico `RouterLink` con focus rings visibles.
3. **Reparar contraste de `AuraDesktopNav.tsx` en modo oscuro:** Ajustar el fondo del tab activo a `rgba(255, 255, 255, 0.15)` en dark mode.
4. **Eliminar doble submit en `DeclarationSection.tsx:123`:** Remover el `onClick` redundante en el botón de submit.
5. **Remover landmark anidado en `BlogView.tsx:7`:** Cambiar `<Box as="main">` a `<Box as="section">`.
6. **Corregir errata en `BankAccountsView.tsx:199`:** Cambiar "ALUMINIO" por `companyData.razonSocial`.
7. **Habilitar `ThemeToggle` en escritorio:** Renderizar el botón flotante en `FloatingActions/ThemeToggle.tsx`.

---

## 🏗️ Mejoras de Largo Plazo (> 1 sprint)

1. **Refactorización Integral a Tokens Fibonacci (`phi_`):** Configurar formalmente los tokens en `theme/index.ts` y armonizar el espaciado global de layouts y componentes Aura.
2. **Sistema de Componentes Compuestos para Filtros:** Crear un componente `<FilterPills items={...} active={...} onChange={...} />` compartido entre servicios, proyectos y blog, eliminando la duplicación de código CSS inline.
3. **Módulo de Compartir en Redes para Blog:** Desarrollar un widget completo de compartir con API nativa (`navigator.share`) y botones de redes sociales (LinkedIn, WhatsApp, X).
4. **Refactorización de Interacción en Mapas Móviles:** Diseñar un Drawer inferior o carrusel táctil para navegar entre obras del mapa en dispositivos móviles en lugar de deshabilitar la interacción.

---

## 📚 Referencias de Skills Consultadas

- `web-design-guidelines`: Validación de contraste WCAG 2.1 AA, landmarks semánticos, tamaño de targets táctiles (44x44px) y navegación por teclado.
- `ui-ux-pro-max`: Armonización de paleta Zinc/Aura, microinteracciones de tarjetas y jerarquía tipográfica.
- `frontend-design`: Consistencia de superficies de cristal (glassmorphism), legibilidad en fondos fotográficos y diseño editorial.
- `hallmark`: Detección de patrones repetitivos (AI-slop) en gradientes y código duplicado.

---

## 🔄 Log de Actividad del Agente

| Fecha | Hora | Acción |
|---|---|---|
| 2026-08-20 | 21:50 | Inicio de auditoría UI/UX Fase 1 |
| 2026-08-20 | 21:51 | Análisis de configuración de tema Aura, Chakra UI v3 y escala Fibonacci |
| 2026-08-20 | 21:52 | Auditoría de layout global, Navbar responsivo, Footer y FloatingActions |
| 2026-08-20 | 21:53 | Auditoría de pantallas de Home, Servicios y Bento Grid |
| 2026-08-20 | 21:54 | Auditoría de Proyectos, Blog, Cotizador y Libro de Reclamaciones |
| 2026-08-20 | 21:55 | Auditoría de Cuentas Bancarias, Políticas de Empresa y a11y WCAG AA |
| 2026-08-20 | 21:56 | Generación del reporte exhaustivo `findings.md` y cierre de Fase 1 |