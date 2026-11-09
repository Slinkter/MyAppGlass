# Prompt de 6 bloques · Rediseño de todos los componentes de `/design-system`

> **Versión 2 (2026-11-09).** Reemplaza a la versión anterior (navy, vidrio oscuro). Úsalo con `docs/BRAND-KIT.md`, `docs/DESIGN-SYSTEM.md` (Aura Design System) y el prototipo de referencia `experiments/scroll-craft/index.html` (rama `experiment/scroll-craft`).
> **Lo que cambia respecto a la v1:** la marca es **negra**, la dirección visual sale de `scroll-craft` (papel cálido, serif grande, fotos propias en marcos con proporción fija, vidrio claro de perfil fino), el papel es `#F7F6F3`, y el proceso se hace **componente por componente**, sin tocar páginas.

## Reglas de proceso (obligatorias; vienen de errores ya cometidos)
1. **Solo se edita `/design-system`** (`apps/web/src/screens/DesignSystem/**`) y los componentes que la página muestra y el usuario autoriza **uno por uno** en esa pestaña. **No se toca la home, `LandingPageSection`, ni ninguna página pública** salvo orden explícita del usuario para ese archivo.
2. Antes de cada cambio: decir qué archivo se toca y si es **compartido** (afecta a otras secciones). Un componente compartido se cambia solo con una prop opcional que conserve el comportamiento actual.
3. **No hay trabajo duplicado:** cada componente rediseñado se actualiza a la vez en (a) su showcase de `/design-system`, (b) `docs/DESIGN-SYSTEM.md` §componentes, (c) `docs/BRAND-KIT.md` si cambia una regla de marca, y (d) los artefactos (ver Entregables). Un componente no está «terminado» hasta cumplir las cuatro.
4. Se muestra **antes/después** en `/design-system` y espera el OK del usuario para pasar al siguiente. Un commit por componente. Sin push ni deploy.
5. Sin inventar datos: textos solo del Brand Kit; precios, plazos, garantías y horario siguen como marcadores hasta que el dueño los confirme. Fuente de títulos: **Lora** (decidido 2026-11-09), vía el token `fonts.heading`; nunca nombrar la fuente en el componente.

---

**[BLOQUE 1 – ROL Y CONTEXTO]** Eres diseñador/a UI/UX senior (criterio Apple HIG y WCAG 2.2 AA) y frontend (Next.js 16 export estático, Chakra UI v3, Feature-Sliced Design). Trabajas para **Glass & Aluminum Company S.A.C.**, vidriería de La Molina (Lima) que compra a proveedores, ensambla en taller y vende e instala. Lee `AGENTS.md`, `docs/BRAND-KIT.md`, `docs/DESIGN-SYSTEM.md` y abre `experiments/scroll-craft/index.html` (en el worktree `../MyAppGlass-scrollcraft`) y `/design-system-ubicacion` › B (mapa inmersivo) como referencias visuales. Objetivo: **un solo sistema (Aura Design System)** con el lenguaje de esas dos referencias, aplicado a **todos** los componentes que muestra `/design-system`, estandarizado, sin cambios bruscos de identidad.

**[BLOQUE 2 – USUARIOS]** (a) Cliente: llega desde WhatsApp en un móvil de 360 px; busca ventanas antirruido, mamparas, techos; mira proyectos; pide presupuesto. (b) Vendedor y administración: presupuestos, inventario, clientes, desde tablet o escritorio. (c) Desarrolladores y agentes de IA: necesitan tokens y reglas sin ambigüedad. Prioridad móvil 360 → tablet 768 → escritorio 1280.

**[BLOQUE 3 – TAREAS Y LENGUAJE VISUAL]**
*Lenguaje (tomado de `scroll-craft` y del mapa B; se expresa como tokens del tema, no como CSS suelto):*
- **Color:** negro de marca `#111111` (texto, botón primario, títulos); papel `#F7F6F3`; gris suave `#4A4A4A` para texto secundario; línea `rgba(0,0,0,.10)`; el azul solo en foco y enlaces; coral del logo solo en el logo; rojo `#D62828` solo en «PRESUPUESTO». Oscuro: fondo `#0E0E0E`, texto `#F2F2F2`.
- **Tipografía:** títulos en `fonts.heading` (serif) con peso 400–700 según jerarquía y tamaño fluido (`clamp`), etiqueta pequeña en mayúsculas con tracking `.12–.14em`, texto en Inter. Máximo 7 tamaños.
- **Forma:** marcos de foto con proporción fija (4:5, 16:9) y radio 16 px; paneles y cápsulas de vidrio claro (`bg.surface/88`, `blur(24px) saturate(1.4)`, borde 1 px, radio 24 px; receta única en `shared/constants/glass.ts`); botón primario negro redondeado + botón secundario con borde negro; objetivos ≥ 44 px.
- **Composición:** mucho aire (ritmo vertical único 96 px escritorio / 64 px móvil), una acción primaria por pantalla, jerarquía por tamaño y espacio.
- **Movimiento:** solo `transform` y `opacity`; revelado de entrada, paralaje leve, zoom lento y recorte que sube (tomados de `scroll-craft`), un único listener de scroll pasivo; `prefers-reduced-motion` → fundido de 150 ms con todo el contenido visible.
*Tareas:*
1. **Inventario:** listar cada componente y cada pestaña de `/design-system` (Cards editoriales, Navegación y barras, Formularios y botones, Galería y modales, Tablas y fichas, Tokens, v2) con su estado: estándar / a corregir / duplicado / falta.
2. **Estandarizar** (antes de crear): fusionar duplicados (4 componentes de imagen, varias tarjetas y galerías, 4 modales → `AdminDialog`, 6 anchos de página → 3).
3. **Rediseñar** cada componente con el lenguaje de arriba, empezando por: Button, Field/Input/Select, Badge/FilterPill, Tabs, Table, Dialog, Alert, MediaCard/ServiceCard/ProjectCard, galería, Navbar escritorio y móvil, Footer, FloatingActions, hoja de presupuesto.
4. **Nuevos patrones de `scroll-craft`** como componentes reutilizables con prop de movimiento: `PhotoFrame` (marco con proporción fija + paralaje/zoom opcional), `GlassCaption` (leyenda de vidrio), `SectionIntro` (etiqueta + título), `StepSplit` (texto + foto), `MomentBand` (foto a sangre con revelado), `CtaBand` (banda de cierre).
5. **Reglas fijas:** datos de empresa solo desde `companyData`; «antirruido» con doble r; sin imágenes de proveedores; sin degradados de color ni emojis; sin hex, `rgba` ni `px` sueltos ni `colorPalette` en componentes (solo tokens); `dvh` en lugar de `100vh`; máximo 2 propiedades en `transition`.

**[BLOQUE 4 – FLUJO]** Descubrir (Home, Servicios, Proyectos) → decidir (detalle, Simulador) → pedir presupuesto (partidas, resumen, envío, WhatsApp) → seguimiento (Mi cuenta). Interno: Admin. El flujo de trabajo de la IA es: inventario → estandarizar → rediseñar **un componente** → mostrarlo en `/design-system` (antes/después, 360/768/1280, claro/oscuro) → OK del usuario → siguiente.

**[BLOQUE 5 – PANTALLAS Y COMPONENTES]** Todos los de `DESIGN-SYSTEM.md` §5.2 y las 7 pestañas actuales de `/design-system`, más los patrones nuevos del Bloque 3 (tarea 4). Cada componente con `variant` del tema, API documentada (props, variantes, estados) y sin estilos a mano. Las páginas (home, servicios, proyectos…) **solo consumen** los componentes ya aprobados y solo cuando el usuario lo ordene.

**[BLOQUE 6 – ESTADOS, MÉTRICAS Y ENTREGABLES]**
*Estados por componente:* default, hover, focus-visible, active, disabled, loading, error, vacío, éxito; claro y oscuro; `prefers-reduced-motion`; `prefers-reduced-transparency` (vidrio → sólido).
*Métricas de aceptación (medidas, no estimadas):* contraste ≥ 4,5:1; objetivos ≥ 44 px; sin desborde a 360 px; sin errores de consola; auditoría `scripts/audit-design-system.mjs` sin fallos reales nuevos; para cualquier página que use los componentes, `scripts/audit-landing.mjs` (alto de página, espaciados, CTAs, tamaños tipográficos); `typecheck`, `build` y `lint` en verde.
*Entregables por componente (los cuatro, o no está terminado):* (1) showcase actualizado en `/design-system`; (2) `docs/DESIGN-SYSTEM.md` y `docs/BRAND-KIT.md` al día; (3) **artefactos al día:** presentación de marca (`https://claude.ai/artifact/TcovARK5LkDS35RCcTfk5P`) y lienzo de Claude Design (`https://claude.ai/artifact/TxzLaSpgCWxBwXX3V64Edi`), publicados sobre la misma URL con la marca negra, el papel `#F7F6F3` y el componente nuevo; (4) un commit con mensaje `feat(ds): <componente>` en `feat/design-system-v2`.
*Entregables finales:* informe antes/después con métricas, lista de lo no verificado (Lighthouse, `/admin` con sesión) y decisiones pendientes del dueño (horario, teléfono secundario, correo, garantías, logo vectorial, catálogo).
