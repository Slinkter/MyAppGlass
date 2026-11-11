# Tareas: Cotizador de presupuesto

> Una tarea = máximo un archivo principal. Orden fijo. `[ ]` pendiente · `[x]` hecha.
> Verificación de cada tarea: `pnpm run typecheck` y, desde T2, `node scripts/verificar-cotizador.mjs`.
> Regla de parada: si una verificación falla 2 veces seguidas, detenerse y explicar.
> Decisiones tomadas sin consultar: anotarlas en `decisiones.md` (tarea · decisión · por qué).

## Fase 0: Puerta de aprobación (humano)

- [ ] **T0.** El dueño responde Q1–Q6 de `spec.md` §9 (o acepta los valores por defecto marcados) y aprueba la dependencia de PDF. *Cubre:* todo.

## Fase 1: Motor (sin UI)

- [ ] **T1.** `entities/quote/config/pricing.ts`: añadir `windowPerM2: 240`, `temperedSurchargePct: 30`, `defaultGlassMm: 6`, `finishPerM2: 80` (arenado/laminado), `cardSurchargePct: 5`, `limits` (ancho/alto mín. y máx.), `sash` (mín. 60, máx. 80 cm). *Cubre:* R13, R15, R5, R7.
- [ ] **T2.** `scripts/verificar-cotizador.mjs`: casos de `spec.md` §6 y §7 (se escriben **antes** del motor; deben fallar). *Cubre:* verificación de R5–R15.
- [ ] **T3.** `entities/quote/lib/windowRules.ts`: `computeSashes`, `splitBodies`, `priceWindow`, `validateWindow`. Pasa T2. *Cubre:* R5–R15.

## Fase 2: Entrada desde el servicio

- [ ] **T4.** `ServicePageLayout.tsx`: CTA "Cotizar {sistema}" hacia `/presupuesto?categoria=…&sistema=…`. Parsear con `parseSystemParam`. *Cubre:* R1.

## Fase 3: Pantalla (primero en `/design-system`, luego en la página)

- [ ] **T5.** `OptionChooser`: dos opciones (visita técnica / crear presupuesto). Textos revisados con `copy-vidrieria`. *Cubre:* R2–R3.
- [ ] **T6.** `WindowForm`: medidas, colores, avisos de hojas, cuerpos y límites. *Cubre:* R4–R12.
- [ ] **T7.** `QuoteCart`: líneas, quitar/editar, totales con IGV y recargo de tarjeta. *Cubre:* R14–R19.
- [ ] **T8.** Integrar en `PresupuestoWizardScreen.tsx` (pasos, sin login para este flujo, carrito en `sessionStorage`). *Cubre:* R1, R17–R18.

## Fase 4: Cierre

- [ ] **T9.** `quote-form-schema.ts`: nombre, celular peruano, consentimiento. *Cubre:* R20–R21.
- [ ] **T10.** `PreviewSheet`: vista previa A4 con `companyData`, avisos legales y vigencia. *Cubre:* R22, R24.
- [ ] **T11.** `features/presupuesto/lib/pdf.ts` y botón "Descargar". *Cubre:* R23.
- [ ] **T12.** `quoteService.ts`: guardar `params` v2; manejar error sin perder carrito; evitar doble envío. *Cubre:* R25, R27.
- [ ] **T13.** Enlace de WhatsApp con el número de presupuesto como aviso provisional. *Cubre:* R26 (provisional).

## Fase 5: Revisión

- [ ] **T14.** Agente `uiv3`: diseño contra `/design-system` y MD3. Corregir hallazgos.
- [ ] **T15.** Agente `responsive-check`: 360, 768 y 1280 px con Playwright; 0 desbordes.
- [ ] **T16.** `pnpm run typecheck && pnpm run lint && pnpm run build`.
- [ ] **T17.** Informe del agente `observador` (diagrama, métricas y diff) y entrada en `docs/05_CHANGELOG.md`; actualizar `docs/PENDIENTES.md`.
- [ ] **T18 (humano).** Prueba manual en teléfono real: flujo completo, descarga del PDF, doble toque en "Generar", recarga de página, medidas límite.

## Entrega 2 (requiere autorización explícita)

- [ ] **T19.** Regla en `storage.rules` + subida del PDF a Storage.
- [ ] **T20.** Función `submitPresupuesto` (guardado + correo) en `apps/functions`, con captcha y límite de frecuencia; probar en emulador.
- [ ] **T21.** Quitar el aviso provisional de WhatsApp (T13) o dejarlo como respaldo.
