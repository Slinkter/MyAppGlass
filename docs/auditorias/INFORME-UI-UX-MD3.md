# Informe UI/UX y Material Design 3

- **Fecha:** 2026-11-11 · **Rama:** `chore/auditoria-md3` · **Base:** `2ff06909`
- **Alcance:** verificación del trabajo de OpenCode, prueba de UI en navegador (móvil 360×800 con Playwright; escritorio con Chrome/Edge), brechas frente a Material Design 3 (MD3) y propuesta por lotes.
- **Solo diagnóstico.** No se cambió código de la web. Todo cambio de diseño va por lotes con aprobación del dueño (ver `CLAUDE.md`).

## 1. Estado del trabajo de OpenCode

| Verificación                                              | Resultado                                                                        |
| --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Árbol de git                                              | Limpio, sin cambios sin commit.                                                  |
| `next build --webpack`                                    | Exit 0, 70/70 páginas.                                                           |
| `tsc --noEmit` (`tsconfig.build.json`)                    | Exit 0.                                                                          |
| `eslint src/`                                             | Exit 0, 0 errores, 2 warnings previos (`ImageReveal.tsx:42`, `Gallery.tsx:303`). |
| Fase 2 (8 entidades) y fase 3 (regla `features→features`) | Completas según `docs/opencode/PLAN-FSD-Y-AGENTES.md`; los gates lo confirman.   |
| `pnpm test:run`                                           | **No ejecutado** (regla del repo: solo bajo pedido).                             |

**Huecos que quedan** (no son del plan de este informe):

- `ClientCard` duplicado: `entities/client/ui/ClientCard.tsx` (tarjeta de admin con acciones) y `features/home/components/clients/ClientCard.tsx` (envoltorio de `MediaCard`). Son componentes distintos con el mismo nombre; conviene renombrar uno.
- `opencode.json` de permisos y documentación de `pnpm.exe` bloqueado: **descartado por el dueño** en esta ronda.

## 2. Hallazgos de UI

Leyenda: **Medido** = lo vi con una medición; **Código** = lo vi leyendo el código; **No confirmado** = hipótesis sin reproducir.

### Alta

| #   | Hallazgo                                                                                                                                                                                      | Evidencia                                                   |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| A1  | Contraste insuficiente en el chip de `/contacto`: texto 12 px, `rgb(3,105,161)` sobre fondo celeste translúcido, **2,77:1** (mínimo 4,5:1).                                                   | Medido (escritorio).                                        |
| A2  | Áreas táctiles bajo MD3 (48): en móvil, 20–45 controles por página miden 44 px; en escritorio los enlaces del navbar miden 43 px de alto y "Ver mapa", "Cómo llegar" y "WhatsApp" también 43. | Medido. Móvil: Home 45 de 84 bajo 48; `/contacto` 25 de 32. |

### Media

| #   | Hallazgo                                                                                                                                                                                             | Evidencia                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| M1  | Escala de títulos inconsistente. h1 en móvil: Home 36, `/blog` 30, `/contacto` 24, `/tienda`, servicios y `/presupuesto` 20 px. En escritorio: Home 72, `/contacto` 36.                              | Medido.                                                                      |
| M2  | Encabezados usados como etiquetas: h2 de 12 px en el footer ("Explorar", etc.) y h3 de 16 px; line-height de h3 fijo en 30 px para 16, 18 y 24 px.                                                   | Medido. Rompe semántica y escala.                                            |
| M3  | Algunos h1/h2 salen en gris `rgb(74,74,74)` en vez de `rgb(17,17,17)` (h1 de `/contacto` y `/tienda`), lo que debilita la jerarquía.                                                                 | Medido (móvil).                                                              |
| M4  | Texto de 12 px en casi todas las rutas (eyebrow del hero, footer, fechas del blog, "Stock", "© 2026", "He leído y acepto…").                                                                         | Medido. Mínimo recomendado 14 px para texto de lectura.                      |
| M5  | El menú móvil añade una entrada al historial (`history.length` 2→3) y deja `mobileMenuOpen:true` pegado en el state de `/`. Hace falta un "atrás" extra para salir y puede desordenar la navegación. | Medido; origen en `widgets/Navbar/mobile/MenuOverlay.tsx:~118-140` (Código). |
| M6  | Ritmo vertical irregular: padding de sección 40/80 en el hero, 0/0 en las demás de Home, 56/56 en `/blog`, 4/4 en servicios.                                                                         | Medido (móvil).                                                              |
| M7  | Falta `viewport-fit=cover` (`app/layout.tsx:36-44`): `env(safe-area-inset-*)` vale 0 en iPhone con notch.                                                                                            | Código.                                                                      |

### Baja

| #   | Hallazgo                                                                                                                                                                                                                                                                                                                   | Evidencia                                       |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| B1  | **No hay transición entre páginas.** `document.startViewTransition` existe, pero `::view-transition-old(root)` da `animationName: none`; sin animaciones activas a 0–977 ms. El CSS de `global.css:52-101` no tiene efecto: falta `viewTransition` en `next.config` y solo `AuraDesktopNav.tsx:112` usa `transitionTypes`. | Medido + Código.                                |
| B2  | `* { scroll-behavior: smooth }` global sin guarda de `prefers-reduced-motion` (`global.css:13`).                                                                                                                                                                                                                           | Código.                                         |
| B3  | Navbar de escritorio de 58 px de alto; MD3 usa 64 dp para barra superior.                                                                                                                                                                                                                                                  | Medido.                                         |
| B4  | Controles de terceros del mapa de Google bajo 44 px (6 en Home).                                                                                                                                                                                                                                                           | Medido; no se controlan desde el código propio. |

### No encontrado

Overflow horizontal (todas las rutas miden 350 de 360), contenido invisible tras hacer scroll completo, solape del FAB con el footer.

## 3. El bug "vuelvo a Home y veo el footer": **no confirmado**

Probé en Playwright a 360×800, con y sin `prefers-reduced-motion`:

- Home → menú → `/contacto` → atrás: vuelve con `scrollY = 0` y el hero visible.
- Home con scroll → `/servicios/balcones` → atrás: el scroll se restaura (3388 → 3388; con reduced-motion 3335 → 3335).

No reproduje el síntoma. Lo que sí es un defecto real y puede empeorar la situación en un teléfono es **M5** (entrada fantasma en el historial). Causas que Playwright de escritorio no puede cubrir: barra de URL que se oculta y cambia `dvh`, restauración del navegador con `scroll-behavior: smooth` (B2), caché de ida y vuelta (bfcache) y contenido `Reveal` en `opacity 0` hasta que el observer dispare (`shared/components/motion/Reveal.tsx:63`, `ItemGridLayout.tsx:43`).

**Siguiente paso necesario:** probarlo en un teléfono real o con emulación de dispositivo (Android Chrome), con `history.scrollRestoration` registrado. Hasta entonces el arreglo del lote 1 es preventivo (M5 + B2 + M7), no una corrección confirmada.

## 4. Limitaciones de esta auditoría

- La prueba de escritorio se hizo en una ventana real de **2124 px** (el redimensionado no dio 1440) y solo midió `/` y `/contacto` por completo; `/presupuesto` y `/tienda` solo en red y consola.
- No se probó `/proyectos/<id>`: en Home las tarjetas de proyecto son botones, sin enlace a un id.
- Los 404 de precarga `/<ruta>/__next.<ruta>.__PAGE__.txt` aparecieron en consola. `PENDIENTES.md` ya los registra como inofensivos y de origen sin confirmar; **mi servidor estático de prueba pudo causarlos o agravarlos**, así que no los cuento como defecto nuevo.
- Los valores de MD3 de la sección 5 vienen de las especificaciones `md.sys.*` conocidas; **no se pudieron contrastar con m3.material.io** (la página carga con JavaScript). Contrastar con `material-web/tokens` antes de fijar números.

## 5. Brechas frente a MD3 y decisión propuesta

La marca (`docs/marca/MANUAL-DE-MARCA.md`) manda sobre MD3 en identidad: negro `#111`, coral solo en texto grande, Lora + Inter.

| Área                                                        | Estado actual                                                   | Propuesta                                                                                                                                 | Decisión            |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Roles de color                                              | Nombres propios (`brand.*`, `bg.*`, `text.*`); sin `container`. | Mapear: primary = `brand.ink`, outline = `border.strong`; añadir `surface.low/high` y `primaryContainer` neutros.                         | Adaptar             |
| Paleta dinámica, `secondary`/`tertiary`, coral como relleno | —                                                               | No generar paleta desde el coral.                                                                                                         | **No adoptar**      |
| Escala tipográfica                                          | Tamaños `xs..6xl` sin roles.                                    | 5 roles (Display, Headline, Title, Body, Label) como _text styles_; Display/Headline en Lora 700, resto en Inter; cuerpo mínimo 14–16 px. | Adaptar             |
| Forma                                                       | `card` 16, `modal` 24; resto de Chakra.                         | Formalizar escala xs 4 · sm 8 · md 12 · lg 16 · xl 28 conservando `card` y `modal`.                                                       | Adoptar             |
| Elevación                                                   | Sombras por componente; tarjetas planas.                        | Niveles 0–2 con superficie tonal en vez de sombra; retirar sombras fuertes.                                                               | Adaptar             |
| Capas de estado                                             | `blackAlpha.50`, `gray.200/300` sueltos.                        | Tokens `state.hover` 8 %, `focus` 10 %, `pressed` 10 % en el tema (sin `rgba` en componentes).                                            | Adoptar             |
| Movimiento                                                  | `EASE_SOFT`, tope 500 ms.                                       | Añadir curvas estándar/desacelerar/acelerar/emphasized en `shared/constants/motion.ts`; patrones _fade through_ y _shared axis_.          | Adoptar             |
| Objetivo táctil                                             | 44 px.                                                          | 48 px en botones y enlaces principales (o área táctil de 48 con padding).                                                                 | Adoptar             |
| Navegación móvil                                            | Menú a pantalla completa + FAB; patrón B en `/design-system`.   | Barra inferior con 3–5 destinos (patrón B). **Decisión del dueño**: reemplazar o complementar el menú.                                    | Pendiente del dueño |
| Rail / drawer                                               | —                                                               | Solo en `AdminLayout`; el sitio público mantiene barra superior.                                                                          | Solo admin          |
| Clases de ventana                                           | Breakpoints de Chakra.                                          | `base` 0 · `md` 600 · `lg` 840 · `xl` 1200.                                                                                               | Adaptar             |

## 6. Propuesta por lotes (todos esperan aprobación del dueño)

1. **Lote 1 – Navegación y scroll** (preventivo): cerrar la entrada fantasma de `MenuOverlay`, `scroll-behavior: smooth` solo sin reduced-motion, `viewport-fit=cover`, safe-area en footer, restaurar scroll de Home de forma explícita.
2. **Lote 2 – Transiciones suaves:** `viewTransition` en `next.config`, `transitionTypes` en enlaces móviles y footer, `nav-back`, tokens de movimiento MD3.
3. **Lote 3 – Nombres:** 19 archivos kebab-case a camelCase (los de mayor impacto: `company-data` 46 importadores, `ecommerce-schemas` 31, `seo-utils` 16) y `screens/DesignSystem/components/motion.tsx` a PascalCase; `shared/ui` queda en kebab-case por convención de Chakra. Renombrar con `git mv` y revisar imports.
4. **Lote 4 – Código limpio / DRY / SOLID:** resolver el `ClientCard` duplicado; partir `shared/providers/theme/index.ts` (717 líneas), `FloatingPanel.tsx` (539) y `MenuOverlay.tsx` (441); fusionar recetas `field*` y `badge*` repetidas.
5. **Lote 5 – Tokens MD3 en el tema:** requiere aprobación explícita; cambiar `primary`, `outline` o `ghost` toca ~83 archivos. Se prueba primero solo en `/design-system`.
6. **Lote 6 – Tipografía y contraste:** escala de h1 única, h2/h3 de 12–16 px pasan a etiquetas no semánticas, texto mínimo 14 px, corregir el chip de `/contacto` (A1).

Cada lote: una sola rama de trabajo, un commit, build + tsc + eslint en verde antes de commitear. Sin deploy ni merge a `main` sin aprobación.
