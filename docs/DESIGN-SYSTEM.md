# Design System — Glass & Aluminum Company S.A.C.

> **Única fuente de verdad** de marca, tokens, componentes y UX de toda la empresa (web, presupuesto impreso, documentos). Reemplaza al antiguo `DESIGN-SYSTEM-PLAN.md`, al manual de marca v2 (`docs/gya/manual-de-marca.md`), a `docs/gya/reglas-rapidas-kit.md` y a las reglas de marca de `claude.md`, que se borraron o redujeron el 2026-11-08. Su contenido vigente quedó fusionado aquí; el manual v2 y las reglas del kit no estaban commiteados, y las versiones anteriores de `claude.md` y `DESIGN-SYSTEM-PLAN.md` siguen en git (`git show 1537ee1:claude.md`).
> Una vez aprobado y construido, la página `/design-system` pasa a ser la **referencia viva**; este documento conserva solo las decisiones y el plan.
> **Estado:** Fase 0 hecha (este documento). Fases 1 a 6 pendientes. **Nada de código se toca antes de la puerta 1** (§7).

## 1. Decisiones tomadas

| # | Decisión | Quién |
|---|---|---|
| D1 | La base visual es la **marca v2** aplicada también a la web: Source Serif 4 + Inter, navy `#002060`, fondos cálidos | Usuario, 2026-11-08 |
| D2 | Un solo documento de design system; lo antiguo o duplicado se elimina | Usuario, 2026-11-08 |
| D3 | El usuario aprueba el manual **antes** de tocar código y otra vez al ver `/design-system` terminada | Usuario, 2026-11-08 |
| D4 | Catálogo vigente de **6 sistemas**: Sistema Nova, Serie 25, Serie 35, Serie 62, Acústica, PVC abatible. **Provisional:** el catálogo canónico (D6) lo puede reemplazar | Usuario, 2026-11-08 |
| D6 | Los sistemas usan los nombres y series de los proveedores (Serie 20, 25, 35, 42, 62…), no nombres propios. La lista final sale de lo que el proveedor fabrica y la empresa trabaja. `AGENTS.md` se actualiza solo tras aprobar el catálogo | Usuario, 2026-11-08 |
| D7 | El catálogo (servicios, sistemas, productos) se aprueba **antes** de la puerta 1 de este design system y de los precios reales | Usuario, 2026-11-08 |
| D8 | La oferta son **13 servicios**: los 10 actuales + venta de espejos, frenos hidráulicos y mantenimiento (`docs/gya/catalogo/CATALOGO.md` §1). El proveedor es un dato interno de cada serie, no un nivel visible del catálogo | Usuario, 2026-11-08 |
| D9 | Del material de proveedores se usan solo textos (nombre, título, datos técnicos), **sin sus fotos ni imágenes** | Usuario, 2026-11-08 |
| D5 | Datos de empresa vigentes: Av. Los Fresnos 1250 - La Molina, WhatsApp 974 278 303, acueva@gyacompany.com. Se descartan "Mz H Lt 16" y el 998 225 739 | Usuario, 2026-11-08 |

## 2. Marca

### 2.1 Identidad y voz
- Razón social: **Glass & Aluminum Company S.A.C.** · línea superior "VIDRIERÍA & ALUMINIO" · RUC 20606432870.
- Frase de marca: "Confianza sólida en cada estructura" (alternativa: "Innovación y precisión en cada estructura").
- Tono: profesional, técnico y cercano. Habla de calidad, seguridad, durabilidad y acabado elegante. Estilo limpio, minimalista y cálido.
- Mensajes de valor: visita técnica sin costo · presupuesto rápido por WhatsApp · garantía en productos instalados · boleta o factura electrónica · técnicos capacitados.
- Ortografía: "antirruido" (doble r), "vidrio y aluminio" (singular), "laminado", "dormitorio", "abatible", "sala".
- **Modelo de negocio.** La empresa **compra** vidrio, aluminio y accesorios a 4 proveedores (Corporación Corrales, HPD Glass, Eduhg, Favitem), **ensambla en su taller** y **vende e instala** en casa del cliente. Trabaja a veces con el sistema de un proveedor y a veces con el de otro, y sus series casi coinciden (Serie 20, 25, 35, 42, 62…). No fabrica perfiles ni vidrio.
- **13 servicios (D8):** los 10 de la tabla siguiente, que se cotizan por medida, más 3 que **aún no existen en el sitio**: venta de espejos (belga y otra calidad de 4 mm), frenos hidráulicos de marca Sevax con instalación, y mantenimiento de productos instalados. Detalle en `docs/gya/catalogo/CATALOGO.md`.
- **Los 10 servicios actuales del sitio.** La fuente de verdad es Firestore (`/servicios/[serviceSlug]`); los títulos SEO de respaldo están en `apps/web/src/features/services/hooks/serviceMappers.ts` (`SERVICE_SEO_FALLBACKS`). No se crean catálogos locales.

  | Slug | Servicio |
  |---|---|
  | `ventana` | Ventanas antirruido |
  | `mampara` | Mamparas de vidrio templado y aluminio |
  | `ducha` | Boxes y puertas de ducha en vidrio templado |
  | `parapeto` | Parapetos de vidrio y muros cortina de aluminio |
  | `baranda` | Barandas de vidrio y acero inoxidable |
  | `balcones` | Cerramientos de balcones en vidrio y aluminio |
  | `techo` | Techos de policarbonato y vidrio laminado |
  | `pvidrio` | Puertas de vidrio templado a medida |
  | `pserie` | Puertas de aluminio Serie 25, 35 y 62 |
  | `celosias` | Celosías de vidrio y aluminio para ventilación |

  Los 3 servicios nuevos se crean en Firestore (no en código) tras aprobar el catálogo; el design system los incluye en las tarjetas de servicio, que deben funcionar igual con 10 o 13. Siguen por confirmar *carpintería de aluminio*, que menciona el kit, y los *repuestos*.

### 2.2 Color (tokens de marca)
Donde la v1 (`claude.md`) y la v2 diferían, **manda la v2** (D1).

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#111111` | Todo el texto |
| `ink-soft` | `#4A4A4A` | Etiquetas y texto secundario (la v1 decía `#5A5A5A`) |
| `brand-navy` | `#002060` | Nombre de la empresa, títulos de sección, franjas de llamada a la acción, pie bancario |
| `brand-red` | `#D62828` | **Solo** la palabra "PRESUPUESTO". Nunca en el flyer ni en la web (la v1 permitía "títulos clave") |
| `logo-coral` | `#FF5A5A` | Solo el logo; no se usa en texto |
| `tint-navy` | `#F3F5F9` | Fondos de bloques destacados (grupos, totales) |
| `paper-warm` | `#F7F6F3` | Fondos cálidos y tarjetas de datos clave (la v1 decía `#FBF8F3`) |
| `line` | `#E6E3DE` | Separadores (la v1 decía `#E2E0DC`) |
| `line-strong` | `#D9D6D0` | Bordes de tarjetas |

El logo de la empresa (`apps/web/public/brand/logo.png`) y el de BBVA no se modifican, recolorean ni deforman. Un solo rojo por página.

### 2.3 Tipografía
- **Source Serif 4** 700: títulos, nombre de empresa y montos.
- **Inter** 400/500/600/700: texto, tablas, etiquetas e interfaz.
- Carga con `next/font/google`. Montos con cifras tabulares. En impresión: cuerpo ≥ 10 pt, notas ≥ 9 pt.

### 2.4 Reglas generales
Sin degradados, sin emojis, sin sombras fuertes. Contraste ≥ 4.5:1. Legible en blanco y negro. Mobile-first (los clientes llegan desde WhatsApp).

### 2.5 Datos de empresa
Se leen **siempre** de `companyData` (`@gya/shared`, reexportado en `@/shared/config/company-data`); ningún componente los escribe a mano. `docs/gya/data/company.json` es solo referencia del kit.
- Banco: BBVA, soles `0011-0106-0100041622`, CCI `011-106-000100041622-20` (ya en `apps/web/src/shared/data/bank-accounts.ts`).
- Pago: 50 % de anticipo a la firma y 50 % a la entrega; tarjeta +5 % sobre el total; depósitos y transferencias sin comisión; días hábiles de lunes a viernes, sin feriados.
- **Plazo y garantía dependen del producto**: siempre son campos, nunca texto fijo (ventanas 6 meses, techos 3 meses en los casos reales).
- **Por verificar con el dueño** (no publicar): horario (lun–sáb 9:00–17:00 vs 8:00–18:00), garantía por producto, IGV (incluido o no) en cada tipo de presupuesto.

### 2.6 Catálogo de producto (también en `AGENTS.md`)
Sistemas: Sistema Nova, Serie 25, Serie 35, Serie 62, **Acústica** y **PVC abatible** (los dos últimos desde 2026-11-08; precio y % antirruido por confirmar). Tipos de ventana: Corrediza, Proyectante, Batiente, Luz Fija. Vidrio: Crudo, Laminado, Templado (sin grosor en los nombres). Color de vidrio: Incoloro, Bronce, Gris. Color de aluminio: Negro, Mate, Blanco, Madera, Champagne. Adicionales: Arenado, Diseño según cliente.
Reducción de ruido de referencia: Serie 25 = 50 %, Serie 62 = 70 %, Acústica = 80 %, PVC abatible = 80 %.

### 2.7 Documentos (presupuesto impreso)
Componentes fijos, módulos variables y 6 conceptos de hoja están en `docs/gya/conceptos-presupuesto.md`; los casos reales en `docs/gya/data/presupuestos-reales.json`.
- **Fijos:** membrete (VIDRIERÍA & ALUMINIO · nombre en navy serif · "PRESUPUESTO" en rojo serif · dirección, teléfonos, web · logo con RUC · línea negra de 2 px), pie bancario, forma y medios de pago, días hábiles, firmas (Cliente · Juan Carlos Cueva Carrasco, Gerente General), insignia antirruido (píldora con borde navy, 5 segmentos, relleno = `round(%/20)` y el %).
- **Módulos:** cliente persona o empresa, lista agrupada por sistema, opciones A/B, totales con descuento e IGV, dibujo técnico (F = paño fijo, → ← = corredizo, unidad mm siempre visible), fotos de referencia, plazo y garantía, condiciones extendidas.
- A4 vertical, márgenes ≥ 12 mm, una hoja de resumen. Jerarquía: membrete → cliente → productos → TOTAL → plazo/garantía → pago → condiciones → firmas → pie.

## 3. Reglas de UI (antes en `AGENTS.md` §4)

- **Chakra UI v3** con tokens nativos (`space.1` a `space.16`, `borderRadius="xl"`, `fontSize="xs"`). Sin hex, `rgba` ni `px` sueltos.
- **Iconos Lucide en flexbox:** `style={{ flexShrink: 0 }}` (la prop directa da error de tipos).
- **Botones:** `Button` de `@/components/ui/button` con `variant` del tema (hoy `aura`, `outline`, `ghost`, `whatsapp`, `brand`). Sin `colorPalette` ni `bg`/`_hover` armados a mano.
- **Transiciones:** máximo 2 propiedades CSS (`transition="all 0.2s ease"`, `transform="translateZ(0)"`) y respeto de `prefers-reduced-motion`.
- **Responsive mobile-first:** Card `p={{ base: "4", md: "6" }}`; sub-paneles `p={{ base: "3", md: "5" }}`; targets táctiles ≥ 44 px (`minH`/`minW="11"`); grids `{ base: 1, sm: 2, lg: 3 }`; tablas con `minW` y `overflowX="auto"`; chips con scroll horizontal (`flexShrink={0}`, `whiteSpace="nowrap"`); sin texto de 10 px ni `100vh` (usar `dvh`).
- **Tarjetas con foto:** `useImageReveal` + `ImageRevealSkeleton` (`@/shared/components/Image/ImageReveal`); precargar portadas con `useImagePrefetch`; sin `delay` de montaje en `ItemGridLayout.Item`. Referencia: `ServiceCard`.
- **Estados** de todo componente: default, hover, focus-visible, active, disabled, loading, error, vacío, éxito; en claro y oscuro.

## 4. Estado actual frente al objetivo (auditoría 2026-11-08)

La web **no sigue ningún manual**: usa Lora y una escala zinc en blanco y negro. Rutas relativas a `apps/web/src`.

### 4.1 P0 — contradicen la marca
| Hallazgo | Dónde |
|---|---|
| Lora en lugar de Source Serif 4 + Inter | `app/layout.tsx:3,17`, `shared/providers/theme/index.ts:228-229`, `screens/DesignSystem/sections/TokensSection.tsx:44-46` |
| Rojo del tema `#FF5A5F` (no es `#FF5A5A` ni `#D62828`) | `theme/index.ts:260`, `ComponentErrorBoundary.tsx:78`, `FeatureCard`, `DeclarationSection.tsx:63`, `LogoIcon.tsx:22` |
| Degradados | `features/services/components/ServiceBentoGrid.tsx:24`, `features/home/components/features/FeatureCard.tsx:20-21`, radiales en `app/contacto/ContactPageClient.tsx:33,45` y `LandingPageSection.tsx:53,65` |
| Emojis en la UI | `screens/Admin/AdminHubScreen.tsx:170,183,196` |
| Datos de empresa escritos a mano | `app/contacto/page.tsx:9,16,17`, `shared/utils/seo-schemas.ts:90`, `shared/components/map/mapConfig.ts:17`, `shared/data/bank-accounts.ts:33`, `DataDisplayShowcase.tsx:105` |
| Contenido que rompe el catálogo | `FormControlsShowcase.tsx:175` ("Sistema Antirruido" como título) |

### 4.2 P1 — falta sistema
- 78 `#hex` y 77 `rgba` fuera del tema (`map/mapStyles.ts` 18, `PrintOrderModal.tsx` 16, `QuoteSheet.tsx` 7, `AdminHubScreen.tsx`, `ClientCard.tsx:78`, `app/manifest.ts:13-14`).
- `colorPalette` suelto en ~55 sitios (gray 21, blue 10, green 8, purple 6, cyan 3…), sobre todo en admin y vistas legales.
- 52 `_hover={{` a mano (`AuraSurface.tsx:38-41`, `Gallery.tsx:218`, `MediaCard.tsx:38`, `InfoItem.tsx:37`).
- `status.*` fijo, sin versión clara/oscura; conviven con `colorPalette="green"`.
- Botón: `sm`/`md` bajo 44 px, `uppercase` por defecto, 16 usos `xs`/`sm` sin `minH`.
- Cuatro modales hechos a mano con `position="fixed"` (`PrintOrderModal`, `NewClientModal`, `CreateProductModal`, `ReplenishStockModal`); el resto usa `Dialog`.
- Sin recetas propias para Badge, Dialog, Tabs, Table y Alert; sin token `mono` aunque se usa en ~12 sitios.
- `vh` sueltos (`app/error.tsx:22`, `AdminRouteGuard.tsx:19`, `ErrorView.tsx:11`, `MobileNav.tsx:127`); texto en px (`ProjectServiceSelect.tsx:25`, `ChatAssistant.tsx:80`, `OrdersList.tsx:122`); `CloseButton` con `aria-label='Close'`.

### 4.3 P2 — duplicación
- Cuatro componentes de imagen para lo mismo: `FadingImage`, `ImageWithFallback`, `ResponsiveImage`, `ImageReveal`.
- Varias tarjetas y galerías (`MediaCard`, `ClientCard`, `BlogCard`, `SheetStoreCard`, `Gallery`).
- Seis anchos de página (`4xl`, `6xl`, `7xl`, `1200px`, `1280px`, `1350px`) y `AuraContainer`/`AuraHeader` casi sin uso.
- `AuraSurface` con `variant="solid"` sin efecto y 3 propiedades en la transición.

### 4.4 Página `/design-system`
Siete pestañas (nuevos modelos, cards, nav, forms, overlays, data, tokens). Documenta Lora; faltan radios, sombras, `overlay.*`, estados, modo claro/oscuro comparado, iconografía, motion, accesibilidad y patrones de página; no enlaza `/design-system-ubicacion`; usa Badges `cyan`/`teal`/`purple`.

### 4.5 Ya resuelto del plan anterior
`Toaster` montado (`app/Providers.tsx`), variantes `whatsapp` y `brand` del botón, alias heredados (`border.glass`, `text.primary`, `bg.canvas`, `surface.muted`, `bg.glass`) sin uso. Queda `border.slate` (definido en `theme:323`, un uso en `ProjectServiceSelect.tsx`).

## 5. Tokens y componentes objetivo

### 5.1 Tokens (propuesta, se confirma en la puerta 1)
| Familia | Objetivo |
|---|---|
| Color | Tokens de marca de §2.2 como base; semánticos `text.{body,muted,heading}`, `bg.{page,section,surface,subtle}`, `border.{default,subtle,strong}`, `brand.primary` (navy) |
| Estado | `status.{info,success,warning,danger}` con `_light`/`_dark` y variantes `Soft`/`Border`; reemplazan los `colorPalette` de estado |
| Overlay | `overlay.{subtle,faint,dim,scrim}` únicos para modales y scrims (reemplazan los `rgba` sueltos) |
| Tipografía | `fonts.heading` = Source Serif 4, `fonts.body` = Inter, `fonts.mono` definido; tamaños `xs` a `6xl` documentados con su valor real |
| Forma | Radios `card` y `modal`; sombras con nombre solo para elevación suave; sin sombras fuertes |
| Motion | Duraciones y curvas únicas, `prefers-reduced-motion` respetado |
| Layout | `PageShell` con tres anchos (`narrow`, `default`, `wide`) y header de página común |

### 5.2 Componentes
| Grupo | Componentes | Acción |
|---|---|---|
| Primitivas (`components/ui`) | Button, Field, NativeSelect, Checkbox, Alert, Dialog, Drawer, Tooltip, Toaster, EmptyState, DataList, Skeleton, FileUpload, ScrollArea, CloseButton | Recetas propias para Badge, Dialog, Tabs, Table y Alert; botón con `minH` por tamaño; textos en español |
| Compartidos | `AuraHeader`/`PageShell`, `ServiceCard` (debe funcionar igual con 10 o 13 servicios, grids `{ base: 1, sm: 2, lg: 3 }`), `MediaCard`, galería, `FilterPill`, `InfoItem`, `CopyButton`, `BackButton`, `SkipLink`, `ComponentErrorBoundary`, `MathCaptchaField` | Documentar todos; una sola API de imagen; un solo modal |
| Globales | Navbar, Footer, FloatingActions, AdminNav, CartDrawer | Alinear a tokens y documentar |
| Documentos | Hoja de presupuesto (`screens/Presupuesto/presupuesto/QuoteSheet.tsx`), `PrintOrderModal` | Pasar a tokens de marca (navy, serif, membrete) |

### 5.3 Decisiones abiertas para la puerta 1
1. **Botón primario:** hoy negro/blanco (`aura`). ¿Pasa a navy? ¿Se mantiene `uppercase` y `borderRadius: full`?
2. **Modo oscuro:** la v2 no lo define y la web lo tiene. ¿Se conserva (con navy aclarado y fondos oscuros) o se retira?
3. **`variant="brand"` y el rojo del tema:** ¿se elimina (el rojo queda solo para "PRESUPUESTO") o se redefine?
4. **Scrims oscuros sobre fotos** (`MediaCard`, `BlogCard`, `GalleryViewer`, `ClientCard`, `FloatingPanel`): el manual prohíbe degradados; ¿se permite un velo plano con `overlay.*`?
5. **Anchos de página:** ¿`narrow`, `default` y `wide`, con qué valores?
6. **Fondo de página:** ¿`paper-warm` (`#F7F6F3`) o blanco con tarjetas cálidas?

## 6. Equipo multidisciplinario

Agentes existentes en `.claude/agents` más la skill `apple-design`. No se lanzan más de tres en paralelo.

| Rol | Quién | Entregable |
|---|---|---|
| Líder UX/UI senior | agente principal con `apple-design` | Informe de auditoría y manual aprobado |
| Marca y contenido | `Explore` (solo lectura) | Inventario de textos, logos, datos de empresa, ortografía y catálogo |
| Tokens y tema | `ui-componente-senior` | Propuesta de tokens y tema |
| Componentes UI | `ui-componente-senior` | API, variantes y estados de cada componente |
| Responsive y accesibilidad | `ui-componente-ligero` | Auditoría táctil ≥ 44 px, contraste, foco, movimiento reducido |
| Documentos | agente principal | Alineación de la hoja de presupuesto con la marca |

## 7. Plan por fases

| Fase | Contenido | Código |
|---|---|---|
| 0 | Este documento; fusión y borrado de lo duplicado | No |
| **Catálogo** | **Antes de la fase 1.** Catálogo canónico de servicios, sistemas y productos a partir de los 4 proveedores (fases C0 a C4 en `docs/PENDIENTES.md`). El usuario lo aprueba en la **puerta de catálogo**; luego se modela y se vuelve a este plan | No |
| 1 | Diagnóstico: medir contraste real de la paleta, revisar con `apple-design` las pantallas (Home, Servicios, Proyectos, Presupuesto, Simulador, Contacto, Reclamos, Admin, Tienda) y completar §4 | No |
| 2 | Cerrar las decisiones de §5.3, completar la especificación de §5 y presentarla | No |
| **Puerta 1** | **El usuario aprueba el manual y las decisiones. No se toca código antes.** | |
| 3 | Tema y tokens: `next/font` con Source Serif 4 e Inter, paleta navy, `status.*` claro/oscuro, `overlay.*`, recetas de Badge, Dialog, Tabs, Table, Alert; botón con `minH` por tamaño; quitar `border.slate` y el rojo `#FF5A5F`; evaluar dividir `theme/index.ts` (351 líneas) | Sí |
| 4 | Componentes: una sola API de imagen, `PageShell`, un solo modal (los 4 manuales pasan a `Dialog` con `FormModalShell`), Badge del tema, estados de carga, vacío y error | Sí |
| 5 | Migrar pantallas por lotes (público → formularios → admin y tienda); limpiar P0; hoja de presupuesto y `PrintOrderModal` a tokens | Sí |
| 6 | Reconstruir `/design-system` (las tarjetas de servicio se muestran con los 13 servicios del catálogo aprobado): principios, color (claro/oscuro), tipografía, espaciado, radios y sombras, iconografía, motion, componentes con matriz de estados, patrones de página, accesibilidad, marca. Enlazar `/design-system-ubicacion` | Sí |
| **Puerta 2** | **El usuario aprueba `/design-system` con `pnpm run dev` antes de cerrar.** | |

## 8. Prompt en 6 bloques (para cada agente del equipo)

**[BLOQUE 1 – ROL Y CONTEXTO]** Eres diseñador/a UI/UX senior con criterio de Apple HIG (skill `apple-design`) y desarrollador/a frontend (Next.js 16 export estático, Chakra UI v3, Feature-Sliced Design). Trabajas para Glass & Aluminum Company S.A.C. (vidriería en La Molina, Lima). Lee `AGENTS.md` y `docs/DESIGN-SYSTEM.md`. Objetivo: un único design system, con la marca v2 como base, que la web, el presupuesto impreso y `/design-system` compartan.

**[BLOQUE 2 – USUARIOS]** (a) Cliente del sitio: busca ventanas, mamparas y techos, ve proyectos, solicita un presupuesto, casi siempre desde el móvil. (b) Vendedor y administración: redactan y revisan presupuestos y gestionan inventario. (c) Equipo de desarrollo y agentes de IA: necesitan reglas sin ambigüedad.

**[BLOQUE 3 – TAREAS]** Auditar tokens y componentes; cerrar las decisiones abiertas de §5.3; definir el tema (color, tipografía, radios, sombras, motion) y las recetas; especificar cada componente (API, variantes, estados); reconstruir `/design-system`. Reglas fijas: texto `#111111`; navy `#002060` para nombre de empresa, títulos y acentos; rojo `#D62828` solo en la palabra PRESUPUESTO; coral `#FF5A5A` solo en el logo; Source Serif 4 (títulos y montos) + Inter (texto); sin degradados, emojis ni sombras fuertes; contraste ≥ 4.5:1; datos de empresa solo desde `companyData`; catálogo de 6 sistemas; "antirruido" con doble r.

**[BLOQUE 4 – FLUJO]** Descubrir (Home, Servicios, Proyectos) → decidir (Simulador, detalle) → solicitar presupuesto (partidas, resumen, envío, confirmación, WhatsApp) → seguimiento (Mi cuenta). Interno: Admin (inventario, clientes, ventas, reportes). Cada pantalla usa `PageShell` con tres anchos y un header de página común.

**[BLOQUE 5 – PANTALLAS Y COMPONENTES]** Los de §5.2, todos con `variant` del tema; sin `colorPalette`, sin hex ni `rgba` sueltos, sin `_hover` a mano.

**[BLOQUE 6 – ESTADOS Y ENTREGABLES]** Estados de §3, en claro y oscuro, con `prefers-reduced-motion`, táctil ≥ 44 px y foco visible. Entregables en orden: informe de auditoría → especificación → **espera el OK del usuario (puerta 1)** → tema → componentes → pantallas → `/design-system` → **OK final (puerta 2)**. Rama `feat/design-system`; `typecheck`, `build` y `lint` sin errores; sin push ni deploy sin preguntar.

## 9. Restricciones y verificación

- Cero cambios de código en las Fases 0 a 2.
- No tocar `apps/functions/`, `firestore.rules` ni `firebase.json`.
- El cambio de tipografía y paleta afecta a **todo el sitio**: validar con `pnpm run typecheck && pnpm run build`, y revisar en `pnpm run dev` (claro y oscuro, móvil y escritorio) antes de cada puerta. No ejecutar `test:run` salvo pedido.
- Rama propia `feat/design-system`; no mezclar con el trabajo de presupuesto sin commitear.
- Verificación final: `pnpm run lint`; `grep` sin `colorPalette` en botones, sin hex ni `rgba` fuera del tema, sin `100vh`, sin degradados ni emojis; cada componente real aparece en `/design-system` con su matriz de estados.

## 10. Material relacionado (no es design system)
`docs/gya/conceptos-presupuesto.md`, `docs/gya/data/` (datos de la empresa y 4 casos reales), `docs/gya/prompts/` (prompts 01 a 04 del kit), `docs/gya/fotos-referencia/`, `docs/21_PLAN_FLUJO_PRESUPUESTO.md`.
