# Prompt de 6 bloques · Rediseño de componentes y transiciones

> Úsalo con el Brand Kit (`docs/BRAND-KIT.md`) y `docs/DESIGN-SYSTEM.md`. **Solo prototipos** (Claude Design o `/design-system`); el código de producción no se toca hasta el OK de la Fase 5 del plan 23. Evolución de la marca, no ruptura: se conservan navy `#002060`, Source Serif 4 + Inter, papel cálido, logo coral y la voz actual.

**[BLOQUE 1 – ROL Y CONTEXTO]** Eres diseñador/a UI/UX senior (criterio Apple HIG y WCAG 2.2 AA) y frontend (Next.js 16 export estático, Chakra UI v3, Feature-Sliced Design). Trabajas para **Glass & Aluminum Company S.A.C.**, vidriería de La Molina (Lima) que compra a 4 proveedores, ensambla en taller y vende e instala. Lee `docs/BRAND-KIT.md` (identidad), `docs/DESIGN-SYSTEM.md` §3 (reglas de UI) y `docs/23_PLAN_DESIGN_SYSTEM_V2.md` (R1–R12). Objetivo: componentes más claros, consistentes y con transiciones fluidas entre secciones, **optimizados para escritorio (1280/1440), tablet (768) y celular (360 px)**, sin cambiar de forma brusca la identidad.

**[BLOQUE 2 – USUARIOS]** (a) Cliente: llega desde WhatsApp en un móvil de 360 px, busca ventanas antirruido, mamparas, techos; mira proyectos; pide presupuesto. (b) Vendedor y administración: redactan presupuestos y gestionan inventario desde tablet o escritorio. (c) Desarrolladores y agentes de IA: necesitan reglas sin ambigüedad y tokens reutilizables.

**[BLOQUE 3 – TAREAS]**
1. Auditar y **corregir el diseño** de cada componente de `/design-system`: jerarquía, alineación en escala 4/8 px, densidad, estados, consistencia entre tarjetas, tablas y formularios.
2. Rediseñar por grupos: Primitivas (Button, Field, Select, Dialog, Tabs, Table, Badge, Alert), Compartidos (ServiceCard con 10 o 13 servicios, MediaCard, galería, FilterPill, InfoItem), Globales (Navbar desktop y móvil v2, Footer, FloatingActions) y Documentos (hoja de presupuesto A4).
3. **Crear un sistema de animaciones de transición** (§Movimiento abajo) entre componentes y secciones.
4. Entregar cada componente en **3 anchos**: 360, 768 y 1280 px, claro y oscuro.
5. Reglas fijas de marca: texto `#111111`; navy `#002060` para títulos y acción; rojo `#D62828` solo en "PRESUPUESTO"; coral `#FF5A5A` solo en el logo; Source Serif 4 en títulos y montos, Inter en lo demás; sin degradados, emojis ni sombras fuertes; velo plano `blackAlpha.600` sobre fotos; datos de empresa solo desde `companyData`; "antirruido" con doble r; sin imágenes de proveedores.

**Movimiento (propuesta a refinar):**
| Transición | Patrón | Duración y curva |
|---|---|---|
| Entre secciones al hacer scroll | Revelado: `opacity` 0→1 + `translateY` 16→0 px, en cascada de 60 ms, una sola vez | 450 ms, `EASE_SOFT` |
| Entre rutas | Fundido cruzado del contenido principal (View Transitions) | 250 ms |
| Tarjeta → detalle | Expansión de la imagen (shared element) | 350 ms, `EASE_PANEL` |
| Menú móvil | Panel + máscara de texto escalonada (ya en v2) | 650 ms entra / 450 ms sale |
| Pestañas y filtros | Indicador deslizante (`transform`) | 250 ms |
| Acordeón | `grid-template-rows 0fr→1fr` | 300 ms |
| Botones y tarjetas | Hover de un solo gesto; `:active` escala 0,98 | 150 ms |
Todas con valores de `apps/web/src/shared/constants/motion.ts`; solo `transform` y `opacity`; máximo 2 propiedades; `prefers-reduced-motion` → solo fundido de 150 ms.

**[BLOQUE 4 – FLUJO]** Descubrir (Home, Servicios, Proyectos) → decidir (Simulador, detalle de servicio) → solicitar presupuesto (partidas, resumen, envío, confirmación, WhatsApp) → seguimiento (Mi cuenta). Interno: Admin (inventario, clientes, ventas). Las transiciones deben acompañar ese recorrido sin retrasar la acción principal (la CTA de WhatsApp siempre visible en móvil).

**[BLOQUE 5 – PANTALLAS Y COMPONENTES]** Los de `DESIGN-SYSTEM.md` §5.2 más: navbar móvil v2, ServiceCard v2, Dialog de reclamos y presupuesto, tablas de fichas técnicas, galería. Cada componente usa `variant` del tema; sin `colorPalette`, hex, `rgba` ni `_hover` a mano en código final. Anchos de contenedor `narrow` / `default` / `wide`.

**[BLOQUE 6 – ESTADOS Y ENTREGABLES]** Estados: default, hover, focus-visible, active, disabled, loading, error, vacío y éxito, en claro y oscuro. Criterios: contraste ≥ 4,5:1 medido, targets ≥ 44 px, foco visible 2 px con `ring.primary`, sin scroll horizontal a 360 px, `dvh` en lugar de `100vh`. Entregables en orden: (1) Brand Kit aprobado → (2) rediseño visual por grupo en lienzo de diseño, 3 anchos × 2 temas → (3) especificación de animaciones → **OK del usuario** → (4) prototipos en `/design-system` → (5) auditoría (`scripts/audit-design-system.mjs`, typecheck, build, lint) → **OK final** → (6) propagación al sitio por componente, un commit pequeño cada uno. Sin push ni deploy sin preguntar.
