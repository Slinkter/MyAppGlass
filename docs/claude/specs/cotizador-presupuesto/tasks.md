# Tareas: Cotizador de presupuesto (Ventana · Nova)

> Fuente: plan por fases aprobado por el dueño el 2026-11-11. Requisitos en `spec.md` §5.
> Una tarea = máximo un archivo principal. Orden fijo por fase. `[ ]` pendiente · `[x]` hecha.
> Agente y modelo: tal como figuran en el plan. Haiku para lo sencillo, Sonnet para lo complejo.
> Verificación: `pnpm run typecheck && pnpm run lint` en cada fase; build desde la Fase 4.
> Motor: `pnpm --filter @gya/web exec vitest run tests/unit/window-rules.test.ts tests/unit/quote-form-schema.test.ts`.
> Regla de parada: si una verificación falla 2 veces seguidas, el agente se detiene y reporta.
> Sin deploy ni push en ninguna fase. Todo se prueba en emuladores.

## Ya hecho

- [x] Constantes `WINDOW_PRICING` en `apps/web/src/entities/quote/config/pricing.ts`.
- [x] Motor en `apps/web/src/entities/quote/lib/windowRules.ts`: `validateWindow`, `computeSashes`, `splitBodies`, `priceWindow`, `quoteTotals`.
- [x] Pruebas del motor en `apps/web/tests/unit/window-rules.test.ts` (commit `9cae5c75`).

Nota: el motor reemplaza el plan anterior de `scripts/verificar-cotizador.mjs`. Ese script no existe y no se creará.

## Fase 0. Preparación (documentos y agentes)

- [x] **0.1** Poner al día `tasks.md` y `plan.md` del cotizador. Archivo principal: `docs/claude/specs/cotizador-presupuesto/tasks.md`. Agente: `general-purpose`. Modelo: Haiku. *Cubre:* seguimiento.
- [x] **0.2** Limpiar `docs/PENDIENTES.md`: quitar lo ya hecho y añadir "pedido de compra desde el dashboard" (spec §11, pregunta 9). Agente: `general-purpose`. Modelo: Haiku. *Cubre:* §3 (fuera de alcance).
- [x] **0.3** Entradas en `docs/05_CHANGELOG.md` para `1d0687a8`, `78e1ed87` y `9cae5c75`, a partir de `git show --stat`. Agente: `general-purpose`. Modelo: Haiku. *Cubre:* §9 (cierre).
- [x] **0.4** Crear `.claude/agents/copy-vidrieria.md`: redactor del rubro vidrio y aluminio (trato de usted, ortografía "antirruido", sin proveedores, sin datos inventados). Fuentes: manual de marca y `PRODUCT.md`. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RNF3.
- [x] **0.5** Crear `.claude/agents/observador.md`: informe de cierre de fase (tareas, diff, métricas) y entrada de changelog. Agente: `general-purpose`. Modelo: Haiku. *Cubre:* §9.

Gate: el coordinador lee los 5 diffs. Solo documentos y definiciones de agentes.

## Fase 1. Alinear el motor con las respuestas del dueño

- [x] **1.1** `apps/web/src/entities/quote/config/pricing.ts`: `heightMaxM: 2.4`; quitar "por confirmar" donde ya hay respuesta. Agente: `general-purpose`. Modelo: Haiku. *Cubre:* RF5, RNF6.
- [x] **1.2** `apps/web/tests/unit/window-rules.test.ts`: alto mayor de 2,40 m pide visita técnica; conservar los datos de spec §8. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF5, RF10a, RNF5.
- [x] **1.3** `apps/web/src/features/presupuesto/schemas/quote-form-schema.ts` y su prueba: esquema `quickCustomerSchema` (nombre, celular de 9 dígitos que empieza en 9, aceptación). No tocar `customerSchema`. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF22, RF23.
- [x] **1.4** Typecheck, lint y las 2 pruebas del cotizador. Sin archivo principal (gate). Agente: `qa-gates`. Modelo: Haiku. *Cubre:* RNF5.

## Fase 2. Entrada desde el servicio

- [x] **2.1** `apps/web/src/features/services/components/ServicePageLayout.tsx`: CTA "Cotizar {sistema}" hacia `/presupuesto?categoria=ventana&sistema=ventana_nova`. Agente: `general-purpose`. Modelo: Haiku. *Cubre:* RF1, HU1.
- [x] **2.2** `apps/web/src/screens/Presupuesto/PresupuestoWizardScreen.tsx`: leer `categoria` y `sistema` con `parseSystemParam` (`apps/web/src/entities/quote/lib/quoteLines.ts`). Hecho como `parseQuoteEntry` en `entities/quote/lib/quoteEntry.ts`; la pantalla lo usa en 4.2. Agente: `general-purpose`. Modelo: Sonnet (2.1 y 2.2 juntas: la tarea resultó mayor de lo previsto). *Cubre:* RF1.

## Fase 3. Componentes del cotizador (primero en `/design-system`)

Carpeta: `apps/web/src/features/presupuesto/components/` (bajados de `screens` a `features` para que `/design-system` y `/presupuesto` puedan importarlos sin romper FSD). En serie: 3.1 → 3.2 → 3.3 → 3.4.

- [x] **3.1** Textos de todo el flujo (opciones, etiquetas, errores, aviso de flete, beneficio por efectivo o QR en soles, avisos legales) en un archivo de textos. Archivo principal: archivo de textos dentro de `presupuesto/` (nombre a definir por el agente). Agente: `copy-vidrieria`. Modelo: Sonnet. *Cubre:* RF3, RF14, RF16, RF22, RF26; spec §11, preguntas 3, 8, 11 y 12.
- [x] **3.2** `OptionChooser.tsx`: "Visita técnica gratuita" y "Crear presupuesto". Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF2, RF3.
- [x] **3.3** `WindowForm.tsx`: medidas con coma o punto, vidrio, perfil, acabado, hojas con `computeSashes`, errores con `validateWindow`, precio con `priceWindow`. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF4–RF13.
- [x] **3.4** `QuoteCart.tsx`: líneas, editar, quitar, totales con `quoteTotals`, flete, precio de lista y pago en efectivo o QR. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF14–RF20.
- [x] **3.5** Mostrar los 3 componentes en `/design-system`. Archivo principal: `apps/web/src/screens/DesignSystem/`. Agente: `curador-design-system`. Modelo: Sonnet. *Cubre:* RNF2.
- [x] **3.6** Revisión de solo lectura, en paralelo: MD3 y tokens (`auditor-md3`), 360 px (`espaciado-360`), nombres y duplicados (`auditor-naming-dry`). Sin archivo principal (solo informe). Agente: los tres. Modelo: Haiku. *Cubre:* RNF1, RNF2, RNF3, RNF12.
- [x] **3.7** Corregir los hallazgos de 3.6. Archivo principal: el que tenga cada hallazgo. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RNF1, RNF2, RNF12.

Gate: `qa-gates` (Haiku). El dueño ve los componentes en `/design-system` antes de la Fase 4.

## Fase 4. Integración en `/presupuesto`

- [x] **4.1** Hook del carrito (ruta propuesta: `apps/web/src/features/presupuesto/hooks/useQuoteCart.ts`): estado y `localStorage` envuelto en try/catch, con su prueba unitaria. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF21, RNF9.
- [x] **4.2** `apps/web/src/screens/Presupuesto/PresupuestoWizardScreen.tsx`: pasos, sin `LoginRequired` para este flujo, autocompletar si hay sesión. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF1, RF18, RF19, HU9.
- [x] **4.3** "Limpiar presupuesto" con modal de confirmación. Reutilizar el patrón de `apps/web/src/features/admin/components/ConfirmDeleteDialog.tsx`, bajándolo a `shared/ui`. Agente: `general-purpose`. Modelo: Haiku. *Cubre:* RF21.
- [x] **4.4** Prueba en navegador a 360, 768 y 1280 px: flujo completo, recarga, medidas límite, 0 desbordes. Sin archivo principal (prueba). Agente: `ui-navegador-movil`. Modelo: Haiku. *Cubre:* RNF1, RF21.

Gate: `qa-gates` + build.

## Fase 5. Cierre: datos, hoja A4 y guardado

- [x] **5.1** Formulario de cierre: nombre, celular y aceptación con enlace a `/politicas-empresa`. Archivo principal: formulario de cierre dentro de `presupuesto/` (ruta a definir). Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF22, RF23.
- [x] **5.2** Hoja A4 en HTML: adaptar `apps/web/src/entities/quote/ui/QuoteSheet.tsx` a las líneas de ventana, `companyData`, avisos y vigencia (24 h web; 15 días tras visita). `@page` A4 e impresión con `window.print()`. Sin librería ni Storage. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF24–RF26, RNF11.
- [x] **5.3** `apps/web/src/features/presupuesto/services/quoteService.ts`: guardar `params` v3 con las ventanas, sin doble envío, conservar carrito si falla. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF27, RNF8, HU12.
- [x] **5.4** Enlace de WhatsApp con el número de presupuesto como aviso provisional. Archivo principal: componente de cierre (ruta a definir). Agente: `general-purpose`. Modelo: Haiku. *Cubre:* RF29 (provisional).
- [x] **5.5** Revisión de textos de la hoja y del cierre. Archivo principal: textos de la hoja (`QuoteSheet.tsx`). Agente: `copy-vidrieria`. Modelo: Haiku. *Cubre:* RF24, RF26, RNF3.

Gate: `qa-gates` + prueba en emulador de Firestore (crear sin sesión; leer solo admin).

## Fase 6. Panel y aviso por correo (código autorizado solo en emuladores)

El dueño autorizó tocar `firestore.rules` y `apps/functions` solo en emuladores, sin desplegar (spec §11, pregunta 5).

- [ ] **6.1** Búsqueda de presupuestos por nombre o teléfono en `/admin`. Archivo principal: panel de `/admin` (ruta a definir). Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF28, HU10.
- [ ] **6.2** Función `submitPresupuesto` en `apps/functions` (guardado y correo, captcha y límite de frecuencia), siguiendo `submitContacto` y `docs/api/README.md`. Archivo principal: `apps/functions/src/http/submitPresupuesto.js` (ruta propuesta). Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF27, RF29, RNF8.
- [ ] **6.3** Reglas y pruebas de Firestore. Archivo principal: `tests/rules/firestore.rules.test.mjs`. Agente: `general-purpose`. Modelo: Sonnet. *Cubre:* RF27, RF28, RNF7.
- [ ] **6.4** `pnpm run contract:generate` y tests de contrato. Sin archivo principal (gate). Agente: `qa-gates`. Modelo: Haiku. *Cubre:* RF27, RF29.

El coordinador muestra al dueño el diff de `firestore.rules` y de `apps/functions` antes de cerrar la fase.

## Fase 7. Verificación final y cierre

- [ ] **7.1** Typecheck, lint, build y pruebas del cotizador. Sin archivo principal (gate). Agente: `qa-gates`. Modelo: Haiku. *Cubre:* §9 puntos 1 a 3.
- [ ] **7.2** Recorrido completo en navegador a 360 px, con capturas. Sin archivo principal (prueba). Agente: `ui-navegador-movil`. Modelo: Haiku. *Cubre:* RNF1, RNF2.
- [ ] **7.3** Informe de cierre, changelog y `docs/PENDIENTES.md`. Archivo principal: `docs/05_CHANGELOG.md`. Agente: `observador`. Modelo: Haiku. *Cubre:* §9 punto 5.
- [ ] **7.4** Prueba en teléfono real: flujo, impresión de la hoja A4, doble toque en "Generar", recarga. Sin archivo principal (prueba humana). Agente: Dueño. Modelo: no aplica. *Cubre:* RF25, RF21, RF27, RNF9.

## Fuera de este plan

- Otros sistemas (Serie 25, 35, 62, Acústica, PVC) y otras categorías: repiten las fases 3 a 5 con sus reglas.
- Revisión que pide `docs/auditorias/REPORTE-CLAUDE-OPUS.md`.
- Push de `main` y deploy.
