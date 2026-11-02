# PLAN-DISENO — Nuevos modelos de diseño (Design System y Ubicación)

> Documento vivo. Se actualiza al cerrar cada fase. Si la sesión se corta, retomar desde la primera fase sin `[x]`.
> Última actualización: 2026-11-02 · Orquestador: Claude (Sonnet 5.5)

## Objetivo

Presentar **nuevos modelos para comparar**, sin modificar los que ya existen:

- `/design-system-ubicacion`: se mantienen los prototipos A, B, C y D tal cual; se **agregan** E y F.
- `/design-system`: se mantienen las 6 pestañas actuales y sus secciones; se **agrega** una pestaña de variantes nuevas.
- Aplicar la skill `apple-design` (`.claude/skills/apple-design/references/hig/`) y las mejores prácticas de diseño.
- Responsive real en **móvil, tablet y escritorio** (mobile-first): espacios, alineaciones y tamaños.

## Reglas para todos los agentes

1. **No editar archivos existentes** de prototipos ni de secciones. Solo crear archivos nuevos en su carpeta asignada. El orquestador registra las pestañas.
2. Reglas del repo (`AGENTS.md`): español, Chakra UI v3 con tokens (`space.*`, `borderRadius="xl"`), `Button` de `@/components/ui/button` con `variant` del tema (`aura`, `outline`, `ghost`, `whatsapp`, `brand`), sin `colorPalette` en botones, iconos Lucide con `style={{ flexShrink: 0 }}`, transiciones de máx. 2 propiedades, sin `console.log` (usar `@/shared/utils/logger`), sin `100vh` (usar `dvh`), sin texto de 10 px.
3. Responsive: objetivos táctiles ≥ 44 px (`minH="11"`), grids `{ base: 1, sm: 2, lg: 3 }`, card `p={{ base: "4", md: "6" }}`, tablas con `minW` y `overflowX="auto"`.
4. Vidrio (Liquid Glass) solo en controles flotantes, nunca sobre contenido; con fallback `prefers-reduced-transparency` / `prefers-contrast: more`; respetar `prefers-reduced-motion`.
5. Citar la referencia de la skill cuando justifiquen una decisión (ej. `buttons.md › Style`). Cargar ~8-12 archivos, no todo.
6. Catálogo de negocio inmutable: sistemas `Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`; "antirruido", "vidrio y aluminio".
7. No ejecutar `pnpm run test:run` ni `pnpm run build`. Sí `pnpm run typecheck` al final y corregir solo errores de sus propios archivos.

## Agentes

Definidos en `.claude/agents/`:

| Agente | Modelo | Uso |
|---|---|---|
| `ui-componente-senior` | Sonnet | Prototipos completos, interacción, responsive complejo |
| `ui-componente-ligero` | Haiku | Showcases simples, composición de componentes existentes, auditorías |

## Fases

Cada fase termina con: `pnpm run typecheck` → commit propio → este checklist actualizado.

### Fase 0 — Línea base
- [x] Instalar skill `apple-design` y registrar en `SKILLS.md` / `skills-lock.json`
- [x] Correcciones previas: `minH="11"` en pestañas, `100dvh`, fallback de vidrio en estado vacío del prototipo B
- [x] Crear este plan y los agentes (`.claude/` está en `.gitignore`: los agentes y la skill instalada no se versionan; la skill se restaura con `npx skills add dickwu/apple-design-skill -a claude-code`)
- [x] Commit de la fase 0

### Fase 1 — Ubicación · Prototipo E "Hoja inferior" (agente senior)
Mapa a pantalla completa; en móvil una hoja inferior con 3 posiciones (mínima, media, completa) y lista de obras; en tablet/escritorio panel lateral. Carpeta: `prototypes/sheet/` + `PrototypeSheet.tsx`.
- [x] Implementar (agente senior; panel opaco sin vidrio; pendiente probar en navegador: arrastre y foco con Tab en posición mínima)
- [x] Registrar pestaña E en `DesignSystemUbicacionScreen.tsx`
- [x] Typecheck + commit

### Fase 2 — Ubicación · Prototipo F "Línea de tiempo por año" (agente senior)
Obras agrupadas por año con encabezados fijos, mapa que acompaña la selección; móvil: mapa plegable. Carpeta: `prototypes/timeline/` + `PrototypeTimeline.tsx`.
- [ ] Implementar
- [ ] Registrar pestaña F
- [ ] Typecheck + commit

### Fase 3 — Design System · Pestaña "Nuevos modelos" (agentes ligeros)
Secciones nuevas en `sections/v2/`: escala de espaciado y breakpoints (móvil/tablet/escritorio) y variantes de tarjeta (compacta, horizontal, destacada). Sin tocar `EditorialCardsShowcase` ni las demás.
- [x] `ResponsiveScaleShowcase` (agente ligero)
- [x] `CardVariantsShowcase` (agente ligero; foco cambiado a `primary.500`)
- [x] Registrar pestaña "Nuevos modelos ★" en `DesignSystemScreen.tsx`
- [x] Typecheck + commit

### Fase 4 — Revisión responsive y pulido
Auditoría (agente ligero) de los archivos nuevos contra la lista de reglas; el orquestador aplica correcciones.
- [ ] Auditoría móvil / tablet / escritorio
- [ ] Correcciones
- [ ] Typecheck + commit

### Fase 5 — Cierre
- [ ] `pnpm run typecheck && pnpm run build`
- [ ] Actualizar `SKILLS.md` y este plan
- [ ] Commit final

## Pendiente fuera de alcance
Cambios de la sesión anterior sin commitear en `LocationMap.tsx`, `FloatingPanel.tsx`, `ProjectCarousel.tsx` (trabajo en curso del usuario) y `apps/web/next-env.d.ts`: no se incluyen en los commits de este plan.

## Registro de decisiones
- 2026-11-02: los modelos nuevos se agregan como pestañas; los A-D y las 6 pestañas actuales no se modifican.
