# Plan · Rediseño estructural de la navbar móvil

- **Fecha:** 2026-11-09
- **Estado:** implementado (2026-11-09); `typecheck`, `lint` y `build` en verde
- **Alcance:** navbar móvil (`< md`): barra superior, toggle, hoja de menú, acordeón de servicios y hooks asociados.
- **Decisiones del dueño:**
  1. **Barra siempre visible** (se elimina el auto-ocultado por dirección de scroll).
  2. **Rediseño estructural del menú** (no un simple ajuste de padding).

> Documento de trabajo. Implementado y desplegado el 2026-11-09. Cambios registrados en `docs/05_CHANGELOG.md`.

---

## 1. Causas raíz del problema actual

No es un bug aislado: son cuatro sistemas de espaciado conviviendo y una hoja de menú sin arquitectura.

| # | Causa | Evidencia |
|---|---|---|
| C1 | Tres retículas horizontales distintas: página 24 px, barra 16 px, overlay 20 px | `app/layout.tsx:126`, `MobileNavbarV2.tsx:134`, `MenuOverlay.tsx:192` |
| C2 | Cuatro anchos máximos distintos: 1440 (página), 448 (barra), 448 (overlay) | `layout.tsx:124`, `MobileNavbarV2.tsx:132`, `MenuOverlay.tsx:186` |
| C3 | Sin `env(safe-area-inset-*)` en la hoja: 8 px entre barra y primer ítem; CTA bajo el home indicator | `MenuOverlay.tsx:193-194` |
| C4 | IA sin jerarquía: 5 enlaces + 10 servicios con subtítulo + 4 acciones + legales + copyright/tema, con el único CTA al final | `MenuOverlay.tsx:184-393`, `ServicesAccordion.tsx:33-44` |
| C5 | Sin cierre dentro del diálogo: el único cierre es el toggle de la barra, fuera del focus trap | `MenuOverlay.tsx:87`, `MobileNavbarV2.tsx:237` |
| C6 | Tipografía e íconos fuera de escala: texto de 10 px (`2xs`) e íconos de 13/14/18 px | `MenuLink.tsx:79,120`, `ServicesAccordion.tsx:146,156`, `MenuOverlay.tsx:268,297,325,343,361` |
| C7 | Estado de scroll innecesario: `scrollY` y `scrollDirection` provocan un `setState` por frame aunque solo se consumen dos booleanos | `useScrollDirection.ts:46,78,99-107` |
| C8 | Deuda: `MobileNav.tsx` muerto (261 líneas); toggle dibujado con 3 `Box` absolutos y `px` sueltos | `docs/23_PLAN_DESIGN_SYSTEM_V2.md:262`, `MenuToggle.tsx:84-141` |

---

## 2. Decisiones de diseño

| Tema | Decisión |
|---|---|
| Posición de la barra | `sticky top=0` dentro del contenedor de página, con sangrado a los bordes (`mx` negativo). Deja de ser `fixed`: **reserva su propio espacio** y elimina el solape con el contenido |
| Visibilidad | Siempre visible. Sin `useScrollDirection`, sin translate de ocultado, sin re-render por scroll |
| Fondo de la barra | `bg.paper` translúcido + `GLASS_BLUR` **siempre** (sin cambio por scroll); borde inferior `border.warm` siempre |
| Altura de barra | `60px` + `env(safe-area-inset-top)` |
| Retícula | Un único gutter de **24 px** (`px="6"`) para barra, hoja y submenú |
| Hoja de menú | Cubre **todo** el viewport, incluida la barra (z por encima). Cabecera propia: “Menú” + X de cierre |
| CTA | Pie **sticky** siempre visible con “Cotizar por WhatsApp”; el área central es la única que hace scroll |
| Servicios | 6 servicios principales + “Ver todos los servicios”. Sin líneas de categoría de 10 px |
| Tipografía mínima | `xs` = 12 px. Prohibido `2xs` en la navbar |
| Íconos | Solo 16/20 (`ICON_SIZES`) |
| Motion | Máximo 2 propiedades por `transition`; solo `transform`/`opacity`; respetar `prefers-reduced-motion` |
| Alcance | No se toca la navbar de escritorio salvo el punto de consistencia de IA (§6.7) |

---

## 3. Especificación visual y de retícula

### 3.1 Barra superior

```
┌────────────────────────────────────────────┐  ← borde inferior border.warm
│ [logo 32] GYA              [WA 44] [☰ 44] │  altura 60 + safe-area-top
│           GLASS & ALUMINUM                 │
└────────────────────────────────────────────┘
 24px                                    24px
```

- Contenedor: `sticky top="0" zIndex={1700}`, `mx={{ base: "-6" }}` (sangrado), contenido `px="6"`.
- Alto: `minH`/`h` = `calc(60px + env(safe-area-inset-top))` con `pt="env(safe-area-inset-top)"`. Eliminar `--chakra-spacing-16`.
- Lockup: logo **32×32**, “GYA” `md` Lora 700, “GLASS & ALUMINUM” `xs` 600 con `letterSpacing="0.08em"` (no `widest`).
- Acciones: **dos** botones de 44×44 (`minH/minW="11"`), `gap="2"`, mismo radio `full`, mismo `_hover`/`_active`/`_focusVisible`.
- WhatsApp: `WhatsAppIcon` de `@/shared/components/icons/WhatsAppIcon`, tamaño 20, color `brand.whatsappAccessible` **en ambos estados**.
- Toggle: ver §6.4.
- Sin `maxW="md"`: la barra ocupa el contenedor de página (24 px de gutter), no una isla de 448 px.

### 3.2 Hoja de menú

```
┌────────────────────────────────────────────┐  ← cubre también la barra
│ Menú                                    ✕  │  cabecera 60 + safe-area-top
├────────────────────────────────────────────┤  ← borde 1px
│ 01  Inicio                                 │  ┐
│ 02  Servicios                          ⌄  │  │ zona scrolleable
│     ├ Ventanas antirruido                  │  │ (única con overflow)
│     ├ Mamparas …                           │  │
│     └ Ver todos los servicios              │  ┘
│ 03  Proyectos                              │
│ 04  Ubicación                              │
│ 05  Contacto                               │
├────────────────────────────────────────────┤  ← pie sticky, nunca scrollea
│ [  Cotizar por WhatsApp  ]                 │  CTA 48px, ancho completo
│ 📞 974 278 303   👤 Mi cuenta   ◐ Tema     │  fila 44px
└────────────────────────────────────────────┘
 24px                                    24px + safe-area-bottom
```

- Raíz: `position="fixed" inset="0"`, `h="100dvh"`, `display="flex" flexDirection="column"`, `overflow="hidden"`, `bg="bg.paper"`, `zIndex={1800}` (por encima de la barra 1700).
- Cabecera interna: 60 px + `env(safe-area-inset-top)`, `px="6"`, “Menú” `sm` 600 en `text.heading`, X de 44 px con `aria-label="Cerrar menú"`, `borderBottomWidth="1px"` `border.warm`.
- Zona central: `flex="1" overflowY="auto" px="6" pt="4" pb="6"`, `overscrollBehavior="contain"`.
- Pie sticky: `px="6" pt="3" pb="calc(env(safe-area-inset-bottom) + 12px)"`, `borderTopWidth="1px"` `border.warm`, `bg="bg.paper"`.
- CTA: `Button variant="whatsapp" size="lg" w="full" minH="12" borderRadius="full"`, icono 18→**20** y texto `sm` 600, en una línea.
- Fila secundaria: 3 acciones de 44 px (teléfono, Mi cuenta, tema) con `gap="2"`, iconos 16, texto `xs`. Sin “Atención inmediata:”. Sin copyright (ya está en el Footer).
- El botón X del pie de la barra queda oculto tras la hoja; el cierre canónico es el X de la cabecera interna.

### 3.3 Ejes del menú

| Elemento | X desde el borde |
|---|---|
| Gutter de la hoja | 24 |
| Columna de número | 24–48 (24 px de ancho) |
| Etiqueta principal | 56 |
| Guía vertical del submenú | 56 |
| Texto de servicio | 72 |
| CTA / acciones del pie | 24 |

- Numeración: `fontSize="xs"` (12), `fontFamily="mono"`, `fontWeight="600"`, `aria-hidden="true"`, color `text.muted`; activo `accent.navy`.
- Enlace principal: 44 px de alto mínimo, hover/pressed sobre **toda la fila** (`bg.subtle`), no solo sobre el texto.
- Submenú: guía `borderLeftWidth="1px" borderLeftColor="border.subtle"` en x=56, ítems con `pl="4"` (texto en 72), `minH="11"`, `fontSize="sm"`.
- Estados: default / hover / **active (pressed)** / focus-visible / expanded. En táctil no hay hover: el `active` es obligatorio.

---

## 4. Nueva arquitectura de información

**Primaria (5):** Inicio · Servicios (acordeón) · Proyectos · Ubicación · Contacto.

**Servicios (6 + ver todos):** Ventanas antirruido · Mamparas de vidrio templado · Boxes y puertas de ducha · Parapetos y muros cortina · Barandas de vidrio y acero · Techos de policarbonato · **Ver todos los servicios**.

**Secundaria (pie):** Cotizar por WhatsApp (CTA) · Llámanos 974 278 303 · Mi cuenta · Tema.

**Se elimina de la hoja:** “Reclamaciones” y “Políticas” (ya viven en el Footer, presente en todas las páginas), copyright, “Atención inmediata:”, las líneas de categoría de 10 px y el teléfono duplicado como “atención inmediata”.

> Los 4 servicios restantes (balcones, puertas de vidrio, puertas de aluminio, celosías) siguen accesibles desde `/servicios/ver`.

---

## 5. Cambios por archivo

### 5.1 `apps/web/src/widgets/Navbar/mobile/MobileNavbarV2.tsx`
- Quitar `useScrollDirection` y todos los estados de scroll (`isScrolled`, `isVisible`, `forceScrolled`, `variant`).
- Barra `sticky`, `mx={{ base: "-6" }}`, `px="6"`, alto 60 + safe-area, fondo translúcido fijo y borde siempre.
- Lockup 32 px; acciones 44/44 con `gap="2"`; WhatsApp con `WhatsAppIcon` 20 y color de marca fijo.
- Eliminar `maxW="md"` y el `h` con `--chakra-spacing-16`.
- Mantener `contained` (showcase), `isOpen`/`onOpenChange` (modo controlado) y `scrollContainerRef` solo si el showcase lo conserva; si no, retirarlo.
- Actualizar el docblock (hoy describe scroll-reveal).

### 5.2 `apps/web/src/widgets/Navbar/mobile/MenuOverlay.tsx`
- Reestructurar en 3 zonas: cabecera propia (Menú + X), zona scrolleable, pie sticky con CTA y acciones.
- `zIndex 1800`, `100dvh`, `overflow="hidden"` en la raíz; scroll solo en la zona central.
- Gutter 24; safe-area superior e inferior; borde entre zonas.
- Añadir el X interno al foco (queda dentro de la hoja y del trap).
- Quitar legales, copyright, “Atención inmediata” y el teléfono duplicado.
- `fontSize` mínimo `xs`; íconos 16/20; separadores por CSS, no por `<Text>·</Text>`.
- Transición del panel: máximo 2 propiedades (transform + opacity).

### 5.3 `apps/web/src/widgets/Navbar/mobile/MenuLink.tsx`
- Columna de número 24 px, etiqueta en 56, número `aria-hidden`, `xs` (12) en lugar de `2xs`.
- Hover/pressed en toda la fila.
- Ícono del acordeón a 20 (`ICON_SIZES.md`).

### 5.4 `apps/web/src/widgets/Navbar/mobile/MenuToggle.tsx`
- Sustituir las 3 líneas dibujadas con `Box` absolutos por un icono de 20 px (`Menu` / `X` de Lucide) con crossfade/rotación de 300 ms.
- Target 44×44 (`minH/minW="11"`), `aria-expanded`, `aria-controls`, `aria-label` dinámico en español.
- Eliminar `px` sueltos (22, 7, 14, 2).

### 5.5 `apps/web/src/widgets/Navbar/mobile/ServicesAccordion.tsx`
- Recortar a los 6 servicios de §4 + “Ver todos”.
- Quitar la línea de categoría (`2xs`) y el `ChevronRight` de 14 (bajar a 16 o quitarlo).
- Alinear la guía en x=56 y el texto en x=72; `minH="11"`.
- Conservar `role="region"`, `aria-label`, `grid-template-rows 0fr → 1fr` y el respeto a reduced-motion.

### 5.6 `apps/web/src/widgets/Navbar/mobile/hooks/useScrollDirection.ts`
- **Eliminar** el hook y sus exports de `mobile/index.ts` (sin consumidores tras §5.1).
- Si el showcase necesita un estado visual, usar una prop booleana explícita (`forceScrolled`) sin escuchar scroll.

### 5.7 `apps/web/src/widgets/Navbar/mobile/MobileNav.tsx`
- **Borrar** (código muerto confirmado; no tiene imports).

### 5.8 `apps/web/src/widgets/Navbar/AuraNavbar.tsx`
- Ajustar el wrapper móvil: `display={{ base: "block", md: "none" }}` se mantiene, pero el componente ya no necesita `isScrolled` para móvil.
- Mantener el ocultado de la navbar de escritorio en `/servicios`; dejar constancia en comentario de que móvil se mantiene visible por decisión de producto.

### 5.9 `apps/web/src/shared/config/nav-items.ts`
- Añadir `MOBILE_NAV_ITEMS` (5 primarios, con `Servicios` marcado `isAccordion`) y extender `NavItem` con `isAccordion?: boolean`.
- **Decisión final:** `NAV_ITEMS` de escritorio queda **intacto** (sigue apuntando “Mi Cuenta” a `/auth`); solo la hoja móvil usa `/mi-cuenta`. No se modifica la navbar de escritorio en este cambio.

### 5.10 `apps/web/src/screens/DesignSystem/sections/v2/MobileNavV2Showcase.tsx`
- Actualizar a la nueva API (sin `variant`, sin simulación de scroll).
- Mostrar 2 estados: barra cerrada y hoja abierta, dentro del marco de 390 px (`contained`).

### 5.11 `apps/web/src/features/home/components/hero/LandingPageSection.tsx`
- Solo por la barra sticky: `minH={{ base: "calc(92dvh - 60px)", md: "92dvh" }}` para no exceder el viewport.

---

## 6. Fases de ejecución

### Fase 1 · Retícula y barra (sin tocar la hoja)
- [x] 6.1 `MobileNavbarV2`: sticky, gutter 24, alto 60 + safe-area, sin scroll state.
- [x] 6.2 Acciones 44/44 a 8 px; WhatsApp de marca a color fijo.
- [x] 6.3 Verificar alineación logo/contenido en 320/360/390/430.
- [x] 6.4 Hero compensado (`calc(92dvh - 60px)`).

### Fase 2 · Toggle y hoja
- [x] 6.5 `MenuToggle`: icono 20, target 44.
- [x] 6.6 `MenuOverlay`: 3 zonas, cabecera con X, pie sticky, safe-areas, gutter 24, z 1800.
- [x] 6.7 `MenuLink` + `ServicesAccordion`: ejes 24/48/56/72, 6 servicios, sin `2xs`, hover de fila, número `aria-hidden`.

### Fase 3 · Limpieza
- [x] 6.8 Eliminar `useScrollDirection` y sus exports.
- [x] 6.9 Borrar `MobileNav.tsx`.
- [x] 6.10 Añadir `MOBILE_NAV_ITEMS` en `nav-items.ts` (Contacto y `/mi-cuenta` en el menú móvil; escritorio intacto).
- [x] 6.11 Actualizar el showcase de `/design-system` y los docblocks.

### Fase 4 · Validación
- [x] 6.12 `pnpm run typecheck`.
- [x] 6.13 `pnpm run lint`.
- [x] 6.14 `pnpm run build`.
- [x] 6.15 Pruebas manuales de §7.

---

## 7. Criterios de aceptación

**Retícula y espaciado**
- Borde izquierdo del logo = borde izquierdo del contenido de la página (24 px) en 320, 360, 390 y 430 px.
- Ningún elemento de la hoja se acerca a menos de 16 px del notch ni del home indicator (emulación con insets).
- El primer ítem del menú empieza 12–16 px debajo de la cabecera, no 8 px debajo de la barra.
- Sin scroll horizontal ni desbordes en 320 px (R12) ni con zoom al 200 %.

**UX / conversión**
- El CTA “Cotizar por WhatsApp” está visible **sin scroll** en 375×667 y 390×844, con el acordeón cerrado y abierto.
- El menú completo (5 enlaces + 6 servicios + pie) cabe en 2 pantallas de scroll como máximo; hoy son ~3.
- Barra siempre visible; no desaparece en ningún scroll.

**Accesibilidad**
- Teclado: Tab recorre cabecera (X) → enlaces → acordeón → pie y vuelve; Escape cierra; el foco regresa al toggle.
- `aria-expanded`, `aria-controls`, `aria-current`, `aria-hidden` en numeración.
- Foco visible en todos los interactivos; targets ≥ 44 px.
- Cero texto de 10 px y cero íconos de 13/14/18 en la navbar (`grep 2xs` = 0).

**Diseño**
- Un solo gutter y dos anchos máximos como máximo.
- `transition` con ≤ 2 propiedades; `prefers-reduced-motion` sin desplazamientos.
- Claro y oscuro verificados en los dos estados (cerrado/abierto).

---

## 8. Verificación técnica

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

- No ejecutar `pnpm run test:run` salvo pedido explícito (regla de ahorro de tokens en `AGENTS.md`).
- No desplegar (`deploy:hosting`) sin autorización.
- Comprobación manual con Playwright/DevTools en 320×568, 360×800, 390×844, 430×932 y 767×1024; claro y oscuro; `prefers-reduced-motion`; insets simulados de iOS.

---

## 9. Riesgos y rollback

| Riesgo | Mitigación |
|---|---|
| `sticky` + sangrado negativo rompe el layout en alguna ruta | Verificar `/`, `/contacto`, `/servicios/[slug]`, `/proyectos`, `/blog`; rollback = volver a `fixed` + reservar `pt` en `main` |
| `100dvh` + pie sticky en iOS Safari | Usar `height: 100dvh` solo en la raíz y `minH: 0` en la zona central; probar con barra de URL visible/oculta |
| Nueva hoja tapa el `FloatingWhatsApp` | Ya se oculta con `body[data-scroll-locked]`; validar que sigue funcionando con z 1800 |
| Se pierden servicios accesibles | “Ver todos” + páginas por slug; validar enlaces y `sitemap` intactos |
| Showcase de `/design-system` deja de compilar | Actualizar en la misma fase que la API |
| Barra sticky tapa el ancla `#servicios` | `scrollMarginTop` existente en `HomeView` (100/120 px) cubre 60 px con holgura |

**Rollback:** el cambio está confinado a `widgets/Navbar/mobile/*` + 3 archivos de apoyo (hero, nav-items, showcase). Revertir el commit restaura el estado actual sin tocar backend ni reglas.

---

## 10. Fuera de alcance

- Navbar de escritorio (salvo el destino `/mi-cuenta` en `nav-items.ts`, opcional).
- Footer, FloatingWhatsApp, ThemeToggle y `/design-system-ubicacion`.
- `apps/functions/`, `firestore.rules`, `firebase.json` (congelados).
- Contenido/copy comercial más allá de los textos del menú.
