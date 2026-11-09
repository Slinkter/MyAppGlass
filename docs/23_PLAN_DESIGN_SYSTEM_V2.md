# Plan de trabajo · Optimización del Design System v2 y navbar móvil (Alternativa A)

> Orquestador: Agente principal en Antigravity (**Gemini**, sesión actual en **Gemini 4 Argon**; nota: no existe el identificador `gemini 3.8` en el selector de modelos de Antigravity).
> Ejecutores: subagentes en paralelo (máx. 3 a la vez, regla de `DESIGN-SYSTEM.md` §6) usando `Model: "flash"` (o `"flash_lite"`) como equivalente rápido/económico a Haiku via `define_subagent` con `EnableWriteTools: true`, y escalando a `"inherit"` / `"pro"` si un componente falla 2 veces la verificación.
> Estado: **propuesto, pendiente de OK del usuario**. Ningún agente se lanza antes de ese OK.

## 0. Principios del plan

1. **Primero se ve en `/design-system`, después se propaga al sitio.** Los cambios visuales nuevos se construyen como prototipos v2. Solo las sustituciones que no cambian el aspecto (hex → token con el mismo valor) se aplican directo a componentes de producción.
2. **Un solo dueño del tema.** Solo el orquestador edita `apps/web/src/shared/providers/theme/index.ts`. Si un agente necesita un token que no existe, lo reporta y el orquestador lo añade antes de la siguiente ola.
3. **Archivos disjuntos por agente.** Ninguna ola tiene dos agentes editando el mismo archivo.
4. **Verificar con medición, no con el informe del agente.** Cada ola termina con typecheck, build y auditoría en navegador (Playwright + Chromium headless) hecha por el orquestador. Un hallazgo que no se mida no se da por cerrado.
5. **Haiku por defecto.** Se escala a un modelo mayor solo si Haiku falla la verificación dos veces en el mismo componente (previsto: el menú móvil, por foco atrapado e historial).
6. **Sin commit, push ni deploy por parte de los agentes.** Los commits los hace el orquestador, uno por fase, cuando el usuario lo apruebe.

### Reglas del design system que todo agente debe cumplir (checklist de aceptación)

- [ ] R1 Sin hex, `rgba()` ni `px` sueltos (excepciones: anchos de simulador 360/768/1280 y bordes de 1 px).
- [ ] R2 Sin `colorPalette` suelto; usar `variant` del tema.
- [ ] R3 Targets táctiles ≥ 44 px (`minH="11"` / `minW="11"`).
- [ ] R4 Íconos Lucide solo en 16/20/24; decorativos con `aria-hidden`; botones solo-ícono con `aria-label`.
- [ ] R5 `transition` con máximo 2 propiedades; solo `transform`/`opacity` en animaciones.
- [ ] R6 `dvh` en lugar de `100vh`.
- [ ] R7 Foco visible (`outline 2px` con `ring.primary`, `offset 2px`).
- [ ] R8 Tokens con punto se referencian como token (`"ring.primary"`), nunca como `var(--chakra-colors-ring-primary)` (el nombre real lleva punto y camelCase pasa a kebab).
- [ ] R9 Contraste ≥ 4,5:1 en claro **y** oscuro (se mide, no se estima).
- [ ] R10 Orden de encabezados sin saltos; sin `text-xs` como único texto de estado.
- [ ] R11 `prefers-reduced-motion` respetado.
- [ ] R12 Sin scroll horizontal en 390 px.

---

## Fase 0 · Preparación y línea base (orquestador, sin agentes)

Ya hecho en esta sesión:
- [x] Contraste de estados (`status.dangerText/successText`) y chips seleccionados en oscuro (`accent.navyContrast`).
- [x] Foco global y corrección del recipe de botón (variable de token inexistente).
- [x] Título de sección `h2` en `ShowcaseCard`, título de tarjeta `h3`.
- [x] `unoptimized` en SVG del footer.
- [x] Prototipo `ServiceCardV2Showcase` (pendiente de decisión de diseño).

Pendiente:
- [ ] Decidir con el usuario qué hacer con los cambios sin commit (commitear como `fix(design-system): …` o guardar con `git stash`).
- [ ] Decidir rama: continuar en `perf/imagenes-animaciones` o abrir `feat/design-system-v2`.
- [ ] Guardar el script de auditoría como `scripts/audit-design-system.mjs` (contraste, targets, desbordes, consola, foco, encabezados) para repetirlo en cada ola.
- [ ] Ejecutar la auditoría **base** en las 7 pestañas × 390/768/1440 px × claro/oscuro (hasta ahora solo se auditó la pestaña v2 por defecto). Guardar los números "antes".
- [ ] Inventario de hardcodeo por archivo (hex/rgba, px, colorPalette, vh, `_hover` a mano, íconos con tamaño libre). Partida: `ViewportAndStatesV2Showcase` (44 px + 1 hex), `BrandModulesV2Showcase` (17 px), `DataDisplayShowcase` (9 `colorPalette`), `ImageRevealShowcase` (8 hex), `GalleryThumbnails`, `Gallery`, `MobileNav` (`vh`, enlaces de 20 px).
- [ ] Auditar los ~97 usos de `var(--chakra-colors-…)` y listar los que apuntan a nombres inexistentes (p. ej. `SkipLink`).
- [ ] Revisar qué tokens faltan para las olas siguientes (lista cerrada antes de lanzar agentes).

**Puerta 0:** línea base guardada + decisiones de rama/commits tomadas.

---

## Fase 1 · Tokens, recipes y motion (orquestador, serie)

Se hace **antes** de lanzar agentes para evitar conflictos en el tema.

- [ ] Recipes propias que faltan según `DESIGN-SYSTEM.md` §4: Badge, Tabs, Table, Alert, Dialog.
- [ ] Botón: `sm`/`md` con `minH` ≥ 44 px; decisión abierta del `uppercase` por defecto y del botón primario (navy o negro).
- [ ] Tokens faltantes detectados en Fase 0 (incluido `mono` y los de papel `#FBF8F3` si el usuario los aprueba).
- [ ] Escala de íconos documentada (16/20/24) y, si conviene, un helper `AppIcon`.
- [ ] `apps/web/src/shared/constants/motion.ts` con duraciones y easings únicos (`EASE_PANEL`, `EASE_TEXT`, `EASE_SOFT`, `DUR_*`, `STAGGER`).
- [ ] Corregir `SkipLink` y los `var(--chakra-colors-…)` inválidos de la lista de Fase 0.
- [ ] `pnpm run typecheck && pnpm run build` en verde.

**Puerta 1:** tema estable. Desde aquí los agentes no tocan `theme/index.ts`.

---

## Fase 2 · Ola A (3 agentes Haiku en paralelo)

| Agente | Alcance | Archivos que posee |
|---|---|---|
| **A1 · Navbar móvil v2** (Alternativa A) | Componentes nuevos + vista previa en marco de teléfono | `widgets/Navbar/mobile/**`, `hooks` nuevos, `sections/v2/MobileNavV2Showcase.tsx` |
| **A2 · Navegación, barras, formularios y botones** | Pestañas "Navegación & Barras" y "Formularios & Botones" | `sections/NavigationShowcase.tsx`, `sections/FormControlsShowcase.tsx`, `components/ui/**` (solo sustituciones sin cambio visual) |
| **A3 · Galería, modales, tablas y fichas técnicas** | Pestañas "Galería & Modales" y "Tablas & Fichas Técnicas" | `sections/OverlaysShowcase.tsx`, `GalleryShowcase.tsx`, `ImageRevealShowcase.tsx`, `DataDisplayShowcase.tsx`, `shared/components/common/Gallery*.tsx` |

### Checklist A1 · Navbar móvil v2
- [ ] Barra superior 64 px + safe-area: logo, botón WhatsApp (ícono) y `MenuToggle`.
- [ ] Transparente con degradado sobre el hero; sólida con línea al bajar 24 px; se oculta al bajar y reaparece al subir (`useScrollDirection`).
- [ ] `MenuToggle`: 3 líneas de 2 px → X en 300 ms; `aria-expanded`, `aria-controls`, `aria-label` dinámico; target ≥ 48 px.
- [ ] `MenuOverlay` a pantalla completa (`dvh`), fondo papel cálido; entrada 650 ms y salida 450 ms con `EASE_PANEL`.
- [ ] `MenuLink` con máscara de texto (translateY 105% → 0, 500 ms, cascada 60 ms, +200 ms tras el panel); al cerrar salen primero (200 ms).
- [ ] Enlaces numerados 01–05 (Inicio, Servicios, Proyectos, Ubicación, Contacto) en serif 32–36 px; etiquetas Inter 11 px en mayúsculas.
- [ ] `ServicesAccordion` con `grid-template-rows 0fr → 1fr`; slugs reales de `/servicios/[slug]` (sin inventar; reportar los que falten, p. ej. policarbonato).
- [ ] Pie: píldora navy "Cotizar por WhatsApp" a ancho completo, teléfono 974 278 303 y enlaces Mi cuenta · Libro de reclamaciones · Políticas · modo oscuro, todos ≥ 44 px (el menú actual tiene enlaces de 20 px).
- [ ] `useLockBodyScroll`, `useFocusTrap` (Escape cierra, el foco vuelve al botón).
- [ ] Atrás de Android: `history.pushState` al abrir + `popstate` (solo fuera del modo `contained`).
- [ ] Cierre al navegar y al pasar a ≥ 1024 px.
- [ ] `prefers-reduced-motion`: solo fade de 150 ms.
- [ ] Sin `backdrop-filter` en el panel ni animación de `box-shadow`.
- [ ] Vista previa en marco de teléfono de 390 px (modo `contained`, sin bloquear la página real).
- [ ] No se modifica `MobileNav.tsx` ni `AuraNavbar.tsx` (el sitio no cambia en esta fase).

### Checklist A2 · Navegación, barras, formularios y botones
- [ ] Hex/rgba/px sueltos → tokens (R1).
- [ ] `_hover`/`bg` a mano → `variant` del tema (R2).
- [ ] Alineación y espaciado en la escala 4/8 px; `minH` en todos los controles (R3).
- [ ] Uso de íconos: tamaño único por contexto, `aria-hidden` o `aria-label` (R4).
- [ ] Barras (navbar, tabs, breadcrumbs, paginación): estado activo con `nav-state-active`, foco visible, `aria-current`.
- [ ] Formularios: label visible, `aria-describedby` en errores, `autocomplete`/`inputmode` correctos, estado de error y deshabilitado diferenciados de solo-lectura.
- [ ] Botones: los 9 estados (default, hover, focus-visible, active, disabled, loading, error, vacío, éxito) en claro y oscuro.
- [ ] Sin `transition` de más de 2 propiedades (R5).

### Checklist A3 · Galería, modales, tablas y fichas técnicas
- [ ] Hex en `ImageRevealShowcase` y `GalleryThumbnails` → tokens.
- [ ] `colorPalette` en `DataDisplayShowcase` → `variant`/tokens `status.*`.
- [ ] Galería: miniaturas ≥ 44 px, navegación por teclado, `alt` descriptivo, `aspect-ratio` reservado (CLS).
- [ ] Modales: `Dialog` de Chakra (no `position="fixed"` a mano), foco atrapado, Escape, `aria-labelledby`, `dvh`, botón cerrar con `aria-label` en español (el actual dice `Close`).
- [ ] Tablas: `minW` + `overflowX="auto"`, cabecera con `scope`, `aria-sort` en columnas ordenables, cifras con `tabular-nums`.
- [ ] Fichas técnicas: jerarquía de encabezados (`h2` → `h3`), alineación de pares etiqueta/valor, sin `text-xs` como único estilo.
- [ ] Solo los 6 sistemas y colores oficiales de `AGENTS.md` §3 (sin series inventadas).

### Verificación de la Ola A (orquestador)
- [ ] `pnpm run typecheck` y `pnpm run build` en verde.
- [ ] Auditoría Playwright en las pestañas tocadas, 390/768/1440 px, claro y oscuro: contraste, targets, desbordes, consola, foco, encabezados.
- [ ] Revisión visual de capturas (no solo medición).
- [ ] Prueba funcional del menú v2: abrir/cerrar, Escape, foco, acordeón, atrás, `reduced-motion`.
- [ ] Si algo falla, se corrige en una segunda pasada del mismo agente (máx. 2); luego escala el modelo.

**Puerta 2:** Ola A verificada y capturas aprobadas por el usuario.

---

## Fase 3 · Ola B (3 agentes Haiku en paralelo)

| Agente | Alcance | Archivos que posee |
|---|---|---|
| **B1 · Showcases v2 existentes** | Quitar hardcodeo de los showcases v2 | `ViewportAndStatesV2Showcase`, `BrandModulesV2Showcase`, `CardVariantsShowcase`, `ResponsiveScaleShowcase` |
| **B2 · Tarjetas** | `MediaCard` v2 (decisión del velo), `ServiceCard`, `ProjectCardContent`, `ClientCard`, `BlogCard` como prototipos | `sections/EditorialCardsShowcase.tsx`, `sections/v2/ServiceCardV2Showcase.tsx` y prototipos nuevos |
| **B3 · Documentación viva** | Pestaña de tokens + manual | `sections/TokensSection.tsx`, `DesignSystemScreen.tsx`, `docs/DESIGN-SYSTEM.md` |

### Checklist B1
- [ ] Conservar los anchos del simulador (360/768/1280) como constantes con nombre; el resto de `px` → tokens.
- [ ] Alinear los nombres de tokens usados con los reales del tema.
- [ ] Cumplir R1–R12 en las 4 secciones.

### Checklist B2
- [ ] Descripción sin cortar en desktop y móvil (2–3 líneas según ancho).
- [ ] Decidir el velo de lectura: panel de vidrio `blackAlpha.600` frente al bloque opaco `blackAlpha.800` (decisión §5.3 #4); medir contraste sobre las fotos reales.
- [ ] Acción circular de 44 px; foco visible en el enlace raíz; hover de un solo gesto; `_active` con escala 0,98.
- [ ] Prototipos equivalentes para `ProjectCardContent`, `ClientCard` y `BlogCard`.
- [ ] Capturas antes/después en claro y oscuro.

### Checklist B3
- [ ] Documentar tokens nuevos (`status.*Text`, `accent.navyContrast`, `ring.primary`, motion).
- [ ] Documentar el nombre real de las variables CSS y la regla R8.
- [ ] Actualizar `docs/DESIGN-SYSTEM.md` §4 (estado actual) y las decisiones abiertas §5.3.
- [ ] Actualizar `docs/05_CHANGELOG.md`.

**Puerta 3:** Ola B verificada (mismos criterios que la Ola A).

---

## Fase 4 · Verificación integral (orquestador + 1 agente QA Haiku)

- [ ] Auditoría completa: 7 pestañas × 3 anchos × 2 temas; comparar contra la línea base.
- [ ] Tabla antes/después: fallos de contraste, targets < 44 px, saltos de encabezado, errores de consola, hardcodeos restantes.
- [ ] Prueba con teclado y con `prefers-reduced-motion`.
- [ ] Revisión de lector de pantalla (manual, a cargo del usuario; el agente no puede hacerla).
- [ ] `pnpm run typecheck && pnpm run build` y `pnpm run lint`.
- [ ] Informe final con lo que **no** se pudo verificar.

**Puerta 4:** informe aprobado.

---

## Fase 5 · Propagación al sitio (solo con OK del usuario)

- [ ] Sustituir `MobileNav` por el menú v2 en `AuraNavbar` (mantiene rutas y anclas; "Mi Cuenta" pasa al pie).
- [ ] `viewport-fit=cover` en el meta viewport (hoy los `env(safe-area-inset-*)` valen 0 en iPhone) y `theme-color` con el papel de marca.
- [ ] Aplicar la tarjeta v2 elegida a `MediaCard` (llega a `ServiceCard` y `ProjectCardContent`).
- [ ] Sustituir los modales hechos a mano por `Dialog` (`PrintOrderModal`, `NewClientModal`, `CreateProductModal`, `ReplenishStockModal`).
- [ ] Un commit pequeño por componente propagado, mensaje `feat(modulo): …`.
- [ ] Lighthouse móvil antes/después (Performance y Accessibility).
- [ ] Sin push ni deploy sin preguntar.

---

## Pista paralela opcional · Rendimiento (Prompt 05, requiere OK aparte)

Archivos distintos de los del design system, así que puede correr a la vez.

- [ ] No inicializar Firebase Auth en la home para visitantes anónimos (hoy cargan ~590 KB raw tras el `load` y se pide `apis.google.com`, bloqueado por la CSP de producción).
- [ ] Ejecutar Lighthouse móvil con throttling (nunca se midió la nota).
- [ ] Revisar las 14 imágenes con `alt` vacío (13 miniaturas del mapa y 1 de 20 px).
- [ ] Medir el costo de Emotion con CPU throttling 4× (152 `<style data-emotion>`); no migrar.

---

## Reparto y control de costo

- Orquestador: Fases 0, 1, verificación de cada ola y Fase 5.
- Subagentes ligeros (`Model: "flash"` / `"flash_lite"` en Antigravity, equivalentes al rol de Haiku): Olas A y B y QA. Brief con archivos propios, reglas R1–R12, prohibición de tocar el tema y entregables fijos (archivos, decisiones, tokens faltantes, typecheck, límites de verificación).
- Referencia de costo observada: ~55–66 mil tokens por subagente en tareas de este tamaño.
- Máximo 3 agentes en paralelo; una ola no empieza hasta cerrar la puerta anterior.

---

## Límites del agente: qué NO puede hacer y qué NO puede tocar

### 1. Qué NO puede hacer (límites de modelo y entorno)
- **Usar un modelo llamado `"gemini 3.8"` o `"Haiku"` nativo:** En este entorno (Antigravity) no existe el identificador `gemini 3.8` ni el runtime de Claude/Haiku. El orquestador corre sobre el modelo activo de la sesión (**Gemini 4 Argon**) y lanza subagentes mediante `define_subagent` + `invoke_subagent` usando los perfiles disponibles: `"flash"` / `"flash_lite"` (rápidos/económicos, equivalentes a Haiku) e `"inherit"` / `"pro"` (para escalado).
- **Usar `.claude/agents` o la skill `apple-design` directamente:** Esos archivos pertenecen a la configuración de Claude Code; en Antigravity se sustituyen por subagentes definidos con `define_subagent` (`EnableWriteTools: true`) y por las skills disponibles en `.agents/skills/` (`frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `webapp-testing`).
- **Auditar con lector de pantalla real (VoiceOver / NVDA / TalkBack):** Solo puede verificar el árbol de accesibilidad DOM/ARIA, roles, nombres accesibles y foco con Playwright; la prueba auditiva real queda a cargo del usuario (Fase 4).
- **Verificar hardware móvil físico (notch/safe-area real de iOS Safari y gesto físico "Atrás" de Android):** Playwright + Chromium headless permite medir viewports (`390×844`, `768×1024`, `1440×900`), `prefers-reduced-motion` y disparar `history.back()` / `popstate`, pero en Chromium headless `env(safe-area-inset-*)` evalúa a `0px`.
- **Cruzar puertas (`Puerta 0` a `Puerta 4`) o tomar decisiones de marca abiertas sin aprobación del usuario.**
- **Ejecutar `pnpm run test:run` sin pedido explícito** (regla de ahorro de tokens de `AGENTS.md` §1) ni hacer `git commit`, `git push` o `pnpm run deploy:*` sin autorización previa.

### 2. Qué archivos y recursos NO puede tocar
- **Backend y configuración Firebase congelados (`AGENTS.md` §5 y §6):**
  - `apps/functions/**`
  - `firestore.rules`, `storage.rules`, `firebase.json`, `.firebaserc`
- **Activos intocables de marca (`DESIGN-SYSTEM.md` §2.2):**
  - `apps/web/public/brand/logo.png` y el logo de BBVA (no se modifican, recolorean ni deforman).
- **Datos de empresa y catálogo (`AGENTS.md` §3, `DESIGN-SYSTEM.md` §2.1 y §2.5):**
  - No escribir dirección, teléfonos ni correo a mano (siempre importar `companyData` desde `@/shared/config/company-data`).
  - No inventar series de ventanas fuera de las 6 oficiales (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`, `Acústica`, `PVC abatible`) ni crear catálogos locales en código para los 3 servicios nuevos (su fuente de verdad es Firestore).
  - No reactivar el visor 3D eliminado (`2ca4f3e`); el simulador vigente es `/simulador-ai`.
- **Producción durante las Fases 0 a 4 (`Plan` §0.1 y §2):**
  - No tocar `apps/web/src/widgets/Navbar/MobileNav.tsx` ni `apps/web/src/widgets/Navbar/AuraNavbar.tsx` hasta la **Fase 5** (tras aprobar el prototipo en `/design-system`).
  - No aplicar cambios con impacto visual directo a las pantallas públicas del sitio antes de la **Fase 5** (solo se permiten sustituciones 1:1 de hex → token con idéntico valor visual).
- **Restricción exclusiva para subagentes (Olas A y B):**
  - Ningún subagente puede editar `apps/web/src/shared/providers/theme/index.ts` ni tocar archivos asignados a otro subagente de su misma ola.

---

## Decisiones tomadas por el usuario (2026-11-08)

1. **Cambios previos sin commit:** Commitear como `fix(design-system): base de contraste, foco y prototipo ServiceCard v2`.
2. **Rama de trabajo:** Crear y trabajar en `feat/design-system-v2`.
3. **Botón primario (§5.3 #1):** Pasa a **navy (`#002060`)** y mantiene **`uppercase`**.
4. **Velo de la tarjeta (§5.3 #4):** Panel con **`blackAlpha.600`**.
5. **Menú móvil v2:** Sí agregar **"Mi Cuenta"** en el pie del menú móvil.
6. **Pista paralela de rendimiento (Prompt 05):** Sí, se ejecuta **en paralelo**.
