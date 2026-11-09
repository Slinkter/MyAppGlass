# 21 — Plan: flujo "el usuario realiza su presupuesto"

> Fecha: 2026-11-08. Rama: `feat/presupuesto-flujo`. Los **cálculos de precios quedan para el final** (Fase F).
> Material de marca recibido de Claude Desktop: `docs/gya/` (ver su README).

## Decisiones
- Se mejora `/presupuesto` (no se crea `/presupuestos/nuevo`).
- Catálogo ampliado a 6 sistemas: se suman `Acústica` y `PVC abatible` (precios y % antirruido por confirmar). **Provisional:** el dueño decidió (2026-11-08) que los sistemas usen las series de los proveedores y que se agreguen mantenimiento, freno Sevax, espejos y repuestos; el catálogo canónico está en preparación (`docs/PENDIENTES.md`).
- Datos vigentes de AGENTS.md prevalecen sobre el kit (Av. Los Fresnos 1250, WhatsApp 974 278 303).
- `firestore.rules` no se toca: `params` es un `map`, así que el detalle multi-ítem viaja como `{ version: 2, items: [...] }`.

## Estado

| Fase | Contenido | Estado |
|---|---|---|
| A | Kit a `docs/gya/`, logo a `apps/web/public/brand/`, datos reconciliados | Hecha |
| B | Tipos centralizados, 2 sistemas nuevos con `pricePending`, mapeo simulador → sistema, AGENTS.md | Hecha |
| C | `types.ts`, `utils/quoteSummary.ts`, `utils/quoteLines.ts`, `schemas/quote-form-schema.ts` | Hecha |
| D | Varias partidas, validación por campo, resumen en vivo, enviar ≠ imprimir, pantalla de éxito con WhatsApp, QR retirado, preselección desde el simulador | Hecha, salvo "Mis presupuestos" |
| D.5 | Listado "Mis presupuestos" en `/mi-cuenta` (debe leer `params` v1 plano y v2) | Pendiente |
| E | Hoja A4 con marca del kit (membrete v2, pie bancario, insignia antirruido, plazo/garantía como campos, `VERIFICAR` bloquea impresión) | Pendiente |
| F | Precios reales (incluye PVC abatible y Acústica), decidir IGV y precio manual por partida, validar con `docs/gya/data/presupuestos-reales.json`. **Depende de la puerta de catálogo** (`docs/PENDIENTES.md`): la partida deberá admitir cobro por medida, por unidad y por servicio (mantenimiento, freno Sevax, espejos, repuestos), y el costo se compone de materiales del proveedor + taller + instalación + margen | Pendiente (al final) |
| G | Tests: `quote-summary`, `quote-form-schema` escritos (sin ejecutar); falta e2e y fixtures de los 4 casos | Parcial |

## Pendientes conocidos
- `QuoteSheet.tsx` conserva condiciones comerciales fijas (validez 15 días, garantía 2 años/1 año, 5 a 7 días) que contradicen al kit: plazo y garantía dependen del producto y son campos (Fase E).
- La hoja muestra `contactPhone` (996 537 435) además del WhatsApp; confirmar con el dueño cuál es vigente.
- Documentos antiguos de `presupuestos_solicitados` tienen `params` plano (v1).
- Siguen abiertos los riesgos de `contadores`/`presupuestos_solicitados` sin App Check (plan 20, actividad 1.4).
