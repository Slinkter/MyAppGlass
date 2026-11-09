# Estado general del proyecto · 2026-11-09

> Resumen de todo lo que hay, lo que falta y lo que necesita decisión del dueño. Para trabajo abierto detallado, la lista viva sigue siendo `docs/PENDIENTES.md`.

## 1. Qué está hecho

| Área | Estado | Dónde |
|---|---|---|
| Manual de marca v1.0 (borrador de revisión) | Hecho | `docs/marca/MANUAL-DE-MARCA.md` |
| Brand kit y UI kit (HTML de la agencia) | Revisado, no aceptado | `docs/marca/BRAND-KIT.html`, `UI-KIT.html` |
| Respuestas del dueño sobre marca | Integradas | `docs/marca/PREGUNTAS-MARCA.md` (archivo anterior en git) |
| Componentes mejorados en `/design-system` | Hecho, para revisar | `apps/web/src/screens/DesignSystem/` |
| Variantes nuevas del tema (`pill`, `chip*`, `field`, `flat`) | Hecho, solo en `/design-system` | `apps/web/src/shared/providers/theme/index.ts` |
| Patrón B (escenario, tarjeta de vidrio, barra de píldoras) | Hecho, solo en `/design-system` | `screens/DesignSystem/components/PatternB.tsx` |
| Inicio: sin botones en el hero | Hecho | `features/home/components/hero/LandingPageSection.tsx` |
| Inicio: orden hero, beneficios, servicios, proyectos, clientes, ubicación | Hecho | `screens/Home/ui/HomeView.tsx` |
| Inicio: sin título "CALIDAD SUPERIOR" | Hecho | `features/home/components/features/FeaturesSection.tsx` |
| Cabecera de `ItemGridLayout` opcional | Hecho | `shared/components/Layout/ItemGridLayout.tsx` |
| `DESIGN.md` y `PENDIENTES.md` al día | Hecho | `apps/web/DESIGN.md`, `docs/PENDIENTES.md` |
| Agente de revisión UI/UX (definición) | Creado, no ejecutado | `.claude/agents/ui-ux-auditor.md` (ignorado por git) |

## 2. Qué falta

### Del sitio (decisión del dueño antes de tocar)
- **Barra de escritorio real** con 4 enlaces (Inicio, Servicios, Proyectos, Ubicación). Hoy el sitio sigue con 5; el cambio solo existe en `/design-system`.
- **Pasar las variantes nuevas a las recetas reales** y a las páginas, por lotes con aprobación. Cambiar `primary`, `outline` o `ghost` toca unos 83 archivos.
- **Lentitud al hacer scroll** en la página principal. Sin investigar en navegador; sospechas: `blur` en muchos elementos a la vez, listeners de scroll sin `requestAnimationFrame`, imágenes sin dimensiones.
- **Espaciado y animaciones** del inicio. Lo revisará el agente `ui-ux-auditor` cuando esté disponible.

### De marca
- Aprobación de misión, visión, valores y logo horizontal (propuestas en el manual).
- Fotos reales de obras (solo 2 o 3 proyectos completos) y del show room.
- Significado documentado del símbolo del logo.

### De producto y catálogo
- Aprobación del catálogo de servicios (`docs/gya/catalogo/CATALOGO.md`, 10 preguntas en su §6).
- Crear los 3 servicios nuevos (espejos, frenos hidráulicos, mantenimiento) desde el panel de administración.
- Precios reales del presupuesto, que dependen del catálogo.

### Técnico
- Reconectar el navegador (Playwright y la extensión de Chrome) para verificar visualmente.
- `scripts/audit-design-system.mjs` y `scripts/audit-landing.mjs` no se han corrido (falta `npx playwright install`).
- Verificar con `pnpm run build` cuando no haya `pnpm run dev` activo.

## 3. Decisiones del dueño ya tomadas

- Trato de **usted** siempre.
- Nombre completo siempre: "Glass & Aluminum Company S.A.C.".
- Un solo acento: el coral del logo, solo en una palabra destacada de un título, texto grande.
- Zonas de atención: La Molina, Surco, San Borja, San Isidro y Miraflores.
- Garantía de 3 meses en todo lo instalado; precios con IGV.
- Un solo teléfono público: WhatsApp 974 278 303.
- Horario: lunes a sábado, 8:00 a 18:00.
- Orden de trabajo: manual de marca → componentes en `/design-system` → páginas por lotes con aprobación.

## 4. Riesgos

- **Cambios sin revisar visualmente.** Los últimos cambios de diseño se verificaron con `typecheck`, lint y HTTP 200, no en pantalla.
- **Commit `2b01293` mezcla varios temas** (componentes, inicio, documentación). Si algo falla, conviene revertir por partes.
- **Firestore:** las reglas de `presupuestos_solicitados` y `contadores` no están desplegadas (ver `PENDIENTES.md`, seguridad).
- **Secretos expuestos** en una conversación anterior: `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` siguen pendientes de rotación.

## 5. Comandos útiles

```bash
pnpm run typecheck        # validar tipos
pnpm run lint             # lint de apps/web
pnpm run build            # export estático (sin dev activo)
pnpm run deploy:hosting   # solo cuando el dueño lo pida
```

## 6. Dónde mirar

- Trabajo abierto: `docs/PENDIENTES.md`
- Historial: `docs/05_CHANGELOG.md`
- Diseño: `apps/web/DESIGN.md` y `docs/marca/MANUAL-DE-MARCA.md`
- Producto: `apps/web/PRODUCT.md`
